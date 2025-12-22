import type { Metadata } from "next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { fontClassMap } from "@/lib/fonts";
import Header from "@/components/layouts/header";
import { getCurrentTheme } from "@/lib/current-theme";
import { getCurrentFont } from "@/lib/current-font";
import { getCurrentSeason } from "@/lib/current-season";
import ThemeProvider from "@/components/providers/theme-provider";
import Background from "@/components/layouts/background";
import Footer from "@/components/layouts/footer";
import Chatbot from "@/components/chatbot/chatbot";
import StructuredData from "@/components/seo/structured-data";
import DynamicFavicon from "@/components/seo/dynamic-favicon";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Snowfall } from "react-snowfall";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://clementomnes.dev"
      : "http://localhost:3000"
  ),
  title: {
    default: "Clément Omnès - Software Engineer & Full-Stack Developer",
    template: "%s | Clément Omnès",
  },
  description:
    "Passionate full-stack developer and Software Engineering student with 3+ years of experience. Specializing in React, Java, TypeScript, and modern technologies.",
  keywords: [
    "Clément Omnès",
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Java",
    "Spring",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Clément Omnès", url: "https://clementomnes.dev" }],
  creator: "Clément Omnès",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clementomnes.dev",
    title: "Clément Omnès - Software Engineer & Full-Stack Developer",
    description:
      "Passionate full-stack developer and Software Engineering student with 3+ years of experience. Specializing in React, Java, TypeScript, and modern technologies.",
    siteName: "Clément Omnès Portfolio",
    images: [
      {
        url: "/opengraph-image-en.png",
        width: 1200,
        height: 630,
        alt: "Clément Omnès - Software Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clément Omnès - Software Engineer & Full-Stack Developer",
    description:
      "Passionate full-stack developer and Software Engineering student with 3+ years of experience.",
    images: ["/me.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const theme = await getCurrentTheme();
  const font = await getCurrentFont();
  const season = await getCurrentSeason();

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <DynamicFavicon />
        <StructuredData />
      </head>
      <body className={`${fontClassMap[font]} antialiased ${season}`}>
        <SpeedInsights />
        <Analytics />
        <NextIntlClientProvider>
          <ThemeProvider initialTheme={theme}>
            <Background />
            <Header />
            <main>{children}</main>
            <Chatbot />
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
