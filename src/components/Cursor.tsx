"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft ring that trails the pointer on desktop. Over anything marked
 * data-cursor="Label" it grows into a disc showing that label.
 * The normal cursor stays visible; touch devices and reduced motion get nothing.
 */
const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export default function Cursor() {
  const enabled = useFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : null);
    };
    const leave = () => setHidden(true);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const big = Boolean(label);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[0.62rem] font-medium uppercase tracking-[0.18em]"
        animate={{
          width: big ? 88 : 30,
          height: big ? 88 : 30,
          backgroundColor: big ? "rgba(245,245,242,0.95)" : "rgba(245,245,242,0)",
          borderColor: big ? "rgba(245,245,242,0)" : "rgba(128,128,128,0.6)",
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ borderWidth: 1, borderStyle: "solid", color: "#18201c" }}
      >
        {big && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
