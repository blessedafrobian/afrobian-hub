import Link from "next/link";
import { mainNav, site, socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { Container, Marquee } from "@/components/ui/primitives";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { NewsletterForm } from "./newsletter-form";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink text-bone">
      <div className="border-y border-bone/10 bg-blaze py-3 text-ink">
        <Marquee
          className="display text-2xl sm:text-3xl"
          items={["Order on WhatsApp", "DM on Instagram", "Made in Morocco spirit", "Worn worldwide", "Creators first"]}
          duration={40}
        />
      </div>

      <Container className="relative z-[2] grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <p className="label mb-4 text-blaze">Newsletter</p>
          <p className="display mb-6 text-5xl sm:text-6xl">
            First in line.
            <br />
            <span className="font-serif text-[0.85em] normal-case italic tracking-normal text-bone/80">every drop, every story.</span>
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          <div>
            <p className="label mb-5 text-bone/50">Explore</p>
            <ul className="space-y-2.5">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm font-medium transition-colors hover:text-blaze">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-5 text-bone/50">Order</p>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href={generalWhatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blaze">
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={socials.instagramDm} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blaze">
                  <InstagramIcon size={16} /> Instagram DM
                </a>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-blaze">
                  How ordering works
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="label mb-5 text-bone/50">Follow</p>
            <div className="flex gap-2">
              {[
                { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: socials.tiktok, label: "TikTok", Icon: TikTokIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="grid size-12 place-items-center border border-bone/20 transition-colors hover:border-blaze hover:bg-blaze hover:text-ink"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-bone/60">{site.shipping}</p>
          </div>
        </div>
      </Container>

      <div className="relative z-[2] select-none overflow-hidden px-2" aria-hidden>
        <p className="display translate-y-[0.14em] whitespace-nowrap text-center text-[17.5vw] leading-none text-bone">
          AFROBIAN<span className="text-blaze">HUB</span>
        </p>
      </div>

      <Container className="relative z-[2] flex flex-col gap-2 border-t border-bone/10 py-6 text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© <CurrentYear /> {site.name}. All rights reserved.</p>
        <p className="label">Morocco ⟶ World</p>
      </Container>
    </footer>
  );
}
