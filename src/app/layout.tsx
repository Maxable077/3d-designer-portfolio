import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudioChat } from "@/components/StudioChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Max — Product Visuals & 3D Design",
  description:
    "Product renders, 3D visualizations and technical presentations by Max, a Dutch product design student and 3D visualizer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-text antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StudioChat />
      </body>
    </html>
  );
}
