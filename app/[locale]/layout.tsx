import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jean-Denis VIDOT | Senior Full-Stack Developer",
  description:
    "Senior Full-Stack Developer with 9 years of experience. Expert in building client SaaS solutions using modern technologies like TypeScript, React, Next.js, Rust, Go, and more.",
  keywords: [
    "Full-Stack Developer",
    "Senior Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Rust",
    "Go",
    "Kotlin",
    "PHP",
    "Software Architect",
    "Tech Lead",
    "SaaS",
    "Toulouse",
    "France",
  ],
  authors: [{ name: "Jean-Denis VIDOT" }],
  openGraph: {
    title: "Jean-Denis VIDOT | Senior Full-Stack Developer",
    description:
      "Senior Full-Stack Developer with 9 years of experience. Expert in building client SaaS solutions.",
    type: "website",
    locale: "en_US",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
