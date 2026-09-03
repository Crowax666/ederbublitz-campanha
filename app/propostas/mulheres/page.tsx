import { ViewTransition } from "react";
import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";
import FloatingActions from "../../FloatingActions";
import { pageMetadata } from "../../../db/seo";

const goals = [
  {
    number: "01",
    title: "Embaixadoras da Ceasa",
    objective: "Mulheres com perfil de liderança que representam a instituição e multiplicam a rede de apoio em cada setor.",
    metas: [
      "Ampliar a rede de Embaixadoras para outras unidades e regiões.",
      "Levar a voz feminina para o centro das decisões.",
      "Representar a instituição em eventos, palestras e ações de capacitação.",
    ],
  },
  {
    number: "02",
    title: "Capacitação e Networking",
    objective: "Programas de formação profissional, liderança e empreendedorismo para mulheres do setor.",
    metas: [
      "Ampliar oportunidades de crescimento profissional.",
      "Conectar mulheres permissionárias, produtoras, trabalhadoras e gestoras.",
      "Fortalecer o protagonismo feminino no mercado de abastecimento.",
    ],
  },
  {
    number: "03",
    title: "Selo Bronze ABNT de Igualdade",
    objective: "Reconhecimento oficial da Associação Brasileira de Normas Técnicas pelo compromisso com igualdade de gênero.",
    metas: [
      "Manter e ampliar as práticas que garantiram o selo.",
      "Levar o modelo de gestão com equidade para novas instituições.",
      "Tornar a igualdade de gênero política pública, não exceção.",
    ],
  },
  {
    number: "04",
    title: "Mulheres do Campo",
    objective: "Reconhecimento e apoio às mulheres rurais, com capacitação, crédito específico e proteção.",
    metas: [
      "Fortalecer programas de microcrédito para mulheres do campo.",
      "Ampliar o acesso a capacitação e tecnologia no meio rural.",
      "Fortalecer a rede de proteção contra a violência doméstica.",
    ],
  },
];

export const metadata = pageMetadata({
  path: "/propostas/mulheres",
  title: "Mulheres — Propostas de Eder Bublitz 1020",
  description: "Comitê de Mulheres, Embaixadoras da Ceasa, Selo ABNT de Igualdade e apoio às mulheres do campo.",
});

export default function PropostaMulheres() {
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
          <img decoding="async" src="/eder-mobilizacao.jpg" alt="Eder Bublitz sorrindo, com os braços cruzados" loading="eager" fetchPriority="high" />
          <span className="bioPhotoTag">Protagonismo Feminino</span>
        </div>
        <div className="bioHeroCopy">
          <ViewTransition name="proposta-tag-mulheres" share="proposal-label-morph" default="none">
            <p className="sectionLabel">Proposta • Mulheres</p>
          </ViewTransition>
          <ViewTransition name="proposta-titulo-mulheres" share="proposal-title-morph" default="none">
            <h1>A força<br /><span>da mulher.</span></h1>
          </ViewTransition>
          <p>Quando olhamos para a Ceasa Paraná, vemos muito mais do que números e movimentação de mercadorias. Vemos mulheres que acordam cedo, que trabalham duro, que alimentam suas famílias e ajudam a alimentar o estado inteiro. Essas mulheres merecem ter sua força reconhecida e celebrada.</p>
          <div className="bioFacts">
            <span><b>4</b>Frentes de atuação</span>
            <span><b>Bronze</b>Selo ABNT de Igualdade</span>
          </div>
          <a href="#metas">Conheça as iniciativas <span>↓</span></a>
        </div>
      </section>

      <section className="bioStory">
        <div className="bioStoryTitle">
          <p className="sectionLabel">Comitê de Mulheres da Ceasa</p>
          <h2>Protagonismo,<br /><span>capacitação e voz.</span></h2>
        </div>
        <div className="bioStoryText">
          <p className="bioLead">Por isso, criamos o Comitê de Mulheres da Ceasa Paraná — um espaço de protagonismo, capacitação e empoderamento, onde mulheres permissionárias, produtoras, trabalhadoras e gestoras se unem para fortalecer suas vozes e suas oportunidades no mercado de abastecimento.</p>
          <p>Formado por representantes estratégicas das áreas de Gestão, Pedagogia, Comunicação e Ouvidoria, o grupo atua como ponto de referência para que cada mulher que trabalha ou circula pela Ceasa se sinta segura, ouvida e encorajada a crescer — combatendo, acima de tudo, a violência contra a mulher.</p>
          <blockquote>"A força da mulher na Ceasa não é apenas um programa; é um reconhecimento de que quando as mulheres prosperam, toda a sociedade se beneficia. No Congresso, essa luta continua."</blockquote>
        </div>
      </section>

      <section className="goalsSection" id="metas">
        <div className="goalsHeading">
          <p className="sectionLabel">Quatro frentes de atuação</p>
          <h2>Reconhecimento<br />que vira <span>política pública.</span></h2>
          <p>Do protagonismo na Ceasa ao apoio às mulheres do campo, iniciativas concretas para levar a Brasília.</p>
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
          <h2>Fortalecer quem<br /><span>sustenta o Paraná.</span></h2>
          <p>Quando as mulheres prosperam, toda a sociedade se beneficia. Essa luta segue firme em Brasília.</p>
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
