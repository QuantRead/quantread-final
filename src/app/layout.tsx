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
    "Watchlist alerts, pre-market intelligence briefs, TradingView indicators, and live system transparency powered by a quantitative trading engine.",
  keywords: [
    "watchlist alerts",
    "algo trading",
    "trade alerts",
    "pre-market analysis",
    "TradingView indicators",
    "quantitative trading",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "QuantRead — Intelligence for Modern Traders",
    description:
      "Watchlist alerts, pre-market intelligence briefs, proprietary TradingView indicators, and live system transparency.",
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
