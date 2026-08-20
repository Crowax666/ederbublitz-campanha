import { redirect } from "next/navigation";
import Link from "next/link";
import { chatGPTSignInPath } from "../chatgpt-auth";
import { getAuthorizedAdmin, adminSignOutPath } from "./auth";
import {
  listSupporters,
  getDailySupporterCounts,
  getInterestBreakdown,
  getTopCities,
  getStatusBreakdown,
  getTrafficSourceBreakdown,
} from "../../db/supporters";
import { getRuntimeConfig } from "../../db/runtime";
import { TrendChart, BarList, interestLabels, statusLabels } from "./Charts";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const auth = await getAuthorizedAdmin();
  if (!auth.user && getRuntimeConfig().CLOUDFLARE_DEPLOYMENT !== "true") redirect(chatGPTSignInPath("/admin"));
  if (!auth.user) return <main className="adminGate"><div><span>ACESSO RESTRITO</span><h1>Autenticação necessária.</h1><p>O painel é protegido pelo Cloudflare Access.</p></div></main>;
  if (!auth.authorized) return <main className="adminGate"><div><span>ACESSO RESTRITO</span><h1>Este e-mail não está autorizado.</h1><p>Entre com a conta <strong>contato@ederbublitz.com.br</strong>.</p><a href={adminSignOutPath("/admin")}>Trocar de conta</a></div></main>;

  const [supporters, daily, interestBreakdown, topCities, statusBreakdown, sourceBreakdown] = await Promise.all([
    listSupporters(),
    getDailySupporterCounts(30),
    getInterestBreakdown(),
    getTopCities(8),
    getStatusBreakdown(),
    getTrafficSourceBreakdown(),
  ]);

  const cities = new Set(supporters.map((item) => item.city.toLocaleLowerCase("pt-BR"))).size;
  const last7Days = daily.slice(-7).reduce((sum, d) => sum + d.total, 0);

  return <main className="adminShell">
    <header className="adminHeader"><Link href="/" className="adminBrand">Eder Bublitz <small>1020</small></Link><div><span>{auth.user.email}</span><a href={adminSignOutPath("/")}>Sair</a></div></header>
    <section className="adminIntro"><div><p>Painel administrativo</p><h1>Cadastros do site</h1><span>Dados protegidos e centralizados para acompanhamento da equipe.</span></div><div className="adminIntroActions"><Link className="adminExport adminExportSecondary" href="/admin/news">Notícias →</Link><a className="adminExport" href="/api/admin/supporters.csv">Exportar CSV ↓</a></div></section>

    <section className="adminStats">
      <article><strong>{supporters.length}</strong><span>cadastros exibidos</span></article>
      <article><strong>{cities}</strong><span>cidades</span></article>
      <article><strong>{supporters.filter((x) => x.status === "novo").length}</strong><span>novos contatos</span></article>
      <article><strong>{last7Days}</strong><span>últimos 7 dias</span></article>
    </section>

    <section className="adminCharts">
      <div className="adminChartCard adminChartCard-wide">
        <h2>Cadastros ao longo do tempo</h2><span>Últimos 30 dias</span>
        <TrendChart data={daily} />
      </div>
      <div className="adminChartCard">
        <h2>Funil de status</h2><span>Do cadastro à confirmação</span>
        <BarList items={statusBreakdown} labelMap={statusLabels} tone="green" />
      </div>
      <div className="adminChartCard">
        <h2>Interesse</h2><span>Como querem participar</span>
        <BarList items={interestBreakdown} labelMap={interestLabels} tone="orange" />
      </div>
      <div className="adminChartCard">
        <h2>Top cidades</h2><span>Onde estão os apoiadores</span>
        <BarList items={topCities} tone="yellow" />
      </div>
      <div className="adminChartCard">
        <h2>Origem do acesso</h2><span>De onde vieram os cadastros</span>
        <BarList items={sourceBreakdown} tone="orange" />
      </div>
    </section>

    <section className="adminTableWrap"><div className="adminTableHead"><h2>Contatos mais recentes</h2><span>Até 500 registros</span></div>
      {supporters.length ? <div className="adminTableScroll"><table><thead><tr><th>Nome</th><th>Telefone</th><th>Localidade</th><th>Interesse</th><th>Origem</th><th>Status</th><th>Data</th></tr></thead><tbody>{supporters.map((item) => <tr key={item.id}><td><strong>{item.name}</strong></td><td><a href={`https://wa.me/${item.phone}`} target="_blank" rel="noopener noreferrer" className="adminWhatsappLink">{item.phone}</a></td><td>{item.city}<small>{item.neighborhood || "—"}</small></td><td>{interestLabels[item.interest] || item.interest}</td><td>{item.utm_source || item.referrer || "Direto"}</td><td><StatusSelect id={item.id} status={item.status} /></td><td>{new Date(item.created_at).toLocaleDateString("pt-BR")}</td></tr>)}</tbody></table></div> : <div className="adminEmpty"><strong>Nenhum cadastro ainda.</strong><p>Os novos contatos aparecerão aqui depois do envio do formulário.</p></div>}
    </section>
  </main>;
}
