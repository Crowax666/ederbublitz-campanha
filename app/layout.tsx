import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eder Bublitz 1020 — Deputado Federal",
  description: "Eder Bublitz - Deputado Federal 1020. Perto de quem produz, junto de quem precisa.",
  robots: "index,follow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Eder Bublitz 1020 — Deputado Federal",
    description: "Perto de quem produz. Junto de quem precisa.",
  },
  twitter: {
    card: "summary_large_image",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a className="skipLink" href="#top">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
