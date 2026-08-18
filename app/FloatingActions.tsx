const WHATSAPP_NUMBER = "5541992794117";
const WHATSAPP_MESSAGE = "Oi Eder, eu vim através do seu site e gostaria de mais informações sobre suas pautas.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/**
 * Botões flutuantes presentes em todas as páginas do site:
 * WhatsApp real (direita) e Voltar ao topo (esquerda).
 */
export default function FloatingActions() {
  return (
    <>
      <div className="floatingBackTop" aria-label="Voltar ao topo da página">
        <a className="floatAction backToTop" href="#top" aria-label="Voltar ao topo">
          <b>Voltar ao topo</b>
          <i aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
            </svg>
          </i>
        </a>
      </div>

      <div className="floatingWhatsapp" aria-label="Fale conosco pelo WhatsApp">
        <a
          className="floatAction whatsappReal"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp com Eder Bublitz"
        >
          <b>Fale no WhatsApp</b>
          <i aria-hidden="true">
            <svg viewBox="0 0 32 32" role="img">
              <path fill="currentColor" d="M16 3.2A12.6 12.6 0 0 0 5.13 22.16L3.2 28.8l6.82-1.79A12.6 12.6 0 1 0 16 3.2Zm0 22.84c-1.93 0-3.8-.53-5.43-1.53l-.39-.23-4.05 1.06 1.08-3.95-.25-.4A10.23 10.23 0 1 1 16 26.04Z" />
              <path fill="currentColor" d="M21.62 18.45c-.31-.16-1.83-.9-2.11-1-.28-.11-.49-.16-.69.16-.2.31-.8 1-.98 1.2-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53a9.28 9.28 0 0 1-1.72-2.14c-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.69-1.67-.95-2.29-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.58s1.11 2.99 1.26 3.2c.16.2 2.18 3.33 5.28 4.67.74.32 1.31.51 1.76.65.74.23 1.41.2 1.94.12.59-.09 1.83-.75 2.08-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.36Z" />
            </svg>
          </i>
        </a>
      </div>
    </>
  );
}
