"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/components/ui/primitives";

/** Mobile: swipeable single image with dots. Desktop: thumbnails + large image. */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="no-scrollbar order-2 hidden gap-2 lg:order-1 lg:flex lg:w-16 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={`Show view ${i + 1}`}
            aria-pressed={i === active}
            className={cn("relative aspect-square w-16 overflow-hidden rounded-md bg-mist", i === active ? "ring-2 ring-ink" : "opacity-80 hover:opacity-100")}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-square flex-1 overflow-hidden rounded-lg bg-mist lg:order-2">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — view ${i + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            preload={i === 0}
            className={cn("object-cover transition-opacity duration-300", i === active ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>
      <div className="order-3 flex justify-center gap-2 lg:hidden">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show view ${i + 1}`}
            aria-pressed={i === active}
            className={cn("relative aspect-square w-16 overflow-hidden rounded-md bg-mist", i === active ? "ring-2 ring-ink" : "opacity-80")}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
