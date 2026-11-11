"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";
import { useCart } from "@/lib/cart-store";

export default function CartLink() {
  const count = useCart().reduce((n, i) => n + (getProduct(i.slug) ? i.quantity : 0), 0);

  return (
    <Link href="/cart" className="link link-quiet">
      Cart{count > 0 && <span className="ml-1 text-accent">({count})</span>}
    </Link>
  );
}
