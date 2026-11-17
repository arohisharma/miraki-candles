import { unsplash } from "./unsplash";

/**
 * The site's seasonal theme. Switch to "default" after the holidays to return to the
 * everyday look. Everything seasonal (palette, snow, banner, copy, photos) follows this.
 */
export type Season = "default" | "winter";
export const SEASON: Season = "winter";

export type Ritual = {
  /** One big word, shown huge over the photo. */
  word: string;
  line: string;
  pair: string;
  image: string;
  alt: string;
};

export type Photo = { image: string; alt: string; caption?: string };

/** A dot on a photo, positioned in % from the top-left. A product spot opens a buy card. */
export type Spot = { x: number; y: number } & ({ product: string } | { label: string });

type SeasonContent = {
  hero: {
    label: string;
    line1: string;
    accentWord: string;
    copy: string;
    /** Still used for link previews. */
    image: string;
    alt: string;
    /** Background film. Stock footage from Pexels, standing in for Miraki's own. */
    video: { desktop: string; mobile: string; poster: string };
  };
  statement: { before: string; accent: string };
  /** Three small photos floating around the statement. */
  collage: Photo[];
  /** An annotated lifestyle photo: tap the dots to shop or read the story. */
  look: {
    title: string;
    accent: string;
    line: string;
    image: string;
    alt: string;
    spots: Spot[];
  };
  gifts: { title: string; accent: string; items: { title: string; pair: string; image: string; alt: string }[] };
  rituals: Ritual[];
  values: string[];
  band: { before: string; accent: string; cta: string };
  footer: { before: string; accent: string };
  banner?: { text: string; short: string; cta: string; href: string };
  teaser?: { label: string; title: string; accent: string; notes: string[]; image: string; alt: string };
};

// All photos are Unsplash stock, standing in until Miraki has its own.
const CONTENT: Record<Season, SeasonContent> = {
  default: {
    hero: {
      label: "Handmade candles",
      line1: "Light a little",
      accentWord: "calm",
      copy: "Hand-poured candles for the quiet moments.",
      image: unsplash("photo-1669334388727-9a3437e12fa2", 2000),
      alt: "A lit candle glowing in a ribbed glass",
      video: {
        desktop: "https://videos.pexels.com/video-files/5092038/5092038-hd_1920_1080_24fps.mp4",
        mobile: "https://videos.pexels.com/video-files/40429172/17275379_720_1280_60fps.mp4",
        poster: "https://images.pexels.com/videos/5092038/noche-velas-velas-encendidas-5092038.jpeg?auto=compress&w=1920",
      },
    },
    statement: { before: "Small flames,", accent: "slow evenings." },
    collage: [
      { image: unsplash("photo-1611485951311-c382a4c27047", 700), alt: "A candle on a blanket beside an open book", caption: "Read" },
      { image: unsplash("photo-1648199905043-e913568802c9", 700), alt: "A candle on a bath tray", caption: "Soak" },
      { image: unsplash("photo-1603897076223-17f346f02a03", 700), alt: "A candle wrapped as a gift", caption: "Give" },
    ],
    look: {
      title: "Movie night,",
      accent: "sorted.",
      line: "Tap around the room.",
      image: unsplash("photo-1776175224702-277255753cc8", 1400),
      alt: "A candle glowing beside a drink in a room lit by a film",
      spots: [
        { x: 45, y: 27, label: "Your favourite show" },
        { x: 57, y: 66, label: "Something to sip" },
        { x: 80, y: 62, product: "rose-petal-jar" },
      ],
    },
    gifts: {
      title: "Gifts that feel like a",
      accent: "hug",
      items: [
        { title: "For the one who has everything", pair: "rose-petal-jar", image: unsplash("photo-1603897076223-17f346f02a03", 900), alt: "A candle wrapped with twine" },
        { title: "For the bookworm", pair: "ocean-daisy-jar", image: unsplash("photo-1695755117860-da93d1aaf96b", 900), alt: "A candle on a blanket with a book" },
        { title: "Little luxuries", pair: "lotus-bloom", image: unsplash("photo-1648199905043-e913568802c9", 900), alt: "A candle on a bath tray" },
      ],
    },
    rituals: [
      {
        word: "Gift.",
        line: "Easier to give than to say.",
        pair: "diwali-gift-box",
        image: unsplash("photo-1603897076223-17f346f02a03", 2000),
        alt: "A candle being wrapped with twine as a gift",
      },
      {
        word: "Read.",
        line: "One chapter becomes four.",
        pair: "rose-petal-jar",
        image: unsplash("photo-1695755117860-da93d1aaf96b", 2000),
        alt: "An open book and a lit candle on a blanket",
      },
      {
        word: "Soak.",
        line: "Door closed. Phone elsewhere.",
        pair: "ocean-daisy-jar",
        image: unsplash("photo-1615224572974-ed13e9ab0312", 2000),
        alt: "A bathtub surrounded by lit candles",
      },
    ],
    values: ["Soy wax", "Hand-poured", "Small batches", "Made to gift"],
    band: { before: "Find the one that feels like", accent: "home", cta: "Shop candles" },
    footer: { before: "Poured by hand,", accent: "moments" },
  },

  winter: {
    hero: {
      label: "The Winter Edit",
      line1: "Light a little",
      accentWord: "warmth",
      copy: "Snow outside. A warm glow within. Candles poured for dreamy winter nights.",
      image: "https://images.pexels.com/videos/30125806/author-book-lovers-candle-arrangement-comfortable-30125806.jpeg?auto=compress&w=2000",
      alt: "Real candles burning by a window beside an open book and a cup of tea",
      // Real flames only: never show battery or LED candles.
      video: {
        desktop: "https://videos.pexels.com/video-files/30125806/12920148_1920_1080_24fps.mp4",
        mobile: "https://videos.pexels.com/video-files/14854887/14854887-hd_720_1280_30fps.mp4",
        poster: "https://images.pexels.com/videos/30125806/author-book-lovers-candle-arrangement-comfortable-30125806.jpeg?auto=compress&w=1920",
      },
    },
    statement: { before: "Snow outside.", accent: "Warmth within." },
    collage: [
      { image: unsplash("photo-1612478700324-a39e1f1c4952", 700), alt: "A smiling snowman in a snowy garden", caption: "Build a snowman" },
      { image: unsplash("photo-1704799897069-5c8ac0c31c1b", 700), alt: "Someone in a red coat and hat among snowy trees", caption: "Wrap up warm" },
      { image: unsplash("photo-1608735484399-b7ec8f9945c1", 700), alt: "Two mugs of hot chocolate with cinnamon", caption: "Come in for cocoa" },
    ],
    rituals: [
      {
        word: "Snow day.",
        line: "Stay in. Light up.",
        pair: "rose-petal-jar",
        image: "https://images.pexels.com/videos/14886038/a-stay-home-aesthetic-book-reading-candle-14886038.jpeg?auto=compress&w=2000",
        alt: "Candles on a windowsill beside a cosy throw, with snow outside",
      },
      {
        word: "Self-care.",
        line: "A bath, a book, a slow Sunday.",
        pair: "ocean-daisy-jar",
        image: unsplash("photo-1648199905043-e913568802c9", 2000),
        alt: "A candle on a wooden bath tray",
      },
      {
        word: "Gift.",
        line: "The one they open first.",
        pair: "diwali-gift-box",
        image: unsplash("photo-1766240124701-a72ca2f39754", 2000),
        alt: "A pink and red Christmas flat-lay with wrapped gifts",
      },
    ],
    look: {
      title: "Movie night,",
      accent: "sorted.",
      line: "Tap around the room.",
      image: unsplash("photo-1776175224702-277255753cc8", 1400),
      alt: "A candle glowing beside a drink in a room lit by a film",
      spots: [
        { x: 45, y: 27, label: "Your favourite show" },
        { x: 57, y: 66, label: "Something warm to sip" },
        { x: 80, y: 62, product: "rose-petal-jar" },
      ],
    },
    gifts: {
      title: "Gifts that feel like a",
      accent: "hug",
      items: [
        { title: "For the one who has everything", pair: "rose-petal-jar", image: unsplash("photo-1735720520964-6f0718bcef81", 900), alt: "A pink Christmas tree glowing with lights" },
        { title: "Secret Santa", pair: "diwali-gift-box", image: unsplash("photo-1671150590142-d2637ab7c670", 900), alt: "Gifts wrapped in red with ribbon" },
        { title: "Little luxuries", pair: "lotus-bloom", image: unsplash("photo-1766183683880-74d8578e52bc", 900), alt: "A cosy pink Christmas scene with ornaments" },
      ],
    },
    values: ["Soy wax", "Hand-poured", "Small batches", "Made to gift"],
    band: { before: "Give the gift of a slow", accent: "winter", cta: "Shop gifts" },
    footer: { before: "Poured by hand,", accent: "winter nights" },
    banner: {
      text: "The Miraki Winter Collection is dropping soon",
      short: "Winter Collection — dropping soon",
      cta: "Be the first to know",
      href: "/contact",
    },
    teaser: {
      label: "Dropping soon",
      title: "The Winter",
      accent: "Collection",
      notes: ["Pine", "Clove", "Cinnamon", "Snow"],
      image: unsplash("photo-1733127040689-0e8a2823e391", 2400),
      alt: "A green candle beside pine branches",
    },
  },
};

export const season = CONTENT[SEASON];
