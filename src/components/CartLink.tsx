"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";

export default function CartLink() {
  const count = useCart().reduce((n, i) => n + i.quantity, 0);

  return (
    <Link href="/cart" className="transition-colors hover:text-foreground">
      Cart{count > 0 && <span className="ml-1 text-accent">({count})</span>}
    </Link>
  );
}
