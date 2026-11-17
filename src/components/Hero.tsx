"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SEASON, season } from "@/lib/season";
import ParallaxImage from "./ParallaxImage";
import Snow from "./Snow";

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
  const h = season.hero;
  return (
    <section className="mx-auto max-w-[90rem] px-5 pt-8 sm:px-10 sm:pt-14">
      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <span className="label">{h.label}</span>
        <span className="label hidden sm:block">{h.labelRight}</span>
      </motion.div>

      <h1 className="mt-6 text-[clamp(4.2rem,16.5vw,17rem)] leading-[0.82] tracking-[-0.04em]">
        <Line delay={0.1}>{h.line1}</Line>
        <Line delay={0.24}>
          <em className="text-accent">{h.accentWord}</em>.
        </Line>
      </h1>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
        <motion.div
          className="md:col-span-4 md:pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease }}
        >
          <p className="max-w-sm text-lg leading-relaxed">{h.copy}</p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <Link href="/shop" className="btn">Shop candles</Link>
            <Link href="/about" className="link text-sm">Our story</Link>
          </div>
        </motion.div>

        <ParallaxImage
          src={h.image}
          alt={h.alt}
          className="aspect-[4/5] sm:aspect-[16/10] md:col-span-8"
          sizes="(min-width: 768px) 66vw, 100vw"
          priority
        >
          {SEASON === "winter" && <Snow count={90} />}
        </ParallaxImage>
      </div>
    </section>
  );
}
