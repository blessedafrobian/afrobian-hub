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
        eyebrow="Creators"
        title="The Crew"
        intro={<p>Dancers, stylists, photographers, DJs. Every creator gets a profile with their story, their picks from each drop and direct links to follow them.</p>}
      >
        <p className="rounded-xl bg-mist p-5 text-[0.95rem] text-mute">
          We&apos;re onboarding our first roster. The profiles below are <strong className="font-medium text-ink">placeholder slots</strong> — no real accounts are linked yet.
        </p>
      </PageHero>

      <section className="pb-16">
        <Container>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 lg:grid-cols-3">
            {creators.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.06}>
                <CreatorCard creator={c} sizes="(max-width: 1024px) 50vw, 33vw" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="rounded-2xl bg-blaze px-6 py-12 sm:px-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <h2 className="display text-6xl sm:text-8xl lg:col-span-7">Join the roster</h2>
              <div className="lg:col-span-5">
                <p className="mb-6 text-lg">Dance, style, shoot, mix, skate or speak? Send us your work — we&apos;re building profiles, drops and stories around real creators.</p>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink href={socials.instagramDm} icon={<InstagramIcon size={18} />}>
                    Pitch on Instagram
                  </ButtonLink>
                  <ButtonLink href={whatsappLink(`Hi ${site.name} — I'm a creator and I'd like to join the roster.`)} variant="light" icon={<WhatsAppIcon size={18} />}>
                    WhatsApp
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
