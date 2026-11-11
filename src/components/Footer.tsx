import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Miraki Candles. Hand-poured with care.</p>
        <div className="flex gap-6">
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <Link href="/about" className="hover:text-foreground">Our Story</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
