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
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                contact@example.com
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
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
