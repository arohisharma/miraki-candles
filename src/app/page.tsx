import Craft from "@/components/Craft";
// import CollectionReveal from "@/components/CollectionReveal"; // full-screen winter banner (removed from home)
// import GiftGuide from "@/components/GiftGuide"; // "Gifts that feel like a hug" (hidden for now)
import Hero from "@/components/Hero";
import JustDropped from "@/components/JustDropped";
import OurStory from "@/components/OurStory";
// import RitualGallery from "@/components/RitualGallery"; // Snow day / Self-care / Gift slides (hidden for now)
import { WinterGiftBoxes } from "@/components/WinterCollection";

export default function Home() {
  return (
    <>
      <Hero />
      <JustDropped />
      {/* <RitualGallery /> */}
      <WinterGiftBoxes />
      {/* <GiftGuide /> */}
      <OurStory />
      <Craft />
    </>
  );
}
