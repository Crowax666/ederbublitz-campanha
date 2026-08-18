import Link from "next/link";
import { redirect } from "next/navigation";
import { chatGPTSignInPath } from "../../chatgpt-auth";
import { getAuthorizedAdmin } from "../auth";
import { listNews } from "../../../db/news";
import { getRuntimeConfig } from "../../../db/runtime";

export const dynamic = "force-dynamic";

export default async function NewsAdminList() {
  const auth = await getAuthorizedAdmin();
  if (!auth.user && getRuntimeConfig().CLOUDFLARE_DEPLOYMENT !== "true") redirect(chatGPTSignInPath("/admin/news"));
  if (!auth.user || !auth.authorized) redirect("/admin");

  const news = await listNews();

  return (
    <main className="adminShell">
      <header className="adminHeader">
        <Link href="/admin" className="adminBrand">Eder Bublitz <small>1020</small></Link>
        <div>
          <span>{auth.user.email}</span>
          <Link href="/admin">← Painel</Link>
        </div>
      </header>

      <section className="adminIntro">
        <div>
          <p>Painel administrativo</p>
          <h1>Notícias</h1>
          <span>Gerencie o conteúdo publicado na página de Notícias.</span>
        </div>
        <Link className="adminExport" href="/admin/news/nova">+ Nova notícia</Link>
      </section>

      <section className="adminTableWrap">
        <div className="adminTableHead">
          <h2>Todas as notícias</h2>
          <span>{news.length} no total</span>
        </div>
        {news.length ? (
          <div className="adminTableScroll">
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Status</th>
                  <th>Atualizado em</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                      <small>/{item.slug}</small>
                    </td>
                    <td>
                      <span className={`newsStatusBadge newsStatusBadge--${item.status}`}>
                        {item.status === "publicado" ? "Publicado" : "Rascunho"}
                      </span>
                    </td>
                    <td>{new Date(item.updated_at).toLocaleDateString("pt-BR")}</td>
                    <td><Link href={`/admin/news/${item.id}`}>Editar →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="adminEmpty">
            <strong>Nenhuma notícia ainda.</strong>
            <p>Clique em "+ Nova notícia" para publicar a primeira.</p>
          </div>
        )}
      </section>
    </main>
  );
}
