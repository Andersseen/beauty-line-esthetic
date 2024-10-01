import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/client/footer";
import Header from "@/components/client/header";

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
  title: "Beauty Salon",
  description: "Created by Andersseen",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "ua" }];
}
type Props = {
  children: React.ReactNode;
  params: { lang: string };
};
export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  // const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
