import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const supporters = sqliteTable("supporters", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  neighborhood: text("neighborhood"),
  interest: text("interest").notNull().default("participar"),
  source: text("source").notNull().default("site-home"),
  status: text("status").notNull().default("novo"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [
  index("supporters_phone_idx").on(table.phone),
  index("supporters_city_idx").on(table.city),
  index("supporters_created_at_idx").on(table.createdAt),
]);

export const consentEvents = sqliteTable("consent_events", {
  id: text("id").primaryKey(),
  supporterId: text("supporter_id").notNull().references(() => supporters.id, { onDelete: "cascade" }),
  purpose: text("purpose").notNull(),
  privacyVersion: text("privacy_version").notNull(),
  granted: integer("granted", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("consent_supporter_idx").on(table.supporterId)]);

export const siteContent = sqliteTable("site_content", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  section: text("section").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("rascunho"),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [uniqueIndex("site_content_slug_idx").on(table.slug)]);

export const proposals = sqliteTable("proposals", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  position: integer("position").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [uniqueIndex("proposals_slug_idx").on(table.slug)]);

export const news = sqliteTable("news", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("rascunho"),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [uniqueIndex("news_slug_idx").on(table.slug)]);
