"use client";

import { useMemo, useState } from "react";

const DESTINATIONS = [
  ["/propostas", "Todas as propostas"],
  ["/propostas/inclusao-e-reabilitacao", "Inclusão e reabilitação"],
  ["/propostas/agricultura", "Agricultura"],
  ["/propostas/educacao", "Educação"],
  ["/propostas/mulheres", "Mulheres"],
  ["/propostas/banco-de-alimentos", "Banco de Alimentos"],
  ["/quem-e-eder", "Quem é o Eder"],
  ["/participe", "Participe"],
] as const;

function slug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}

export default function CampaignLinkBuilder() {
  const [destination, setDestination] = useState("/propostas");
  const [campaign, setCampaign] = useState("propostas-setembro");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const link = useMemo(() => {
    const url = new URL(destination, "https://ederbublitz.com.br");
    url.searchParams.set("utm_source", "whatsapp");
    url.searchParams.set("utm_medium", "organic_social");
    url.searchParams.set("utm_campaign", slug(campaign) || "campanha");
    url.searchParams.set("utm_content", slug(content) || "peca-sem-nome");
    return url.toString();
  }, [destination, campaign, content]);

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <div className="campaignLinkBuilder">
    <div className="campaignLinkBuilderHead"><div><span>Rastreamento individual</span><h2>Gerar link para card ou chamada</h2></div><strong>UTM</strong></div>
    <div className="campaignLinkFields">
      <label><span>Página de destino</span><select value={destination} onChange={(event) => setDestination(event.target.value)}>{DESTINATIONS.map(([path, label]) => <option key={path} value={path}>{label}</option>)}</select></label>
      <label><span>Campanha</span><input value={campaign} onChange={(event) => setCampaign(event.target.value)} placeholder="Ex.: propostas-setembro" /></label>
      <label><span>Nome único da peça</span><input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Ex.: card-inclusao-01" /></label>
    </div>
    <div className="campaignLinkOutput"><code>{link}</code><button type="button" onClick={copyLink}>{copied ? "Copiado!" : "Copiar link"}</button></div>
    <p>Use um nome diferente em cada card, vídeo ou chamada. Assim o painel mostra exatamente qual peça trouxe acessos e cadastros.</p>
  </div>;
}
