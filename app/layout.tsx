import type { Metadata } from "next";
import "./globals.css";
import { pageMetadata } from "../db/seo";
import MetaPixel from "./MetaPixel";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Eder Bublitz 1020 — Deputado Federal",
    description: "Site oficial de Eder Bublitz, candidato a Deputado Federal pelo Paraná, número 1020.",
  }),
  robots: "index,follow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#071d33",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <MetaPixel />
        <a className="skipLink" href="#top">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
