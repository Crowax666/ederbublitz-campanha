import assert from "node:assert/strict";
import test from "node:test";

test("renders production metadata and security headers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  const html = await response.text();
  assert.match(html, /<title>Eder Bublitz 1020 — Deputado Federal<\/title>/i);
  assert.match(html, /<link(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/ederbublitz\.com\.br\/["'])[^>]*>/i);
  assert.doesNotMatch(html, /\/workspace\/sites\//i);
});

test("renders the food bank hero with optimized, preloaded media", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("food-bank-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/propostas/banco-de-alimentos", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(
    html,
    /<link(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']image["'])(?=[^>]*\bhref=["']\/eder-luta-fome-v2\.webp["'])[^>]*>/i,
  );
  assert.match(
    html,
    /<img(?=[^>]*\bsrc=["']\/eder-luta-fome-v2\.webp["'])(?=[^>]*\bwidth=["']1400["'])(?=[^>]*\bheight=["']933["'])[^>]*>/i,
  );
});

test("redirects insecure and workers.dev requests to the official HTTPS domain", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("redirect-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const runtime = {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  };
  const context = { waitUntil() {}, passThroughOnException() {} };

  const insecure = await worker.fetch(
    new Request("http://ederbublitz.com.br/propostas?utm_source=test"),
    runtime,
    context,
  );
  assert.equal(insecure.status, 308);
  assert.equal(insecure.headers.get("location"), "https://ederbublitz.com.br/propostas?utm_source=test");

  const duplicate = await worker.fetch(
    new Request("https://ederbublitz-campanha-site.contato-322.workers.dev/quem-e-eder"),
    runtime,
    context,
  );
  assert.equal(duplicate.status, 308);
  assert.equal(duplicate.headers.get("location"), "https://ederbublitz.com.br/quem-e-eder");
});

test("renders participation and campaign material tabs", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("material-form-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://ederbublitz.com.br/participe", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Quero participar/i);
  assert.match(html, /Solicitar material/i);
  assert.match(html, /Formas de participação/i);
});
