"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart-store";
import { chime } from "@/lib/sound";

export default function QuickAdd({
  slug,
  label,
  className = "",
}: {
  slug: string;
  label: string;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(slug);
        chime();
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }}
      className={className}
    >
      {added ? "Added to bag ✓" : label}
    </button>
  );
}
