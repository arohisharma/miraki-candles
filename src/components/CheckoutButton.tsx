"use client";

import { useState } from "react";
import type { CartItem } from "@/lib/cart-store";

export default function CheckoutButton({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={checkout}
        disabled={loading}
        className="mt-6 w-full bg-accent px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
      >
        {loading ? "Redirecting…" : "Checkout"}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </>
  );
}
