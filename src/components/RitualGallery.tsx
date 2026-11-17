"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { getProduct } from "@/data/products";
import { season, type Ritual } from "@/lib/season";

const TINTS = ["bg-paper", "bg-blush", "bg-stone"];

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
  // A gentle drift inside the frame for depth; the photo itself is never cropped hard.
  const center = total > 1 ? index / (total - 1) : 0;
  const imageY = useTransform(progress, [center - 0.5, center + 0.5], ["-4%", "4%"]);
  const textX = useTransform(progress, [center - 0.5, center + 0.5], ["8%", "-8%"]);

  return (
    <div className={`relative h-full w-screen shrink-0 overflow-hidden ${TINTS[index % TINTS.length]}`}>
      <div className="mx-auto flex h-full max-w-[90rem] flex-col justify-center gap-8 px-5 pb-16 pt-28 sm:px-10 md:flex-row md:items-center md:gap-16 md:pb-14 md:pt-32">
        <div className="relative h-[46svh] w-full overflow-hidden bg-stone md:h-[68svh] md:w-auto md:aspect-[4/5]">
          <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y: imageY }}>
            <Image
              src={ritual.image}
              alt={ritual.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              loading="eager"
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div style={{ x: textX }} className="md:flex-1">
          <p className="label">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-[clamp(3rem,7.5vw,7.5rem)] italic leading-[0.9] tracking-[-0.035em]">
            {ritual.word}
          </h3>
          <p className="mt-4 font-serif text-lg text-muted sm:text-xl">{ritual.line}</p>
          {product && (
            <Link
              href={`/shop/${product.slug}`}
              data-cursor="Shop"
              className="link mt-8 inline-block text-[0.68rem] font-medium uppercase tracking-[0.2em]"
            >
              Pairs with {product.name} →
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/** Moments that slide sideways as the page scrolls down: a framed photo and a few words each. */
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
    <section ref={ref} className="relative bg-paper" style={{ height: `${n * 190}vh` }} aria-label="Rituals">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="flex h-full" style={{ x, width: `${n * 100}vw` }}>
          {rituals.map((r, i) => (
            <Panel key={r.word} ritual={r} index={i} total={n} progress={scrollYProgress} />
          ))}
        </motion.div>
        <div className="absolute inset-x-5 bottom-6 h-px bg-ink/10 sm:inset-x-10">
          <motion.div className="h-full origin-left bg-ink" style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  );
}
