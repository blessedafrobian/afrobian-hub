import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-medium text-white/50">Error 404</p>
        <h1 className="display mt-3 text-[clamp(3.5rem,12vw,9rem)]">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-bone/75">This page took a wrong turn. The drop didn&apos;t.</p>
        <div className="mt-8 flex justify-center gap-2">
          <ButtonLink href="/shop">Shop the drop</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
