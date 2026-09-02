import { createSupporter } from "../../../db/supporters";
import { getRuntimeConfig } from "../../../db/runtime";
import { materialRequestMessage, sendZapiMessage, welcomeMessage } from "../../../db/zapi";
import { notifyNewSupporter } from "../../../db/email";
import { linkVisitorToSupporter } from "../../../db/analytics";
import {
  encodeMaterialRequest,
  isValidFulfillment,
  isValidHelp,
  isValidMaterialId,
  isValidQuantity,
  type MaterialRequestDetails,
} from "../../../lib/material-requests";

const interests = new Set(["participar", "receber-noticias", "voluntariado", "propostas"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name || "").trim().replace(/\s+/g, " ");
    const phone = String(body.phone || "").replace(/\D/g, "");
    const city = String(body.city || "").trim().replace(/\s+/g, " ");
    const neighborhood = String(body.neighborhood || "").trim().replace(/\s+/g, " ");
    const requestType = body.requestType === "material" ? "material" : "participation";
    let interest = String(body.interest || "participar");
    const consent = body.consent === true;
    const turnstileToken = String(body.turnstileToken || "");
    const clip = (value: unknown, max: number) => String(value || "").trim().slice(0, max) || undefined;
    const utmSource = clip(body.utmSource, 60);
    const utmMedium = clip(body.utmMedium, 60);
    const utmCampaign = clip(body.utmCampaign, 100);
    const referrer = clip(body.referrer, 200);
    const sessionId = clip(body.sessionId, 40);
    const visitorId = clip(body.visitorId, 40);

    if (name.length < 3 || name.length > 120) return Response.json({ error: "Informe seu nome completo." }, { status: 400 });
    if (!/^\d{10,11}$/.test(phone)) return Response.json({ error: "Informe um telefone válido com DDD." }, { status: 400 });
    if (city.length < 2 || city.length > 100) return Response.json({ error: "Informe sua cidade." }, { status: 400 });
    if (neighborhood.length > 100) return Response.json({ error: "Bairro inválido." }, { status: 400 });
    let materialRequest: MaterialRequestDetails | undefined;
    if (requestType === "material") {
      const materials = Array.isArray(body.materials)
        ? [...new Set(body.materials.map((item) => String(item)).filter(isValidMaterialId))].slice(0, 6)
        : [];
      const quantity = String(body.quantity || "");
      const help = String(body.helpType || "");
      const fulfillment = String(body.fulfillment || "");
      if (!materials.length) return Response.json({ error: "Escolha pelo menos um material." }, { status: 400 });
      if (!isValidQuantity(quantity)) return Response.json({ error: "Quantidade inválida." }, { status: 400 });
      if (!isValidHelp(help)) return Response.json({ error: "Informe como pretende ajudar." }, { status: 400 });
      if (!isValidFulfillment(fulfillment)) return Response.json({ error: "Escolha como prefere receber." }, { status: 400 });
      materialRequest = { items: materials, quantity, help, fulfillment };
      interest = encodeMaterialRequest(materialRequest);
    } else if (!interests.has(interest)) {
      return Response.json({ error: "Interesse inválido." }, { status: 400 });
    }
    if (!consent) return Response.json({ error: "É necessário autorizar o contato para continuar." }, { status: 400 });

    const { TURNSTILE_SITE_KEY: siteKey, TURNSTILE_SECRET_KEY: secret } = getRuntimeConfig();
    if (siteKey || secret) {
      if (!siteKey || !secret) {
        return Response.json({ error: "A verificação de segurança está temporariamente indisponível." }, { status: 503 });
      }
      if (!turnstileToken) return Response.json({ error: "Confirme a verificação de segurança." }, { status: 400 });
      const remoteIp = request.headers.get("CF-Connecting-IP") || "";
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: turnstileToken,
          ...(remoteIp ? { remoteip: remoteIp } : {}),
          idempotency_key: crypto.randomUUID(),
        }),
      });
      const verified = await verification.json() as { success?: boolean };
      if (!verified.success) return Response.json({ error: "A verificação de segurança expirou. Tente novamente." }, { status: 400 });
    }

    const supporterId = await createSupporter({ name, phone, city, neighborhood, interest, consent, utmSource, utmMedium, utmCampaign, referrer });
    if (visitorId && sessionId && /^[0-9a-f-]{20,40}$/i.test(visitorId) && /^[0-9a-f-]{20,40}$/i.test(sessionId)) {
      await linkVisitorToSupporter(visitorId, sessionId, supporterId).catch(() => {});
    }

    // Best-effort: aguarda o envio (Workers pode encerrar chamadas em segundo
    // plano sem isso), mas uma falha aqui nao derruba o cadastro em si.
    await sendZapiMessage(phone, materialRequest ? materialRequestMessage(name) : welcomeMessage(name)).catch(() => {});
    await notifyNewSupporter({ name, phone, city, neighborhood, interest, materialRequest }).catch(() => {});

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Não foi possível concluir o cadastro agora." }, { status: 500 });
  }
}
