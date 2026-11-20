import { NextResponse, type NextRequest } from "next/server";
import { products } from "@/lib/products";
import { creators } from "@/lib/creators";
import { stories } from "@/lib/stories";

/**
 * With Cache Components, a page that calls notFound() after the static shell
 * has streamed still answers 200 (with a noindex tag). To return a real 404
 * for unknown slugs, check them here — before rendering starts — and rewrite
 * to an unmatched path, which renders app/not-found.tsx with a 404 status.
 */
const known: Record<string, Set<string>> = {
  shop: new Set(products.map((p) => p.slug)),
  creators: new Set(creators.map((c) => c.slug)),
  culture: new Set(stories.map((s) => s.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const slugs = known[section];
  if (slugs && slug && (rest.length > 0 || !slugs.has(decodeURIComponent(slug)))) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path+", "/creators/:path+", "/culture/:path+"],
};
