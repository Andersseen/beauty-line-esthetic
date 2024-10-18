import { Mail, Phone } from "lucide-react";
import { Globe } from "./globe";

export default function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center">
      <div className="w-full px-4 md:px-6">
        <div className="grid gap-6  items-center">
          {/* Content - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block space-y-4 relative w-full h-full">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get in touch
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-main-600" />
                contact@example.com
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-main-600" />
                +1 (555) 123-4567
              </li>
            </ul>
            <Globe className="absolute right-0 md:-right-10 -bottom-80 md:-bottom-96" />
          </div>
        </div>
      </div>
    </section>
  );
}
