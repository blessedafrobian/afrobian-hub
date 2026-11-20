import type { ReactNode } from "react";
import { Container, Marquee, cn } from "@/components/ui/primitives";
import { RevealLines } from "@/components/ui/motion";

/** Editorial header used by all inner pages. */
export function PageHero({
  index,
  eyebrow,
  title,
  outline,
  intro,
  children,
  marquee,
  tone = "dark",
}: {
  index: string;
  eyebrow: string;
  title: string;
  outline?: string;
  intro?: ReactNode;
  children?: ReactNode;
  marquee?: string[];
  tone?: "dark" | "blaze" | "bone";
}) {
  const tones = {
    dark: "bg-ink text-bone",
    blaze: "bg-blaze text-ink",
    bone: "bg-bone text-ink",
  };
  return (
    <section className={cn("grain relative overflow-hidden pt-28 sm:pt-36", tones[tone])}>
      <Container className="relative z-[2] pb-10 sm:pb-14">
        <div className="label mb-6 flex items-center gap-3 opacity-70">
          <span className={tone === "dark" ? "text-blaze" : ""}>{index}</span>
          <span className="h-px w-10 bg-current" />
          <span>{eyebrow}</span>
        </div>
        <h1 className="display text-giga">
          <RevealLines
            lines={[
              title,
              ...(outline ? [<span key="o" className={tone === "dark" ? "text-outline-bone" : "text-outline-ink"}>{outline}</span>] : []),
            ]}
          />
        </h1>
        {(intro || children) && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {intro && <div className="text-lg leading-relaxed opacity-80 lg:col-span-6 lg:text-xl">{intro}</div>}
            {children && <div className="lg:col-span-5 lg:col-start-8">{children}</div>}
          </div>
        )}
      </Container>
      {marquee && (
        <div className={cn("relative z-[2] border-t py-3", tone === "dark" ? "border-bone/10" : "border-ink/15")}>
          <Marquee items={marquee} className="label text-sm font-bold" duration={35} />
        </div>
      )}
    </section>
  );
}
