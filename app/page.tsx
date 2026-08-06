import MobileMenu from "./MobileMenu";

const pillars = [
  { number: "01", title: "Fortalecer quem produz", text: "Mais estrutura, oportunidades e respeito para quem movimenta o Paraná todos os dias." },
  { number: "02", title: "Cuidar de quem precisa", text: "Políticas públicas que cheguem às pessoas, com trabalho, sensibilidade e resultado." },
  { number: "03", title: "Representar os municípios", text: "Uma voz presente em Brasília, conectada às cidades e às necessidades de cada região." },
];

export default function Home() {
  return (
    <main id="top">
      <header className="siteHeader">
        <a className="brand" href="#inicio" aria-label="Eder Bublitz 1020 - início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="#eder">Quem é Eder</a>
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
            <a className="primaryButton" href="#eder">Conheça minha história <span>→</span></a>
            <a className="textButton" href="#propostas">Veja nossas propostas</a>
          </div>
        </div>

        <div className="photoStage">
          <img src="/eder-campanha-recorte.png" alt="Eder Bublitz sorrindo, com camisa branca e braços cruzados" />
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
          <a href="#eder">Conheça o Eder <span>→</span></a>
        </div>
        <img className="mobilePortrait" src="/eder-campanha-recorte.png" alt="Eder Bublitz sorrindo, com camisa branca e braços cruzados" />
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

      <section className="about" id="eder">
        <div className="aboutPhoto">
          <img src="/eder-quem-e-portrait.jpg" alt="Retrato de Eder Bublitz sorrindo" />
          <img className="aboutBrand" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
        </div>
        <div className="aboutCopy">
          <p className="sectionLabel">Compromisso que vem da prática</p>
          <h2>Experiência para fazer.<br /><span>Coragem para mudar.</span></h2>
          <p className="aboutLead">Eder conhece de perto a força de quem trabalha e sabe que a política só faz sentido quando melhora a vida das pessoas.</p>
          <p>Uma trajetória construída com diálogo, presença e capacidade de transformar desafios em resultados para o Paraná.</p>
          <a href="#historia">Conheça a trajetória completa <span>→</span></a>
        </div>
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
          <a href="#contato">Quero fazer parte <span>→</span></a>
        </div>
        <div className="joinPhoto">
          <img src="/eder-final.jpg" alt="Eder Bublitz em pé, sorrindo e com os braços cruzados" />
        </div>
        <img className="joinBrand" src="/brand-lockup-1-navy.png" alt="1020 - Eder Bublitz - Deputado Federal" />
      </section>

      <div className="floatingActions" aria-label="Atalhos da página">
        <button className="floatAction whatsappMock" type="button" aria-label="WhatsApp — número a definir" title="WhatsApp — número a definir">
          <b>WhatsApp</b><i aria-hidden="true">✆</i>
        </button>
        <a className="floatAction backToTop" href="#top" aria-label="Voltar ao topo">
          <b>Voltar ao topo</b><i aria-hidden="true">↑</i>
        </a>
      </div>
    </main>
  );
}
