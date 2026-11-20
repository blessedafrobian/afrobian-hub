import Link from "next/link";
import Image from "next/image";
import { formatDate, type Story } from "@/lib/stories";
import { cn } from "@/components/ui/primitives";

export function StoryCard({
  story,
  variant = "default",
  className,
  tone = "dark",
}: {
  story: Story;
  variant?: "default" | "lead" | "row";
  className?: string;
  tone?: "dark" | "light";
}) {
  const muted = tone === "dark" ? "text-bone/60" : "text-ink/60";
  if (variant === "row") {
    return (
      <Link href={`/culture/${story.slug}`} className={cn("group grid grid-cols-[96px_1fr] items-center gap-4 py-5 sm:grid-cols-[140px_1fr] sm:gap-6", className)}>
        <div className="relative aspect-[4/3] overflow-hidden bg-coal">
          <Image src={story.cover} alt="" fill sizes="140px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div>
          <p className={cn("label mb-2", muted)}>
            <span className="text-blaze">{story.kicker}</span> · {story.readTime}
          </p>
          <h3 className="text-lg font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-blaze sm:text-xl">{story.title}</h3>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/culture/${story.slug}`} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden bg-coal", variant === "lead" ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]")}>
        <Image
          src={story.cover}
          alt={story.title}
          fill
          sizes={variant === "lead" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-snap group-hover:scale-105"
        />
        <span className="label absolute left-3 top-3 bg-blaze px-2 py-1 font-bold text-ink">{story.kicker}</span>
      </div>
      <p className={cn("label mt-4", muted)}>
        {formatDate(story.date)} · {story.readTime} read
      </p>
      <h3 className={cn("mt-2 font-bold uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-blaze", variant === "lead" ? "display text-4xl sm:text-6xl" : "text-xl sm:text-2xl")}>
        {story.title}
      </h3>
      <p className={cn("mt-3 max-w-xl", muted)}>{story.excerpt}</p>
    </Link>
  );
}
