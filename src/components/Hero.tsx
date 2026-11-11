"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import CandleVisual from "./CandleVisual";
import Embers from "./Embers";

const WORDS = ["Light", "a", "little"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(smx, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const glowX = useTransform(smx, [-0.5, 0.5], [50, -50]);
  const glowY = useTransform(smy, [-0.5, 0.5], [30, -30]);
  const emberX = useTransform(smx, [-0.5, 0.5], [-24, 24]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const candleY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88svh] items-center overflow-hidden bg-espresso text-background"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,162,79,0.28),rgba(201,166,107,0.08)_45%,transparent_70%)] lg:right-[2%]"
        style={{ x: glowX, y: glowY }}
      />
      <motion.div className="absolute inset-0" style={{ x: emberX }}>
        <Embers count={24} />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-16 lg:grid-cols-2 lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }} className="text-center lg:text-left">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            Small-batch · Hand-poured
          </motion.p>
          <h1 className="mt-6 text-6xl leading-[1.02] sm:text-8xl">
            {WORDS.map((w, i) => (
              <motion.span
                key={w + i}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.25 + i * 0.16, ease }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="inline-block bg-gradient-to-b from-gold-light to-gold bg-clip-text pr-1 italic text-transparent"
              initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.8, ease }}
            >
              calm.
            </motion.span>
          </h1>
          <motion.p
            className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-background/65 lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease }}
          >
            Luxurious candles poured by hand from natural wax, for evenings that feel slow, warm and
            entirely yours.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease }}
          >
            <Link href="/shop" className="btn btn-gold">Explore the collection</Link>
            <Link href="/about" className="btn btn-ghost">Our story</Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: candleY, perspective: 1200 }}
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
        >
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
            <CandleVisual
              color="#c98b5e"
              name="Amber Dusk"
              className="candle-float w-56 drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] sm:w-72 lg:w-[23rem]"
            />
          </motion.div>
        </motion.div>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-background/40">Scroll</span>
        <span className="h-10 w-px bg-gold/60" style={{ animation: "scroll-cue 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
