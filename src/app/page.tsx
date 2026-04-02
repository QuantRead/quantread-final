'use client';

import React from 'react';

/* ─── SVG Icons (inline, no dependencies) ─────────────────────────────────── */
const IconSignal = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 4v16" />
  </svg>
);

const IconBrain = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a6 6 0 0 0-6 6c0 1.66.68 3.16 1.76 4.24L12 16l4.24-3.76A6 6 0 0 0 12 2z" />
    <path d="M12 16v6" /><path d="M8 22h8" />
  </svg>
);

const IconDiamond = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0z" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconTelegram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

/* ─── Plan Data ───────────────────────────────────────────────────────────── */
const plans = [
  {
    name: "QuantRead Alerts",
    price: "$29",
    period: "/month",
    icon: <IconSignal />,
    accent: "from-cyan-500/20 to-cyan-500/5",
    borderAccent: "hover:border-cyan-500/30",
    iconColor: "text-cyan-400",
    features: [
      "Real-time trade signals via Telegram",
      "Entry, stop-loss, and target on every trade",
      "Conviction grade (S/A/B/C/D) rating",
      "Same signals the algo executes",
    ],
    best: "Active traders who want actionable signals",
  },
  {
    name: "QuantRead Intelligence",
    price: "$29",
    period: "/month",
    icon: <IconBrain />,
    accent: "from-violet-500/20 to-violet-500/5",
    borderAccent: "hover:border-violet-500/30",
    iconColor: "text-violet-400",
    features: [
      "Daily pre-market brief via Telegram",
      "Gap analysis and volume rankings",
      "ATR-based trigger levels for the session",
      "Catalyst and earnings event flags",
    ],
    best: "Traders who want institutional-grade prep",
  },
  {
    name: "QuantRead Pro Bundle",
    price: "$49",
    period: "/month",
    icon: <IconDiamond />,
    accent: "from-amber-500/20 to-amber-500/5",
    borderAccent: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
    popular: true,
    features: [
      "Everything in Alerts + Intelligence",
      "2 proprietary TradingView indicators",
      "Quant Model Visualizer (on-chart overlay)",
      "Quant Conviction Histogram (sub-pane)",
      "Pine Script source code included",
    ],
    best: "Serious traders who want the complete toolkit",
  },
];

const steps = [
  { num: "01", title: "Choose Your Plan", desc: "Select Alerts, Intelligence, or Pro Bundle based on your trading style." },
  { num: "02", title: "Subscribe via Stripe", desc: "Secure checkout. Cancel anytime. No contracts, no hidden fees." },
  { num: "03", title: "Get Telegram Access", desc: "Instantly receive a private invite link to your gated Telegram channel." },
];

const stats = [
  { value: "7", label: "Conviction Factors" },
  { value: "< 1s", label: "Alert Latency" },
  { value: "24/5", label: "Market Coverage" },
  { value: "100%", label: "Automated Risk" },
];

/* ─── Page Component ──────────────────────────────────────────────────────── */
export default function LandingPage() {
  const membershipUrl = "https://im.page/quantread";
  const telegramUrl = "https://t.me/MyAlertAgent_bot";

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: 'var(--qr-border)', background: 'rgba(5,10,24,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>Q</div>
            <span className="font-bold text-lg tracking-tight">QuantRead</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#plans" className="text-sm font-medium transition-colors" style={{ color: 'var(--qr-text-muted)' }} onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--qr-text)'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--qr-text-muted)'}>Plans</a>
            <a href="#how-it-works" className="text-sm font-medium transition-colors" style={{ color: 'var(--qr-text-muted)' }} onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--qr-text)'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--qr-text-muted)'}>How It Works</a>
            <a href={membershipUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg text-sm font-semibold transition-all animate-pulse-gold" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>
              Get Access
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 grid-pattern hero-glow">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border" style={{ background: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.2)', color: 'var(--qr-gold)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--qr-green)' }} />
            Live Trading Engine — Signals Delivered in Real Time
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up-delay-1 text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Intelligence for<br />
            <span className="shimmer-text">Modern Traders</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up-delay-2 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--qr-text-muted)' }}>
            Real-time trade alerts, pre-market intelligence briefs, and proprietary TradingView indicators — powered by a live quantitative execution engine.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={membershipUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all animate-pulse-gold" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>
              View Plans & Subscribe
              <span className="transition-transform group-hover:translate-x-1"><IconArrowRight /></span>
            </a>
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border transition-all" style={{ borderColor: 'var(--qr-border)', color: 'var(--qr-text-muted)' }}>
              <IconTelegram />
              Open Telegram Bot
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="p-4 rounded-xl border text-center" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
                <div className="text-2xl font-black" style={{ color: 'var(--qr-gold)' }}>{s.value}</div>
                <div className="text-xs font-medium mt-1" style={{ color: 'var(--qr-text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF STRIP ═══ */}
      <section className="py-6 border-y" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm" style={{ color: 'var(--qr-text-dim)' }}>
          <span>Schwab API Integrated</span>
          <span style={{ color: 'var(--qr-border)' }}>|</span>
          <span>ATR-Based Risk Management</span>
          <span style={{ color: 'var(--qr-border)' }}>|</span>
          <span>7-Factor Conviction Scoring</span>
          <span style={{ color: 'var(--qr-border)' }}>|</span>
          <span>Automated Bracket Orders</span>
        </div>
      </section>

      {/* ═══ PLANS ═══ */}
      <section id="plans" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Choose Your Edge</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              Three tiers designed for different trading styles. All plans deliver via Telegram with instant access after payment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`relative rounded-2xl border p-8 transition-all duration-300 ${plan.borderAccent}`} style={{ background: 'var(--qr-surface)', borderColor: plan.popular ? 'rgba(212,175,55,0.3)' : 'var(--qr-border)' }}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${plan.accent} pointer-events-none`} />

                <div className="relative">
                  {/* Icon + Name */}
                  <div className={`${plan.iconColor} mb-4`}>{plan.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{plan.name}</h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-sm" style={{ color: 'var(--qr-text-muted)' }}>{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--qr-text-muted)' }}>
                        <span className="mt-0.5 shrink-0"><IconCheck /></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Best for */}
                  <p className="text-xs mb-6 italic" style={{ color: 'var(--qr-text-dim)' }}>
                    Best for: {plan.best}
                  </p>

                  {/* CTA */}
                  <a href={membershipUrl} target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: plan.popular ? 'var(--qr-gold)' : 'transparent',
                      color: plan.popular ? 'var(--qr-bg)' : 'var(--qr-text)',
                      border: plan.popular ? 'none' : '1px solid var(--qr-border)',
                    }}
                  >
                    Get Instant Access
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm" style={{ color: 'var(--qr-text-dim)' }}>
            All plans: cancel anytime. No contracts. No hidden fees. Powered by Stripe.
          </p>
        </div>
      </section>

      {/* ═══ WHAT THE ENGINE SEES ═══ */}
      <section className="py-24 border-y" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">What the Engine Evaluates</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              Every signal passes through 7 independent conviction factors. Only A-grade and S-grade setups fire.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Trigger Cloud", desc: "ATR-scaled zones anchored to the daily open", color: "#22d3ee" },
              { label: "Volatility Gauge", desc: "ATR expansion/contraction vs. 20-day baseline", color: "#a78bfa" },
              { label: "EMA Ribbon", desc: "1H trend alignment (8/21/34 stacked)", color: "#4ade80" },
              { label: "Time of Day", desc: "Morning edge & afternoon session windows", color: "#f97316" },
              { label: "Catalyst Detection", desc: "Gap% + unusual volume convergence", color: "#ec4899" },
              { label: "Ichimoku Baseline", desc: "Structural trend confirmation via Kijun-Sen", color: "#f59e0b" },
              { label: "RSI Exhaustion", desc: "Overbought/oversold gating to prevent chasing", color: "#ef4444" },
              { label: "Conviction Score", desc: "Composite S/A/B/C/D grade from all factors", color: "#d4af37" },
            ].map((factor, i) => (
              <div key={i} className="p-5 rounded-xl border transition-all duration-300" style={{ borderColor: 'var(--qr-border)', background: 'rgba(5,10,24,0.6)' }}>
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: factor.color }} />
                <h4 className="text-sm font-bold mb-1">{factor.label}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--qr-text-dim)' }}>{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">How It Works</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              From signup to your first signal in under 2 minutes.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-xl border transition-all duration-300" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
                <div className="text-3xl font-black shrink-0" style={{ color: 'var(--qr-gold)', opacity: 0.4 }}>{step.num}</div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--qr-text-muted)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12 text-center">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do I need a Schwab account?", a: "No. QuantRead subscriptions deliver pure intelligence and signals via Telegram. You can use any broker to act on them." },
              { q: "How fast are the alerts?", a: "Alerts are delivered in under 1 second from the moment the engine scores the setup. You see the signal before the order fills." },
              { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month via Stripe. Cancel with one click, no questions asked." },
              { q: "What are the TradingView indicators?", a: "Two proprietary Pine Script indicators: the Quant Model Visualizer (on-chart overlay showing ATR levels, trigger clouds, EMA ribbon, and BUY signals) and the Quant Conviction Histogram (sub-pane with factor breakdown). Included with the Pro Bundle." },
              { q: "Is this a signal room or Discord?", a: "No. QuantRead is a gated Telegram channel connected to a live execution engine. There is no chat, no noise, no hype — just structured data and actionable signals." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border" style={{ borderColor: 'var(--qr-border)', background: 'rgba(5,10,24,0.6)' }}>
                <h3 className="text-base font-bold mb-2">{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--qr-text-muted)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Start receiving signals<br />
            <span className="shimmer-text">before the next bell.</span>
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
            Join QuantRead and see exactly what the engine sees — in real time, on your phone.
          </p>
          <a href={membershipUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold transition-all animate-pulse-gold" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>
            Get Instant Access
            <IconArrowRight />
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 border-t" style={{ borderColor: 'var(--qr-border)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center font-black text-xs" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>Q</div>
            <span className="font-bold text-sm">QuantRead</span>
            <span className="text-xs ml-2" style={{ color: 'var(--qr-text-dim)' }}>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--qr-text-dim)' }}>
            <a href={membershipUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Subscribe</a>
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Telegram</a>
            <a href="https://x.com/quantaboreal" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Twitter/X</a>
          </div>
        </div>
      </footer>
    </main>
  );
}