"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { mainNav, site, socials } from "@/lib/site";
import { generalWhatsappLink } from "@/lib/order";
import { cn, Marquee, Wordmark } from "@/components/ui/primitives";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

const ease = [0.22, 1, 0.36, 1] as const;
const desktopNav = mainNav.filter((n) => ["/shop", "/men", "/women", "/culture", "/#community"].includes(n.href));

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function DesktopNav({ activePath }: { activePath?: string }) {
  return (
    <ul className="hidden items-center gap-7 lg:flex">
      {desktopNav.map((item) => {
        const active = activePath ? isActive(activePath, item.href) : false;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative py-2 text-[0.95rem] font-medium transition-colors hover:text-white/60",
                active && "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-blaze",
              )}
            >
              {item.label}
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
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* promo bar */}
      <div className="bg-blaze py-2 text-center text-[0.75rem] font-medium tracking-[0.18em] text-ink uppercase">
        <Marquee
          className="sm:hidden"
          items={["Order on WhatsApp or Instagram", "Delivery across Morocco", "Worldwide on request"]}
          duration={28}
        />
        <p className="hidden sm:block">
          Order on WhatsApp or Instagram · Delivery across Morocco · Worldwide on request
        </p>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
        <nav aria-label="Main" className="mx-auto grid h-16 max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-9 lg:px-12">
          <Link href="/" aria-label={`${site.name} — home`} className="justify-self-start">
            <Wordmark />
          </Link>

          <Suspense fallback={<DesktopNav />}>
            <DesktopNavWithPath />
          </Suspense>

          <div className="flex items-center justify-self-end gap-1">
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AFROBIAN HUB on Instagram"
              className="hidden size-10 place-items-center rounded-full transition-colors hover:bg-white/10 sm:grid"
            >
              <InstagramIcon size={22} />
            </a>
            <a
              href={generalWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hidden h-10 items-center gap-2 rounded-full bg-blaze px-4 text-sm font-medium text-ink transition-colors hover:bg-blaze-deep sm:inline-flex"
            >
              <WhatsAppIcon size={18} /> Order
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </header>

      <Suspense fallback={null}>
        <RouteChangeListener onChange={closeMenu} />
      </Suspense>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[70] flex w-[88vw] max-w-sm flex-col bg-ink lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="flex h-16 items-center justify-end px-5">
                <button type="button" onClick={closeMenu} aria-label="Close menu" className="grid size-10 place-items-center rounded-full hover:bg-white/10">
                  <X className="size-6" />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto px-7">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu} className="flex items-center justify-between py-3 text-2xl font-medium">
                      {item.label}
                      <ChevronRight className="size-6" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 px-7 pb-8 pt-6">
                <p className="text-white/50">Order straight from the chat — we reply fast.</p>
                <div className="flex gap-2">
                  <a href={generalWhatsappLink} target="_blank" rel="noopener noreferrer" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-blaze text-sm font-medium text-ink">
                    <WhatsAppIcon size={18} /> WhatsApp
                  </a>
                  <a href={socials.instagramDm} target="_blank" rel="noopener noreferrer" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-medium">
                    <InstagramIcon size={18} /> Instagram
                  </a>
                </div>
                <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 pt-2 text-sm text-white/50">
                  <TikTokIcon size={16} /> Follow on TikTok
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
