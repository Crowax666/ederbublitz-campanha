import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { chatGPTSignInPath } from "../../../chatgpt-auth";
import { getAuthorizedAdmin } from "../../auth";
import { getD1Binding } from "../../../../db/runtime";
import { getRuntimeConfig } from "../../../../db/runtime";
import type { NewsRow } from "../../../../db/news";
import NewsAdminForm from "../NewsAdminForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthorizedAdmin();
  const { id } = await params;
  if (!auth.user && getRuntimeConfig().CLOUDFLARE_DEPLOYMENT !== "true") redirect(chatGPTSignInPath(`/admin/news/${id}`));
  if (!auth.user || !auth.authorized) redirect("/admin");

  const db = getD1Binding();
  const item = await db
    .prepare(`SELECT id, slug, title, excerpt, body, status FROM news WHERE id = ? LIMIT 1`)
    .bind(id)
    .first<Pick<NewsRow, "id" | "slug" | "title" | "excerpt" | "body" | "status">>();
  if (!item) notFound();

  return (
    <main className="adminShell">
      <header className="adminHeader">
        <Link href="/admin" className="adminBrand">Eder Bublitz <small>1020</small></Link>
        <div>
          <span>{auth.user.email}</span>
          <Link href="/admin/news">← Notícias</Link>
        </div>
      </header>

      <section className="adminIntro">
        <div>
          <p>Painel administrativo</p>
          <h1>Editar notícia</h1>
          <span>{item.title}</span>
        </div>
      </section>

      <section className="adminTableWrap adminFormWrap">
        <NewsAdminForm initial={item} />
      </section>
    </main>
  );
}
