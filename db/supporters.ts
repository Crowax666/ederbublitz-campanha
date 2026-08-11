import { getD1Binding } from "./runtime";

export type NewSupporter = {
  name: string;
  phone: string;
  city: string;
  neighborhood?: string;
  interest: string;
  consent: boolean;
};

export async function createSupporter(input: NewSupporter) {
  const db = getD1Binding();

  const supporterId = crypto.randomUUID();
  const consentId = crypto.randomUUID();
  const now = Date.now();

  await db.batch([
    db.prepare(`
      INSERT INTO supporters
        (id, name, phone, city, neighborhood, interest, source, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'site-home', 'novo', ?, ?)
    `).bind(supporterId, input.name, input.phone, input.city, input.neighborhood || null, input.interest, now, now),
    db.prepare(`
      INSERT INTO consent_events
        (id, supporter_id, purpose, privacy_version, granted, created_at)
      VALUES (?, ?, 'contato-e-mobilizacao', '2026-08-10', ?, ?)
    `).bind(consentId, supporterId, input.consent ? 1 : 0, now),
  ]);

  return supporterId;
}

export type SupporterRow = {
  id: string; name: string; phone: string; city: string; neighborhood: string | null;
  interest: string; status: string; created_at: number;
};

export async function listSupporters(limit = 500) {
  const db = getD1Binding();
  const result = await db.prepare(`
    SELECT id, name, phone, city, neighborhood, interest, status, created_at
    FROM supporters ORDER BY created_at DESC LIMIT ?
  `).bind(Math.min(Math.max(limit, 1), 2000)).all<SupporterRow>();
  return result.results;
}
