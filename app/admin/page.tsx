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
  getRecentSupporterCount,
} from "../../db/supporters";
import { getRuntimeConfig } from "../../db/runtime";
import { TrendChart, BarList, interestLabels, statusLabels } from "./Charts";
import StatusSelect from "./StatusSelect";
import CampaignLinkBuilder from "./CampaignLinkBuilder";
import SupporterContactAction from "./SupporterContactAction";
import { getAnalyticsSummary, getAccessSourceBreakdown, getTopPages, getCampaignAnalytics } from "../../db/analytics";
import {
  decodeMaterialRequest,
  FULFILLMENT_OPTIONS,
  HELP_OPTIONS,
  MATERIAL_OPTIONS,
  QUANTITY_OPTIONS,
  optionLabel,
} from "../../lib/material-requests";
import { splitCampaignKey } from "../../lib/campaign-attribution";
import "./admin-activation.css";

export const dynamic = "force-dynamic";

function activationMessage(name: string, interest: string, material: ReturnType<typeof decodeMaterialRequest>) {
  const firstName = name.trim().split(/\s+/)[0] || name.trim();
  const proposals = "https://ederbublitz.com.br/propostas";
  if (material) {
    const items = material.items.map((id) => optionLabel(MATERIAL_OPTIONS, id)).join(", ");
    return `Olá, ${firstName}! Aqui é da equipe do Eder Bublitz 1020. Recebemos seu pedido de ${items}. Podemos confirmar a disponibilidade e combinar ${material.fulfillment === "entrega" ? "a entrega" : "a retirada"}? Conheça também as propostas do Eder: ${proposals}`;
  }
  if (interest === "voluntariado") return `Olá, ${firstName}! Aqui é da equipe do Eder Bublitz 1020. Vimos que você quer ser voluntário. Em que área ou atividade gostaria de ajudar? Conheça nossas propostas: ${proposals}`;
  if (interest === "receber-noticias") return `Olá, ${firstName}! Aqui é da equipe do Eder Bublitz 1020. Recebemos seu cadastro para acompanhar as novidades. Conheça as propostas e conte pra gente quais temas mais importam para você: ${proposals}`;
  if (interest === "propostas") return `Olá, ${firstName}! Aqui é da equipe do Eder Bublitz 1020. Recebemos seu interesse em contribuir com propostas. Qual tema você gostaria de conversar com a equipe? Veja os eixos atuais: ${proposals}`;
  return `Olá, ${firstName}! Aqui é da equipe do Eder Bublitz 1020. Recebemos seu cadastro para fazer parte do time. Como você gostaria de participar? Conheça nossas propostas: ${proposals}`;
}

export default async function AdminPage() {
  const auth = await getAuthorizedAdmin();
  if (!auth.user && getRuntimeConfig().CLOUDFLARE_DEPLOYMENT !== "true") redirect(chatGPTSignInPath("/admin"));
  if (!auth.user) return <main className="adminGate"><div><span>ACESSO RESTRITO</span><h1>Autenticação necessária.</h1><p>O painel é protegido pelo Cloudflare Access.</p></div></main>;
  if (!auth.authorized) return <main className="adminGate"><div><span>ACESSO RESTRITO</span><h1>Este e-mail não está autorizado.</h1><p>Entre com a conta <strong>contato@ederbublitz.com.br</strong>.</p><a href={adminSignOutPath("/admin")}>Trocar de conta</a></div></main>;

  const [supporters, daily, interestBreakdown, topCities, statusBreakdown, sourceBreakdown, analytics, accessSources, topPages, campaignAnalytics, last7Days] = await Promise.all([
    listSupporters(),
    getDailySupporterCounts(30),
    getInterestBreakdown(),
    getTopCities(8),
    getStatusBreakdown(),
    getTrafficSourceBreakdown(),
    getAnalyticsSummary(30),
    getAccessSourceBreakdown(30),
    getTopPages(30),
    getCampaignAnalytics(30),
    getRecentSupporterCount(7),
  ]);

  const cities = new Set(supporters.map((item) => item.city.toLocaleLowerCase("pt-BR"))).size;
  return <main className="adminShell">
    <header className="adminHeader"><Link href="/" className="adminBrand">Eder Bublitz <small>1020</small></Link><div><span>{auth.user.email}</span><a href={adminSignOutPath("/")}>Sair</a></div></header>
    <section className="adminIntro"><div><p>Painel administrativo</p><h1>Cadastros do site</h1><span>Dados protegidos e centralizados para acompanhamento da equipe.</span></div><div className="adminIntroActions"><Link className="adminExport adminExportSecondary" href="/admin/news">Notícias →</Link><a className="adminExport" href="/api/admin/supporters.csv">Exportar CSV ↓</a></div></section>

    <section className="adminStats">
      <article><strong>{analytics.views}</strong><span>visualizações · 30 dias</span></article>
      <article><strong>{analytics.visitors}</strong><span>visitantes únicos · 30 dias</span></article>
      <article><strong>{analytics.sessions}</strong><span>sessões · 30 dias</span></article>
      <article><strong>{analytics.registrations}</strong><span>contatos rastreados · 30 dias</span></article>
      <article><strong>{analytics.conversionRate.toLocaleString("pt-BR")}%</strong><span>taxa de conversão</span></article>
      <article><strong>{cities}</strong><span>cidades cadastradas</span></article>
      <article><strong>{supporters.filter((x) => x.status === "novo").length}</strong><span>novos contatos</span></article>
      <article><strong>{last7Days}</strong><span>contatos · últimos 7 dias</span></article>
    </section>

    <section className="adminActivation">
      <article className="adminActivationBrief"><span>Prioridade imediata</span><strong>{supporters.filter((item) => item.status === "novo").length}</strong><h2>contatos aguardando ativação</h2><p>Abra a conversa com a mensagem personalizada e, depois do envio, altere o status para <b>Contatado</b>. A fila abaixo deixa os mais antigos primeiro.</p></article>
      <CampaignLinkBuilder />
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
      <div className="adminChartCard">
        <h2>Acessos por origem</h2><span>Sessões dos últimos 30 dias</span>
        <BarList items={accessSources} tone="green" />
      </div>
      <div className="adminChartCard">
        <h2>Páginas mais acessadas</h2><span>Visualizações dos últimos 30 dias</span>
        <BarList items={topPages} tone="yellow" />
      </div>
      <div className="adminChartCard adminChartCard-wide">
        <h2>Desempenho das peças no WhatsApp</h2><span>Sessões, pessoas e contatos dos últimos 30 dias</span>
        {campaignAnalytics.length ? <div className="campaignAnalyticsTable"><table><thead><tr><th>Campanha</th><th>Peça</th><th>Sessões</th><th>Pessoas</th><th>Cadastros</th></tr></thead><tbody>{campaignAnalytics.map((item) => <tr key={`${item.campaign}-${item.content}`}><td>{item.campaign}</td><td>{item.content}</td><td>{item.sessions}</td><td>{item.visitors}</td><td>{item.registrations}</td></tr>)}</tbody></table></div> : <p className="chartEmpty">Os dados aparecerão depois que os novos links rastreados forem compartilhados.</p>}
      </div>
    </section>

    <section className="adminTableWrap"><div className="adminTableHead"><h2>Fila de contatos</h2><span>Novos primeiro · até 500 registros</span></div>
      {supporters.length ? <div className="adminTableScroll"><table><thead><tr><th>Nome</th><th>Telefone</th><th>Localidade</th><th>Interesse</th><th>Origem</th><th>Acessos</th><th>Ação</th><th>Status</th><th>Cadastro</th></tr></thead><tbody>{supporters.map((item) => {
        const material = decodeMaterialRequest(item.interest);
        const campaign = splitCampaignKey(item.utm_campaign);
        return <tr key={item.id}><td><strong>{item.name}</strong></td><td><span className="adminPhone">{item.phone}</span></td><td>{item.city}<small>{item.neighborhood || "—"}</small></td><td>{material ? <div className="adminMaterialDetail"><strong>Material de campanha</strong><small>{material.items.map((id) => optionLabel(MATERIAL_OPTIONS, id)).join(", ")}</small><small>{optionLabel(QUANTITY_OPTIONS, material.quantity)} · {optionLabel(HELP_OPTIONS, material.help)}</small><small>{optionLabel(FULFILLMENT_OPTIONS, material.fulfillment)}</small></div> : interestLabels[item.interest] || item.interest}</td><td>{item.access_source || item.utm_source || item.referrer || "Direto"}<small>{campaign.campaign ? `${campaign.campaign}${campaign.content ? ` · ${campaign.content}` : ""}` : item.device_type || "—"}</small></td><td><strong>{item.access_count}</strong><small>{item.session_count} {item.session_count === 1 ? "sessão" : "sessões"}{item.last_access_at ? ` · último ${new Date(item.last_access_at).toLocaleDateString("pt-BR")}` : ""}</small></td><td><SupporterContactAction phone={item.phone} message={activationMessage(item.name, item.interest, material)} /></td><td><StatusSelect id={item.id} status={item.status} materialRequest={Boolean(material)} /></td><td>{new Date(item.created_at).toLocaleDateString("pt-BR")}</td></tr>;
      })}</tbody></table></div> : <div className="adminEmpty"><strong>Nenhum cadastro ainda.</strong><p>Os novos contatos aparecerão aqui depois do envio do formulário.</p></div>}
    </section>
  </main>;
}
