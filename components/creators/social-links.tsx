import { ArrowUpRight, Clock } from "lucide-react";
import { platformLabel, type Creator, type SocialPlatform } from "@/lib/creators";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/brand-icons";

const icons: Record<SocialPlatform, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

/** Renders creator social links; null URLs show a "link pending" state rather than a fake account. */
export function SocialLinks({ socials }: { socials: Creator["socials"] }) {
  return (
    <ul className="grid gap-2">
      {socials.map((s) => {
        const Icon = icons[s.platform];
        if (!s.url) {
          return (
            <li key={s.platform}>
              <span
                aria-disabled="true"
                className="flex h-14 items-center justify-between border border-dashed border-bone/25 px-4 text-bone/50"
              >
                <span className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="label font-bold">{platformLabel[s.platform]}</span>
                </span>
                <span className="label flex items-center gap-1.5 text-[0.6rem]">
                  <Clock className="size-3.5" /> Link pending
                </span>
              </span>
            </li>
          );
        }
        return (
          <li key={s.platform}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-14 items-center justify-between border border-bone/25 px-4 transition-colors hover:border-blaze hover:bg-blaze hover:text-ink"
            >
              <span className="flex items-center gap-3">
                <Icon size={20} />
                <span className="label font-bold">{platformLabel[s.platform]}</span>
                {s.handle && <span className="font-mono text-xs opacity-70">@{s.handle}</span>}
              </span>
              <ArrowUpRight className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
