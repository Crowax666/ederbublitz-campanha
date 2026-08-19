import type { DailyCount, LabelCount } from "../../db/supporters";

const interestLabels: Record<string, string> = {
  participar: "Fazer parte",
  "receber-noticias": "Receber notícias",
  voluntariado: "Voluntariado",
  propostas: "Contribuir com propostas",
};

const statusLabels: Record<string, string> = {
  novo: "Novo",
  contatado: "Contatado",
  confirmado: "Confirmado",
  descartado: "Descartado",
};

/** Gráfico de linha/área simples em SVG mostrando cadastros por dia. */
export function TrendChart({ data }: { data: DailyCount[] }) {
  if (!data.length) return <div className="chartEmpty">Sem dados no período.</div>;

  const width = 720;
  const height = 220;
  const padding = { top: 16, right: 16, bottom: 28, left: 32 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const max = Math.max(1, ...data.map((d) => d.total));

  const points = data.map((d, i) => {
    const x = padding.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
    const y = padding.top + innerH - (d.total / max) * innerH;
    return { x, y, d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${padding.top + innerH} L${points[0].x.toFixed(1)},${padding.top + innerH} Z`;

  // Mostra no máximo ~7 rótulos no eixo X pra não poluir.
  const labelStep = Math.max(1, Math.ceil(data.length / 7));

  return (
    <svg className="trendChart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Cadastros por dia">
      <path d={areaPath} className="trendArea" />
      <path d={linePath} className="trendLine" />
      {points.map((p, i) => (i % labelStep === 0 || i === points.length - 1) ? (
        <g key={p.d.day}>
          <circle cx={p.x} cy={p.y} r={3} className="trendDot" />
          <text x={p.x} y={height - 8} textAnchor="middle" className="trendAxisLabel">
            {new Date(`${p.d.day}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
          </text>
        </g>
      ) : null)}
      <text x={padding.left} y={padding.top + 4} className="trendAxisLabel trendAxisMax">{max}</text>
    </svg>
  );
}

/** Lista de barras horizontais — usada para interesse, cidades, origem e funil de status. */
export function BarList({ items, labelMap, tone = "orange" }: { items: LabelCount[]; labelMap?: Record<string, string>; tone?: "orange" | "yellow" | "green" }) {
  const total = Math.max(1, items.reduce((sum, item) => sum + item.total, 0));
  const max = Math.max(1, ...items.map((item) => item.total));

  if (!items.length || total === 0) return <div className="chartEmpty">Sem dados ainda.</div>;

  return (
    <div className={`barList barList-${tone}`}>
      {items.map((item) => {
        const label = labelMap?.[item.label] || item.label;
        const pct = Math.round((item.total / total) * 100);
        const widthPct = Math.max(4, Math.round((item.total / max) * 100));
        return (
          <div className="barRow" key={item.label}>
            <span className="barRowLabel">{label}</span>
            <div className="barRowTrack"><div className="barRowFill" style={{ width: `${widthPct}%` }} /></div>
            <span className="barRowValue">{item.total}<small>{pct}%</small></span>
          </div>
        );
      })}
    </div>
  );
}

export { interestLabels, statusLabels };
