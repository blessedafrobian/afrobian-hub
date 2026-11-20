import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90vh] items-center overflow-hidden bg-blaze pt-24 text-ink">
      <Container className="relative z-[2]">
        <p className="label mb-6">Error 404 · Lost on the block</p>
        <h1 className="display text-[38vw] leading-[0.8] sm:text-[28vw]">
          4<span className="text-outline-ink">0</span>4
        </h1>
        <p className="mt-8 max-w-md font-serif text-3xl italic leading-tight">This page took a wrong turn. The drop didn&apos;t.</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <ButtonLink href="/shop" variant="ink" size="lg">
            Back to the shop
          </ButtonLink>
          <Link href="/" className="label inline-flex h-14 items-center px-6 font-bold underline underline-offset-4 sm:h-16">
            Home
          </Link>
        </div>
      </Container>
    </section>
  );
}
