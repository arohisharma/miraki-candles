"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { season } from "@/lib/season";
import Reveal from "./Reveal";

/**
 * The seasonal line on the left, three small lifestyle photos in a calm, staggered row
 * on the right. Each column drifts very slightly as you scroll.
 */
export default function StoryCollage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const ys = [y0, y1, y2];
  const { before, accent } = season.statement;

  return (
    <section ref={ref} className="mx-auto max-w-[90rem] px-5 py-20 sm:px-10 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <h2 className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.92] tracking-[-0.03em]">
            {before}
            <br />
            <em className="text-accent">{accent}</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-3 gap-3 sm:gap-5 md:col-span-7">
          {season.collage.map((p, i) => (
            <motion.figure key={p.image} style={{ y: ys[i] }} className={i === 1 ? "mt-10 md:mt-16" : ""}>
              <Reveal delay={i * 0.1}>
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 768px) 20vw, 33vw"
                    className="object-cover transition-transform duration-[1600ms] ease-pour hover:scale-[1.04]"
                  />
                </div>
                {p.caption && (
                  <figcaption className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">
                    <span className="text-accent">0{i + 1}</span> — {p.caption}
                  </figcaption>
                )}
              </Reveal>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
