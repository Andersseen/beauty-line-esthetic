import { TransitionWrapper } from "@/components/client/transition-wrapper";
import TreatmentPrices from "@/components/client/treatment-prices";

export default function Page() {
  return (
    <TransitionWrapper>
      <section className="w-full min-h-screen shadow-lg p-2 md:p-8">
        <TreatmentPrices />
      </section>
    </TransitionWrapper>
  );
}
