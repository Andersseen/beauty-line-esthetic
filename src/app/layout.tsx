import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { LINKS } from "@/data/links";
import Logo from "@/components/server/logo";
import { HeaderNavigation } from "@/components/client/header-navigation";
import ThemeSwitcher from "@/components/client/theme-switcher";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Web Landing Boilerplate",
  description: "Created by Andersseen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <HeaderNavigation
            navLinks={LINKS}
            logo={<Logo />}
            themeSwitcher={<ThemeSwitcher />}
          />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
