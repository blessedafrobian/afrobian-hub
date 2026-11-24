import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { creators, getCreator } from "@/lib/creators";
import { getProduct, type Product } from "@/lib/products";
import { Container } from "@/components/ui/primitives";
import { SocialLinks } from "@/components/creators/social-links";
import { ProductCard } from "@/components/shop/product-card";

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
      <Container className="pb-16 pt-6 sm:pt-10">
        <Link href="/creators" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-bone">
          <ArrowLeft className="size-4" /> All creators
        </Link>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-coal">
              <Image src={creator.portrait} alt={`${creator.name} — placeholder portrait`} fill preload sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="font-medium text-white/50">
              {creator.slot} · {creator.discipline} · {creator.city}
            </p>
            <h1 className="display mt-2 text-[clamp(3.5rem,9vw,7rem)]">{creator.name}</h1>
            <p className="mt-4 text-2xl">“{creator.tagline}”</p>

            <div className="mt-6 space-y-4 text-lg leading-relaxed text-bone/80">
              {creator.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {creator.tags.map((t) => (
                <span key={t} className="rounded-full bg-coal px-4 py-1.5 text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-5">
              {creator.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-sm text-white/50">{s.label}</dt>
                  <dd className="mt-1 font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="mb-3 font-medium">Follow</p>
              <SocialLinks socials={creator.socials} />
              {creator.isPlaceholder && <p className="mt-3 text-sm text-white/50">Placeholder profile — social links will be added once the creator joins.</p>}
            </div>
          </div>
        </div>
      </Container>

      {picks.length > 0 && (
        <section className="pb-16" aria-labelledby="picks-title">
          <Container>
            <h2 id="picks-title" className="mb-6 text-2xl font-medium tracking-tight sm:text-[1.75rem]">
              {creator.name}&apos;s Picks
            </h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 lg:grid-cols-3">
              {picks.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <nav aria-label="More creators" className="border-t border-white/10">
        <Container className="grid grid-cols-2 py-8">
          <Link href={`/creators/${prev.slug}`} className="group flex items-center gap-3">
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-sm text-white/50">Previous</span>
              <span className="text-lg font-medium">{prev.name}</span>
            </span>
          </Link>
          <Link href={`/creators/${next.slug}`} className="group flex items-center justify-end gap-3 text-right">
            <span>
              <span className="block text-sm text-white/50">Next</span>
              <span className="text-lg font-medium">{next.name}</span>
            </span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </nav>
    </>
  );
}
