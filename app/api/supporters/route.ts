import { createSupporter } from "../../../db/supporters";
import { getRuntimeConfig } from "../../../db/runtime";
import { sendZapiMessage, welcomeMessage } from "../../../db/zapi";

const interests = new Set(["participar", "receber-noticias", "voluntariado", "propostas"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = String(body.name || "").trim().replace(/\s+/g, " ");
    const phone = String(body.phone || "").replace(/\D/g, "");
    const city = String(body.city || "").trim().replace(/\s+/g, " ");
    const neighborhood = String(body.neighborhood || "").trim().replace(/\s+/g, " ");
    const interest = String(body.interest || "participar");
    const consent = body.consent === true;
    const turnstileToken = String(body.turnstileToken || "");

    if (name.length < 3 || name.length > 120) return Response.json({ error: "Informe seu nome completo." }, { status: 400 });
    if (!/^\d{10,11}$/.test(phone)) return Response.json({ error: "Informe um telefone válido com DDD." }, { status: 400 });
    if (city.length < 2 || city.length > 100) return Response.json({ error: "Informe sua cidade." }, { status: 400 });
    if (neighborhood.length > 100) return Response.json({ error: "Bairro inválido." }, { status: 400 });
    if (!interests.has(interest)) return Response.json({ error: "Interesse inválido." }, { status: 400 });
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

    await createSupporter({ name, phone, city, neighborhood, interest, consent });

    // Best-effort: aguarda o envio (Workers pode encerrar chamadas em segundo
    // plano sem isso), mas uma falha aqui nao derruba o cadastro em si.
    await sendZapiMessage(phone, welcomeMessage(name)).catch(() => {});

    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Não foi possível concluir o cadastro agora." }, { status: 500 });
  }
}
