import MobileMenu from "../../MobileMenu";
import LegalFooter from "../../LegalFooter";

const trajectory = [
  { number: "01", title: "Visão de Gestão", text: "Estruturou o modelo unindo eficiência logística, inovação e impacto social direto, garantindo que os produtos chegassem com rapidez e qualidade a quem mais precisa." },
  { number: "02", title: "Reconhecimento Internacional", text: "O trabalho à frente da gestão de abastecimento rendeu a Éder, em novembro de 2025, o prêmio de Melhor Gestor do Ano pela World Union of Wholesale Markets (WUWM), em Bruxelas." },
  { number: "03", title: "Legado de Transformação", text: "Mais do que toneladas arrecadadas, a iniciativa reflete a marca da gestão de Éder: unir o desenvolvimento econômico do Paraná à sensibilidade humana e à justiça social." },
];

const impact = [
  { number: "7,3 mi", title: "Quilos por ano", text: "Alimentos recuperados e destinados todos os anos, evitando o descarte de produtos com perfeitas condições nutricionais." },
  { number: "160 mil", title: "Pessoas por mês", text: "Atendidas diretamente por uma rede de distribuição que conecta as unidades da Ceasa em cinco cidades do Paraná." },
  { number: "5", title: "Cidades atendidas", text: "Curitiba, Londrina, Maringá, Foz do Iguaçu e Cascavel, através da capilaridade das unidades da Ceasa Paraná." },
  { number: "Centenas", title: "De instituições", text: "Creches, orfanatos, hospitais públicos e casas de recuperação beneficiados com técnica, agilidade e respeito." },
];

export default function PropostaBancoDeAlimentos() {
  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img src="/brand-lockup-1-navy.png" alt="" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/quem-e-eder">Quem é Eder</a>
          <a className="active" href="/#propostas">Propostas</a>
          <a href="/#parana">Pelo Paraná</a>
          <a href="/#participe">Participe</a>
        </nav>
        <a className="headerCta" href="/#participe">Junte-se a nós <span>↗</span></a>
        <MobileMenu />
      </header>

      <section className="bioHero">
        <div className="bioHeroPhoto">
          <img src="/eder-quem-e.jpg" alt="Eder Bublitz sorrindo" loading="eager" fetchPriority="high" />
        </div>
        <div className="bioHeroCopy">
          <p className="sectionLabel">Proposta • Banco de Alimentos</p>
          <h1>Solidariedade<br /><span>em movimento.</span></h1>
          <p>O Banco de Alimentos nasce da convicção de que desperdício e fome não podem coexistir na mesma sociedade. Mais do que uma estrutura logística, a iniciativa é uma ponte entre quem produz em excesso e quem precisa de apoio alimentar com dignidade.</p>
          <div className="bioFacts">
            <span><b>2024</b>Ouro no Stevie Awards</span>
            <span><b>7,3 mi kg</b>Recuperados por ano</span>
          </div>
          <a href="#impacto">Conheça os números <span>↓</span></a>
        </div>
      </section>

      <section className="bioLeadership" id="trajetoria">
        <div className="leadershipIntro">
          <p className="sectionLabel">Conexão com a trajetória</p>
          <h2>Uma ideia que<br /><span>ganhou escala.</span></h2>
          <p>A história do Banco de Alimentos está enraizada na trajetória de Éder Bublitz, idealizador e principal impulsionador do Banco de Alimentos Comida Boa.</p>
        </div>
        <div className="leadershipBody">
          <p className="leadershipLead">Com vivência sólida no setor produtivo, na gestão pública e no desenvolvimento regional, Éder enxergou na estrutura dos entrepostos de abastecimento um potencial transformador único.</p>
          <p>Sob sua liderança, o projeto ganhou escala, método e capilaridade, tornando-se referência nacional e internacional no combate ao desperdício de alimentos.</p>
          <div className="leadershipPillars">
            {trajectory.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bioRecognition">
        <div className="recognitionPhoto"><img src="/eder-experiencia-retrato-v2.webp" alt="Eder Bublitz, retrato" loading="lazy" /></div>
        <div className="recognitionCopy">
          <p className="sectionLabel">Excelência reconhecida mundialmente</p>
          <span className="recognitionYear">2024</span>
          <h2>Ouro em Istambul.<br /><em>Referência global.</em></h2>
          <p>O compromisso do Banco de Alimentos Comida Boa com a segurança alimentar transcendeu as fronteiras do Brasil. Em 2024, o projeto foi laureado com o prestigiado <strong>Stevie® Awards</strong>, em Istambul, na Turquia — medalha de ouro na categoria "Empresa do Ano de Alimentos e Bebidas", entre 3.600 iniciativas de 62 países.</p>
          <div className="recognitionProof">
            <span><b>Ouro</b>Stevie Awards 2024</span>
            <span><b>62</b>Países concorrentes</span>
          </div>
          <div className="recognitionSeal"><b>WUWM</b><span>Melhor Gestor do Ano 2025<br />Bruxelas • Bélgica</span></div>
        </div>
      </section>

      <section className="bioResults" id="impacto">
        <div className="resultsHeading">
          <p className="sectionLabel">Números que transformam vidas</p>
          <h2>Impacto e<br /><span>alcance real.</span></h2>
          <p>A operação que transforma excedentes em dignidade apresenta indicadores robustos de alcance e eficácia.</p>
        </div>
        <div className="resultGrid">
          {impact.map((item) => (
            <article key={item.title}>
              <span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bioNext">
        <div className="bioNextCopy">
          <p className="sectionLabel">Vamos juntos</p>
          <h2>Levar essa rede<br /><span>além do Paraná.</span></h2>
          <p>O mesmo modelo que já transforma 160 mil vidas por mês pode se tornar política pública nacional de combate ao desperdício e à fome.</p>
          <a href="/#participe">Quero participar <span>→</span></a>
        </div>
        <div className="bioNextVisual">
          <img className="bioNextPhoto" src="/eder-proximo-passo-v2.webp" alt="Eder Bublitz sorrindo e apontando para o convite à participação" loading="lazy" />
          <img className="bioNextBrand" src="/brand-lockup-1-navy.png" alt="1020 — Eder Bublitz — Deputado Federal" loading="lazy" />
        </div>
      </section>

      <footer className="bioFooter">
        <a href="/">← Voltar para a página inicial</a>
        <img src="/republicanos-logo-transparent.png" alt="Republicanos 10" loading="lazy" />
      </footer>
      <LegalFooter biography />
    </main>
  );
}
