import { getAuthorizedAdmin } from "../../../../admin/auth";
import { updateSupporterStatus, SUPPORTER_STATUSES } from "../../../../../db/supporters";

export async function POST(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.user || !auth.authorized) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    const id = String(body.id || "");
    const status = String(body.status || "");

    if (!id) return Response.json({ error: "Cadastro inválido." }, { status: 400 });
    if (!SUPPORTER_STATUSES.includes(status as (typeof SUPPORTER_STATUSES)[number])) {
      return Response.json({ error: "Status inválido." }, { status: 400 });
    }

    await updateSupporterStatus(id, status as (typeof SUPPORTER_STATUSES)[number]);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Não foi possível atualizar o status." }, { status: 500 });
  }
}
