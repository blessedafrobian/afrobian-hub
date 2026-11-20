import type { Metadata } from "next";
import { creators } from "@/lib/creators";
import { site, socials } from "@/lib/site";
import { whatsappLink } from "@/lib/order";
import { PageHero } from "@/components/layout/page-hero";
import { CreatorCard } from "@/components/creators/creator-card";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

export const metadata: Metadata = {
  title: "Creators",
  description: "Meet the AFROBIAN HUB creator roster — dancers, stylists, photographers, DJs and more, with direct links to their Instagram and TikTok.",
  alternates: { canonical: "/creators" },
};

export default function CreatorsPage() {
  return (
    <>
      <PageHero
        index="Creators"
        eyebrow="The crew · roster in progress"
        title="The crew"
        outline="makes culture."
        intro={
          <p>
            AFROBIAN HUB is built around the people who make things. Every creator gets a profile with their story, their picks from each drop and direct links to follow them.
          </p>
        }
      >
        <div className="border border-dashed border-bone/25 p-5 text-sm text-bone/70">
          <p className="label mb-2 text-blaze">Note</p>
          We&apos;re onboarding our first roster. The profiles below are <strong className="text-bone">placeholder slots</strong> — no real accounts are linked yet.
        </div>
      </PageHero>

      <section className="bg-ink pb-24 pt-6">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {creators.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:mt-16" : ""}>
                <CreatorCard creator={c} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="grain relative overflow-hidden bg-blaze py-20 text-ink sm:py-28">
        <Container className="relative z-[2] grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label mb-5">Open call</p>
            <h2 className="display text-giga">
              Join the <span className="text-outline-ink">roster.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="mb-6 text-lg text-ink/80">
              Dance, style, shoot, mix, skate or speak? Send us your work — we&apos;re building profiles, drops and stories around real creators.
            </p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={socials.instagramDm} variant="ink" size="lg" icon={<InstagramIcon size={18} />}>
                Pitch on Instagram
              </ButtonLink>
              <ButtonLink href={whatsappLink(`Hi ${site.name} — I'm a creator and I'd like to join the roster.`)} variant="outline-ink" size="lg" icon={<WhatsAppIcon size={18} />}>
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
