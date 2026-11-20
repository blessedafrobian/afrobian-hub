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
      {product.colors.length > 1 && (
        <fieldset>
          <legend className="mb-3 font-medium">Colour: <span className="font-normal text-mute">{color}</span></legend>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-pressed={color === c.name}
                aria-label={c.name}
                className={cn("grid size-12 place-items-center rounded-md border", color === c.name ? "border-ink" : "border-line hover:border-mute")}
              >
                <span className="size-8 rounded-sm ring-1 ring-black/10" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="mb-3 flex w-full justify-between font-medium">
          <span className={cn(sizeError && !size && "text-blaze-deep")}>Select Size</span>
          <a href="/contact#faq" className="font-normal text-mute underline-offset-4 hover:underline">
            Size Guide
          </a>
        </legend>
        <div className={cn("grid grid-cols-3 gap-2 rounded-md", sizeError && !size && "ring-1 ring-blaze-deep ring-offset-4")}>
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
                "h-12 rounded-md border text-[0.95rem] transition-colors disabled:bg-mist disabled:text-mute",
                product.sizes.length === 1 && "col-span-3",
                size === s ? "border-ink" : "border-line hover:border-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        {sizeError && !size && <p className="mt-3 text-sm text-blaze-deep">Pick a size ↓ to continue.</p>}
        <p className="mt-3 text-sm text-mute">{product.fit}</p>
      </fieldset>

      <div className="flex items-center justify-between">
        <span className="font-medium">Quantity</span>
        <div className="flex items-center rounded-full border border-line">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center rounded-full hover:bg-mist">
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center font-medium" aria-live="polite">
            {qty}
          </span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} className="grid size-10 place-items-center rounded-full hover:bg-mist">
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      {product.soldOut ? (
        <a
          href={whatsappLink(`Hi ${site.name} — please let me know if the ${product.name} (${product.sku}) gets restocked.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-line font-medium hover:border-ink"
        >
          <WhatsAppIcon size={20} /> Notify me on restock
        </a>
      ) : (
        <div className="space-y-3">
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
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink font-medium text-white transition-colors hover:bg-ink/75"
          >
            <WhatsAppIcon size={20} /> Order on WhatsApp — {formatPrice(product.price * qty)}
          </a>
          <a
            href={socials.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            onClick={copyForInstagram}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-line font-medium transition-colors hover:border-ink"
          >
            <InstagramIcon size={20} /> {copied ? "Order details copied ✓" : "DM on Instagram"}
          </a>
          <a
            href={whatsappLink(`Hi ${site.name} — I have a question about the ${product.name} (${product.sku}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 pt-1 text-sm text-mute hover:text-ink"
          >
            <MessageCircle className="size-4" /> Ask a question about this product
          </a>
        </div>
      )}

      <ul className="space-y-3 border-t border-line pt-6 text-[0.95rem]">
        <li className="flex items-start gap-3">
          <Truck className="mt-0.5 size-5 shrink-0" /> {site.shipping}
        </li>
        <li className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0" /> We confirm size, stock &amp; delivery with you before you pay
        </li>
      </ul>
    </div>
  );
}
