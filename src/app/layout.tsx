import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Providers from "@/components/Providers";
import { SEASON, season } from "@/lib/season";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const description =
  "Hand-poured soy candles, made in small batches for the quiet moments: the gift, the long bath, the book you cannot put down.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Miraki — Handmade luxury candles",
    template: "%s — Miraki",
  },
  description,
  openGraph: {
    type: "website",
    siteName: "Miraki Candles",
    title: "Miraki — Handmade luxury candles",
    description,
    images: [{ url: season.hero.image, width: 2000, height: 1333, alt: season.hero.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miraki — Handmade luxury candles",
    description,
    images: [season.hero.image],
  },
};

// Show the intro on the first visit to the home page in a browser session only.
const introScript = `try{var d=document.documentElement;if(location.pathname!=="/"||sessionStorage.getItem("miraki-intro")){d.dataset.introSeen="1"}else{sessionStorage.setItem("miraki-intro","1")}}catch(e){document.documentElement.dataset.introSeen="1"}`;

const BRAND = "MIRAKI";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-season={SEASON}
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div className="intro" aria-hidden>
          <div className="flex flex-col items-center">
            <svg viewBox="-14 -50 28 52" className="h-14 w-8">
              <g className="intro-flame">
                <path
                  d="M0 -48 C 9 -30 13 -19 13 -10 C 13 -3 7 1 0 1 C -7 1 -13 -3 -13 -10 C -13 -19 -9 -30 0 -48 Z"
                  fill="#f1c48f"
                />
                <ellipse cx="0" cy="-9" rx="4.5" ry="8" fill="#fff6e3" />
              </g>
            </svg>
            <p className="mt-6 font-serif text-6xl tracking-[0.32em] sm:text-7xl">
              {[...BRAND].map((ch, i) => (
                <span key={i} className="intro-letter" style={{ animationDelay: `${0.25 + i * 0.07}s` }}>
                  {ch}
                </span>
              ))}
            </p>
            <p className="intro-tag mt-4 text-[0.62rem] uppercase tracking-[0.5em] text-paper/60">
              Handmade luxury candles
            </p>
          </div>
        </div>

        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
