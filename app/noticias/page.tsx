import MobileMenu from "../MobileMenu";
import LegalFooter from "../LegalFooter";
import { listYoutubeVideos, formatVideoDate, compactDescription, CHANNEL_URL, CHANNEL_SUBSCRIBE_URL } from "../../db/youtube";

export const metadata = {
  title: "Notícias e vídeos — Eder Bublitz 1020",
  description: "Acompanhe as notícias e os vídeos de Eder Bublitz.",
  openGraph: {
    title: "Notícias e vídeos — Eder Bublitz 1020",
    description: "Acompanhe as notícias e os vídeos de Eder Bublitz.",
  },
};

export default async function NoticiasPage() {
  const youtubeVideos = await listYoutubeVideos();
  const [latestVideo, ...otherVideos] = youtubeVideos;

  return (
    <main className="internalPage" id="top">
      <header className="siteHeader internalHeader">
        <a className="brand" href="/" aria-label="Eder Bublitz — início">
          <span className="headerWordmark">Eder Bublitz<small>Deputado Federal</small></span>
          <span className="mobileHeaderNumber" aria-hidden="true"><img src="/brand-lockup-1-navy.png" alt="" decoding="async" /></span>
        </a>
        <nav className="desktopNav" aria-label="Navegação principal">
          <a href="/quem-e-eder">Quem é Eder</a>
          <a href="/propostas">Propostas</a>
          <a href="/pelo-parana">Pelo Paraná</a>
          <a className="active" href="/noticias">Notícias</a>
        </nav>
        <a className="headerCta" href="/participe">Junte-se a nós <span>↗</span></a>
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
          {/* sub_confirmation=1 faz o YouTube já sugerir a inscrição automaticamente ao abrir o canal */}
          <a className="btnYoutube" href={CHANNEL_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
            </svg>
            Inscreva-se no canal
          </a>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}
