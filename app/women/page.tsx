import type { Metadata } from "next";
import { productsFor } from "@/lib/products";
import { CollectionPage } from "@/components/shop/collection-page";

export const metadata: Metadata = {
  title: "Women — Streetwear",
  description: "Women's streetwear from AFROBIAN HUB: cropped hoodies, wide-leg cargos, baby tees and outerwear. Order on WhatsApp or Instagram.",
  alternates: { canonical: "/women" },
};

export default function WomenPage() {
  return (
    <CollectionPage title="Women's Clothing" products={productsFor("women")} />
  );
}
