/**
 * PRODUCT INVENTORY — PLACEHOLDER DATA.
 *
 * Names, prices, sizes and copy are realistic placeholders until the real
 * inventory is supplied. Images point at generated temporary artwork in
 * /public/media/products — replace with real photography using the same
 * paths (or update the paths here).
 */

export type Gender = "men" | "women" | "unisex";
export type Category = "hoodies" | "tees" | "pants" | "outerwear" | "shorts" | "accessories";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  gender: Gender;
  category: Category;
  collection: string;
  price: number;
  compareAtPrice?: number;
  badge?: "New" | "Limited" | "Restock" | "Last pieces";
  colors: { name: string; hex: string }[];
  sizes: string[];
  fit: string;
  description: string;
  details: string[];
  images: string[];
  featured?: boolean;
  soldOut?: boolean;
};

export const categories: { id: Category; label: string }[] = [
  { id: "hoodies", label: "Hoodies" },
  { id: "tees", label: "Tees" },
  { id: "pants", label: "Pants" },
  { id: "outerwear", label: "Outerwear" },
  { id: "shorts", label: "Shorts" },
  { id: "accessories", label: "Accessories" },
];

const img = (slug: string) => ["a", "b", "c"].map((v) => `/media/products/${slug}-${v}.svg`);

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const ONE = ["One size"];

export const collections = {
  guy: "Drop 01 — Bloock That Guyyy",
  pitch: "Drop 01 — Bloock That Pitch",
  blocked: "Blocked — Icon Line",
} as const;

const W_APPAREL = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    slug: "bloock-that-guyyy-heavy-hoodie",
    sku: "AFB-D01-HD01",
    name: "Bloock That Guyyy Heavy Hoodie",
    gender: "unisex",
    category: "hoodies",
    collection: collections.guy,
    price: 590,
    badge: "New",
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: APPAREL,
    fit: "Oversized, dropped shoulder. Size down for a regular fit.",
    description:
      "The flagship of Drop 01. A heavyweight brushed-back fleece hoodie with BLOOCK THAT GUYYY stacked across the chest in blaze orange. Say less — the hoodie says it for you.",
    details: ["450 GSM brushed cotton fleece", "Puff-print stacked slogan", "Double-layer hood, flat orange drawcords", "Ribbed cuffs and hem", "Garment-dyed for minimal shrinkage"],
    images: img("bloock-that-guyyy-heavy-hoodie"),
    featured: true,
  },
  {
    slug: "bloock-that-pitch-heavy-hoodie",
    sku: "AFB-D01-HD02",
    name: "Bloock That Pitch Heavy Hoodie",
    gender: "unisex",
    category: "hoodies",
    collection: collections.pitch,
    price: 590,
    badge: "New",
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: APPAREL,
    fit: "Oversized, dropped shoulder. Size down for a regular fit.",
    description: "The other half of the drop. Bone heavyweight fleece with BLOOCK THAT PITCH in ink — for when the energy around you isn't it.",
    details: ["450 GSM brushed cotton fleece", "Puff-print stacked slogan", "Kangaroo pocket", "Ribbed cuffs and hem"],
    images: img("bloock-that-pitch-heavy-hoodie"),
    featured: true,
  },
  {
    slug: "bloock-that-guyyy-tee",
    sku: "AFB-D01-TS01",
    name: "Bloock That Guyyy Tee",
    gender: "unisex",
    category: "tees",
    collection: collections.guy,
    price: 290,
    badge: "New",
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: APPAREL,
    fit: "Boxy, slightly cropped body.",
    description: "Heavy jersey tee with the slogan stacked big on the chest. The one everyone's going to ask about.",
    details: ["240 GSM combed cotton", "Screen-printed stacked slogan", "Thick 3 cm ribbed collar", "Pre-shrunk"],
    images: img("bloock-that-guyyy-tee"),
    featured: true,
  },
  {
    slug: "bloock-that-pitch-tee",
    sku: "AFB-D01-TS02",
    name: "Bloock That Pitch Tee",
    gender: "men",
    category: "tees",
    collection: collections.pitch,
    price: 290,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: APPAREL,
    fit: "Boxy, wide sleeve.",
    description: "Black heavyweight tee, BLOOCK THAT PITCH in blaze orange. Loud on purpose.",
    details: ["240 GSM combed cotton", "Screen-printed stacked slogan", "Wide short sleeve"],
    images: img("bloock-that-pitch-tee"),
  },
  {
    slug: "blocked-icon-tee",
    sku: "AFB-BLK-TS03",
    name: "Blocked Icon Tee",
    gender: "unisex",
    category: "tees",
    collection: collections.blocked,
    price: 260,
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: APPAREL,
    fit: "Boxy.",
    description: "The block button, worn. Orange tee with the circle-slash icon and BLOOCK THAT GUYYY underneath.",
    details: ["220 GSM cotton", "Block icon print", "Wide short sleeve"],
    images: img("blocked-icon-tee"),
  },
  {
    slug: "bloock-that-pitch-track-jacket",
    sku: "AFB-D01-OW01",
    name: "Bloock That Pitch Track Jacket",
    gender: "men",
    category: "outerwear",
    collection: collections.pitch,
    price: 640,
    badge: "Limited",
    colors: [{ name: "Charcoal / Blaze", hex: "#292929" }],
    sizes: APPAREL,
    fit: "Regular fit, slightly boxy.",
    description: "Tricot track jacket with blaze-orange sleeve panels and the slogan stacked small on the chest. Throwback cut, heavier hand-feel.",
    details: ["Recycled poly tricot", "Contrast sleeve panels", "Two-way metal zip", "Embroidered chest slogan", "Limited run"],
    images: img("bloock-that-pitch-track-jacket"),
    featured: true,
  },
  {
    slug: "blocked-puffer-vest",
    sku: "AFB-BLK-OW02",
    name: "Blocked Puffer Vest",
    gender: "unisex",
    category: "outerwear",
    collection: collections.blocked,
    price: 690,
    badge: "Limited",
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: ["S", "M", "L", "XL"],
    fit: "Boxy, layers over hoodies.",
    description: "A loud quilted vest with the block icon on the chest. Throw it over the hoodie and you're done.",
    details: ["Water-repellent shell", "Recycled poly fill", "Stand collar", "Embroidered block icon"],
    images: img("blocked-puffer-vest"),
    featured: true,
  },
  {
    slug: "bloock-cargo-pant",
    sku: "AFB-D01-PT01",
    name: "Bloock Cargo Pant",
    gender: "men",
    category: "pants",
    collection: collections.guy,
    price: 520,
    colors: [{ name: "Olive Drab", hex: "#4B5137" }],
    sizes: ["28", "30", "32", "34", "36"],
    fit: "Relaxed straight leg, adjustable hem toggles.",
    description: "Ripstop cargo with oversized pockets and BLOOCK THAT GUYYY printed down the leg in orange.",
    details: ["Cotton-nylon ripstop", "Six-pocket construction", "Vertical leg print", "Orange woven hem tape"],
    images: img("bloock-cargo-pant"),
    featured: true,
  },
  {
    slug: "bloock-that-guyyy-cropped-hoodie",
    sku: "AFB-D01-HD03",
    name: "Bloock That Guyyy Cropped Hoodie",
    gender: "women",
    category: "hoodies",
    collection: collections.guy,
    price: 520,
    badge: "New",
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: W_APPAREL,
    fit: "Cropped, boxy. Sits at the natural waist.",
    description: "Cropped, boxy hoodie in signature blaze orange with the slogan stacked in ink. Pair it with the wide-leg cargo.",
    details: ["380 GSM cotton fleece", "Raw-cut cropped hem", "Stacked slogan print", "Black drawcords"],
    images: img("bloock-that-guyyy-cropped-hoodie"),
    featured: true,
  },
  {
    slug: "bloock-that-pitch-cropped-hoodie",
    sku: "AFB-D01-HD04",
    name: "Bloock That Pitch Cropped Hoodie",
    gender: "women",
    category: "hoodies",
    collection: collections.pitch,
    price: 520,
    badge: "Last pieces",
    colors: [{ name: "Clay", hex: "#9C4A2A" }],
    sizes: ["XS", "S", "M", "L"],
    fit: "Cropped, boxy.",
    description: "Clay-dyed cropped hoodie with BLOOCK THAT PITCH in bone.",
    details: ["380 GSM cotton fleece", "Garment-dyed clay", "Stacked slogan print"],
    images: img("bloock-that-pitch-cropped-hoodie"),
  },
  {
    slug: "bloock-wide-leg-cargo",
    sku: "AFB-D01-PT02",
    name: "Bloock Wide-Leg Cargo",
    gender: "women",
    category: "pants",
    collection: collections.pitch,
    price: 540,
    colors: [{ name: "Sand", hex: "#C9B79C" }],
    sizes: W_APPAREL,
    fit: "High rise, wide leg, floor-skimming.",
    description: "High-rise wide-leg cargo in sand twill with BLOOCK THAT PITCH running down the leg.",
    details: ["Cotton twill", "High rise with adjustable waist tabs", "Oversized side pockets", "Vertical leg print"],
    images: img("bloock-wide-leg-cargo"),
    featured: true,
  },
  {
    slug: "bloock-that-pitch-baby-tee",
    sku: "AFB-D01-TS04",
    name: "Bloock That Pitch Baby Tee",
    gender: "women",
    category: "tees",
    collection: collections.pitch,
    price: 240,
    badge: "New",
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: ["XS", "S", "M", "L"],
    fit: "Fitted, slightly cropped.",
    description: "Fitted baby tee with the slogan stacked in orange. Small tee, big statement.",
    details: ["Cotton-elastane rib", "Stacked slogan print", "Cropped length"],
    images: img("bloock-that-pitch-baby-tee"),
  },
  {
    slug: "blocked-baby-tee",
    sku: "AFB-BLK-TS05",
    name: "Blocked Baby Tee",
    gender: "women",
    category: "tees",
    collection: collections.blocked,
    price: 230,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: ["XS", "S", "M", "L"],
    fit: "Fitted.",
    description: "Fitted black baby tee with the block icon and BLOOCK THAT PITCH in orange.",
    details: ["Cotton-elastane rib", "Block icon print"],
    images: img("blocked-baby-tee"),
  },
  {
    slug: "bloock-that-guyyy-cap",
    sku: "AFB-D01-AC01",
    name: "Bloock That Guyyy Cap",
    gender: "unisex",
    category: "accessories",
    collection: collections.guy,
    price: 220,
    badge: "New",
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: ONE,
    fit: "Adjustable strap back.",
    description: "Six-panel cap with the slogan stacked in blaze orange across the front. Unstructured crown, curved brim.",
    details: ["Washed cotton twill", "Embroidered stacked slogan", "Metal buckle strap"],
    images: img("bloock-that-guyyy-cap"),
  },
  {
    slug: "bloock-that-pitch-cap",
    sku: "AFB-D01-AC02",
    name: "Bloock That Pitch Cap",
    gender: "unisex",
    category: "accessories",
    collection: collections.pitch,
    price: 220,
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: ONE,
    fit: "Adjustable strap back.",
    description: "Bone six-panel cap with BLOOCK THAT PITCH embroidered in ink.",
    details: ["Washed cotton twill", "Embroidered stacked slogan", "Metal buckle strap"],
    images: img("bloock-that-pitch-cap"),
  },
  {
    slug: "blocked-beanie",
    sku: "AFB-BLK-AC03",
    name: "Blocked Beanie",
    gender: "unisex",
    category: "accessories",
    collection: collections.blocked,
    price: 180,
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: ONE,
    fit: "Cuffed, stretch rib.",
    description: "Chunky rib beanie with a woven block-icon patch. One size, all heads.",
    details: ["Acrylic-wool blend", "Double-layer cuff", "Woven block-icon patch"],
    images: img("blocked-beanie"),
  },
  {
    slug: "bloock-that-pitch-tote",
    sku: "AFB-D01-AC04",
    name: "Bloock That Pitch Tote",
    gender: "unisex",
    category: "accessories",
    collection: collections.pitch,
    price: 160,
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: ONE,
    fit: "40 × 45 cm.",
    description: "Heavy canvas tote with the slogan stacked big. Carry the message.",
    details: ["12 oz cotton canvas", "Internal pocket", "Long handles"],
    images: img("bloock-that-pitch-tote"),
  },
  {
    slug: "bloock-coach-jacket",
    sku: "AFB-D01-OW03",
    name: "Bloock Coach Jacket",
    gender: "women",
    category: "outerwear",
    collection: collections.guy,
    price: 620,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: W_APPAREL,
    fit: "Oversized, hip length.",
    description: "Oversized coach jacket with bone sleeve stripes and the slogan on the chest.",
    details: ["Water-repellent nylon", "Snap front", "Bone sleeve stripes", "Mesh lining"],
    images: img("bloock-coach-jacket"),
    soldOut: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Unisex pieces appear in both men's and women's edits. */
export const productsFor = (gender: "men" | "women") =>
  products.filter((p) => p.gender === gender || p.gender === "unisex");

export const featuredProducts = () => products.filter((p) => p.featured);

export function relatedProducts(product: Product, limit = 4) {
  const pool = products.filter((p) => p.slug !== product.slug && !p.soldOut);
  const score = (p: Product) =>
    (p.collection === product.collection ? 2 : 0) +
    (p.category === product.category ? 1 : 0) +
    (p.gender === product.gender || p.gender === "unisex" ? 1 : 0);
  return pool.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export const genderLabel: Record<Gender, string> = { men: "Men", women: "Women", unisex: "Unisex" };
