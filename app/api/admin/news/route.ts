import { getAuthorizedAdmin } from "../../../admin/auth";
import { listNews, createNews, createSlug } from "../../../../db/news";

export async function GET() {
  const auth = await getAuthorizedAdmin();
  if (!auth.authorized) return Response.json({ error: "Não autorizado." }, { status: 401 });

  const news = await listNews();
  return Response.json({ news });
}

export async function POST(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.authorized) return Response.json({ error: "Não autorizado." }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const content = String(body.body || "").trim();
    const status = body.status === "publicado" ? "publicado" : "rascunho";
    const slug = createSlug(String(body.slug || title));

    if (title.length < 3) return Response.json({ error: "Informe um título." }, { status: 400 });
    if (!slug) return Response.json({ error: "Não foi possível gerar a URL da notícia." }, { status: 400 });
    if (excerpt.length < 3) return Response.json({ error: "Informe um resumo." }, { status: 400 });
    if (content.length < 3) return Response.json({ error: "Informe o conteúdo da notícia." }, { status: 400 });

    const id = await createNews({ title, slug, excerpt, body: content, status });
    return Response.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("UNIQUE")
      ? "Já existe uma notícia com essa URL (slug)."
      : "Não foi possível salvar a notícia.";
    return Response.json({ error: message }, { status: 400 });
  }
}
