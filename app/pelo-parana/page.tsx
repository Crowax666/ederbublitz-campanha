import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import { pageMetadata } from "../../db/seo";
import FloatingActions from "../FloatingActions";

export const metadata = pageMetadata({
  path: "/pelo-parana",
  title: "Pelo Paraná — Eder Bublitz 1020",
  description: "Visão, presença e trabalho de Eder Bublitz por todas as regiões do Paraná.",
});

export default function PeloParanaPage() {
  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img src="/brand-lockup-1-navy.png" alt="" decoding="async" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/quem-e-eder">Quem é Eder</a>
          <a href="/propostas">Propostas</a>
          <a className="active" href="/pelo-parana">Pelo Paraná</a>
          <a href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta" href="/participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <h1 className="srOnly">Pelo Paraná</h1>

      <section className="vision" id="parana">
        <div className="visionCopy">
          <p className="sectionLabel">Visão para o Paraná</p>
          <h2>Olhar adiante.<br /><span>Trabalhar agora.</span></h2>
          <p>Representar é estar perto, ouvir cada região e transformar as prioridades dos paranaenses em trabalho sério em Brasília.</p>
          <div className="visionValues" aria-label="Valores da atuação">
            <span>Presença</span><span>Diálogo</span><span>Resultado</span>
          </div>
          <a href="/propostas">Conheça as propostas <span>→</span></a>
        </div>
        <div className="visionPhoto">
          <img decoding="async" src="/eder-visao.jpg" alt="Eder Bublitz olhando para o horizonte" loading="lazy" />
          <span>PARANÁ<br /><strong>EM FRENTE</strong></span>
        </div>
      </section>

      <section className="congress" id="congresso">
        <img decoding="async" src="/eder-congresso.jpg" alt="Eder Bublitz em posição firme, preparado para defender o Paraná" loading="lazy" />
        <div className="congressCopy">
          <p className="sectionLabel">Compromisso em Brasília</p>
          <h2>Lutando por você<br /><span>no Congresso Nacional.</span></h2>
          <p>Com firmeza, preparo e presença para defender os interesses do Paraná e transformar as necessidades das pessoas em trabalho de verdade.</p>
          <a href="/propostas">Conheça as propostas <span>→</span></a>
        </div>
      </section>

      <LegalFooter />
          <FloatingActions />
    </main>
  );
}
