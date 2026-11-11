"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "motion/react";

type Drip = {
  x: number;
  len: number;
  w: number;
  /** Seconds per creep cycle. Omit for a drip that has already set solid. */
  period?: number;
  phase?: number;
  /** Lets a droplet fall at the end of each cycle. */
  drop?: boolean;
};

// Real candle wax mostly sets where it lands; only a few runs are still creeping.
const DRIPS: Drip[] = [
  { x: 64, len: 72, w: 11, period: 17, phase: 0.1 },
  { x: 176, len: 30, w: 8 },
  { x: 300, len: 122, w: 13, period: 20, phase: 0.5, drop: true },
  { x: 418, len: 50, w: 9 },
  { x: 548, len: 90, w: 12, period: 16, phase: 0.8 },
  { x: 688, len: 38, w: 10 },
  { x: 806, len: 134, w: 14, period: 22, phase: 0.25, drop: true },
  { x: 936, len: 58, w: 9, period: 15, phase: 0.6 },
  { x: 1052, len: 26, w: 8 },
  { x: 1164, len: 104, w: 12, period: 18, phase: 0.05, drop: true },
  { x: 1288, len: 46, w: 10 },
  { x: 1392, len: 80, w: 11, period: 19, phase: 0.4 },
];

const TOP = 24;
const HEIGHT = 230;

const WAVE_A = "M-40 -60H1480V22C1300 38 1180 12 1000 28C820 42 640 10 430 26C260 38 120 14 -40 30Z";
const WAVE_B = "M-40 -60H1480V28C1300 14 1180 38 1000 20C820 8 640 40 430 22C260 10 120 36 -40 24Z";

/**
 * Ivory candle wax melting down over a coloured section. Place it absolutely at the
 * top of the section, directly beneath an ivory area, so the wax appears to flow out of it.
 *
 * The filter fuses the shapes into one liquid body, then adds a warm shadow on the lower
 * right, a soft highlight on the upper left and a drop shadow, which gives the wax thickness.
 */
export default function WaxDrip({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "120px" });

  return (
    <svg
      ref={ref}
      data-wax-paused={!inView}
      viewBox={`0 0 1440 ${HEIGHT}`}
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none block aspect-[1440/230] min-h-32 w-full ${className}`}
      aria-hidden
    >
      <defs>
        <filter
          id={`wax-${uid}`}
          filterUnits="userSpaceOnUse"
          x="-40"
          y="-60"
          width="1520"
          height={HEIGHT + 100}
          colorInterpolationFilters="sRGB"
        >
          {/* fuse into one liquid body */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"
            result="goo"
          />
          <feGaussianBlur in="goo" stdDeviation="5" result="soft" />

          {/* warm shading on the lower-right edges */}
          <feOffset in="soft" dx="-6" dy="-7" result="offShade" />
          <feComposite in="goo" in2="offShade" operator="out" result="edgeShade" />
          <feFlood floodColor="#d49a6a" floodOpacity="0.75" />
          <feComposite in2="edgeShade" operator="in" result="shade" />

          {/* soft highlight on the upper-left edges */}
          <feOffset in="soft" dx="4" dy="5" result="offLight" />
          <feComposite in="goo" in2="offLight" operator="out" result="edgeLight" />
          <feFlood floodColor="#ffffff" floodOpacity="0.95" />
          <feComposite in2="edgeLight" operator="in" result="light" />

          {/* shadow cast onto the section behind */}
          <feOffset in="soft" dx="3" dy="10" result="offDrop" />
          <feFlood floodColor="#4a1c12" floodOpacity="0.3" />
          <feComposite in2="offDrop" operator="in" result="drop" />

          <feMerge>
            <feMergeNode in="drop" />
            <feMergeNode in="goo" />
            <feMergeNode in="shade" />
            <feMergeNode in="light" />
          </feMerge>
        </filter>
        <linearGradient id={`fill-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={HEIGHT}>
          <stop offset="0" stopColor="#fffaf1" />
          <stop offset="0.12" stopColor="#fffaf1" />
          <stop offset="1" stopColor="#f8ecd8" />
        </linearGradient>
      </defs>

      <g filter={`url(#wax-${uid})`} fill={`url(#fill-${uid})`}>
        <motion.path
          d={WAVE_A}
          animate={{ d: [WAVE_A, WAVE_B, WAVE_A] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {DRIPS.map((d) => {
          const tip = TOP + d.len;
          const moving = d.period !== undefined;
          const style = moving
            ? ({
                "--len": `${d.len}px`,
                "--fall": `${HEIGHT - tip + 30}px`,
                "--p": `${d.period}s`,
                "--d": `${-(d.phase ?? 0) * (d.period ?? 1)}s`,
              } as React.CSSProperties)
            : undefined;
          return (
            <g key={d.x} style={style}>
              <rect
                className={moving ? "wax-stem" : undefined}
                x={d.x - d.w}
                y={TOP}
                width={d.w * 2}
                height={d.len}
              />
              <circle className={moving ? "wax-bead" : undefined} cx={d.x} cy={tip} r={d.w * 1.3} />
              {d.drop && <circle className="wax-drop" cx={d.x} cy={tip} r={d.w * 0.8} />}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
