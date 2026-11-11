import { useId } from "react";

// Set candle wax: a still shape, so it costs nothing to draw after the first paint.
const DRIPS = [
  { x: 64, len: 72, w: 11 },
  { x: 176, len: 30, w: 8 },
  { x: 300, len: 122, w: 13 },
  { x: 418, len: 50, w: 9 },
  { x: 548, len: 90, w: 12 },
  { x: 688, len: 38, w: 10 },
  { x: 806, len: 134, w: 14 },
  { x: 936, len: 58, w: 9 },
  { x: 1052, len: 26, w: 8 },
  { x: 1164, len: 104, w: 12 },
  { x: 1288, len: 46, w: 10 },
  { x: 1392, len: 80, w: 11 },
];

const TOP = 24;
const HEIGHT = 230;

const WAVE = "M-40 -60H1480V22C1300 38 1180 12 1000 28C820 42 640 10 430 26C260 38 120 14 -40 30Z";

/**
 * Ivory candle wax that has melted down over a coloured section (static, not animated). Place it absolutely at the
 * top of the section, directly beneath an ivory area, so the wax appears to flow out of it.
 *
 * The filter fuses the shapes into one liquid body, then adds a warm shadow on the lower
 * right, a soft highlight on the upper left and a drop shadow, which gives the wax thickness.
 */
export default function WaxDrip({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox={`0 0 1440 ${HEIGHT}`}
      preserveAspectRatio="xMidYMin slice"
      className={`pointer-events-none block transform-gpu aspect-[1440/230] min-h-32 w-full ${className}`}
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
        <path d={WAVE} />
        {DRIPS.map((d) => (
          <g key={d.x}>
            <rect x={d.x - d.w} y={TOP} width={d.w * 2} height={d.len} />
            <circle cx={d.x} cy={TOP + d.len} r={d.w * 1.3} />
          </g>
        ))}
      </g>
    </svg>
  );
}
