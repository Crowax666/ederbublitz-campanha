import { ViewTransition } from "react";
import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";
import { pageMetadata } from "../../../db/seo";
import FloatingActions from "../../FloatingActions";

const goals = [
  {
    number: "01",
    title: "Cooperativas da Educação",
    objective: "Fomentar cooperativas da educação, ampliando a participação da comunidade escolar e o desenvolvimento social.",
    metas: [
      "Implementar programas de cooperativismo educacional com instituições públicas e privadas.",
      "Incentivar empreendedorismo, inovação e educação financeira nas escolas.",
      "Estimular a participação de estudantes, famílias e profissionais em iniciativas cooperativas.",
    ],
  },
  {
    number: "02",
    title: "Valorização dos Profissionais da Educação",
    objective: "Garantir reconhecimento, formação contínua e melhores condições de trabalho.",
    metas: [
      "Ampliar a formação continuada.",
      "Fortalecer planos de carreira e remuneração.",
      "Promover ações de saúde e bem-estar.",
      "Reconhecer práticas pedagógicas inovadoras.",
    ],
  },
  {
    number: "03",
    title: "Fortalecimento dos Colégios Cívico-Militares",
    objective: "Consolidar o modelo cívico-militar com cooperação entre educadores e militares.",
    metas: [
      "Ampliar unidades conforme a legislação.",
      "Integrar gestão pedagógica e apoio disciplinar.",
      "Melhorar infraestrutura, segurança e tecnologia.",
      "Incentivar projetos de civismo e liderança.",
    ],
  },
  {
    number: "04",
    title: "Fortalecimento da Alimentação Escolar",
    objective: "Garantir alimentação saudável e de qualidade aos estudantes.",
    metas: [
      "Ampliar o Banco de Alimentos.",
      "Aumentar compras da agricultura familiar.",
      "Priorizar alimentos frescos e sustentáveis.",
      "Promover educação alimentar nas escolas.",
      "Fortalecer parcerias com produtores locais.",
    ],
  },
  {
    number: "05",
    title: "Gestão Eficiente e Transparente",
    objective: "Modernizar a gestão educacional.",
    metas: [
      "Digitalizar processos administrativos.",
      "Garantir transparência dos recursos.",
      "Monitorar indicadores de aprendizagem.",
      "Ampliar participação da comunidade escolar.",
    ],
  },
  {
    number: "06",
    title: "Infraestrutura Escolar",
    objective: "Melhorar a infraestrutura das escolas com recursos parlamentares.",
    metas: [
      "Destinar emendas para reformas e ampliações.",
      "Priorizar acessibilidade, segurança e tecnologia.",
      "Fortalecer parcerias entre Legislativo e Executivo.",
      "Garantir transparência na aplicação dos recursos.",
    ],
  },
  {
    number: "07",
    title: "Educação Especializada e Inclusiva",
    objective: "Ampliar o apoio às escolas especializadas e garantir que os estudantes tenham condições de chegar, permanecer e aprender.",
    metas: [
      "Fortalecer a Conab e articular programas federais de abastecimento e segurança alimentar para ampliar o apoio às escolas especializadas.",
      "Articular recursos federais para viabilizar transporte escolar acessível aos estudantes de escolas especializadas no Paraná.",
      "Promover inclusão, acessibilidade e respeito às necessidades de cada estudante.",
    ],
  },
];

export const metadata = pageMetadata({
  path: "/propostas/educacao",
  title: "Educação — Propostas de Eder Bublitz 1020",
  description: "Plano de metas de Eder Bublitz para a educação: cooperativas, valorização dos profissionais, alimentação escolar, inclusão e apoio às escolas especializadas.",
});

export default function PropostaEducacao() {
  return (
    <main className="internalPage" id="top">
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
          <img decoding="async" src="/eder-campanha.jpg" alt="Eder Bublitz sorrindo, de braços cruzados" loading="eager" fetchPriority="high" />
        </div>
        <div className="bioHeroCopy">
          <ViewTransition name="proposta-tag-educacao" share="proposal-label-morph" default="none">
            <p className="sectionLabel">Proposta • Educação</p>
          </ViewTransition>
          <ViewTransition name="proposta-titulo-educacao" share="proposal-title-morph" default="none">
            <h1>Educação de qualidade<br /><span>é direito, não privilégio.</span></h1>
          </ViewTransition>
          <p>Minha trajetória como gestor público me ensinou: educação é o alicerce de qualquer sociedade que almeja progresso. Viajei por continentes e observei uma verdade cristalina — cidades que investem em educação prosperam.</p>
          <div className="bioFacts">
            <span><b>7</b>Frentes de atuação</span>
            <span><b>Brasília</b>Onde as metas viram lei</span>
          </div>
          <a href="#metas">Conheça as 7 metas <span>↓</span></a>
        </div>
      </section>

      <section className="bioStory">
        <div className="bioStoryTitle">
          <p className="sectionLabel">Por que Brasília</p>
          <h2>Experiência que<br /><span>vira política pública.</span></h2>
        </div>
        <div className="bioStoryText">
          <p className="bioLead">Os sete compromissos que apresento não são promessas vazias — são ações fundamentadas em experiência. Porém, para materializá-los em políticas públicas concretas, é necessário estar em Brasília.</p>
          <p>Um deputado federal possui ferramentas legislativas que permitem influenciar políticas educacionais em escala nacional. Não venho oferecer soluções mágicas. Venho oferecer experiência comprovada e compromisso inabalável com transparência. Serei um parceiro de verdade — um deputado que age.</p>
          <p>Curitiba pode ser referência nacional em educação. Seus educadores merecem reconhecimento. Seus estudantes merecem oportunidades reais. Mas isso exige decisão política e representação competente em Brasília.</p>
          <blockquote>"Convido-vos a acreditar em uma educação melhor e a apoiar essa jornada. Juntos, construiremos uma educação que forme cidadãos conscientes e preparados para prosperar."</blockquote>
        </div>
      </section>

      <section className="propostaQuote">
        <div className="propostaQuoteInner">
          <p className="sectionLabel">Uma convicção, dois programas</p>
          <h2>"Educação de qualidade<br />é <span>direito, não privilégio.</span>"</h2>
          <p>Éder Bublitz criou o Banco de Alimentos — Comida Boa porque acreditava que ninguém deveria passar fome enquanto há desperdício. Aquele programa nasceu de uma convicção: responsabilidade social é dever de quem tem poder de decisão.</p>
          <p>A mesma lógica se aplica à educação: ninguém deveria ter educação de segunda classe por falta de recursos. Educação de qualidade não é privilégio de quem pode pagar escola particular. É direito de todo cidadão.</p>
          <p>Como administrador, Éder viu que investir em pessoas gera retorno exponencial. Colaboradores bem formados, valorizados e motivados produzem mais, inovam mais, geram mais valor. Isso é simples matemática de gestão. Como deputado federal, vai lutar por uma educação pública que seja referência — não por caridade, mas por responsabilidade social e visão de futuro. Porque educação de qualidade é direito. E direito não se negocia.</p>
        </div>
      </section>

      <section className="goalsSection" id="metas">
        <div className="goalsHeading">
          <p className="sectionLabel">Plano de metas para a educação</p>
          <h2>Gestão, valorização<br />e <span>inclusão.</span></h2>
          <p>Sete frentes concretas, cada uma com metas objetivas para levar a Brasília.</p>
        </div>
        <div className="goalsGrid">
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

      <section className="bioNext">
        <div className="bioNextCopy">
          <p className="sectionLabel">Vamos juntos</p>
          <h2>Apoie essa<br /><span>jornada.</span></h2>
          <p>Com respeito e determinação, convido você a acreditar em uma educação melhor para o Paraná — e para o Brasil.</p>
          <a href="/participe">Quero participar <span>→</span></a>
        </div>
        <div className="bioNextVisual">
          <img decoding="async" className="bioNextPhoto" src="/eder-proximo-passo-v2.webp" alt="Eder Bublitz sorrindo e apontando para o convite à participação" loading="lazy" />
          <img decoding="async" className="bioNextBrand" src="/brand-lockup-1-navy.png" alt="1020 — Eder Bublitz — Deputado Federal" loading="lazy" />
        </div>
      </section>

      <footer className="bioFooter">
        <a href="/">← Voltar para a página inicial</a>
        <img decoding="async" src="/republicanos-logo-transparent.png" alt="Republicanos 10" loading="lazy" />
      </footer>
      <LegalFooter />
          <FloatingActions />
    </main>
  );
}
