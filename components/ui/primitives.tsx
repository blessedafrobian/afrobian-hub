import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
export function Container({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1920px] px-5 sm:px-9 lg:px-12", className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
type Variant = "dark" | "light" | "blaze" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  dark: "bg-blaze text-ink hover:bg-blaze-deep",
  light: "bg-bone text-ink hover:bg-white",
  blaze: "bg-blaze text-ink hover:bg-blaze-deep",
  outline: "border border-white/25 bg-transparent text-bone hover:border-bone",
  "outline-light": "border border-white/60 bg-transparent text-white hover:border-white",
};

type ButtonBase = { variant?: Variant; size?: "sm" | "md" | "lg"; icon?: ReactNode; className?: string; children: ReactNode };

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

function buttonClass(variant: Variant, size: keyof typeof sizes, className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Internal or external link styled as a pill button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "dark",
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

export function Button({ variant = "dark", size = "md", icon, className, children, ...rest }: ButtonBase & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/** Section title row: headline left, optional link/controls right. */
export function SectionHeader({ title, action, className }: { title: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4 sm:mb-8", className)}>
      <h2 className="display text-4xl sm:text-5xl">{title}</h2>
      {action}
    </div>
  );
}

export function Badge({ children, tone = "blaze", className }: { children: ReactNode; tone?: "blaze" | "ink" | "white"; className?: string }) {
  const tones = { blaze: "bg-blaze text-ink", ink: "bg-ink text-bone", white: "bg-bone text-ink" };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone], className)}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/** Infinite CSS marquee. Content is duplicated for a seamless loop. */
export function Marquee({ items, className, duration = 30, separator = "·" }: { items: string[]; className?: string; duration?: number; separator?: string }) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6">{item}</span>
          <span className="opacity-50">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <div className="flex w-max animate-marquee" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display inline-flex items-center gap-1 text-[1.5rem] leading-none", className)}>
      AFROBIAN
      <span className="rounded-[3px] bg-[#ff7900] px-1 py-0.5 text-[0.6em] leading-none text-ink">HUB</span>
    </span>
  );
}
