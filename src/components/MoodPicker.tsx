"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { formatPrice, products } from "@/data/products";
import ProductMedia from "./ProductMedia";

const ease = [0.22, 1, 0.36, 1] as const;
const ARCH = "rounded-t-full rounded-b-[2rem]";

/** Pick a mood; the whole section melts into that candle's colour. */
export default function MoodPicker() {
  const [index, setIndex] = useState(0);
  const product = products[index];

  return (
    <motion.section
      animate={{ backgroundColor: product.tint }}
      transition={{ duration: 1, ease }}
      className="mx-3 overflow-hidden rounded-[2.5rem] sm:mx-6 sm:rounded-[3.5rem]"
      style={{ backgroundColor: products[0].tint }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow">Find your ritual</p>
          <h2 className="mt-4 text-5xl leading-[1.02] sm:text-7xl">
            How do you want to <span className="italic text-clay">feel</span> tonight?
          </h2>

          <div className="mt-9 flex flex-wrap gap-3" role="group" aria-label="Choose a mood">
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={`rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-pour ${
                  i === index
                    ? "bg-ink text-ivory shadow-[0_12px_30px_-10px_rgba(51,34,28,0.7)]"
                    : "bg-ivory/60 text-ink ring-1 ring-ink/10 hover:bg-ivory"
                }`}
              >
                {p.mood}
              </button>
            ))}
          </div>

          <div className="mt-10 min-h-52">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
              >
                <h3 className="text-4xl">{product.name}</h3>
                <p className="mt-2 text-ink/70">{product.tagline}</p>
                <p className="mt-4 font-serif text-xl italic text-clay">{product.notes.join(" · ")}</p>
                <Link href={`/shop/${product.slug}`} className="btn mt-7">
                  Discover · {formatPrice(product.price)}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center [perspective:1400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, rotateY: -55, y: 24 }}
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, rotateY: 55, y: -12 }}
              transition={{ duration: 0.75, ease }}
            >
              <div className={`bg-ivory p-2 shadow-[0_50px_90px_-35px_rgba(51,34,28,0.55)] ${ARCH}`}>
                <div className={`group relative aspect-[3/4] w-64 overflow-hidden sm:w-80 lg:w-96 ${ARCH}`}>
                  <ProductMedia product={product} sizes="24rem" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
