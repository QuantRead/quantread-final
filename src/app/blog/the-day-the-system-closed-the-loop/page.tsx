import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const articleUrl = "https://quantread.app/blog/the-day-the-system-closed-the-loop";

export const metadata: Metadata = {
  title: "The Day The System Closed The Loop | QuantRead",
  description:
    "A build-in-public recap of May 18 trading: four green receipts, repaired broker-position truth, and what the UBER, PLTR, CVNA, and MSFT trades taught the system.",
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: "The Day The System Closed The Loop",
    description:
      "Four closed green receipts and a cleaner trading loop after broker-position visibility and accounting were repaired.",
    url: articleUrl,
    type: "article",
    images: [
      {
        url: "/trade-recap-2026-05-18.svg",
        width: 1200,
        height: 720,
        alt: "QuantRead May 18 live trade recap showing green results for UBER, PLTR, CVNA, and MSFT.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Day The System Closed The Loop",
    description:
      "What today's UBER, PLTR, CVNA, and MSFT trades taught QuantRead about selection, exits, and broker truth.",
    images: ["/trade-recap-2026-05-18.svg"],
  },
};

const trades = [
  {
    symbol: "UBER",
    time: "6:48 PT to 7:19 PT",
    entry: "$75.555",
    exit: "$75.760",
    size: "33 shares",
    pnl: "+$3.54",
    pct: "+0.14%",
    read:
      "Early-band launch evidence was present, with daily-open and VWAP alignment. The trade was green, but it also exposed why broker-position truth had to be repaired.",
  },
  {
    symbol: "PLTR",
    time: "7:05 PT to 7:07 PT",
    entry: "$135.20",
    exit: "$135.4201",
    size: "18 shares",
    pnl: "+$4.95",
    pct: "+0.20%",
    read:
      "The score stack was strong, but room was tight. This was a fast, small capture, not a trade that deserved unlimited benefit of the doubt.",
  },
  {
    symbol: "CVNA",
    time: "7:07 PT to 7:15 PT",
    entry: "$67.70",
    exit: "$68.555",
    size: "25 shares",
    pnl: "+$21.38",
    pct: "+1.26%",
    read:
      "This was the cleanest expression of the winner model: early-band launch, usable room, relative strength, daily-open alignment, and enough movement to pay quickly.",
  },
  {
    symbol: "MSFT",
    time: "11:25 PT to 11:31 PT",
    entry: "$423.745",
    exit: "$423.85",
    size: "4 shares",
    pnl: "+$0.70",
    pct: "+0.04%",
    read:
      "The post-repair sanity check. It entered, managed, and exited without the system losing the position or corrupting the receipt.",
  },
];

const commonFactors = [
  "Every trade had a route permit from the underlying evidence, not from a naked letter grade.",
  "Every ticker was working inside the early-band model, with directional progress near the .146 to .236 zone.",
  "Daily open alignment was present across the group.",
  "VWAP alignment or support was part of the setup context.",
  "The best trade, CVNA, had the cleanest combination of room, relative strength, and fast follow-through.",
  "The smallest trades, PLTR and MSFT, prove the point of taking money when the realistic move is limited.",
];

const lessons = [
  {
    title: "The selection brain was better than the morning felt.",
    body:
      "The system did not pick random names. UBER, PLTR, CVNA, and MSFT all made money after passing through the same early-band evidence model that was rebuilt from winner behavior.",
  },
  {
    title: "The plumbing mattered as much as the prediction.",
    body:
      "Earlier in the day, broker-position visibility and partial-exit accounting were not trustworthy enough. Once that was repaired, the system could finally let the trade lifecycle tell the truth.",
  },
  {
    title: "Small green exits are not failures.",
    body:
      "If a stock has already used much of its expected move, a small profit can be the correct exit. The system should not demand another leg just because the trade is green.",
  },
  {
    title: "CVNA was the clean model trade.",
    body:
      "CVNA had the best mix of launch behavior, room to target, and continuation. It showed why the system is looking for common winner DNA instead of just chasing visible scanner grade.",
  },
];

export default function ClosedLoopTradingDayPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--qr-bg)", color: "var(--qr-text)" }}>
      <article className="mx-auto max-w-3xl px-6 py-10 md:py-16">
        <nav className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black"
              style={{ background: "var(--qr-gold)", color: "var(--qr-bg)" }}
            >
              Q
            </span>
            <span className="text-lg font-bold tracking-tight">QuantRead</span>
          </Link>
          <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--qr-text-muted)" }}>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
            <a
              href="https://quantread-ticker-grader.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Ticker Grader
            </a>
          </div>
        </nav>

        <header className="mb-12 border-b pb-10" style={{ borderColor: "var(--qr-border)" }}>
          <p
            className="mb-5 text-xs font-black uppercase tracking-[0.22em]"
            style={{ color: "var(--qr-gold)" }}
          >
            Build In Public Trade Recap
          </p>
          <h1 className="mb-6 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            The Day The System Closed The Loop
          </h1>
          <p className="text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
            May 18 was not about one giant trade. It was about something more important: the system selected
            winners, the ledger was repaired, and the post-repair MSFT trade showed the lifecycle working cleanly.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Live trading", "Trade recap", "Execution plumbing"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 text-xs font-bold"
                style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <figure
            className="mt-10 overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--qr-border)", background: "var(--qr-surface)" }}
          >
            <Image
              src="/trade-recap-2026-05-18.svg"
              alt="QuantRead May 18 live trade recap with UBER, PLTR, CVNA, and MSFT green receipts."
              width={1200}
              height={720}
              priority
              unoptimized
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <figcaption
              className="border-t px-5 py-3 text-sm leading-6"
              style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}
            >
              Verified May 18 ledger after the one-time database repair: four green receipts, total realized P&amp;L
              of +$30.57, and no live broker positions open at the time of review.
            </figcaption>
          </figure>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-8">
          <p>
            The honest story of today is two stories at the same time.
          </p>
          <p>
            First, the trading brain was not as broken as the morning felt. It found four names that closed green:
            UBER, PLTR, CVNA, and MSFT. Second, the system plumbing had to be repaired so the dashboard, the
            database, and the broker position truth stopped disagreeing with each other.
          </p>
          <p>
            That second part matters. A trading system can choose well and still behave badly if it loses track of
            what it owns. Today proved both sides of that lesson.
          </p>

          <section
            className="rounded-2xl border p-6"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border-highlight)" }}
          >
            <h2 className="mb-3 text-2xl font-black tracking-tight">Plain-English Result</h2>
            <p style={{ color: "var(--qr-text-muted)" }}>
              Four green trade receipts. Total realized P&amp;L: +$30.57. The biggest win was CVNA. The cleanest
              operational proof was MSFT, because it happened after the position/accounting repair and closed without
              the system losing the trade.
            </p>
          </section>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Trades</h2>
          <div className="grid gap-4">
            {trades.map((trade) => (
              <section
                key={trade.symbol}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.025)", borderColor: "var(--qr-border)" }}
              >
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{trade.symbol}</h3>
                    <p className="text-sm font-bold" style={{ color: "var(--qr-text-muted)" }}>
                      {trade.time} | {trade.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: "#7EE7B8" }}>
                      {trade.pnl}
                    </p>
                    <p className="text-sm font-bold" style={{ color: "var(--qr-text-muted)" }}>
                      {trade.pct}
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-sm font-bold" style={{ color: "var(--qr-text-muted)" }}>
                  Entry {trade.entry} | Exit {trade.exit}
                </p>
                <p style={{ color: "var(--qr-text-muted)" }}>{trade.read}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What They Had In Common</h2>
          <p>
            The best part of today was not that every ticker paid a lot. They did not. The best part was that they
            were not random. They shared the same kind of evidence the system has been rebuilt to care about.
          </p>
          <ul className="space-y-3 pl-6">
            {commonFactors.map((factor) => (
              <li key={factor} className="list-disc">
                {factor}
              </li>
            ))}
          </ul>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Important Difference Between CVNA And MSFT</h2>
          <p>
            CVNA was the money trade. It had room, relative strength, early-band launch behavior, daily-open
            alignment, and fast follow-through. That is what the winner archetype is supposed to find.
          </p>
          <p>
            MSFT was the process trade. It was smaller, but it mattered because it happened after the repair. The
            system entered, tracked the position, closed it, and produced a green receipt without the old position
            visibility problem taking over the story.
          </p>
          <p>
            That is why the MSFT trade was encouraging even though the dollar amount was small. In automation, clean
            behavior is part of the edge.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What Went Wrong First</h2>
          <p>
            Earlier in the day, the system could be right about the setup and still wrong about the lifecycle. The
            broker knew a position existed, but the software layer could fail to map that position correctly into the
            live portfolio. That meant websocket exits, dashboard state, and P&amp;L accounting could disagree.
          </p>
          <p>
            That got repaired. The database was corrected, the broker-position mapping was fixed, partial-exit rows
            were made visible to open-trade logic, and impossible stale P&amp;L is now rejected instead of poisoning
            the day.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Lessons</h2>
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <section
                key={lesson.title}
                className="rounded-2xl border p-5"
                style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-2 text-xl font-black">{lesson.title}</h3>
                <p style={{ color: "var(--qr-text-muted)" }}>{lesson.body}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What This Says About The System</h2>
          <p>
            The system is getting closer to the intended shape: find the early winner evidence, act before the move
            is stale, and take the gain when the realistic runway is no longer generous.
          </p>
          <p>
            It still should not be treated as finished. PLTR was profitable but tight. UBER needed the day&apos;s
            repair work to make the final accounting honest. MSFT was clean but small. Those are not reasons to
            declare victory forever. They are reasons to keep tightening the loop.
          </p>
          <p>
            But today did answer one important question: was the scanner looking at the wrong kind of stocks? Based on
            the four trades that actually closed green, the answer is no. The stock selection was better than the
            morning felt. The bigger enemy was the mismatch between trade selection, broker truth, and exit
            accounting.
          </p>

          <section
            className="mt-12 rounded-2xl border p-8"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.08), var(--qr-surface))",
              borderColor: "rgba(212,175,55,0.28)",
            }}
          >
            <h2 className="mb-4 text-3xl font-black tracking-tight">The Point Of The Day</h2>
            <p className="mb-6" style={{ color: "var(--qr-text-muted)" }}>
              The system does not need to be louder. It needs to be honest, fast, and clean from signal to broker to
              exit receipt. May 18 was the first day where that full loop started to look visible.
            </p>
            <a
              href="https://quantread-ticker-grader.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl px-6 py-3 text-sm font-black"
              style={{ background: "var(--qr-gold)", color: "var(--qr-bg)" }}
            >
              Open Ticker Grader
            </a>
          </section>

          <p className="border-t pt-8 text-sm" style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-dim)" }}>
            Educational note: this article is for general trading education only. It is not financial advice, a
            performance claim, or a recommendation to buy or sell any security. The trade figures above reflect the
            internal May 18 ledger after the one-time database repair described in the post.
          </p>
        </div>
      </article>
    </main>
  );
}
