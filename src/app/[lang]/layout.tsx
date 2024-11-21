import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import { Locale } from "@/i18n-config";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Beauty Line",
  description: "Created by Andersseen",
};

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }, { lang: "ua" }];
}
type Props = {
  children: React.ReactNode;
  params: { lang: Locale };
};
export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>You need to enable JavaScript to run this app.</noscript>

        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
