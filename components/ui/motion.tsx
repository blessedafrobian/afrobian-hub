"use client";

import { motion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade/slide content in when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" } & Omit<HTMLMotionProps<"div">, "children">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Masked line-by-line headline reveal. The wrapper (not the clipped lines) observes the viewport. */
export function RevealLines({ lines, className, lineClassName, delay = 0 }: { lines: ReactNode[]; className?: string; lineClassName?: string; delay?: number }) {
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Vertical parallax drift tied to scroll position. */
export function Parallax({ children, offset = 80, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
