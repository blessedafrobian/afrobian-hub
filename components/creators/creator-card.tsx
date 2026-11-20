import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Creator } from "@/lib/creators";
import { cn } from "@/components/ui/primitives";

export function CreatorCard({ creator, className, sizes = "(max-width: 640px) 75vw, 25vw" }: { creator: Creator; className?: string; sizes?: string }) {
  return (
    <Link href={`/creators/${creator.slug}`} className={cn("group relative block overflow-hidden bg-coal", className)}>
      <div className="relative aspect-[4/5]">
        <Image src={creator.portrait} alt={`${creator.name} — ${creator.discipline} (placeholder portrait)`} fill sizes={sizes} className="object-cover transition-transform duration-700 ease-snap group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="label mb-2 text-blaze">{creator.slot} · {creator.discipline}</p>
        <div className="flex items-end justify-between gap-3">
          <h3 className="display text-4xl text-bone sm:text-5xl">{creator.name}</h3>
          <span className="grid size-10 shrink-0 place-items-center bg-bone text-ink transition-colors group-hover:bg-blaze">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
        <p className="mt-2 font-serif text-lg italic text-bone/80">“{creator.tagline}”</p>
      </div>
    </Link>
  );
}
