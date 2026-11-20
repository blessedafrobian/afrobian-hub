import Link from "next/link";
import Image from "next/image";
import { categories, genderLabel, type Product } from "@/lib/products";
import { formatPrice, productWhatsappLink } from "@/lib/order";
import { site } from "@/lib/site";
import { cn } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const singular: Record<string, string> = {
  hoodies: "Hoodie",
  tees: "T-Shirt",
  pants: "Pants",
  outerwear: "Jacket",
  shorts: "Shorts",
  accessories: "Accessory",
};

export function productSubtitle(p: Product) {
  if (p.category === "accessories") return categories.find((c) => c.id === p.category)?.label.replace(/s$/, "") ?? "";
  return `${genderLabel[p.gender]}'s ${singular[p.category]}`.replace("Unisex's", "Unisex");
}

export function ProductCard({
  product,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  preload,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const href = `/shop/${product.slug}`;
  const highlight = product.soldOut ? "Sold out" : product.badge === "New" ? "Just in" : product.badge;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative">
        <Link href={href} className="relative block overflow-hidden bg-mist" aria-label={`${product.name} — ${formatPrice(product.price)}`}>
          <div className="relative aspect-square w-full">
            <Image src={product.images[0]} alt={product.name} fill sizes={sizes} preload={preload} className="object-cover" />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt=""
                aria-hidden
                fill
                sizes={sizes}
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
        {!product.soldOut && (
          <a
            href={productWhatsappLink(product, {}, `${site.url}${href}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            className="absolute bottom-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm transition-all duration-200 hover:bg-ink hover:text-white lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
          >
            <WhatsAppIcon size={18} />
          </a>
        )}
      </div>

      <div className="pt-3 text-[0.95rem] leading-snug">
        {highlight && <p className={cn("font-medium", product.soldOut ? "text-mute" : "text-blaze-deep")}>{highlight}</p>}
        <h3 className="font-medium">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] lg:after:hidden">
            {product.name}
          </Link>
        </h3>
        <p className="text-mute">{productSubtitle(product)}</p>
        <p className="text-mute">
          {product.colors.length} {product.colors.length === 1 ? "Colour" : "Colours"}
        </p>
        <p className="mt-1.5 font-medium">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
