"use client";

export const ATTRIBUTION_KEY = "eder1020_attribution";
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
  capturedAt?: number;
};

function externalReferrer() {
  if (!document.referrer) return undefined;
  try {
    const referrer = new URL(document.referrer);
    return referrer.hostname === window.location.hostname ? undefined : referrer.hostname;
  } catch {
    return undefined;
  }
}

function readStoredAttribution(): Attribution | undefined {
  try {
    const stored = localStorage.getItem(ATTRIBUTION_KEY);
    if (!stored) return undefined;
    const attribution = JSON.parse(stored) as Attribution;
    if (!attribution.capturedAt || Date.now() - attribution.capturedAt > ATTRIBUTION_TTL_MS) {
      localStorage.removeItem(ATTRIBUTION_KEY);
      return undefined;
    }
    return attribution;
  } catch {
    return undefined;
  }
}

/**
 * Mantem a ultima campanha identificada por 30 dias. Links com UTM iniciam
 * uma nova atribuicao; navegacao interna e retornos diretos preservam a origem.
 */
export function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const referrer = externalReferrer();
  const fromUrl: Attribution = {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
  };
  const hasCampaign = Boolean(fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign || fromUrl.utmContent);
  const stored = readStoredAttribution();

  if (!hasCampaign && !referrer && stored) return stored;

  const attribution: Attribution = {
    ...fromUrl,
    referrer,
    capturedAt: Date.now(),
  };

  try {
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Metricas nunca devem impedir a navegacao.
  }
  return attribution;
}
