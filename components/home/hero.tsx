"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Ban } from "lucide-react";
import { ButtonLink, Container, Sticker } from "@/components/ui/primitives";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { generalWhatsappLink } from "@/lib/order";

const ease = [0.22, 1, 0.36, 1] as const;

function StaggerWord({ word, delay = 0, className }: { word: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-hidden>
      {word.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.045 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const ySide = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yWord = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotSide = useTransform(scrollYProgress, [0, 1], [-5, 4]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-ink pt-20 sm:pt-24" aria-labelledby="hero-title">
      {/* background type texture */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.04]" aria-hidden>
        <p className="display whitespace-nowrap text-[42vw] leading-none text-bone">DROP01</p>
      </div>

      <Container className="relative z-[2] grid gap-y-6 lg:grid-cols-12 lg:gap-x-8">
        {/* intro copy */}
        <div className="order-3 flex flex-col justify-end gap-7 pb-14 lg:order-none lg:col-span-4 lg:row-start-1 lg:pb-[17vw]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.6 }}>
            <p className="label mb-5 flex items-center gap-3 text-bone/70">
              <span className="inline-block size-2 animate-pulse rounded-full bg-blaze" />
              Drop 01 — Bloock That Guyyy · Out now
            </p>
            <p className="font-serif text-4xl leading-[1.02] text-bone sm:text-5xl">
              Streetwear from <em className="text-blaze">Morocco,</em>
              <br />
              worn by the world.
            </p>
            <p className="mt-5 max-w-sm text-bone/70">
              Heavyweight pieces, loud colour and a crew of creators. No checkout lines — order straight from WhatsApp or Instagram.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.75 }}
          >
            <ButtonLink href="/shop" size="lg">
              Shop the drop
            </ButtonLink>
            <ButtonLink href={generalWhatsappLink} variant="outline" size="lg" icon={<WhatsAppIcon size={18} />}>
              Order on WhatsApp
            </ButtonLink>
          </motion.div>
        </div>

        {/* collage */}
        <div className="relative order-1 lg:order-none lg:col-span-8 lg:col-start-5 lg:row-start-1">
          <motion.div
            style={{ y: yMain }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, ease, delay: 0.1 }}
            className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden sm:w-[70%] lg:w-[64%]"
          >
            <Image
              src="/media/editorial/hero-main.svg"
              alt="AFROBIAN HUB Drop 01 campaign — hooded figure in front of an orange sun (temporary artwork)"
              fill
              preload
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: ySide, rotate: rotSide }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.55 }}
            className="absolute bottom-[14%] left-0 aspect-[9/11] w-[44%] border-[6px] border-ink shadow-2xl sm:w-[36%] lg:bottom-[22%] lg:left-[4%] lg:w-[34%]"
          >
            <Image src="/media/editorial/hero-side.svg" alt="Two figures in Drop 01 pieces (temporary artwork)" fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover" />
            <span className="label absolute -top-4 left-4 rotate-[-3deg] bg-bone px-3 py-1.5 font-bold text-ink">Lookbook / 02</span>
          </motion.div>

          <motion.div
            className="absolute right-[2%] top-[4%] lg:right-[52%] lg:top-[6%]"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1 }}
          >
            <Sticker text="Bloock that guyyy ✺ Bloock that pitch ✺ " className="size-24 sm:size-32" center={<Ban className="size-8 sm:size-10" strokeWidth={2.75} />} />
          </motion.div>
        </div>

        {/* giant wordmark */}
        <motion.h1
          id="hero-title"
          style={{ y: yWord }}
          className="display relative z-10 order-2 -mt-[24vw] select-none text-mega leading-[0.8] text-bone lg:order-none lg:col-span-12 lg:row-start-2 lg:-mt-[13vw]"
        >
          <span className="sr-only">AFROBIAN HUB — streetwear and creator culture from Morocco</span>
          <StaggerWord word="AFROBIAN" delay={0.2} className="block" />
          <span className="flex items-end gap-[2vw]" aria-hidden>
            <span className="inline-block bg-blaze px-[1.2vw] pt-[0.6vw] text-ink">
              <StaggerWord word="HUB" delay={0.55} />
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="label mb-[1.5vw] hidden max-w-[16rem] !leading-relaxed text-bone/60 normal-case tracking-[0.12em] sm:block"
            >
              Streetwear · Creators · Culture — Morocco ⟶ World
            </motion.span>
          </span>
        </motion.h1>
      </Container>

      <motion.a
        href="#drop"
        aria-label="Scroll to the drop"
        className="absolute bottom-6 right-6 z-10 hidden size-14 place-items-center rounded-full border border-bone/30 text-bone transition-colors hover:border-blaze hover:bg-blaze hover:text-ink lg:grid"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
