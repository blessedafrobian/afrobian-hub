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
    <ul className="flex flex-wrap gap-2">
      {socials.map((s) => {
        const Icon = icons[s.platform];
        if (!s.url) {
          return (
            <li key={s.platform}>
              <span aria-disabled="true" className="flex h-11 items-center gap-2 rounded-full border border-dashed border-white/10 px-5 text-white/50">
                <Icon size={18} />
                <span className="font-medium">{platformLabel[s.platform]}</span>
                <span className="flex items-center gap-1 text-xs">
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
              className="flex h-11 items-center gap-2 rounded-full bg-blaze px-5 font-medium text-ink transition-colors hover:bg-blaze-deep"
            >
              <Icon size={18} />
              {platformLabel[s.platform]}
              {s.handle && <span className="text-sm text-white/70">@{s.handle}</span>}
              <ArrowUpRight className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
