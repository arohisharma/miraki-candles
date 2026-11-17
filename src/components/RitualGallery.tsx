"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { season } from "@/lib/season";

/**
 * The moments, all three in one view. Hover (or tap) a panel and it opens up to show the
 * full photo and story while the others fold down to slim strips.
 */
export default function RitualGallery() {
  const rituals = season.rituals;
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-[90rem] px-5 py-16 sm:px-10 sm:py-20" aria-label="Rituals">
      <div className="flex flex-col gap-3 md:h-[34rem] md:flex-row">
        {rituals.map((r, i) => {
          const open = i === active;
          const product = getProduct(r.pair);
          return (
            <div
              key={r.word}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative min-h-0 cursor-pointer overflow-hidden bg-stone transition-[flex-grow,height] duration-[900ms] ease-pour max-md:h-[5.5rem] data-[open=true]:max-md:h-[26rem] md:h-auto md:flex-[1_1_0%] md:data-[open=true]:flex-[4_1_0%]"
              data-open={open}
            >
              <Image
                src={r.image}
                alt={r.alt}
                fill
                sizes={open ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 20vw, 100vw"}
                loading="eager"
                className={`object-cover transition-transform duration-[1400ms] ease-pour ${open ? "scale-100" : "scale-110"}`}
              />
              <div
                aria-hidden
                className={`absolute inset-0 transition-colors duration-700 ${
                  open ? "bg-gradient-to-t from-black/60 via-transparent to-black/10" : "bg-black/40"
                }`}
              />

              {/* collapsed: just the number and the word */}
              <div
                className={`absolute inset-0 flex items-end p-5 text-paper transition-opacity duration-500 max-md:items-center md:justify-center md:p-0 md:pb-8 ${
                  open ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <p className="font-serif text-2xl italic leading-none md:[writing-mode:vertical-rl] md:rotate-180 md:text-3xl">
                  <span className="mr-3 font-sans text-[0.65rem] not-italic tracking-[0.2em] text-paper/70">
                    0{i + 1}
                  </span>
                  {r.word}
                </p>
              </div>

              {/* open: the full story */}
              <div
                className={`absolute inset-x-0 bottom-0 p-6 text-paper transition-all duration-700 ease-pour sm:p-8 ${
                  open ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-paper/80">
                  0{i + 1} / 0{rituals.length}
                </p>
                <h3 className="mt-2 text-5xl italic leading-[0.95] tracking-[-0.03em] sm:text-6xl">{r.word}</h3>
                <p className="mt-2 font-serif text-lg text-paper/90">{r.line}</p>
                {product && (
                  <Link
                    href={`/shop/${product.slug}`}
                    data-cursor="Shop"
                    tabIndex={open ? 0 : -1}
                    className="link mt-5 inline-block text-[0.65rem] font-medium uppercase tracking-[0.2em]"
                  >
                    Pairs with {product.name} →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
