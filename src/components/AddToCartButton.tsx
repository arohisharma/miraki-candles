"use client";

import { useState } from "react";
import Link from "next/link";
import { addToCart, openBag } from "@/lib/cart-store";
import { chime } from "@/lib/sound";

export default function AddToCartButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <span className="text-sm" aria-live="polite">
        {added && (
          <Link href="/cart" className="link text-accent">
            View cart
          </Link>
        )}
      </span>
      <button
        type="button"
        onClick={() => {
          addToCart(slug);
          chime();
          openBag();
          setAdded(true);
        }}
        className="btn"
      >
        {added ? "Added — add another" : "Add to bag"}
      </button>
    </div>
  );
}
