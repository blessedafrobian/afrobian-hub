import Image from "next/image";
import Link from "next/link";
import { products, productsFor, type Category } from "@/lib/products";
import { storiesByDate } from "@/lib/stories";
import { generalWhatsappLink } from "@/lib/order";
import { socials } from "@/lib/site";
import { ButtonLink, Container, Marquee } from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/motion";
import { ProductCard } from "@/components/shop/product-card";
import { StoryCard } from "@/components/culture/story-card";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <Link href="/shop" className="block" aria-label="Shop Drop 01">
        <div className="relative aspect-[3/4] w-full sm:hidden">
          <Image src="/media/editorial/hero-tall.svg" alt="Drop 01 — Bloock That Guyyy hoodie and cap" fill preload sizes="100vw" className="object-cover" />
        </div>
        <div className="relative hidden aspect-[16/8] w-full sm:block">
          <Image src="/media/editorial/hero-wide.svg" alt="Drop 01 — Bloock That Guyyy hoodie, tee and cap" fill preload sizes="100vw" className="object-cover" />
        </div>
      </Link>
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow">Drop 01 — Out now</p>
          <h1 id="hero-title" className="display mt-5 text-[clamp(3.5rem,11vw,10rem)]">
            Protect your peace.
            <br />
            <span className="text-blaze">Out loud.</span>
          </h1>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-md text-lg text-bone/70">
            Heavyweight pieces for people who stopped explaining themselves. Designed in Morocco, worn by a community of 530K+.
          </p>
          <p dir="rtl" lang="ar" className="ar mt-3 text-lg font-medium text-blaze lg:text-left">راحتك قبل كلشي.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <ButtonLink href="/shop" size="lg">Shop the drop</ButtonLink>
            <ButtonLink href="#identity" variant="outline" size="lg">
              Our story
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Quote marquee                                                       */
/* ------------------------------------------------------------------ */
export const QUOTES = [
  "Bloock that guyyy",
  "راحتك قبل كلشي",
  "Soft is not weak",
  "نتا كافي · نتي كافية",
  "Choose yourself first",
  "ما تصغرش راسك",
  "Morocco to the world",
];

export function QuoteBand() {
  return (
    <section aria-label="Afrobian Hub quotes" className="border-y border-line py-6 sm:py-8">
      <Marquee items={QUOTES} duration={40} separator="✦" className="display text-[clamp(2.25rem,5vw,4.5rem)] text-bone [&_span.opacity-50]:text-blaze [&_span.opacity-50]:opacity-100" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Just in — product carousel                                          */
/* ------------------------------------------------------------------ */
export function JustIn() {
  const list = [...products].filter((p) => !p.soldOut).sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 10);
  return (
    <section className="py-16 sm:py-24" aria-label="Just in">
      <Carousel
        title="Just In"
        action={
          <Link href="/shop" className="text-sm font-medium tracking-wide underline-offset-8 hover:text-blaze hover:underline">
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
/* Identity — what the brand stands for                                */
/* ------------------------------------------------------------------ */
const pillars = [
  { n: "01", t: "Peace", d: "Your energy is not public property. Every piece is a reminder to guard it." },
  { n: "02", t: "Standards", d: "Knowing what you deserve isn't arrogance. It's the starting point." },
  { n: "03", t: "Roots", d: "Born in Morocco, built online, worn everywhere. We don't shrink to fit in." },
];

export function Identity() {
  return (
    <section id="identity" aria-labelledby="identity-title" className="scroll-mt-20 border-t border-line py-20 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">Identity</p>
          <h2 id="identity-title" className="display mt-5 text-[clamp(3.25rem,8vw,8rem)]">
            Not a brand.
            <br />
            <span className="text-blaze">A boundary.</span>
          </h2>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="text-xl leading-relaxed text-bone/80">
              AFROBIAN HUB is for the ones who gave too much, explained too long and stayed where they weren&apos;t valued. We put the words you needed to hear on the clothes you live in.
            </p>
          </Reveal>
          <ol className="mt-12 border-t border-line">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
                <span className="pt-1 text-sm tracking-widest text-blaze">{p.n}</span>
                <div>
                  <h3 className="display text-3xl">{p.t}</h3>
                  <p className="mt-2 text-bone/60">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
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
    <section className="relative bg-ink" aria-labelledby="campaign-title">
      <div className="relative aspect-[4/5] w-full sm:hidden">
        <Image src="/media/editorial/campaign-tall.svg" alt="Bloock That Pitch hoodie and cap" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="relative hidden aspect-[24/11] w-full sm:block">
        <Image src="/media/editorial/campaign-wide.svg" alt="Bloock That Pitch hoodie, cap and tote" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="relative sm:absolute sm:inset-y-0 sm:left-0 sm:flex sm:w-[48%] sm:items-center">
        <div className="p-6 sm:p-12 lg:p-20">
          <p className="eyebrow">Drop 01 · Part two</p>
          <h2 id="campaign-title" className="display mt-4 text-[clamp(3rem,6.5vw,7rem)]">
            Bloock that pitch
          </h2>
          <p className="mt-4 max-w-md text-bone/70">Bone heavyweight fleece, ink print. For when the energy around you isn&apos;t it.</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <ButtonLink href="/shop/bloock-that-pitch-heavy-hoodie">Shop the hoodie</ButtonLink>
            <ButtonLink href="/shop" variant="outline">
              View all
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Quotes wall — the words, and where they're printed                 */
/* ------------------------------------------------------------------ */
const wall = [
  { q: "Bloock that guyyy.", dj: "اللي ما عرفش القيمة ديالك… بلوكيه.", note: "For the one who keeps coming back with “wyd”.", href: "/shop/bloock-that-guyyy-heavy-hoodie", on: "Heavy Hoodie" },
  { q: "Protect your peace.", dj: "راحتك قبل كلشي.", note: "Silence is also an answer.", href: "/shop/bloock-that-pitch-heavy-hoodie", on: "Pitch Hoodie", hot: true },
  { q: "Soft is not weak.", dj: "بقيتي حنينة من بعد كلشي؟ هادي هي القوة.", note: "Staying gentle after everything is the flex.", href: "/shop/bloock-that-guyyy-tee", on: "Heavy Tee" },
  { q: "Standards are not too much.", dj: "ما كتبالغيش. نتي عارفة شنو كتستاهلي.", note: "The right one won't call them a problem.", href: "/shop/blocked-baby-tee", on: "Baby Tee" },
  { q: "Choose yourself first.", dj: "ختار راسك… ماشي أنانية، غير عقل.", note: "Not selfish. Just finally on your own side.", href: "/shop/bloock-that-guyyy-cropped-hoodie", on: "Cropped Hoodie" },
  { q: "Morocco to the world.", dj: "من البلاد… للدنيا كاملة.", note: "Where we're from is the point, not the footnote.", href: "/shop/bloock-that-guyyy-cap", on: "Cap" },
];

export function QuotesWall() {
  return (
    <section id="quotes" aria-labelledby="quotes-title" className="scroll-mt-20 py-20 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Quotes</p>
            <h2 id="quotes-title" className="display mt-5 text-[clamp(2.75rem,6vw,5.5rem)]">
              Words you can wear
            </h2>
          </div>
          <p className="max-w-sm text-bone/60">The lines our community screenshots, shares and sends to their group chat — printed heavy.</p>
        </div>
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {wall.map((w, i) => (
            <Reveal key={w.q} delay={(i % 3) * 0.06}>
              <Link
                href={w.href}
                className={`group flex h-full min-h-[18rem] flex-col justify-between p-8 transition-colors sm:p-10 ${w.hot ? "bg-blaze text-ink" : "bg-ink hover:bg-coal"}`}
              >
                <div>
                  <p className="display text-[clamp(2.5rem,4vw,3.75rem)]">{w.q}</p>
                  <p dir="rtl" lang="ar" className={`ar mt-4 text-left text-xl font-medium ${w.hot ? "text-ink" : "text-blaze"}`}>{w.dj}</p>
                </div>
                <div className="mt-10">
                  <p className={w.hot ? "text-ink/70" : "text-bone/55"}>{w.note}</p>
                  <p className={`mt-4 text-sm font-medium tracking-wide ${w.hot ? "text-ink" : "text-blaze"}`}>
                    Printed on: {w.on} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
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
/* Featured — men / women                                              */
/* ------------------------------------------------------------------ */
export function Featured() {
  const tiles = [
    { href: "/men", label: "Men", sub: `${productsFor("men").length} pieces`, img: "/media/editorial/panel-men.svg" },
    { href: "/women", label: "Women", sub: `${productsFor("women").length} pieces`, img: "/media/editorial/panel-women.svg" },
  ];
  return (
    <section className="pb-20 sm:pb-32" aria-labelledby="featured-title">
      <Container>
        <h2 id="featured-title" className="display mb-8 text-5xl sm:text-6xl">
          Shop the edit
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {tiles.map((t) => (
            <Reveal key={t.href}>
              <Link href={t.href} className="group relative block aspect-[4/5] overflow-hidden">
                <Image src={t.img} alt={`${t.label}'s edit`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 pt-24 sm:p-10 sm:pt-32">
                  <p className="text-sm tracking-widest text-bone/70 uppercase">{t.sub}</p>
                  <p className="display mt-2 text-6xl sm:text-7xl">{t.label}</p>
                  <span className="mt-6 inline-flex h-11 items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors group-hover:bg-blaze">
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
/* Story — where the brand comes from                                  */
/* ------------------------------------------------------------------ */
export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="scroll-mt-20 border-t border-line">
      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Image src="/media/editorial/manifesto.svg" alt="Drop 01 hoodies and tee" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="flex items-center px-5 py-20 sm:px-9 lg:px-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="display mt-5 text-[clamp(3rem,6vw,6rem)]">
              From the feed
              <br />
              to the fit.
            </h2>
            <div className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-bone/75">
              <p>
                Afrobian started as a voice, not a label: honest talks about love, healing and self-respect, shared every day with hundreds of thousands of people across Morocco and beyond.
              </p>
              <p>
                The same lines kept coming back in the comments. <span className="text-bone">&ldquo;I needed this.&rdquo;</span> <span className="text-bone">&ldquo;Sending this to my sister.&rdquo;</span> So we made them permanent.
              </p>
              <p>Every drop starts with a word our community lived through. The hoodie is just where it lands.</p>
            </div>
            <div className="mt-10">
              <ButtonLink href="/about" variant="outline">
                Read the full story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Community                                                           */
/* ------------------------------------------------------------------ */
const promise = [
  { t: "حنا معاك", d: "فالهبطات وفالطلعات. ما كتقراش هاد المحتوى بوحدك، 530 ألف واحد عايشين نفس الحاجة." },
  { t: "كنشجعوك", d: "كل بوست، كل دروب، كل ميساج: باش تولي أحسن نسخة منك. ماشي كامل… ولكن كل نهار أحسن." },
  { t: "كنساندو بعضياتنا", d: "المجتمع كيتسند ببعضياتو. تاغي، بارطاجي، وعاون اللي جاي من موراك." },
];

const stats = [
  { v: "530K+", l: "People in the community" },
  { v: "25M+", l: "Views every month" },
  { v: "3", l: "Platforms, one voice" },
];

export function Community() {
  const looks = ["/media/editorial/lookbook-01.svg", "/media/editorial/lookbook-02.svg", "/media/editorial/lookbook-03.svg"];
  return (
    <section id="community" aria-labelledby="community-title" className="scroll-mt-20 border-t border-line py-20 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Community</p>
            <h2 id="community-title" className="display mt-5 text-[clamp(3.25rem,8vw,8rem)]">
              530K strong.
              <br />
              <span className="text-blaze">One standard.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5">
            <p className="text-lg text-bone/70">
              We don&apos;t just sell clothes. We&apos;re building the best version of ourselves — together. Wear it, post it, tag <span className="font-medium text-bone">#AFROBIANHUB</span> and your fit could be next on our pages.
            </p>
            <p dir="rtl" lang="ar" className="ar mt-4 text-left text-xl font-medium text-blaze">ما بغيناش نبيعو ليك غير الحوايج… بغيناك تولي أحسن نسخة منك.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <ButtonLink href={socials.instagram} icon={<InstagramIcon size={18} />}>
                Join on Instagram
              </ButtonLink>
              <ButtonLink href={socials.tiktok} variant="outline" icon={<TikTokIcon size={18} />}>
                TikTok
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-3">
          {promise.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06} className="bg-ink p-8 sm:p-10">
              <span className="text-sm tracking-widest text-blaze">0{i + 1}</span>
              <div dir="rtl" lang="ar" className="ar">
                <h3 className="mt-4 text-3xl font-extrabold">{p.t}</h3>
                <p className="mt-3 text-bone/65">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <dl className="mt-12 grid border-y border-line sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.l} className={`py-8 sm:px-8 ${i ? "border-t border-line sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
              <dt className="sr-only">{s.l}</dt>
              <dd>
                <span className="display block text-6xl text-blaze sm:text-7xl">{s.v}</span>
                <span className="mt-3 block text-bone/60">{s.l}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-4">
          {looks.map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[4/5] overflow-hidden" aria-label="See the community on Instagram">
                <Image src={src} alt="" fill sizes="33vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.04]" />
                <span className="absolute bottom-3 left-3 text-xs tracking-widest text-bone/80 sm:bottom-5 sm:left-5">#AFROBIANHUB</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shop by category                                                    */
/* ------------------------------------------------------------------ */
export function Categories() {
  const tiles: { label: string; cat: Category; img: string }[] = [
    { label: "Hoodies", cat: "hoodies", img: "/media/products/bloock-that-pitch-heavy-hoodie-a.svg" },
    { label: "T-Shirts", cat: "tees", img: "/media/products/blocked-icon-tee-a.svg" },
    { label: "Pants", cat: "pants", img: "/media/products/bloock-cargo-pant-a.svg" },
    { label: "Caps & Accessories", cat: "accessories", img: "/media/products/bloock-that-guyyy-cap-a.svg" },
  ];
  return (
    <section className="py-16 sm:py-24" aria-label="Shop by category">
      <Carousel title="Shop by Category" itemClassName="w-[72vw] sm:w-[40vw] lg:w-[23vw]">
        {tiles.map((t) => (
          <Link key={t.cat} href="/shop" className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-coal">
              <Image src={t.img} alt="" fill sizes="(max-width: 640px) 72vw, 25vw" className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]" />
            </div>
            <p className="mt-4 text-lg font-medium transition-colors group-hover:text-blaze">{t.label}</p>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Culture stories                                                     */
/* ------------------------------------------------------------------ */
export function Stories() {
  const list = storiesByDate().slice(0, 3);
  return (
    <section className="border-t border-line py-20 sm:py-28" aria-labelledby="stories-title">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Culture</p>
            <h2 id="stories-title" className="display mt-4 text-5xl sm:text-6xl">
              Read the culture
            </h2>
          </div>
          <Link href="/culture" className="text-sm font-medium tracking-wide underline-offset-8 hover:text-blaze hover:underline">
            All stories
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-4">
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
  { n: "01", title: "Pick your piece", body: "Choose your colour and size on the product page." },
  { n: "02", title: "Send the message", body: "Tap “Order on WhatsApp” — your order is prefilled. Prefer Instagram? DM us." },
  { n: "03", title: "Confirm & receive", body: "We confirm stock, delivery and payment with you directly." },
];

export function HowToOrder() {
  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="order-title">
      <Container>
        <div className="border border-line bg-coal px-6 py-14 sm:px-12 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id="order-title" className="display text-6xl sm:text-7xl">
                No cart.
                <br />
                <span className="text-blaze">Just chat.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-2">
                <ButtonLink href={generalWhatsappLink} icon={<WhatsAppIcon size={18} />}>
                  WhatsApp us
                </ButtonLink>
                <ButtonLink href={socials.instagramDm} variant="outline" icon={<InstagramIcon size={18} />}>
                  Instagram DM
                </ButtonLink>
              </div>
            </div>
            <ol className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
              {steps.map((s) => (
                <li key={s.n} className="border-t border-line pt-6">
                  <span className="text-sm tracking-widest text-blaze">{s.n}</span>
                  <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-bone/60">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
