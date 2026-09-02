import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import { listYoutubeVideos, formatVideoDate, compactDescription, CHANNEL_URL, CHANNEL_SUBSCRIBE_URL } from "../../db/youtube";
import { listNews } from "../../db/news";
import { pageMetadata } from "../../db/seo";
import FloatingActions from "../FloatingActions";

export const metadata = pageMetadata({
  path: "/noticias",
  title: "Notícias de Eder Bublitz 1020 — Deputado Federal pelo Paraná",
  description: "Acompanhe notícias, vídeos, agenda pública e conteúdos oficiais de Eder Bublitz 1020, candidato a Deputado Federal pelo Paraná.",
});

export default async function NoticiasPage() {
  const [youtubeVideos, news] = await Promise.all([
    listYoutubeVideos(),
    listNews({ onlyPublished: true }),
  ]);
  const [latestVideo, ...otherVideos] = youtubeVideos;

  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img src="/brand-lockup-1-navy.png" alt="" decoding="async" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/pelo-parana">Pelo Paraná</a>
          <a href="/quem-e-eder">Quem é o Eder</a>
          <a href="/propostas">Propostas</a>
          <a className="active" href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta headerMaterialCta" href="/participe">Receba nosso material de campanha <span>↗</span></a>
        <MobileMenu />
      </header>

      <h1 className="srOnly">Notícias e vídeos</h1>

      <section className="videosSection" id="noticias">
        <div className="videosIntro">
          <p className="sectionLabel">Notícias e vídeos</p>
          <h2>Acompanhe o Eder<br /><span>no YouTube.</span></h2>
          <p>Fique por dentro das novidades, entrevistas e propostas para o nosso Paraná.</p>
        </div>

        {latestVideo ? (
          <div className="videoGrid">
            <div className="videoWrapper videoWrapperFeatured">
              <div className="videoFrame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${latestVideo.id}?rel=0&modestbranding=1&playsinline=1`}
                  title={latestVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="videoCaption">
                <span>{formatVideoDate(latestVideo.publishedAt)}</span>
                <h3>{latestVideo.title}</h3>
                <p>{compactDescription(latestVideo.description)}</p>
              </div>
            </div>

            {otherVideos.slice(0, 3).map((video) => (
              <div className="videoWrapper" key={video.id}>
                <div className="videoFrame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1&playsinline=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="videoCaption">
                  <span>{formatVideoDate(video.publishedAt)}</span>
                  <h3>{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videosEmpty">
            <p>Não conseguimos carregar o feed do YouTube neste momento.</p>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">Abrir o canal diretamente ↗</a>
          </div>
        )}

        <div className="canalCta">
          <a className="btnYoutube" href={CHANNEL_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
            </svg>
            Inscreva-se no canal
          </a>
        </div>
      </section>

      {news.length > 0 && (
        <section className="newsListSection">
          <p className="sectionLabel">Últimas notícias</p>
          <h2>O que está<br /><span>acontecendo.</span></h2>
          <div className="newsListGrid">
            {news.map((item) => (
              <a className="newsCard" href={`/noticias/${item.slug}`} key={item.id}>
                <time dateTime={new Date(item.published_at || item.created_at).toISOString()}>
                  {new Date(item.published_at || item.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                </time>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      <LegalFooter />
      <FloatingActions />
    </main>
  );
}
