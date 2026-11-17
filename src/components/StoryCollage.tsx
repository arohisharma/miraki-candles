"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { season } from "@/lib/season";
import ScrollWords from "./ScrollWords";

// Where each little photo floats around the line (desktop), and how fast it drifts.
// Kept in the outer columns so they never cover the text.
const PLACES = [
  { className: "left-[2%] top-[22%] w-[12%] -rotate-3", speed: -70 },
  { className: "right-[2%] top-[14%] w-[11%] rotate-2", speed: -130 },
  { className: "left-[16%] bottom-[2%] w-[9%] rotate-3", speed: -50 },
];

/** The one-line statement, surrounded by small lifestyle photos that drift at different speeds. */
export default function StoryCollage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [0, PLACES[0].speed]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, PLACES[1].speed]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, PLACES[2].speed]);
  const ys = [y0, y1, y2];
  const { before, accent } = season.statement;

  return (
    <section ref={ref} className="relative mx-auto max-w-[90rem] px-5 py-20 sm:px-10 md:py-44">
      {/* desktop: floating */}
      {season.collage.map((p, i) => (
        <motion.div
          key={p.image}
          style={{ y: ys[i] }}
          className={`absolute hidden md:block ${PLACES[i].className}`}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-stone shadow-[0_30px_60px_-30px_rgba(42,28,30,0.45)]">
            <Image src={p.image} alt={p.alt} fill sizes="15vw" className="object-cover" />
          </div>
        </motion.div>
      ))}

      <ScrollWords
        className="relative mx-auto max-w-3xl text-center font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em]"
        text={`${before} ${accent}`}
      />

      {/* mobile: a neat row */}
      <div className="mt-10 grid grid-cols-3 gap-3 md:hidden">
        {season.collage.map((p) => (
          <div key={p.image} className="relative aspect-[3/4] overflow-hidden bg-stone">
            <Image src={p.image} alt={p.alt} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
