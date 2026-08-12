import MobileMenu from "./MobileMenu";
import JoinForm from "./JoinForm";
import LegalFooter from "./LegalFooter";
import JinglePlayer from "./JinglePlayer";
import { getRuntimeConfig } from "../db/runtime";

const pillars = [
  { number: "01", title: "Fortalecer quem produz", text: "Mais estrutura, oportunidades e respeito para quem movimenta o Paraná todos os dias." },
  { number: "02", title: "Cuidar de quem precisa", text: "Políticas públicas que cheguem às pessoas, com trabalho, sensibilidade e resultado." },
  { number: "03", title: "Representar os municípios", text: "Uma voz presente em Brasília, conectada às cidades e às necessidades de cada região." },
];

export default function Home() {
  const { TURNSTILE_SITE_KEY: turnstileSiteKey } = getRuntimeConfig();
  return (
    <main id="top">
      <header className="siteHeader">
        <a className="brand" href="#inicio" aria-label="Eder Bublitz 1020 - início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img src="/brand-lockup-1-navy.png" alt="" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/quem-e-eder">Quem é Eder</a>
          <a href="#propostas">Propostas</a>
          <a href="#parana">Pelo Paraná</a>
          <a href="#noticias">Notícias</a>
        </nav>
        <a className="headerCta" href="#participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <section className="hero desktopHero" id="inicio">
        <div className="heroPattern" aria-hidden="true" />
        <div className="heroCopy">
          <p className="eyebrow"><span /> Uma nova voz para o Paraná</p>
          <img className="desktopNumberLead" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
          <h1 className="srOnly">Perto de quem produz. Junto de quem precisa.</h1>
          <p className="desktopSlogan">Perto de quem <b>produz.</b><br />Junto de quem <strong>precisa.</strong></p>
          <p className="heroText">Trabalho, experiência e presença para representar o Paraná na Câmara Federal.</p>
          <div className="heroActions">
            <a className="primaryButton" href="/quem-e-eder">Conheça minha história <span>→</span></a>
            <a className="textButton" href="#propostas">Veja nossas propostas</a>
          </div>
        </div>

        <div className="photoStage">
          <img src="/eder-hero-principal.jpg" alt="Eder Bublitz sorrindo, com camisa branca e braços cruzados" />
        </div>

        <div className="heroFooter">
          <span className="scrollCue">Role para conhecer <i>↓</i></span>
          <img className="partyLogo" src="/republicanos-logo-transparent.png" alt="Republicanos 10" />
        </div>
      </section>

      <section className="mobileHero" aria-label="Eder Bublitz 1020">
        <div className="mobileHeroPattern" aria-hidden="true" />
        <div className="mobileHeroCopy">
          <p>Uma nova voz para o Paraná</p>
          <h1>Perto de quem produz.<br /><strong>Junto de quem precisa.</strong></h1>
          <a href="/quem-e-eder">Conheça o Eder <span>→</span></a>
        </div>
        <img className="mobilePortrait" src="/eder-hero-principal.jpg" alt="Eder Bublitz sorrindo, com camisa branca e braços cruzados" />
        <img className="mobileNumber" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
        <div className="mobileHeroFooter"><img className="partyLogo" src="/republicanos-logo-transparent.png" alt="Republicanos 10" /></div>
      </section>

      <section className="pillars" id="propostas">
        {pillars.map((pillar) => (
          <article key={pillar.number}>
            <span>{pillar.number}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
            <a href="#participe" aria-label={`Saiba mais sobre ${pillar.title}`}>↗</a>
          </article>
        ))}
      </section>

      <section className="congress" id="congresso">
        <img src="/eder-congresso.jpg" alt="Eder Bublitz em posição firme, preparado para defender o Paraná" />
        <div className="congressCopy">
          <p className="sectionLabel">Compromisso em Brasília</p>
          <h2>Lutando por você<br /><span>no Congresso Nacional.</span></h2>
          <p>Com firmeza, preparo e presença para defender os interesses do Paraná e transformar as necessidades das pessoas em trabalho de verdade.</p>
          <a href="#propostas">Conheça as propostas <span>→</span></a>
        </div>
      </section>

      <section className="vision" id="parana">
        <div className="visionCopy">
          <p className="sectionLabel">Visão para o Paraná</p>
          <h2>Olhar adiante.<br /><span>Trabalhar agora.</span></h2>
          <p>Representar é estar perto, ouvir cada região e transformar as prioridades dos paranaenses em trabalho sério em Brasília.</p>
          <div className="visionValues" aria-label="Valores da atuação">
            <span>Presença</span><span>Diálogo</span><span>Resultado</span>
          </div>
          <a href="#propostas">Conheça as propostas <span>→</span></a>
        </div>
        <div className="visionPhoto">
          <img src="/eder-visao.jpg" alt="Eder Bublitz olhando para o horizonte" />
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
          <img src="/eder-final.jpg" alt="Eder Bublitz em pé, sorrindo e com os braços cruzados" />
        </div>
        <img className="joinBrand" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
      </section>

      <LegalFooter />

      <JinglePlayer />

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
