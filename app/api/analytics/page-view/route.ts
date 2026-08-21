import { recordPageView } from "../../../../db/analytics";

const devices = new Set(["celular", "tablet", "computador", "desconhecido"]);
const idPattern = /^[0-9a-f-]{20,40}$/i;

function clip(value: unknown, max: number) {
  return String(value || "").trim().slice(0, max) || undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const visitorId = String(body.visitorId || "");
    const sessionId = String(body.sessionId || "");
    const path = String(body.path || "").trim().slice(0, 300);
    const deviceType = devices.has(String(body.deviceType)) ? String(body.deviceType) : "desconhecido";

    if (!idPattern.test(visitorId) || !idPattern.test(sessionId) || !path.startsWith("/")) {
      return Response.json({ error: "Evento inválido." }, { status: 400 });
    }

    await recordPageView({
      visitorId,
      sessionId,
      path,
      referrer: clip(body.referrer, 200),
      utmSource: clip(body.utmSource, 60),
      utmMedium: clip(body.utmMedium, 60),
      utmCampaign: clip(body.utmCampaign, 100),
      deviceType: deviceType as "celular" | "tablet" | "computador" | "desconhecido",
    });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: "Não foi possível registrar o acesso." }, { status: 500 });
  }
}
