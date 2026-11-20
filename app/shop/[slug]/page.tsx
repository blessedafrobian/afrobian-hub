import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { genderLabel, getProduct, products, relatedProducts, categories } from "@/lib/products";
import { formatPrice } from "@/lib/order";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { Carousel } from "@/components/ui/carousel";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { ProductCard, productSubtitle } from "@/components/shop/product-card";
import { JsonLd } from "@/components/ui/json-ld";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: `${product.description} Order on WhatsApp or Instagram.`,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: product.name, description: product.description, images: [{ url: product.images[0], alt: product.name }] },
  };
}

function Accordion({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group border-b border-line py-5" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
        {title}
        <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-4 text-[0.95rem] leading-relaxed">{children}</div>
    </details>
  );
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 8);
  const category = categories.find((c) => c.id === product.category)?.label;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i}`),
    brand: { "@type": "Brand", name: site.name },
    category,
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: product.price,
      availability: product.soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
    },
  };

  const highlight = product.soldOut ? "Sold out" : product.badge === "New" ? "Just in" : product.badge;

  return (
    <>
      <Container className="pb-16 pt-6 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-mute">
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <Link href={product.gender === "women" ? "/women" : "/men"} className="hover:text-ink">
            {genderLabel[product.gender]}
          </Link>
          <span>/</span>
          <span className="text-ink" aria-current="page">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <ProductGallery images={product.images} name={product.name} />
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
            {highlight && <p className={product.soldOut ? "font-medium text-mute" : "font-medium text-blaze-deep"}>{highlight}</p>}
            <h1 className="mt-1 text-3xl font-medium leading-tight tracking-tight">{product.name}</h1>
            <p className="mt-1 text-lg">{productSubtitle(product)}</p>
            <p className="mt-4 text-xl font-medium">{formatPrice(product.price)}</p>

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            <p className="mt-10 leading-relaxed">{product.description}</p>
            <ul className="mt-4 space-y-1 text-[0.95rem]">
              <li>• Colour shown: {product.colors.map((c) => c.name).join(", ")}</li>
              <li>• Style: {product.sku}</li>
              <li>• {product.collection}</li>
            </ul>

            <div className="mt-8 border-t border-line">
              <Accordion title="Details" open>
                <ul className="space-y-1.5">
                  {product.details.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="How ordering works">
                <ol className="list-decimal space-y-1.5 pl-5">
                  <li>Choose your size, then tap “Order on WhatsApp”.</li>
                  <li>Your order details are prefilled — add your city and send.</li>
                  <li>We confirm stock, delivery cost and payment with you directly.</li>
                </ol>
              </Accordion>
              <Accordion title="Care">
                <p>Wash cold inside out, hang dry, don&apos;t iron prints.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="pb-20" aria-label="You might also like">
          <Carousel title="You Might Also Like" itemClassName="w-[60vw] sm:w-[36vw] lg:w-[24vw] xl:w-[20vw]">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} sizes="(max-width: 640px) 60vw, 24vw" />
            ))}
          </Carousel>
        </section>
      )}

      <JsonLd data={productJsonLd} />
    </>
  );
}
