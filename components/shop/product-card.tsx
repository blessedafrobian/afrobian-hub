import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice, productWhatsappLink } from "@/lib/order";
import { site } from "@/lib/site";
import { Badge, cn } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

export function ProductCard({
  product,
  index,
  className,
  size = "md",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  preload,
}: {
  product: Product;
  index?: number;
  className?: string;
  size?: "md" | "lg";
  sizes?: string;
  preload?: boolean;
}) {
  const href = `/shop/${product.slug}`;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative">
      <Link href={href} className="relative block overflow-hidden bg-coal" aria-label={`${product.name} — ${formatPrice(product.price)}`}>
        <div className={cn("relative w-full", size === "lg" ? "aspect-[4/5] lg:aspect-[4/4.6]" : "aspect-[4/5]")}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover transition-[transform,opacity] duration-700 ease-snap group-hover:scale-[1.04]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>

        <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3">
          {product.soldOut ? <Badge tone="ink">Sold out</Badge> : product.badge && <Badge tone={product.badge === "Limited" ? "ink" : "blaze"}>{product.badge}</Badge>}
        </div>
        {typeof index === "number" && (
          <span className="label absolute right-2 top-2 hidden text-bone mix-blend-difference sm:right-3 sm:top-3 sm:block">{String(index + 1).padStart(2, "0")}</span>
        )}
      </Link>
        {!product.soldOut && (
          <a
            href={productWhatsappLink(product, {}, `${site.url}${href}`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            className="absolute bottom-2 right-2 z-10 grid size-10 place-items-center bg-blaze text-ink transition-all duration-300 hover:bg-bone sm:bottom-3 sm:right-3 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
          >
            <WhatsAppIcon size={18} />
          </a>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className={cn("font-bold uppercase leading-tight tracking-tight", size === "lg" ? "text-lg sm:text-xl" : "text-sm sm:text-base")}>
            <Link href={href} className="transition-colors hover:text-blaze">
              {product.name}
            </Link>
          </h3>
          <p className="label mt-1 truncate opacity-60">{product.collection}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:block sm:text-right">
          <p className="font-mono text-sm font-bold">{formatPrice(product.price)}</p>
          {product.colors.length > 1 && (
            <div className="flex gap-1 sm:mt-1.5 sm:justify-end" aria-label={`${product.colors.length} colours`}>
              {product.colors.map((c) => (
                <span key={c.name} title={c.name} className="size-2.5 rounded-full ring-1 ring-current/30" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          )}
        </div>
      </div>

    </article>
  );
}
