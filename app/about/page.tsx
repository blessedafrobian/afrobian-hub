import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/motion";
import { socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

export const metadata: Metadata = {
  title: "About",
  description: "AFROBIAN HUB turns the words a 530K+ community lives by into heavyweight streetwear. Born in Morocco, worn everywhere.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Words first", d: "Every drop starts with a line our community lived through — then we design around it." },
  { t: "Heavy by default", d: "Thick fabrics and considered cuts. Pieces that hold their shape season after season." },
  { t: "Built here", d: "Designed with a Moroccan eye and made to travel — from Casablanca to the diaspora." },
  { t: "Talk to us", d: "Every order is a conversation. Sizing help, stock checks and delivery, all in one chat." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Afrobian Hub"
        intro={<p>Protect your peace — out loud. We turn the words a community of 530K+ lives by into heavyweight streetwear. Rooted in Morocco, made for anyone who stopped shrinking to fit in.</p>}
      />

      <Container>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-coal sm:aspect-[16/10]">
          <Image src="/media/editorial/about-studio.svg" alt="The Drop 01 collection laid out in the studio" fill sizes="100vw" className="object-cover" />
        </div>
      </Container>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 className="display text-5xl sm:text-7xl lg:col-span-5">
            From the feed <span className="text-blaze">to the fit</span>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-bone/80 lg:col-span-6 lg:col-start-7">
            <p className="text-2xl text-bone">
              Afrobian started as a voice, not a label: honest conversations about love, healing and self-respect, shared every day with hundreds of thousands of people across Morocco and beyond.
            </p>
            <p>
              The same lines kept coming back in the comments and the DMs — the ones people screenshot and send to a sister or a best friend. So we made them permanent: heavyweight hoodies, tees, cargos and caps, released in drops.
            </p>
            <p>Ordering stays personal. You message us on WhatsApp or Instagram, we answer, we deliver. Behind every piece is the same idea: know your worth, guard your energy, and wear it like you mean it.</p>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05} className="rounded-xl bg-coal p-7">
                <p className="text-sm font-medium text-blaze">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-medium">{v.t}</h3>
                <p className="mt-2 text-white/50">{v.d}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 lg:flex-row lg:items-center">
            <h2 className="display text-5xl sm:text-6xl">Say salam</h2>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={generalWhatsappLink} icon={<WhatsAppIcon size={18} />}>
                WhatsApp
              </ButtonLink>
              <ButtonLink href={socials.instagram} variant="outline" icon={<InstagramIcon size={18} />}>
                Instagram
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact page
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
