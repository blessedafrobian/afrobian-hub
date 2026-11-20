import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container, Marquee, Sticker } from "@/components/ui/primitives";
import { Reveal, RevealLines } from "@/components/ui/motion";
import { socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

export const metadata: Metadata = {
  title: "About",
  description: "AFROBIAN HUB is an independent streetwear and creator culture platform from Morocco — clothes, creators and culture, built for the world.",
  alternates: { canonical: "/about" },
};

const values = [
  { k: "01", t: "Built here", d: "Designed with a Moroccan eye — the colours, the heat, the streets — and made to travel." },
  { k: "02", t: "Heavy by default", d: "Thick fabrics and considered cuts. Pieces that hold their shape season after season." },
  { k: "03", t: "Creators first", d: "We put real creators at the centre — profiles, picks and stories, not just tags." },
  { k: "04", t: "Talk to us", d: "Every order is a conversation. Sizing help, stock checks and delivery, all in one chat." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="About"
        eyebrow="Who we are"
        title="Afrobian"
        outline="is a hub."
        intro={
          <p>
            A streetwear label, a creator platform and a culture zine in one place. Rooted in Morocco, connected to Africa and the diaspora, made for anyone who dresses loud.
          </p>
        }
      />

      <section className="relative bg-ink">
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
          <Image src="/media/editorial/about-studio.svg" alt="AFROBIAN HUB studio moodboard (temporary artwork)" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute -bottom-12 right-6 z-10 sm:right-12">
          <Sticker text="Streetwear ✺ Creators ✺ Culture ✺ " />
        </div>
      </section>

      <section className="bg-bone py-24 text-ink sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label mb-5 text-ink/60">The story</p>
            <h2 className="display text-huge">
              <RevealLines lines={["From the", <span key="b" className="text-blaze-deep">block</span>, "to the world."]} />
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink/80 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="font-serif text-3xl italic leading-tight text-ink">
              AFROBIAN HUB started with a simple idea: the streetwear we wanted to wear, and the creators we wanted to see, should live in the same place.
            </p>
            <p>
              We design heavyweight streetwear for men and women — hoodies, tees, cargos, outerwear and accessories — released in drops and capsules. Ordering stays personal: you message us on WhatsApp or Instagram and we handle the rest.
            </p>
            <p>
              Alongside the clothes, the hub features creators — dancers, stylists, photographers, DJs — with their own profiles, and a culture section covering style, music and life in the city.
            </p>
            <p className="label !text-xs text-ink/50">Brand story copy is placeholder text — replace with the founders&apos; own words.</p>
          </div>
        </Container>
      </section>

      <div className="border-y border-ink bg-blaze py-3 text-ink" aria-hidden>
        <Marquee items={["Built here", "Heavy by default", "Creators first", "Talk to us"]} className="display text-3xl sm:text-4xl" duration={30} />
      </div>

      <section className="bg-ink py-24 sm:py-32">
        <Container>
          <div className="grid gap-px bg-bone/10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={(i % 2) * 0.08} className="group bg-ink p-8 transition-colors hover:bg-coal sm:p-12">
                <p className="display text-outline-bone text-7xl transition-colors group-hover:text-blaze group-hover:[-webkit-text-stroke-color:var(--color-blaze)]">{v.k}</p>
                <h3 className="display mt-8 text-4xl">{v.t}</h3>
                <p className="mt-3 max-w-md text-bone/70">{v.d}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-bone/10 pt-12 lg:flex-row lg:items-end">
            <h2 className="display text-huge">
              Say <span className="text-blaze">salam.</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={generalWhatsappLink} size="lg" icon={<WhatsAppIcon size={18} />}>
                WhatsApp
              </ButtonLink>
              <ButtonLink href={socials.instagram} size="lg" variant="outline" icon={<InstagramIcon size={18} />}>
                Instagram
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="ghost">
                Contact page
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
