import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import { pageMetadata } from "../../db/seo";
import FloatingActions from "../FloatingActions";

const pillars = [
  { number: "01", title: "Fortalecer quem produz", text: "Mais estrutura, oportunidades e respeito para quem movimenta o Paraná todos os dias." },
  { number: "02", title: "Cuidar de quem precisa", text: "Políticas públicas que cheguem às pessoas, com trabalho, sensibilidade e resultado." },
  { number: "03", title: "Representar os municípios", text: "Uma voz presente em Brasília, conectada às cidades e às necessidades de cada região." },
];

export const metadata = pageMetadata({
  path: "/propostas",
  title: "Propostas — Eder Bublitz 1020",
  description: "Conheça as propostas de Eder Bublitz para o Paraná.",
});

export default function PropostasPage() {
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
          <a className="active" href="/propostas">Propostas</a>
          <a href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta" href="/participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <section className="pageIntro">
        <p className="sectionLabel">Propostas</p>
        <h1>Compromissos com o Paraná.</h1>
        <p>Conheça as prioridades e os planos detalhados de Eder Bublitz para representar o estado em Brasília.</p>
      </section>

      <section className="pillars" id="propostas">
        {pillars.map((pillar) => (
          <article key={pillar.number}>
            <span>{pillar.number}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
            <a href="/participe" aria-label={`Saiba mais sobre ${pillar.title}`}>↗</a>
          </article>
        ))}
      </section>

      <section className="topicProposals">
        <div className="topicProposalsHeading">
          <p className="sectionLabel">Propostas por tema</p>
          <h2>Compromissos<br /><span>detalhados.</span></h2>
        </div>
        <div className="topicProposalsList">
          <a className="topicProposalCard" href="/propostas/educacao">
            <span className="topicProposalTag">Educação</span>
            <h3>Educação de qualidade é direito, não privilégio.</h3>
            <p>6 metas concretas: cooperativas da educação, valorização dos profissionais, alimentação escolar e mais.</p>
            <span className="topicProposalCta">Conheça o plano completo <span>→</span></span>
          </a>
          <a className="topicProposalCard" href="/propostas/banco-de-alimentos">
            <span className="topicProposalTag">Banco de Alimentos</span>
            <h3>Luta contra o desperdício: 7,3 milhões de quilos por ano.</h3>
            <p>Ouro no Stevie Awards, Melhor Gestor do Ano pela WUWM e 160 mil pessoas atendidas todo mês no Paraná.</p>
            <span className="topicProposalCta">Conheça o programa <span>→</span></span>
          </a>
          <a className="topicProposalCard agricultureCard" href="/propostas/agricultura">
            <span className="topicProposalTag">Agricultura</span>
            <h3>Valorização e dignidade para o pequeno produtor.</h3>
            <p>Tecnologia, crédito justo, seguro rural e cooperativas para fortalecer quem produz.</p>
            <span className="topicProposalCta">Conheça a proposta <span>→</span></span>
          </a>
          <a className="topicProposalCard" href="/propostas/mulheres">
            <span className="topicProposalTag">Mulheres</span>
            <h3>A força da mulher: protagonismo, capacitação e voz.</h3>
            <p>Comitê de Mulheres da Ceasa, Embaixadoras, Selo ABNT de Igualdade e apoio às mulheres do campo.</p>
            <span className="topicProposalCta">Conheça a proposta <span>→</span></span>
          </a>
        </div>
      </section>

      <LegalFooter />
          <FloatingActions />
    </main>
  );
}
