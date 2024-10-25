import { Locale } from "@/i18n-config";
import ClientHeader from "./client-header";

export default async function Header({ lang }: { lang: Locale }) {
  return (
    <header className="fixed w-full bg-main-500 box-border p-2 sm:p-5 z-50">
      <ClientHeader lang={lang} />
    </header>
  );
}
