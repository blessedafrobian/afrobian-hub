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
    <CollectionPage title="Men's Clothing" products={productsFor("men")} />
  );
}
