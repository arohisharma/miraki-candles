import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Miraki Candles — Handmade luxury candles",
    template: "%s | Miraki Candles",
  },
  description: "Handmade luxury candles, poured in small batches from soy wax.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Page-load curtain */}
        <div className="intro" aria-hidden>
          <div className="intro-mark text-center">
            <p className="font-serif text-5xl tracking-[0.3em] text-ink">MIRAKI</p>
            <p className="mt-3 text-[0.65rem] uppercase tracking-[0.5em] text-clay">
              Handmade luxury candles
            </p>
          </div>
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="xMidYMin slice"
            className="absolute left-0 top-full -mt-px h-24 w-full text-ivory"
            fill="currentColor"
          >
            <path d="M0 0H1440V20C1200 36 1000 10 720 24C440 38 240 12 0 26Z" />
            {[90, 300, 520, 800, 1010, 1240, 1380].map((x, i) => {
              const len = [50, 84, 36, 96, 44, 70, 30][i];
              return (
                <g key={x}>
                  <rect x={x - 9} y="10" width="18" height={len} rx="9" />
                  <circle cx={x} cy={10 + len} r="13" />
                </g>
              );
            })}
          </svg>
        </div>

        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
