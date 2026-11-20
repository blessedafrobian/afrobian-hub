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
  description: "AFROBIAN HUB is an independent streetwear and creator culture platform from Morocco — clothes, creators and culture, built for the world.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Built here", d: "Designed with a Moroccan eye — the colours, the heat, the streets — and made to travel." },
  { t: "Heavy by default", d: "Thick fabrics and considered cuts. Pieces that hold their shape season after season." },
  { t: "Creators first", d: "Real creators at the centre — profiles, picks and stories, not just tags." },
  { t: "Talk to us", d: "Every order is a conversation. Sizing help, stock checks and delivery, all in one chat." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Afrobian Hub"
        intro={<p>A streetwear label, a creator platform and a culture magazine in one place. Rooted in Morocco, connected to Africa and the diaspora, made for anyone who dresses loud.</p>}
      />

      <Container>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-mist sm:aspect-[16/10]">
          <Image src="/media/editorial/about-studio.svg" alt="The Drop 01 collection laid out in the studio" fill sizes="100vw" className="object-cover" />
        </div>
      </Container>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 className="display text-5xl sm:text-7xl lg:col-span-5">From the block to the world</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7">
            <p className="text-2xl text-ink">
              AFROBIAN HUB started with a simple idea: the streetwear we wanted to wear, and the creators we wanted to see, should live in the same place.
            </p>
            <p>
              We design heavyweight streetwear for men and women — hoodies, tees, cargos, outerwear and accessories — released in drops. Ordering stays personal: you message us on WhatsApp or Instagram and we handle the rest.
            </p>
            <p>Alongside the clothes, the hub features creators with their own profiles, and stories covering style, music and life in the city.</p>
            <p className="text-sm text-mute">Brand story copy is placeholder text — replace with the founders&apos; own words.</p>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.05} className="rounded-xl bg-mist p-7">
                <p className="text-sm font-medium text-blaze-deep">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-medium">{v.t}</h3>
                <p className="mt-2 text-mute">{v.d}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 lg:flex-row lg:items-center">
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
