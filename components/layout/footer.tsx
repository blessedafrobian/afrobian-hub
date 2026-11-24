import Link from "next/link";
import { mainNav, site, socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { Container, Wordmark } from "@/components/ui/primitives";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { NewsletterForm } from "./newsletter-form";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-bone">
      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Wordmark className="text-3xl" />
          <p className="mt-4 max-w-xs text-sm text-white/60">{site.tagline}</p>
          <div className="mt-6 flex gap-2">
            {[
              { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
              { href: socials.tiktok, label: "TikTok", Icon: TikTokIcon },
              { href: generalWhatsappLink, label: "WhatsApp", Icon: WhatsAppIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on ${label}`}
                className="grid size-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-blaze hover:text-ink"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
          <div>
            <p className="mb-4 text-sm font-medium">Explore</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              {mainNav.slice(0, 5).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Help</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/contact#faq" className="hover:text-white">
                  How to order
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-white">
                  Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact#faq" className="hover:text-white">
                  Sizing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Company</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/creators" className="hover:text-white">
                  Become a creator
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-white">
                  Stories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="text-sm font-medium">Get drop alerts</p>
          <p className="mt-1 text-sm text-white/60">New releases, restocks and stories. No spam.</p>
          <NewsletterForm className="mt-4" />
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
        <p>{site.baseLocation} · Worldwide</p>
      </Container>
    </footer>
  );
}
