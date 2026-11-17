"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { formatPrice, type Product } from "@/data/products";
import QuickAdd from "./QuickAdd";

/** A glass card that puts a real, buyable product on the first screen. */
export default function ProductSpotlight({ product, delay }: { product: Product; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full max-w-sm gap-4 border border-paper/15 bg-paper/10 p-3 backdrop-blur-xl"
    >
      <Link href={`/shop/${product.slug}`} data-cursor="View" className="relative block h-32 w-24 shrink-0 overflow-hidden bg-paper/10">
        {product.image && (
          <Image
            src={product.image}
            alt={`${product.name} candle`}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-1000 ease-pour hover:scale-105"
          />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div>
          <p className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-paper/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e3a35b]" /> Bestseller
          </p>
          <Link href={`/shop/${product.slug}`} className="mt-1.5 block font-serif text-xl leading-tight">
            {product.name}
          </Link>
          <p className="text-sm text-paper/70">{formatPrice(product.price)}</p>
        </div>
        <QuickAdd
          slug={product.slug}
          label="Add to bag"
          className="mt-3 self-start bg-paper px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-[#e3a35b]"
        />
      </div>
    </motion.div>
  );
}
