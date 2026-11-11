import Link from "next/link";
import Embers from "./Embers";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-background/70">
      <Embers count={8} />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="bg-gradient-to-b from-gold-light to-gold bg-clip-text font-serif text-5xl tracking-[0.25em] text-transparent">
              MIRAKI
            </p>
            <p className="mt-4 max-w-xs font-serif text-lg italic text-background/60">
              Hand-poured in small batches, to make every room feel like home.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/shop" className="link-underline hover:text-background">Shop all</Link></li>
              <li><Link href="/about" className="link-underline hover:text-background">Our story</Link></li>
              <li><Link href="/cart" className="link-underline hover:text-background">Cart</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Say hello</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/contact" className="link-underline hover:text-background">Contact</Link></li>
              <li className="text-background/50">Custom &amp; wholesale enquiries welcome</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-gold/20 pt-6 text-xs tracking-wider text-background/40">
          © 2026 Miraki Candles. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
