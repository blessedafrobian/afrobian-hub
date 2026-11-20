import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProducts, productsFor, products } from "@/lib/products";
import { creators } from "@/lib/creators";
import { storiesByDate } from "@/lib/stories";
import { generalWhatsappLink, whatsappLink } from "@/lib/order";
import { site, socials } from "@/lib/site";
import { ButtonLink, Container, Marquee, SectionHeading, Sticker } from "@/components/ui/primitives";
import { Parallax, Reveal, RevealLines } from "@/components/ui/motion";
import { ProductCard } from "@/components/shop/product-card";
import { CreatorCard } from "@/components/creators/creator-card";
import { StoryCard } from "@/components/culture/story-card";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

/* ------------------------------------------------------------------ */
/* 01 — crossing tickers                                               */
/* ------------------------------------------------------------------ */
export function TickerCross() {
  return (
    <div className="relative z-20 -my-6 overflow-hidden py-14 sm:-my-10 sm:py-20" aria-hidden>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-bone py-2 text-ink sm:py-3">
        <Marquee items={["Concrete Sun", "Night Market", "Hub Essentials", "Drop 01", "Concrete Sun", "Night Market"]} reverse className="display text-2xl sm:text-4xl" duration={45} />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2.5deg] bg-blaze py-2 text-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:py-3">
        <Marquee
          items={["Order on WhatsApp", "DM on Instagram", "Shipping across Morocco", "Worldwide on request", "Creators first"]}
          className="display text-2xl sm:text-4xl"
          duration={38}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — the drop                                                       */
/* ------------------------------------------------------------------ */
export function DropSection() {
  const [lead, ...rest] = featuredProducts();
  const grid = rest.slice(0, 4);
  return (
    <section id="drop" className="relative scroll-mt-20 bg-ink pb-24 pt-16 sm:pb-32 sm:pt-24" aria-labelledby="drop-title">
      <Container>
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="The drop"
            title={
              <span id="drop-title">
                Concrete <span className="text-blaze">Sun</span>
                <span className="font-serif text-[0.5em] normal-case italic tracking-normal text-bone/70"> /drop 01</span>
              </span>
            }
            aside={
              <p className="text-bone/70">
                Heavyweight fleece, ripstop cargo and loud orange. Every piece ordered directly on WhatsApp — pick your size, send the message, done.
              </p>
            }
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:mt-16 lg:grid-cols-12 lg:gap-x-6">
          <Reveal className="col-span-2 lg:col-span-6 lg:row-span-2">
            <ProductCard product={lead} size="lg" sizes="(max-width: 1024px) 100vw, 50vw" index={0} />
          </Reveal>
          {grid.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * (i % 2)} className="lg:col-span-3">
              <ProductCard product={p} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-8 sm:flex-row sm:items-center">
          <p className="label text-bone/60">
            {products.length} pieces across 3 collections · Prices in {site.currency}
          </p>
          <ButtonLink href="/shop" variant="bone">
            Shop everything
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — campaign / lookbook                                            */
/* ------------------------------------------------------------------ */
const frames = [
  { src: "/media/editorial/lookbook-01.svg", title: "No signal", n: "01" },
  { src: "/media/editorial/lookbook-02.svg", title: "Concrete", n: "02" },
  { src: "/media/editorial/lookbook-03.svg", title: "The block", n: "03" },
];

export function CampaignSection() {
  return (
    <section className="edge-slant-top relative -mt-[4vw] bg-bone pb-24 pt-[calc(4vw+5rem)] text-ink sm:pb-32" aria-labelledby="campaign-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label mb-5 flex items-center gap-3 text-ink/60">
              <span className="text-blaze">02</span>
              <span className="h-px w-8 bg-current" />
              Campaign
            </p>
            <h2 id="campaign-title" className="display text-giga">
              <RevealLines lines={["Worn", <span key="l" className="text-outline-ink">loud.</span>]} />
            </h2>
          </div>
          <Reveal className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="font-serif text-3xl leading-tight sm:text-4xl">
              Shot on the street, styled by the crew. <em className="text-blaze-deep">Concrete Sun</em> is about the moment the city turns orange.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {frames.map((f, i) => (
            <Reveal
              key={f.n}
              delay={i * 0.1}
              className={i === 0 ? "col-span-2 lg:col-span-1" : i === 1 ? "lg:mt-24" : "lg:mt-48"}
            >
              <figure>
                <Parallax offset={i === 0 ? 20 : 40} className="relative aspect-[4/5] overflow-hidden bg-coal">
                  <Image src={f.src} alt={`Campaign frame ${f.n}: ${f.title} (temporary artwork)`} fill sizes="(max-width: 1024px) 50vw, 33vw" className="scale-110 object-cover" />
                </Parallax>
                <figcaption className="mt-3 flex items-baseline justify-between border-t border-ink/20 pt-3">
                  <span className="display text-2xl sm:text-3xl">{f.title}</span>
                  <span className="label text-ink/50">Frame {f.n}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — men / women split                                              */
/* ------------------------------------------------------------------ */
export function SplitSection() {
  const panels = [
    { href: "/men", label: "Men", img: "/media/editorial/panel-men.svg", count: productsFor("men").length, line: "Heavy layers, straight cargos, track tops." },
    { href: "/women", label: "Women", img: "/media/editorial/panel-women.svg", count: productsFor("women").length, line: "Cropped fleece, wide legs, baby tees." },
  ];
  return (
    <section className="bg-ink" aria-label="Shop by edit">
      <div className="flex flex-col md:h-[92vh] md:min-h-[640px] md:flex-row">
        {panels.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            className="group relative flex h-[78vh] min-h-[520px] flex-1 overflow-hidden transition-[flex-grow] duration-700 ease-snap md:h-auto md:hover:flex-[1.45]"
          >
            <Image src={p.img} alt={`${p.label}'s edit (temporary artwork)`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-[1.2s] ease-snap group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="relative z-10 mt-auto flex w-full items-end justify-between gap-4 p-5 sm:p-8 lg:p-10">
              <div>
                <p className="label mb-3 text-blaze">
                  0{i + 3} / {p.count} pieces
                </p>
                <h2 className="display text-[22vw] leading-[0.78] text-bone md:text-[10vw]">{p.label}</h2>
                <p className="mt-4 max-w-xs text-bone/80">{p.line}</p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-blaze text-ink transition-transform duration-500 group-hover:rotate-45 sm:size-20">
                <ArrowUpRight className="size-6 sm:size-8" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — manifesto                                                      */
/* ------------------------------------------------------------------ */
const pillars = [
  { n: "A", title: "Streetwear", body: "Heavyweight, considered pieces built for the city — designed with a Moroccan eye, made to travel." },
  { n: "B", title: "Creators", body: "Dancers, stylists, photographers, DJs. A home for the people who make culture, with profiles that link straight to their work." },
  { n: "C", title: "Culture", body: "Stories on style, sound and the street. The zine side of the hub." },
];

export function ManifestoSection() {
  return (
    <section className="grain relative overflow-hidden bg-blaze text-ink" aria-labelledby="manifesto-title">
      <Container className="relative z-[2] py-24 sm:py-32">
        <p className="label mb-8 flex items-center gap-3">
          <span>05</span>
          <span className="h-px w-8 bg-current" />
          Manifesto
        </p>
        <h2 id="manifesto-title" className="display text-[13vw] leading-[0.85] sm:text-[11vw] lg:text-[9vw]">
          <RevealLines
            lines={[
              "We don't follow",
              <span key="2">
                the city<span className="font-serif normal-case italic tracking-normal">,</span>
              </span>,
              <span key="3" className="flex flex-wrap items-baseline gap-x-[2vw]">
                <span className="font-serif text-[0.9em] normal-case italic tracking-tight">we</span>
                <span className="text-outline-ink">dress it.</span>
              </span>,
            ]}
          />
        </h2>

        <div className="absolute right-6 top-20 hidden lg:block">
          <Sticker text="Morocco ✺ to the world ✺ since drop 01 ✺ " className="!bg-ink !text-bone" center={<span className="text-blaze">A/H</span>} />
        </div>

        <div className="mt-16 grid gap-px border border-ink/20 bg-ink/20 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="bg-blaze p-6 sm:p-8">
              <p className="display text-6xl">{p.n}.</p>
              <h3 className="display mt-6 text-3xl">{p.title}</h3>
              <p className="mt-3 text-ink/80">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="edge-jag-bottom relative z-[2] aspect-[16/10] w-full sm:aspect-[16/7]">
        <Image src="/media/editorial/manifesto.svg" alt="The AFROBIAN crew — three figures in Drop 01 (temporary artwork)" fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — creators                                                       */
/* ------------------------------------------------------------------ */
export function CreatorsSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="creators-title">
      <Container>
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Creators"
            title={
              <span id="creators-title">
                The <span className="text-blaze">crew</span>
              </span>
            }
            aside={
              <div className="space-y-4">
                <p className="text-bone/70">Movers, stylists, lenses and selectors. Each creator gets a profile on the hub with direct links to their Instagram and TikTok.</p>
                <p className="label text-bone/40">Roster in progress — profiles below are placeholder slots.</p>
              </div>
            }
          />
        </Reveal>
      </Container>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:gap-5 sm:px-6 lg:px-10" role="list" aria-label="Creators">
        {creators.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] xl:w-[22vw]" role="listitem">
            <CreatorCard creator={c} />
          </Reveal>
        ))}
        <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-between bg-blaze p-6 text-ink sm:w-[44vw] lg:w-[27vw] xl:w-[22vw]" role="listitem">
          <p className="label">Open call</p>
          <div>
            <p className="display text-5xl sm:text-6xl">You create?</p>
            <p className="mt-3 text-ink/80">Dance, style, shoot, mix, skate or speak — we want to hear from you.</p>
            <div className="mt-6 flex flex-col gap-2">
              <ButtonLink href={socials.instagramDm} variant="ink" icon={<InstagramIcon size={16} />}>
                Pitch us on Instagram
              </ButtonLink>
              <ButtonLink href={whatsappLink(`Hi ${site.name} — I'm a creator and I'd like to join the roster.`)} variant="outline-ink" icon={<WhatsAppIcon size={16} />}>
                Or on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-10">
        <ButtonLink href="/creators" variant="outline">
          Meet all creators
        </ButtonLink>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 07 — culture                                                        */
/* ------------------------------------------------------------------ */
export function CultureSection() {
  const [lead, ...rest] = storiesByDate();
  return (
    <section className="edge-slant-top relative -mt-[4vw] bg-bone pb-24 pt-[calc(4vw+5rem)] text-ink sm:pb-32" aria-labelledby="culture-title">
      <Container>
        <Reveal>
          <SectionHeading
            tone="light"
            index="07"
            eyebrow="Culture"
            title={
              <span id="culture-title">
                The zine<span className="text-blaze">.</span>
              </span>
            }
            aside={<p className="text-ink/70">Style guides, street notes, sound and the creator economy — the editorial side of the hub.</p>}
          />
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <StoryCard story={lead} variant="lead" tone="light" />
          </Reveal>
          <div className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-5">
            {rest.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <StoryCard story={s} variant="row" tone="light" />
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-12">
          <ButtonLink href="/culture" variant="ink">
            Read the culture
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 08 — how to order                                                   */
/* ------------------------------------------------------------------ */
const steps = [
  { n: "01", title: "Pick your piece", body: "Browse the shop, choose your colour and size on the product page." },
  { n: "02", title: "Send the message", body: "Tap “Order on WhatsApp” — your order details are prefilled. Prefer Instagram? DM us." },
  { n: "03", title: "Confirm & receive", body: "We confirm stock, delivery and payment with you directly. Then it's on the way." },
];

export function HowToOrderSection() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="order-title">
      <Container className="relative z-[2]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label mb-5 flex items-center gap-3 text-bone/60">
              <span className="text-blaze">08</span>
              <span className="h-px w-8 bg-current" />
              How to order
            </p>
            <h2 id="order-title" className="display text-huge">
              <RevealLines lines={["No cart.", <span key="b" className="text-blaze">Just chat.</span>]} />
            </h2>
            <p className="mt-6 max-w-md text-bone/70">Ordering happens in a real conversation with the team — sizing help, stock checks and delivery in one thread.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <ButtonLink href={generalWhatsappLink} size="lg" icon={<WhatsAppIcon size={18} />}>
                WhatsApp us
              </ButtonLink>
              <ButtonLink href={socials.instagramDm} size="lg" variant="outline" icon={<InstagramIcon size={18} />}>
                Instagram DM
              </ButtonLink>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.1} className="group grid grid-cols-[auto_1fr] gap-6 border-t border-bone/15 py-8 last:border-b">
                <span className="display text-outline-bone text-7xl transition-colors duration-500 group-hover:text-blaze group-hover:[-webkit-text-stroke-color:var(--color-blaze)] sm:text-8xl">
                  {s.n}
                </span>
                <div className="pt-2">
                  <h3 className="display text-3xl sm:text-4xl">{s.title}</h3>
                  <p className="mt-2 text-bone/70">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
