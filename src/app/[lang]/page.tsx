import ContactSection from "@/components/client/contact-section";
import ShuffleHero from "@/components/client/shuffle-hero";
import Features from "@/components/pages/Features";

export default function Home() {
  return (
    <section className="w-full mx-auto rounded-md min-h-screen overflow-hidden">
      <ShuffleHero />
      <Features />
      <ContactSection />
    </section>
  );
}
