import Image from "next/image";
import Link from "next/link";
import { products, productsFor, type Category } from "@/lib/products";
import { creators } from "@/lib/creators";
import { storiesByDate } from "@/lib/stories";
import { generalWhatsappLink } from "@/lib/order";
import { socials } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/motion";
import { ProductCard } from "@/components/shop/product-card";
import { CreatorCard } from "@/components/creators/creator-card";
import { StoryCard } from "@/components/culture/story-card";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Link href="/shop" className="block" aria-label="Shop Drop 01">
        <div className="relative aspect-[3/4] w-full sm:hidden">
          <Image src="/media/editorial/hero-tall.svg" alt="Drop 01 — Bloock That Guyyy hoodie and cap" fill preload sizes="100vw" className="object-cover" />
        </div>
        <div className="relative hidden aspect-[16/9] w-full sm:block">
          <Image src="/media/editorial/hero-wide.svg" alt="Drop 01 — Bloock That Guyyy hoodie, tee and cap" fill preload sizes="100vw" className="object-cover" />
        </div>
      </Link>
      <Container className="py-10 text-center sm:py-14">
        <p className="font-medium">Drop 01 — Out now</p>
        <h1 id="hero-title" className="display mx-auto mt-3 max-w-5xl text-[clamp(3.25rem,10vw,8.5rem)]">
          Bloock that guyyy
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[1.05rem]">Protect your peace — out loud. Heavyweight hoodies, tees and caps, ordered straight from WhatsApp.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <ButtonLink href="/shop">Shop the drop</ButtonLink>
          <ButtonLink href={generalWhatsappLink} variant="outline" icon={<WhatsAppIcon size={18} />}>
            Order on WhatsApp
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Just in — product carousel                                          */
/* ------------------------------------------------------------------ */
export function JustIn() {
  const list = [...products].filter((p) => !p.soldOut).sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 10);
  return (
    <section className="py-10 sm:py-14" aria-label="Just in">
      <Carousel
        title="Just In"
        action={
          <Link href="/shop" className="font-medium underline-offset-4 hover:underline">
            Shop all
          </Link>
        }
        itemClassName="w-[72vw] sm:w-[40vw] lg:w-[28vw] xl:w-[23vw]"
      >
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} sizes="(max-width: 640px) 72vw, 28vw" />
        ))}
      </Carousel>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured — men / women                                              */
/* ------------------------------------------------------------------ */
export function Featured() {
  const tiles = [
    { href: "/men", label: "Men", sub: `${productsFor("men").length} pieces`, img: "/media/editorial/panel-men.svg", light: true },
    { href: "/women", label: "Women", sub: `${productsFor("women").length} pieces`, img: "/media/editorial/panel-women.svg", light: false },
  ];
  return (
    <section className="py-10 sm:py-14" aria-labelledby="featured-title">
      <Container>
        <h2 id="featured-title" className="mb-6 text-2xl font-medium tracking-tight sm:text-[1.75rem]">
          Featured
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {tiles.map((t) => (
            <Reveal key={t.href}>
              <Link href={t.href} className="group relative block aspect-[4/5] overflow-hidden">
                <Image src={t.img} alt={`${t.label}'s edit`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
                <div className={`absolute bottom-0 left-0 p-6 sm:p-10 ${t.light ? "text-ink" : "text-white"}`}>
                  <p className="font-medium">{t.sub}</p>
                  <p className="display mt-1 text-5xl sm:text-6xl">{t.label}</p>
                  <span className={`mt-5 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium ${t.light ? "bg-ink text-white" : "bg-white text-ink"}`}>
                    Shop {t.label}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Campaign banner                                                     */
/* ------------------------------------------------------------------ */
export function Campaign() {
  return (
    <section className="relative bg-ink text-white" aria-labelledby="campaign-title">
      <div className="relative aspect-[4/5] w-full sm:hidden">
        <Image src="/media/editorial/campaign-tall.svg" alt="Bloock That Pitch hoodie and cap" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="relative hidden aspect-[24/11] w-full sm:block">
        <Image src="/media/editorial/campaign-wide.svg" alt="Bloock That Pitch hoodie, cap and tote" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="relative sm:absolute sm:inset-y-0 sm:left-0 sm:flex sm:w-[48%] sm:items-center">
        <div className="p-6 sm:p-12 lg:p-20">
          <p className="font-medium text-white/70">Drop 01 · Part two</p>
          <h2 id="campaign-title" className="display mt-2 text-[clamp(3rem,6.5vw,7rem)]">
            Bloock that pitch
          </h2>
          <p className="mt-4 max-w-md text-white/80">Bone heavyweight fleece, ink print. For when the energy around you isn&apos;t it.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <ButtonLink href="/shop/bloock-that-pitch-heavy-hoodie" variant="light">
              Shop the hoodie
            </ButtonLink>
            <ButtonLink href="/shop" variant="outline-light">
              View all
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shop by category                                                    */
/* ------------------------------------------------------------------ */
export function Categories() {
  const tiles: { label: string; cat: Category; img: string }[] = [
    { label: "Hoodies", cat: "hoodies", img: "/media/products/bloock-that-pitch-heavy-hoodie-a.svg" },
    { label: "T-Shirts", cat: "tees", img: "/media/products/blocked-icon-tee-c.svg" },
    { label: "Pants", cat: "pants", img: "/media/products/bloock-cargo-pant-a.svg" },
    { label: "Caps & Accessories", cat: "accessories", img: "/media/products/bloock-that-guyyy-cap-c.svg" },
  ];
  return (
    <section className="py-10 sm:py-14" aria-label="Shop by category">
      <Carousel title="Shop by Category" itemClassName="w-[72vw] sm:w-[40vw] lg:w-[23vw]">
        {tiles.map((t) => (
          <Link key={t.cat} href="/shop" className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-mist">
              <Image src={t.img} alt="" fill sizes="(max-width: 640px) 72vw, 25vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
            </div>
            <p className="mt-3 text-lg font-medium">{t.label}</p>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Creators                                                            */
/* ------------------------------------------------------------------ */
export function CreatorsRail() {
  return (
    <section className="py-10 sm:py-14" aria-label="Creators">
      <Carousel
        title="The Crew"
        action={
          <Link href="/creators" className="font-medium underline-offset-4 hover:underline">
            All creators
          </Link>
        }
        itemClassName="w-[60vw] sm:w-[32vw] lg:w-[22vw] xl:w-[18vw]"
      >
        {creators.map((c) => (
          <CreatorCard key={c.slug} creator={c} />
        ))}
      </Carousel>
      <Container>
        <p className="mt-4 text-sm text-mute">Roster in progress — profiles shown are placeholders until our first creators are signed.</p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */
export function Stories() {
  const list = storiesByDate().slice(0, 3);
  return (
    <section className="py-10 sm:py-14" aria-labelledby="stories-title">
      <Container>
        <div className="mb-6 flex items-end justify-between">
          <h2 id="stories-title" className="text-2xl font-medium tracking-tight sm:text-[1.75rem]">
            Culture
          </h2>
          <Link href="/culture" className="font-medium underline-offset-4 hover:underline">
            All stories
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3 sm:gap-4">
          {list.map((s) => (
            <Reveal key={s.slug}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How to order                                                        */
/* ------------------------------------------------------------------ */
const steps = [
  { n: "1", title: "Pick your piece", body: "Choose your colour and size on the product page." },
  { n: "2", title: "Send the message", body: "Tap “Order on WhatsApp” — your order is prefilled. Prefer Instagram? DM us." },
  { n: "3", title: "Confirm & receive", body: "We confirm stock, delivery and payment with you directly." },
];

export function HowToOrder() {
  return (
    <section className="py-10 sm:py-14" aria-labelledby="order-title">
      <Container>
        <div className="rounded-2xl bg-mist px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="order-title" className="display text-5xl sm:text-6xl">
                No cart.
                <br />
                Just chat.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                <ButtonLink href={generalWhatsappLink} icon={<WhatsAppIcon size={18} />}>
                  WhatsApp us
                </ButtonLink>
                <ButtonLink href={socials.instagramDm} variant="outline" icon={<InstagramIcon size={18} />}>
                  Instagram DM
                </ButtonLink>
              </div>
            </div>
            <ol className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {steps.map((s) => (
                <li key={s.n}>
                  <span className="grid size-10 place-items-center rounded-full bg-ink font-medium text-white">{s.n}</span>
                  <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
                  <p className="mt-1 text-mute">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
