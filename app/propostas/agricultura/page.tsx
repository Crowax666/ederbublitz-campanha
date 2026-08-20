import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";
import { pageMetadata } from "../../../db/seo";
import FloatingActions from "../../FloatingActions";

const goals = [
  {
    number: "01",
    title: "Tecnologia para reduzir o esforço",
    objective: "Reduzir impostos sobre maquinários e tecnologias agrícolas que facilitem o trabalho diário.",
    metas: [
      "Defender a redução de tributos de importação e IPI.",
      "Ampliar o acesso a equipamentos modernos.",
      "Tornar a rotina no campo menos sacrificante e mais produtiva.",
    ],
  },
  {
    number: "02",
    title: "Acesso a crédito justo",
    objective: "Ampliar linhas de crédito com juros competitivos e menos burocracia.",
    metas: [
      "Buscar taxas na faixa de 4% a 5% ao ano.",
      "Simplificar o acesso do pequeno produtor.",
      "Permitir investimentos sustentáveis na propriedade.",
    ],
  },
  {
    number: "03",
    title: "Seguro rural e proteção",
    objective: "Criar políticas robustas para proteger o produtor contra instabilidades climáticas.",
    metas: [
      "Ampliar a cobertura do seguro rural.",
      "Reduzir os prejuízos causados por eventos extremos.",
      "Dar segurança para o planejamento de cada safra.",
    ],
  },
  {
    number: "04",
    title: "Fortalecimento da produção local",
    objective: "Incentivar pequenas cooperativas e ampliar o poder de negociação do agricultor.",
    metas: [
      "Melhorar a rentabilidade da produção.",
      "Facilitar o escoamento e a comercialização.",
      "Aproximar quem produz dos canais de venda.",
    ],
  },
];

const connection = [
  { number: "01", title: "Problemas reais", text: "Transporte ineficiente, falta de assistência técnica e poucos canais diretos de venda." },
  { number: "02", title: "Defesa prática", text: "Soluções para crédito, clima, preço, produção e assistência." },
  { number: "03", title: "Futuro no campo", text: "Condições para que as famílias permaneçam no meio rural com qualidade de vida." },
];

export const metadata = pageMetadata({
  path: "/propostas/agricultura",
  title: "Agricultura — Propostas de Eder Bublitz 1020",
  description: "Propostas de Eder Bublitz para valorizar o pequeno produtor e fortalecer a agricultura.",
});

export default function PropostaAgricultura() {
  return (
    <main className="internalPage agricultureProposal" id="top">
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
        <a className="headerCta" href="/participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <section className="bioHero">
        <div className="bioHeroPhoto">
          <img decoding="async" src="/eder-banco-alimentos-hero.webp" alt="Eder Bublitz sorrindo, segurando uma caixa de alfaces do Banco de Alimentos Comida Boa" loading="eager" fetchPriority="high" />
          <span className="bioPhotoTag">Agricultura • Paraná</span>
        </div>
        <div className="bioHeroCopy">
          <p className="sectionLabel">Proposta • Agricultura</p>
          <h1>Valorização e dignidade<br /><span>para o pequeno produtor.</span></h1>
          <p>Segurança alimentar começa com quem produz comida de verdade. O pequeno produtor não quer favor: precisa de condições para produzir e vender com dignidade e autonomia.</p>
          <div className="bioFacts">
            <span><b>4</b>Pilares de transformação</span>
            <span><b>Campo</b>Onde o alimento começa</span>
          </div>
          <a href="#pilares-agricultura">Conheça os pilares <span>↓</span></a>
        </div>
      </section>

      <section className="bioStory">
        <div className="bioStoryTitle">
          <p className="sectionLabel">Compromisso com quem produz</p>
          <h2>Condições para produzir.<br /><span>Autonomia para crescer.</span></h2>
        </div>
        <div className="bioStoryText">
          <p className="bioLead">O trabalho de Éder Bublitz no campo e na gestão pública é pautado pela certeza de que valorizar o pequeno produtor é fortalecer toda a cadeia de abastecimento.</p>
          <p>A proposta enfrenta os obstáculos que limitam o desenvolvimento rural: custo elevado da tecnologia, crédito caro e burocrático, riscos climáticos e baixo poder de negociação.</p>
          <blockquote>"Quando o campo vai bem, a cidade come melhor. Essa é a conexão que muita gente esquece."</blockquote>
        </div>
      </section>

      <section className="goalsSection" id="pilares-agricultura">
        <div className="goalsHeading">
          <p className="sectionLabel">Pilares da transformação no campo</p>
          <h2>Produzir melhor.<br />Viver com <span>dignidade.</span></h2>
          <p>Quatro frentes concretas para garantir produtividade, proteção e renda ao pequeno agricultor.</p>
        </div>
        <div className="goalsGrid agricultureGoals">
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

      <section className="bioLeadership agricultureConnection">
        <div className="leadershipIntro">
          <p className="sectionLabel">Do campo ao prato</p>
          <h2>Uma conexão<br /><span>real e necessária.</span></h2>
          <p>As necessidades rurais precisam virar políticas públicas concretas, capazes de resolver gargalos para o agricultor e para o consumidor.</p>
        </div>
        <div className="leadershipBody">
          <p className="leadershipLead">O objetivo é atuar na base dos problemas e garantir que o dinheiro circule onde a comida nasce.</p>
          <div className="leadershipPillars">
            {connection.map((item) => (
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
          <h2>Fortalecer quem<br /><span>alimenta o Brasil.</span></h2>
          <p>Valorizar o pequeno produtor é garantir renda no campo, alimento de qualidade na cidade e futuro para as próximas gerações.</p>
          <a href="/participe">Quero participar <span>→</span></a>
        </div>
        <div className="bioNextVisual">
          <img decoding="async" className="bioNextPhoto" src="/eder-proximo-passo-v2.webp" alt="Eder Bublitz convidando a participar" loading="lazy" />
          <img decoding="async" className="bioNextBrand" src="/brand-lockup-1-navy.png" alt="1020 — Eder Bublitz — Deputado Federal" loading="lazy" />
        </div>
      </section>

      <LegalFooter />
          <FloatingActions />
    </main>
  );
}
