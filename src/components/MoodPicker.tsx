"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { formatPrice, products } from "@/data/products";
import ProductMedia from "./ProductMedia";
import Embers from "./Embers";

const ease = [0.22, 1, 0.36, 1] as const;

export default function MoodPicker() {
  const [index, setIndex] = useState(0);
  const product = products[index];

  return (
    <section className="mx-4 my-6 overflow-hidden rounded-[2rem] bg-espresso text-background sm:mx-6">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(201,166,107,0.2),transparent_60%)]" />
        <Embers count={12} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Find your ritual</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-6xl">
              How do you want to <span className="italic text-gold-light">feel</span> tonight?
            </h2>

            <div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="Choose a mood">
              {products.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                  className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-500 [transition-timing-function:var(--ease-pour)] ${
                    i === index
                      ? "bg-gold text-espresso shadow-[0_8px_30px_-8px_rgba(201,166,107,0.8)]"
                      : "text-background/70 ring-1 ring-gold/30 hover:ring-gold/70"
                  }`}
                >
                  {p.mood}
                </button>
              ))}
            </div>

            <div className="mt-10 min-h-48">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <h3 className="text-4xl">{product.name}</h3>
                  <p className="mt-2 text-background/65">{product.tagline}</p>
                  <p className="mt-4 font-serif text-xl italic text-gold-light">
                    {product.notes.join(" · ")}
                  </p>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="link-underline mt-6 inline-block text-xs uppercase tracking-[0.25em] text-gold"
                  >
                    Discover · {formatPrice(product.price)} →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center [perspective:1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, rotateY: -50, y: 24 }}
                animate={{ opacity: 1, rotateY: 0, y: 0 }}
                exit={{ opacity: 0, rotateY: 50, y: -12 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="group relative aspect-[4/5] w-64 overflow-hidden rounded-3xl bg-espresso shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-gold/20 sm:w-80">
                  <ProductMedia product={product} variant="page" sizes="320px" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
