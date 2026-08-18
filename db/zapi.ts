import { getRuntimeConfig } from "./runtime";

/**
 * Envia uma mensagem de WhatsApp via Z-API. Best-effort: nunca lança erro
 * pra fora, só registra no log — uma falha no envio da mensagem de boas-vindas
 * não pode impedir o cadastro do apoiador em si.
 */
export async function sendZapiMessage(phone: string, message: string): Promise<boolean> {
  const { ZAPI_INSTANCE_ID: instanceId, ZAPI_INSTANCE_TOKEN: instanceToken, ZAPI_CLIENT_TOKEN: clientToken } =
    getRuntimeConfig();

  if (!instanceId || !instanceToken) {
    console.warn("[Z-API] ZAPI_INSTANCE_ID/ZAPI_INSTANCE_TOKEN não configurados — envio ignorado.");
    return false;
  }

  // Numero brasileiro com DDI (Z-API espera so digitos, com codigo do pais).
  const digits = phone.replace(/\D/g, "");
  const fullPhone = digits.startsWith("55") ? digits : `55${digits}`;

  try {
    const response = await fetch(
      `https://api.z-api.io/instances/${instanceId}/token/${instanceToken}/send-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(clientToken ? { "Client-Token": clientToken } : {}),
        },
        body: JSON.stringify({ phone: fullPhone, message }),
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) {
      console.error("[Z-API] Falha ao enviar mensagem:", response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Z-API] Erro ao enviar mensagem:", error);
    return false;
  }
}

export function welcomeMessage(name: string) {
  const firstName = name.trim().split(/\s+/)[0] || name.trim();
  return `Olá, ${firstName}! 👋 Aqui é da equipe do Eder Bublitz (1020).\n\nRecebemos seu cadastro e em breve entraremos em contato. Obrigado por caminhar com a gente pelo Paraná! 🌾`;
}
