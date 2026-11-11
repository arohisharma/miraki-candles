import { useId } from "react";

/**
 * An illustrated, glowing candle jar tinted with the product colour.
 * Stand-in until real product photography is available.
 */
export default function CandleVisual({
  color,
  name,
  className,
}: {
  color: string;
  name?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${s}-${uid}`;

  return (
    <svg
      viewBox="0 0 200 280"
      className={className}
      style={{ overflow: "visible", ["--c" as string]: color }}
      role="img"
      aria-label={name ? `${name} candle` : "Candle"}
    >
      <defs>
        <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#f0a24f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f0a24f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("wax")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "color-mix(in srgb, var(--c) 70%, white)" }} />
          <stop offset="1" style={{ stopColor: "color-mix(in srgb, var(--c) 85%, black)" }} />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={id("flame")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9d3c" />
          <stop offset="0.55" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#fff4cf" />
        </linearGradient>
        <radialGradient id={id("shadow")} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient light */}
      <circle className="glow-pulse" cx="100" cy="100" r="150" fill={`url(#${id("glow")})`} />

      {/* ground shadow */}
      <ellipse cx="100" cy="266" rx="78" ry="10" fill={`url(#${id("shadow")})`} />

      {/* wax */}
      <rect x="40" y="142" width="120" height="116" rx="15" fill={`url(#${id("wax")})`} />
      <ellipse cx="100" cy="142" rx="60" ry="9" style={{ fill: "color-mix(in srgb, var(--c) 55%, white)" }} />
      <ellipse className="glow-pulse" cx="100" cy="142" rx="24" ry="4.5" fill="#ffd9a0" opacity="0.7" />

      {/* glass jar */}
      <rect
        x="34"
        y="114"
        width="132"
        height="148"
        rx="20"
        fill={`url(#${id("glass")})`}
        stroke="#fff"
        strokeOpacity="0.28"
      />
      <rect x="44" y="124" width="5" height="122" rx="2.5" fill="#fff" opacity="0.2" />

      {/* label */}
      <rect x="58" y="176" width="84" height="58" rx="4" fill="#f6efe4" opacity="0.95" />
      <text
        x="100"
        y="198"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="3.5"
        fill="#2b2118"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        MIRAKI
      </text>
      <line x1="82" y1="206" x2="118" y2="206" stroke="#c9a66b" strokeWidth="0.8" />
      {name && (
        <text
          x="100"
          y="220"
          textAnchor="middle"
          fontSize="6"
          letterSpacing="0.8"
          fill="#7a6a5c"
          style={{ textTransform: "uppercase", fontFamily: "var(--font-jost), sans-serif" }}
        >
          {name}
        </text>
      )}

      {/* wick + flame */}
      <rect x="99" y="124" width="2" height="18" rx="1" fill="#2a1a10" />
      <g transform="translate(100 128)">
        <g className="flame">
          <path
            d="M0 -48 C 9 -30 13 -19 13 -10 C 13 -3 7 1 0 1 C -7 1 -13 -3 -13 -10 C -13 -19 -9 -30 0 -48 Z"
            fill={`url(#${id("flame")})`}
          />
          <g className="flame-inner">
            <ellipse cx="0" cy="-9" rx="4.5" ry="9" fill="#7fb0ff" opacity="0.5" />
            <ellipse cx="0" cy="-8" rx="2.2" ry="5.5" fill="#fff" opacity="0.9" />
          </g>
        </g>
      </g>
    </svg>
  );
}
