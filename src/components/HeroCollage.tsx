"use client";

import Image from "next/image";
import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { getProduct } from "@/data/products";

type CardSpec = {
  slug: string;
  left: string;
  top: string;
  width: string;
  rotate: number;
  depth: number; // parallax strength (px) + z offset
  float: number; // float distance (px)
  duration: number;
  delay: number;
  priority?: boolean;
};

const CARDS: CardSpec[] = [
  { slug: "diwali-gift-box", left: "20%", top: "2%", width: "56%", rotate: -3, depth: 14, float: 10, duration: 7, delay: 0, priority: true },
  { slug: "rose-petal-jar", left: "58%", top: "38%", width: "40%", rotate: 7, depth: 34, float: 14, duration: 6, delay: 0.8 },
  { slug: "lotus-bloom", left: "0%", top: "44%", width: "42%", rotate: -8, depth: 40, float: 12, duration: 8, delay: 0.4 },
  { slug: "ocean-daisy-jar", left: "34%", top: "60%", width: "36%", rotate: 3, depth: 54, float: 16, duration: 6.5, delay: 1.2 },
];

function FloatCard({
  spec,
  index,
  mx,
  my,
}: {
  spec: CardSpec;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const product = getProduct(spec.slug);
  const x = useTransform(mx, [-0.5, 0.5], [-spec.depth, spec.depth]);
  const y = useTransform(my, [-0.5, 0.5], [-spec.depth * 0.6, spec.depth * 0.6]);
  if (!product?.image) return null;

  return (
    <motion.div
      className="absolute"
      style={{ left: spec.left, top: spec.top, width: spec.width, x, y, z: spec.depth * 2, transformStyle: "preserve-3d" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.85, rotate: spec.rotate * 2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: spec.rotate }}
        transition={{ duration: 1.4, delay: 0.5 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -spec.float, 0] }}
          transition={{ duration: spec.duration, delay: spec.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-gold/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75),0_0_50px_-10px_rgba(240,162,79,0.25)]">
            <Image
              src={product.image}
              alt={`${product.name} candle`}
              fill
              sizes="(min-width: 1024px) 18rem, 60vw"
              priority={spec.priority}
              style={{ objectPosition: product.imagePosition }}
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-white/5" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroCollage({
  mx,
  my,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]" style={{ transformStyle: "preserve-3d" }}>
      {CARDS.map((c, i) => (
        <FloatCard key={c.slug} spec={c} index={i} mx={mx} my={my} />
      ))}
    </div>
  );
}
