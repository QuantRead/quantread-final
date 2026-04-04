import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase Complete — QuantRead Indicator Suite",
  description: "Your Indicator Suite is ready. Copy the Pine Script source code and add it to TradingView.",
  robots: { index: false, follow: false }, // Don't index the delivery page
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
