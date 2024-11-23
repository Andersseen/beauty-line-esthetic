import { TransitionWrapper } from "@/components/client/transition-wrapper";
import TreatmentPrices from "@/components/client/treatment-prices";
import { getDictionary } from "@/lib/dictionaries";
type Props = {
  params: { lang: string };
};
export default async function Page({ params }: Props) {
  const { lang } = params;

  const dict = await getDictionary(lang);

  return (
    <TransitionWrapper>
      <section className="w-full min-h-screen shadow-lg p-2 md:p-8">
        <TreatmentPrices dict={dict.prices} />
      </section>
    </TransitionWrapper>
  );
}
