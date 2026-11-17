"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { products } from "@/data/products";
import { SEASON, season } from "@/lib/season";
import ProductSpotlight from "./ProductSpotlight";
import Snow from "./Snow";
import SoundToggle from "./SoundToggle";

const ease = [0.22, 1, 0.36, 1] as const;

/** Splits a word into letters that rise and sharpen one after another. */
function Letters({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`} aria-hidden>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: "0.4em", filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const h = season.hero;
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // Wait for the first-visit intro (see layout) before animating in.
  const [t0] = useState(() =>
    typeof document !== "undefined" && !document.documentElement.dataset.introSeen ? 1.5 : 0.15,
  );

  useEffect(() => {
    if (reduce) videoRef.current?.pause();
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const featured = products[0];

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-[#0d0b09] text-paper"
    >
      {h.still ? (
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <div className="hero-drift absolute inset-0">
            <Image
              src={h.still.src}
              alt={h.still.alt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      ) : (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: videoScale }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={h.video.poster}
          aria-hidden
        >
          <source media="(max-width: 767px)" src={h.video.mobile} type="video/mp4" />
          <source src={h.video.desktop} type="video/mp4" />
        </motion.video>
      )}

      {/* shade so the type always reads */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#2a0f16]/60 via-[#2a0f16]/10 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2a0f16]/60 via-transparent to-[#2a0f16]/20" />
      {SEASON === "winter" && <Snow count={110} />}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex h-full max-w-[90rem] flex-col justify-end px-5 pb-10 pt-36 sm:px-10 sm:pb-14"
      >
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: t0 }}
        >
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-paper/80">
            Miraki — {h.label}
          </span>
          <motion.span
            className="hidden h-px w-24 origin-left bg-paper/40 sm:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: t0 + 0.2, ease }}
          />
        </motion.div>

        <h1 className="mt-5 text-[clamp(2.9rem,6.4vw,6.75rem)] leading-[0.9] tracking-[-0.03em]">
          <span className="sr-only">
            {h.line1} {h.accentWord}.
          </span>
          <Letters text={h.line1} delay={t0 + 0.1} />
          <br />
          <Letters text={`${h.accentWord}.`} delay={t0 + 0.55} className="italic text-glow" />
        </h1>

        <div className="mt-7 grid gap-6 md:mt-10 md:gap-8 md:grid-cols-12 md:items-end">
          <motion.div
            className="md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: t0 + 1, ease }}
          >
            <p className="hidden max-w-xs text-sm leading-relaxed text-paper/80 sm:block">{h.copy}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-8">
              <Link href="/shop" className="btn btn-paper">Shop the collection</Link>
              <SoundToggle className="text-paper/85" />
            </div>
          </motion.div>

          <div className="md:col-span-6 md:flex md:justify-end lg:col-span-7">
            {featured && <ProductSpotlight product={featured} delay={t0 + 1.3} />}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
