/**
 * Integração com o canal do YouTube — mesma abordagem usada em ederbublitz.com.br:
 * lê o feed RSS público do canal (sem precisar de chave de API do YouTube Data API,
 * sem consumir cota) e faz o parse manual do XML.
 */

const CHANNEL_HANDLE = "EderBublitz";
export const CHANNEL_URL = `https://www.youtube.com/@${CHANNEL_HANDLE}`;
export const CHANNEL_SUBSCRIBE_URL = `${CHANNEL_URL}?sub_confirmation=1`;
const CHANNEL_ID = "UCxJEd-kVyWc7881L3sJkLYw";
const CACHE_TTL_MS = 1000 * 60 * 20;

export type YoutubeVideo = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  thumbnail: string;
};

let cache:
  | {
      expiresAt: number;
      videos: YoutubeVideo[];
    }
  | null = null;

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function matchFirst(source: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) return decodeXml(match[1]);
  }
  return null;
}

function parseFeed(feed: string): YoutubeVideo[] {
  const entries = feed.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entries
    .map((entry) => {
      const id =
        matchFirst(entry, [/<yt:videoId>(.*?)<\/yt:videoId>/]) ||
        matchFirst(entry, [/<id>yt:video:(.*?)<\/id>/]);
      const title = matchFirst(entry, [/<media:title>([\s\S]*?)<\/media:title>/, /<title>([\s\S]*?)<\/title>/]);
      const description = matchFirst(entry, [/<media:description>([\s\S]*?)<\/media:description>/]) || "";
      const publishedAt = matchFirst(entry, [/<published>(.*?)<\/published>/]) || "";
      const thumbnail = matchFirst(entry, [/<media:thumbnail url="([^"]+)"/]) || "";

      if (!id || !title) return null;

      return {
        id,
        title,
        description,
        publishedAt,
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    })
    .filter((video): video is YoutubeVideo => Boolean(video));
}

export async function listYoutubeVideos(): Promise<YoutubeVideo[]> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.videos;
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      {
        signal: AbortSignal.timeout(8_000),
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; EderBublitzCampanha/1.0; +https://ederbublitz.com.br)",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        next: { revalidate: 1200 },
      },
    );

    if (!response.ok) throw new Error(`YouTube request failed: ${response.status}`);

    const feed = await response.text();
    const videos = parseFeed(feed);

    cache = { expiresAt: Date.now() + CACHE_TTL_MS, videos };
    return videos;
  } catch (error) {
    console.error("[YouTube] Erro ao buscar vídeos:", error);
    return cache?.videos ?? [];
  }
}

export function formatVideoDate(value: string) {
  if (!value) return "YouTube";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(value),
  );
}

export function compactDescription(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  if (!text) return "Publicado no canal oficial do Eder Bublitz.";
  return text.length > 130 ? `${text.slice(0, 127)}...` : text;
}
