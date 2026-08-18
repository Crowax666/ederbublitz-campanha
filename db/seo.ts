export const SITE_URL = "https://ederbublitz.com.br";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/eder-hero-desktop-hq-v3.jpg`;

/**
 * Monta o bloco de metadata de uma página (canonical + Open Graph + Twitter Card)
 * a partir só do path e do título/descrição — evita repetir url/imagem em cada página.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      locale: "pt_BR",
      url,
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}
