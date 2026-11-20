"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/components/ui/primitives";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse">
      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-coal">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — view ${i + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            preload={i === 0}
            className={cn("object-cover transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")}
          />
        ))}
        <span className="label absolute bottom-3 left-3 bg-ink/80 px-2 py-1 text-bone">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto lg:w-24 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show view ${i + 1}`}
            aria-pressed={i === active}
            className={cn("relative aspect-[4/5] w-20 shrink-0 overflow-hidden border-2 transition-colors lg:w-full", i === active ? "border-blaze" : "border-transparent opacity-60 hover:opacity-100")}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
