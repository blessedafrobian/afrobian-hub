import type { Metadata } from "next";
import { Campaign, Categories, Community, Featured, Hero, HowToOrder, Identity, JustIn, QuoteBand, QuotesWall, Stories, Story } from "@/components/home/sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteBand />
      <JustIn />
      <Identity />
      <Campaign />
      <QuotesWall />
      <Featured />
      <Story />
      <Community />
      <Categories />
      <Stories />
      <HowToOrder />
    </>
  );
}
