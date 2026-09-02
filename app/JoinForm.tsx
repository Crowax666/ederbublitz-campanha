"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { trackMetaEvent } from "./MetaPixel";
import { currentAccessIds } from "./AccessTracker";
import {
  FULFILLMENT_OPTIONS,
  HELP_OPTIONS,
  MATERIAL_OPTIONS,
  QUANTITY_OPTIONS,
  type MaterialId,
} from "../lib/material-requests";

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
  const [mode, setMode] = useState<"participation" | "material">("participation");
  const [materials, setMaterials] = useState<MaterialId[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const attributionRef = useRef<Attribution>({});

  useEffect(() => {
    attributionRef.current = captureAttribution();
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !formRef.current) return;

    const loadTurnstile = () => {
      if (document.querySelector('script[data-turnstile-script]')) return;
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = "true";
      document.head.appendChild(script);
    };

    if (!("IntersectionObserver" in window)) {
      loadTurnstile();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        loadTurnstile();
        observer.disconnect();
      },
      { rootMargin: "700px 0px" },
    );

    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, [turnstileSiteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    // Honeypot: campo invisível que só bots preenchem. Se vier preenchido,
    // rejeita silenciosamente sem bater na API.
    if (form.get("website")) {
      setState("success");
      setMessage(mode === "material" ? "Solicitação recebida. Nossa equipe entrará em contato." : "Cadastro recebido. Em breve entraremos em contato.");
      formRef.current?.reset();
      return;
    }

    if (mode === "material" && materials.length === 0) {
      setState("error");
      setMessage("Escolha pelo menos um material para continuar.");
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
          requestType: mode,
          materials,
          quantity: form.get("quantity"),
          helpType: form.get("helpType"),
          fulfillment: form.get("fulfillment"),
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
      setMaterials([]);
      window.turnstile?.reset(formRef.current?.querySelector(".cf-turnstile") as HTMLElement);
      setState("success");
      setMessage(mode === "material" ? "Solicitação recebida! Nossa equipe entrará em contato para confirmar a disponibilidade e combinar a retirada ou entrega." : "Cadastro recebido. Em breve entraremos em contato.");
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

  function changeMode(next: "participation" | "material") {
    setMode(next);
    setState("idle");
    setMessage("");
  }

  function toggleMaterial(id: MaterialId) {
    setMaterials((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setState("idle");
    setMessage("");
  }

  return (
    <form className={`joinForm joinForm--${mode}`} data-form-title={mode === "material" ? "MATERIAL DE CAMPANHA" : "JUNTE-SE AO TIME 1020"} id="contato" onSubmit={submit} ref={formRef}>
      <div className="participationTabs" role="tablist" aria-label="Formas de participação">
        <button type="button" role="tab" aria-selected={mode === "participation"} className={mode === "participation" ? "active" : ""} onClick={() => changeMode("participation")}>Quero participar</button>
        <button type="button" role="tab" aria-selected={mode === "material"} className={mode === "material" ? "active" : ""} onClick={() => changeMode("material")}>Solicitar material</button>
      </div>
      {mode === "material" && <div className="materialIntro" role="tabpanel">
        <strong>Leve essa campanha com você.</strong>
        <span>Escolha os materiais e nossa equipe confirma a disponibilidade.</span>
      </div>}
      <div className="joinFields">
        <label><span>Nome completo</span><input name="name" autoComplete="name" required minLength={3} /></label>
        <label><span>Telefone com DDD</span><input name="phone" autoComplete="tel" inputMode="tel" required placeholder="(41) 99999-9999" pattern="\(?\d{2}\)?\s?9?\d{4}-?\d{4}" title="Informe um telefone com DDD, por exemplo: (41) 99999-9999" minLength={10} /></label>
        <label><span>Cidade</span><input name="city" autoComplete="address-level2" required /></label>
        <label><span>Bairro <small>opcional</small></span><input name="neighborhood" autoComplete="address-level3" /></label>
      </div>
      {mode === "participation" ? <label className="joinInterest"><span>Como quer participar?</span>
          <select name="interest" defaultValue="participar">
            <option value="participar">Quero fazer parte</option>
            <option value="receber-noticias">Receber notícias</option>
            <option value="voluntariado">Ser voluntário</option>
            <option value="propostas">Contribuir com propostas</option>
          </select>
        </label> : <div className="materialRequestFields" role="tabpanel">
          <fieldset className="materialPicker">
            <legend>Quais materiais você precisa?</legend>
            <div className="materialGrid">
              {MATERIAL_OPTIONS.map((item) => <button key={item.id} type="button" aria-pressed={materials.includes(item.id)} className={materials.includes(item.id) ? "selected" : ""} onClick={() => toggleMaterial(item.id)}>
                <MaterialIcon id={item.id} />
                <span>{item.label}</span>
                <i aria-hidden="true">✓</i>
              </button>)}
            </div>
          </fieldset>
          <div className="materialSelects">
            <label><span>Quantidade aproximada</span><select name="quantity" defaultValue="pequena" required>{QUANTITY_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
            <label><span>Como pretende ajudar?</span><select name="helpType" defaultValue="individual" required>{HELP_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
          </div>
          <fieldset className="fulfillmentPicker"><legend>Como prefere receber?</legend><div>{FULFILLMENT_OPTIONS.map((option) => <label key={option.id}><input type="radio" name="fulfillment" value={option.id} defaultChecked={option.id === "retirada"} /><span>{option.label}</span></label>)}</div></fieldset>
        </div>}
      <label className="joinConsent"><input type="checkbox" name="consent" required /><span>{mode === "material" ? "Autorizo o uso dos meus dados para contato e atendimento desta solicitação, conforme a " : "Autorizo o uso dos meus dados para contato e mobilização desta campanha, conforme a "}<a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>. Posso revogar a autorização e solicitar a exclusão.</span></label>
      <div className="formTrap" aria-hidden="true"><label>Não preencha este campo<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {turnstileSiteKey && <div className="turnstileWrap"><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" data-language="pt-br" data-appearance="interaction-only" /></div>}
      <button className="joinSubmit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando..." : mode === "material" ? "Solicitar material" : "Quero fazer parte"}<span>→</span></button>
      {message && <p className={`joinMessage ${state}`} role="status">{message}</p>}
    </form>
  );
}

function MaterialIcon({ id }: { id: MaterialId }) {
  const common = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true } as const;
  if (id === "santinhos") return <svg {...common}><path d="M7 5h11l3 3v15H7V5Z"/><path d="M18 5v4h4M10 13h8M10 17h8"/></svg>;
  if (id === "adesivos") return <svg {...common}><circle cx="14" cy="14" r="9"/><path d="M14 9.5v9M9.5 14h9"/></svg>;
  if (id === "perfurados") return <svg {...common}><path d="M4 18h20l-2.5-7H8L4 18Z"/><circle cx="9" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M10 11l2-4h5l2 4"/></svg>;
  if (id === "bandeiras") return <svg {...common}><path d="M7 24V4M8 6c6-3 8 3 14 0v10c-6 3-8-3-14 0"/></svg>;
  if (id === "praguinhas") return <svg {...common}><circle cx="14" cy="11" r="6"/><path d="M14 17v7M10 8.5h8M11 12.5h6"/></svg>;
  return <svg {...common}><rect x="5" y="4" width="18" height="20" rx="3"/><path d="M9 9h10M9 13h6M12 20h4"/></svg>;
}
