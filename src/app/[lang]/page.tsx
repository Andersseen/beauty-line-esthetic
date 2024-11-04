import ContactSection from "@/components/client/contact-section";
import ServicesSection from "@/components/client/services-section";
import ShuffleHero from "@/components/client/shuffle-hero";
import Features from "@/components/pages/Features";
import { TransitionWrapper } from "@/components/client/transition-wrapper";
import { BentoGridDemo } from "@/components/client/bento-grid/demo";
import { getDictionary } from "@/lib/dictionaries";
import SplitSection from "@/components/client/split-section";

type Props = {
  params: { lang: string };
};
export default async function Home({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <TransitionWrapper>
      <section className="w-full mx-auto rounded-md min-h-screen overflow-hidden">
        <ShuffleHero dict={dict.shuffleHero} />
        <Features dict={dict.featuresSection} />
        <ServicesSection dict={dict.servicesSection} />
        <SplitSection dict={dict.splitSectip} />
        <BentoGridDemo />
        <ContactSection dict={dict.contactSection} />
      </section>
    </TransitionWrapper>
  );
}
