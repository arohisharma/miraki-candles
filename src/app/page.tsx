import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Rituals from "@/components/Rituals";
import ScrollWords from "@/components/ScrollWords";
import Snow from "@/components/Snow";
import WinterTeaser from "@/components/WinterTeaser";
import { products } from "@/data/products";
import { SEASON, season } from "@/lib/season";

const values = [
  { title: "Soy wax", text: "Plant-based, slow and even to burn." },
  { title: "Kind to your air", text: "A gentle, low-soot glow for the rooms you live in." },
  { title: "Made by hand", text: "Shaped and poured in small batches, never rushed." },
  { title: "Ready to give", text: "Boxed and finished with care, for someone you love." },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Statement */}
      <section className="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 sm:py-44">
        <p className="label">{season.statement.label}</p>
        <ScrollWords
          className="mt-8 max-w-6xl font-serif text-[clamp(2.2rem,5.2vw,5.2rem)] leading-[1.05] tracking-[-0.02em]"
          text={season.statement.text}
        />
      </section>

      <WinterTeaser />

      {/* Rituals */}
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        <Reveal className="flex flex-col justify-between gap-6 border-t border-line pb-6 pt-10 md:flex-row md:items-end md:pb-10">
          <h2 className="max-w-3xl text-5xl leading-[0.95] tracking-[-0.03em] sm:text-7xl">
            {season.ritualsHeading.before} <em className="text-accent">{season.ritualsHeading.accent}</em>.
          </h2>
          <p className="label">Three rituals</p>
        </Reveal>
      </div>
      <Rituals />

      {/* Collection */}
      <section className="mx-auto max-w-[90rem] px-5 pb-28 pt-28 sm:px-10 sm:pt-40">
        <Reveal className="flex items-end justify-between border-t border-line pt-10">
          <h2 className="text-5xl leading-[0.95] tracking-[-0.03em] sm:text-7xl">The collection</h2>
          <Link href="/shop" className="link text-sm">View all</Link>
        </Reveal>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[90rem] px-5 pb-28 sm:px-10 sm:pb-40">
        <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08} className="border-t border-line py-8">
              <p className="text-xs tabular-nums text-accent">0{i + 1}</p>
              <h3 className="mt-6 text-3xl">{v.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The one loud moment on the page */}
      <section className="relative overflow-hidden bg-band text-paper">
        {SEASON === "winter" && <Snow count={80} />}
        <Reveal className="relative mx-auto flex max-w-[90rem] flex-col gap-10 px-5 py-24 sm:px-10 sm:py-36 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl lg:text-9xl">
            {season.band.before} <em>{season.band.accent}</em>.
          </h2>
          <Link href="/shop" className="btn btn-paper shrink-0">{season.band.cta}</Link>
        </Reveal>
      </section>
    </>
  );
}
