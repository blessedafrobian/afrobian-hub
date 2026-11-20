import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getStory, stories, storiesByDate } from "@/lib/stories";
import { site } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { StoryCard } from "@/components/culture/story-card";
import { JsonLd } from "@/components/ui/json-ld";
import { RevealLines } from "@/components/ui/motion";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/culture/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/culture/${story.slug}` },
    openGraph: { type: "article", publishedTime: story.date, images: [{ url: story.cover, alt: story.title }] },
  };
}

export default async function StoryPage({ params }: PageProps<"/culture/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const more = storiesByDate()
    .filter((s) => s.slug !== story.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt,
    datePublished: story.date,
    image: `${site.url}${story.cover}`,
    author: { "@type": "Organization", name: story.author },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article className="bg-bone text-ink">
      <header className="pt-20 sm:pt-24">
        <Container>
          <Link href="/culture" className="label inline-flex items-center gap-2 py-5 text-ink/60 hover:text-blaze-deep">
            <ArrowLeft className="size-4" /> Culture
          </Link>
          <div className="mx-auto max-w-5xl pb-10 pt-4 text-center">
            <p className="label mb-6">
              <span className="bg-blaze px-2 py-1 font-bold">{story.kicker}</span>
              <span className="ml-3 text-ink/60">
                {formatDate(story.date)} · {story.readTime} read · {story.author}
              </span>
            </p>
            <h1 className="display text-[clamp(2.75rem,8vw,7.5rem)]">
              <RevealLines lines={[story.title]} />
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-ink/75 sm:text-3xl">{story.excerpt}</p>
          </div>
        </Container>
        <div className="relative mx-auto aspect-[16/10] w-full max-w-[1600px] sm:aspect-[16/8]">
          <Image src={story.cover} alt={story.title} fill preload sizes="100vw" className="object-cover" />
        </div>
      </header>

      <Container>
        <div className="prose-afb mx-auto max-w-2xl py-16 text-lg leading-relaxed text-ink/85 sm:py-24 sm:text-xl">
          {story.body.map((block, i) => {
            switch (block.type) {
              case "h":
                return (
                  <h2 key={i} className="display !mt-12 text-4xl text-ink">
                    {block.text}
                  </h2>
                );
              case "quote":
                return (
                  <blockquote key={i} className="!my-12 border-l-4 border-blaze pl-6 font-serif text-3xl italic leading-tight text-ink sm:-mx-16 sm:text-5xl">
                    “{block.text}”
                  </blockquote>
                );
              case "list":
                return (
                  <ul key={i} className="space-y-3">
                    {block.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-3 size-2 shrink-0 bg-blaze" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return (
                  <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-blaze-deep" : ""}>
                    {block.text}
                  </p>
                );
            }
          })}
          <div className="!mt-14 flex flex-wrap items-center gap-3 border-t border-ink/15 pt-8">
            <ButtonLink href="/shop" variant="ink">
              Shop the drop
            </ButtonLink>
            <ButtonLink href="/culture" variant="outline-ink">
              More stories
            </ButtonLink>
          </div>
        </div>
      </Container>

      <section className="border-t border-ink/15 py-20" aria-labelledby="more-title">
        <Container>
          <h2 id="more-title" className="display mb-10 text-5xl sm:text-6xl">
            Keep <span className="text-blaze-deep">reading</span>
          </h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {more.map((s) => (
              <StoryCard key={s.slug} story={s} tone="light" />
            ))}
          </div>
        </Container>
      </section>
      <JsonLd data={articleJsonLd} />
    </article>
  );
}
