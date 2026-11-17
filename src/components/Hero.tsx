"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { products } from "@/data/products";
import { SEASON, season } from "@/lib/season";
import ProductSpotlight from "./ProductSpotlight";
import Snow from "./Snow";
import SoundToggle from "./SoundToggle";

const ease = [0.22, 1, 0.36, 1] as const;

// Stock footage from Pexels, standing in until Miraki has its own film.
const VIDEO = {
  desktop: "https://videos.pexels.com/video-files/5092038/5092038-hd_1920_1080_24fps.mp4",
  mobile: "https://videos.pexels.com/video-files/40429172/17275379_720_1280_60fps.mp4",
  poster: "https://images.pexels.com/videos/5092038/noche-velas-velas-encendidas-5092038.jpeg?auto=compress&w=1920",
};

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
      <motion.video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: videoScale }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={VIDEO.poster}
        aria-hidden
      >
        <source media="(max-width: 767px)" src={VIDEO.mobile} type="video/mp4" />
        <source src={VIDEO.desktop} type="video/mp4" />
      </motion.video>

      {/* shade so the type always reads */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
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

        <h1 className="mt-6 text-[clamp(4rem,13vw,13.5rem)] leading-[0.84] tracking-[-0.035em]">
          <span className="sr-only">
            {h.line1} {h.accentWord}.
          </span>
          <Letters text={h.line1} delay={t0 + 0.1} />
          <br />
          <Letters text={`${h.accentWord}.`} delay={t0 + 0.55} className="italic text-[#f1c48f]" />
        </h1>

        <div className="mt-8 grid gap-6 md:mt-14 md:gap-8 md:grid-cols-12 md:items-end">
          <motion.div
            className="md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: t0 + 1, ease }}
          >
            <p className="hidden max-w-sm text-[0.95rem] leading-relaxed text-paper/80 sm:block">{h.copy}</p>
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

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: t0 + 1.8 }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.35em] text-paper/60">Scroll</span>
        <span className="scroll-cue h-10 w-px bg-paper/60" />
      </motion.div>
    </section>
  );
}
