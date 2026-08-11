import Link from "next/link";

export const metadata = { title: "Transparência Eleitoral | Eder Bublitz 1020" };

const details = [
  ["Candidato", "Eder Eduardo Bublitz"],
  ["Cargo", "Deputado Federal"],
  ["Número", "1020"],
  ["Partido", "Republicanos - 10"],
  ["Nome empresarial", "ELEIÇÃO 2026 EDER EDUARDO BUBLITZ DEPUTADO FEDERAL"],
  ["CNPJ da campanha", "68.455.145/0001-10"],
];

export default function TransparencyPage() {
  return (
    <main className="privacyPage transparencyPage">
      <header><Link href="/">← Voltar ao site</Link><span>Eder Bublitz <small>1020</small></span></header>
      <article>
        <p className="privacyLabel">Informações oficiais da campanha</p>
        <h1>Transparência Eleitoral</h1>
        <p className="privacyUpdated">Dados cadastrais atualizados em 11 de agosto de 2026</p>
        <p>Esta página reúne a identificação oficial da candidatura responsável pelo conteúdo deste site.</p>
        <dl className="legalDetails">
          {details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <h2>Canal de contato</h2>
        <p>Dúvidas sobre este site, privacidade ou solicitações relacionadas aos dados pessoais podem ser encaminhadas para <a href="mailto:contato@ederbublitz.com.br">contato@ederbublitz.com.br</a>.</p>
        <h2>Privacidade e proteção de dados</h2>
        <p>Os dados enviados pelo formulário são tratados para contato e mobilização da campanha, mediante consentimento. Consulte as finalidades, os direitos do titular e as regras de conservação na <Link href="/privacidade">Política de Privacidade</Link>.</p>
        <aside>Conteúdo oficial da campanha de Eder Bublitz para Deputado Federal, número 1020, pelo Republicanos.</aside>
      </article>
    </main>
  );
}
