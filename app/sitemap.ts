import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { creators } from "@/lib/creators";
import { stories } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/shop", "/men", "/women", "/creators", "/culture", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...products.map((p) => ({ url: `${base}/shop/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...creators.map((c) => ({ url: `${base}/creators/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...stories.map((s) => ({ url: `${base}/culture/${s.slug}`, lastModified: s.date, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
