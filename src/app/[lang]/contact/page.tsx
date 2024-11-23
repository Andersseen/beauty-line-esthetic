import { TransitionWrapper } from "@/components/client/transition-wrapper";
import Contact from "@/components/pages/Contact";
import { getDictionary } from "@/lib/dictionaries";
type Props = {
  params: { lang: string };
};
export default async function Page({ params }: Props) {
  const { lang } = params;

  const dict = await getDictionary(lang);
  return (
    <TransitionWrapper>
      <section className="w-full min-h-screen shadow-lg">
        <Contact dict={dict.contact} />
      </section>
    </TransitionWrapper>
  );
}
