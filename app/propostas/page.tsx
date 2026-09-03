import Link from "next/link";
import { ViewTransition } from "react";
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
  title: "Propostas de Eder Bublitz para Deputado Federal pelo Paraná | 1020",
  description: "Conheça as propostas de Eder Bublitz 1020 para representar o Paraná em Brasília, com prioridades em agricultura, educação, segurança alimentar, mulheres e municípios.",
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
        <a className="headerCta headerMaterialCta" href="/participe">Receba nosso material de campanha <span>↗</span></a>
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
          <Link className="topicProposalCard" href="/propostas/educacao">
            <ViewTransition name="proposta-tag-educacao" share="proposal-label-morph" default="none">
              <span className="topicProposalTag">Educação</span>
            </ViewTransition>
            <ViewTransition name="proposta-titulo-educacao" share="proposal-title-morph" default="none">
              <h3>Educação de qualidade é direito, não privilégio.</h3>
            </ViewTransition>
            <p>6 metas concretas: cooperativas da educação, valorização dos profissionais, alimentação escolar e mais.</p>
            <span className="topicProposalCta">Conheça o plano completo <span>→</span></span>
          </Link>
          <Link className="topicProposalCard" href="/propostas/banco-de-alimentos">
            <ViewTransition name="proposta-tag-banco-alimentos" share="proposal-label-morph" default="none">
              <span className="topicProposalTag">Banco de Alimentos</span>
            </ViewTransition>
            <ViewTransition name="proposta-titulo-banco-alimentos" share="proposal-title-morph" default="none">
              <h3>Luta contra o desperdício: 7,3 milhões de quilos por ano.</h3>
            </ViewTransition>
            <p>Ouro no Stevie Awards, Melhor Gestor do Ano pela WUWM e 160 mil pessoas atendidas todo mês no Paraná.</p>
            <span className="topicProposalCta">Conheça o programa <span>→</span></span>
          </Link>
          <Link className="topicProposalCard agricultureCard" href="/propostas/agricultura">
            <ViewTransition name="proposta-tag-agricultura" share="proposal-label-morph" default="none">
              <span className="topicProposalTag">Agricultura</span>
            </ViewTransition>
            <ViewTransition name="proposta-titulo-agricultura" share="proposal-title-morph" default="none">
              <h3>Valorização e dignidade para o pequeno produtor.</h3>
            </ViewTransition>
            <p>Tecnologia, crédito justo, seguro rural e cooperativas para fortalecer quem produz.</p>
            <span className="topicProposalCta">Conheça a proposta <span>→</span></span>
          </Link>
          <Link className="topicProposalCard" href="/propostas/mulheres">
            <ViewTransition name="proposta-tag-mulheres" share="proposal-label-morph" default="none">
              <span className="topicProposalTag">Mulheres</span>
            </ViewTransition>
            <ViewTransition name="proposta-titulo-mulheres" share="proposal-title-morph" default="none">
              <h3>A força da mulher: protagonismo, capacitação e voz.</h3>
            </ViewTransition>
            <p>Comitê de Mulheres da Ceasa, Embaixadoras, Selo ABNT de Igualdade e apoio às mulheres do campo.</p>
            <span className="topicProposalCta">Conheça a proposta <span>→</span></span>
          </Link>
        </div>
      </section>

      <LegalFooter />
          <FloatingActions />
    </main>
  );
}
