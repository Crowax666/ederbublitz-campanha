import Link from "next/link";
import { ViewTransition } from "react";
import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";
import FloatingActions from "../../FloatingActions";
import { pageMetadata } from "../../../db/seo";

const goals = [
  {
    number: "01",
    title: "Equilíbrio tributário e regras justas",
    objective: "Vou defender no Congresso condições justas para quem mantém as portas abertas, gera empregos e movimenta a economia.",
    metas: [
      "Defender equilíbrio tributário entre os canais de venda.",
      "Trabalhar por regras justas para todos.",
    ],
  },
  {
    number: "02",
    title: "Responsabilidade dos marketplaces",
    objective: "Vou defender a responsabilidade dos marketplaces pelo que é vendido em suas plataformas.",
    metas: [
      "Defender a responsabilidade das plataformas sobre os produtos comercializados.",
      "Buscar condições de concorrência justa para o comércio físico e digital.",
    ],
  },
  {
    number: "03",
    title: "Menos burocracia, crédito e apoio",
    objective: "Quero fortalecer o pequeno comércio, com menos burocracia, acesso a crédito e apoio para também vender online.",
    metas: [
      "Defender a redução da burocracia para o pequeno comerciante.",
      "Trabalhar por acesso a crédito e apoio ao pequeno comércio.",
      "Apoiar o comerciante que quer ampliar suas vendas para o ambiente digital.",
    ],
  },
];

export const metadata = pageMetadata({
  path: "/propostas/comercio-e-empregos",
  title: "Comércio e empregos — Propostas de Eder Bublitz 1020",
  description: "Concorrência justa para o comércio físico e digital: equilíbrio tributário, responsabilidade dos marketplaces, menos burocracia, crédito e apoio ao pequeno comércio.",
});

export default function PropostaComercioEEmpregos() {
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
          <span className="bioPhotoTag">Comércio e empregos</span>
        </div>
        <div className="bioHeroCopy">
          <ViewTransition name="proposta-tag-comercio-empregos" share="proposal-label-morph" default="none">
            <p className="sectionLabel">Proposta • Comércio e empregos</p>
          </ViewTransition>
          <ViewTransition name="proposta-titulo-comercio-empregos" share="proposal-title-morph" default="none">
            <h1>Portas abertas.<br />Empregos preservados.<br /><span>Concorrência justa.</span></h1>
          </ViewTransition>
          <p>Vou trabalhar por quem mantém as portas abertas, gera empregos e movimenta a economia. Meu compromisso é defender no Congresso condições justas para o comércio físico, sem combater o e-commerce.</p>
          <div className="bioFacts">
            <span><b>3</b>Frentes de atuação</span>
            <span><b>Comércio</b>Voz em Brasília</span>
          </div>
          <a href="#metas">Conheça meus compromissos</a>
        </div>
      </section>

      <section className="bioStory">
        <div className="bioStoryTitle">
          <p className="sectionLabel">Um compromisso real</p>
          <h2>Comércio físico<br /><span>precisa de voz.</span></h2>
        </div>
        <div className="bioStoryText">
          <p className="bioLead">O comércio físico não quer privilégio. Quer jogo justo. Quero levar essa defesa a Brasília, com equilíbrio tributário, regras justas e apoio para o pequeno comerciante.</p>
          <p>Quem mantém uma loja aberta enfrenta impostos, encargos, custos de funcionamento e responsabilidades com seus trabalhadores. Vou defender condições para que esse comércio continue gerando empregos e movimentando a economia.</p>
          <p>O compromisso também inclui apoiar o pequeno comércio para vender online. Comércio físico e digital devem ter condições justas para crescer.</p>
        </div>
      </section>

      <section className="goalsSection" id="metas">
        <div className="goalsHeading">
          <p className="sectionLabel">O que vou defender</p>
          <h2>Trabalho pelo comércio.<br /><span>Compromisso com os empregos.</span></h2>
          <p>Três frentes de atuação para fortalecer o pequeno comércio e defender concorrência justa.</p>
        </div>
        <div className="goalsGrid">
          {goals.map((goal) => (
            <article className="goalCard" key={goal.number}>
              <span>{goal.number}</span>
              <h3>{goal.title}</h3>
              <p className="goalObjective">{goal.objective}</p>
              <ul>
                {goal.metas.map((meta) => <li key={meta}>{meta}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bioNext">
        <div className="bioNextCopy">
          <p className="sectionLabel">Meus compromissos com o Paraná</p>
          <h2>Perto de quem produz.<br /><span>Junto de quem precisa.</span></h2>
          <p>Conheça também minhas propostas para agricultura, Banco de Alimentos, educação, mulheres e inclusão.</p>
          <Link href="/propostas">Ver todas as propostas</Link>
        </div>
        <div className="bioNextVisual">
          <img decoding="async" className="bioNextPhoto" src="/eder-proximo-passo-v2.webp" alt="Eder Bublitz sorrindo" loading="lazy" />
          <img decoding="async" className="bioNextBrand" src="/brand-lockup-1-navy.png" alt="1020 — Eder Bublitz — Deputado Federal" loading="lazy" />
        </div>
      </section>

      <footer className="bioFooter">
        <Link href="/propostas">Voltar para as propostas</Link>
        <img decoding="async" src="/republicanos-logo-transparent.png" alt="Republicanos 10" loading="lazy" />
      </footer>
      <LegalFooter />
      <FloatingActions />
    </main>
  );
}
