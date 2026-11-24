import type { ReactNode } from "react";
import { Container, cn } from "@/components/ui/primitives";

/** Clean header used by inner pages. */
export function PageHero({ eyebrow, title, intro, children, className }: { eyebrow?: string; title: string; intro?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section className={cn("pb-10 pt-12 sm:pb-14 sm:pt-16", className)}>
      <Container>
        {eyebrow && <p className="font-medium text-white/50">{eyebrow}</p>}
        <h1 className="display mt-2 text-[clamp(3rem,9vw,7.5rem)]">{title}</h1>
        {(intro || children) && (
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            {intro && <div className="text-lg leading-relaxed text-bone/80 lg:col-span-6">{intro}</div>}
            {children && <div className="lg:col-span-5 lg:col-start-8">{children}</div>}
          </div>
        )}
      </Container>
    </section>
  );
}
