import { getAuthorizedAdmin } from "../../../admin/auth";
import { listSupporters } from "../../../../db/supporters";

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
    ["Nome", "Telefone", "Cidade", "Bairro", "Interesse", "Status", "Data"],
    ...rows.map((r) => [r.name, r.phone, r.city, r.neighborhood, r.interest, r.status, new Date(r.created_at).toISOString()]),
  ].map((row) => row.map(csv).join(";")).join("\n");
  return new Response(`\uFEFF${content}`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=cadastros-eder-1020.csv", "Cache-Control": "no-store" } });
}
