"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { mainNav, site, socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { cn, Wordmark } from "@/components/ui/primitives";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/shop") return pathname === "/shop" || pathname.startsWith("/shop/");
  return pathname === href || pathname.startsWith(href + "/");
}

function DesktopNav({ activePath }: { activePath?: string }) {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {mainNav.slice(0, 5).map((item) => {
        const active = activePath ? isActive(activePath, item.href) : false;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "label relative px-3 py-2 font-bold transition-colors hover:text-blaze",
                active ? "text-blaze" : "text-bone",
              )}
            >
              {item.label}
              {active && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 bg-blaze" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const noopSubscribe = () => () => {};

/**
 * Active state is applied after hydration: when proxy.ts rewrites an unknown
 * slug to the 404 page, the server pathname differs from the browser URL.
 */
function DesktopNavWithPath() {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return <DesktopNav activePath={hydrated ? pathname : undefined} />;
}

/** Closes the mobile menu whenever the route changes. */
function RouteChangeListener({ onChange }: { onChange: () => void }) {
  const pathname = usePathname();
  useEffect(() => {
    onChange();
  }, [pathname, onChange]);
  return null;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[border-color] duration-500",
          "bg-ink/90 backdrop-blur-md",
          scrolled || open ? "border-b border-bone/10" : "border-b border-transparent",
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-10">
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10 text-bone transition-colors hover:text-blaze">
            <Wordmark className="text-[1.35rem] sm:text-[1.6rem]" />
          </Link>

          <Suspense fallback={<DesktopNav />}>
            <DesktopNavWithPath />
          </Suspense>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AFROBIAN HUB on Instagram"
              className="hidden size-10 place-items-center text-bone transition-colors hover:text-blaze sm:grid"
            >
              <InstagramIcon />
            </a>
            <a
              href={generalWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="label hidden h-10 items-center gap-2 bg-blaze px-4 font-bold text-ink transition-colors hover:bg-bone sm:inline-flex"
            >
              <WhatsAppIcon size={16} /> Order
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-11 place-items-center transition-colors lg:hidden",
                open ? "bg-blaze text-ink" : "bg-bone text-ink",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <Suspense fallback={null}>
        <RouteChangeListener onChange={closeMenu} />
      </Suspense>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="grain fixed inset-0 z-40 flex flex-col bg-ink pt-16 sm:pt-20 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="pointer-events-none absolute -right-24 top-24 size-72 rounded-full bg-blaze/90 blur-[2px]" aria-hidden />
            <ul className="relative z-10 flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-5 py-8">
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-4 border-b border-bone/10 py-2"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="label text-blaze">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display text-[2.6rem] text-bone transition-colors group-hover:text-blaze sm:text-6xl">{item.label}</span>
                    </span>
                    <span className="label hidden text-bone/50 sm:inline">{item.note}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="relative z-10 grid grid-cols-2 gap-2 border-t border-bone/10 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease }}
            >
              <a href={generalWhatsappLink} target="_blank" rel="noopener noreferrer" className="label flex h-14 items-center justify-center gap-2 bg-blaze font-bold text-ink">
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
              <a href={socials.instagramDm} target="_blank" rel="noopener noreferrer" className="label flex h-14 items-center justify-center gap-2 bg-bone font-bold text-ink">
                <InstagramIcon size={18} /> Instagram
              </a>
              <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="label col-span-2 flex h-10 items-center justify-center gap-2 text-bone/70">
                <TikTokIcon size={16} /> TikTok <ArrowUpRight className="size-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
