import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ScrollWords from "@/components/ScrollWords";

export const metadata: Metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Born from a quiet evening"
        subtitle="Miraki began with a simple idea: a candle should make a room feel like home."
      />
      <div className="mx-auto max-w-3xl px-6 py-24">
        {/* TODO: replace with the client's real brand story */}
        <ScrollWords
          className="font-serif text-4xl leading-[1.15] sm:text-5xl"
          text="We believe the best moments are slow ones. A cup of something warm, a room gone soft, a small flame keeping you company."
        />
        <div className="mt-14 space-y-7 text-lg leading-relaxed text-muted">
          <Reveal>
            <p>
              Every Miraki candle is shaped and poured by hand, in small batches, with the same care
              you would give to a gift for someone you love.
            </p>
          </Reveal>
          <Reveal>
            <p>
              We use soy wax, cotton wicks and carefully blended fragrance, so each candle burns
              clean, glows warmly and lasts.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          <Link href="/shop" className="btn">Meet the candles</Link>
        </Reveal>
      </div>
    </>
  );
}
