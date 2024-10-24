import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"

const quicksand = localFont({
  src: "./fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArabellaConsultants | Your Business Growth Partner",
  description:
    "Empower your business with our expert financial services. From bookkeeping to tax optimization, we provide tailored solutions for your success.",
  keywords:
    "financial services, bookkeeping, tax optimization, payroll management, business setup",
  openGraph: {
    title: "ArabellaConsultants | Your Business Growth Partner",
    description:
      "Empower your business with our expert financial services. From bookkeeping to tax optimization, we provide tailored solutions for your success.",
    images: [
      {
        url: "https://arabellaconsultants.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Financial Services Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArabellaConsultants | Your Business Growth Partner",
    description:
      "Empower your business with our expert financial services. From bookkeeping to tax optimization, we provide tailored solutions for your success.",
    images: ["https://arabellaconsultants.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://arabellaconsultants.com" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Company Name" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${quicksand.className}`}>
        <ClientLayout>{children}</ClientLayout>
        <Script id="crisp-widget" strategy="afterInteractive">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="4e72003b-1049-4a9e-8c83-f04e6296a885";
            (function() {
              const d = document;
              const s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
        <SpeedInsights />
      </body>
    </html>
  );
}
