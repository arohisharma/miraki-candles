"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

/** 3D perspective tilt that follows the pointer, with a soft light glare. */
export default function Tilt({
  children,
  max = 10,
  rounded = "rounded-2xl",
  className,
}: {
  children: React.ReactNode;
  max?: number;
  rounded?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18 });
  const sy = useSpring(y, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const glare = useTransform(
    [sx, sy],
    ([px, py]: number[]) =>
      `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,240,210,0.22), transparent 55%)`,
  );

  return (
    <div
      className={className}
      style={{ perspective: 1100 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${rounded}`}
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}
