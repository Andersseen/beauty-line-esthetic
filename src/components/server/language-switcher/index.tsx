import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentPathLang = pathname.split("/")[1];
  const defaultLang = languages.find((lang) => lang.code === currentPathLang)
    ? currentPathLang
    : "es";

  const [currentLanguage, setCurrentLanguage] = useState(defaultLang);

  useEffect(() => {
    setCurrentLanguage(defaultLang);
  }, [defaultLang]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {languages.map(({ code, label }) => (
        <Button
          key={code}
          asChild
          variant={currentLanguage === code ? "default" : "outline"}
          className={`rounded-${
            code === "es" ? "l" : code === "ua" ? "r" : "none"
          }-md hover:bg-main-400`}
          onClick={() => handleLanguageChange(code)}
        >
          <Link href={`/${code}`}>{label}</Link>
        </Button>
      ))}
    </div>
  );
}
