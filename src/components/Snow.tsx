"use client";

import { useEffect, useRef } from "react";

type Flake = { x: number; y: number; r: number; vy: number; vx: number; phase: number; a: number };

/**
 * Gentle snowfall drawn on one canvas that fills its (relatively positioned) parent.
 * Kept cheap on purpose: it only animates while on screen and the tab is visible,
 * caps the pixel density, halves the flakes on small screens, and stays off entirely
 * for visitors who prefer reduced motion.
 */
export default function Snow({ count = 70, className = "" }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let onScreen = false;
    let flakes: Flake[] = [];

    const makeFlake = (y: number): Flake => ({
      x: Math.random() * w,
      y,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.25 + Math.random() * 0.6,
      vx: -0.15 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      a: 0.45 + Math.random() * 0.5,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 640 ? Math.round(count / 2) : count;
      if (flakes.length !== n) flakes = Array.from({ length: n }, () => makeFlake(Math.random() * h));
    };

    const frame = (t: number) => {
      const dt = Math.min(50, t - last) / 16.67;
      last = t;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff";
      for (const f of flakes) {
        f.phase += 0.012 * dt;
        f.y += f.vy * dt * (0.6 + f.r * 0.35);
        f.x += (f.vx + Math.sin(f.phase) * 0.35) * dt;
        if (f.y > h + 6) Object.assign(f, makeFlake(-6));
        if (f.x > w + 6) f.x = -6;
        else if (f.x < -6) f.x = w + 6;
        ctx.globalAlpha = f.a;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      start();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [count]);

  return (
    <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
  );
}
