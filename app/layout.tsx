import type { Metadata } from "next";
import "./globals.css";
import { STORE } from "@/lib/store";

export const metadata: Metadata = {
  title: `${STORE.name} · James Bay, Victoria`,
  description:
    "Independent convenience grocery at 148 Superior Street in James Bay. Everyday staples, snacks, lottery, and a friendly corner-shop welcome.",
  openGraph: {
    title: STORE.name,
    description: STORE.tagline,
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
