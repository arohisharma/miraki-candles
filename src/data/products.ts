import { unsplash } from "@/lib/unsplash";

export type Mood = "Serene" | "Festive" | "Romantic" | "Fresh";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in USD
  size: string;
  burnTime: string;
  notes: string[];
  mood: Mood;
  color: string; // tint for the illustrated candle shown until a photo is added
  /** Soft pastel background used behind this product. */
  tint: string;
  /** Path under /public, e.g. "/products/lotus-bloom.jpg". When set, the photo replaces the illustration. */
  image?: string;
  /** CSS object-position for cropping the photo, e.g. "50% 80%". */
  imagePosition?: string;
  /** Stock photo used instead of `image` while USE_SAMPLE_PHOTOS is on. */
  sampleImage?: string;
  featured?: boolean;
};

// NOTE: names, prices, sizes, burn times and scent notes below are PLACEHOLDERS written
// from the photos. Replace them with the client's real product details.
/**
 * While true, the site shows free stock photos (from Unsplash) instead of the real
 * product photos, so the design can be judged on its own. Set to false to switch back.
 */
export const USE_SAMPLE_PHOTOS = true;

const catalogue: Product[] = [
  {
    slug: "lotus-bloom",
    name: "Lotus Bloom",
    tagline: "A hand-sculpted lotus in a keepsake box",
    description:
      "A softly sculpted lotus candle, nestled in shredded paper in its own gift box. Beautiful lit, and just as lovely left as décor.",
    price: 18,
    size: "3 in",
    burnTime: "12 hours",
    notes: ["Lotus", "Rose", "Musk"],
    mood: "Serene",
    color: "#c2185b",
    tint: "#f9d9e3",
    image: "/products/lotus-bloom.jpg",
    sampleImage: unsplash("photo-1707839568483-9f1924d5f5de"),
    imagePosition: "50% 85%",
    featured: true,
  },
  {
    slug: "diwali-gift-box",
    name: "Diwali Gift Box",
    tagline: "Flower and diya candles, ready to gift",
    description:
      "A festive hamper of hand-poured flower candles, diyas and tea lights, finished with a greeting card. Made for sharing light with the people you love.",
    price: 42,
    size: "Gift box",
    burnTime: "Assorted",
    notes: ["Marigold", "Sandalwood", "Vanilla"],
    mood: "Festive",
    color: "#e8751a",
    tint: "#fbe5bb",
    image: "/products/diwali-gift-box.jpg",
    sampleImage: unsplash("photo-1707839568443-912e7206c726"),
    imagePosition: "50% 40%",
    featured: true,
  },
  {
    slug: "rose-petal-jar",
    name: "Rose Petal Jar",
    tagline: "Blush-pink layers with real petal inlays",
    description:
      "A glass jar candle poured in soft layers of blush and cream, scattered with rose petal accents.",
    price: 26,
    size: "8 oz",
    burnTime: "40 hours",
    notes: ["Rose", "Peony", "Vanilla"],
    mood: "Romantic",
    color: "#e0679a",
    tint: "#fbe1d6",
    image: "/products/rose-petal-jar.jpg",
    sampleImage: unsplash("photo-1745125996226-879b0cb74e8f"),
    imagePosition: "50% 80%",
    featured: true,
  },
  {
    slug: "ocean-daisy-jar",
    name: "Ocean Daisy Jar",
    tagline: "Sparkling blue wax with a hand-set daisy",
    description:
      "Shimmering ocean-blue layers topped with a sculpted daisy. Bright, breezy and made to catch the light.",
    price: 28,
    size: "8 oz",
    burnTime: "40 hours",
    notes: ["Sea breeze", "Daisy", "White musk"],
    mood: "Fresh",
    color: "#3b8fd1",
    tint: "#d6e8f4",
    image: "/products/ocean-daisy-jar.jpg",
    sampleImage: unsplash("photo-1707839568938-f9b50bb88454"),
    imagePosition: "50% 30%",
  },
];

export const products: Product[] = USE_SAMPLE_PHOTOS
  ? catalogue.map((p) => (p.sampleImage ? { ...p, image: p.sampleImage, imagePosition: undefined } : p))
  : catalogue;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}
