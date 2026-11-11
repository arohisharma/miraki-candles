"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { getProduct } from "@/data/products";

type Frame = {
  slug: string;
  pos: React.CSSProperties;
  aspect: string;
  shape: string;
  rotate: number;
  depth: number;
  float: number;
  duration: number;
  delay: number;
  z: number;
  priority?: boolean;
};

const ARCH = "rounded-t-full rounded-b-[1.4rem]";

const FRAMES: Frame[] = [
  { slug: "diwali-gift-box", pos: { left: "29%", top: "0%", width: "44%" }, aspect: "3 / 5", shape: ARCH, rotate: 0, depth: 12, float: 10, duration: 8, delay: 0, z: 20, priority: true },
  { slug: "lotus-bloom", pos: { left: "0%", bottom: "2%", width: "37%" }, aspect: "3 / 4.5", shape: ARCH, rotate: -5, depth: 30, float: 14, duration: 7, delay: 0.6, z: 30 },
  { slug: "rose-petal-jar", pos: { right: "0%", bottom: "8%", width: "35%" }, aspect: "3 / 4.4", shape: ARCH, rotate: 5, depth: 36, float: 12, duration: 6.5, delay: 1.1, z: 30 },
  { slug: "ocean-daisy-jar", pos: { left: "5%", top: "7%", width: "23%" }, aspect: "1 / 1", shape: "rounded-full", rotate: -8, depth: 50, float: 16, duration: 6, delay: 0.3, z: 10 },
];

function FloatFrame({
  frame,
  index,
  mx,
  my,
}: {
  frame: Frame;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const product = getProduct(frame.slug);
  const x = useTransform(mx, [-0.5, 0.5], [-frame.depth, frame.depth]);
  const y = useTransform(my, [-0.5, 0.5], [-frame.depth * 0.6, frame.depth * 0.6]);
  if (!product?.image) return null;

  return (
    <motion.div className="absolute" style={{ ...frame.pos, x, y, zIndex: frame.z }}>
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.9, rotate: frame.rotate * 2.5 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: frame.rotate }}
        transition={{ duration: 1.5, delay: 1.5 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -frame.float, 0] }}
          transition={{ duration: frame.duration, delay: frame.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={`bg-ivory p-1.5 shadow-[0_40px_70px_-25px_rgba(60,15,10,0.65)] ${frame.shape}`}>
            <div className={`relative overflow-hidden ${frame.shape}`} style={{ aspectRatio: frame.aspect }}>
              <Image
                src={product.image}
                alt={`${product.name} candle`}
                fill
                sizes="(min-width: 1024px) 16rem, 45vw"
                priority={frame.priority}
                style={{ objectPosition: product.imagePosition }}
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const BADGE_TEXT = "HAND-POURED · SMALL BATCH · SOY WAX · MADE WITH LOVE · ";

export default function HeroArches({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const bx = useTransform(mx, [-0.5, 0.5], [-60, 60]);
  const by = useTransform(my, [-0.5, 0.5], [-40, 40]);

  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[24rem] sm:max-w-[30rem] lg:max-w-[36rem]">
      {FRAMES.map((f, i) => (
        <FloatFrame key={f.slug} frame={f} index={i} mx={mx} my={my} />
      ))}

      {/* rotating seal */}
      <motion.div
        className="absolute right-[1%] top-[5%] z-40 w-[25%]"
        style={{ x: bx, y: by }}
        initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-square rounded-full bg-marigold shadow-[0_20px_40px_-15px_rgba(60,15,10,0.6)]">
          <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full">
            <defs>
              <path id="seal-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <text fontSize="9.4" letterSpacing="2.1" fill="#33221c" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600 }}>
              <textPath href="#seal-circle">{BADGE_TEXT}</textPath>
            </text>
          </svg>
          <svg viewBox="-20 -52 40 58" className="absolute left-1/2 top-1/2 h-[38%] -translate-x-1/2 -translate-y-1/2">
            <g className="flame">
              <path
                d="M0 -48 C 9 -30 13 -19 13 -10 C 13 -3 7 1 0 1 C -7 1 -13 -3 -13 -10 C -13 -19 -9 -30 0 -48 Z"
                fill="#33221c"
              />
              <ellipse cx="0" cy="-9" rx="4" ry="8" fill="#efa63a" />
            </g>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
