import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { genderLabel, getProduct, products, relatedProducts, categories } from "@/lib/products";
import { formatPrice } from "@/lib/order";
import { site } from "@/lib/site";
import { Badge, Container, Marquee } from "@/components/ui/primitives";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { ProductCard } from "@/components/shop/product-card";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal } from "@/components/ui/motion";

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

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);
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

  return (
    <>
      <section className="bg-ink pb-20 pt-20 sm:pt-24">
        <Container>
          <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2 py-5 text-bone/50">
            <Link href="/shop" className="hover:text-blaze">
              Shop
            </Link>
            <span>/</span>
            <Link href={product.gender === "women" ? "/women" : "/men"} className="hover:text-blaze">
              {genderLabel[product.gender]}
            </Link>
            <span>/</span>
            <span className="text-bone" aria-current="page">
              {product.name}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge tone="bone">{product.collection}</Badge>
                  {product.badge && !product.soldOut && <Badge>{product.badge}</Badge>}
                  {product.soldOut && <Badge tone="ink" className="border border-bone/30">Sold out</Badge>}
                </div>
                <h1 className="display text-5xl sm:text-6xl">{product.name}</h1>
                <div className="mt-4 flex items-baseline gap-3">
                  <p className="font-mono text-2xl font-bold text-blaze">{formatPrice(product.price)}</p>
                  {product.compareAtPrice && <p className="font-mono text-bone/40 line-through">{formatPrice(product.compareAtPrice)}</p>}
                  <p className="label ml-auto text-bone/40">Ref. {product.sku}</p>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-bone/75">{product.description}</p>

                <div className="mt-8">
                  <ProductPurchase product={product} />
                </div>

                <div className="mt-8 divide-y divide-bone/10 border-y border-bone/10">
                  <details className="group py-4" open>
                    <summary className="label flex cursor-pointer list-none items-center justify-between font-bold">
                      Details
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-4 space-y-2 text-bone/75">
                      {product.details.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 bg-blaze" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <details className="group py-4">
                    <summary className="label flex cursor-pointer list-none items-center justify-between font-bold">
                      How ordering works
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ol className="mt-4 list-decimal space-y-2 pl-5 text-bone/75">
                      <li>Choose your colour and size, then tap “Order on WhatsApp”.</li>
                      <li>Your order details are prefilled — add your city and send.</li>
                      <li>The team confirms stock, delivery cost and payment with you directly.</li>
                    </ol>
                  </details>
                  <details className="group py-4">
                    <summary className="label flex cursor-pointer list-none items-center justify-between font-bold">
                      Care
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-bone/75">Wash cold inside out, hang dry, don&apos;t iron prints. Treat it right and it lasts for years.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-y border-ink bg-blaze py-3 text-ink" aria-hidden>
        <Marquee items={[product.name, product.collection, "Order on WhatsApp"]} className="display text-3xl" duration={30} />
      </div>

      {related.length > 0 && (
        <section className="bg-ink py-20 sm:py-28" aria-labelledby="related-title">
          <Container>
            <h2 id="related-title" className="display mb-10 text-5xl sm:text-7xl">
              Complete <span className="text-blaze">the fit</span>
            </h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <JsonLd data={productJsonLd} />
    </>
  );
}
