import Hero from "../../components/home/Hero.jsx";
import CategoriesSection from "../../components/home/CategoriesSection.jsx";
import StatsBand from "../../components/home/StatsBand.jsx";
import FeaturedCoachesSection from "../../components/home/FeaturedCoachesSection.jsx";
import HowItWorksSection from "../../components/home/HowItWorksSection.jsx";
import TestimonialsSection from "../../components/home/TestimonialsSection.jsx";
import CtaBanner from "../../components/home/CtaBanner.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <StatsBand />
      <FeaturedCoachesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
