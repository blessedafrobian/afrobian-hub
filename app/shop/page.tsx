import type { Metadata } from "next";
import { products } from "@/lib/products";
import { CollectionPage } from "@/components/shop/collection-page";

export const metadata: Metadata = {
  title: "Shop — All Drops",
  description: "Shop every AFROBIAN HUB drop: heavyweight hoodies, boxy tees, cargo pants, outerwear and accessories. Order directly on WhatsApp or Instagram.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <CollectionPage
      index="Shop"
      eyebrow="All drops · Men · Women · Unisex"
      title="The shop"
      outline="everything."
      intro="Every piece from Drop 01 — Bloock That Guyyy, Bloock That Pitch and the Blocked icon line. Pick your size, tap order, and finish it in the chat."
      products={products}
    />
  );
}
