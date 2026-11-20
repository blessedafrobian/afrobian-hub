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
    <CollectionPage
      index="Women"
      eyebrow="Her rotation · incl. unisex"
      title="Women"
      outline="loud & cropped."
      tone="blaze"
      intro="Cropped fleece, wide legs, fitted baby tees and oversized outerwear. Unisex pieces included — size down for a closer fit."
      products={productsFor("women")}
    />
  );
}
