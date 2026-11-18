import { unsplash } from "@/lib/unsplash";

export type Moment = "Snow day" | "Movie night" | "Self-care" | "Gifting";
export const MOMENTS: Moment[] = ["Snow day", "Movie night", "Self-care", "Gifting"];

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
  /** The moments this candle belongs to, for "shop by moment". */
  moments: Moment[];
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
  /** Extra photos shown as a gallery on the product page. */
  gallery?: string[];
  /** Set for products that belong to a seasonal collection page. */
  collection?: "winter";
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
    moments: ["Self-care", "Gifting"],
    color: "#c2185b",
    tint: "#f9d9e3",
    image: "/products/lotus-bloom.jpg",
    sampleImage: unsplash("photo-1674812709782-3e44e27676aa"),
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
    moments: ["Gifting"],
    color: "#e8751a",
    tint: "#fbe5bb",
    image: "/products/diwali-gift-box.jpg",
    sampleImage: unsplash("photo-1603666048331-3ddd6d4fe3fd"),
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
    moments: ["Movie night", "Snow day"],
    color: "#e0679a",
    tint: "#fbe1d6",
    image: "/products/rose-petal-jar.jpg",
    sampleImage: unsplash("photo-1754327018756-7821c7c4c633"),
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
    moments: ["Snow day", "Self-care", "Movie night"],
    color: "#3b8fd1",
    tint: "#d6e8f4",
    image: "/products/ocean-daisy-jar.jpg",
    sampleImage: unsplash("photo-1601405821471-517197a99c5d"),
    imagePosition: "50% 30%",
  },
  {
    slug: "reindeer-candle",
    name: "Reindeer Candle",
    tagline: "A sculpted reindeer with a candy-cane ribbon",
    description: "Hand-poured soy wax reindeer, tied with red-and-white twine. Lovely lit, and just as sweet on a mantel among the pine.",
    price: 16,
    size: "3 in",
    burnTime: "10 hours",
    notes: ["Pine","Cranberry","Vanilla"],
    mood: "Festive",
    moments: ["Gifting","Snow day"],
    color: "#c0392b",
    tint: "#f6dcd5",
    image: "/winter/product-1-1.jpg",
    gallery: ["/winter/product-1-1.jpg","/winter/product-1-2.jpg"],
    collection: "winter",
  },
  {
    slug: "snowy-pine-tree",
    name: "Snowy Pine Tree",
    tagline: "Ribbed wax trees finished with a jingle bell",
    description: "A tiered wax Christmas tree in ivory, sage or red, tied with a candy-stripe bow and a little gold bell.",
    price: 22,
    size: "4 in",
    burnTime: "14 hours",
    notes: ["Fir","Clove","Snow"],
    mood: "Serene",
    moments: ["Gifting","Snow day"],
    color: "#7fae8f",
    tint: "#e4efe6",
    image: "/winter/product-2-1.jpg",
    gallery: ["/winter/product-2-1.jpg","/winter/product-2-2.jpg","/winter/product-2-3.jpg","/winter/product-2-4.jpg"],
    collection: "winter",
  },
  {
    slug: "pinecone-candle",
    name: "Pinecone Candle",
    tagline: "Woodland pinecones in cream and cranberry",
    description: "Pinecone candles poured by hand, in cream and deep cranberry. A cosy centrepiece for slow winter evenings.",
    price: 20,
    size: "3 in",
    burnTime: "12 hours",
    notes: ["Cedar","Cinnamon","Cranberry"],
    mood: "Romantic",
    moments: ["Movie night","Snow day"],
    color: "#8c2f39",
    tint: "#efdad4",
    image: "/winter/product-3-1.jpg",
    gallery: ["/winter/product-3-1.jpg","/winter/product-3-2.jpg"],
    collection: "winter",
  },
  {
    slug: "evergreen-glass-trio",
    name: "Evergreen Glass Trio",
    tagline: "Three little trees glowing in sand wax",
    description: "Tree candles set in clear glass of sand-textured wax. Warm, twinkly and made for fairy-light nights.",
    price: 34,
    size: "Set of 3",
    burnTime: "8 hours each",
    notes: ["Balsam","Cedar","Vanilla"],
    mood: "Festive",
    moments: ["Movie night","Gifting"],
    color: "#4c8c5c",
    tint: "#e0ecd9",
    image: "/winter/product-4-1.jpg",
    gallery: ["/winter/product-4-1.jpg","/winter/product-4-2.jpg"],
    collection: "winter",
  },
  {
    slug: "frosted-fir-jar",
    name: "Frosted Fir Jar",
    tagline: "A snowy tree over icy-blue wax",
    description: "A frosted fir sculpted over pale-blue layered wax in a glass jar, finished with a satin bow.",
    price: 28,
    size: "8 oz",
    burnTime: "40 hours",
    notes: ["Frosted fir","Juniper","White musk"],
    mood: "Fresh",
    moments: ["Snow day","Self-care"],
    color: "#7fb3d9",
    tint: "#dbe9f4",
    image: "/winter/product-5-1.jpg",
    gallery: ["/winter/product-5-1.jpg","/winter/product-5-2.jpg"],
    collection: "winter",
  },
  {
    slug: "winter-jar-set",
    name: "Winter Jar Set",
    tagline: "Holiday, Winter, Ginger + Spice and Pine + Snow",
    description: "Four classic winter scents in clean glass jars. Light one, gift the rest.",
    price: 64,
    size: "Set of 4",
    burnTime: "40 hours each",
    notes: ["Ginger","Spice","Pine","Snow"],
    mood: "Festive",
    moments: ["Gifting","Self-care"],
    color: "#d9a566",
    tint: "#f6e8d2",
    image: "/winter/product-6-1.jpg",
    gallery: ["/winter/product-6-1.jpg","/winter/product-6-2.jpg"],
    collection: "winter",
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

/** Winter Collection: cover photos, the candles, and the gift boxes (local files in /public/winter). */
export const winterCovers = [1, 2, 3, 4].map((n) => `/winter/cover-${n}.jpg`);
export const winterGiftBoxes = [1, 2, 3, 4, 5, 6].map((n) => ({
  image: `/winter/gift-${n}.jpg`,
  alt: `Winter candle gift box ${n}`,
}));
export const winterProducts = products.filter((p) => p.collection === "winter");
