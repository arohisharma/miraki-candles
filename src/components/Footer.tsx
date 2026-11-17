import Link from "next/link";
import { season } from "@/lib/season";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="mx-auto max-w-[90rem] px-5 pt-16 sm:px-10 sm:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="font-serif text-3xl leading-tight md:col-span-6 sm:text-4xl">
            {season.footer.before}
            <br />
            for the quiet <em className="text-accent">{season.footer.accent}</em>.
          </p>
          <div className="md:col-span-3">
            <p className="label">Explore</p>
            <ul className="mt-5 space-y-3">
              <li><Link href="/shop" className="link link-quiet">Shop all</Link></li>
              <li><Link href="/about" className="link link-quiet">Our story</Link></li>
              <li><Link href="/cart" className="link link-quiet">Cart</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="label">Say hello</p>
            <ul className="mt-5 space-y-3">
              <li><Link href="/contact" className="link link-quiet">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex justify-between border-t border-line pt-6 text-xs text-muted">
          <span>© 2026 Miraki Candles</span>
          <span>Handmade with love</span>
        </div>
      </div>
      <p aria-hidden className="-mb-[0.2em] select-none text-center font-serif text-[27vw] leading-[0.85] tracking-[-0.04em]">
        Miraki
      </p>
    </footer>
  );
}
