"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackMetaEvent } from "./MetaPixel";
import { currentAccessIds } from "./AccessTracker";

declare global {
  interface Window {
    turnstile?: { reset: (element?: HTMLElement) => void };
  }
}

const ATTRIBUTION_KEY = "eder1020_attribution";

type Attribution = { utmSource?: string; utmMedium?: string; utmCampaign?: string; referrer?: string };

/** Captura utm_source/medium/campaign e referrer na primeira visita, e guarda em
 * sessionStorage pra sobreviver até o envio do formulário mesmo que a pessoa
 * navegue por outras páginas do site antes de se cadastrar. */
function captureAttribution(): Attribution {
  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    // sessionStorage indisponível — segue sem persistência.
  }

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
  };

  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // ignora se não conseguir persistir.
  }
  return attribution;
}

export default function JoinForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const attributionRef = useRef<Attribution>({});

  useEffect(() => {
    attributionRef.current = captureAttribution();
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || document.querySelector('script[data-turnstile-script]')) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = "true";
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot: campo invisível que só bots preenchem. Se vier preenchido,
    // rejeita silenciosamente sem bater na API.
    if (form.get("website")) {
      setState("success");
      setMessage("Cadastro recebido. Em breve entraremos em contato.");
      formRef.current?.reset();
      return;
    }

    setState("sending");
    setMessage("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const accessIds = currentAccessIds();
      const response = await fetch("/api/supporters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          city: form.get("city"),
          neighborhood: form.get("neighborhood"),
          interest: form.get("interest"),
          consent: form.get("consent") === "on",
          turnstileToken: form.get("cf-turnstile-response"),
          utmSource: attributionRef.current.utmSource,
          utmMedium: attributionRef.current.utmMedium,
          utmCampaign: attributionRef.current.utmCampaign,
          referrer: attributionRef.current.referrer,
          visitorId: accessIds.visitorId,
          sessionId: accessIds.sessionId,
        }),
        signal: controller.signal,
      });

      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) {
        setState("error");
        setMessage(result.error || "Não foi possível concluir o cadastro.");
        window.turnstile?.reset(formRef.current?.querySelector(".cf-turnstile") as HTMLElement);
        return;
      }

      formRef.current?.reset();
      window.turnstile?.reset(formRef.current?.querySelector(".cf-turnstile") as HTMLElement);
      setState("success");
      setMessage("Cadastro recebido. Em breve entraremos em contato.");
      trackMetaEvent("Lead");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "A conexão demorou mais que o esperado. Tente novamente."
          : "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
      );
      window.turnstile?.reset(formRef.current?.querySelector(".cf-turnstile") as HTMLElement);
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <form className="joinForm" id="contato" onSubmit={submit} ref={formRef}>
      <div className="joinFields">
        <label><span>Nome completo</span><input name="name" autoComplete="name" required minLength={3} /></label>
        <label><span>Telefone com DDD</span><input name="phone" autoComplete="tel" inputMode="tel" required placeholder="(41) 99999-9999" pattern="\(?\d{2}\)?\s?9?\d{4}-?\d{4}" title="Informe um telefone com DDD, por exemplo: (41) 99999-9999" minLength={10} /></label>
        <label><span>Cidade</span><input name="city" autoComplete="address-level2" required /></label>
        <label><span>Bairro <small>opcional</small></span><input name="neighborhood" autoComplete="address-level3" /></label>
      </div>
      <label className="joinInterest"><span>Como quer participar?</span>
        <select name="interest" defaultValue="participar">
          <option value="participar">Quero fazer parte</option>
          <option value="receber-noticias">Receber notícias</option>
          <option value="voluntariado">Ser voluntário</option>
          <option value="propostas">Contribuir com propostas</option>
        </select>
      </label>
      <label className="joinConsent"><input type="checkbox" name="consent" required /><span>Autorizo o uso dos meus dados para contato e mobilização desta campanha, conforme a <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>. Posso revogar a autorização e solicitar a exclusão.</span></label>
      <div className="formTrap" aria-hidden="true"><label>Não preencha este campo<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {turnstileSiteKey && <div className="turnstileWrap"><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" data-language="pt-br" /></div>}
      <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando..." : "Quero fazer parte"}<span>→</span></button>
      {message && <p className={`joinMessage ${state}`} role="status">{message}</p>}
    </form>
  );
}
