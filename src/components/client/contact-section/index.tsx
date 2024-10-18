import { Mail, Phone } from "lucide-react";
import { Globe } from "./globe";

interface ContactSectionProps {
  dict: {
    title: string;
    description: string;
    contactInfo: string[];
  };
}

export default function ContactSection({ dict }: ContactSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center">
      <div className="w-full px-4 md:px-6">
        <div className="grid gap-6 items-center">
          {/* Content - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block space-y-4 relative w-full h-full">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {dict.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {dict.description}
            </p>
            <ul className="space-y-2">
              {dict.contactInfo.map((info, index) => (
                <li key={index} className="flex items-center">
                  {index === 0 ? (
                    <>
                      <Mail className="h-5 w-5 mr-2 text-main-600" />
                      {info}
                    </>
                  ) : (
                    <>
                      <Phone className="h-5 w-5 mr-2 text-main-600" />
                      {info}
                    </>
                  )}
                </li>
              ))}
            </ul>
            <Globe className="absolute right-0 md:-right-10 -bottom-80 md:-bottom-96" />
          </div>
        </div>
      </div>
    </section>
  );
}
