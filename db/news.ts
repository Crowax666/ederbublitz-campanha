import { getD1Binding } from "./runtime";

export type NewsStatus = "rascunho" | "publicado";

export type NewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: NewsStatus;
  published_at: number | null;
  created_at: number;
  updated_at: number;
};

export function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function listNews({ onlyPublished = false }: { onlyPublished?: boolean } = {}) {
  const db = getD1Binding();
  const where = onlyPublished ? "WHERE status = 'publicado'" : "";
  const result = await db
    .prepare(
      `SELECT id, slug, title, excerpt, body, status, published_at, created_at, updated_at
       FROM news ${where} ORDER BY COALESCE(published_at, created_at) DESC LIMIT 200`,
    )
    .all<NewsRow>();
  return result.results;
}

export async function getNewsBySlug(slug: string) {
  const db = getD1Binding();
  const result = await db
    .prepare(
      `SELECT id, slug, title, excerpt, body, status, published_at, created_at, updated_at
       FROM news WHERE slug = ? LIMIT 1`,
    )
    .bind(slug)
    .first<NewsRow>();
  return result ?? null;
}

export type NewsInput = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: NewsStatus;
};

export async function createNews(input: NewsInput) {
  const db = getD1Binding();
  const id = crypto.randomUUID();
  const now = Date.now();
  const publishedAt = input.status === "publicado" ? now : null;
  await db
    .prepare(
      `INSERT INTO news (id, slug, title, excerpt, body, status, published_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, input.slug, input.title, input.excerpt, input.body, input.status, publishedAt, now, now)
    .run();
  return id;
}

export async function updateNews(id: string, input: NewsInput) {
  const db = getD1Binding();
  const now = Date.now();
  const existing = await db.prepare(`SELECT status, published_at FROM news WHERE id = ?`).bind(id)
    .first<{ status: NewsStatus; published_at: number | null }>();
  const publishedAt =
    input.status === "publicado" ? existing?.published_at ?? now : existing?.status === "publicado" ? existing.published_at : null;
  await db
    .prepare(
      `UPDATE news SET slug = ?, title = ?, excerpt = ?, body = ?, status = ?, published_at = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.slug, input.title, input.excerpt, input.body, input.status, publishedAt, now, id)
    .run();
}

export async function deleteNews(id: string) {
  const db = getD1Binding();
  await db.prepare(`DELETE FROM news WHERE id = ?`).bind(id).run();
}
