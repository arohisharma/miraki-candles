import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Born from a quiet evening"
        subtitle="Miraki began with a simple idea: a candle should make a room feel like home."
      />
      <div className="mx-auto max-w-2xl px-6 py-20">
        {/* TODO: replace with the client's real brand story */}
        <div className="space-y-8 text-lg leading-relaxed text-muted">
          <Reveal>
            <p>
              Every Miraki candle is poured by hand, in small batches, with the same care you would
              give to a gift for someone you love.
            </p>
          </Reveal>
          <Reveal>
            <p className="border-l-2 border-gold pl-6 font-serif text-3xl italic leading-snug text-foreground">
              We believe the best moments are slow ones.
            </p>
          </Reveal>
          <Reveal>
            <p>
              We use natural wax, cotton wicks and carefully blended fragrance, so each candle burns
              clean, glows warmly and lasts.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-14 text-center">
          <Link href="/shop" className="btn">Meet the candles</Link>
        </Reveal>
      </div>
    </>
  );
}
