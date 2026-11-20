"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categories, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { cn } from "@/components/ui/primitives";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: low → high",
  "price-desc": "Price: high → low",
  name: "Name A–Z",
};

export function ShopBrowser({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [hideSoldOut, setHideSoldOut] = useState(false);

  const available = useMemo(() => categories.filter((c) => products.some((p) => p.category === c.id)), [products]);

  const list = useMemo(() => {
    let l = products.filter((p) => (category === "all" || p.category === category) && (!hideSoldOut || !p.soldOut));
    l = [...l];
    if (sort === "price-asc") l.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") l.sort((a, b) => b.price - a.price);
    else if (sort === "name") l.sort((a, b) => a.name.localeCompare(b.name));
    else l.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(!!a.soldOut) - Number(!!b.soldOut));
    return l;
  }, [products, category, sort, hideSoldOut]);

  const chips: { id: Category | "all"; label: string; count: number }[] = [
    { id: "all", label: "All", count: products.length },
    ...available.map((c) => ({ id: c.id, label: c.label, count: products.filter((p) => p.category === c.id).length })),
  ];

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-y border-bone/10 bg-ink/90 px-4 py-3 backdrop-blur-md sm:top-20 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Filter by category">
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
                className={cn(
                  "label flex h-10 shrink-0 items-center gap-2 border px-4 font-bold transition-colors",
                  category === c.id ? "border-blaze bg-blaze text-ink" : "border-bone/20 text-bone hover:border-bone",
                )}
              >
                {c.label}
                <span className={cn("text-[0.6rem]", category === c.id ? "text-ink/60" : "text-bone/40")}>{c.count}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <label className="label flex cursor-pointer items-center gap-2 text-bone/70">
              <input type="checkbox" checked={hideSoldOut} onChange={(e) => setHideSoldOut(e.target.checked)} className="size-4 accent-[#FF7900]" />
              In stock only
            </label>
            <label className="label flex items-center gap-2 text-bone/70">
              <span className="hidden sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-10 border border-bone/20 bg-ink px-3 font-mono text-xs uppercase tracking-wider text-bone outline-none focus:border-blaze"
              >
                {Object.entries(sortLabels).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="label mt-6 text-bone/50" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
      </p>

      <motion.ul layout className="mt-4 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} index={i} preload={i < 4} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && <p className="py-24 text-center text-bone/60">Nothing here yet — try another filter.</p>}
    </div>
  );
}
