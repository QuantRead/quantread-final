import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "QuantRead — Intelligence for Modern Traders",
  description:
    "Real-time trade alerts, pre-market intelligence briefs, and proprietary TradingView indicators. Powered by a live quantitative trading engine.",
  keywords: [
    "trading signals",
    "algo trading",
    "trade alerts",
    "pre-market analysis",
    "TradingView indicators",
    "quantitative trading",
  ],
  openGraph: {
    title: "QuantRead — Intelligence for Modern Traders",
    description:
      "Real-time trade alerts, pre-market intelligence briefs, and proprietary TradingView indicators.",
    type: "website",
    url: "https://quantread.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
