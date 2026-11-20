/**
 * CULTURE STORIES — PLACEHOLDER EDITORIAL CONTENT.
 * Original sample copy written for layout purposes. Replace with real articles.
 */

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Story = {
  slug: string;
  title: string;
  kicker: "Style" | "Street" | "Sound" | "Drop" | "Creators";
  excerpt: string;
  date: string; // ISO
  readTime: string;
  cover: string;
  author: string;
  body: StoryBlock[];
  featured?: boolean;
};

export const stories: Story[] = [
  {
    slug: "layering-at-38-degrees",
    title: "Layering at 38°C: the summer fit rulebook",
    kicker: "Style",
    excerpt: "Heat doesn't cancel the fit. It just changes the rules — fabric weight, colour and proportion.",
    date: "2026-07-14",
    readTime: "4 min",
    cover: "/media/editorial/culture-heat-layering.svg",
    author: "AFROBIAN Editorial",
    featured: true,
    body: [
      { type: "p", text: "Summer in Morocco is a stress test for any wardrobe. The sun is relentless, the streets hold heat late into the night, and yet the fit still has to land. The trick isn't wearing less — it's wearing smarter." },
      { type: "h", text: "1. Weight is everything" },
      { type: "p", text: "Swap 450 GSM fleece for a 240 GSM boxy tee. A heavy jersey still drapes like premium cotton but breathes far better than a hoodie ever will." },
      { type: "h", text: "2. Go light on top, loud at the bottom" },
      { type: "p", text: "Let a wide nylon short or a sand cargo carry the silhouette. A clean bone tee on top keeps you cool and lets the proportions do the talking." },
      { type: "quote", text: "The fit doesn't take a day off. It just changes fabric." },
      { type: "h", text: "3. One accent, not five" },
      { type: "list", items: ["A blaze-orange cap", "A single bold graphic", "A tote instead of a backpack — less heat on your back"] },
      { type: "p", text: "Keep it simple, keep it intentional, and save the layering for when the sun goes down." },
    ],
  },
  {
    slug: "night-market-day-fits",
    title: "Night markets, day fits",
    kicker: "Street",
    excerpt: "Why the best street style happens after sunset — and how to dress for the walk from golden hour to midnight.",
    date: "2026-08-02",
    readTime: "5 min",
    cover: "/media/editorial/culture-night-market.svg",
    author: "AFROBIAN Editorial",
    body: [
      { type: "p", text: "When the sun drops, the city comes alive. Food stalls, music spilling out of shops, crews meeting on corners — the night market is where style gets tested in real life." },
      { type: "h", text: "Dress for the temperature drop" },
      { type: "p", text: "Start with a tee, carry a vest or a track jacket. By 11pm you'll be glad you did." },
      { type: "quote", text: "Golden hour is for photos. Midnight is for the real fits." },
      { type: "p", text: "The Blocked icon line was built exactly for this window: pieces that work in the last light and still look sharp under neon." },
    ],
  },
  {
    slug: "inside-drop-01-bloock-that-guyyy",
    title: "Inside Drop 01: Bloock That Guyyy",
    kicker: "Drop",
    excerpt: "How two phrases became a whole collection — and why the block button deserves its own hoodie.",
    date: "2026-09-10",
    readTime: "6 min",
    cover: "/media/editorial/culture-inside-drop.svg",
    author: "AFROBIAN Studio",
    featured: true,
    body: [
      { type: "p", text: "Some phrases outgrow the comments section. BLOOCK THAT GUYYY and BLOOCK THAT PITCH started as jokes between the crew and turned into something people shout across the street. Drop 01 puts them where they belong: front and centre." },
      { type: "h", text: "Heavy pieces, clean lines" },
      { type: "p", text: "We chose heavyweight fleece, ripstop and dense jersey because streetwear should feel substantial. The graphics stay simple — a stacked slogan, a block icon — so the message hits first." },
      { type: "quote", text: "Protect your peace — out loud." },
      { type: "h", text: "How to get it" },
      { type: "p", text: "Every piece is ordered directly on WhatsApp or Instagram. No checkout queues — just a conversation with the team." },
    ],
  },
  {
    slug: "how-to-read-a-fit",
    title: "How to read a fit in five seconds",
    kicker: "Style",
    excerpt: "Silhouette, proportion, colour, detail, attitude. A quick guide to what makes an outfit hit.",
    date: "2026-09-28",
    readTime: "3 min",
    cover: "/media/editorial/culture-read-a-fit.svg",
    author: "AFROBIAN Editorial",
    body: [
      { type: "p", text: "Great outfits read fast. Before you notice any single piece, you notice the shape. Here's the order the eye actually works in." },
      { type: "list", items: ["Silhouette — the overall shape", "Proportion — top vs. bottom volume", "Colour — one hero, the rest support", "Detail — the thing people notice second", "Attitude — how you wear it"] },
      { type: "p", text: "Get the first two right and the rest takes care of itself." },
    ],
  },
  {
    slug: "sound-of-the-block",
    title: "Sound of the block",
    kicker: "Sound",
    excerpt: "Music and streetwear have always moved together. A look at the rhythms that shape how the city dresses.",
    date: "2026-10-15",
    readTime: "5 min",
    cover: "/media/editorial/culture-sound-block.svg",
    author: "AFROBIAN Editorial",
    body: [
      { type: "p", text: "Walk down any busy street and you'll hear it: phones playing Afrobeats, rap from a passing car, traditional rhythms from a shop doorway. That mix is the soundtrack of a generation — and it shows up in the clothes." },
      { type: "quote", text: "What you listen to ends up in what you wear." },
      { type: "p", text: "In upcoming issues, our creator slots for music will share the mixes and playlists that soundtrack each drop." },
    ],
  },
  {
    slug: "creators-not-influencers",
    title: "Creators, not influencers",
    kicker: "Creators",
    excerpt: "Why AFROBIAN HUB is building a home for people who make things — and how to join the roster.",
    date: "2026-11-05",
    readTime: "4 min",
    cover: "/media/editorial/culture-creator-economy.svg",
    author: "AFROBIAN Studio",
    featured: true,
    body: [
      { type: "p", text: "The best culture has always come from people making things: dancers, photographers, DJs, stylists, skaters. AFROBIAN HUB is built to give them a home, not just a tag in a caption." },
      { type: "h", text: "What a creator profile includes" },
      { type: "list", items: ["A dedicated profile page", "Direct links to Instagram and TikTok", "Their picks from each drop", "Features in Culture stories"] },
      { type: "p", text: "We're onboarding our first roster now. If you create, reach out on Instagram or WhatsApp." },
    ],
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);

export const storiesByDate = () => [...stories].sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
