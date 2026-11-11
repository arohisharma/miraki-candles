"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import CartLink from "./CartLink";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md transition-colors duration-500 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 sm:px-10 sm:py-5">
        <Link href="/" className="font-serif text-3xl leading-none tracking-tight">
          Miraki<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-5 text-[0.7rem] font-medium uppercase tracking-[0.18em] sm:gap-10">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link link-quiet">
              {l.label}
            </Link>
          ))}
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
