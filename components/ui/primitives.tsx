import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
export function Container({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10", className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Variant = "blaze" | "ink" | "bone" | "outline" | "outline-ink" | "ghost";

const variants: Record<Variant, string> = {
  blaze: "bg-blaze text-ink hover:bg-bone",
  ink: "bg-ink text-bone hover:bg-blaze hover:text-ink",
  bone: "bg-bone text-ink hover:bg-blaze",
  outline: "border border-bone/40 text-bone hover:border-blaze hover:bg-blaze hover:text-ink",
  "outline-ink": "border border-ink text-ink hover:bg-ink hover:text-bone",
  ghost: "text-bone hover:text-blaze",
};

type ButtonBase = { variant?: Variant; size?: "sm" | "md" | "lg"; icon?: ReactNode; className?: string; children: ReactNode };

const sizes = {
  sm: "h-10 px-4 text-[0.7rem]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-7 text-[0.8rem] sm:h-16 sm:px-9",
};

function buttonClass(variant: Variant, size: keyof typeof sizes, className?: string) {
  return cn(
    "group/btn inline-flex shrink-0 items-center justify-center gap-2.5 font-mono font-bold uppercase tracking-[0.16em] transition-colors duration-300 ease-snap",
    "disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Internal or external link styled as a button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "blaze",
  size = "md",
  icon,
  className,
  children,
  external,
  ...rest
}: ButtonBase & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const isExternal = external ?? /^https?:/.test(href);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {!icon && <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, size, className)} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {content}
    </Link>
  );
}

export function Button({ variant = "blaze", size = "md", icon, className, children, ...rest }: ButtonBase & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
export function Eyebrow({ children, className, dot = true }: { children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <p className={cn("label flex items-center gap-2", className)}>
      {dot && <span className="inline-block size-2 bg-blaze" aria-hidden />}
      {children}
    </p>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
  className,
  tone = "dark",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        {(index || eyebrow) && (
          <div className={cn("label mb-4 flex items-center gap-3", tone === "dark" ? "text-bone/60" : "text-ink/60")}>
            {index && <span className="text-blaze">{index}</span>}
            {index && eyebrow && <span className="h-px w-8 bg-current" aria-hidden />}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        <h2 className="display text-huge">{title}</h2>
      </div>
      {aside && <div className="md:max-w-sm">{aside}</div>}
    </div>
  );
}

export function Badge({ children, tone = "blaze", className }: { children: ReactNode; tone?: "blaze" | "ink" | "bone"; className?: string }) {
  const tones = { blaze: "bg-blaze text-ink", ink: "bg-ink text-bone", bone: "bg-bone text-ink" };
  return <span className={cn("label inline-flex items-center px-2 py-1 !text-[0.625rem] font-bold", tones[tone], className)}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/** Infinite CSS marquee. Content is duplicated for a seamless loop. */
export function Marquee({
  items,
  className,
  reverse,
  duration = 30,
  separator = "✺",
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
  separator?: string;
}) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 sm:px-8">{item}</span>
          <span className="text-[0.6em]">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn("flex w-max", reverse ? "animate-marquee-rev" : "animate-marquee")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display inline-flex items-baseline gap-1 text-[1.6rem] leading-none tracking-tight", className)}>
      AFROBIAN
      <span className="bg-blaze px-1 py-0.5 text-[0.62em] leading-none text-ink">HUB</span>
    </span>
  );
}

/** Rotating circular text sticker. */
export function Sticker({ text, className, center = "✺" }: { text: string; className?: string; center?: ReactNode }) {
  return (
    <div className={cn("relative grid size-28 place-items-center rounded-full bg-blaze text-ink sm:size-36", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="sticker-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-current font-mono text-[9.5px] font-bold uppercase tracking-[0.2em]">
          <textPath href="#sticker-circle">{text}</textPath>
        </text>
      </svg>
      <span className="display text-3xl">{center}</span>
    </div>
  );
}
