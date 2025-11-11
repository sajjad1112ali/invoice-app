import PlatformFeatures from "@/components/Home/PlatformFeatures";
import KeyBenefits from "@/components/Home/KeyBenefits";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import WhoCanBenefit from "@/components/Home/WhoCanBenefit";
import SecurityAndManaging from "@/components/Home/SecurityAndManaging";

export default function Home() {
  return (
    <>
      <Hero />
      <KeyBenefits />
      <HowItWorks />
      <PlatformFeatures />
      <WhoCanBenefit />
      <SecurityAndManaging />
    </>
  );
}
