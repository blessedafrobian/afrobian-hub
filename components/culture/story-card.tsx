import Link from "next/link";
import Image from "next/image";
import { formatDate, type Story } from "@/lib/stories";
import { cn } from "@/components/ui/primitives";

export function StoryCard({ story, variant = "default", className }: { story: Story; variant?: "default" | "lead"; className?: string }) {
  return (
    <Link href={`/culture/${story.slug}`} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden bg-mist", variant === "lead" ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]")}>
        <Image
          src={story.cover}
          alt={story.title}
          fill
          sizes={variant === "lead" ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-snap group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 text-sm text-mute">
        {story.kicker} · {formatDate(story.date)} · {story.readTime} read
      </p>
      <h3 className={cn("mt-1 font-medium leading-tight", variant === "lead" ? "text-2xl sm:text-4xl" : "text-xl")}>{story.title}</h3>
      <p className="mt-2 max-w-xl text-mute">{story.excerpt}</p>
    </Link>
  );
}
