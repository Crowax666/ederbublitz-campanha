import { getAuthorizedAdmin } from "../../../admin/auth";
import { listSupporters } from "../../../../db/supporters";
import { decodeMaterialRequest, FULFILLMENT_OPTIONS, HELP_OPTIONS, MATERIAL_OPTIONS, QUANTITY_OPTIONS, optionLabel } from "../../../../lib/material-requests";

function csv(value: unknown) {
  let text = String(value ?? "");
  // Evita CSV/formula injection: neutraliza valores que o Excel/Sheets
  // interpretaria como fórmula ao abrir o arquivo exportado.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const auth = await getAuthorizedAdmin();
  if (!auth.user) return new Response("Não autenticado", { status: 401 });
  if (!auth.authorized) return new Response("Não autorizado", { status: 403 });
  const rows = await listSupporters(2000);
  const content = [
    ["Nome", "Telefone", "Cidade", "Bairro", "Interesse", "Materiais", "Quantidade", "Como vai ajudar", "Recebimento", "Status", "Origem", "Dispositivo", "Visualizações", "Sessões", "Primeiro acesso", "Último acesso", "Data do cadastro"],
    ...rows.map((r) => {
      const material = decodeMaterialRequest(r.interest);
      return [r.name, r.phone, r.city, r.neighborhood, material ? "Material de campanha" : r.interest, material ? material.items.map((id) => optionLabel(MATERIAL_OPTIONS, id)).join(", ") : "", material ? optionLabel(QUANTITY_OPTIONS, material.quantity) : "", material ? optionLabel(HELP_OPTIONS, material.help) : "", material ? optionLabel(FULFILLMENT_OPTIONS, material.fulfillment) : "", r.status, r.access_source || r.utm_source || r.referrer || "Direto", r.device_type || "", r.access_count, r.session_count, r.first_access_at ? new Date(r.first_access_at).toISOString() : "", r.last_access_at ? new Date(r.last_access_at).toISOString() : "", new Date(r.created_at).toISOString()];
    }),
  ].map((row) => row.map(csv).join(";")).join("\n");
  return new Response(`\uFEFF${content}`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=cadastros-eder-1020.csv", "Cache-Control": "no-store" } });
}
