"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { getProduct } from "@/data/products";
import { season, type Ritual } from "@/lib/season";

function Panel({
  ritual,
  index,
  total,
  progress,
}: {
  ritual: Ritual;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const product = getProduct(ritual.pair);
  // Each photo drifts a little against the sideways motion for depth.
  const center = total > 1 ? index / (total - 1) : 0;
  const imageX = useTransform(progress, [center - 0.5, center + 0.5], ["-8%", "8%"]);
  const wordX = useTransform(progress, [center - 0.5, center + 0.5], ["18%", "-18%"]);

  return (
    <div className="relative h-full w-screen shrink-0 overflow-hidden">
      <motion.div className="absolute -inset-x-[10%] inset-y-0" style={{ x: imageX }}>
        <Image src={ritual.image} alt={ritual.alt} fill sizes="120vw" loading="eager" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />

      <div className="relative flex h-full flex-col justify-end px-5 pb-14 text-paper sm:px-10 sm:pb-16">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-paper/70">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <motion.h3
          style={{ x: wordX }}
          className="mt-2 text-[clamp(5rem,20vw,22rem)] italic leading-[0.8] tracking-[-0.045em]"
        >
          {ritual.word}
        </motion.h3>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-serif text-lg sm:text-xl">{ritual.line}</p>
          {product && (
            <Link
              href={`/shop/${product.slug}`}
              data-cursor="Shop"
              className="link self-start text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:self-auto"
            >
              {product.name} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/** Full-screen photos that slide sideways as the page scrolls down. */
export default function RitualGallery() {
  const ref = useRef<HTMLElement>(null);
  const rituals = season.rituals;
  const n = rituals.length;
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A light spring on top of the scroll so the slide glides instead of tracking every flick.
  const scrollYProgress = useSpring(raw, { stiffness: 70, damping: 22, mass: 0.6 });

  // Each photo holds still for a moment before the next one slides in.
  const HOLD = 0.12;
  const input: number[] = [];
  const output: string[] = [];
  for (let i = 0; i < n; i++) {
    const c = n > 1 ? i / (n - 1) : 0;
    const at = `-${(i / n) * 100}%`;
    input.push(Math.max(0, c - HOLD), Math.min(1, c + HOLD));
    output.push(at, at);
  }
  const x = useTransform(scrollYProgress, input, output);
  const bar = useTransform(scrollYProgress, [0, 1], [1 / n, 1]);

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: `${n * 190}vh` }} aria-label="Rituals">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="flex h-full" style={{ x, width: `${n * 100}vw` }}>
          {rituals.map((r, i) => (
            <Panel key={r.word} ritual={r} index={i} total={n} progress={scrollYProgress} />
          ))}
        </motion.div>
        <div className="absolute inset-x-5 bottom-6 h-px bg-paper/20 sm:inset-x-10">
          <motion.div className="h-full origin-left bg-paper" style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  );
}
