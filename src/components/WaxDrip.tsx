"use client";

import { motion } from "motion/react";

const DRIPS = [
  { x: 90, len: 46, w: 7, delay: 0.1 },
  { x: 230, len: 82, w: 9, delay: 0.35 },
  { x: 380, len: 34, w: 6, delay: 0.2 },
  { x: 540, len: 64, w: 8, delay: 0.5 },
  { x: 700, len: 28, w: 6, delay: 0.15 },
  { x: 860, len: 90, w: 10, delay: 0.4 },
  { x: 1010, len: 44, w: 7, delay: 0.25 },
  { x: 1160, len: 72, w: 8, delay: 0.55 },
  { x: 1310, len: 38, w: 7, delay: 0.2 },
];

/** Dark wax that slowly drips down into the next section. Sits at the bottom of a dark hero. */
export default function WaxDrip({ className = "text-espresso" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="xMidYMin slice"
      className={`-mt-px block h-20 w-full sm:h-28 ${className}`}
      fill="currentColor"
      aria-hidden
    >
      <motion.g initial="hide" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
        <path d="M0 0H1440V24C1200 40 1000 12 720 26C440 42 240 14 0 30Z" />
        {DRIPS.map((d) => {
          const transition = { duration: 1.8, delay: d.delay, ease: [0.45, 0, 0.2, 1] as const };
          return (
            <g key={d.x}>
              <motion.rect
                x={d.x - d.w}
                y={20}
                width={d.w * 2}
                rx={d.w}
                variants={{ hide: { height: 0 }, show: { height: d.len, transition } }}
              />
              <motion.circle
                cx={d.x}
                r={d.w * 1.35}
                variants={{
                  hide: { cy: 20 },
                  show: { cy: 20 + d.len - d.w * 0.4, transition },
                }}
              />
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}
