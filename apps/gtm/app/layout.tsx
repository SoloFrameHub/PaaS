import "./css/style.css";

import localFont from "next/font/local";
import Script from "next/script";
import Theme from "./theme-provider";
import AppProvider from "./app-provider";
import ErrorBoundary from "@/components/error-boundary";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/woff2/inter-v20-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/inter-v20-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/woff2/inter-v20-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/woff2/inter-v20-latin-500italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/woff2/inter-v20-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Solo GTM OS for Solo Founders | SoloFrameHub",
  description:
    "Not a course — an operating system. Master systematic customer acquisition with AI-powered coaching, roleplay, and frameworks built for solo founders. $29.95/month replaces a $5K/month sales team.",
  keywords:
    "solo GTM OS, customer acquisition, solo founder sales, founder-led sales, B2B SaaS sales system, AI sales coaching, bootstrapped founder sales, solopreneur OS",
  openGraph: {
    type: "website",
    url: "https://soloframehub.com/",
    title: "Solo GTM OS — Not a course. An operating system.",
    description:
      "Not a course — an operating system. AI-powered coaching, roleplay, and frameworks that turn solo founders into systematic customer acquisition machines.",
    images: [
      "https://soloframehub.com/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solo GTM OS — Not a course. An operating system.",
    description:
      "Not a course — an operating system. AI-powered coaching, roleplay, and frameworks that turn solo founders into systematic customer acquisition machines.",
    images: [
      "https://soloframehub.com/images/landing/images/AI-POWERED CUSTOMER ACQUISITION PLAYBOOK.webp",
    ],
  },
  icons: {
    icon: "/images/landing/images/soloframehub-site-icon.png",
  },
};

import PWARegistration from "@/components/pwa-registration";
import QueryProvider from "@/components/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${inter.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SFYRWNQKZG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SFYRWNQKZG');
          `}
        </Script>
      </head>
      <body
        className="font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
        suppressHydrationWarning
      >
        <Script id="chatwoot-widget" strategy="afterInteractive">
          {`
            (function(d,t) {
              var BASE_URL="https://support.soloframehub.com";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: 'wcygCAqeimZ96MXQcAHE11Kg',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `}
        </Script>
        <PWARegistration />
        <ErrorBoundary>
          <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Theme>
                <AppProvider>{children}</AppProvider>
              </Theme>
            </NextIntlClientProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
