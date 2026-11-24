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
    <article>
      <Container className="pt-6 sm:pt-10">
        <Link href="/culture" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-bone">
          <ArrowLeft className="size-4" /> All stories
        </Link>
        <header className="mx-auto max-w-3xl py-10 text-center sm:py-14">
          <p className="text-white/50">
            {story.kicker} · {formatDate(story.date)} · {story.readTime} read
          </p>
          <h1 className="display mt-4 text-[clamp(2.75rem,7vw,5.5rem)]">{story.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-bone/75">{story.excerpt}</p>
        </header>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-coal sm:aspect-[16/8]">
          <Image src={story.cover} alt={story.title} fill preload sizes="100vw" className="object-cover" />
        </div>
      </Container>

      <Container>
        <div className="mx-auto max-w-2xl space-y-5 py-14 text-lg leading-relaxed text-bone/85 sm:py-20">
          {story.body.map((block, i) => {
            switch (block.type) {
              case "h":
                return (
                  <h2 key={i} className="!mt-10 text-2xl font-medium text-bone">
                    {block.text}
                  </h2>
                );
              case "quote":
                return (
                  <blockquote key={i} className="!my-10 border-l-4 border-blaze pl-6 text-3xl font-medium leading-snug text-bone">
                    “{block.text}”
                  </blockquote>
                );
              case "list":
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6">
                    {block.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              default:
                return <p key={i}>{block.text}</p>;
            }
          })}
          <div className="!mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-8">
            <ButtonLink href="/shop">Shop the drop</ButtonLink>
            <ButtonLink href="/culture" variant="outline">
              More stories
            </ButtonLink>
          </div>
        </div>
      </Container>

      <section className="border-t border-white/10 py-14" aria-labelledby="more-title">
        <Container>
          <h2 id="more-title" className="mb-6 text-2xl font-medium tracking-tight sm:text-[1.75rem]">
            Keep Reading
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-4">
            {more.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Container>
      </section>
      <JsonLd data={articleJsonLd} />
    </article>
  );
}
