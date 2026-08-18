import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import JoinForm from "../JoinForm";
import { getRuntimeConfig } from "../../db/runtime";
import { pageMetadata } from "../../db/seo";
import FloatingActions from "../FloatingActions";

export const metadata = pageMetadata({
  path: "/participe",
  title: "Junte-se a nós — Eder Bublitz 1020",
  description: "Participe da caminhada de Eder Bublitz pelo Paraná.",
});

export default function ParticipePage() {
  const { TURNSTILE_SITE_KEY: turnstileSiteKey } = getRuntimeConfig();

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
          <a href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta active" href="/participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <h1 className="srOnly">Junte-se a nós</h1>

      <section className="join" id="participe">
        <div className="joinCopy">
          <p>Essa caminhada também é sua.</p>
          <h2>Vamos juntos<br />pelo Paraná.</h2>
          <JoinForm turnstileSiteKey={turnstileSiteKey || ""} />
        </div>
        <div className="joinPhoto">
          <img decoding="async" src="/eder-final.jpg" alt="Eder Bublitz em pé, sorrindo e com os braços cruzados" loading="lazy" />
        </div>
        <img decoding="async" className="joinBrand" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" loading="lazy" />
      </section>

      <LegalFooter />
          <FloatingActions />
    </main>
  );
}
