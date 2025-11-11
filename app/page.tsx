import PlatformFeatures from "@/components/Home/PlatformFeatures";
import KeyBenefits from "@/components/Home/KeyBenefits";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <KeyBenefits />
      <HowItWorks />
      <PlatformFeatures />
    </>
  );
}
