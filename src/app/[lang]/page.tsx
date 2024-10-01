import Features from "@/components/pages/Features";
import Hero from "@/components/pages/Hero";

export default function Home() {
  return (
    <section className="w-full mx-auto rounded-md min-h-screen overflow-hidden">
      <Hero />
      <Features />
    </section>
  );
}
