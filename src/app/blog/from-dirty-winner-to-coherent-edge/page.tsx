import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const articleUrl = "https://quantread.app/blog/from-dirty-winner-to-coherent-edge";

export const metadata: Metadata = {
  title: "From Dirty Winner To Coherent Edge | QuantRead",
  description:
    "A build-in-public breakdown of how QuantRead moved from a profitable but messy trading shape, into a contradictory losing stack, and back into a route-owned execution contract.",
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: "From Dirty Winner To Coherent Edge",
    description:
      "How QuantRead preserved the profitable paths, removed contradictory route confusion, and made the latest execution model more auditable.",
    url: articleUrl,
    type: "article",
    images: [
      {
        url: "/route-evolution-2026-05-19.svg",
        width: 1200,
        height: 760,
        alt: "QuantRead route evolution from dirty winner to coherent route contract.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "From Dirty Winner To Coherent Edge",
    description:
      "The build-in-public story of preserving yesterday's winners while fixing the execution contract that made today worse.",
    images: ["/route-evolution-2026-05-19.svg"],
  },
};

const timeline = [
  {
    label: "Winning Shape",
    day: "May 18",
    title: "Profitable, but messy",
    body:
      "The system found long-side winners inside an unfriendly tape. UBER, PLTR, CVNA, and MSFT proved the stock-selection engine could find isolated strength. The problem was that the route story was not clean enough.",
    tone: "green",
  },
  {
    label: "Losing Shape",
    day: "May 19 morning",
    title: "Cleaner labels, worse behavior",
    body:
      "The system started behaving like old blockers and new winner logic were negotiating with each other in the middle of a live trade. Some paths were profitable in evidence, but anonymous or contradictory in execution.",
    tone: "red",
  },
  {
    label: "Current Shape",
    day: "Now",
    title: "Route-owned decisions",
    body:
      "The profitable paths were kept. The route contract was made explicit. Old names became source evidence, current route names own the execution decision, and receipts now explain exactly what fired.",
    tone: "gold",
  },
];

const routeTable = [
  {
    source: "PREOPEN_OMNI_TRIGGER_IMPULSE",
    current: "OPEN_TRIGGER_IMPULSE",
    why: "Still useful as source evidence, but it is one open-impulse thesis now.",
  },
  {
    source: "OPEN_LONG_EARLY_TRIGGER",
    current: "OPEN_TRIGGER_IMPULSE",
    why: "Same open trigger idea, no longer treated like a separate execution religion.",
  },
  {
    source: "SATY_UPPER_TRIGGER",
    current: "OPEN_TRIGGER_IMPULSE or PULLBACK_RELEASE",
    why: "The old anonymous reason now gets a route owner after the real gate has passed.",
  },
  {
    source: "EARLY_BAND_LAUNCH_ENTRY",
    current: "EARLY_BAND_LAUNCH_ENTRY or PULLBACK_RELEASE",
    why: "Still the .146 to .236 launch thesis, now visible when it later releases from pullback.",
  },
  {
    source: "PROOF_CONTINUATION",
    current: "MIDDAY_PROOF_CONTINUATION",
    why: "A midday proof route should say it is a midday route.",
  },
];

const currentGates = [
  "In the early .146 to .236 launch zone.",
  "Near enough to the trigger lane to still matter.",
  "Top-10 proximity during the opening window.",
  "Abnormal volume is present.",
  "Recent danger-side pullback is not present.",
  "Directional volume is not weak or hard-blocked.",
  "Relative strength is not weak.",
  "There is usable room to the next channel.",
  "Account, broker, daily limit, symbol exclusion, duplicate-position, and safety gates still survive.",
];

const replayTrades = [
  {
    symbol: "VZ",
    time: "6:35 PT",
    route: "WINNER_LAUNCH",
    source: "winner launch quality",
    pnl: "+$21.20",
    note: "The pure winner route. It did not need the old open-drive name to justify itself.",
  },
  {
    symbol: "XLV",
    time: "6:40 PT",
    route: "OPEN_TRIGGER_IMPULSE",
    source: "PREOPEN_OMNI_TRIGGER_IMPULSE",
    pnl: "+$49.53",
    note: "A profitable old source name, now held under the current open-impulse contract.",
  },
  {
    symbol: "BAC",
    time: "6:40 PT",
    route: "OPEN_TRIGGER_IMPULSE",
    source: "OPEN_LONG_EARLY_TRIGGER",
    pnl: "+$27.44",
    note: "The old long trigger path stayed alive, but no longer shows up as a competing thesis.",
  },
  {
    symbol: "CLSK",
    time: "7:06 PT",
    route: "PULLBACK_RELEASE",
    source: "EARLY_BAND_LAUNCH_ENTRY",
    pnl: "+$49.91",
    note: "The profitable release is no longer anonymous. The receipt says it was a pullback release from the early-band source.",
  },
];

const reasons = [
  {
    title: "It kept the thing that made money.",
    body:
      "The fix did not delete the dirty paths just because their names were old. That would have been cosmetic engineering. The profitable detectors stayed in place.",
  },
  {
    title: "It stopped pretending old labels were separate strategies.",
    body:
      "Old open trigger names now feed one current open-impulse route. That makes the system easier to audit and harder to contradict downstream.",
  },
  {
    title: "It names pullback releases after they pass the release gate.",
    body:
      "A release can still trade, but now the receipt explains why. This matters because anonymous SATY reasons made it too hard to tell whether the trade was intentional or accidental.",
  },
  {
    title: "It protects the early-band promotion from becoming reckless.",
    body:
      "The current early-band promotion is not just 'price is early, buy it.' It needs rank, room, abnormal volume, no recent danger pullback, and no weak DVP or relative strength.",
  },
  {
    title: "It gave the system one execution story.",
    body:
      "The system can still show the source detector, but the money decision now reports the route contract that owned the trade.",
  },
];

function ToneBadge({ tone, children }: { tone: string; children: ReactNode }) {
  const color = tone === "red" ? "#ff7b7b" : tone === "green" ? "#7ee7b8" : "var(--qr-gold)";
  return (
    <span
      className="rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em]"
      style={{ borderColor: "var(--qr-border)", color }}
    >
      {children}
    </span>
  );
}

export default function RouteEvolutionPage() {
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
            Build In Public System Recap
          </p>
          <h1 className="mb-6 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            From Dirty Winner To Coherent Edge
          </h1>
          <p className="max-w-3xl text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
            The last two trading days exposed a hard lesson: the system could make money while still being hard to
            explain, then lose money after being made too clean in the wrong places. The latest version is more
            promising because it keeps the profitable behavior and makes the execution story coherent.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Route contract", "Early band", "Replay verified", "Build in public"].map((tag) => (
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
              src="/route-evolution-2026-05-19.svg"
              alt="QuantRead execution evolution from profitable dirty routes to coherent route contract."
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
              The latest repair did not erase yesterday&apos;s profitable dirt. It named the routes, preserved the
              source evidence, and made the receipts auditable.
            </figcaption>
          </figure>
        </header>

        <div className="space-y-7 text-[1.05rem] leading-8">
          <p>
            The important mistake was not simply that one trade lost money. The deeper mistake was that the system
            briefly became less coherent than the market it was trying to read.
          </p>
          <p>
            Yesterday, the system was dirty but profitable. It found long-side winners in a tape that was not friendly
            to longs. Today, after too many corrections aimed at making the logic feel cleaner, the system started
            running into old artifacts and new rules at the same time. That is how a machine can look more disciplined
            while becoming worse at making money.
          </p>
          <p>
            The current version is not promising because it has prettier labels. It is promising because the labels now
            describe the real decision path. That is a different thing.
          </p>

          <section
            className="rounded-2xl border p-6"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border-highlight)" }}
          >
            <h2 className="mb-3 text-2xl font-black tracking-tight">Plain-English Thesis</h2>
            <p style={{ color: "var(--qr-text-muted)" }}>
              The system should not choose between dirty winners and clean losers. The right version keeps the
              profitable paths, removes the contradictory handoffs, and makes every trade receipt say exactly which
              route owned the decision.
            </p>
          </section>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Three Shapes</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {timeline.map((item) => (
              <section
                key={item.label}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.025)", borderColor: "var(--qr-border)" }}
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  <ToneBadge tone={item.tone}>{item.label}</ToneBadge>
                </div>
                <p className="mb-2 text-sm font-bold" style={{ color: "var(--qr-text-muted)" }}>
                  {item.day}
                </p>
                <h3 className="mb-3 text-xl font-black">{item.title}</h3>
                <p className="text-sm leading-6" style={{ color: "var(--qr-text-muted)" }}>
                  {item.body}
                </p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Shape One: The Dirty Winner</h2>
          <p>
            The winning version was not elegant. Some route names were old. Some receipts said `SATY_UPPER_TRIGGER`
            even though the real reason was a more specific launch or release behavior. Some logic still had older
            names attached to it.
          </p>
          <p>
            But the system was doing the important thing: it was letting useful names through. It found isolated long
            strength, let early evidence matter, and captured money before the cleanest moves were gone.
          </p>
          <p>
            That is why deleting old routes would have been the wrong fix. The old names were not automatically dead
            code. Several of them were still source detectors for profitable behavior.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Shape Two: The Clean Loser</h2>
          <p>
            The losing shape came from trying to make the system behave cleanly without first separating two different
            truths: source evidence and execution permission.
          </p>
          <p>
            A source detector can say, &quot;this is the thing I saw.&quot; An execution route has to say,
            &quot;this is the reason money is allowed to move.&quot; When those two ideas blur together, the system
            becomes vulnerable to contradiction. A setup can look launch-ready in one layer and blocked by old
            vocabulary in another.
          </p>
          <p>
            That is how the system became worse. It was not because the market suddenly made all logic impossible. It
            was because the handoff between layers was not explicit enough.
          </p>

          <section
            className="rounded-2xl border p-6"
            style={{ background: "#171b25", borderColor: "rgba(255,123,123,0.36)" }}
          >
            <h3 className="mb-4 text-2xl font-black" style={{ color: "#ff9a9a" }}>
              The Failure Pattern
            </h3>
            <div className="grid gap-3 text-sm font-bold md:grid-cols-5" style={{ color: "var(--qr-text-muted)" }}>
              {["scanner sees it", "old label names it", "new gate reshapes it", "another layer blocks it", "trade arrives late"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="rounded-xl border p-3 text-center"
                    style={{ borderColor: "rgba(255,123,123,0.28)" }}
                  >
                    <p className="mb-2 text-xs" style={{ color: "#ff9a9a" }}>
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p>{step}</p>
                  </div>
                ),
              )}
            </div>
          </section>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Shape Three: The Route Contract</h2>
          <p>
            The current version fixes the handoff instead of flattening the whole system.
          </p>
          <p>
            Old detector names can still exist. They are useful forensic evidence. But when the system is deciding
            whether money should move, the route must be current, explicit, and auditable.
          </p>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--qr-border)" }}>
            <div className="grid grid-cols-3 gap-px text-sm" style={{ background: "var(--qr-border)" }}>
              <div className="p-4 font-black" style={{ background: "var(--qr-surface)" }}>
                Source Evidence
              </div>
              <div className="p-4 font-black" style={{ background: "var(--qr-surface)" }}>
                Current Route
              </div>
              <div className="p-4 font-black" style={{ background: "var(--qr-surface)" }}>
                Why It Matters
              </div>
              {routeTable.map((row) => (
                <div key={row.source} className="contents">
                  <div className="p-4 font-mono text-xs" style={{ background: "#0d1421", color: "#f3d56b" }}>
                    {row.source}
                  </div>
                  <div className="p-4 font-mono text-xs" style={{ background: "#0d1421", color: "#7ee7b8" }}>
                    {row.current}
                  </div>
                  <div className="p-4 text-sm leading-6" style={{ background: "#0d1421", color: "var(--qr-text-muted)" }}>
                    {row.why}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The New Opening Promotion Is Not A Free Pass</h2>
          <p>
            The current version also restores a controlled opening early-band promotion. This matters because some of
            the best winners are not going to wait politely until every composite grade says the same thing.
          </p>
          <p>
            But it is not a wide-open front door. The setup has to pass a real factor stack first.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            {currentGates.map((gate) => (
              <div
                key={gate}
                className="rounded-xl border p-4 text-sm font-bold leading-6"
                style={{ background: "rgba(126,231,184,0.045)", borderColor: "rgba(126,231,184,0.26)" }}
              >
                {gate}
              </div>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Replay Proof</h2>
          <p>
            The reason this version is the most promising is not a feeling. The current code path was run against
            today&apos;s black-box scanner data using the same 30-minute or 1% exit approximation used in the
            investigation. It preserved the four-trade money path instead of cleaning it out of existence.
          </p>
          <div className="grid gap-4">
            {replayTrades.map((trade) => (
              <section
                key={trade.symbol}
                className="rounded-2xl border p-5"
                style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
              >
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{trade.symbol}</h3>
                    <p className="text-sm font-bold" style={{ color: "var(--qr-text-muted)" }}>
                      {trade.time} | source: {trade.source}
                    </p>
                  </div>
                  <p className="text-2xl font-black" style={{ color: "#7ee7b8" }}>
                    {trade.pnl}
                  </p>
                </div>
                <p className="mb-2 font-mono text-sm" style={{ color: "var(--qr-gold)" }}>
                  {trade.route}
                </p>
                <p style={{ color: "var(--qr-text-muted)" }}>{trade.note}</p>
              </section>
            ))}
          </div>
          <section
            className="rounded-2xl border p-6"
            style={{ background: "rgba(126,231,184,0.05)", borderColor: "rgba(126,231,184,0.3)" }}
          >
            <h3 className="mb-2 text-2xl font-black" style={{ color: "#7ee7b8" }}>
              Replay Total: +$148.08
            </h3>
            <p style={{ color: "var(--qr-text-muted)" }}>
              This is not a promise about tomorrow. It is evidence that the current repair did not destroy the money
              path it was supposed to preserve.
            </p>
          </section>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Why This Version Is More Promising</h2>
          <div className="grid gap-4">
            {reasons.map((reason) => (
              <section
                key={reason.title}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.025)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-2 text-xl font-black">{reason.title}</h3>
                <p style={{ color: "var(--qr-text-muted)" }}>{reason.body}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Final Shape</h2>
          <p>
            The system now has a cleaner philosophy: keep the source evidence, but make execution permission belong
            to a named route. The route is the contract. The source rule is the witness. The safety gates still get
            the final word.
          </p>
          <p>
            That is the right separation. It means the system can stay flexible enough to catch dirty winners without
            becoming so vague that every trade is a post-hoc explanation.
          </p>
          <p>
            This is why the current version is the most promising one yet. Not because it is perfect. Because it is
            the first version in this sequence that protects the profitable behavior and explains it clearly enough to
            improve it later.
          </p>

          <section
            className="mt-12 rounded-2xl border p-8"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.08), var(--qr-surface))",
              borderColor: "rgba(212,175,55,0.28)",
            }}
          >
            <h2 className="mb-4 text-3xl font-black tracking-tight">The Operating Principle</h2>
            <p className="mb-6" style={{ color: "var(--qr-text-muted)" }}>
              Do not worship clean labels. Do not worship dirty profits. Preserve what actually made money, name it
              honestly, and let the next trading day prove whether the route contract is real.
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
            performance claim, or a recommendation to buy or sell any security. Replay values are internal system
            analysis based on archived scanner snapshots and are not a guarantee of future results.
          </p>
        </div>
      </article>
    </main>
  );
}
