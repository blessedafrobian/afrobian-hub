/**
 * CREATOR ROSTER — PLACEHOLDER PROFILES.
 *
 * These are NOT real people or accounts. Each entry is a slot describing the
 * kind of creator AFROBIAN HUB will feature. Social URLs are intentionally
 * `null` until real, consenting creators are onboarded — the UI shows a
 * "link pending" state for null links. Replace `name`, `handle`, `bio`,
 * `portrait` and `socials` with the real details.
 */

export type SocialPlatform = "instagram" | "tiktok" | "youtube";

export type Creator = {
  slug: string;
  /** Display name. Placeholder codename until a real creator is signed. */
  name: string;
  /** Slot label shown alongside the name, e.g. "Creator 01". */
  slot: string;
  discipline: string;
  city: string;
  tagline: string;
  bio: string[];
  portrait: string;
  accent: string;
  tags: string[];
  socials: { platform: SocialPlatform; handle: string | null; url: string | null }[];
  /** Product slugs this creator styles in their profile. */
  picks: string[];
  stats: { label: string; value: string }[];
  isPlaceholder: true;
};

const pending = (platforms: SocialPlatform[]) => platforms.map((platform) => ({ platform, handle: null, url: null }));

export const creators: Creator[] = [
  {
    slug: "the-mover",
    name: "The Mover",
    slot: "Creator 01",
    discipline: "Dance & choreography",
    city: "Casablanca",
    tagline: "Every street corner is a stage.",
    bio: [
      "A dancer-choreographer slot for someone who turns pavement into performance — short-form routines, crew battles and freestyle sessions shot on the street.",
      "On AFROBIAN HUB, this profile will host their latest videos, the fits they move in, and links to follow them directly.",
    ],
    portrait: "/media/creators/creator-01.svg",
    accent: "#FF7900",
    tags: ["Dance", "Afro-house", "Freestyle"],
    socials: pending(["instagram", "tiktok"]),
    picks: ["bloock-that-guyyy-heavy-hoodie", "bloock-cargo-pant", "bloock-that-guyyy-cap"],
    stats: [
      { label: "Discipline", value: "Dance" },
      { label: "Format", value: "Short-form video" },
      { label: "Base", value: "Casablanca" },
    ],
    isPlaceholder: true,
  },
  {
    slug: "the-stylist",
    name: "The Stylist",
    slot: "Creator 02",
    discipline: "Styling & fashion",
    city: "Rabat",
    tagline: "Three pieces, ten looks.",
    bio: [
      "A styling slot for a creator who breaks down how to wear streetwear — layering, proportions and colour — in quick, punchy fit videos.",
      "Their profile will feature styling guides, fit checks and the AFROBIAN pieces they rework.",
    ],
    portrait: "/media/creators/creator-02.svg",
    accent: "#F2EEE7",
    tags: ["Styling", "Fit checks", "Thrift x new"],
    socials: pending(["instagram", "tiktok"]),
    picks: ["bloock-that-guyyy-cropped-hoodie", "bloock-wide-leg-cargo", "bloock-that-pitch-baby-tee"],
    stats: [
      { label: "Discipline", value: "Styling" },
      { label: "Format", value: "Fit videos" },
      { label: "Base", value: "Rabat" },
    ],
    isPlaceholder: true,
  },
  {
    slug: "the-lens",
    name: "The Lens",
    slot: "Creator 03",
    discipline: "Photography",
    city: "Marrakech",
    tagline: "Street light, real people.",
    bio: [
      "A photographer slot for someone documenting street style and city life — portraits, night shoots and the in-between moments.",
      "Their profile will showcase photo series and behind-the-scenes from AFROBIAN shoots.",
    ],
    portrait: "/media/creators/creator-03.svg",
    accent: "#FF7900",
    tags: ["Photography", "Street portraits", "Film"],
    socials: pending(["instagram"]),
    picks: ["bloock-that-pitch-track-jacket", "bloock-that-pitch-tee", "bloock-that-pitch-tote"],
    stats: [
      { label: "Discipline", value: "Photography" },
      { label: "Format", value: "Photo series" },
      { label: "Base", value: "Marrakech" },
    ],
    isPlaceholder: true,
  },
  {
    slug: "the-selector",
    name: "The Selector",
    slot: "Creator 04",
    discipline: "DJ & music",
    city: "Tangier",
    tagline: "Gnawa roots, club future.",
    bio: [
      "A music slot for a DJ or producer blending local sounds with Afrobeats, amapiano and club music — mixes, live sets and studio sessions.",
      "Their profile will hold mixes, upcoming dates and the pieces they play in.",
    ],
    portrait: "/media/creators/creator-04.svg",
    accent: "#FF7900",
    tags: ["DJ", "Amapiano", "Production"],
    socials: pending(["instagram", "tiktok", "youtube"]),
    picks: ["blocked-puffer-vest", "bloock-that-guyyy-tee", "blocked-beanie"],
    stats: [
      { label: "Discipline", value: "Music" },
      { label: "Format", value: "Mixes & live sets" },
      { label: "Base", value: "Tangier" },
    ],
    isPlaceholder: true,
  },
  {
    slug: "the-skater",
    name: "The Skater",
    slot: "Creator 05",
    discipline: "Skate & action sports",
    city: "Agadir",
    tagline: "Coastline lines.",
    bio: [
      "A skate slot for someone filming lines, spots and sessions along the coast and in the city.",
      "Their profile will feature clips, spot guides and the gear that survives the slams.",
    ],
    portrait: "/media/creators/creator-05.svg",
    accent: "#FF7900",
    tags: ["Skate", "Edits", "Spots"],
    socials: pending(["instagram", "youtube"]),
    picks: ["blocked-icon-tee", "bloock-cargo-pant", "bloock-that-pitch-cap"],
    stats: [
      { label: "Discipline", value: "Skate" },
      { label: "Format", value: "Clips & edits" },
      { label: "Base", value: "Agadir" },
    ],
    isPlaceholder: true,
  },
  {
    slug: "the-voice",
    name: "The Voice",
    slot: "Creator 06",
    discipline: "Culture & commentary",
    city: "Paris / Casablanca",
    tagline: "Diaspora, unfiltered.",
    bio: [
      "A commentary slot for a creator talking diaspora life, identity, fashion and the stories between two cities.",
      "Their profile will gather their talks, podcasts and long-form posts.",
    ],
    portrait: "/media/creators/creator-06.svg",
    accent: "#FF7900",
    tags: ["Commentary", "Diaspora", "Podcast"],
    socials: pending(["instagram", "tiktok"]),
    picks: ["bloock-that-pitch-cropped-hoodie", "blocked-baby-tee", "bloock-that-pitch-tote"],
    stats: [
      { label: "Discipline", value: "Commentary" },
      { label: "Format", value: "Talks & podcast" },
      { label: "Base", value: "Paris / Casa" },
    ],
    isPlaceholder: true,
  },
];

export const getCreator = (slug: string) => creators.find((c) => c.slug === slug);

export const platformLabel: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};
