import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import {
  CampaignSection,
  CreatorsSection,
  CultureSection,
  DropSection,
  HowToOrderSection,
  ManifestoSection,
  SplitSection,
  TickerCross,
} from "@/components/home/sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerCross />
      <DropSection />
      <CampaignSection />
      <SplitSection />
      <ManifestoSection />
      <CreatorsSection />
      <CultureSection />
      <HowToOrderSection />
    </>
  );
}
