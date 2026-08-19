import { getRuntimeConfig } from "./runtime";

const NOTIFY_TO = "contato@ederbublitz.com.br";
const NOTIFY_FROM = "Site Eder Bublitz <site@ederbublitz.com.br>";

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

  const interestLabel = interestLabels[input.interest] || input.interest;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#15362a;">
      <h2 style="color:#071d33;">Novo cadastro no site — Eder Bublitz 1020</h2>
      <table cellpadding="8" style="border-collapse:collapse;">
        <tr><td><strong>Nome</strong></td><td>${escapeHtml(input.name)}</td></tr>
        <tr><td><strong>Telefone</strong></td><td><a href="https://wa.me/${input.phone}">${escapeHtml(input.phone)}</a></td></tr>
        <tr><td><strong>Cidade</strong></td><td>${escapeHtml(input.city)}</td></tr>
        <tr><td><strong>Bairro</strong></td><td>${escapeHtml(input.neighborhood || "—")}</td></tr>
        <tr><td><strong>Interesse</strong></td><td>${escapeHtml(interestLabel)}</td></tr>
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
        subject: `Novo cadastro: ${input.name} (${input.city})`,
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
