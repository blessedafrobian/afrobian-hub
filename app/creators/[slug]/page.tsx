import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { creators, getCreator } from "@/lib/creators";
import { getProduct, type Product } from "@/lib/products";
import { Container, Marquee } from "@/components/ui/primitives";
import { SocialLinks } from "@/components/creators/social-links";
import { ProductCard } from "@/components/shop/product-card";
import { Reveal, RevealLines } from "@/components/ui/motion";

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) return { title: "Creator not found" };
  return {
    title: `${creator.name} — ${creator.discipline}`,
    description: `${creator.tagline} ${creator.bio[0]}`,
    alternates: { canonical: `/creators/${creator.slug}` },
    openGraph: { images: [{ url: creator.portrait, alt: creator.name }] },
  };
}

export default async function CreatorPage({ params }: PageProps<"/creators/[slug]">) {
  const { slug } = await params;
  const creator = getCreator(slug);
  if (!creator) notFound();

  const picks = creator.picks.map(getProduct).filter((p): p is Product => Boolean(p));
  const idx = creators.findIndex((c) => c.slug === creator.slug);
  const prev = creators[(idx - 1 + creators.length) % creators.length];
  const next = creators[(idx + 1) % creators.length];

  return (
    <>
      <section className="grain relative overflow-hidden bg-ink pt-20 sm:pt-24">
        <Container className="relative z-[2]">
          <Link href="/creators" className="label inline-flex items-center gap-2 py-5 text-bone/60 hover:text-blaze">
            <ArrowLeft className="size-4" /> All creators
          </Link>

          <div className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-14">
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-coal">
                <Image src={creator.portrait} alt={`${creator.name} — placeholder portrait`} fill preload sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <span className="label absolute -bottom-4 left-4 rotate-[-2deg] bg-blaze px-3 py-2 font-bold text-ink">{creator.slot}</span>
            </div>

            <div className="flex flex-col lg:col-span-7">
              <p className="label mb-4 text-blaze">
                {creator.discipline} · {creator.city}
              </p>
              <h1 className="display text-giga">
                <RevealLines lines={creator.name.split(" ")} />
              </h1>
              <p className="mt-6 font-serif text-3xl italic text-bone/85 sm:text-4xl">“{creator.tagline}”</p>

              <div className="mt-8 space-y-4 text-lg leading-relaxed text-bone/75">
                {creator.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {creator.tags.map((t) => (
                  <span key={t} className="label border border-bone/20 px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>

              <dl className="mt-10 grid grid-cols-3 border-y border-bone/10">
                {creator.stats.map((s) => (
                  <div key={s.label} className="border-r border-bone/10 py-4 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
                    <dt className="label text-bone/50">{s.label}</dt>
                    <dd className="mt-1 font-bold">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <p className="label mb-4 text-bone/60">Follow</p>
                <SocialLinks socials={creator.socials} />
                {creator.isPlaceholder && (
                  <p className="mt-4 text-sm text-bone/50">This is a placeholder profile. Social links will be added once the creator joins the roster.</p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-bone py-3 text-ink" aria-hidden>
        <Marquee items={[creator.name, creator.discipline, creator.city, "AFROBIAN HUB creators"]} className="display text-3xl" duration={32} />
      </div>

      {picks.length > 0 && (
        <section className="bg-ink py-20 sm:py-28" aria-labelledby="picks-title">
          <Container>
            <h2 id="picks-title" className="display mb-10 text-5xl sm:text-7xl">
              Styled <span className="text-blaze">picks</span>
            </h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3">
              {picks.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <nav aria-label="More creators" className="grid border-t border-bone/10 bg-ink sm:grid-cols-2">
        <Link href={`/creators/${prev.slug}`} className="group flex items-center gap-4 border-b border-bone/10 p-6 transition-colors hover:bg-coal sm:border-b-0 sm:border-r sm:p-10">
          <ArrowLeft className="size-6 text-blaze transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="label block text-bone/50">Previous</span>
            <span className="display text-3xl sm:text-5xl">{prev.name}</span>
          </span>
        </Link>
        <Link href={`/creators/${next.slug}`} className="group flex items-center justify-end gap-4 p-6 text-right transition-colors hover:bg-coal sm:p-10">
          <span>
            <span className="label block text-bone/50">Next</span>
            <span className="display text-3xl sm:text-5xl">{next.name}</span>
          </span>
          <ArrowRight className="size-6 text-blaze transition-transform group-hover:translate-x-1" />
        </Link>
      </nav>
    </>
  );
}
