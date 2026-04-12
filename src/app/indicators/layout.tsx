import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuantRead Indicators — Proprietary TradingView Pine Script Suite",
  description:
    "Two proprietary TradingView indicators with Pine Script source code. The same conviction engine that runs a live trading portfolio — now on your chart. $49 one-time or included with Ticker Grader Pro ($14.99/mo).",
  keywords: [
    "TradingView indicators",
    "Pine Script",
    "trading indicators",
    "ATR indicator",
    "conviction scoring",
    "quantitative trading",
    "EMA ribbon indicator",
    "trade signals TradingView",
  ],
  openGraph: {
    title: "QuantRead Indicators — Take the Brain With You",
    description:
      "Two proprietary TradingView indicators with Pine Script source code. $49 one-time or included with Ticker Grader Pro.",
    type: "website",
    url: "https://quantread.app/indicators",
  },
};

export default function IndicatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
