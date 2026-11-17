"use client";

import { getProduct } from "@/data/products";
import { openBag, useCart } from "@/lib/cart-store";

/** `onDark` keeps the count readable over the film hero. */
export default function CartLink({ onDark = false }: { onDark?: boolean }) {
  const count = useCart().reduce((n, i) => n + (getProduct(i.slug) ? i.quantity : 0), 0);

  return (
    <button
      type="button"
      onClick={openBag}
      aria-haspopup="dialog"
      className="link link-quiet uppercase tracking-[inherit]"
    >
      Cart{count > 0 && <span className={`ml-1 ${onDark ? "text-[#f1c48f]" : "text-accent"}`}>({count})</span>}
    </button>
  );
}
