import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-5xl">Our Story</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-muted">
        <p>
          Miraki began with a simple idea: a candle should make a room feel like home. Every
          candle is poured by hand in small batches.
        </p>
        <p>
          We use natural wax, cotton wicks and carefully blended fragrance oils, so each candle
          burns clean and lasts.
        </p>
        
      </div>
    </div>
  );
}
