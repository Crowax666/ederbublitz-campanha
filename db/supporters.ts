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
      VALUES (?, ?, 'contato-e-mobilizacao', '2026-08-11', ?, ?)
    `).bind(consentId, supporterId, input.consent ? 1 : 0, now),
  ]);

  return supporterId;
}

export type SupporterRow = {
  id: string; name: string; phone: string; city: string; neighborhood: string | null;
  interest: string; status: string; utm_source: string | null; referrer: string | null; created_at: number;
};

export const SUPPORTER_STATUSES = ["novo", "contatado", "confirmado", "descartado"] as const;
export type SupporterStatus = (typeof SUPPORTER_STATUSES)[number];

export async function listSupporters(limit = 500) {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT id, name, phone, city, neighborhood, interest, status, utm_source, referrer, created_at
    FROM supporters ORDER BY created_at DESC LIMIT ?
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
    SELECT interest AS label, COUNT(*) AS total FROM supporters
    GROUP BY interest ORDER BY total DESC
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
