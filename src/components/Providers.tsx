"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {/* Inertial smooth scrolling, skipped for people who prefer reduced motion */}
      {!reduce && <ReactLenis root options={{ lerp: 0.09 }} />}
      {children}
    </MotionConfig>
  );
}
