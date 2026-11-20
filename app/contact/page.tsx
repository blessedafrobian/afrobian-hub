import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Plus } from "lucide-react";
import { site, socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/primitives";
import { ContactForm } from "@/components/layout/contact-form";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata: Metadata = {
  title: "Contact & How to Order",
  description: "Contact AFROBIAN HUB on WhatsApp, Instagram or email. How ordering, delivery and sizing work.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "WhatsApp", sub: "Orders · sizing · delivery", href: generalWhatsappLink, Icon: WhatsAppIcon, primary: true },
  { label: "Instagram", sub: `@${site.instagramHandle} · DMs open`, href: socials.instagramDm, Icon: InstagramIcon },
  { label: "TikTok", sub: `@${site.tiktokHandle}`, href: socials.tiktok, Icon: TikTokIcon },
  { label: "Email", sub: site.email, href: `mailto:${site.email}`, Icon: Mail },
];

const faq = [
  { q: "How do I order?", a: "Open a product, pick your colour and size, then tap “Order on WhatsApp”. Your order details are prefilled — add your city and send. You can also DM us on Instagram." },
  { q: "How do I pay?", a: "Payment options are confirmed in the chat once stock and delivery are confirmed. Never pay before the team has confirmed your order." },
  { q: "Do you deliver outside Morocco?", a: "We ship across Morocco, and worldwide on request. Message us with your country and we'll quote delivery." },
  { q: "How do sizes fit?", a: "Most tops are cut oversized/boxy. Each product page has fit notes — and the team can help you choose in the chat." },
  { q: "Can I exchange a size?", a: "Message us as soon as you receive your order and we'll work it out with you. Full exchange policy coming soon." },
  { q: "I'm a creator — how do I join?", a: "Send your work on Instagram or WhatsApp. We're building our first roster now." },
];

export default function ContactPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <PageHero
        index="Contact"
        eyebrow="Talk to us"
        title="Hit us"
        outline="up."
        tone="blaze"
        intro={<p>Orders, sizing, delivery, collabs — everything happens in the chat. We usually reply the same day.</p>}
      >
        <p className="label flex items-center gap-2">
          <MapPin className="size-4" /> {site.baseLocation} · {site.shipping}
        </p>
      </PageHero>

      <section className="bg-ink py-16 sm:py-24">
        <Container>
          <ul className="grid gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ label, sub, href, Icon, primary }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group flex h-full min-h-56 flex-col justify-between p-6 transition-colors sm:p-8 ${primary ? "bg-blaze text-ink hover:bg-bone" : "bg-ink hover:bg-coal"}`}
                >
                  <div className="flex items-start justify-between">
                    <Icon size={32} />
                    <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <div>
                    <p className="display text-4xl sm:text-5xl">{label}</p>
                    <p className={`mt-2 break-all font-mono text-xs ${primary ? "text-ink/70" : "text-bone/60"}`}>{sub}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-bone py-20 text-ink sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label mb-4 text-ink/60">Write to us</p>
            <h2 className="display text-huge">
              Send a <span className="text-blaze-deep">message</span>
            </h2>
            <p className="mt-6 text-ink/70">Fill this in and we&apos;ll open WhatsApp with your message ready to go.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 bg-ink py-20 sm:py-28" aria-labelledby="faq-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label mb-4 text-blaze">FAQ</p>
            <h2 id="faq-title" className="display text-huge">
              How it <span className="text-outline-bone">works</span>
            </h2>
          </div>
          <div className="divide-y divide-bone/10 border-y border-bone/10 lg:col-span-7 lg:col-start-6">
            {faq.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold uppercase tracking-tight sm:text-2xl">
                  {f.q}
                  <Plus className="size-6 shrink-0 text-blaze transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-4 max-w-2xl text-bone/70">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <JsonLd data={faqJsonLd} />
    </>
  );
}
