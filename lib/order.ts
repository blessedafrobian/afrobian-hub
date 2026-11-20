import { site, socials } from "./site";
import type { Product } from "./products";

export function formatPrice(amount: number, currency: string = site.currency) {
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type OrderSelection = { size?: string; color?: string; quantity?: number };

/** Builds the prefilled WhatsApp order message for a product. */
export function productOrderMessage(product: Product, sel: OrderSelection = {}, pageUrl?: string) {
  const lines = [
    `Hi ${site.name} 👋 I'd like to order:`,
    ``,
    `• ${product.name}`,
    `• Ref: ${product.sku}`,
    `• Price: ${formatPrice(product.price)}`,
    `• Size: ${sel.size ?? "—  (please advise)"}`,
    `• Colour: ${sel.color ?? product.colors[0]?.name ?? "—"}`,
    `• Qty: ${sel.quantity ?? 1}`,
  ];
  if (pageUrl) lines.push(``, pageUrl);
  lines.push(``, `City / country for delivery: `);
  return lines.join("\n");
}

export function productWhatsappLink(product: Product, sel?: OrderSelection, pageUrl?: string) {
  return whatsappLink(productOrderMessage(product, sel, pageUrl));
}

export const generalWhatsappLink = whatsappLink(
  `Hi ${site.name} 👋 I have a question about your drops.`,
);

export const instagramDmLink = socials.instagramDm;
