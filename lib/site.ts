/**
 * Global brand + contact configuration.
 *
 * ⚠️ PLACEHOLDERS — replace before launch. Every contact value can also be set
 * through environment variables (see .env.example) so nothing is hard-coded.
 */

export const site = {
  name: "AFROBIAN HUB",
  shortName: "AFROBIAN",
  tagline: "Protect your peace — out loud. Morocco to the world.",
  description:
    "AFROBIAN HUB is an independent streetwear and creator culture platform from Morocco. Shop men's and women's drops, meet the creators, read the culture — order directly on WhatsApp or Instagram.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://afrobian-hub.vercel.app",
  locale: "en",
  currency: "MAD",

  /** International format, digits only, no "+". */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212634311130",
  /** Brand Instagram handle without "@". */
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? "afrobian.hub",
  /** Brand TikTok handle without "@". */
  tiktokHandle: process.env.NEXT_PUBLIC_TIKTOK_HANDLE ?? "blessed.afrobian",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "afrobian.travel@gmail.com",

  baseLocation: "Morocco",
  shipping: "Shipping across Morocco · Worldwide on request",
} as const;

export const socials = {
  instagram: `https://www.instagram.com/${site.instagramHandle}`,
  instagramDm: `https://ig.me/m/${site.instagramHandle}`,
  tiktok: `https://www.tiktok.com/@${site.tiktokHandle}`,
};

export type NavItem = { label: string; href: string; note?: string };

export const mainNav: NavItem[] = [
  { label: "Shop", href: "/shop", note: "All drops" },
  { label: "Men", href: "/men", note: "His rotation" },
  { label: "Women", href: "/women", note: "Her rotation" },
  { label: "Creators", href: "/creators", note: "The crew" },
  { label: "Culture", href: "/culture", note: "Stories" },
  { label: "Community", href: "/#community", note: "The 530K" },
  { label: "About", href: "/about", note: "Who we are" },
  { label: "Contact", href: "/contact", note: "Talk to us" },
];
