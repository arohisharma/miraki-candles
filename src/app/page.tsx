import Link from "next/link";
import Embers from "@/components/Embers";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MoodPicker from "@/components/MoodPicker";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import WaxDrip from "@/components/WaxDrip";
import { products } from "@/data/products";

const values = [
  {
    title: "Natural wax",
    text: "A clean-burning blend, kinder to your home and to the air you breathe.",
    icon: (
      <path d="M12 3c4 4 6 7 6 10a6 6 0 1 1-12 0c0-3 2-6 6-10Zm0 0v18" />
    ),
  },
  {
    title: "Poured by hand",
    text: "Every candle is made in small batches, never rushed and never mass-produced.",
    icon: (
      <path d="M7 11V5a1.5 1.5 0 0 1 3 0v5m0 0V3.5a1.5 1.5 0 0 1 3 0V10m0 0V5a1.5 1.5 0 0 1 3 0v8c0 4-2 7-6 7-3 0-5-2-6-5l-1-3a1.5 1.5 0 0 1 3-1l1 2" />
    ),
  },
  {
    title: "Slow, even burn",
    text: "Cotton wicks and generous fragrance for hours of steady, soothing light.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <WaxDrip />

      <Marquee />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="text-center">
          <p className="eyebrow">The collection</p>
          <h2 className="mt-4 text-4xl sm:text-6xl">
            Scents to <span className="italic text-accent">come home</span> to
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center" delay={0.1}>
          <Link href="/shop" className="btn">View all candles</Link>
        </Reveal>
      </section>

      <MoodPicker />

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Miraki way</p>
          <h2 className="mt-4 text-4xl sm:text-6xl">
            Made slowly, <span className="italic text-accent">on purpose</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.14} className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface ring-1 ring-gold/40">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {v.icon}
                </svg>
              </div>
              <h3 className="mt-6 text-3xl">{v.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-4 mb-6 overflow-hidden rounded-[2rem] bg-espresso text-center text-background sm:mx-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,166,107,0.3),transparent_65%)]" />
        <Embers count={16} />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <p className="eyebrow">Begin your ritual</p>
          <h2 className="mt-5 text-5xl leading-tight sm:text-7xl">
            Make every evening feel like <span className="italic text-gold-light">home.</span>
          </h2>
          <Link href="/shop" className="btn btn-gold mt-10">Shop the collection</Link>
        </Reveal>
      </section>
    </>
  );
}
