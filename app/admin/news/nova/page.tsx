import Link from "next/link";
import { redirect } from "next/navigation";
import { chatGPTSignInPath } from "../../../chatgpt-auth";
import { getAuthorizedAdmin } from "../../auth";
import { getRuntimeConfig } from "../../../../db/runtime";
import NewsAdminForm from "../NewsAdminForm";

export const dynamic = "force-dynamic";

export default async function NewNewsPage() {
  const auth = await getAuthorizedAdmin();
  if (!auth.user && getRuntimeConfig().CLOUDFLARE_DEPLOYMENT !== "true") redirect(chatGPTSignInPath("/admin/news/nova"));
  if (!auth.user || !auth.authorized) redirect("/admin");

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
          <h1>Nova notícia</h1>
          <span>Preencha os campos abaixo para publicar.</span>
        </div>
      </section>

      <section className="adminTableWrap adminFormWrap">
        <NewsAdminForm />
      </section>
    </main>
  );
}
