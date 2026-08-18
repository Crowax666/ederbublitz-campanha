import { redirect } from "next/navigation";
import Link from "next/link";
import { chatGPTSignInPath, chatGPTSignOutPath } from "../chatgpt-auth";
import { getAuthorizedAdmin } from "./auth";
import { listSupporters } from "../../db/supporters";
import { getRuntimeConfig } from "../../db/runtime";

export const dynamic = "force-dynamic";

const interestLabels: Record<string, string> = {
  participar: "Fazer parte", "receber-noticias": "Receber notícias",
  voluntariado: "Voluntariado", propostas: "Contribuir com propostas",
};

export default async function AdminPage() {
  const auth = await getAuthorizedAdmin();
  if (!auth.user && getRuntimeConfig().CLOUDFLARE_DEPLOYMENT !== "true") redirect(chatGPTSignInPath("/admin"));
  if (!auth.user) return <main className="adminGate"><div><span>ACESSO RESTRITO</span><h1>Autenticação necessária.</h1><p>O painel é protegido pelo Cloudflare Access.</p></div></main>;
  if (!auth.authorized) return <main className="adminGate"><div><span>ACESSO RESTRITO</span><h1>Este e-mail não está autorizado.</h1><p>Entre com a conta <strong>contato@ederbublitz.com.br</strong>.</p><a href={chatGPTSignOutPath("/admin")}>Trocar de conta</a></div></main>;

  const supporters = await listSupporters();
  const cities = new Set(supporters.map((item) => item.city.toLocaleLowerCase("pt-BR"))).size;
  return <main className="adminShell">
    <header className="adminHeader"><Link href="/" className="adminBrand">Eder Bublitz <small>1020</small></Link><div><span>{auth.user.email}</span><a href={chatGPTSignOutPath("/")}>Sair</a></div></header>
    <section className="adminIntro"><div><p>Painel administrativo</p><h1>Cadastros do site</h1><span>Dados protegidos e centralizados para acompanhamento da equipe.</span></div><div className="adminIntroActions"><Link className="adminExport adminExportSecondary" href="/admin/news">Notícias →</Link><a className="adminExport" href="/api/admin/supporters.csv">Exportar CSV ↓</a></div></section>
    <section className="adminStats"><article><strong>{supporters.length}</strong><span>cadastros exibidos</span></article><article><strong>{cities}</strong><span>cidades</span></article><article><strong>{supporters.filter((x) => x.status === "novo").length}</strong><span>novos contatos</span></article></section>
    <section className="adminTableWrap"><div className="adminTableHead"><h2>Contatos mais recentes</h2><span>Até 500 registros</span></div>
      {supporters.length ? <div className="adminTableScroll"><table><thead><tr><th>Nome</th><th>Telefone</th><th>Localidade</th><th>Interesse</th><th>Data</th></tr></thead><tbody>{supporters.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.status}</small></td><td><a href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" className="adminWhatsappLink">{item.phone}</a></td><td>{item.city}<small>{item.neighborhood || "—"}</small></td><td>{interestLabels[item.interest] || item.interest}</td><td>{new Date(item.created_at).toLocaleDateString("pt-BR")}</td></tr>)}</tbody></table></div> : <div className="adminEmpty"><strong>Nenhum cadastro ainda.</strong><p>Os novos contatos aparecerão aqui depois do envio do formulário.</p></div>}
    </section>
  </main>;
}
