import Contact from "@/components/pages/Contact";
import { getDictionary } from "@/lib/dictionaries";
type Props = {
  params: { lang: string };
};
export default async function Page({ params }: Props) {
  const { lang } = params;

  const dict = await getDictionary(lang);

  return <Contact dict={dict.about} />;
}
