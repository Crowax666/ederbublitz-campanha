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
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrer: text("referrer"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [
  index("supporters_phone_idx").on(table.phone),
  index("supporters_city_idx").on(table.city),
  index("supporters_created_at_idx").on(table.createdAt),
]);

export const pageViews = sqliteTable("page_views", {
  id: text("id").primaryKey(),
  visitorId: text("visitor_id").notNull(),
  sessionId: text("session_id").notNull(),
  supporterId: text("supporter_id").references(() => supporters.id, { onDelete: "set null" }),
  path: text("path").notNull(),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  deviceType: text("device_type").notNull().default("desconhecido"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [
  index("page_views_visitor_idx").on(table.visitorId),
  index("page_views_session_idx").on(table.sessionId),
  index("page_views_supporter_idx").on(table.supporterId),
  index("page_views_created_at_idx").on(table.createdAt),
]);

export const visitorLinks = sqliteTable("visitor_links", {
  visitorId: text("visitor_id").primaryKey(),
  supporterId: text("supporter_id").notNull().references(() => supporters.id, { onDelete: "cascade" }),
  linkedAt: integer("linked_at", { mode: "timestamp_ms" }).notNull(),
}, (table) => [index("visitor_links_supporter_idx").on(table.supporterId)]);

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
