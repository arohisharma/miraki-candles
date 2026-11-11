import Link from "next/link";
import CartLink from "./CartLink";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-serif text-xl tracking-[0.2em] sm:text-2xl sm:tracking-[0.28em] transition-[letter-spacing] duration-700 group-hover:tracking-[0.36em]">
            MIRAKI
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.5em] text-gold">Candles</span>
        </Link>
        <nav className="flex items-center gap-3 whitespace-nowrap text-[0.62rem] uppercase tracking-[0.12em] text-muted sm:gap-9 sm:text-xs sm:tracking-[0.2em]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link-underline transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
