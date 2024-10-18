import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <Button
        asChild
        variant={currentLanguage === "es" ? "default" : "outline"}
        className="rounded-l-md hover:bg-main-400"
        onClick={() => handleLanguageChange("es")}
      >
        <Link href="/es">ES</Link>
      </Button>
      <Button
        asChild
        variant={currentLanguage === "en" ? "default" : "outline"}
        className="rounded-l-md hover:bg-main-400"
        onClick={() => handleLanguageChange("en")}
      >
        <Link href="/en">EN</Link>
      </Button>
      <Button
        asChild
        variant={currentLanguage === "ua" ? "default" : "outline"}
        className="rounded-l-md hover:bg-main-400"
        onClick={() => handleLanguageChange("ua")}
      >
        <Link href="/ua">UA</Link>
      </Button>
    </div>
  );
}
