import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ShopByMoment from "@/components/ShopByMoment";
import { winterProducts } from "@/data/products";
import { WinterCovers, WinterGiftBoxes } from "@/components/WinterCollection";

export const metadata: Metadata = { title: "The Winter Collection" };

export default function WinterPage() {
  return (
    <>
      <PageHero eyebrow="Just dropped" title="The Winter Collection" subtitle="Trees, reindeer and pinecones, hand-poured in soy wax." />
      <WinterCovers />
      <ShopByMoment products={winterProducts} />
      <WinterGiftBoxes />
    </>
  );
}
