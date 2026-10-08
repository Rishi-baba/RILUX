import type { Metadata } from "next";
import { Archivo_Narrow, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

// Body/nav face (matches source exactly — free Google font)
const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Display serif — open stand-in for the source's licensed display face
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// UI sans — open stand-in for the source's licensed geometric sans
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rilux",
  description: "Rilux storefront template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoNarrow.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
