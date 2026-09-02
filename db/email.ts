import { getRuntimeConfig } from "./runtime";
import {
  FULFILLMENT_OPTIONS,
  HELP_OPTIONS,
  MATERIAL_OPTIONS,
  QUANTITY_OPTIONS,
  optionLabel,
  type MaterialRequestDetails,
} from "../lib/material-requests";

const NOTIFY_TO = "contato@ederbublitz.com.br";
// Conta do Resend criada com login contato@ederbublitz.com.br, sem
// domínio verificado ainda. Em modo de teste, o Resend só entrega pro
// e-mail do dono da conta - que é exatamente esse, então funciona.
// Se um dia verificar o domínio ederbublitz.com.br NESSA conta, trocar
// para "Site Eder Bublitz <site@ederbublitz.com.br>".
const NOTIFY_FROM = "Site Eder Bublitz <onboarding@resend.dev>";

const interestLabels: Record<string, string> = {
  participar: "Quero fazer parte",
  "receber-noticias": "Receber notícias",
  voluntariado: "Ser voluntário",
  propostas: "Contribuir com propostas",
};

export type SupporterNotification = {
  name: string;
  phone: string;
  city: string;
  neighborhood?: string;
  interest: string;
  materialRequest?: MaterialRequestDetails;
};

/**
 * Envia um e-mail avisando a equipe sobre um novo cadastro no formulário.
 * Best-effort: nunca lança erro pra fora — uma falha no envio do e-mail
 * não pode impedir o cadastro do apoiador em si.
 */
export async function notifyNewSupporter(input: SupporterNotification): Promise<boolean> {
  const { RESEND_API_KEY: apiKey } = getRuntimeConfig();

  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY não configurada — notificação ignorada.");
    return false;
  }

  const interestLabel = input.materialRequest ? "Solicitação de material" : interestLabels[input.interest] || input.interest;
  const materialRows = input.materialRequest ? `
        <tr><td><strong>Materiais</strong></td><td>${escapeHtml(input.materialRequest.items.map((id) => optionLabel(MATERIAL_OPTIONS, id)).join(", "))}</td></tr>
        <tr><td><strong>Quantidade</strong></td><td>${escapeHtml(optionLabel(QUANTITY_OPTIONS, input.materialRequest.quantity))}</td></tr>
        <tr><td><strong>Como vai ajudar</strong></td><td>${escapeHtml(optionLabel(HELP_OPTIONS, input.materialRequest.help))}</td></tr>
        <tr><td><strong>Recebimento</strong></td><td>${escapeHtml(optionLabel(FULFILLMENT_OPTIONS, input.materialRequest.fulfillment))}</td></tr>` : "";
  const html = `
    <div style="font-family:Arial,sans-serif;color:#15362a;">
      <h2 style="color:#071d33;">Novo cadastro no site — Eder Bublitz 1020</h2>
      <table cellpadding="8" style="border-collapse:collapse;">
        <tr><td><strong>Nome</strong></td><td>${escapeHtml(input.name)}</td></tr>
        <tr><td><strong>Telefone</strong></td><td><a href="https://wa.me/${input.phone}">${escapeHtml(input.phone)}</a></td></tr>
        <tr><td><strong>Cidade</strong></td><td>${escapeHtml(input.city)}</td></tr>
        <tr><td><strong>Bairro</strong></td><td>${escapeHtml(input.neighborhood || "—")}</td></tr>
        <tr><td><strong>Interesse</strong></td><td>${escapeHtml(interestLabel)}</td></tr>
        ${materialRows}
      </table>
      <p style="color:#65736b;font-size:12px;margin-top:20px;">Enviado automaticamente pelo site ederbublitz.com.br</p>
    </div>
  `.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        subject: `${input.materialRequest ? "Nova solicitação de material" : "Novo cadastro"}: ${input.name} (${input.city})`,
        html,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      console.error("[Email] Falha ao enviar notificação:", response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email] Erro ao enviar notificação:", error);
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
