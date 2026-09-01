import MobileMenu from "./MobileMenu";
import LegalFooter from "./LegalFooter";
import JinglePlayer from "./JinglePlayer";
import FloatingActions from "./FloatingActions";
import JoinForm from "./JoinForm";
import { getRuntimeConfig } from "../db/runtime";

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7";

export default function Home() {
  const { TURNSTILE_SITE_KEY: turnstileSiteKey } = getRuntimeConfig();
  return (
    <main id="top" className="homeOriginal">
      <header className="siteHeader">
        <a className="brand" href="#inicio" aria-label="Eder Bublitz 1020 - início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/pelo-parana">Pelo Paraná</a>
          <a href="/quem-e-eder">Quem é o Eder</a>
          <a href="/propostas">Propostas</a>
          <a href="/noticias">Notícias</a>
        </nav>
        <JinglePlayer />
        <a className="headerCta" href="/participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <section className="hero desktopHero" id="inicio">
        <div className="heroPattern" aria-hidden="true" />
        <div className="heroCopy">
          <p className="eyebrow"><span /> Uma nova voz para o Paraná</p>
          <img decoding="async" className="desktopNumberLead" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
          <h1 className="srOnly">Perto de quem produz. Junto de quem precisa.</h1>
          <p className="desktopSlogan">Perto de quem <b>produz.</b><br />Junto de quem <strong>precisa.</strong></p>
          <p className="heroText">Trabalho, experiência e presença para representar o Paraná na Câmara Federal.</p>
          <div className="heroActions">
            <a className="primaryButton" href="/quem-e-eder">Conheça minha história <span>→</span></a>
            <a className="textButton" href="/propostas">Veja nossas propostas</a>
          </div>
        </div>

        <div className="photoStage">
          <picture>
            <source media="(max-width: 800px)" srcSet={TRANSPARENT_PIXEL} />
            <img decoding="async" className="heroPortrait" src="/eder-hero-desktop-hq-v3.jpg" alt="Eder Bublitz sorrindo e com os braços cruzados" fetchPriority="high" loading="eager" />
          </picture>
        </div>

        <div className="heroFooter">
          <span className="scrollCue">Role para conhecer <i>↓</i></span>
          <img decoding="async" className="partyLogo" src="/republicanos-logo-transparent.png" alt="Republicanos 10" />
        </div>
      </section>

      <section className="mobileHero" aria-label="Eder Bublitz 1020">
        <div className="mobileHeroPattern" aria-hidden="true" />
        <div className="mobileHeroCopy">
          <p>Uma nova voz para o Paraná</p>
          <h1>Perto de quem produz.<br /><strong>Junto de quem precisa.</strong></h1>
          <a href="/quem-e-eder">Conheça o Eder <span>→</span></a>
        </div>
        <picture>
          <source media="(min-width: 761px)" srcSet={TRANSPARENT_PIXEL} />
          <img decoding="async" className="mobilePortrait" src="/eder-hero-campanha37-integral-v2.webp" alt="Eder Bublitz sorrindo e com os braços cruzados" fetchPriority="high" loading="eager" />
        </picture>
        <img decoding="async" className="mobileNumber" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
        <div className="mobileHeroFooter"><img decoding="async" className="partyLogo" src="/republicanos-logo-transparent.png" alt="Republicanos 10" /></div>
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

      <section className="pillars" id="propostas">
        <article><span>01</span><h3>Fortalecer quem produz</h3><p>Mais estrutura, oportunidades e respeito para quem movimenta o Paraná todos os dias.</p><a href="/propostas" aria-label="Ver propostas: Fortalecer quem produz">↗</a></article>
        <article><span>02</span><h3>Cuidar de quem precisa</h3><p>Políticas públicas que cheguem às pessoas, com trabalho, sensibilidade e resultado.</p><a href="/propostas" aria-label="Ver propostas: Cuidar de quem precisa">↗</a></article>
        <article><span>03</span><h3>Representar os municípios</h3><p>Uma voz presente em Brasília, conectada às cidades e às necessidades de cada região.</p><a href="/propostas" aria-label="Ver propostas: Representar os municípios">↗</a></article>
      </section>

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
