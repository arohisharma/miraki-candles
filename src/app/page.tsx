import Link from "next/link";
import CollectionReveal from "@/components/CollectionReveal";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import RitualGallery from "@/components/RitualGallery";
import ScrollWords from "@/components/ScrollWords";
import Snow from "@/components/Snow";
import VelocityMarquee from "@/components/VelocityMarquee";
import { products } from "@/data/products";
import { SEASON, season } from "@/lib/season";

export default function Home() {
  return (
    <>
      <Hero />

      {/* One line, lit word by word */}
      <section className="mx-auto max-w-[90rem] px-5 py-32 text-center sm:px-10 sm:py-48">
        <ScrollWords
          className="mx-auto max-w-5xl font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em]"
          text={`${season.statement.before} ${season.statement.accent}`}
        />
      </section>

      <RitualGallery />

      {/* Collection */}
      <section className="mx-auto max-w-[90rem] px-5 py-28 sm:px-10 sm:py-40">
        <Reveal className="flex items-end justify-between">
          <h2 className="text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
            The <em className="text-accent">collection</em>
          </h2>
          <Link href="/shop" className="link text-sm">View all</Link>
        </Reveal>
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-20" : ""}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <CollectionReveal />

      <div className="py-24 sm:py-32">
        <VelocityMarquee items={season.values} />
      </div>

      {/* The one bold block */}
      <section className="relative overflow-hidden bg-band text-paper">
        {SEASON === "winter" && <Snow count={80} />}
        <Reveal className="relative mx-auto flex max-w-[90rem] flex-col gap-10 px-5 py-28 sm:px-10 sm:py-40 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl text-6xl leading-[0.88] tracking-[-0.03em] sm:text-8xl lg:text-9xl">
            {season.band.before} <em>{season.band.accent}</em>.
          </h2>
          <Link href="/shop" className="btn btn-paper shrink-0" data-cursor="Shop">
            {season.band.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
