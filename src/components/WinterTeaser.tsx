import Link from "next/link";
import { season } from "@/lib/season";
import ParallaxImage from "./ParallaxImage";
import Reveal from "./Reveal";
import Snow from "./Snow";

/** Announces the upcoming seasonal collection. Renders nothing outside a season that has one. */
export default function WinterTeaser() {
  const t = season.teaser;
  if (!t) return null;

  return (
    <section className="mx-auto max-w-[90rem] px-5 pb-28 sm:px-10 sm:pb-40">
      <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-16">
        <ParallaxImage
          src={t.image}
          alt={t.alt}
          className="aspect-[4/5] md:col-span-7 md:aspect-[5/4]"
          sizes="(min-width: 768px) 58vw, 100vw"
        >
          <Snow count={60} />
        </ParallaxImage>

        <Reveal className="flex flex-col justify-end md:col-span-5">
          <p className="label">
            <span className="text-accent">✻</span> {t.label}
          </p>
          <h2 className="mt-5 text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
            {t.title} <em className="text-accent">{t.accent}</em>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{t.copy}</p>
          <p className="mt-8 font-serif text-2xl italic">
            {t.notes.map((n, i) => (
              <span key={n} className="whitespace-nowrap">
                {n}
                {i < t.notes.length - 1 && <span className="mx-3 not-italic text-accent">·</span>}
              </span>
            ))}
          </p>
          <div className="mt-10">
            <Link href="/contact" className="btn">Be the first to know</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
