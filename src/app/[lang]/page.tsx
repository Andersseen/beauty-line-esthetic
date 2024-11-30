import ContactSection from "@/components/client/contact-section";
import ServicesSection from "@/components/client/services-section";
import ShuffleHero from "@/components/client/shuffle-hero";
import Features from "@/components/pages/Features";
import { TransitionWrapper } from "@/components/client/transition-wrapper";
import BentoGridProducts from "@/components/client/bento-grid/products";
import { getDictionary } from "@/lib/dictionaries";
import SplitSection from "@/components/client/split-section";
import NewTreatment from "@/components/client/new-treatment";
import { WhatsAppButton } from "@/components/whatsapp-button";
import dynamic from "next/dynamic";

type Props = {
  params: { lang: string };
};

const GiftCards = dynamic(() => import("@/components/client/gift-cards"), {
  ssr: false,
});

export default async function Home({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <TransitionWrapper>
      <section className="w-full mx-auto rounded-md min-h-screen overflow-hidden">
        <ShuffleHero dict={dict.shuffleHero} />
        <Features dict={dict.featuresSection} />
        <ServicesSection dict={dict.servicesSection}>
          <NewTreatment dict={dict.newTreatment} />
          <SplitSection dict={dict.splitSectip} />
        </ServicesSection>
        <BentoGridProducts dict={dict.products} />
        <GiftCards dict={dict.giftCards} />
        <ContactSection dict={dict.contactSection} />
        <WhatsAppButton
          phoneNumber="+34645228782"
          message="¡Hola! Me gustaría obtener más información"
        />
      </section>
    </TransitionWrapper>
  );
}
