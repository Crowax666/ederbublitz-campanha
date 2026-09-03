import EditorialReveal from "../EditorialReveal";

const SITE_URL = "https://ederbublitz.com.br";

export default function PropostasLayout({ children }: { children: React.ReactNode }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/propostas#collection`,
        url: `${SITE_URL}/propostas`,
        name: "Propostas de Eder Bublitz 1020",
        description: "Propostas de Eder Bublitz para representar o Paraná na Câmara Federal.",
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        hasPart: [
          { "@id": `${SITE_URL}/propostas/educacao#webpage` },
          { "@id": `${SITE_URL}/propostas/banco-de-alimentos#webpage` },
          { "@id": `${SITE_URL}/propostas/agricultura#webpage` },
          { "@id": `${SITE_URL}/propostas/mulheres#webpage` },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/propostas#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Propostas", item: `${SITE_URL}/propostas` },
        ],
      },
    ],
  };

  return (
    <>
      <EditorialReveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      {children}
    </>
  );
}
