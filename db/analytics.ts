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
export type CampaignAnalyticsRow = {
  campaign: string;
  content: string;
  sessions: number;
  visitors: number;
  registrations: number;
};

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
    WITH first_session_touch AS (
      SELECT session_id, utm_source, referrer,
        ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY created_at ASC, id ASC) AS position
      FROM page_views WHERE created_at >= ?
    )
    SELECT ${sourceSql()} label, COUNT(*) total
    FROM first_session_touch WHERE position = 1
    GROUP BY label ORDER BY total DESC
  `).bind(since).all<AnalyticsCount>();
  return result.results;
}

export async function getCampaignAnalytics(days = 30): Promise<CampaignAnalyticsRow[]> {
  const db = getD1Binding();
  const since = Date.now() - days * 86_400_000;
  const result = await db.prepare(`
    SELECT
      CASE WHEN instr(coalesce(utm_campaign, ''), '::') > 0
        THEN substr(utm_campaign, 1, instr(utm_campaign, '::') - 1)
        ELSE coalesce(nullif(utm_campaign, ''), 'sem-campanha') END AS campaign,
      CASE WHEN instr(coalesce(utm_campaign, ''), '::') > 0
        THEN substr(utm_campaign, instr(utm_campaign, '::') + 2)
        ELSE 'sem-peca' END AS content,
      COUNT(DISTINCT session_id) AS sessions,
      COUNT(DISTINCT visitor_id) AS visitors,
      COUNT(DISTINCT supporter_id) AS registrations
    FROM page_views
    WHERE created_at >= ? AND lower(coalesce(utm_source, '')) = 'whatsapp'
    GROUP BY campaign, content
    ORDER BY sessions DESC, campaign ASC, content ASC
    LIMIT 30
  `).bind(since).all<CampaignAnalyticsRow>();
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
