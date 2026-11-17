"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { season } from "@/lib/season";
import Snow from "./Snow";

/** The seasonal collection: a photo that opens out to full screen as it scrolls into view. */
export default function CollectionReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]: number[]) => `inset(${i}% ${i * 1.4}% ${i}% ${i * 1.4}% round ${r}px)`,
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 1], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const t = season.teaser;
  if (!t) return null;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px]">
      <motion.div className="absolute inset-0 overflow-hidden bg-ink" style={{ clipPath }}>
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src={t.image} alt={t.alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <Snow count={90} />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative flex h-full flex-col items-center justify-center px-5 text-center text-paper"
        >
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.35em] text-paper/80">✻ {t.label}</p>
          <h2 className="mt-6 text-[clamp(3.8rem,11vw,11rem)] leading-[0.86] tracking-[-0.035em]">
            {t.title}
            <br />
            <em className="text-[#f1c48f]">{t.accent}</em>
          </h2>
          <p className="mt-6 font-serif text-base italic text-paper/80 sm:text-lg">{t.notes.join(" · ")}</p>
          <Link href="/contact" className="btn btn-paper mt-10" data-cursor="Notify">
            Be the first to know
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
