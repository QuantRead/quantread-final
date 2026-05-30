import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const articleUrl = "https://quantread.app/blog/the-day-swing-mode-found-its-shape";

export const metadata: Metadata = {
  title: "The Day Swing Mode Found Its Shape | QuantRead",
  description:
    "A build-in-public recap of the May 29 QuantRead swing-mode session, the five live trades it took, and the week of architecture changes that made the system less hesitant.",
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: "The Day Swing Mode Found Its Shape",
    description:
      "Five live swing-mode trades, four winners, one tiny scratch, and the week of routing changes that made the system more coherent.",
    url: articleUrl,
    type: "article",
    images: [
      {
        url: "/swing-mode-live-autopsy-2026-05-29.svg",
        width: 1600,
        height: 1500,
        alt: "QuantRead May 29 swing-mode TradingView channel autopsy.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Day Swing Mode Found Its Shape",
    description:
      "How a week of opening-intake, DVP, Level 2, and swing-contract changes showed up in one live trading day.",
    images: ["/swing-mode-live-autopsy-2026-05-29.svg"],
  },
};

const trades = [
  {
    symbol: "BAC",
    time: "9:42 ET to 9:43 ET",
    role: "Early-zone test",
    result: "-$0.25",
    read:
      "The only fill in the early .146-to-.236 zone. It was close to the daily open inside the trigger channel, but it had tight room and did not expand. That tiny loss was useful because it proved early is not automatically good.",
  },
  {
    symbol: "GS",
    time: "10:52 ET to 11:34 ET",
    role: "Proof continuation",
    result: "+$6.84",
    read:
      "A clean continuation entry after the chart had moved through proof. It was not the biggest win, but it matched the system's stronger post-proof behavior.",
  },
  {
    symbol: "MSTR",
    time: "10:58 ET to 11:34 ET",
    role: "Best mover",
    result: "+$76.20",
    read:
      "The day's strongest capture. The system did not need a perfect label; it needed enough live evidence, pressure, and room to let a real mover work.",
  },
  {
    symbol: "UBER",
    time: "11:06 ET to 11:34 ET",
    role: "Continuation basket",
    result: "+$5.72",
    read:
      "A smaller continuation win that showed why simultaneous sector or theme movement needs room in the portfolio model.",
  },
  {
    symbol: "COIN",
    time: "11:08 ET to 11:34 ET",
    role: "Continuation basket",
    result: "+$15.08",
    read:
      "Another proof-side winner. Earlier chart movement mattered, but the actual fill came when the live stack was cleaner.",
  },
];

const weekChanges = [
  {
    title: "Opening intake got less timid",
    body:
      "The system started the week still acting like the first minutes after the bell needed too much perfect proof. The opening-intake work let high-quality names get considered earlier when rank, room, map position, and live pressure supported the move.",
  },
  {
    title: "Old labels stopped acting like permanent vetoes",
    body:
      "A stale no-room label or stale DVP conflict should not beat fresh measurements. The routing logic was adjusted so current evidence can release old soft blockers while real hard risk still stays hard.",
  },
  {
    title: "Swing mode got one real entry contract",
    body:
      "The swing rebuild moved the system away from a pile of overlapping permission checks. SwingDecisionV2 became the cleaner arbitration layer: execute now, wait for confirmation, or block hard.",
  },
  {
    title: "Thresholds moved toward evidence",
    body:
      "The system had been turning the oven down before the water boiled. DVP weakness, RSI heat, extension, and cloud distance were tuned so the numbers mean closer to what the live evidence says they mean.",
  },
  {
    title: "Level 2 was allowed to help before proof",
    body:
      "The .236 level is still important, but it is not the only way to understand a move. The Level 2 preproof route can now support earlier action when the book, pressure, room, and directional context are clean enough.",
  },
  {
    title: "Capacity now matches the opportunity shape",
    body:
      "The day showed that good trades often arrive in clusters. Swing mode was raised to eight daily trades and five concurrent positions so a sector basket is not blocked by an arbitrary four-trade ceiling.",
  },
];

const architectureFlow = [
  "Chart map and price location",
  "Directional volume pressure",
  "Level 2 and live flow",
  "Execution-quality scoring",
  "Risk, cash, and position limits",
  "Single swing decision",
  "Broker execution and exit management",
  "Audit trail and dashboard truth",
];

export default function SwingModeFoundShapePage() {
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
            The Day Swing Mode Found Its Shape
          </h1>
          <p className="max-w-3xl text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
            May 29 was not a magic day. It was a proof day. QuantRead stayed in swing mode, took five live
            trades, closed four green, scratched one almost flat, and finished the session up about $103.59. More
            importantly, the trades showed that the system is finally acting closer to the architecture it was
            supposed to have: read the map, judge the live tape, respect risk, then move without arguing with old
            blockers.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Live swing mode", "Five trades", "TradingView channels", "Architecture cleanup"].map((tag) => (
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
              src="/swing-mode-live-autopsy-2026-05-29.svg"
              alt="QuantRead May 29 live swing-mode trades overlaid on TradingView channel levels."
              width={1600}
              height={1500}
              priority
              unoptimized
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <figcaption
              className="border-t px-5 py-3 text-sm leading-6"
              style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}
            >
              The May 29 autopsy overlays real fills on one-minute TradingView bars with the system&apos;s Saty, TP,
              volume profile, and pivot map levels. The picture matters because this week was not just about
              whether trades happened; it was about where they happened.
            </figcaption>
          </figure>
        </header>

        <div className="space-y-7 text-[1.05rem] leading-8">
          <section
            className="rounded-2xl border p-6"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border-highlight)" }}
          >
            <h2 className="mb-3 text-2xl font-black tracking-tight">The Scoreboard</h2>
            <p style={{ color: "var(--qr-text-muted)" }}>
              Five live swing-mode entries. Four winners. One tiny loser. Approximate realized result:{" "}
              <strong style={{ color: "#7ee7b8" }}>+$103.59</strong>. The win did not come from a new scalp mode or
              from the Double7 experiment. It came from the live swing model reading price, map, pressure, and
              execution context well enough to take the names that were actually working.
            </p>
          </section>

          <p>
            The most important thing about today is that the system did not win by being reckless. It won after a
            week of making the entry chain more honest. Earlier in the week, the bot could see pieces of a good move
            and still fail to act because a previous layer had already stamped the setup as too extended, too
            uncertain, or too close to a level. Some of those blocks were real risk. Some were stale caution.
          </p>
          <p>
            That distinction became the whole project. The goal was never to create a secret override that ignores
            the rules. The goal was to make the rules mean what they say. If the current tape is strong, the map has
            room, Level 2 is not fighting the entry, and the risk model has space, the system should not sit frozen
            because an older soft warning is still hanging around.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Live Trades</h2>
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
                      {trade.time} | {trade.role}
                    </p>
                  </div>
                  <p
                    className="text-2xl font-black"
                    style={{ color: trade.result.startsWith("+") ? "#7ee7b8" : "#ff8a8a" }}
                  >
                    {trade.result}
                  </p>
                </div>
                <p style={{ color: "var(--qr-text-muted)" }}>{trade.read}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What The Chart Taught Us</h2>
          <p>
            The chart answered one of the hardest questions from this week: were we missing money because the bot was
            too strict in the early zone, or were those early candles not clean enough yet?
          </p>
          <p>
            BAC was the useful counterexample. It fired inside the early zone and lost a quarter. That does not mean
            early entries are bad. It means early entries need pressure, room, and confirmation from the rest of the
            stack. The better winners, especially MSTR and COIN, were not random chases. They were continuation
            entries after the system had stronger proof that the move was alive.
          </p>
          <p>
            That is the new standard: earlier when the evidence is real, patient when the evidence is only a candle
            that happens to be green. The .236 trigger is still a baseline reference point, but the system&apos;s other
            senses exist so it can act before that level when the full picture is already clean.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">How The Week Changed The System</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {weekChanges.map((change) => (
              <section
                key={change.title}
                className="rounded-2xl border p-5"
                style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-3 text-xl font-black tracking-tight">{change.title}</h3>
                <p style={{ color: "var(--qr-text-muted)" }}>{change.body}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Architecture Intent</h2>
          <p>
            The system is supposed to behave like one coherent decision chain, not a hallway of unrelated doors. The
            intended chain is simple:
          </p>
          <div
            className="grid gap-3 rounded-2xl border p-5"
            style={{ background: "rgba(255,255,255,0.025)", borderColor: "var(--qr-border)" }}
          >
            {architectureFlow.map((step, index) => (
              <div key={step} className="flex gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black"
                  style={{ background: "var(--qr-gold)", color: "var(--qr-bg)" }}
                >
                  {index + 1}
                </span>
                <p className="pt-0.5" style={{ color: "var(--qr-text-muted)" }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
          <p>
            Earlier versions had too many places where a candidate could pass one layer and then get contradicted by
            another layer that was built for a different version of the strategy. This week&apos;s work did not remove
            discipline. It put discipline in the right order.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Uncomfortable Lesson</h2>
          <p>
            Today also exposed an accounting and audit problem. Part of the proof trail went quiet during the middle
            of the session, while the live execution path kept reading market and broker data. That means the trades
            were not created by missing data, but the missing audit trail made the post-trade explanation harder and
            may have weakened some of the day-count visibility.
          </p>
          <p>
            That is not something to celebrate. A trading system should not need a messy audit layer to have a good
            day. The correct lesson is the opposite: when opportunity arrives in clusters, the trade-cap and
            position-cap rules should intentionally allow room for that. That is why swing mode now allows eight
            daily trades and five concurrent positions. The system should have enough lane width on purpose, not by
            accident.
          </p>

          <section
            className="mt-12 rounded-2xl border p-8"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.08), var(--qr-surface))",
              borderColor: "rgba(212,175,55,0.28)",
            }}
          >
            <h2 className="mb-4 text-3xl font-black tracking-tight">What Better Means Now</h2>
            <p className="mb-6" style={{ color: "var(--qr-text-muted)" }}>
              Better does not mean the bot buys every name that flashes green. Better means it knows the difference
              between early evidence and early noise. It can use the chart map, directional volume, Level 2, room,
              risk, and execution quality in the right order. It can take a basket when the whole tape is moving. And
              when the trade is no longer worth holding, it can get flat.
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
            Educational note: this article is for general trading education and build-in-public system design only.
            It is not financial advice, a performance guarantee, or a recommendation to buy or sell any security.
            Trade figures reflect the May 29 live-session autopsy reviewed against broker fills and TradingView chart
            data.
          </p>
        </div>
      </article>
    </main>
  );
}
