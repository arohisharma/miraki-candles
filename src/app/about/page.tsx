import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ParallaxImage from "@/components/ParallaxImage";
import Reveal from "@/components/Reveal";
import ScrollWords from "@/components/ScrollWords";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = { title: "Our story" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Born from a quiet evening."
        subtitle="Miraki began with a simple idea: a candle should make a room feel like home."
      />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-10">
        {/* Stock photo standing in for the maker's own */}
        <ParallaxImage
          src={unsplash("photo-1695755117860-da93d1aaf96b", 2000)}
          alt="An open book and a lit candle on a blanket"
          className="aspect-[4/5] sm:aspect-[21/9]"
        />
      </div>
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-24 sm:px-10 sm:py-36 md:grid-cols-12">
        <p className="label md:col-span-3">What we believe</p>
        <div className="md:col-span-9">
          {/* TODO: replace with the client's real brand story */}
          <ScrollWords
            className="font-serif text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.06] tracking-[-0.02em]"
            text="The best moments are the slow ones. Something warm to drink, a room gone soft, a small flame keeping you company."
          />
          <div className="mt-14 grid max-w-3xl gap-8 text-lg leading-relaxed text-muted sm:grid-cols-2">
            <Reveal>
              <p>
                Every Miraki candle is shaped and poured by hand, in small batches, with the same
                care you would give to a gift for someone you love.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                We use soy wax, cotton wicks and carefully blended fragrance, so each candle burns
                clean, glows warmly and lasts.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-14">
            <Link href="/shop" className="btn">Shop candles</Link>
          </Reveal>
        </div>
      </div>
    </>
  );
}
