import type { Product } from "@/lib/products";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/primitives";
import { ShopBrowser } from "./shop-browser";
import { generalWhatsappLink } from "@/lib/order";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export function CollectionPage({
  index,
  eyebrow,
  title,
  outline,
  intro,
  products,
  tone = "dark",
}: {
  index: string;
  eyebrow: string;
  title: string;
  outline?: string;
  intro: string;
  products: Product[];
  tone?: "dark" | "blaze" | "bone";
}) {
  return (
    <>
      <PageHero
        index={index}
        eyebrow={eyebrow}
        title={title}
        outline={outline}
        tone={tone}
        intro={<p>{intro}</p>}
        marquee={["Order on WhatsApp", "Instagram DM", "Shipping across Morocco", "Worldwide on request"]}
      >
        <a
          href={generalWhatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 border border-current/30 p-5 transition-colors hover:border-current"
        >
          <span>
            <span className="label block opacity-60">Need sizing help?</span>
            <span className="mt-1 block text-lg font-bold">Ask the team on WhatsApp</span>
          </span>
          <WhatsAppIcon size={28} />
        </a>
      </PageHero>
      <section className="bg-ink pb-24">
        <Container>
          <ShopBrowser products={products} />
        </Container>
      </section>
    </>
  );
}
