import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

import MobileNav from "@/components/landing/MobileNav";

export const metadata: Metadata = {
  title: "CLEANOVA | Premium Laundry & Dry Cleaning Services",
  description: "CLEANOVA is dedicated to providing exceptional care, hygiene and freshness for your fabrics. Professional laundry, dry cleaning, and home cleaning services.",
  keywords: ["cleanova", "laundry service", "dry cleaning", "home cleaning", "ironing services", "professional laundry"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CLEANOVA",
  },
};

export const viewport = {
  themeColor: "#0056b3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${inter.variable} ${poppins.variable} antialiased scroll-smooth overflow-x-hidden`}
      >
      <body className="font-sans pb-24 md:pb-0 overflow-x-hidden">
        {children}
        <MobileNav />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
