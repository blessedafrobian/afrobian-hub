import type { Metadata } from "next";
import { Campaign, Categories, CreatorsRail, Featured, Hero, HowToOrder, JustIn, Stories } from "@/components/home/sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <JustIn />
      <Featured />
      <Campaign />
      <Categories />
      <CreatorsRail />
      <Stories />
      <HowToOrder />
    </>
  );
}
