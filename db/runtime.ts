type DatabaseRuntime = {
  DB?: D1Database;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  ADMIN_EMAILS?: string;
  CLOUDFLARE_DEPLOYMENT?: string;
  ZAPI_INSTANCE_ID?: string;
  ZAPI_INSTANCE_TOKEN?: string;
  ZAPI_CLIENT_TOKEN?: string;
};

declare global {
  var __EDER_SITE_ENV__: DatabaseRuntime | undefined;
}

export function getD1Binding() {
  const db = globalThis.__EDER_SITE_ENV__?.DB;
  if (!db) throw new Error("Banco de dados indisponível.");
  return db;
}

export function getRuntimeConfig() {
  return globalThis.__EDER_SITE_ENV__ ?? {};
}
