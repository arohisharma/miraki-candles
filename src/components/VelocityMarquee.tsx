"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

/** Huge type that drifts on its own and speeds up (or reverses) with scrolling. */
export default function VelocityMarquee({ items, baseSpeed = 2 }: { items: string[]; baseSpeed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let move = direction.current * baseSpeed * (delta / 1000);
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    move += direction.current * move * b;
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-[0.35em] italic">{t}</span>
          <span className="text-[0.4em] not-italic text-accent">✻</span>
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className="overflow-hidden border-y border-line py-5 sm:py-7" aria-label={items.join(", ")}>
      <motion.div
        aria-hidden
        className="flex whitespace-nowrap font-serif text-[clamp(2.25rem,6vw,5.5rem)] leading-none tracking-[-0.03em]"
        style={{ x }}
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
