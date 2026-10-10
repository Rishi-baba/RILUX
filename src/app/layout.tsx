import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Toaster } from "@/components/Toaster";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

// Brand typography (RILUX brand sheet): Garamond for headlines, Montserrat for body text.
// EB Garamond is the open-licence stand-in for Garamond Premier Pro.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "RILUX | Men's Shirts", template: "%s | RILUX" },
  description: "RILUX makes men's shirts in Giza and pure cotton: formal, regular and casual cuts, made in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${montserrat.variable} antialiased`}
    >
      {/* Extensions (e.g. ColorZilla) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
          <WhatsAppButton />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
