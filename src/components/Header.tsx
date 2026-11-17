"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { season } from "@/lib/season";
import CartLink from "./CartLink";
import SeasonBanner from "./SeasonBanner";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Story" },
  { href: "/contact", label: "Contact" },
];

/**
 * Fixed header. On the home page it sits transparently over the film hero and turns
 * solid once you scroll past it; on other pages it is solid with a spacer beneath.
 */
export default function Header() {
  const isHome = usePathname() === "/";
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) =>
    setScrolled(v > (isHome ? window.innerHeight * 0.75 : 24)),
  );
  const overlay = isHome && !scrolled;
  const hasBanner = Boolean(season.banner);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <SeasonBanner />
        <header
          className={`border-b transition-colors duration-500 ${
            overlay
              ? "border-transparent bg-transparent text-paper"
              : "border-line bg-paper text-ink"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:h-20 sm:px-10">
            <Link href="/" className="font-serif text-[1.7rem] leading-none tracking-tight sm:text-3xl">
              Miraki<span className={overlay ? "text-glow" : "text-accent"}>.</span>
            </Link>
            <nav className="flex items-center gap-3.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] sm:gap-10 sm:text-[0.7rem] sm:tracking-[0.18em]">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="link link-quiet">
                  {l.label}
                </Link>
              ))}
              <CartLink onDark={overlay} />
            </nav>
          </div>
        </header>
      </div>
      {!isHome && <div aria-hidden className={hasBanner ? "h-26 sm:h-30" : "h-16 sm:h-20"} />}
    </>
  );
}
