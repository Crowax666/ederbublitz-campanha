import Link from "next/link";
import { pageMetadata } from "../../db/seo";

export const metadata = pageMetadata({
  path: "/privacidade",
  title: "Política de Privacidade | Eder Bublitz 1020",
  description: "Como os dados enviados pelo formulário Junte-se a nós são tratados.",
});

export default function PrivacyPage() {
  return <main className="privacyPage" id="top"><header><Link href="/">← Voltar ao site</Link><span>Eder Bublitz <small>1020</small></span></header><article>
    <p className="privacyLabel">Transparência e respeito</p><h1>Política de Privacidade</h1><p className="privacyUpdated">Versão de 11 de agosto de 2026</p>
    <p>Esta política explica como os dados enviados voluntariamente pelo formulário “Junte-se a nós” são tratados.</p>
    <h2>Responsável pelo tratamento</h2><p>O controlador dos dados é <strong>ELEIÇÃO 2026 EDER EDUARDO BUBLITZ DEPUTADO FEDERAL</strong>, inscrito no CNPJ sob o nº <strong>68.455.145/0001-10</strong>.</p>
    <h2>1. Dados coletados</h2><p>Podemos coletar nome, telefone, cidade, bairro, interesse de participação, origem do cadastro e o registro do consentimento.</p>
    <h2>2. Finalidades</h2><p>Os dados são utilizados para responder ao contato, enviar informações autorizadas, organizar a participação e mobilização da campanha e registrar a preferência indicada no formulário.</p>
    <h2>3. Base legal e consentimento</h2><p>O tratamento é realizado com o consentimento informado no formulário. Como a participação política pode revelar dado pessoal sensível, adotamos acesso restrito e finalidade específica.</p>
    <h2>4. Compartilhamento e armazenamento</h2><p>Os dados não são comercializados. O acesso é limitado à equipe autorizada e a fornecedores de infraestrutura necessários ao funcionamento seguro do site, observadas as obrigações de proteção de dados.</p>
    <h2>5. Segurança e conservação</h2><p>Utilizamos controles técnicos e administrativos para reduzir acessos indevidos. Os dados serão mantidos apenas pelo período necessário às finalidades informadas e às obrigações legais aplicáveis.</p>
    <h2>6. Seus direitos</h2><p>Você pode solicitar confirmação, acesso, correção, revogação do consentimento ou exclusão dos dados, quando aplicável.</p>
    <h2>7. Contato</h2><p>Para exercer seus direitos, revogar o consentimento ou tirar dúvidas, escreva para <a href="mailto:contato@ederbublitz.com.br">contato@ederbublitz.com.br</a>.</p>
    <aside>Esta política poderá ser atualizada para refletir mudanças no site, na campanha ou nas regras aplicáveis. A versão vigente ficará sempre disponível nesta página.</aside>
  </article></main>;
}
