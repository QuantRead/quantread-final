import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const articleUrl = "https://quantread.app/blog/the-dna-of-a-winner";

export const metadata: Metadata = {
  title: "The DNA of a Winner | QuantRead",
  description:
    "A build-in-public breakdown of the QuantRead trading system shift from scanner grades to early-band winner evidence, live quote reranking, and execution readiness.",
  alternates: {
    canonical: articleUrl,
  },
  openGraph: {
    title: "The DNA of a Winner",
    description:
      "What changed in the QuantRead trading system after working backward from the strongest morning setups.",
    url: articleUrl,
    type: "article",
    images: [
      {
        url: "/institutional_dashboard.png",
        width: 1536,
        height: 1024,
        alt: "QuantRead dashboard used to study early-band trading setup readiness.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The DNA of a Winner",
    description:
      "How QuantRead changed from chasing visible grades to recognizing the hidden evidence inside early winners.",
    images: ["/institutional_dashboard.png"],
  },
};

const dnaMarkers = [
  "The stock is already biased in the trade direction before the full move becomes obvious.",
  "Price is sitting in the early .146 to .236 launch band instead of being extended above the move.",
  "Movement through the band is active and directional, not flat, fading, or drifting away from proof.",
  "Directional volume is aligned with the move or at least not fighting it.",
  "Volume participation is real enough to support continuation, not just a quick headline pop.",
  "The setup has room to the next meaningful channel so the trade is not already spent.",
  "Relative strength and open bias are adding evidence instead of asking price to do all the work.",
];

const systemChanges = [
  {
    title: "Grades stopped being permission.",
    body:
      "The visible scanner grade is now treated as a display summary, not the thing that decides whether money should be put at risk. The underlying evidence matters more than the letter printed on the screen.",
  },
  {
    title: "The early band became the launch zone.",
    body:
      "The system is now focused on finding candidates inside the .146 to .236 channel before they are obvious to everyone else. The goal is to be waiting for confluence in the lane, not chasing after the lane is gone.",
  },
  {
    title: "Motion became part of quality.",
    body:
      "A ticker is not rewarded simply for being near a level. The system has to distinguish a stock launching toward proof from a stock sitting under resistance because it is weak.",
  },
  {
    title: "The scanner now reranks after fresh quotes.",
    body:
      "The shortlist gets a first pass, then live quotes refresh, then the price-sensitive fields are recalculated before the final list is published. That matters most near the open, when one fresh price can change the whole story.",
  },
  {
    title: "Display ranking and execution readiness separated.",
    body:
      "The dashboard can float an early opportunity higher for attention without pretending it is executable yet. Watch-now and trade-now are different states.",
  },
  {
    title: "Launch-ready entries can use market speed.",
    body:
      "When the baseline launch evidence is present, the system is allowed to prioritize getting in quickly. Speed only matters after the evidence stack is already strong enough.",
  },
];

const readinessStates = [
  {
    label: "Interesting",
    detail: "The scanner found activity, but activity alone is not a trade.",
  },
  {
    label: "Armed Early",
    detail: "The ticker is in the early band and evidence is starting to line up.",
  },
  {
    label: "Launch Ready",
    detail: "The early-band setup has enough confluence for execution logic to act.",
  },
  {
    label: "Missed",
    detail: "The move already left the clean zone, even if the ticker still looks strong.",
  },
  {
    label: "Blocked",
    detail: "The evidence is conflicted, adverse, too late, or structurally dirty.",
  },
];

const oldModelProblems = [
  "A good scanner row could be mistaken for a good trade.",
  "A late entry could look convincing because the move had already proved itself.",
  "A ticker could be blocked by a composite grade even when the hidden winner factors were present.",
  "A fast morning move could be seen by the system, refreshed with live price, and still published in an order that no longer matched the newest data.",
  "The operator could see a hot name without seeing whether it was early, ready, missed, or structurally hostile.",
];

export default function WinnerDnaPage() {
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
            Build In Public System Notes
          </p>
          <h1 className="mb-6 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            The DNA of a Winner
          </h1>
          <p className="text-lg leading-8" style={{ color: "var(--qr-text-muted)" }}>
            Over the last day, QuantRead changed from asking whether a ticker looked impressive to asking whether
            the underlying evidence matched the way morning winners actually form.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Algo trading", "Early band", "Execution readiness"].map((tag) => (
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
              alt="QuantRead dashboard used to review scanner rank, early-band readiness, and execution state."
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
              The new model is not built around a prettier grade. It is built around the conditions that appear
              before the strongest moves become obvious.
            </figcaption>
          </figure>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-8">
          <p>
            A winner usually leaves fingerprints before it becomes the chart everyone notices.
          </p>
          <p>
            That was the real lesson. The system did not need another arbitrary score layered on top of another
            score. It needed to stop worshiping the visible grade and start reading the evidence underneath it.
          </p>
          <p>
            A scanner can tell you something is active. A structural grade can tell you whether the chart has quality.
            But neither one, by itself, answers the question that matters at the open:
          </p>

          <blockquote
            className="border-l-4 p-6 text-xl font-black"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-gold)" }}
          >
            Is this stock becoming a winner right now, while the entry is still early enough to matter?
          </blockquote>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Old Problem</h2>
          <p>
            The old model had too many ways to be technically smart and operationally late. It could find a strong
            name, grade it, block it, refresh it, rank it, and still leave the operator staring at the move after the
            clean entry had already passed.
          </p>
          <p>
            That is how a good idea becomes a bad trade. The idea is not wrong. The timing is.
          </p>
          <ul className="space-y-3 pl-6">
            {oldModelProblems.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>

          <section
            className="rounded-2xl border p-6"
            style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border-highlight)" }}
          >
            <h2 className="mb-3 text-2xl font-black tracking-tight">The Core Change</h2>
            <p style={{ color: "var(--qr-text-muted)" }}>
              QuantRead now treats visible grades as summaries, not permission slips. The execution question is
              answered by the underlying factors: location, direction, volume support, open bias, room to target, and
              whether price is actively moving from early opportunity toward proof.
            </p>
          </section>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What The Winners Had In Common</h2>
          <p>
            The useful question was not, &quot;Where did the winner appear on the list?&quot; List position changes
            as the system changes. That makes it a weak foundation for trading logic.
          </p>
          <p>
            The better question was, &quot;What did the winner look like before the move became obvious?&quot;
          </p>
          <p>
            That is the DNA. Not one magic indicator. A cluster of evidence appearing in the same place at the same
            time.
          </p>
          <ul className="space-y-3 pl-6">
            {dnaMarkers.map((marker) => (
              <li key={marker} className="list-disc">
                {marker}
              </li>
            ))}
          </ul>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The .146 To .236 Lane</h2>
          <p>
            The most important operational shift is the early launch lane. The system is not supposed to wait until
            price has already run far beyond the trigger and then call that confirmation.
          </p>
          <p>
            The .146 level is the beginning of attention. The .146 to .236 area is the early zone where the system
            should be watching for confluence. The .236 level is proof, but proof is less valuable if the system only
            notices after price has already paid for it.
          </p>
          <p>
            That means the system now has to understand movement inside the lane. A ticker resting under proof and a
            ticker launching toward proof are not the same setup. Direction matters. Pressure matters. Volume matters.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">What Changed</h2>
          <div className="grid gap-4">
            {systemChanges.map((change) => (
              <section
                key={change.title}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.025)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-2 text-xl font-black">{change.title}</h3>
                <p style={{ color: "var(--qr-text-muted)" }}>{change.body}</p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The New Readiness Language</h2>
          <p>
            The dashboard needs to show more than a grade. It needs to show state. A trader should be able to look at
            the screen and understand where the ticker sits in the life cycle of the trade.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {readinessStates.map((state) => (
              <section
                key={state.label}
                className="rounded-2xl border p-5"
                style={{ background: "var(--qr-surface)", borderColor: "var(--qr-border)" }}
              >
                <h3 className="mb-2 text-lg font-black" style={{ color: "var(--qr-gold)" }}>
                  {state.label}
                </h3>
                <p className="text-sm leading-6" style={{ color: "var(--qr-text-muted)" }}>
                  {state.detail}
                </p>
              </section>
            ))}
          </div>

          <h2 className="pt-8 text-3xl font-black tracking-tight">Why This Matters At The Open</h2>
          <p>
            The open punishes delay. A setup that is clean at 6:30 can be an expensive chase by 6:35. That is why the
            system now has to do more of its thinking before the trigger is fully obvious.
          </p>
          <p>
            The target behavior is simple: before the open, top candidates should already be visible in the early
            band, with the evidence stack building. At the trigger, the system should not be discovering the setup
            for the first time. It should already know what it is waiting for.
          </p>

          <h2 className="pt-8 text-3xl font-black tracking-tight">The Hard Truth</h2>
          <p>
            This does not make trading automatic money. It does not make a 100% win rate real. Markets do not owe the
            system clean follow-through just because the evidence looks good.
          </p>
          <p>
            What it does is remove a major source of confusion. The system is no longer designed to ask whether a
            ticker looks impressive after the move. It is designed to ask whether the ticker has the DNA of a winner
            before the best entry is gone.
          </p>
          <p>
            That is the point of the whole rebuild: find the common denominator of the strongest morning moves, expose
            it clearly, and act only when the evidence is strong enough and early enough to matter.
          </p>

          <section
            className="mt-12 rounded-2xl border p-8"
            style={{
              background: "linear-gradient(180deg, rgba(212,175,55,0.08), var(--qr-surface))",
              borderColor: "rgba(212,175,55,0.28)",
            }}
          >
            <h2 className="mb-4 text-3xl font-black tracking-tight">Check The Evidence Under The Grade</h2>
            <p className="mb-6" style={{ color: "var(--qr-text-muted)" }}>
              Use QuantRead Ticker Grader as a structure check, then let the live system separate attention,
              readiness, and execution.
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
