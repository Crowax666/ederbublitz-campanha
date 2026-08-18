import MobileMenu from "./MobileMenu";
import LegalFooter from "./LegalFooter";
import JinglePlayer from "./JinglePlayer";

export default function Home() {
  return (
    <main id="top" className="homeShowcase">
      <header className="siteHeader">
        <a className="brand" href="#inicio" aria-label="Eder Bublitz 1020 - início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/quem-e-eder">Quem é Eder</a>
          <a href="/propostas">Propostas</a>
          <a href="/pelo-parana">Pelo Paraná</a>
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
          <img decoding="async" src="/eder-hero-desktop-hq-v3.jpg" alt="Eder Bublitz sorrindo e com os braços cruzados" fetchPriority="high" loading="eager" />
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
        <img decoding="async" className="mobilePortrait" src="/eder-hero-campanha37-integral-v2.webp" alt="Eder Bublitz sorrindo e com os braços cruzados" fetchPriority="high" loading="eager" />
        <img decoding="async" className="mobileNumber" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
        <div className="mobileHeroFooter"><img decoding="async" className="partyLogo" src="/republicanos-logo-transparent.png" alt="Republicanos 10" /></div>
      </section>

      <section className="homeManifest" aria-labelledby="manifest-title">
        <div className="homeManifestCopy">
          <p className="sectionLabel">Experiência para representar</p>
          <h2 id="manifest-title">Do Paraná para<br /><span>Brasília.</span></h2>
          <p>Uma trajetória construída perto de quem produz, com gestão, diálogo e resultados que chegaram à vida de milhares de pessoas.</p>
          <a className="homeArrowLink" href="/quem-e-eder">Conheça a trajetória <span>→</span></a>
        </div>
        <div className="homeManifestPhoto">
          <img decoding="async" src="/eder-experiencia-retrato-v2.webp" alt="Eder Bublitz sorrindo, com os braços cruzados" loading="lazy" />
          <span>Trabalho<br /><b>que entrega.</b></span>
        </div>
      </section>

      <section className="homeNumbers" aria-label="Resultados em destaque">
        <article><strong>7,3 mi</strong><span>quilos de alimentos<br />destinados por ano</span></article>
        <article><strong>160 mil</strong><span>pessoas atendidas<br />todos os meses</span></article>
        <article><strong>2025</strong><span>Gestor do Ano<br />reconhecido no mundo</span></article>
      </section>

      <section className="homeExplore" aria-labelledby="explore-title">
        <div className="homeExploreHead">
          <div>
            <p className="sectionLabel">Explore o projeto</p>
            <h2 id="explore-title">Escolha por onde<br /><span>começar.</span></h2>
          </div>
          <p>Conteúdo organizado, direto e sem páginas intermináveis. Veja uma prévia e aprofunde apenas no tema que desejar.</p>
        </div>
        <div className="homeExploreGrid">
          <a className="homeExploreCard homeExploreCardPhoto" href="/quem-e-eder">
            <img decoding="async" src="/eder-visao.jpg" alt="" loading="lazy" />
            <span className="homeCardNumber">01</span>
            <div><small>Trajetória</small><h3>Quem é Eder</h3><p>Origem, preparo, experiência e resultados.</p><b>Conheça →</b></div>
          </a>
          <a className="homeExploreCard homeExploreCardOrange" href="/propostas">
            <span className="homeCardNumber">02</span>
            <div><small>Compromissos</small><h3>Propostas</h3><p>Planos objetivos para defender o Paraná.</p><b>Veja as propostas →</b></div>
          </a>
          <a className="homeExploreCard homeExploreCardGreen" href="/pelo-parana">
            <span className="homeCardNumber">03</span>
            <div><small>Presença</small><h3>Pelo Paraná</h3><p>Uma voz conectada a cada região do estado.</p><b>Conheça a visão →</b></div>
          </a>
          <a className="homeExploreCard homeExploreCardVideo" href="/noticias">
            <span className="homeCardPlay" aria-hidden="true">▶</span>
            <span className="homeCardNumber">04</span>
            <div><small>Notícias e vídeos</small><h3>Acompanhe</h3><p>Novidades, entrevistas e a campanha em movimento.</p><b>Assistir agora →</b></div>
          </a>
        </div>
      </section>

      <section className="homeProposalSpotlight" aria-labelledby="spotlight-title">
        <div className="homeProposalTitle">
          <p className="sectionLabel">Propostas em destaque</p>
          <h2 id="spotlight-title">Ideias que já<br /><span>viraram resultado.</span></h2>
          <a className="homeArrowLink" href="/propostas">Ver todas as propostas <span>→</span></a>
        </div>
        <div className="homeProposalCards">
          <a href="/propostas/educacao">
            <small>Educação</small>
            <h3>Educação de qualidade é direito, não privilégio.</h3>
            <p>Seis frentes concretas para levar a Brasília.</p>
            <b>Conheça o plano →</b>
          </a>
          <a href="/propostas/banco-de-alimentos">
            <small>Banco de Alimentos</small>
            <h3>Combater o desperdício e colocar alimento na mesa.</h3>
            <p>Um modelo premiado que pode alcançar todo o Brasil.</p>
            <b>Conheça o programa →</b>
          </a>
        </div>
      </section>

      <section className="homeFinalCta">
        <div>
          <p className="sectionLabel">Essa caminhada também é sua</p>
          <h2>Vamos juntos<br /><span>pelo Paraná.</span></h2>
          <p>Faça parte de uma campanha construída com presença, trabalho e respeito pelas pessoas.</p>
        </div>
        <a href="/participe">Junte-se a nós <span>↗</span></a>
      </section>

      <LegalFooter />

      <div className="floatingActions" aria-label="Atalhos da página">
        <button className="floatAction whatsappMock" type="button" aria-label="WhatsApp — número a definir" title="WhatsApp — número a definir">
          <b>WhatsApp</b><i aria-hidden="true">
            <svg viewBox="0 0 32 32" role="img">
              <path fill="currentColor" d="M16 3.2A12.6 12.6 0 0 0 5.13 22.16L3.2 28.8l6.82-1.79A12.6 12.6 0 1 0 16 3.2Zm0 22.84c-1.93 0-3.8-.53-5.43-1.53l-.39-.23-4.05 1.06 1.08-3.95-.25-.4A10.23 10.23 0 1 1 16 26.04Z"/>
              <path fill="currentColor" d="M21.62 18.45c-.31-.16-1.83-.9-2.11-1-.28-.11-.49-.16-.69.16-.2.31-.8 1-.98 1.2-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53a9.28 9.28 0 0 1-1.72-2.14c-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.69-1.67-.95-2.29-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.16.2 2.18 3.33 5.28 4.67.74.32 1.31.51 1.76.65.74.23 1.41.2 1.94.12.59-.09 1.83-.75 2.08-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.36Z"/>
            </svg>
          </i>
        </button>
        <a className="floatAction backToTop" href="#top" aria-label="Voltar ao topo">
          <b>Voltar ao topo</b><i aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/>
            </svg>
          </i>
        </a>
      </div>
    </main>
  );
}
