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
  concreteSun: "Drop 01 — Concrete Sun",
  nightMarket: "Capsule — Night Market",
  essentials: "Hub Essentials",
} as const;

export const products: Product[] = [
  {
    slug: "concrete-sun-heavy-hoodie",
    sku: "AFB-D01-HD01",
    name: "Concrete Sun Heavy Hoodie",
    gender: "unisex",
    category: "hoodies",
    collection: collections.concreteSun,
    price: 590,
    badge: "New",
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: APPAREL,
    fit: "Oversized, dropped shoulder. Size down for a regular fit.",
    description:
      "The flagship piece of Drop 01. A heavyweight brushed-back fleece hoodie with a puff-printed sun on the chest and orange drawcords — built for cold rooftops and late walks home.",
    details: ["450 GSM brushed cotton fleece", "Puff-print chest graphic", "Double-layer hood, flat orange drawcords", "Ribbed cuffs and hem", "Garment-dyed for minimal shrinkage"],
    images: img("concrete-sun-heavy-hoodie"),
    featured: true,
  },
  {
    slug: "sahara-static-tee",
    sku: "AFB-D01-TS01",
    name: "Sahara Static Tee",
    gender: "unisex",
    category: "tees",
    collection: collections.concreteSun,
    price: 290,
    badge: "New",
    colors: [
      { name: "Bone", hex: "#F2EEE7" },
      { name: "Ink Black", hex: "#080808" },
    ],
    sizes: APPAREL,
    fit: "Boxy, slightly cropped body.",
    description: "Heavy jersey tee with the AFROBIAN wordmark across the chest. Thick collar, boxy body, built to keep its shape through summer.",
    details: ["240 GSM combed cotton", "Screen-printed wordmark", "Thick 3 cm ribbed collar", "Pre-shrunk"],
    images: img("sahara-static-tee"),
    featured: true,
  },
  {
    slug: "atlas-cargo-pant",
    sku: "AFB-D01-PT01",
    name: "Atlas Cargo Pant",
    gender: "men",
    category: "pants",
    collection: collections.concreteSun,
    price: 520,
    colors: [
      { name: "Olive Drab", hex: "#4B5137" },
      { name: "Ink Black", hex: "#080808" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    fit: "Relaxed straight leg, adjustable hem toggles.",
    description: "Ripstop cargo with oversized bellow pockets and an orange hem tape. Cut straight and relaxed so it stacks clean over any sneaker.",
    details: ["Cotton-nylon ripstop", "Six-pocket construction", "Hem toggles for tapered or straight wear", "Orange woven hem tape"],
    images: img("atlas-cargo-pant"),
    featured: true,
  },
  {
    slug: "medina-track-jacket",
    sku: "AFB-D01-OW01",
    name: "Medina Track Jacket",
    gender: "men",
    category: "outerwear",
    collection: collections.concreteSun,
    price: 640,
    badge: "Limited",
    colors: [{ name: "Charcoal / Blaze", hex: "#292929" }],
    sizes: APPAREL,
    fit: "Regular fit, slightly boxy.",
    description: "A tricot track jacket with blaze-orange sleeve panels and a two-way zip. Throwback silhouette, rebuilt with a heavier hand-feel.",
    details: ["Recycled poly tricot", "Contrast sleeve panels", "Two-way metal zip", "Woven AFB tab on chest", "Limited run"],
    images: img("medina-track-jacket"),
    featured: true,
  },
  {
    slug: "asphalt-boxy-tee",
    sku: "AFB-ESS-TS02",
    name: "Asphalt Boxy Tee",
    gender: "men",
    category: "tees",
    collection: collections.essentials,
    price: 260,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: APPAREL,
    fit: "Boxy, wide sleeve.",
    description: "The everyday black tee with the A/H block print. The base layer of every rotation.",
    details: ["220 GSM cotton", "A/H block print", "Wide short sleeve"],
    images: img("asphalt-boxy-tee"),
  },
  {
    slug: "orbit-puffer-vest",
    sku: "AFB-NM-OW02",
    name: "Orbit Puffer Vest",
    gender: "unisex",
    category: "outerwear",
    collection: collections.nightMarket,
    price: 690,
    badge: "Limited",
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: ["S", "M", "L", "XL"],
    fit: "Boxy, layers over hoodies.",
    description: "A loud quilted vest designed to be layered over a hoodie on cold nights. Hard to miss, easy to wear.",
    details: ["Water-repellent shell", "Recycled poly fill", "Stand collar", "Hidden zip pocket"],
    images: img("orbit-puffer-vest"),
    featured: true,
  },
  {
    slug: "rooftop-nylon-short",
    sku: "AFB-ESS-SH01",
    name: "Rooftop Nylon Short",
    gender: "men",
    category: "shorts",
    collection: collections.essentials,
    price: 320,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: APPAREL,
    fit: "Relaxed, above-the-knee.",
    description: "Lightweight crinkle-nylon shorts with orange piping. Summer in the city, sorted.",
    details: ["Crinkle nylon", "Mesh lining", "Elastic waist with white drawcord", "Orange piping"],
    images: img("rooftop-nylon-short"),
  },
  {
    slug: "signal-cropped-hoodie",
    sku: "AFB-D01-HD02",
    name: "Signal Cropped Hoodie",
    gender: "women",
    category: "hoodies",
    collection: collections.concreteSun,
    price: 520,
    badge: "New",
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Cropped, boxy. Sits at the natural waist.",
    description: "A cropped, boxy hoodie in signature blaze orange with the wordmark printed in ink. Pair it with wide-leg cargos for the full look.",
    details: ["380 GSM cotton fleece", "Raw-cut cropped hem", "Screen-printed wordmark", "Black drawcords"],
    images: img("signal-cropped-hoodie"),
    featured: true,
  },
  {
    slug: "dune-wide-leg-cargo",
    sku: "AFB-D01-PT02",
    name: "Dune Wide-Leg Cargo",
    gender: "women",
    category: "pants",
    collection: collections.concreteSun,
    price: 540,
    colors: [{ name: "Sand", hex: "#C9B79C" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "High rise, wide leg, floor-skimming.",
    description: "A high-rise, wide-leg cargo in soft sand twill. Big pockets, long line, zero effort.",
    details: ["Cotton twill", "High rise with adjustable waist tabs", "Oversized side pockets", "Ink hem tape"],
    images: img("dune-wide-leg-cargo"),
    featured: true,
  },
  {
    slug: "night-market-baby-tee",
    sku: "AFB-NM-TS03",
    name: "Night Market Baby Tee",
    gender: "women",
    category: "tees",
    collection: collections.nightMarket,
    price: 240,
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: ["XS", "S", "M", "L"],
    fit: "Fitted, slightly cropped.",
    description: "A fitted baby tee with the orange four-point star. Made for layering under jackets or wearing loud on its own.",
    details: ["Cotton-elastane rib", "Star print", "Cropped length"],
    images: img("night-market-baby-tee"),
  },
  {
    slug: "heatwave-cropped-hoodie",
    sku: "AFB-D01-HD03",
    name: "Heatwave Cropped Hoodie",
    gender: "women",
    category: "hoodies",
    collection: collections.concreteSun,
    price: 520,
    badge: "Last pieces",
    colors: [{ name: "Clay", hex: "#9C4A2A" }],
    sizes: ["XS", "S", "M", "L"],
    fit: "Cropped, boxy.",
    description: "The clay-dyed sister of the Signal hoodie, with the Concrete Sun graphic in bone.",
    details: ["380 GSM cotton fleece", "Garment-dyed clay", "Puff-print sun graphic"],
    images: img("heatwave-cropped-hoodie"),
  },
  {
    slug: "riad-baby-tee",
    sku: "AFB-ESS-TS04",
    name: "Riad Baby Tee",
    gender: "women",
    category: "tees",
    collection: collections.essentials,
    price: 230,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: ["XS", "S", "M", "L"],
    fit: "Fitted.",
    description: "A fitted black baby tee with the orange wordmark. The essential.",
    details: ["Cotton-elastane rib", "Wordmark print"],
    images: img("riad-baby-tee"),
  },
  {
    slug: "hub-logo-cap",
    sku: "AFB-ESS-AC01",
    name: "Hub Logo Cap",
    gender: "unisex",
    category: "accessories",
    collection: collections.essentials,
    price: 220,
    badge: "Restock",
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: ONE,
    fit: "Adjustable strap back.",
    description: "Six-panel cap with the A/H patch in blaze orange. Unstructured crown, curved brim.",
    details: ["Washed cotton twill", "Woven A/H patch", "Metal buckle strap"],
    images: img("hub-logo-cap"),
  },
  {
    slug: "zellige-rib-beanie",
    sku: "AFB-NM-AC02",
    name: "Zellige Rib Beanie",
    gender: "unisex",
    category: "accessories",
    collection: collections.nightMarket,
    price: 180,
    colors: [{ name: "Blaze Orange", hex: "#FF7900" }],
    sizes: ONE,
    fit: "Cuffed, stretch rib.",
    description: "Chunky rib beanie with a woven AFB tab. One size, all heads.",
    details: ["Acrylic-wool blend", "Double-layer cuff", "Woven tab"],
    images: img("zellige-rib-beanie"),
  },
  {
    slug: "courier-tote",
    sku: "AFB-ESS-AC03",
    name: "Courier Tote",
    gender: "unisex",
    category: "accessories",
    collection: collections.essentials,
    price: 160,
    colors: [{ name: "Bone", hex: "#F2EEE7" }],
    sizes: ONE,
    fit: "40 × 45 cm.",
    description: "Heavy canvas tote printed with the stacked AFRO/BIAN logo. Carry the culture.",
    details: ["12 oz cotton canvas", "Internal pocket", "Long handles"],
    images: img("courier-tote"),
  },
  {
    slug: "northbound-coach-jacket",
    sku: "AFB-NM-OW03",
    name: "Northbound Coach Jacket",
    gender: "women",
    category: "outerwear",
    collection: collections.nightMarket,
    price: 620,
    colors: [{ name: "Ink Black", hex: "#080808" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    fit: "Oversized, hip length.",
    description: "An oversized coach jacket with bone sleeve stripes. Throw it over anything.",
    details: ["Water-repellent nylon", "Snap front", "Bone sleeve stripes", "Mesh lining"],
    images: img("northbound-coach-jacket"),
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
