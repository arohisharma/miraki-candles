"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { formatPrice, getProduct } from "@/data/products";
import { season } from "@/lib/season";
import QuickAdd from "./QuickAdd";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

/** A lifestyle photo with tappable dots: the story of the evening, and the candle to buy. */
export default function ShopTheLook() {
  const look = season.look;
  const productIndex = look.spots.findIndex((s) => "product" in s);
  const [active, setActive] = useState<number | null>(productIndex);
  const featured = productIndex >= 0 ? getProduct((look.spots[productIndex] as { product: string }).product) : null;

  return (
    <section className="bg-blush">
      <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-16 sm:px-10 md:grid-cols-12 md:gap-16 md:py-24">
        <div className="relative md:col-span-6 lg:col-span-5">
          <div className="relative aspect-[2/3] overflow-hidden bg-ink">
            <Image src={look.image} alt={look.alt} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />

            {look.spots.map((spot, i) => {
              const isProduct = "product" in spot;
              const open = active === i;
              const product = isProduct ? getProduct(spot.product) : null;
              const label = isProduct ? product?.name ?? "" : spot.label;
              const leftSide = spot.x > 55;
              return (
                <div key={i} className="absolute" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-label={isProduct ? `Shop ${label}` : label}
                    onClick={() => setActive(open ? null : i)}
                    onMouseEnter={() => setActive(i)}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    data-cursor={isProduct ? "Shop" : undefined}
                  >
                    <span className="hotspot-ring absolute inset-0 rounded-full bg-paper/70" />
                    <span
                      className={`relative grid h-7 w-7 place-items-center rounded-full text-sm leading-none shadow-lg transition-colors duration-300 ${
                        isProduct ? "bg-accent text-paper" : "bg-paper text-ink"
                      }`}
                    >
                      {open ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.35, ease }}
                        className={`absolute top-5 z-10 ${leftSide ? "right-0" : "left-0"}`}
                      >
                        {isProduct && product ? (
                          <div className="flex w-60 gap-3 bg-paper p-3 shadow-2xl">
                            <Link href={`/shop/${product.slug}`} className="relative block h-20 w-16 shrink-0 overflow-hidden bg-stone">
                              {product.image && (
                                <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
                              )}
                            </Link>
                            <div className="flex min-w-0 flex-col justify-between">
                              <div>
                                <Link href={`/shop/${product.slug}`} className="block font-serif text-lg leading-tight">
                                  {product.name}
                                </Link>
                                <p className="text-xs text-muted">{formatPrice(product.price)}</p>
                              </div>
                              <QuickAdd
                                slug={product.slug}
                                label="Add to bag"
                                className="self-start text-[0.62rem] font-medium uppercase tracking-[0.18em] text-accent underline underline-offset-4"
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="whitespace-nowrap bg-paper px-3 py-2 font-serif text-base italic shadow-xl">
                            {label}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <p className="label">Shop the look</p>
          <h2 className="mt-4 text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
            {look.title} <em className="text-accent">{look.accent}</em>
          </h2>
          <p className="mt-6 text-base text-muted">{look.line}</p>
          {featured && (
            <div className="mt-10 flex items-center gap-6 border-t border-ink/10 pt-6">
              <div className="min-w-0 flex-1">
                <p className="font-serif text-2xl">{featured.name}</p>
                <p className="text-sm text-muted">
                  {featured.tagline} · {formatPrice(featured.price)}
                </p>
              </div>
              <QuickAdd slug={featured.slug} label="Add to bag" className="btn shrink-0" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
