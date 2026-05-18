import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QuantRead Blog | Trading Setup Quality and Ticker Grader Workflows",
  description:
    "Blunt trading education from QuantRead on setup quality, scanner sanity checks, execution readiness, Ticker Grader workflows, trend, volume, RSI, ATR, and relative strength.",
  alternates: {
    canonical: "https://quantread.app/blog",
  },
  openGraph: {
    title: "QuantRead Blog",
    description:
      "Trading setup quality, scanner sanity checks, execution readiness, and practical Ticker Grader workflows.",
    url: "https://quantread.app/blog",
    type: "website",
    images: [
      {
        url: "/chart_preview.png",
        width: 1024,
        height: 1024,
        alt: "QuantRead chart preview for trading setup-quality education.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantRead Blog",
    description:
      "Trading setup quality, scanner sanity checks, execution readiness, and practical Ticker Grader workflows.",
    images: ["/chart_preview.png"],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--qr-bg)", color: "var(--qr-text)" }}>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--qr-border)" }}>
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 hero-glow" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
          <nav className="mb-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black" style={{ background: "var(--qr-gold)", color: "var(--qr-bg)" }}>Q</span>
              <span className="text-lg font-bold tracking-tight">QuantRead</span>
            </Link>
            <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--qr-text-muted)" }}>
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <a href="https://quantread-ticker-grader.onrender.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Ticker Grader</a>
              <Link href="/indicators" className="transition-colors hover:text-white">Indicators</Link>
            </div>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.22em]" style={{ color: "var(--qr-gold)" }}>QuantRead Blog</p>
            <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Trading setup quality without the scanner circus.
            </h1>
            <p className="max-w-2xl text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
              Blunt trading education for people trying to decide whether a hot ticker is actually worth attention, or just blinking loudly in the corner like a slot machine with a brokerage account.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16">
        <Link
          href="/blog/the-day-the-system-closed-the-loop"
          className="group block rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 md:p-10"
          style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {["Live trading", "Trade recap", "Execution plumbing"].map((tag) => (
              <span key={tag} className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-7 overflow-hidden rounded-xl border" style={{ borderColor: "var(--qr-border)" }}>
            <Image
              src="/trade-recap-2026-05-18.svg"
              alt="QuantRead May 18 live trade recap showing green receipts for UBER, PLTR, CVNA, and MSFT."
              width={1200}
              height={720}
              unoptimized
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
          <h2 className="mb-4 max-w-4xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            The Day The System Closed The Loop
          </h2>
          <p className="mb-7 max-w-3xl text-base leading-7" style={{ color: "var(--qr-text-muted)" }}>
            A May 18 build-in-public trading recap: four green receipts, repaired broker-position truth, and what UBER, PLTR, CVNA, and MSFT taught the system.
          </p>
          <span className="inline-flex items-center text-sm font-black" style={{ color: "var(--qr-gold)" }}>
            Read the trading recap
            <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
          </span>
        </Link>

        <Link
          href="/blog/the-dna-of-a-winner"
          className="group block rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 md:p-10"
          style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {["Algo trading", "Early band", "Execution readiness"].map((tag) => (
              <span key={tag} className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-7 overflow-hidden rounded-xl border" style={{ borderColor: "var(--qr-border)" }}>
            <Image
              src="/institutional_dashboard.png"
              alt="QuantRead dashboard used to study early-band trading setup readiness."
              width={1536}
              height={1024}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
          <h2 className="mb-4 max-w-4xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            The DNA of a Winner
          </h2>
          <p className="mb-7 max-w-3xl text-base leading-7" style={{ color: "var(--qr-text-muted)" }}>
            A build-in-public breakdown of the system shift from visible grades to the hidden evidence inside early morning winners.
          </p>
          <span className="inline-flex items-center text-sm font-black" style={{ color: "var(--qr-gold)" }}>
            Read the system notes
            <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
          </span>
        </Link>

        <Link
          href="/blog/what-a-bad-market-open-taught-us-about-building-a-trading-bot"
          className="group block rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 md:p-10"
          style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {["Algo trading", "Execution readiness", "Market open"].map((tag) => (
              <span key={tag} className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-7 overflow-hidden rounded-xl border" style={{ borderColor: "var(--qr-border)" }}>
            <Image
              src="/institutional_dashboard.png"
              alt="QuantRead dashboard used for scanner and execution readiness review."
              width={1536}
              height={1024}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
          <h2 className="mb-4 max-w-4xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            What Did A Bad Market Open Teach Us About Building A Trading Bot?
          </h2>
          <p className="mb-7 max-w-3xl text-base leading-7" style={{ color: "var(--qr-text-muted)" }}>
            A build-in-public postmortem on scanner grades, Schwab auth, market open speed, dirty setups, and the launch-lane model that came out of it.
          </p>
          <span className="inline-flex items-center text-sm font-black" style={{ color: "var(--qr-gold)" }}>
            Read the case study
            <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
          </span>
        </Link>

        <Link
          href="/blog/how-do-i-know-if-a-stock-is-actually-a-good-day-trade-setup"
          className="group block rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 md:p-10"
          style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
        >
          <div className="mb-6 flex flex-wrap gap-2">
            {["Day trading", "Setup quality", "Ticker Grader"].map((tag) => (
              <span key={tag} className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-7 overflow-hidden rounded-xl border" style={{ borderColor: "var(--qr-border)" }}>
            <Image
              src="/chart_preview.png"
              alt="QuantRead chart preview for evaluating whether a hot ticker has clean setup quality."
              width={1024}
              height={1024}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
          <h2 className="mb-4 max-w-4xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
            How Do I Know If a Stock Is Actually a Good Day Trade Setup?
          </h2>
          <p className="mb-7 max-w-3xl text-base leading-7" style={{ color: "var(--qr-text-muted)" }}>
            A hot stock is not automatically a clean trade. Sometimes it is opportunity. Sometimes it is a flaming shopping cart with a ticker symbol taped to the front.
          </p>
          <span className="inline-flex items-center text-sm font-black" style={{ color: "var(--qr-gold)" }}>
            Read the article
            <span className="ml-2 transition-transform group-hover:translate-x-1">-&gt;</span>
          </span>
        </Link>
      </section>
    </main>
  );
}
