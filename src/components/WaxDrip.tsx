"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "motion/react";

// x/len/w are in viewBox units. `phase` offsets each drip in its cycle so they never move in lockstep.
const DRIPS = [
  { x: 70, len: 52, w: 7, period: 11, phase: 0.1 },
  { x: 215, len: 88, w: 9, period: 13, phase: 0.55 },
  { x: 350, len: 38, w: 6, period: 9, phase: 0.3 },
  { x: 505, len: 70, w: 8, period: 12, phase: 0.8 },
  { x: 650, len: 30, w: 6, period: 10, phase: 0.45 },
  { x: 790, len: 96, w: 10, period: 14, phase: 0.2 },
  { x: 940, len: 46, w: 7, period: 9.5, phase: 0.65 },
  { x: 1085, len: 76, w: 8, period: 12.5, phase: 0.05 },
  { x: 1230, len: 40, w: 6, period: 10.5, phase: 0.9 },
  { x: 1370, len: 62, w: 8, period: 11.5, phase: 0.4 },
];

const TOP = 22;
const HEIGHT = 190;

const WAVE_A = "M-40 -40H1480V22C1200 40 1000 10 720 26C440 42 240 12 -40 30Z";
const WAVE_B = "M-40 -40H1480V28C1200 10 1000 40 720 18C440 6 240 42 -40 22Z";

/**
 * Molten wax melting down from the section above. A blur + threshold filter makes the
 * stems, beads and falling droplets merge and pinch like real viscous liquid.
 */
export default function WaxDrip({ className = "text-espresso" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "120px" });

  return (
    <svg
      ref={ref}
      data-wax-paused={!inView}
      viewBox={`0 0 1440 ${HEIGHT}`}
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none -mt-px block h-24 w-full sm:h-36 ${className}`}
      aria-hidden
    >
      <defs>
        <filter
          id={`goo-${uid}`}
          filterUnits="userSpaceOnUse"
          x="-40"
          y="-40"
          width="1520"
          height={HEIGHT + 60}
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
          />
        </filter>
        <linearGradient id={`wax-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HEIGHT}>
          <stop offset="0" stopColor="#1b130e" />
          <stop offset="0.55" stopColor="#2c1d12" />
          <stop offset="1" stopColor="#573620" />
        </linearGradient>
      </defs>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}>
        {/* Liquid body: blurred + thresholded so everything fuses together */}
        <g filter={`url(#goo-${uid})`} fill={`url(#wax-${uid})`}>
          <motion.path
            d={WAVE_A}
            animate={{ d: [WAVE_A, WAVE_B, WAVE_A] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          {DRIPS.map((d) => {
            const style = {
              "--len": `${d.len}px`,
              "--fall": `${HEIGHT - TOP - d.len + 20}px`,
              "--p": `${d.period}s`,
              "--d": `${-d.phase * d.period}s`,
            } as React.CSSProperties;
            const tip = TOP + d.len;
            return (
              <g key={d.x} style={style}>
                <rect className="wax-stem" x={d.x - d.w} y={TOP} width={d.w * 2} height={d.len} />
                <circle className="wax-bead" cx={d.x} cy={tip} r={d.w * 1.5} />
                <circle className="wax-drop" cx={d.x} cy={tip} r={d.w * 0.95} />
              </g>
            );
          })}
        </g>

        {/* Soft glossy highlights riding on top of the liquid (unfiltered so they stay crisp) */}
        <g fill="#ffeccb">
          {DRIPS.map((d) => {
            const style = {
              "--len": `${d.len}px`,
              "--fall": `${HEIGHT - TOP - d.len + 20}px`,
              "--p": `${d.period}s`,
              "--d": `${-d.phase * d.period}s`,
            } as React.CSSProperties;
            const tip = TOP + d.len;
            const r = d.w * 1.5;
            return (
              <g key={d.x} style={style} opacity="0.4">
                <rect
                  className="wax-hl wax-hl-stem"
                  x={d.x - d.w * 0.55}
                  y={TOP + 2}
                  width={d.w * 0.32}
                  height={d.len - 2}
                  rx={d.w * 0.16}
                />
                <ellipse
                  className="wax-hl wax-hl-bead"
                  cx={d.x - r * 0.35}
                  cy={tip - r * 0.3}
                  rx={r * 0.24}
                  ry={r * 0.38}
                />
                <ellipse
                  className="wax-hl wax-hl-drop"
                  cx={d.x - d.w * 0.3}
                  cy={tip - d.w * 0.25}
                  rx={d.w * 0.2}
                  ry={d.w * 0.34}
                />
              </g>
            );
          })}
        </g>
      </motion.g>
    </svg>
  );
}
