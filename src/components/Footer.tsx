import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 overflow-hidden rounded-t-[2.5rem] bg-cream sm:rounded-t-[4rem]">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="max-w-sm font-serif text-3xl leading-snug sm:text-4xl">
              Poured by hand, <span className="italic text-clay">to make every room feel like home.</span>
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3">
              <li><Link href="/shop" className="link-underline">Shop all</Link></li>
              <li><Link href="/about" className="link-underline">Our story</Link></li>
              <li><Link href="/cart" className="link-underline">Cart</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Say hello</p>
            <ul className="mt-5 space-y-3">
              <li><Link href="/contact" className="link-underline">Contact</Link></li>
              <li className="text-muted">Custom &amp; wholesale enquiries welcome</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex justify-between border-t border-ink/10 pt-6 text-xs tracking-wider text-muted">
          <span>© 2026 Miraki Candles</span>
          <span>Handmade with love</span>
        </div>
      </div>
      <p
        aria-hidden
        className="bg-sunset -mb-[0.16em] select-none bg-clip-text text-center font-serif text-[25vw] italic leading-[0.9] text-transparent"
      >
        Miraki
      </p>
    </footer>
  );
}
