import { getD1Binding } from "./runtime";

export type PageViewInput = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceType: "celular" | "tablet" | "computador" | "desconhecido";
};

export async function recordPageView(input: PageViewInput) {
  const db = getD1Binding();
  await db.prepare(`
    INSERT INTO page_views
      (id, visitor_id, session_id, supporter_id, path, referrer, utm_source, utm_medium, utm_campaign, device_type, created_at)
    VALUES (?, ?, ?, (SELECT supporter_id FROM visitor_links WHERE visitor_id = ?), ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(), input.visitorId, input.sessionId, input.visitorId, input.path,
    input.referrer || null, input.utmSource || null, input.utmMedium || null,
    input.utmCampaign || null, input.deviceType, Date.now(),
  ).run();
}

export async function linkVisitorToSupporter(visitorId: string, sessionId: string, supporterId: string) {
  const db = getD1Binding();
  const now = Date.now();
  await db.batch([
    db.prepare(`INSERT INTO visitor_links (visitor_id, supporter_id, linked_at) VALUES (?, ?, ?)
      ON CONFLICT(visitor_id) DO UPDATE SET supporter_id = excluded.supporter_id, linked_at = excluded.linked_at`)
      .bind(visitorId, supporterId, now),
    db.prepare(`UPDATE page_views SET supporter_id = ? WHERE (visitor_id = ? OR session_id = ?) AND supporter_id IS NULL`)
      .bind(supporterId, visitorId, sessionId),
  ]);
}

export type AnalyticsSummary = {
  views: number;
  visitors: number;
  sessions: number;
  registrations: number;
  conversionRate: number;
};

export type AnalyticsCount = { label: string; total: number };

function sourceSql() {
  return `CASE
    WHEN lower(coalesce(utm_source, referrer, '')) LIKE '%instagram%' THEN 'Instagram'
    WHEN lower(coalesce(utm_source, referrer, '')) LIKE '%facebook%' THEN 'Facebook'
    WHEN lower(coalesce(utm_source, referrer, '')) LIKE '%whatsapp%' THEN 'WhatsApp'
    WHEN lower(coalesce(utm_source, referrer, '')) LIKE '%google%' THEN 'Google'
    WHEN coalesce(utm_source, referrer, '') = '' THEN 'Direto'
    ELSE 'Outros' END`;
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const db = getD1Binding();
  const since = Date.now() - days * 86_400_000;
  const [traffic, registrations] = await Promise.all([
    db.prepare(`SELECT COUNT(*) views, COUNT(DISTINCT visitor_id) visitors, COUNT(DISTINCT session_id) sessions FROM page_views WHERE created_at >= ?`)
      .bind(since).first<{ views: number; visitors: number; sessions: number }>(),
    db.prepare(`SELECT COUNT(DISTINCT supporter_id) total FROM page_views WHERE created_at >= ? AND supporter_id IS NOT NULL`)
      .bind(since).first<{ total: number }>(),
  ]);
  const visitors = Number(traffic?.visitors || 0);
  const registered = Number(registrations?.total || 0);
  return {
    views: Number(traffic?.views || 0),
    visitors,
    sessions: Number(traffic?.sessions || 0),
    registrations: registered,
    conversionRate: visitors ? Math.round((registered / visitors) * 1000) / 10 : 0,
  };
}

export async function getAccessSourceBreakdown(days = 30): Promise<AnalyticsCount[]> {
  const db = getD1Binding();
  const since = Date.now() - days * 86_400_000;
  const result = await db.prepare(`
    SELECT ${sourceSql()} label, COUNT(DISTINCT session_id) total
    FROM page_views WHERE created_at >= ? GROUP BY label ORDER BY total DESC
  `).bind(since).all<AnalyticsCount>();
  return result.results;
}

export async function getTopPages(days = 30, limit = 8): Promise<AnalyticsCount[]> {
  const db = getD1Binding();
  const since = Date.now() - days * 86_400_000;
  const result = await db.prepare(`
    SELECT path label, COUNT(*) total FROM page_views
    WHERE created_at >= ? AND path NOT LIKE '/admin%' AND path NOT LIKE '/api/%'
    GROUP BY path ORDER BY total DESC LIMIT ?
  `).bind(since, limit).all<AnalyticsCount>();
  return result.results;
}
