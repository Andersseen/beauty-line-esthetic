import { Locale } from "@/i18n-config";
import Content from "./content";
import { getDictionary } from "@/lib/dictionaries";

export default async function Footer({ lang }: { lang: Locale }) {
  const { footer } = await getDictionary(lang);

  return (
    <div
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full">
        <Content dict={footer} />
      </div>
    </div>
  );
}
