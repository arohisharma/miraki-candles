import Image from "next/image";
import Reveal from "./Reveal";

/** The founders' story: one picture, one paragraph, plenty of room. */
export default function OurStory() {
  return (
    <section aria-label="Our story" className="mx-auto max-w-[90rem] px-5 py-32 sm:px-10 sm:py-56">
      <div className="grid items-center gap-14 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5 md:col-start-2 lg:col-start-3">
          <div className="relative aspect-[11/10] w-full max-w-[24rem] overflow-hidden bg-stone">
            <Image
              src="/story/sisters-pouring.webp"
              alt="The two Miraki sisters at their table, setting wicks and scattering rose petals into candles"
              fill
              sizes="(min-width: 768px) 24rem, 90vw"
              className="object-cover [filter:saturate(0.82)_contrast(0.96)_brightness(1.03)_sepia(0.1)]"
            />
            {/* soft winter grade: a wash of blush and a touch of wine in the shadows */}
            <div aria-hidden className="absolute inset-0 bg-[#f1d4d6] mix-blend-soft-light opacity-60" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#2a0f16]/25 via-transparent to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-4 md:col-start-8">
          <p className="label">Our story</p>
          {/* PLACEHOLDER copy. Replace with the founders' own words. */}
          <p className="mt-6 font-serif text-2xl leading-snug sm:text-3xl">
            Two sisters, two busy corporate jobs, and one shared wish: to make something of our own. We started pouring
            candles at home after work, one small batch at a time. That is how Miraki was born.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
