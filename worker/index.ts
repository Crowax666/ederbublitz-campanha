/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  SITE_OFFLINE?: string;
  DB: D1Database;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  ADMIN_EMAILS?: string;
  CLOUDFLARE_DEPLOYMENT?: string;
  ZAPI_INSTANCE_ID?: string;
  ZAPI_INSTANCE_TOKEN?: string;
  ZAPI_CLIENT_TOKEN?: string;
  RESEND_API_KEY?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const SITE_ORIGIN = "https://ederbublitz.com.br";
const OFFLINE_PAGE = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Site temporariamente indisponível</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f6f7f9; color: #17243b; font: 18px/1.6 system-ui, sans-serif; }
    main { padding: 32px; max-width: 640px; text-align: center; }
    h1 { font-size: clamp(26px, 5vw, 38px); line-height: 1.2; }
    p { color: #536174; }
  </style>
</head>
<body><main><h1>Site temporariamente indisponível</h1><p>O acesso ao site está suspenso por enquanto.</p></main></body>
</html>`;

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: https://www.facebook.com",
  "media-src 'self'",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://challenges.cloudflare.com",
  "connect-src 'self' https://www.facebook.com https://connect.facebook.net https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com",
  "upgrade-insecure-requests",
].join("; ");

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=31536000");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");

  if (headers.get("Content-Type")?.toLowerCase().includes("text/html")) {
    headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Temporary suspension: preserve the app and its data for later reactivation.
    if (env.SITE_OFFLINE === "true") {
      return withSecurityHeaders(new Response(request.method === "HEAD" ? null : OFFLINE_PAGE, {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store, max-age=0",
          "Retry-After": "3600",
        },
      }));
    }

    const url = new URL(request.url);
    const isOfficialHttp = url.protocol === "http:" && url.hostname === "ederbublitz.com.br";
    const isWorkersDev = url.hostname.endsWith(".workers.dev");

    if (isOfficialHttp || isWorkersDev) {
      const canonicalUrl = new URL(`${url.pathname}${url.search}`, SITE_ORIGIN);
      return withSecurityHeaders(Response.redirect(canonicalUrl, 308));
    }

    globalThis.__EDER_SITE_ENV__ = {
      DB: env.DB,
      TURNSTILE_SITE_KEY: env.TURNSTILE_SITE_KEY,
      TURNSTILE_SECRET_KEY: env.TURNSTILE_SECRET_KEY,
      ADMIN_EMAILS: env.ADMIN_EMAILS,
      CLOUDFLARE_DEPLOYMENT: env.CLOUDFLARE_DEPLOYMENT,
      ZAPI_INSTANCE_ID: env.ZAPI_INSTANCE_ID,
      ZAPI_INSTANCE_TOKEN: env.ZAPI_INSTANCE_TOKEN,
      ZAPI_CLIENT_TOKEN: env.ZAPI_CLIENT_TOKEN,
      RESEND_API_KEY: env.RESEND_API_KEY,
    };

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(response);
    }

    return withSecurityHeaders(await handler.fetch(request, env, ctx));
  },
};

export default worker;
