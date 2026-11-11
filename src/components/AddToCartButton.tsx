"use client";

import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart-store";

export default function AddToCartButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => {
          addToCart(slug);
          setAdded(true);
        }}
        className="bg-accent px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark"
      >
        Add to cart
      </button>
      <p className="mt-3 h-5 text-sm text-muted" aria-live="polite">
        {added && (
          <>
            Added.{" "}
            <Link href="/cart" className="underline hover:text-foreground">
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
