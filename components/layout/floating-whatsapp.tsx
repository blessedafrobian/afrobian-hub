"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { generalWhatsappLink } from "@/lib/order";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

/** Floating order button that appears after the user scrolls past the fold. */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 600));

  return (
    <motion.a
      href={generalWhatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AFROBIAN HUB on WhatsApp"
      initial={false}
      animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      tabIndex={visible ? 0 : -1}
      className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-ink text-white shadow-lg transition-colors hover:bg-blaze hover:text-ink sm:bottom-6 sm:right-6 sm:size-16"
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  );
}
