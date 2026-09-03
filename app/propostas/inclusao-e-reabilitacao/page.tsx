import { ViewTransition } from "react";
import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";
import FloatingActions from "../../FloatingActions";
import { pageMetadata } from "../../../db/seo";
import ProposalStructuredData from "../../ProposalStructuredData";

const goals = [
  {
    number: "01",
    title: "Apoio às escolas especializadas",
    objective: "Fortalecer políticas de abastecimento e segurança alimentar para ampliar o atendimento às escolas especializadas.",
    metas: [
      "Fortalecer a Conab e sua capacidade de apoiar políticas públicas de abastecimento.",
      "Articular programas federais para ampliar o acesso das escolas especializadas à alimentação de qualidade.",
      "Conectar produção local, segurança alimentar e atendimento educacional especializado.",
    ],
  },
  {
    number: "02",
    title: "Transporte escolar acessível",
    objective: "Garantir condições para que estudantes de escolas especializadas possam chegar às aulas com segurança e dignidade.",
    metas: [
      "Articular recursos federais para ampliar o transporte escolar especializado no Paraná.",
      "Apoiar veículos acessíveis e adequados às diferentes necessidades dos estudantes.",
      "Priorizar regiões onde a distância ainda impede o acesso à educação.",
    ],
  },
  {
    number: "03",
    title: "Reabilitação valorizada pelo SUS",
    objective: "Ampliar o financiamento dos procedimentos de reabilitação e fortalecer a capacidade de atendimento pelo SUS.",
    metas: [
      "Defender a atualização dos valores dos procedimentos de reabilitação na Tabela SUS.",
      "Buscar financiamento compatível com a complexidade e a continuidade dos tratamentos.",
      "Fortalecer o acesso a órteses, próteses e outros recursos de tecnologia assistiva.",
    ],
  },
  {
    number: "04",
    title: "Esporte inclusivo e paradesporto",
    objective: "Transformar o esporte em instrumento de desenvolvimento, convivência, saúde e autonomia.",
    metas: [
      "Incentivar projetos de esporte e paradesporto para pessoas com deficiência.",
      "Ampliar o acesso a espaços, equipamentos e profissionais preparados.",
      "Apoiar iniciativas esportivas inclusivas nos municípios paranaenses.",
    ],
  },
  {
    number: "05",
    title: "Mais Centros Especializados em Reabilitação",
    objective: "Levar diagnóstico, tratamento, reabilitação e tecnologia assistiva para mais perto das famílias.",
    metas: [
      "Articular recursos e emendas para ampliar a rede de CERs no Paraná.",
      "Apoiar a implantação de unidades em regiões estratégicas, conforme o planejamento regional do SUS.",
      "Reduzir deslocamentos longos e aproximar o atendimento especializado de quem precisa.",
    ],
  },
];

const cerTypes = [
  { number: "II", title: "CER II", text: "Atendimento especializado em duas modalidades de reabilitação." },
  { number: "III", title: "CER III", text: "Atendimento especializado em três modalidades de reabilitação." },
  { number: "IV", title: "CER IV", text: "Atendimento especializado em quatro modalidades de reabilitação." },
];

export const metadata = pageMetadata({
  path: "/propostas/inclusao-e-reabilitacao",
  title: "Inclusão e Reabilitação — Propostas de Eder Bublitz 1020",
  description: "Propostas de Eder Bublitz para educação especializada, transporte acessível, reabilitação pelo SUS, paradesporto e ampliação dos CERs no Paraná.",
});

export default function PropostaInclusaoEReabilitacao() {
  return (
    <main className="internalPage inclusionProposal" id="top">
      <ProposalStructuredData
        path="/propostas/inclusao-e-reabilitacao"
        name="Inclusão e Reabilitação — Propostas de Eder Bublitz 1020"
        description="Educação especializada, transporte acessível, reabilitação pelo SUS, paradesporto e ampliação dos CERs no Paraná."
      />
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img decoding="async" src="/brand-lockup-1-navy.png" alt="" /></span>
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

      <section className="bioHero">
        <div className="bioHeroPhoto">
          <img
            decoding="async"
            src="/eder-inclusao-educacao-aquarela-sem-logo.webp"
            alt="Eder Bublitz com uma criança com síndrome de Down, em pintura aquarela"
            width="1123"
            height="1401"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="bioHeroCopy">
          <ViewTransition name="proposta-tag-inclusao-reabilitacao" share="proposal-label-morph" default="none">
            <p className="sectionLabel">Proposta • Pessoas com deficiência</p>
          </ViewTransition>
          <ViewTransition name="proposta-titulo-inclusao-reabilitacao" share="proposal-title-morph" default="none">
            <h1>Inclusão que acolhe.<br /><span>Autonomia que transforma.</span></h1>
          </ViewTransition>
          <p>Uma sociedade justa começa quando cada pessoa encontra acesso, respeito e condições reais para desenvolver suas capacidades e participar plenamente da vida em comunidade.</p>
          <div className="bioFacts">
            <span><b>5</b>Frentes de atuação</span>
            <span><b>Paraná</b>Atendimento mais próximo</span>
          </div>
          <a href="#metas-inclusao">Conheça as propostas <span>↓</span></a>
        </div>
      </section>

      <section className="bioStory">
        <div className="bioStoryTitle">
          <p className="sectionLabel">Cuidar de quem precisa</p>
          <h2>Direitos que chegam.<br /><span>Dignidade que permanece.</span></h2>
        </div>
        <div className="bioStoryText">
          <p className="bioLead">Quando o atendimento está longe, o transporte não existe ou a reabilitação não recebe os recursos necessários, não é apenas um serviço que falta — é a autonomia de uma pessoa que fica esperando.</p>
          <p>O compromisso é trabalhar em Brasília para articular políticas, recursos e emendas que fortaleçam a educação especializada, a Rede de Cuidados à Pessoa com Deficiência e o atendimento regionalizado no Paraná.</p>
          <blockquote>“Cuidar é garantir que ninguém fique para trás e que cada pessoa tenha a oportunidade de viver com dignidade e autonomia.”</blockquote>
        </div>
      </section>

      <section className="goalsSection" id="metas-inclusao">
        <div className="goalsHeading">
          <p className="sectionLabel">Plano de inclusão e reabilitação</p>
          <h2>Presença, acesso<br />e <span>autonomia.</span></h2>
          <p>Cinco frentes concretas para transformar cuidado em políticas públicas que cheguem às pessoas.</p>
        </div>
        <div className="goalsGrid inclusionGoals">
          {goals.map((goal) => (
            <article className="goalCard" key={goal.number}>
              <span>{goal.number}</span>
              <h3>{goal.title}</h3>
              <p className="goalObjective">{goal.objective}</p>
              <ul>
                {goal.metas.map((meta) => (
                  <li key={meta}>{meta}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bioLeadership">
        <div className="leadershipIntro">
          <p className="sectionLabel">Centros Especializados em Reabilitação</p>
          <h2>Atendimento completo.<br /><span>Mais perto das famílias.</span></h2>
          <p>Os CERs são pontos de atenção ambulatorial do SUS voltados ao diagnóstico, tratamento, reabilitação e acesso à tecnologia assistiva.</p>
        </div>
        <div className="leadershipBody">
          <p className="leadershipLead">As unidades são classificadas de acordo com o número de modalidades de reabilitação que oferecem.</p>
          <div className="leadershipPillars">
            {cerTypes.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bioNext">
        <div className="bioNextCopy">
          <p className="sectionLabel">Vamos juntos</p>
          <h2>Ninguém pode<br /><span>ficar para trás.</span></h2>
          <p>Inclusão se constrói com acesso, respeito e políticas públicas que acompanhem as pessoas em cada etapa da vida.</p>
          <a href="/participe">Quero participar <span>→</span></a>
        </div>
        <div className="bioNextVisual">
          <img decoding="async" className="bioNextPhoto" src="/eder-proximo-passo-v2.webp" alt="Eder Bublitz convidando a participar" loading="lazy" />
          <img decoding="async" className="bioNextBrand" src="/brand-lockup-1-navy.png" alt="1020 — Eder Bublitz — Deputado Federal" loading="lazy" />
        </div>
      </section>

      <footer className="bioFooter">
        <a href="/propostas">← Voltar para as propostas</a>
        <img decoding="async" src="/republicanos-logo-transparent.png" alt="Republicanos 10" loading="lazy" />
      </footer>
      <LegalFooter />
      <FloatingActions />
    </main>
  );
}
