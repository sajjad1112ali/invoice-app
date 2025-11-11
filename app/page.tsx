import ContactUs from "@/components/Home/ContactUs";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <ContactUs />
    </>
  );
}
