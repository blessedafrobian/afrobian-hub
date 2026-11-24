import type { Metadata } from "next";
import { ArrowUpRight, ChevronDown, Mail } from "lucide-react";
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
  { label: "Instagram", sub: `@${site.instagramHandle}`, href: socials.instagramDm, Icon: InstagramIcon },
  { label: "TikTok", sub: `@${site.tiktokHandle}`, href: socials.tiktok, Icon: TikTokIcon },
  { label: "Email", sub: site.email, href: `mailto:${site.email}`, Icon: Mail },
];

const faq = [
  { q: "How do I order?", a: "Open a product, pick your size, then tap “Order on WhatsApp”. Your order details are prefilled — add your city and send. You can also DM us on Instagram." },
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
      <PageHero eyebrow="Contact" title="Get Help" intro={<p>Orders, sizing, delivery, collabs — everything happens in the chat. We usually reply the same day.</p>} />

      <section className="pb-16">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ label, sub, href, Icon, primary }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group flex h-full min-h-44 flex-col justify-between rounded-xl p-6 transition-colors ${primary ? "bg-blaze text-ink hover:bg-blaze-deep" : "bg-coal hover:bg-line"}`}
                >
                  <div className="flex items-start justify-between">
                    <Icon size={28} />
                    <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <div>
                    <p className="text-xl font-medium">{label}</p>
                    <p className={`mt-1 break-all text-sm ${primary ? "text-white/70" : "text-white/50"}`}>{sub}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-white/10 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-medium tracking-tight sm:text-[1.75rem]">Send us a message</h2>
            <p className="mt-3 text-white/50">Fill this in and we&apos;ll open WhatsApp with your message ready to go.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20" aria-labelledby="faq-title">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="faq-title" className="text-2xl font-medium tracking-tight sm:text-[1.75rem] lg:col-span-4">
            Frequently Asked Questions
          </h2>
          <div className="border-t border-white/10 lg:col-span-7 lg:col-start-6">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-white/10 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                  {f.q}
                  <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 max-w-2xl text-bone/75">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <JsonLd data={faqJsonLd} />
    </>
  );
}
