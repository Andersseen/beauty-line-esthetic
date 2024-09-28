import FeatureSection from "@/components/client/feature-section";
import ParticlesHero from "@/components/client/particles-background/particles-hero";
import ServicesSection from "@/components/client/services-section";

export default function Home() {
  return (
    <section className="w-full mx-auto rounded-md min-h-screen overflow-hidden">
      <ParticlesHero />
      <FeatureSection />
      <ServicesSection />
    </section>
  );
}
