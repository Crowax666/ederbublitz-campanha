"use client";

import { useState } from "react";

const links = [
  { href: "/pelo-parana", label: "Pelo Paraná" },
  { href: "/quem-e-eder", label: "Quem é o Eder" },
  { href: "/propostas", label: "Propostas" },
  { href: "/noticias", label: "Notícias" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mobileMenu${open ? " isOpen" : ""}`}>
      <button
        className="mobileMenuToggle"
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <i aria-hidden="true"><span /><span /><span /></i>
      </button>
      <nav className="mobileMenuPanel" id="mobile-navigation" aria-label="Navegação mobile">
        {links.map((link, index) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <small>0{index + 1}</small><span>{link.label}</span><b>→</b>
          </a>
        ))}
        <a className="mobileMenuCta" href="/participe" onClick={() => setOpen(false)}>
          <span>Receba nosso material de campanha</span><b>↗</b>
        </a>
      </nav>
    </div>
  );
}
