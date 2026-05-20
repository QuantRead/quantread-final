import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const articleUrl = "https://quantread.app/blog/four-green-receipts-one-honest-autopsy";

export const metadata: Metadata = {
  title: "Four Green Receipts, One Honest Autopsy | QuantRead",
  description:
    "A build-in-public autopsy of the May 20 QuantRead trading session: four live long entries, four green closes, no open broker positions, and a clear grade on what still needs work.",
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: "Four Green Receipts, One Honest Autopsy",
    description:
      "Four green live trades, a flat broker account, and a blunt grade on the system's selection, timing, exits, and observability.",
    url: articleUrl,
    type: "article",
    images: [
      {
        url: "/trade-autopsy-2026-05-20.svg",
        width: 1200,
        height: 760,
        alt: "QuantRead May 20 trade autopsy showing NVDA, AMZN, SOFI, and XLB green receipts.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Four Green Receipts, One Honest Autopsy",
    description:
      "A practical recap of a profitable but imperfect live trading session.",
    images: ["/trade-autopsy-2026-05-20.svg"],
  },
};

const trades = [
  {
    symbol: "NVDA",
    time: "7:07 PT to 7:09 PT",
    entry: "$222.9599",
    exit: "$223.1175 partial, then $222.961 stop",
    size: "7 shares",
    pnl: "+$0.48",
    read:
      "The first live proof that the bot was not frozen. It entered the proof band, took a small market partial, then flattened the rest after the protective stop fallback did its job.",
  },
  {
    symbol: "AMZN",
    time: "7:15 PT to 7:46 PT",
    entry: "$261.41",
    exit: "$262.70",
    size: "6 shares",
    pnl: "+$7.74",
    read:
      "The best net capture of the day. It was not a giant win, but it was the cleanest example of letting a strong long work long enough to pay.",
  },
  {
    symbol: "SOFI",
    time: "7:16 PT to 7:23 PT",
    entry: "$15.435",
    exit: "$15.4601 partial, then $15.48 stop",
    size: "113 shares",
    pnl: "+$3.97",
    read:
      "A fast small-money trade. The system took the first part quickly, then the raised stop finished the rest green.",
  },
  {
    symbol: "XLB",
    time: "7:16 PT to 7:22 PT",
    entry: "$49.359",
    exit: "$49.4001 partial, then $49.43 stop",
    size: "30 shares",
    pnl: "+$1.68",
    read:
      "A sector ETF was allowed through as a lower-volatility capture. Not exciting, but controlled and green.",
  },
];

const grades = [
  {
    area: "Trade selection",
    grade: "A-",
    body:
      "Four entries, four green outcomes, and no direct broker positions left open. That is the scoreboard part, and the scoreboard was good.",
  },
  {
    area: "Entry timing",
    grade: "C+",
    body:
      "The first fill came 37 minutes after the open. That is not the 6:30 PT launch behavior the system is ultimately meant to master.",
  },
  {
    area: "Exit behavior",
    grade: "B+",
    body:
      "The system took partials, used market exits, raised stops, and finished flat. The exits were not dramatic, but they did the job.",
  },
  {
    area: "Protection",
    grade: "B-",
    body:
      "Stops were present and the fallback stop protected the remaining NVDA shares. The weak spot is stop churn: Schwab rejected one replacement, so the fallback had to rescue the position.",
  },
  {
    area: "Observability",
    grade: "C",
    body:
      "The broker and database had the truth, but the dashboard trade list was not telling the whole story cleanly at the end of the day. That is not a trading loss, but it is an operator-confidence problem.",
  },
];

const lessons = [
  "The bot was not blocked from trading. It found, entered, managed, and closed live positions.",
  "The system made money by being selective, not by spraying trades everywhere.",
  "The biggest miss against the vision was timing. This was a profitable first-hour system today, not a perfect opening-bell system.",
  "Market partials and raised stops behaved closer to the intended money-fast model.",
  "Broker truth still matters more than dashboard truth. The autopsy had to use Schwab orders and DB rows to reconstruct the day accurately.",
];

export default function May20AutopsyPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--qr-bg)", color: "var(--qr-text)" }}>
      <article className="mx-auto max-w-4xl px-6 py-10 md:py-16">
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
            Build In Public Trade Autopsy
          </p>
          <h1 className="mb-6 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Four Green Receipts, One Honest Autopsy
          </h1>
          <p className="max-w-3xl text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
            May 20 was not the perfect open-capture day. It was something more modest, but still important:
            the system found four live long trades, closed all four green, and ended flat with direct Schwab
            positions showing no open exposure.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Live broker receipts", "Flat end state", "System grade", "Build in public"].map((tag) => (
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
              src="/trade-autopsy-2026-05-20.svg"
              alt="QuantRead May 20 live trade autopsy showing four green receipts."
              width={1200}
              height={760}
              priority
              unoptimized
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <figcaption
              className="border-t px-5 py-3 text-sm leading-6"
              style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}
            >
              Verified from direct Schwab orders and the trading database: NVDA, AMZN, SOFI, and XLB all closed
              green for a combined realized result of +$13.87.
            </figcaption>
          </figure>
        </header>

        <div className="space-y-7 text-[1.05rem] leading-8">
          <section
            className="rounded-2xl border p-6"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border-highlight)" }}
          >
            <h2 className="mb-3 text-2xl font-black tracking-tight">The Grade</h2>
            <p style={{ color: "var(--qr-text-muted)" }}>
              Outcome grade: <strong style={{ color: "#7ee7b8" }}>A-</strong>. System-intent grade:{" "}
              <strong style={{ color: "var(--qr-gold)" }}>B</strong>. Overall grade:{" "}
              <strong style={{ color: "var(--qr-gold)" }}>B+</strong>. The day made money and got flat, but it
              still did not prove the opening-bell speed standard.
            </p>
          </section>

          <p>
            The best way to judge today is to separate the scoreboard from the architecture.
          </p>
          <p>
            The scoreboard was clean: four live long entries, four profitable closes, direct Schwab positions flat,
            and roughly +$13.87 realized. That matters. After several days of fighting old blockers, dashboard
            confusion, and route-contract drift, the system actually did the thing a trading system is supposed to
            do: find trades, take money, and remove risk.
          </p>
          <p>
            The architecture was better, but not finished. The first entry did not happen until 7:07 PT. That means
            the bot was profitable today, but it was not yet the perfect 6:30 PT opening-lane machine the system is
            being built to become.
          </p>

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
                  <p className="text-2xl font-black" style={{ color: "#7ee7b8" }}>
                    {trade.pnl}
                  </p>
                </div>
                <p className="mb-3 text-sm font-bold" style={{ color: "var(--qr-text-muted)" }}>
                  Entry {trade.entry} | Exit {trade.exit}
                </p>
                <p style={{ color: "var(--qr-text-muted)" }}>{trade.read}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What Went Right</h2>
          <p>
            The system did not overtrade into garbage. It waited until names passed enough route and conviction
            evidence, then used small position sizes and quick exits. That is why a session with modest dollar gains
            still deserves respect. A bot that makes a small amount and gets flat is healthier than a bot that makes
            a dramatic promise and leaves the account exposed.
          </p>
          <p>
            AMZN was the best clean capture. SOFI and XLB showed the partial-and-stop lifecycle. NVDA proved the
            system could recover when a stop replacement failed, because the fallback protective stop handled the
            remaining shares.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What Still Was Not Good Enough</h2>
          <p>
            The first problem is timing. A system built around early winner DNA should eventually prove that it can
            act closer to the opening lane, not only after the first half hour has passed.
          </p>
          <p>
            The second problem is stop churn. The NVDA stop replacement hit a Schwab HTTP 400, then the fallback
            standalone stop solved it. That is good emergency behavior, but the cleaner version is fewer stop
            replacement fights in the first place.
          </p>
          <p>
            The third problem is observability. The end-of-day dashboard surface did not show the full trade story
            cleanly, so the real autopsy had to come from direct Schwab orders plus the trading database. For an
            operator, that matters. Trust comes from seeing the same truth everywhere.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Scorecard</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {grades.map((item) => (
              <section
                key={item.area}
                className="rounded-2xl border p-5"
                style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-black">{item.area}</h3>
                  <span className="text-2xl font-black" style={{ color: "var(--qr-gold)" }}>
                    {item.grade}
                  </span>
                </div>
                <p style={{ color: "var(--qr-text-muted)" }}>{item.body}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Lessons</h2>
          <ul className="space-y-3 pl-6">
            {lessons.map((lesson) => (
              <li key={lesson} className="list-disc">
                {lesson}
              </li>
            ))}
          </ul>

          <section
            className="mt-12 rounded-2xl border p-8"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.08), var(--qr-surface))",
              borderColor: "rgba(212,175,55,0.28)",
            }}
          >
            <h2 className="mb-4 text-3xl font-black tracking-tight">The Point Of The Day</h2>
            <p className="mb-6" style={{ color: "var(--qr-text-muted)" }}>
              Today was not a moonshot day. It was a control day. The system made money, managed exits, proved the
              broker loop still worked, and ended flat. The next level is not adding more noise. It is making the
              same clean behavior happen earlier, with clearer operator visibility.
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
            performance guarantee, or a recommendation to buy or sell any security. Trade figures reflect the May 20
            live broker and database records reviewed during the autopsy.
          </p>
        </div>
      </article>
    </main>
  );
}
