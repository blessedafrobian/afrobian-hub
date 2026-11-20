import type { Metadata } from "next";
import { productsFor } from "@/lib/products";
import { CollectionPage } from "@/components/shop/collection-page";

export const metadata: Metadata = {
  title: "Men — Streetwear",
  description: "Men's streetwear from AFROBIAN HUB: heavyweight hoodies, track jackets, cargo pants and boxy tees. Order on WhatsApp or Instagram.",
  alternates: { canonical: "/men" },
};

export default function MenPage() {
  return (
    <CollectionPage
      index="Men"
      eyebrow="His rotation · incl. unisex"
      title="Men"
      outline="heavy rotation."
      intro="Heavy layers, straight cargos and track tops. Unisex pieces are cut oversized — check the fit notes on each product."
      products={productsFor("men")}
    />
  );
}
