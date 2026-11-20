import Image from "next/image";
import { cn } from "./primitives";

/**
 * Image wrapper used site-wide. Fills its (relatively positioned) parent.
 * Temporary artwork is SVG (served unoptimized automatically); real photos
 * dropped in later as .jpg/.webp go through next/image optimisation.
 */
export function Media({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  preload,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  imgClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-coal", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={cn("object-cover", imgClassName)} />
    </div>
  );
}
