"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { cn } from "@/components/ui/primitives";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: Low–High",
  "price-desc": "Price: High–Low",
  name: "Name A–Z",
};

export function ShopBrowser({ products, title }: { products: Product[]; title: string }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [hideSoldOut, setHideSoldOut] = useState(false);

  const available = useMemo(() => categories.filter((c) => products.some((p) => p.category === c.id)), [products]);

  const list = useMemo(() => {
    const l = products.filter((p) => (category === "all" || p.category === category) && (!hideSoldOut || !p.soldOut));
    if (sort === "price-asc") return [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...l].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...l].sort((a, b) => a.name.localeCompare(b.name));
    return [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(!!a.soldOut) - Number(!!b.soldOut));
  }, [products, category, sort, hideSoldOut]);

  const chips: { id: Category | "all"; label: string }[] = [{ id: "all", label: "All" }, ...available.map((c) => ({ id: c.id, label: c.label }))];

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-5 bg-ink/90 px-5 py-4 backdrop-blur sm:-mx-9 sm:px-9 lg:-mx-12 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl font-medium tracking-tight">
            {title} <span className="text-white/50">({list.length})</span>
          </h1>
          <div className="flex items-center gap-5">
            <label className="flex cursor-pointer items-center gap-2 text-[0.95rem]">
              <input type="checkbox" checked={hideSoldOut} onChange={(e) => setHideSoldOut(e.target.checked)} className="size-4 accent-ink" />
              In stock only
            </label>
            <label className="relative flex items-center gap-1 text-[0.95rem]">
              <span>Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="appearance-none bg-transparent pr-6 font-medium text-white/50 outline-none"
              >
                {Object.entries(sortLabels).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 size-4" />
            </label>
          </div>
        </div>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter by category">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={cn(
                "h-10 shrink-0 rounded-full px-5 text-[0.95rem] font-medium transition-colors",
                category === c.id ? "bg-blaze text-ink" : "bg-coal hover:bg-line",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-10 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <li key={p.slug}>
            <ProductCard product={p} preload={i < 4} />
          </li>
        ))}
      </ul>

      {list.length === 0 && <p className="py-24 text-center text-white/50">Nothing here yet — try another filter.</p>}
    </div>
  );
}
