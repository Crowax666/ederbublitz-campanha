import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import FloatingActions from "../FloatingActions";
import { pageMetadata } from "../../db/seo";

export const metadata = pageMetadata({
  path: "/pelo-parana",
  title: "Pelo Paraná — Carta aberta de Eder Bublitz 1020",
  description: "Carta aberta de compromisso de Eder Bublitz com quem produz, ensina, cuida e transforma o Paraná.",
});

const players = [
  {
    number: "01",
    audience: "Produtores rurais e cooperativas",
    title: "Fortalecer quem produz.",
    text: "Defender crédito acessível, seguro rural, tecnologia, assistência técnica, cooperativismo e caminhos mais justos para comercializar.",
    href: "/propostas/agricultura",
    cta: "Conheça a proposta",
  },
  {
    number: "02",
    audience: "Educadores, profissionais e famílias",
    title: "Valorizar quem ensina.",
    text: "Trabalhar por profissionais reconhecidos, escolas estruturadas, inovação, inclusão e alimentação de qualidade para aprender.",
    href: "/propostas/educacao",
    cta: "Conheça a proposta",
  },
  {
    number: "03",
    audience: "Entidades sociais e redes de alimentação",
    title: "Ampliar quem cuida.",
    text: "Fortalecer bancos de alimentos, combater o desperdício e conectar doadores, voluntários e organizações à segurança alimentar.",
    href: "/propostas/banco-de-alimentos",
    cta: "Conheça a proposta",
  },
  {
    number: "04",
    audience: "Municípios, empresários e trabalhadores",
    title: "Destravar quem transforma.",
    text: "Aproximar cidades, setor produtivo e trabalhadores para defender infraestrutura, empreendedorismo, qualificação e empregos.",
    href: "/propostas",
    cta: "Veja todos os compromissos",
  },
];

const pact = [
  { number: "01", title: "Escutar em cada região", text: "Manter presença permanente nos municípios e abrir espaço para quem conhece os desafios na prática." },
  { number: "02", title: "Conectar os interessados", text: "Reunir poder público, iniciativa privada, cooperativas, universidades e sociedade civil em torno de soluções viáveis." },
  { number: "03", title: "Agir com transparência", text: "Transformar prioridades em trabalho parlamentar e prestar contas, de forma clara, sobre avanços e próximos passos." },
];

export default function PeloParanaPage() {
  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img decoding="async" src="/brand-lockup-1-navy.png" alt="" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a className="active" href="/pelo-parana">Pelo Paraná</a>
          <a href="/quem-e-eder">Quem é o Eder</a>
          <a href="/propostas">Propostas</a>
          <a href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta headerMaterialCta" href="/participe">Receba nosso material de campanha <span>↗</span></a>
        <MobileMenu />
      </header>

      <div className="openLetterPage">
        <section className="letterHero">
          <div className="letterHeroPhoto">
            <img decoding="async" src="/eder-visao.jpg" alt="Eder Bublitz olhando para o horizonte" fetchPriority="high" />
            <span>Presença em todas as regiões</span>
          </div>
          <div className="letterHeroCopy">
            <p className="sectionLabel">Carta aberta • Pelo Paraná</p>
            <h1>Um compromisso com todos que fazem o Paraná acontecer.</h1>
            <p>O futuro do nosso estado não se constrói de longe. Ele nasce da escuta, do diálogo e da união entre quem produz, ensina, cuida e transforma.</p>
            <a href="#carta">Leia a carta <span>↓</span></a>
          </div>
        </section>

        <section className="letterIntro" id="carta">
          <div>
            <p className="sectionLabel">A quem move o nosso estado</p>
            <h2>A quem produz, ensina, alimenta e transforma.</h2>
          </div>
          <div className="letterIntroText">
            <p>Paranaenses,</p>
            <p>Esta não é uma carta de ocasião. É um compromisso público com as pessoas e instituições que sustentam o Paraná todos os dias — no campo, nas escolas, nas entidades sociais, nas empresas e em cada município.</p>
            <p>Quero construir uma representação que reúna esses diferentes olhares em torno de resultados concretos. Uma atuação presente, capaz de ouvir antes de decidir, unir quem pode contribuir e prestar contas depois de agir.</p>
          </div>
        </section>

        <section className="letterPlayers" aria-labelledby="players-title">
          <div className="letterSectionHead">
            <div>
              <p className="sectionLabel">Uma agenda compartilhada</p>
              <h2 id="players-title">Quatro compromissos.<br /><span>Um só Paraná.</span></h2>
            </div>
            <p>Cada público tem necessidades próprias. Todos merecem voz, respeito e uma ponte ativa com Brasília.</p>
          </div>
          <div className="letterPlayerGrid">
            {players.map((p) => (
              <article className="letterPlayerCard" key={p.number}>
                <span className="letterNumber">{p.number}</span>
                <p className="letterAudience">{p.audience}</p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <a href={p.href}>{p.cta} <span>→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="letterPact">
          <div className="letterPactTitle">
            <p className="sectionLabel">Nosso pacto de trabalho</p>
            <h2>Diálogo que vira<br /><span>resultado.</span></h2>
          </div>
          <div className="letterPactItems">
            {pact.map((item) => (
              <article key={item.number}>
                <b>{item.number}</b>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="letterClosing">
          <div className="letterClosingPhoto">
            <img decoding="async" src="/eder-proximo-passo-v2.webp" alt="Eder Bublitz convidando o Paraná a participar" loading="lazy" />
          </div>
          <div className="letterClosingCopy">
            <p className="sectionLabel">Compromisso público</p>
            <blockquote>"Meu compromisso é ouvir antes de decidir, estar presente durante todo o mandato e prestar contas depois de agir."</blockquote>
            <p>Vamos transformar essa carta em uma agenda viva, construída com todos que acreditam na força do Paraná.</p>
            <div className="letterSignature">
              <strong>Eder Bublitz</strong>
              <span>Deputado Federal • 1020</span>
            </div>
            <div className="letterClosingActions">
              <a href="/participe">Quero participar <span>→</span></a>
              <a href="/propostas">Ver propostas</a>
            </div>
          </div>
        </section>
      </div>

      <LegalFooter />
      <FloatingActions />
    </main>
  );
}
