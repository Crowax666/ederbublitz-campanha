const SITE_URL = "https://ederbublitz.com.br";

export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Eder Bublitz 1020 — Deputado Federal",
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Eder Bublitz",
        url: SITE_URL,
        image: `${SITE_URL}/eder-hero-desktop-hq-v3.jpg`,
        description:
          "Eder Bublitz, candidato a Deputado Federal pelo Paraná, número 1020, pelo Republicanos 10.",
        jobTitle: "Candidato a Deputado Federal pelo Paraná",
        affiliation: {
          "@type": "Organization",
          name: "Republicanos",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
