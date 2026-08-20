import type { MetadataRoute } from "next";
import { SITE_URL } from "../db/seo";

export default function sitemap(): MetadataRoute.Sitemap {
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
    "/privacidade",
    "/transparencia-eleitoral",
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
