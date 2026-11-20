# AFROBIAN HUB

Streetwear & creator culture platform — Morocco to the world.
Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
node scripts/generate-media.mjs   # regenerate temporary artwork
```

## Routes

| Route | What |
| --- | --- |
| `/` | Homepage: hero, drop grid, campaign, Men/Women split, manifesto, creators, culture, how-to-order |
| `/shop` · `/men` · `/women` | Filterable / sortable product grids (unisex pieces appear in both edits) |
| `/shop/[slug]` | Product detail: gallery, colour/size/qty, WhatsApp order with prefilled message, Instagram DM |
| `/creators` · `/creators/[slug]` | Creator roster and profiles with social links |
| `/culture` · `/culture/[slug]` | Editorial stories |
| `/about` · `/contact` | Brand story; contact channels, WhatsApp contact form, FAQ |
| `/sitemap.xml` · `/robots.txt` | SEO |

Unknown product/creator/story slugs return a real `404` via `proxy.ts`.

## ⚠️ Placeholders to replace before launch

| What | Where |
| --- | --- |
| WhatsApp number, Instagram/TikTok handles, email, site URL | `.env.local` (see `.env.example`) or `lib/site.ts` |
| Product inventory, prices, sizes, copy | `lib/products.ts` |
| Product & editorial images | `public/media/**` — generated temporary SVG art. Drop real photos in and update paths in the data files (JPG/WebP are optimised automatically by `next/image`). |
| Creator profiles (currently placeholder *slots*, no real accounts) | `lib/creators.ts` — set `name`, `bio`, `portrait`, and `socials[].url`/`handle` (null = “link pending”) |
| Culture stories | `lib/stories.ts` |
| About page brand story | `app/about/page.tsx` |
| Newsletter (UI only — nothing is sent or stored) | `components/layout/newsletter-form.tsx` → connect a provider and set `NEWSLETTER_LIVE = true` |

## Design system

- Tokens in `app/globals.css` (`@theme`): `blaze #FF7900`, `ink #080808`, `bone #F2EEE7`, `coal #292929`.
- Type: Anton (display), Instrument Serif (editorial accents), Archivo (body), JetBrains Mono (labels).
- Primitives in `components/ui/` — `ButtonLink`, `Container`, `SectionHeading`, `Marquee`, `Sticker`, `Badge`, `Wordmark`, motion helpers (`Reveal`, `RevealLines`, `Parallax`), `Media`.
- Utilities: `.display`, `.label`, `.text-outline-*`, `.grain`, `.edge-jag-bottom`, `.edge-slant-top`.
- Motion respects `prefers-reduced-motion`.
