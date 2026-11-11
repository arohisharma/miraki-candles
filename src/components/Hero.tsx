"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { unsplash } from "@/lib/unsplash";
import ParallaxImage from "./ParallaxImage";

const ease = [0.22, 1, 0.36, 1] as const;

// Each headline line rises out of a clipped box.
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.3, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-[90rem] px-5 pt-8 sm:px-10 sm:pt-14">
      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <span className="label">Handmade candles</span>
        <span className="label hidden sm:block">Soy wax — Small batches</span>
      </motion.div>

      <h1 className="mt-6 text-[clamp(4.2rem,16.5vw,17rem)] leading-[0.82] tracking-[-0.04em]">
        <Line delay={0.1}>Light a little</Line>
        <Line delay={0.24}>
          <em className="text-accent">calm</em>.
        </Line>
      </h1>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
        <motion.div
          className="md:col-span-4 md:pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease }}
        >
          <p className="max-w-sm text-lg leading-relaxed">
            Candles poured by hand in small batches. For the gift you actually want to give, the
            book you cannot put down, and the bath nobody is allowed to interrupt.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Link href="/shop" className="btn">Shop candles</Link>
            <Link href="/about" className="link text-sm">Our story</Link>
          </div>
        </motion.div>

        <ParallaxImage
          src={unsplash("photo-1669334388727-9a3437e12fa2", 2000)}
          alt="A lit candle glowing in a ribbed glass"
          className="aspect-[4/5] sm:aspect-[16/10] md:col-span-8"
          sizes="(min-width: 768px) 66vw, 100vw"
          priority
        />
      </div>
    </section>
  );
}
