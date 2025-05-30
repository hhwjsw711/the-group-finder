import "@/app/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ReactNode, Suspense } from "react";
import { Providers } from "@/providers/providers";
import { applicationName, appConfig } from "@/app-config";
import PostHogPageView from "@/components/posthog-page-view";
import { getMessages } from "next-intl/server";
import { Archivo } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import { BreakpointOverlay } from "@/components/breakpoint-overlay";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

const { mode } = appConfig;

export const metadata: Metadata = {
  title: applicationName,
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords:
    "next.js, starter kit, saas, ecommerce, digital products, saas code kit, indie hacking, indie hacker kit, micro saas, entrepreneurship, Code Starter Kit, SaaS Product Launch, Code Documentation Tutorial, Beginner Coding Kit, Start-up SaaS Kit, Coding Guides and Resources, Video Tutorials for Coding, Beginner SaaS Guide, Launch your First SaaS, Step-by-step Coding Kit, SaaS Launch Kit, Software as a Service Starter, Easy Code Launch Kit, Coding Skills for SaaS, Starter Kit for SaaS, Code, Document, Launch, Comprehensive Coding Starter Kit, Master SaaS Product Launch, SaaS Documentation Tutorial, First-Time Coders Kit, SaaS coding course, Initiate SaaS Journey, Seamless SaaS Launch Guide, First SaaS Product Guidance, Bootstrap SaaS Tutorial, Ultimate SaaS Starter Pack, Learning Guide for SaaS, DIY SaaS Kit, Code your SaaS Product, All-in-one Coding Starter Kit",
  description:
    "The code kit to help you quickly setup an online store and sell your digital assets without a middleman skipping off the top of your profits.",
  openGraph:
    mode === "comingSoon"
      ? {
        title: "WDCStarterKit.com",
        description:
          "I'm building the ultimate next.js starter kit to help you hit the ground runnning on your next saas product.",
        url: "https://wdcstarterkit.com",
        siteName: "WDC StarterKit",
        type: "website",
        images: [
          {
            url: "https://wdcstarterkit.com/starterkitcard.png",
            secureUrl: "https://wdcstarterkit.com/starterkitcard.png",
            width: 800,
            height: 418,
            alt: "The WDC StarterKit social media card image",
          },
        ],
      }
      : undefined,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          archivo.variable + " " + libre_franklin.variable
        )}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <Suspense>
              <PostHogPageView />
            </Suspense>
            <NextTopLoader />
            {children}
            <Toaster />
            <BreakpointOverlay />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
