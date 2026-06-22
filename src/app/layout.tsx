import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudioChat } from "@/components/StudioChat";
import { CookieConsent } from "@/components/CookieConsent";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { createPageMetadata } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://populique.com"),
  ...createPageMetadata({
    title: "Populique — Bespoke Product CGI",
    path: "/",
  }),
  verification: {
    google: "TfGWVAjnZf-uJRp8ydPzGQMJ4iJw8IFL1Jf36lScRQ8",
  },
  icons: {
    icon: [{ url: "/populique-app-icon-primary.svg", type: "image/svg+xml" }],
    apple: "/populique-app-icon-primary.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text antialiased">
        <OrganizationJsonLd />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StudioChat />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
