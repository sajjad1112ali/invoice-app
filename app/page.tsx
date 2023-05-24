import ContactUs from "@/components/Home/ContactUs";
import Features from "@/components/Home/Features";
import Introduction from "@/components/Home/Introduction";
import Pricing from "@/components/Home/Pricing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Introduction />
      <Features />
      <Pricing />
      <ContactUs />
    </>
  );
}
