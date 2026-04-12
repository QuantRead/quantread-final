'use client';

import React from 'react';

/* ─── SVG Icons ───────────────────────────────────────────────────────────── */
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

/* ─── Metadata handled via layout or head ─────────────────────────────────── */
export default function IndicatorsPage() {
  const membershipUrl = "https://im.page/quantread";
  const indicatorCheckoutUrl = "https://buy.stripe.com/bJeaERf4qaLUesb8yE3AY03";
  const tickerGraderProUrl = "https://buy.stripe.com/5kQfZb1dA8DM97R4io3AY04";

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: 'var(--qr-border)', background: 'rgba(5,10,24,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>Q</div>
            <span className="font-bold text-lg tracking-tight">QuantRead</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium transition-colors" style={{ color: 'var(--qr-text-muted)' }}>Home</a>
            <a href="#indicators" className="text-sm font-medium transition-colors" style={{ color: 'var(--qr-text-muted)' }}>Indicators</a>
            <a href="#ticker-grader-pro" className="text-sm font-medium transition-colors" style={{ color: '#d4af37' }}>Ticker Grader Pro</a>
            <a href="#pricing" className="text-sm font-medium transition-colors" style={{ color: 'var(--qr-text-muted)' }}>Pricing</a>
            <a href={indicatorCheckoutUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: 'linear-gradient(135deg, #4B9EFF, #B04BFF)', color: '#fff' }}>
              Get Access
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 grid-pattern" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(75,158,255,0.08) 0%, transparent 70%)' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border" style={{ background: 'rgba(75,158,255,0.08)', borderColor: 'rgba(75,158,255,0.2)', color: '#4B9EFF' }}>
            🔧 PINE SCRIPT™ SOURCE CODE INCLUDED
          </div>

          <h1 className="animate-fade-in-up-delay-1 text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Take the{' '}
            <span style={{ background: 'linear-gradient(135deg, #4B9EFF 0%, #B04BFF 50%, #d4af37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Brain</span>
            {' '}With You.
          </h1>

          <p className="animate-fade-in-up-delay-2 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--qr-text-muted)' }}>
            The same conviction engine powering a live automated portfolio — now running directly on your TradingView chart. Two proprietary indicators. Full source code. Zero black boxes.
          </p>

          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={indicatorCheckoutUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all" style={{ background: 'linear-gradient(135deg, #4B9EFF, #B04BFF)', color: '#fff', boxShadow: '0 8px 30px rgba(75,158,255,0.25)' }}>
              Get the Indicator Suite →
            </a>
            <a href="#indicators" className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border transition-all" style={{ borderColor: 'var(--qr-border)', color: 'var(--qr-text-muted)' }}>
              See What&apos;s Included
            </a>
          </div>

          <p className="mt-6 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--qr-text-dim)' }}>
            One-time purchase: <strong style={{ color: '#4ade80', fontSize: '1.1rem' }}>$49</strong> &nbsp;·&nbsp; or included with <strong style={{ color: '#d4af37' }}>Ticker Grader Pro ($14.99/mo)</strong>
          </p>

          {/* Chart Preview */}
          <div className="mt-16 max-w-4xl mx-auto rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--qr-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0b1229', borderColor: 'var(--qr-border)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--qr-text-dim)' }}>WMT · 1m · NYSE</span>
              <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>QUANT v2 ACTIVE</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/chart_preview.png" alt="Quant v2 indicators running on WMT 1-minute chart showing ATR trigger zones, EMA ribbon, and BUY signal" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ═══ INDICATORS ═══ */}
      <section id="indicators" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--qr-text-dim)' }}>What&apos;s Inside</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Two Indicators. One Unified Edge.</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              Each indicator is a distillation of the quantitative factors the live engine uses to score and execute trades. They work independently or together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Quant Model Visualizer */}
            <div className="rounded-2xl border p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #4B9EFF, #4ade80)' }} />
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6" style={{ background: 'rgba(75,158,255,0.12)' }}>📊</div>
              <h3 className="text-xl font-bold mb-1">Quant Model Visualizer</h3>
              <p className="text-xs font-bold mb-5 tracking-widest uppercase" style={{ color: '#4B9EFF' }}>On-Chart Overlay</p>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--qr-text-muted)' }}>
                See exactly where the engine would fire. ATR-scaled trigger zones paint dynamically around price, while the multi-timeframe EMA ribbon confirms trend structure at a glance.
              </p>
              <ul className="space-y-3">
                {[
                  "ATR trigger cloud zones — buy/sell boundaries visible before they fire",
                  "8/21/34 EMA ribbon with stacked trend detection",
                  "Real-time BUY arrow signals when conviction factors align",
                  "Ichimoku baseline overlay for structural confirmation",
                  "Works on any timeframe — 1min to Daily",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--qr-text-muted)' }}>
                    <span className="mt-0.5 shrink-0"><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quant Conviction Histogram */}
            <div className="rounded-2xl border p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #d4af37, #B04BFF)' }} />
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6" style={{ background: 'rgba(212,175,55,0.12)' }}>📈</div>
              <h3 className="text-xl font-bold mb-1">Quant Conviction Histogram</h3>
              <p className="text-xs font-bold mb-5 tracking-widest uppercase" style={{ color: 'var(--qr-gold)' }}>Sub-Pane Indicator</p>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--qr-text-muted)' }}>
                The factor breakdown that powers every signal grade. Watch conviction build bar-by-bar as each independent factor — volume, ATR, gap, catalyst, RSI — fires or fails.
              </p>
              <ul className="space-y-3">
                {[
                  "Composite conviction score (S/A/B/C/D grade) in real time",
                  "Individual factor decomposition — see which factors drive the score",
                  "Color-coded intensity: green (strong), yellow (moderate), red (weak)",
                  "Filters out low-conviction noise before you trade",
                  "Alert-compatible — set TradingView alerts on conviction thresholds",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--qr-text-muted)' }}>
                    <span className="mt-0.5 shrink-0"><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CODE PREVIEW ═══ */}
      <section className="py-24 border-y" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--qr-text-dim)' }}>Source Code Access</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Full Pine Script™. No Obfuscation.</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              You&apos;re not renting a locked indicator. You own the source. Modify it. Learn from it. Build on it.
            </p>
          </div>

          <div className="rounded-2xl border p-8 relative overflow-hidden" style={{ background: '#060a14', borderColor: 'var(--qr-border)' }}>
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>
              Pine Script™ Source Included
            </div>
            <pre className="text-xs md:text-sm leading-7 overflow-x-auto" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--qr-text-dim)' }}>
              <code>{`// Quant Model Visualizer — QuantRead © 2026
// Full Pine Script™ source code — modify freely

`}<span style={{ color: '#4B9EFF' }}>//@version=6</span>{`
`}<span style={{ color: '#d4af37' }}>indicator</span>{`(`}<span style={{ color: '#4ade80' }}>&quot;Quant Model Visualizer&quot;</span>{`, overlay=`}<span style={{ color: '#4B9EFF' }}>true</span>{`)

`}<span style={{ color: '#444466' }}>// ATR Trigger Cloud</span>{`
atr_period  = `}<span style={{ color: '#d4af37' }}>input.int</span>{`(`}<span style={{ color: '#B04BFF' }}>14</span>{`, `}<span style={{ color: '#4ade80' }}>&quot;ATR Period&quot;</span>{`)
atr_mult    = `}<span style={{ color: '#d4af37' }}>input.float</span>{`(`}<span style={{ color: '#B04BFF' }}>1.5</span>{`, `}<span style={{ color: '#4ade80' }}>&quot;ATR Multiplier&quot;</span>{`)
atr_val     = `}<span style={{ color: '#d4af37' }}>ta.atr</span>{`(atr_period)
upper_cloud = open + (atr_val * atr_mult)
lower_cloud = open - (atr_val * atr_mult)

`}<span style={{ color: '#444466' }}>// EMA Ribbon (8/21/34)</span>{`
ema_fast = `}<span style={{ color: '#d4af37' }}>ta.ema</span>{`(close, `}<span style={{ color: '#B04BFF' }}>8</span>{`)
ema_mid  = `}<span style={{ color: '#d4af37' }}>ta.ema</span>{`(close, `}<span style={{ color: '#B04BFF' }}>21</span>{`)
ema_slow = `}<span style={{ color: '#d4af37' }}>ta.ema</span>{`(close, `}<span style={{ color: '#B04BFF' }}>34</span>{`)
ribbon_bull = ema_fast > ema_mid `}<span style={{ color: '#4B9EFF' }}>and</span>{` ema_mid > ema_slow

`}<span style={{ color: '#444466' }}>// Conviction Score</span>{`
score = `}<span style={{ color: '#B04BFF' }}>0.0</span>{`
score += ribbon_bull ? `}<span style={{ color: '#B04BFF' }}>0.3</span>{` : `}<span style={{ color: '#B04BFF' }}>0.0</span>{`
score += close > upper_cloud ? `}<span style={{ color: '#B04BFF' }}>0.4</span>{` : `}<span style={{ color: '#B04BFF' }}>0.0</span>{`
score += volume > `}<span style={{ color: '#d4af37' }}>ta.sma</span>{`(volume, `}<span style={{ color: '#B04BFF' }}>20</span>{`) * `}<span style={{ color: '#B04BFF' }}>2</span>{` ? `}<span style={{ color: '#B04BFF' }}>0.3</span>{` : `}<span style={{ color: '#B04BFF' }}>0.0</span>{`

`}<span style={{ color: '#d4af37' }}>plotshape</span>{`(score >= `}<span style={{ color: '#B04BFF' }}>0.7</span>{`, style=shape.triangleup,
         color=`}<span style={{ color: '#d4af37' }}>color.green</span>{`, text=`}<span style={{ color: '#4ade80' }}>&quot;BUY&quot;</span>{`)`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--qr-text-dim)' }}>Complete Package</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Everything in the Box</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "📊", title: "2 Indicators", desc: "On-chart overlay + sub-pane histogram. Both ready to add." },
              { icon: "🔧", title: "Pine Script Source", desc: "Full, unobfuscated source code. Modify, learn, extend." },
              { icon: "⚡", title: "Alert-Compatible", desc: "Set TradingView alerts on conviction thresholds directly." },
              { icon: "🔄", title: "Lifetime Updates", desc: "Every engine improvement ships to your indicators too." },
              { icon: "🕐", title: "Any Timeframe", desc: "1-minute scalping to daily swing. The math adapts." },
              { icon: "🎯", title: "Any Broker", desc: "Runs on TradingView. Works with any brokerage account." },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border text-center transition-all duration-300 hover:-translate-y-1" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--qr-text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="py-24 border-y" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--qr-text-dim)' }}>How It Compares</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Not Another Generic Indicator</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              Most paid TradingView indicators are generic oscillators wrapped in pretty colors. This is the actual scoring engine behind a live portfolio.
            </p>
          </div>

          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--qr-border)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(75,158,255,0.07)' }}>
                  <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase" style={{ color: '#4B9EFF' }}>Feature</th>
                  <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--qr-text-dim)' }}>Generic Indicators</th>
                  <th className="text-left px-6 py-4 text-xs font-bold tracking-wider uppercase" style={{ color: '#4ade80' }}>QuantRead Suite</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Source code included", generic: "Locked / invite-only", qr: "Full Pine Script", genBad: true },
                  { feature: "Based on live execution data", generic: "Backtested only", qr: "Powers a live portfolio", genBad: true },
                  { feature: "Multi-factor conviction scoring", generic: "Single indicator", qr: "7 independent factors", genBad: true },
                  { feature: "ATR-adaptive levels", generic: "Fixed / static zones", qr: "Dynamic ATR cloud", genBad: true },
                  { feature: "Works with alerts", generic: "Sometimes", qr: "Native TradingView alerts", genBad: false },
                  { feature: "Typical price", generic: "$30–$200/mo subscription", qr: "$49 one-time", genBad: false },
                ].map((row, i) => (
                  <tr key={i} className="border-t transition-colors" style={{ borderColor: 'var(--qr-border)' }}>
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4" style={{ color: row.genBad ? 'rgba(239,68,68,0.5)' : 'var(--qr-text-dim)' }}>
                      {row.genBad && <span className="mr-1.5">✕</span>}{row.generic}
                    </td>
                    <td className="px-6 py-4 font-semibold" style={{ color: '#4ade80' }}>
                      ✓ {row.qr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color: 'var(--qr-text-dim)' }}>Pricing</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Two Ways to Access</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
              Buy the indicators outright for $49, or get them included with Ticker Grader Pro alongside unlimited AI-powered conviction scores.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">

            {/* ── Indicator Suite ($49 one-time) ── */}
            <div className="rounded-2xl border p-10 text-center relative overflow-hidden" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(75,158,255,0.04) 0%, transparent 70%)' }} />

              <div className="relative">
                <h3 className="text-xl font-black mb-2">Indicator Suite</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--qr-text-muted)' }}>Pine Script™ indicators for your TradingView chart</p>

                <div className="mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-lg align-top" style={{ color: '#4ade80' }}>$</span>
                  <span className="text-5xl font-black">49</span>
                  <span className="text-lg ml-2" style={{ color: 'var(--qr-text-dim)' }}>one-time</span>
                </div>
                <p className="text-xs mb-8" style={{ color: 'var(--qr-text-dim)' }}>Pay once, use forever</p>

                <ul className="text-left space-y-3 mb-10 max-w-sm mx-auto">
                  {[
                    "Quant Model Visualizer (on-chart overlay)",
                    "Quant Conviction Histogram (sub-pane)",
                    "Full Pine Script™ source code — unobfuscated",
                    "Lifetime updates as the engine evolves",
                    "Any symbol, any timeframe, any broker",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--qr-text-muted)' }}>
                      <span className="mt-0.5 shrink-0"><IconCheck /></span>{f}
                    </li>
                  ))}
                </ul>

                <a href={indicatorCheckoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all border" style={{ borderColor: 'var(--qr-border)', color: 'var(--qr-text-muted)', background: 'transparent' }}>
                  Get Indicator Suite <IconArrowRight />
                </a>
              </div>
            </div>

            {/* ── Ticker Grader Pro ($14.99/mo) ── */}
            <div id="ticker-grader-pro" className="rounded-2xl border p-10 text-center relative overflow-hidden" style={{ borderColor: 'rgba(212,175,55,0.35)', background: 'var(--qr-surface)', boxShadow: '0 0 40px rgba(212,175,55,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #d4af37, #B04BFF, #4B9EFF)' }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

              <div className="relative">
                <div className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 border" style={{ background: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.25)', color: '#d4af37' }}>
                  Most Popular
                </div>

                <h3 className="text-xl font-black mb-2">Ticker Grader Pro</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--qr-text-muted)' }}>Unlimited AI-powered conviction scores for any stock</p>

                <div className="mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-lg align-top" style={{ color: '#d4af37' }}>$</span>
                  <span className="text-5xl font-black">14</span>
                  <span className="text-2xl font-black align-top">.99</span>
                  <span className="text-lg ml-2" style={{ color: 'var(--qr-text-dim)' }}>/mo</span>
                </div>
                <p className="text-xs mb-8" style={{ color: 'var(--qr-text-dim)' }}>Cancel anytime · Save 45% with annual ($99/yr)</p>

                <ul className="text-left space-y-3 mb-10 max-w-sm mx-auto">
                  {[
                    "Unlimited conviction grades — no daily cap",
                    "Full 6-factor indicator breakdown (EMA, RVOL, RSI, ATR, Momentum, Trend)",
                    "Trading style guide (Day Trader / Scalper / Swing)",
                    "Priority API — faster grade responses",
                    "Pine Script™ indicator suite included",
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--qr-text-muted)' }}>
                      <span className="mt-0.5 shrink-0"><IconCheck /></span>{f}
                    </li>
                  ))}
                </ul>

                <a href={tickerGraderProUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all" style={{ background: 'linear-gradient(135deg, #d4af37, #B04BFF)', color: '#fff', boxShadow: '0 8px 30px rgba(212,175,55,0.25)' }}>
                  Start Grading Unlimited <IconArrowRight />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-24 border-t" style={{ borderColor: 'var(--qr-border)', background: 'var(--qr-surface)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12 text-center">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do I need a paid TradingView plan?", a: "No. Both indicators work on TradingView's free plan. However, free plans are limited to 2 indicators per chart — you may want Plus ($14.95/mo) for unlimited." },
              { q: "Can I modify the Pine Script code?", a: "Yes. You receive the full, unobfuscated source code. Change parameters, add rules, combine with your own scripts — it's yours. The only restriction is redistribution or resale." },
              { q: "Is this the same system that runs the live portfolio?", a: "The indicators are a visual representation of the core conviction factors (ATR cloud, EMA ribbon, volume, RSI). The live engine includes additional server-side factors like options flow and news catalysts." },
              { q: "What's the difference between buying once vs. subscribing?", a: "The $49 one-time purchase gets you the Pine Script indicators only. Ticker Grader Pro ($14.99/mo) gets you the same indicators PLUS unlimited AI conviction grades for any stock. Both include the full source code." },
              { q: "What is the Live Feed add-on?", a: "For $29.99/mo you get everything in Ticker Grader Pro plus a real-time transparency window into the autonomous trading engine — watch every entry, exit, morning brief, and danger alert via Telegram." },
              { q: "What happens to the indicators if I cancel my subscription?", a: "The Pine Script code you received stays on your chart. However, you'll lose access to the Ticker Grader web tool, future indicator updates, and the Live Feed." },
              { q: "Can I get a refund?", a: "Subscriptions can be cancelled anytime from your Stripe account — no refund needed, just stop billing. One-time indicator purchases are handled case-by-case within 7 days since source code is involved." },
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
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            See what the engine sees.{' '}
            <span style={{ background: 'linear-gradient(135deg, #d4af37, #B04BFF, #4B9EFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your way.</span>
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
            Chart-level indicators or instant web grades — choose the interface that fits your workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={tickerGraderProUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all" style={{ background: 'linear-gradient(135deg, #d4af37, #B04BFF)', color: '#fff', boxShadow: '0 8px 30px rgba(212,175,55,0.25)' }}>
              Ticker Grader Pro — $14.99/mo <IconArrowRight />
            </a>
            <a href={indicatorCheckoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all border" style={{ borderColor: 'var(--qr-border)', color: 'var(--qr-text-muted)', background: 'transparent' }}>
              Indicator Suite — $49 one-time <IconArrowRight />
            </a>
          </div>
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
            <a href="/" className="transition-colors hover:text-white">Home</a>
            <a href={membershipUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Subscribe</a>
            <a href="https://t.me/MyAlertAgent_bot" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Telegram</a>
            <a href="https://x.com/QuantReadapp" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Twitter/X</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
