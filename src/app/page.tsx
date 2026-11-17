import Link from "next/link";
import CollectionReveal from "@/components/CollectionReveal";
import GiftGuide from "@/components/GiftGuide";
import Hero from "@/components/Hero";
import JustDropped from "@/components/JustDropped";
import Reveal from "@/components/Reveal";
import RitualGallery from "@/components/RitualGallery";
import ShopByMoment from "@/components/ShopByMoment";
import ShopTheLook from "@/components/ShopTheLook";
import Snow from "@/components/Snow";
import VelocityMarquee from "@/components/VelocityMarquee";
import { SEASON, season } from "@/lib/season";

export default function Home() {
  return (
    <>
      <Hero />
      <JustDropped />
      <RitualGallery />
      <ShopTheLook />
      <ShopByMoment />
      <GiftGuide />
      <CollectionReveal />

      <div className="py-10 sm:py-14">
        <VelocityMarquee items={season.values} />
      </div>

      {/* The one bold block */}
      <section className="relative overflow-hidden bg-band text-paper">
        {SEASON === "winter" && <Snow count={80} />}
        <Reveal className="relative mx-auto flex max-w-[90rem] flex-col gap-10 px-5 py-20 sm:px-10 sm:py-28 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl text-6xl leading-[0.88] tracking-[-0.03em] sm:text-8xl lg:text-9xl">
            {season.band.before} <em>{season.band.accent}</em>.
          </h2>
          <Link href="/shop" className="btn btn-paper shrink-0" data-cursor="Shop">
            {season.band.cta}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
