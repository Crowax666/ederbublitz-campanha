import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import { pageMetadata } from "../../db/seo";
import FloatingActions from "../FloatingActions";

const timeline = [
  { year: "2006", title: "Formação", text: "Conclui Zootecnia na Universidade Estadual de Maringá — UEM." },
  { year: "2019", title: "Ceasa Paraná", text: "Assume a direção da Ceasa e inicia um ciclo de modernização e gestão por resultados." },
  { year: "2022", title: "Liderança nacional", text: "Assume a presidência da Associação Brasileira das Centrais de Abastecimento — Abracen, ampliando a articulação entre os mercados do país." },
  { year: "2024", title: "Liderança integrada", text: "À frente da Flama, fortalece a integração dos mercados atacadistas da América Latina e a troca de soluções para o abastecimento alimentar." },
  { year: "2025", title: "Respeito e reconhecimento", text: "É eleito Gestor do Ano pela World Union of Wholesale Markets, em Bruxelas, projetando o trabalho realizado no Paraná no cenário mundial." },
  { year: "2026", title: "Um novo compromisso", text: "Leva a experiência de gestão para um projeto de representação do Paraná em Brasília." },
];

const results = [
  { number: "01", title: "Gestão moderna", text: "Planejamento, inovação e eficiência para transformar estruturas públicas em serviços melhores." },
  { number: "02", title: "Produtor valorizado", text: "Proximidade com quem produz, gera empregos e movimenta a economia de cada região." },
  { number: "03", title: "Alimento na mesa", text: "Fortalecimento do Banco de Alimentos e combate ao desperdício com responsabilidade social." },
  { number: "04", title: "Visão sustentável", text: "Projetos que conectam abastecimento, reaproveitamento, energia limpa e futuro." },
];

export const metadata = pageMetadata({
  path: "/quem-e-eder",
  title: "Quem é Eder Bublitz — trajetória, gestão e experiência | 1020",
  description: "Conheça Eder Bublitz, candidato a Deputado Federal pelo Paraná, número 1020: formação, atuação na Ceasa Paraná, segurança alimentar, gestão pública e trajetória.",
});

export default function QuemEEder() {
  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img decoding="async" src="/brand-lockup-1-navy.png" alt="" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/pelo-parana">Pelo Paraná</a>
          <a className="active" href="/quem-e-eder">Quem é o Eder</a>
          <a href="/propostas">Propostas</a>
          <a href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta headerMaterialCta" href="/participe">Receba nosso material de campanha <span>↗</span></a>
        <MobileMenu />
      </header>

      <section className="bioHero">
        <div className="bioHeroPhoto">
          <img decoding="async" src="/eder-visao.jpg" alt="Eder Bublitz olhando para o horizonte" loading="eager" fetchPriority="high" />
          <span className="bioPhotoTag">Cascavel • Paraná</span>
        </div>
        <div className="bioHeroCopy">
          <p className="sectionLabel">Quem é o Eder</p>
          <h1>Uma trajetória de trabalho.<br /><span>Uma vida de propósito.</span></h1>
          <p>Eder Bublitz construiu sua história com os pés no chão, perto de quem produz e com a convicção de que gestão pública precisa melhorar a vida das pessoas.</p>
          <div className="bioFacts">
            <span><b>Cascavel</b>Origem</span>
            <span><b>Zootecnista</b>Formação</span>
            <span><b>Gestor</b>Experiência</span>
          </div>
          <a href="#historia">Conheça essa trajetória <i>↓</i></a>
        </div>
      </section>

      <section className="bioExperience" id="experiencia">
        <div className="bioExperiencePhoto">
          <img decoding="async" src="/eder-experiencia-retrato-v2.webp" alt="Retrato de Eder Bublitz sorrindo e com os braços cruzados" loading="lazy" />
          <span aria-hidden="true">Experiência<br />que transforma</span>
        </div>
        <div className="bioExperienceCopy">
          <p className="sectionLabel">Compromisso que vem da prática</p>
          <h2>Experiência para fazer.<br /><span>Coragem para mudar.</span></h2>
          <p className="bioExperienceLead">Eder conhece de perto a força de quem trabalha e sabe que a política só faz sentido quando melhora a vida das pessoas.</p>
          <p>Uma trajetória construída com diálogo, presença e capacidade de transformar desafios em resultados para o Paraná.</p>
          <a href="#historia">Conheça essa trajetória <span>↓</span></a>
        </div>
      </section>

      <section className="bioStory" id="historia">
        <div className="bioStoryTitle">
          <p className="sectionLabel">Origem, preparo e trabalho</p>
          <h2>Experiência que<br /><span>nasceu da prática.</span></h2>
        </div>
        <div className="bioStoryText">
          <p className="bioLead">Natural de Cascavel, Eder Eduardo Bublitz é zootecnista formado pela Universidade Estadual de Maringá e fez da ligação com o campo o ponto de partida de sua trajetória.</p>
          <p>Na vida profissional, aprendeu que resultados consistentes dependem de planejamento, diálogo e presença. Essa visão orientou seu trabalho à frente da Ceasa Paraná, onde liderou um ciclo de modernização, valorização dos produtores e fortalecimento da segurança alimentar.</p>
          <blockquote>“A política só faz sentido quando chega à vida real das pessoas.”</blockquote>
        </div>
      </section>

      <section className="bioTimeline" aria-labelledby="timeline-title">
        <div className="timelineIntro">
          <p className="sectionLabel">Linha do tempo</p>
          <h2 id="timeline-title">Trabalho que<br /><span>deixa marcas.</span></h2>
        </div>
        <div className="timelineRail">
          {timeline.map((item) => (
            <article key={item.year}>
              <time>{item.year}</time><i aria-hidden="true" />
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="bioLeadership" id="lideranca-integrada">
        <div className="leadershipIntro">
          <p className="sectionLabel">Liderança integrada</p>
          <h2>Conectar mercados.<br /><span>Fortalecer pessoas.</span></h2>
          <p>Da atuação no Paraná à representação nacional e latino-americana, Eder ampliou o diálogo entre quem produz, quem abastece e quem precisa do alimento na mesa.</p>
        </div>
        <div className="leadershipBody">
          <p className="leadershipLead">À frente da Abracen e, depois, da Flama, Eder ajudou a aproximar centrais de abastecimento, gestores e produtores em torno de soluções compartilhadas.</p>
          <p>Essa integração fortalece a segurança alimentar, melhora a eficiência dos mercados e permite que boas práticas circulem entre cidades, estados e países. Liderar, para Eder, é unir experiências diferentes para construir resultados que cheguem à vida real.</p>
          <div className="leadershipPillars">
            <article><span>01</span><h3>Integração</h3><p>Diálogo entre mercados, produtores e gestores.</p></article>
            <article><span>02</span><h3>Abastecimento</h3><p>Estruturas mais eficientes e alimento acessível.</p></article>
            <article><span>03</span><h3>Cooperação</h3><p>Soluções construídas e compartilhadas em conjunto.</p></article>
          </div>
        </div>
      </section>

      <section className="bioResults">
        <div className="resultsHeading">
          <p className="sectionLabel">Gestão que transforma</p>
          <h2>Resultado não é discurso.<br /><span>É entrega.</span></h2>
          <p>Uma trajetória pública medida pela capacidade de transformar boas ideias em ações concretas.</p>
        </div>
        <div className="resultGrid">
          {results.map((result) => (
            <article key={result.number}>
              <span>{result.number}</span><h3>{result.title}</h3><p>{result.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bioRecognition" id="reconhecimento">
        <div className="recognitionPhoto"><img decoding="async" src="/eder-quem-e-portrait.jpg" alt="Retrato de Eder Bublitz sorrindo" loading="lazy" /></div>
        <div className="recognitionCopy">
          <p className="sectionLabel">Reconhecimento mundial • Bruxelas</p>
          <span className="recognitionYear">2025</span>
          <h2>Gestor do Ano.<br /><em>Reconhecido no mundo.</em></h2>
          <p>Eder foi eleito <strong>Gestor do Ano pela World Union of Wholesale Markets</strong>, em Bruxelas. O prêmio reconheceu sua liderança e o impacto positivo de uma gestão construída no Paraná com trabalho, inovação e responsabilidade.</p>
          <div className="recognitionProof">
            <span><b>01</b>Prêmio internacional</span>
            <span><b>2025</b>Ano do reconhecimento</span>
          </div>
          <div className="recognitionSeal"><b>WUWM</b><span>World Union of Wholesale Markets<br />Bruxelas • Bélgica</span></div>
        </div>
      </section>

      <section className="bioNext">
        <div className="bioNextCopy">
          <p className="sectionLabel">O próximo passo</p>
          <h2>Levar a experiência<br /><span>para Brasília.</span></h2>
          <p>O mesmo compromisso com resultado, diálogo e presença agora orienta um novo projeto: representar o Paraná na Câmara Federal.</p>
          <a href="/propostas">Conheça as propostas <span>→</span></a>
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
