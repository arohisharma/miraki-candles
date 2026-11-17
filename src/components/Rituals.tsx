"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { getProduct } from "@/data/products";
import { season } from "@/lib/season";

const RITUALS = season.rituals;

/** Three moments. On desktop the photo stays pinned and cross-fades as each story scrolls past. */
export default function Rituals() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-[90rem] px-5 sm:px-10">
      <div className="grid gap-x-16 md:grid-cols-2">
        {/* pinned photo (desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden bg-stone">
            {RITUALS.map((r, i) => (
              <motion.div
                key={r.title}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={r.image} alt={r.alt} fill sizes="50vw" className="object-cover" />
              </motion.div>
            ))}
            <div className="absolute bottom-5 left-5 flex gap-2">
              {RITUALS.map((r, i) => (
                <span
                  key={r.title}
                  className={`h-px transition-all duration-700 ${i === active ? "w-10 bg-paper" : "w-5 bg-paper/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* stories */}
        <div>
          {RITUALS.map((r, i) => {
            const product = getProduct(r.pair);
            return (
              <motion.article
                key={r.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.55 }}
                className="flex flex-col justify-center border-t border-line py-16 first:border-t-0 md:min-h-[86vh] md:py-24"
              >
                <div className="relative mb-10 aspect-[4/5] overflow-hidden bg-stone md:hidden">
                  <Image src={r.image} alt={r.alt} fill sizes="100vw" className="object-cover" />
                </div>
                <p className="label">
                  <span className="text-accent">0{i + 1}</span> — Ritual
                </p>
                <h3 className="mt-5 text-6xl leading-[0.92] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
                  {r.title}
                </h3>
                <p className="mt-6 font-serif text-2xl italic leading-snug sm:text-3xl">{r.line}</p>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{r.body}</p>
                {product && (
                  <p className="mt-9 text-sm">
                    <span className="text-muted">Pairs with </span>
                    <Link href={`/shop/${product.slug}`} className="link">
                      {product.name} →
                    </Link>
                  </p>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
