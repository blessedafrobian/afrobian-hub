import type { Metadata } from "next";
import { storiesByDate } from "@/lib/stories";
import { PageHero } from "@/components/layout/page-hero";
import { StoryCard } from "@/components/culture/story-card";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Culture — The Zine",
  description: "Lifestyle, fashion and urban culture from AFROBIAN HUB: style guides, street notes, sound and creator stories.",
  alternates: { canonical: "/culture" },
};

export default function CulturePage() {
  const [lead, second, ...rest] = storiesByDate();
  return (
    <>
      <PageHero
        index="Culture"
        eyebrow="The zine · Style · Street · Sound"
        title="Culture"
        outline="the zine."
        tone="bone"
        intro={<p>Style guides, street notes, sound and the creator economy. The editorial side of the hub — written from Morocco, read everywhere.</p>}
      />

      <section className="bg-bone pb-24 text-ink">
        <Container>
          <div className="grid gap-12 border-t border-ink/15 pt-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <StoryCard story={lead} variant="lead" tone="light" />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4">
              <StoryCard story={second} tone="light" />
            </Reveal>
          </div>

          <div className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 0.06}>
                <StoryCard story={s} tone="light" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
