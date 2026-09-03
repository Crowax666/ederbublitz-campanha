import type { MetadataRoute } from "next";
import { SITE_URL } from "../db/seo";
import { listNews } from "../db/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastContentUpdate = new Date("2026-09-03T00:00:00.000Z");
  const paths = [
    "/",
    "/quem-e-eder",
    "/propostas",
    "/pelo-parana",
    "/noticias",
    "/participe",
    "/propostas/educacao",
    "/propostas/banco-de-alimentos",
    "/propostas/agricultura",
    "/propostas/mulheres",
    "/propostas/inclusao-e-reabilitacao",
    "/privacidade",
    "/transparencia-eleitoral",
  ];

  const staticPages: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastContentUpdate,
  }));

  try {
    const news = await listNews({ onlyPublished: true });
    const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
      url: `${SITE_URL}/noticias/${item.slug}`,
      lastModified: new Date(item.updated_at || item.published_at || item.created_at),
    }));

    return [...staticPages, ...newsPages];
  } catch {
    // O sitemap principal continua disponível mesmo se o D1 estiver temporariamente indisponível.
    return staticPages;
  }
}
