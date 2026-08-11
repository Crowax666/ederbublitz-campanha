import Link from "next/link";

export default function LegalFooter({ biography = false }: { biography?: boolean }) {
  return (
    <footer className={`legalFooter${biography ? " legalFooterBio" : ""}`}>
      <div className="legalFooterIdentity">
        <strong>Eleição 2026 Eder Eduardo Bublitz Deputado Federal</strong>
        <span>CNPJ 68.455.145/0001-10</span>
        <span>Republicanos 10 · Eder Bublitz 1020 · Deputado Federal</span>
      </div>
      <nav aria-label="Informações legais">
        <Link href="/transparencia-eleitoral">Transparência eleitoral</Link>
        <Link href="/privacidade">Política de Privacidade</Link>
        {biography && <Link href="/">← Página inicial</Link>}
      </nav>
    </footer>
  );
}
