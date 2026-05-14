import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const articleUrl =
  "https://quantread.app/blog/what-a-bad-market-open-taught-us-about-building-a-trading-bot";

export const metadata: Metadata = {
  title: "What A Bad Market Open Taught Us About Building A Trading Bot | QuantRead",
  description:
    "A build-in-public case study on scanner grades, execution readiness, market open speed, Schwab auth, meme-stock traps, and the .146 to .236 launch-lane model.",
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: "What A Bad Market Open Taught Us About Building A Trading Bot",
    description:
      "The real lesson was not that the scanner needed more noise. It was that discovery, quality, readiness, and execution are different jobs.",
    url: articleUrl,
    type: "article",
    images: [
      {
        url: "/institutional_dashboard.png",
        width: 1536,
        height: 1024,
        alt: "QuantRead dashboard used for scanner and execution readiness review.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What A Bad Market Open Taught Us About Building A Trading Bot",
    description:
      "A practical postmortem on scanner grades, launch lanes, and why trade-ready is not the same as interesting.",
    images: ["/institutional_dashboard.png"],
  },
};

const timeline = [
  {
    title: "Auth had to be fixed before the market mattered.",
    body:
      "The day started with Schwab authentication, not chart analysis. The important discovery was that the login path crossed two systems: the trading engine that starts the OAuth flow, and the QuantRead website callback that receives it. When those two sides disagree about login state, the trading bot can be healthy and still blocked from account access.",
  },
  {
    title: "The open exposed speed as a trading variable.",
    body:
      "At the open, being correct five minutes late is still a bad execution process. A setup can be real at 6:30 PT and much less attractive by 6:35 PT. That forced the system to stop treating confirmation as a slow review step and start treating readiness as something that has to exist before the trigger fires.",
  },
  {
    title: "Scanner grade and execution grade were not the same thing.",
    body:
      "The scanner was good at finding names worth attention. The structural ticker grade was good at describing chart quality. But the operator experience blurred those two ideas together, which led to overcorrection: gates, filters, and thresholds were added to make one display feel like the other. That was the wrong lesson.",
  },
  {
    title: "Dirty names taught us that attention can imitate quality.",
    body:
      "High-attention, meme-style tickers can look active while still being structurally hostile. The lesson was not simply to dislike one ticker. The deeper lesson was that some setups are designed by the tape itself to create urgency, fake confirmation, and punish late entries.",
  },
  {
    title: "The breakthrough was the launch lane.",
    body:
      "The strongest idea that came out of the day was that winning candidates should not be discovered after they are already extended. They should be staged before the open, sitting in an early opportunity band, moving in the right direction, and waiting for proof.",
  },
];

const alignmentChecklist = [
  "Premarket or open bias is already pointing in the trade direction.",
  "Directional volume is supporting the move instead of fighting it.",
  "The name is in the early launch band, not already stretched.",
  "Price is moving toward proof, not resting, fading, or drifting away.",
  "There is enough room to the next meaningful channel for the trade to matter.",
  "The setup is near the trigger before confirmation, not dollars above it after the move is obvious.",
  "The dashboard can label the state clearly: armed, ready, gated, blocked, or missed.",
];

const mistakes = [
  "They treat a scanner as an execution system.",
  "They treat movement as quality.",
  "They treat a good idea late as if it were still the same good idea.",
  "They confuse being near a level with actively launching from that level.",
  "They add filters after a loss without asking whether the filters target the actual failure.",
  "They chase proof after proof has already become price.",
];

const systemChanges = [
  {
    label: "Discovery",
    detail:
      "The scanner can still surface interesting tickers, but interesting is no longer treated as trade-ready.",
  },
  {
    label: "Readiness",
    detail:
      "A candidate can now be labeled ARMED EARLY when it is staged in the .146 to .236 lane and moving toward proof before the trigger is fully confirmed.",
  },
  {
    label: "Execution",
    detail:
      "LAUNCH READY is reserved for candidates where confirmation has arrived and the system can act without pretending a late chase is still clean.",
  },
  {
    label: "Rejection",
    detail:
      "Static, fading, below-lane, and extended candidates are treated differently. Location alone is not enough. Direction matters.",
  },
];

// Internal product-feedback note: expose the .146 to .236 launch-lane state prominently in operator views so the operator can see preopen readiness before confirmation, without confusing it with an executable READY state.

export default function BadOpenCaseStudyPage() {
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
            Build In Public Case Study
          </p>
          <h1 className="mb-6 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            What Did A Bad Market Open Teach Us About Building A Trading Bot?
          </h1>
          <p className="text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
            The short answer: the system did not need more random filters. It needed to separate discovery,
            quality, readiness, and execution so a great early setup did not become a late chase.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Algo trading", "Execution readiness", "Market open"].map((tag) => (
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
              src="/institutional_dashboard.png"
              alt="QuantRead dashboard showing the kind of live system context reviewed after a difficult market open."
              width={1536}
              height={1024}
              priority
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <figcaption
              className="border-t px-5 py-3 text-sm leading-6"
              style={{ borderColor: "var(--qr-border)", color: "var(--qr-text-muted)" }}
            >
              A live trading dashboard is useful only if it distinguishes attention, quality, readiness, and
              execution. When those layers blur together, the operator starts correcting the wrong problem.
            </figcaption>
          </figure>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-8">
          <p>
            Some trading days teach the lesson politely. This was not one of them.
          </p>
          <p>
            The morning started with a technical blocker, turned into a live execution argument, and ended with a
            cleaner model for how QuantRead should decide whether a ticker is merely interesting, almost ready, or
            actually ready to trade.
          </p>
          <p>
            That distinction sounds small until the market opens. Then five minutes becomes expensive, a good setup
            becomes a bad fill, and a dashboard full of grades can still leave the operator asking the only question
            that matters: why did the system not act when the opportunity was still clean?
          </p>

          <section
            className="rounded-2xl border p-6"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border-highlight)" }}
          >
            <h2 className="mb-3 text-2xl font-black tracking-tight">Plain-English Answer</h2>
            <p style={{ color: "var(--qr-text-muted)" }}>
              The system was finding the right kind of names, but it was not showing readiness early enough or
              cleanly enough. It was too easy to see a scanner grade and think that meant execution permission. The
              fix was to make the system recognize the pre-launch state before the breakout becomes obvious.
            </p>
          </section>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Story Of The Day</h2>
          <div className="space-y-4">
            {timeline.map((item) => (
              <section
                key={item.title}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.025)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-2 text-xl font-black">{item.title}</h3>
                <p style={{ color: "var(--qr-text-muted)" }}>{item.body}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Grade Confusion Was Real</h2>
          <p>
            One of the biggest discoveries was not a math problem. It was a language problem.
          </p>
          <p>
            A scanner grade can mean, &quot;this ticker deserves attention.&quot; An execution grade has to mean,
            &quot;this ticker is structurally ready to risk money on right now.&quot; Those are not the same
            sentence.
          </p>
          <p>
            When those two meanings get blended together, the system gets overcorrected. You start adding gates to
            make the visual grade feel right, but the original scanner may already be doing its job. The better fix is
            not to punish the scanner. The better fix is to label the layers honestly.
          </p>

          <blockquote
            className="border-l-4 p-6 text-xl font-black"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-gold)" }}
          >
            Discovery is not readiness. Readiness is not execution. Execution is not a chart opinion.
          </blockquote>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The .146 To .236 Launch Lane</h2>
          <p>
            The best idea of the day came from working backward from the winners.
          </p>
          <p>
            The goal was not to ask which row of a watchlist won. Ranking position changes from deploy to deploy, and
            it is too arbitrary to be the foundation of a trading rule. The better question was: what did the winners
            have in common before they were obvious?
          </p>
          <p>
            The answer was not simply &quot;they were near a level.&quot; Static location is not enough. A stock
            can sit under a proof level because it is resting before launch, or because it is failing and rolling over.
            The system has to understand motion.
          </p>
          <p>
            That led to the launch-lane model:
          </p>
          <ul className="space-y-3 pl-6">
            {alignmentChecklist.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What Changed In The System</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {systemChanges.map((item) => (
              <section
                key={item.label}
                className="rounded-2xl border p-5"
                style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-2 text-lg font-black" style={{ color: "var(--qr-gold)" }}>
                  {item.label}
                </h3>
                <p className="text-sm leading-6" style={{ color: "var(--qr-text-muted)" }}>
                  {item.detail}
                </p>
              </section>
            ))}
          </div>
          <p>
            In practical terms, the system now has language for the state that matters before the open: armed early,
            waiting for proof. That is different from ready. It is also different from blocked. It is the missing
            middle state that lets the operator see the setup forming before price has already moved too far.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Where Traders Get This Wrong</h2>
          <p>
            This is not just a bot problem. Human traders do the same thing manually.
          </p>
          <ol className="space-y-3 pl-6">
            {mistakes.map((item) => (
              <li key={item} className="list-decimal">
                {item}
              </li>
            ))}
          </ol>
          <p>
            The dangerous part is that each mistake feels rational in the moment. A stock is moving. The scanner likes
            it. The chart looks alive. The candle is green. The trade feels close enough.
          </p>
          <p>
            But close enough is exactly where bad entries live.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What QuantRead Is Designed To Do Now</h2>
          <p>
            QuantRead is being shaped around a stricter idea: find the winners earlier, show why they are becoming
            winners, and do not let a late chase masquerade as conviction.
          </p>
          <p>
            That means the system needs to care about the common denominator of strong morning moves: premarket bias,
            directional volume, room to target, location in the channel, and whether price is actively moving from
            early opportunity toward proof.
          </p>
          <p>
            It also means the dashboard has to communicate readiness plainly. A trader should be able to look at the
            screen before the open and understand the difference between:
          </p>
          <ul className="space-y-3 pl-6">
            <li className="list-disc">A ticker worth watching.</li>
            <li className="list-disc">A ticker armed in the early band.</li>
            <li className="list-disc">A ticker launch-ready after proof.</li>
            <li className="list-disc">A ticker already missed or too extended.</li>
            <li className="list-disc">A ticker that is active but structurally dirty.</li>
          </ul>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What This Does Not Promise</h2>
          <p>
            This does not promise a 100% win rate. Any trading system that says that out loud should be asked to step
            away from the keyboard.
          </p>
          <p>
            What it does promise is a cleaner standard. The system should stop rewarding late confirmation, stop
            confusing scanner interest with execution permission, and stop treating every loud ticker as a quality
            setup.
          </p>
          <p>
            The goal is not to trade more. The goal is to be ready earlier for the few names where the evidence is
            lining up before the rest of the tape has finished announcing it.
          </p>

          <section
            className="mt-12 rounded-2xl border p-8"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.08), var(--qr-surface))",
              borderColor: "rgba(212,175,55,0.28)",
            }}
          >
            <h2 className="mb-4 text-3xl font-black tracking-tight">Check The Setup Before You Chase The Move</h2>
            <p className="mb-6" style={{ color: "var(--qr-text-muted)" }}>
              Use QuantRead Ticker Grader as a quality-control layer before treating scanner noise like trade
              permission.
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
            performance claim, or a recommendation to buy or sell any security.
          </p>
        </div>
      </article>
    </main>
  );
}
