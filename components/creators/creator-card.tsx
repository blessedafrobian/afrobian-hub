import Link from "next/link";
import Image from "next/image";
import type { Creator } from "@/lib/creators";
import { cn } from "@/components/ui/primitives";

export function CreatorCard({ creator, className, sizes = "(max-width: 640px) 60vw, 22vw" }: { creator: Creator; className?: string; sizes?: string }) {
  return (
    <Link href={`/creators/${creator.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Image
          src={creator.portrait}
          alt={`${creator.name} — ${creator.discipline} (placeholder portrait)`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-3 text-lg font-medium">{creator.name}</p>
      <p className="text-mute">
        {creator.discipline} · {creator.city}
      </p>
    </Link>
  );
}
