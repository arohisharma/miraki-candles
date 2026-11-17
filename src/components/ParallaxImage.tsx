"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * A plain rectangular photo that drifts slightly as the page scrolls and is
 * unveiled by a paper-coloured cover the first time it comes into view.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority,
  position,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  /** Overlay drawn above the photo, e.g. snowfall. */
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-stone ${className}`}>
      <motion.div className="absolute -inset-y-[8%] inset-x-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: position }}
          className="object-cover"
        />
      </motion.div>
      {children}
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-top bg-paper"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
