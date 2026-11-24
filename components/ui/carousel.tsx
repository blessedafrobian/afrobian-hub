"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "./primitives";

/** Horizontal scroll rail with arrow controls in the section header. */
export function Carousel({ title, action, children, itemClassName }: { title: string; action?: ReactNode; children: ReactNode[]; itemClassName?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4 px-5 sm:px-9 lg:px-12">
        <h2 className="display text-5xl sm:text-6xl">{title}</h2>
        <div className="flex items-center gap-3">
          {action}
          <div className="hidden gap-2 sm:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scroll(d as 1 | -1)}
                aria-label={d === -1 ? "Scroll left" : "Scroll right"}
                className="grid size-11 place-items-center rounded-full bg-coal transition-colors hover:bg-line"
              >
                {d === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ul ref={ref} className="no-scrollbar flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto scroll-smooth px-5 sm:scroll-pl-9 sm:gap-4 sm:px-9 lg:scroll-pl-12 lg:px-12">
        {children.map((child, i) => (
          <li key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
