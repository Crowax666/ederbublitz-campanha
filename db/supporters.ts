import { getD1Binding } from "./runtime";

export type NewSupporter = {
  name: string;
  phone: string;
  city: string;
  neighborhood?: string;
  interest: string;
  consent: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

export async function createSupporter(input: NewSupporter) {
  const db = getD1Binding();

  const supporterId = crypto.randomUUID();
  const consentId = crypto.randomUUID();
  const now = Date.now();

  // Deve acompanhar a data exibida em app/privacidade/page.tsx.
  await db.batch([
    db.prepare(`
      INSERT INTO supporters
        (id, name, phone, city, neighborhood, interest, source, status, utm_source, utm_medium, utm_campaign, referrer, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'site-home', 'novo', ?, ?, ?, ?, ?, ?)
    `).bind(
      supporterId, input.name, input.phone, input.city, input.neighborhood || null, input.interest,
      input.utmSource || null, input.utmMedium || null, input.utmCampaign || null, input.referrer || null,
      now, now,
    ),
    db.prepare(`
      INSERT INTO consent_events
        (id, supporter_id, purpose, privacy_version, granted, created_at)
      VALUES (?, ?, 'contato-e-mobilizacao', '2026-08-20', ?, ?)
    `).bind(consentId, supporterId, input.consent ? 1 : 0, now),
  ]);

  return supporterId;
}

export type SupporterRow = {
  id: string; name: string; phone: string; city: string; neighborhood: string | null;
  interest: string; status: string; utm_source: string | null; referrer: string | null; created_at: number;
  access_count: number; session_count: number; first_access_at: number | null; last_access_at: number | null;
  device_type: string | null; access_source: string | null;
};

export const REGULAR_SUPPORTER_STATUSES = ["novo", "contatado", "confirmado", "descartado"] as const;
export const MATERIAL_REQUEST_STATUSES = ["novo", "contatado", "separado", "entregue", "descartado"] as const;
export const SUPPORTER_STATUSES = ["novo", "contatado", "confirmado", "separado", "entregue", "descartado"] as const;
export type SupporterStatus = (typeof SUPPORTER_STATUSES)[number];

export async function listSupporters(limit = 500) {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT s.id, s.name, s.phone, s.city, s.neighborhood, s.interest, s.status,
      s.utm_source, s.referrer, s.created_at,
      COUNT(p.id) AS access_count,
      COUNT(DISTINCT p.session_id) AS session_count,
      MIN(p.created_at) AS first_access_at,
      MAX(p.created_at) AS last_access_at,
      (SELECT p2.device_type FROM page_views p2 WHERE p2.supporter_id = s.id ORDER BY p2.created_at DESC LIMIT 1) AS device_type,
      (SELECT coalesce(p3.utm_source, p3.referrer) FROM page_views p3 WHERE p3.supporter_id = s.id ORDER BY p3.created_at ASC LIMIT 1) AS access_source
    FROM supporters s
    LEFT JOIN page_views p ON p.supporter_id = s.id
    GROUP BY s.id
    ORDER BY s.created_at DESC LIMIT ?
  `).bind(Math.min(Math.max(limit, 1), 2000)).all<SupporterRow>();
  return result.results;
}

export async function updateSupporterStatus(id: string, status: SupporterStatus) {
  const db = getD1Binding();
  await db.prepare(`UPDATE supporters SET status = ?, updated_at = ? WHERE id = ?`)
    .bind(status, Date.now(), id).run();
}

export type DailyCount = { day: string; total: number };

/** Cadastros por dia, últimos N dias (para o gráfico de evolução temporal). */
export async function getDailySupporterCounts(days = 30): Promise<DailyCount[]> {
  const db = getD1Binding();
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const result = await db.prepare(`
    SELECT date(created_at / 1000, 'unixepoch') AS day, COUNT(*) AS total
    FROM supporters WHERE created_at >= ?
    GROUP BY day ORDER BY day ASC
  `).bind(since).all<DailyCount>();
  return result.results;
}

export type LabelCount = { label: string; total: number };

/** Cadastros agrupados por interesse. */
export async function getInterestBreakdown(): Promise<LabelCount[]> {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT CASE WHEN interest LIKE 'material:%' THEN 'material-campanha' ELSE interest END AS label, COUNT(*) AS total
    FROM supporters
    GROUP BY CASE WHEN interest LIKE 'material:%' THEN 'material-campanha' ELSE interest END
    ORDER BY total DESC
  `).all<LabelCount>();
  return result.results;
}

/** Top cidades com mais cadastros. */
export async function getTopCities(limit = 8): Promise<LabelCount[]> {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT city AS label, COUNT(*) AS total FROM supporters
    GROUP BY city ORDER BY total DESC LIMIT ?
  `).bind(limit).all<LabelCount>();
  return result.results;
}

/** Cadastros agrupados por status (funil: novo → contatado → confirmado). */
export async function getStatusBreakdown(): Promise<LabelCount[]> {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT status AS label, COUNT(*) AS total FROM supporters
    GROUP BY status
  `).all<LabelCount>();
  const byLabel = new Map<string, number>(result.results.map((row) => [row.label, row.total]));
  return SUPPORTER_STATUSES.map((status) => ({ label: status as string, total: byLabel.get(status) || 0 }));
}

/** Classifica a origem do cadastro (rede social, busca, direto) a partir de UTM/referrer. */
function classifySource(utmSource: string | null, referrer: string | null): string {
  const value = (utmSource || referrer || "").toLowerCase();
  if (!value) return "Direto";
  if (value.includes("facebook") || value.includes("fb")) return "Facebook";
  if (value.includes("instagram") || value.includes("ig")) return "Instagram";
  if (value.includes("google")) return "Google";
  if (value.includes("whatsapp")) return "WhatsApp";
  return "Outros";
}

/** Cadastros agrupados por origem (Facebook, Instagram, Google, Direto, etc). */
export async function getTrafficSourceBreakdown(): Promise<LabelCount[]> {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT utm_source, referrer FROM supporters
  `).all<{ utm_source: string | null; referrer: string | null }>();
  const counts = new Map<string, number>();
  for (const row of result.results) {
    const label = classifySource(row.utm_source, row.referrer);
    counts.set(label, (counts.get(label) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, total]) => ({ label, total }))
    .sort((a, b) => b.total - a.total);
}
