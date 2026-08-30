"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "eder1020_visitor";
const SESSION_KEY = "eder1020_session";

function getId(storage: Storage, key: string) {
  const current = storage.getItem(key);
  if (current) return current;
  const value = crypto.randomUUID();
  storage.setItem(key, value);
  return value;
}

function deviceType() {
  const ua = navigator.userAgent;
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "celular";
  return "computador";
}

export default function AccessTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const send = () => {
      try {
        const visitorId = getId(localStorage, VISITOR_KEY);
        const sessionId = getId(sessionStorage, SESSION_KEY);
        const params = new URLSearchParams(location.search);
        void fetch("/api/analytics/page-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            visitorId,
            sessionId,
            path: pathname.slice(0, 300),
            referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
            utmSource: params.get("utm_source") || undefined,
            utmMedium: params.get("utm_medium") || undefined,
            utmCampaign: params.get("utm_campaign") || undefined,
            deviceType: deviceType(),
          }),
        });
      } catch {
        // Métricas nunca devem impedir a navegação.
      }
    };

    const browser = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (browser.requestIdleCallback) {
      const id = browser.requestIdleCallback(send, { timeout: 2000 });
      return () => browser.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(send, 800);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}

export function currentAccessIds() {
  try {
    return {
      visitorId: localStorage.getItem(VISITOR_KEY) || undefined,
      sessionId: sessionStorage.getItem(SESSION_KEY) || undefined,
    };
  } catch {
    return {};
  }
}
