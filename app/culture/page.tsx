import type { Metadata } from "next";
import { storiesByDate } from "@/lib/stories";
import { PageHero } from "@/components/layout/page-hero";
import { StoryCard } from "@/components/culture/story-card";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Culture — Stories",
  description: "Lifestyle, fashion and urban culture from AFROBIAN HUB: style guides, street notes, sound and creator stories.",
  alternates: { canonical: "/culture" },
};

export default function CulturePage() {
  const [lead, ...rest] = storiesByDate();
  return (
    <>
      <PageHero eyebrow="Culture" title="Stories" intro={<p>Style guides, street notes, sound and the creator economy — written from Morocco, read everywhere.</p>} />
      <section className="pb-20">
        <Container>
          <Reveal>
            <StoryCard story={lead} variant="lead" />
          </Reveal>
          <div className="mt-14 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
