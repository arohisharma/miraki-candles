"use client";

import { useRef } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { season } from "@/lib/season";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

/** "New collection, just dropped": a short announcement and a swipeable row of the new candles. */
export default function JustDropped() {
  const d = season.drop;
  const rail = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden py-20 sm:py-28" aria-label="New collection">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="hotspot-ring absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {d.label}
            </p>
            <h2 className="mt-5 text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
              {d.title}
              <br />
              <em className="text-accent">{d.accent}</em>
            </h2>
            <p className="mt-6 max-w-md text-base text-muted">{d.line}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden gap-2 md:flex">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => nudge(dir)}
                  aria-label={dir < 0 ? "Previous candles" : "Next candles"}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {dir < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
            <Link href="/shop" className="btn" data-cursor="Shop">
              {d.cta}
            </Link>
          </div>
        </Reveal>
      </div>

      {/* The row starts in line with the page and runs off the right edge, inviting a swipe. */}
      <div
        ref={rail}
        className="mt-12 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:scroll-px-10 sm:px-10 [&::-webkit-scrollbar]:hidden xl:scroll-px-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] xl:px-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]"
      >
        {products.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.08}
            className="w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[26vw] xl:w-[22rem]"
          >
            <div data-card>
              <ProductCard product={p} badge="New" />
            </div>
          </Reveal>
        ))}
        <Link
          href="/shop"
          className="group flex w-[60vw] shrink-0 snap-start flex-col items-center justify-center gap-4 bg-blush text-center sm:w-[30vw] lg:w-[18vw] xl:w-[16rem]"
          data-cursor="Shop"
        >
          <span className="font-serif text-3xl italic">See it all</span>
          <span className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
