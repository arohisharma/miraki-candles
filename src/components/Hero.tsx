"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Embers from "./Embers";
import HeroArches from "./HeroArches";
import WaxDrip from "./WaxDrip";

const WORDS = ["Light", "a", "little"];
const ease = [0.22, 1, 0.36, 1] as const;
// Everything waits for the page-load curtain to lift.
const T0 = 1.2;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });

  // candlelight that follows the cursor
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const sgx = useSpring(gx, { stiffness: 50, damping: 20 });
  const sgy = useSpring(gy, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archesY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      className="bg-sunset relative overflow-hidden rounded-b-[2.5rem] text-ivory sm:rounded-b-[4rem]"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
        gx.set(e.clientX - r.left - r.width / 2);
        gy.set(e.clientY - r.top - r.height / 2);
      }}
    >
      {/* slow drifting colour */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="aurora left-[-10%] top-[10%] h-[34rem] w-[34rem] bg-[#f2a83b]/55" style={{ "--ax": "90px", "--ay": "-50px" } as React.CSSProperties} />
        <span className="aurora right-[-8%] top-[-10%] h-[38rem] w-[38rem] bg-[#e2557f]/60" style={{ "--ax": "-70px", "--ay": "60px", animationDelay: "-6s" } as React.CSSProperties} />
        <span className="aurora bottom-[-25%] left-[35%] h-[32rem] w-[32rem] bg-[#f6c08a]/45" style={{ "--ax": "60px", "--ay": "-70px", animationDelay: "-11s" } as React.CSSProperties} />
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[22rem] -mt-[22rem] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,240,205,0.4),transparent_62%)] mix-blend-soft-light"
        style={{ x: sgx, y: sgy }}
      />
      <Embers count={20} />

      {/* the header melts down into the hero */}
      <WaxDrip className="absolute inset-x-0 top-0 z-20" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-28 pt-40 sm:pt-52 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-36 lg:pt-56">
        <motion.div style={{ y: textY }} className="text-center lg:text-left">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full bg-ivory/15 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-ivory ring-1 ring-ivory/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: T0, ease }}
          >
            <span className="text-marigold">✦</span> Handmade luxury candles
          </motion.p>

          <h1 className="mt-7 text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.92]">
            {WORDS.map((w, i) => (
              <motion.span
                key={w + i}
                className="mr-[0.22em] inline-block"
                initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: T0 + 0.15 + i * 0.14, ease }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="inline-block pr-2 italic text-[#ffe2a8]"
              initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: T0 + 0.65, ease }}
            >
              calm.
            </motion.span>
          </h1>

          <motion.p
            className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-ivory/90 lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: T0 + 0.9, ease }}
          >
            Sculpted flowers, layered jars and festive gift boxes, poured by hand in small batches
            for evenings that feel slow, warm and entirely yours.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: T0 + 1.05, ease }}
          >
            <Link href="/shop" className="btn btn-light">Explore the collection</Link>
            <Link href="/about" className="btn btn-ghost">Our story</Link>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-ivory/80 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: T0 + 1.3 }}
          >
            {["100% soy wax", "Handmade with love", "Perfect for gifting"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-marigold">✦</span>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: archesY }}>
          <HeroArches mx={smx} my={smy} />
        </motion.div>
      </div>
    </section>
  );
}
