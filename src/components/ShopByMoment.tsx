"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { MOMENTS, products, type Moment } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/** The collection, browsed by the moment you are shopping for. */
export default function ShopByMoment() {
  const [moment, setMoment] = useState<Moment | "All">("All");
  const shown = moment === "All" ? products : products.filter((p) => p.moments.includes(moment));

  return (
    <section className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 sm:py-28">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 className="text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
          Shop by <em className="text-accent">moment</em>
        </h2>
        <Link href="/shop" className="link self-start text-sm md:self-auto">View all</Link>
      </Reveal>

      <LayoutGroup>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Shop by moment">
          {(["All", ...MOMENTS] as const).map((m) => {
            const on = m === moment;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setMoment(m)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  on ? "text-paper" : "text-ink hover:bg-stone"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="moment-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.5, ease }}
                  />
                )}
                <span className="relative">{m}</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
