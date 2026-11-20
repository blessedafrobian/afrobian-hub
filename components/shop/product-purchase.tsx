"use client";

import { useState } from "react";
import { Minus, Plus, Truck, MessageCircle, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice, productOrderMessage, whatsappLink } from "@/lib/order";
import { site, socials } from "@/lib/site";
import { cn } from "@/components/ui/primitives";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

export function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState<string | undefined>(product.sizes.length === 1 ? product.sizes[0] : undefined);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const pageUrl = `${site.url}/shop/${product.slug}`;
  const message = productOrderMessage(product, { size, color, quantity: qty }, pageUrl);
  const waHref = whatsappLink(message);

  async function copyForInstagram() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable — DM link still opens */
    }
  }

  return (
    <div className="space-y-8">
      {/* colour */}
      <fieldset>
        <legend className="label mb-3 flex w-full justify-between text-bone/60">
          <span>Colour</span>
          <span className="text-bone">{color}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              aria-pressed={color === c.name}
              aria-label={c.name}
              className={cn("grid size-11 place-items-center border-2 transition-colors", color === c.name ? "border-blaze" : "border-bone/15 hover:border-bone/50")}
            >
              <span className="size-7 ring-1 ring-bone/20" style={{ backgroundColor: c.hex }} />
            </button>
          ))}
        </div>
      </fieldset>

      {/* size */}
      <fieldset>
        <legend className="label mb-3 flex w-full justify-between text-bone/60">
          <span>Size</span>
          <span className={cn(sizeError && !size ? "text-blaze" : "text-bone")}>{size ?? (sizeError ? "Pick a size ↓" : "Select")}</span>
        </legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s);
                setSizeError(false);
              }}
              aria-pressed={size === s}
              disabled={product.soldOut}
              className={cn(
                "h-12 border font-mono text-sm font-bold transition-colors disabled:opacity-30",
                product.sizes.length === 1 && "col-span-2",
                size === s ? "border-blaze bg-blaze text-ink" : "border-bone/20 hover:border-bone",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-bone/60">{product.fit}</p>
      </fieldset>

      {/* quantity */}
      <div className="flex items-center justify-between border-y border-bone/10 py-4">
        <span className="label text-bone/60">Quantity</span>
        <div className="flex items-center">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center border border-bone/20 hover:border-bone">
            <Minus className="size-4" />
          </button>
          <span className="w-12 text-center font-mono font-bold" aria-live="polite">
            {qty}
          </span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid size-10 place-items-center border border-bone/20 hover:border-bone">
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      {/* CTAs */}
      {product.soldOut ? (
        <div className="space-y-3">
          <p className="display text-3xl text-bone/60">Sold out</p>
          <a
            href={whatsappLink(`Hi ${site.name} — please let me know if the ${product.name} (${product.sku}) gets restocked.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="label flex h-14 w-full items-center justify-center gap-3 border border-bone/30 font-bold transition-colors hover:border-blaze hover:bg-blaze hover:text-ink"
          >
            <WhatsAppIcon size={18} /> Notify me on restock
          </a>
        </div>
      ) : (
        <div className="space-y-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!size) {
                e.preventDefault();
                setSizeError(true);
              }
            }}
            className="label flex h-16 w-full items-center justify-center gap-3 bg-blaze text-[0.8rem] font-bold text-ink transition-colors hover:bg-bone"
          >
            <WhatsAppIcon size={20} /> Order on WhatsApp — {formatPrice(product.price * qty)}
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={socials.instagramDm}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyForInstagram}
              className="label flex h-12 items-center justify-center gap-2 border border-bone/30 font-bold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              <InstagramIcon size={16} /> {copied ? "Order copied ✓" : "DM on Instagram"}
            </a>
            <a
              href={whatsappLink(`Hi ${site.name} — I have a question about the ${product.name} (${product.sku}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="label flex h-12 items-center justify-center gap-2 border border-bone/30 font-bold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              <MessageCircle className="size-4" /> Ask a question
            </a>
          </div>
          <p className="pt-1 text-xs text-bone/50">Instagram button copies your order details so you can paste them in the DM.</p>
        </div>
      )}

      <ul className="grid gap-3 text-sm text-bone/70">
        <li className="flex items-center gap-3">
          <Truck className="size-4 text-blaze" /> {site.shipping}
        </li>
        <li className="flex items-center gap-3">
          <ShieldCheck className="size-4 text-blaze" /> Confirm size, stock &amp; delivery with the team before paying
        </li>
      </ul>
    </div>
  );
}
