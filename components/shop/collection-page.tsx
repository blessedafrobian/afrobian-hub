import type { Product } from "@/lib/products";
import { Container } from "@/components/ui/primitives";
import { ShopBrowser } from "./shop-browser";

export function CollectionPage({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="pb-24">
      <Container>
        <ShopBrowser products={products} title={title} />
      </Container>
    </section>
  );
}
