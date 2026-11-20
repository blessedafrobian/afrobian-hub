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
    <CollectionPage title="All Products" products={products} />
  );
}
