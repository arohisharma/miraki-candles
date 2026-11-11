"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import CartLink from "./CartLink";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <header
      className={`sticky top-0 z-50 bg-ivory transition-shadow duration-700 ${
        scrolled ? "shadow-[0_10px_40px_-18px_rgba(51,34,28,0.35)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-serif text-xl tracking-[0.22em] transition-[letter-spacing] duration-700 group-hover:tracking-[0.3em] sm:text-2xl sm:tracking-[0.28em]">
            MIRAKI
          </span>
          <span className="mt-1 hidden text-[0.55rem] uppercase tracking-[0.42em] text-clay sm:block">
            Handmade luxury candles
          </span>
        </Link>
        <nav className="flex items-center gap-3 whitespace-nowrap text-[0.64rem] font-medium uppercase tracking-[0.12em] text-ink/70 sm:gap-9 sm:text-xs sm:tracking-[0.2em]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link-underline transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
