import { notFound } from "next/navigation";
import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";
import FloatingActions from "../../FloatingActions";
import { getNewsBySlug } from "../../../db/news";
import { pageMetadata } from "../../../db/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return pageMetadata({ path: `/noticias/${slug}`, title: "Notícia — Eder Bublitz 1020", description: "" });
  return pageMetadata({
    path: `/noticias/${item.slug}`,
    title: `${item.title} — Eder Bublitz 1020`,
    description: item.excerpt,
  });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item || item.status !== "publicado") notFound();

  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img src="/brand-lockup-1-navy.png" alt="" decoding="async" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/pelo-parana">Pelo Paraná</a>
          <a href="/quem-e-eder">Quem é o Eder</a>
          <a href="/propostas">Propostas</a>
          <a className="active" href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta" href="/participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <article className="newsDetail">
        <time dateTime={new Date(item.published_at || item.created_at).toISOString()}>
          {new Date(item.published_at || item.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </time>
        <h1>{item.title}</h1>
        <div className="newsBody">{item.body}</div>
        <a className="newsBackLink" href="/noticias">← Voltar para notícias</a>
      </article>

      <LegalFooter />
      <FloatingActions />
    </main>
  );
}
