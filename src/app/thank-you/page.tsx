'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* ─── Icons ───────────────────────────────────────────────────────────────── */
const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheckSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Pine Script Source Code ─────────────────────────────────────────────── */
const quantModelVisualizerCode = `// ═══════════════════════════════════════════════════════════
// Quant Model Visualizer — QuantRead © 2026
// Full Pine Script™ source code — modify freely
// ═══════════════════════════════════════════════════════════

//@version=6
indicator("Quant Model Visualizer", overlay=true, max_labels_count=50)

// ──── INPUTS ────
atr_period   = input.int(14, "ATR Period", minval=1)
atr_mult_up  = input.float(1.5, "Upper ATR Multiplier", step=0.1)
atr_mult_dn  = input.float(1.5, "Lower ATR Multiplier", step=0.1)
ema_fast_len = input.int(8, "EMA Fast")
ema_mid_len  = input.int(21, "EMA Mid")
ema_slow_len = input.int(34, "EMA Slow")
show_ribbon  = input.bool(true, "Show EMA Ribbon")
show_cloud   = input.bool(true, "Show ATR Cloud")
show_signals = input.bool(true, "Show BUY/SELL Signals")

// ──── ATR TRIGGER CLOUD ────
atr_val     = ta.atr(atr_period)
day_open    = request.security(syminfo.tickerid, "D", open)
upper_cloud = day_open + (atr_val * atr_mult_up)
lower_cloud = day_open - (atr_val * atr_mult_dn)

upper_plot = plot(show_cloud ? upper_cloud : na, "Upper Trigger", color=color.new(color.red, 60), linewidth=1, style=plot.style_stepline)
lower_plot = plot(show_cloud ? lower_cloud : na, "Lower Trigger", color=color.new(color.green, 60), linewidth=1, style=plot.style_stepline)
fill(upper_plot, lower_plot, color=color.new(color.gray, 92), title="ATR Zone Fill")

// ──── EMA RIBBON ────
ema_fast = ta.ema(close, ema_fast_len)
ema_mid  = ta.ema(close, ema_mid_len)
ema_slow = ta.ema(close, ema_slow_len)

plot(show_ribbon ? ema_fast : na, "EMA Fast", color=color.new(color.green, 20), linewidth=2)
plot(show_ribbon ? ema_mid  : na, "EMA Mid",  color=color.new(color.aqua, 30), linewidth=1)
plot(show_ribbon ? ema_slow : na, "EMA Slow", color=color.new(color.orange, 30), linewidth=1)

ribbon_bull = ema_fast > ema_mid and ema_mid > ema_slow
ribbon_bear = ema_fast < ema_mid and ema_mid < ema_slow

// ──── PRIOR CLOSE ────
prev_close = request.security(syminfo.tickerid, "D", close[1])
plot(prev_close, "Prior Close", color=color.new(color.yellow, 40), linewidth=1, style=plot.style_stepline)

// ──── ICHIMOKU BASELINE ────
kijun = ta.ema(math.avg(ta.highest(26), ta.lowest(26)), 1)
plot(kijun, "Kijun-Sen", color=color.new(color.purple, 30), linewidth=1)

// ──── CONVICTION SCORE ────
score = 0.0
score += ribbon_bull ? 0.20 : 0.0
score += close > upper_cloud ? 0.20 : (close < lower_cloud ? -0.20 : 0.0)
score += volume > ta.sma(volume, 20) * 1.5 ? 0.15 : 0.0
score += ta.rsi(close, 14) > 40 and ta.rsi(close, 14) < 75 ? 0.15 : 0.0
score += close > kijun ? 0.15 : 0.0
score += close > prev_close ? 0.15 : 0.0

// ──── SIGNALS ────
buy_signal  = score >= 0.70 and score[1] < 0.70
sell_signal = score <= -0.30 and score[1] > -0.30

plotshape(show_signals and buy_signal,  style=shape.triangleup,   location=location.belowbar, color=color.green, size=size.small, text="BUY",  textcolor=color.green)
plotshape(show_signals and sell_signal, style=shape.triangledown, location=location.abovebar, color=color.red,   size=size.small, text="SELL", textcolor=color.red)

// ──── ALERTS ────
alertcondition(buy_signal,  "Quant BUY Signal",  "QuantRead: BUY signal fired on {{ticker}}")
alertcondition(sell_signal, "Quant SELL Signal", "QuantRead: SELL signal fired on {{ticker}}")

// ──── DATA TABLE ────
var table panel = table.new(position.top_right, 2, 8, border_width=1)
if barstate.islast
    grade = score >= 0.85 ? "S" : score >= 0.70 ? "A" : score >= 0.55 ? "B" : score >= 0.40 ? "C" : "D"
    grade_col = score >= 0.70 ? color.green : score >= 0.55 ? color.yellow : color.red
    table.cell(panel, 0, 0, "Quant v2",       text_color=color.aqua,   bgcolor=color.new(color.black, 30), text_size=size.small)
    table.cell(panel, 1, 0, "",                bgcolor=color.new(color.black, 30))
    table.cell(panel, 0, 1, "ATR (14)",        text_color=color.gray,   bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 1, 1, str.tostring(atr_val, "#.##"), text_color=color.white, bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 0, 2, "Vol State",       text_color=color.gray,   bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 1, 2, volume > ta.sma(volume,20)*2 ? "HIGH" : "NORMAL", text_color=volume > ta.sma(volume,20)*2 ? color.green : color.gray, bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 0, 3, "Trend",           text_color=color.gray,   bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 1, 3, ribbon_bull ? "BULL" : ribbon_bear ? "BEAR" : "FLAT", text_color=ribbon_bull ? color.green : ribbon_bear ? color.red : color.gray, bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 0, 4, "Trigger Dir",     text_color=color.gray,   bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 1, 4, close > upper_cloud ? "UP" : close < lower_cloud ? "DOWN" : "NEUTRAL", text_color=close > upper_cloud ? color.green : close < lower_cloud ? color.red : color.yellow, bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 0, 5, "Conviction",      text_color=color.gray,   bgcolor=color.new(color.black, 30), text_size=size.tiny)
    table.cell(panel, 1, 5, grade, text_color=grade_col, bgcolor=color.new(color.black, 30), text_size=size.small)
`;

const convictionHistogramCode = `// ═══════════════════════════════════════════════════════════
// Quant Conviction Histogram — QuantRead © 2026
// Full Pine Script™ source code — modify freely
// ═══════════════════════════════════════════════════════════

//@version=6
indicator("Quant Conviction Histogram", overlay=false)

// ──── INPUTS ────
atr_period = input.int(14, "ATR Period")
vol_mult   = input.float(1.5, "Volume Multiplier", step=0.1)

// ──── FACTOR CALCULATIONS ────
// Factor 1: EMA Ribbon Alignment
ema_fast = ta.ema(close, 8)
ema_mid  = ta.ema(close, 21)
ema_slow = ta.ema(close, 34)
f_ribbon = ema_fast > ema_mid and ema_mid > ema_slow ? 1.0 : ema_fast < ema_mid and ema_mid < ema_slow ? -1.0 : 0.0

// Factor 2: ATR Cloud Position
atr_val     = ta.atr(atr_period)
day_open    = request.security(syminfo.tickerid, "D", open)
upper_cloud = day_open + (atr_val * 1.5)
lower_cloud = day_open - (atr_val * 1.5)
f_atr = close > upper_cloud ? 1.0 : close < lower_cloud ? -1.0 : 0.0

// Factor 3: Volume Surge
f_volume = volume > ta.sma(volume, 20) * vol_mult ? 1.0 : 0.0

// Factor 4: RSI Health
rsi_val = ta.rsi(close, 14)
f_rsi = rsi_val > 40 and rsi_val < 75 ? 1.0 : rsi_val >= 75 ? -0.5 : -0.5

// Factor 5: Ichimoku Baseline
kijun = ta.ema(math.avg(ta.highest(26), ta.lowest(26)), 1)
f_ichimoku = close > kijun ? 1.0 : -1.0

// Factor 6: Gap Direction
prev_close = request.security(syminfo.tickerid, "D", close[1])
f_gap = close > prev_close ? 1.0 : -1.0

// Factor 7: Catalyst (volume + gap convergence)
f_catalyst = math.abs(close - day_open) / day_open > 0.005 and volume > ta.sma(volume, 20) * 2 ? 1.0 : 0.0

// ──── COMPOSITE SCORE ────
weights = array.from(0.20, 0.20, 0.15, 0.10, 0.10, 0.10, 0.15)
factors = array.from(f_ribbon, f_atr, f_volume, f_rsi, f_ichimoku, f_gap, f_catalyst)

score = 0.0
for i = 0 to array.size(weights) - 1
    score += array.get(weights, i) * array.get(factors, i)

// ──── GRADE ────
grade = score >= 0.85 ? "S" : score >= 0.70 ? "A" : score >= 0.55 ? "B" : score >= 0.40 ? "C" : "D"

// ──── VISUALIZATION ────
bar_color = score >= 0.70 ? color.green : score >= 0.40 ? color.yellow : color.red
plot(score, "Conviction Score", color=bar_color, style=plot.style_histogram, linewidth=4)
hline(0.70, "A-Grade Threshold", color=color.new(color.green, 60), linestyle=hline.style_dashed)
hline(0.40, "C-Grade Threshold", color=color.new(color.yellow, 60), linestyle=hline.style_dashed)
hline(0.0,  "Zero Line",        color=color.new(color.gray, 70))

// ──── FACTOR BREAKDOWN TABLE ────
var table ftable = table.new(position.bottom_right, 3, 8, border_width=1)
if barstate.islast
    headers = array.from("Factor", "Value", "Weight")
    names   = array.from("EMA Ribbon", "ATR Cloud", "Volume", "RSI", "Ichimoku", "Gap", "Catalyst")
    for i = 0 to 2
        table.cell(ftable, i, 0, array.get(headers, i), text_color=color.aqua, bgcolor=color.new(color.black, 20), text_size=size.tiny)
    for i = 0 to array.size(names) - 1
        fc = array.get(factors, i)
        table.cell(ftable, 0, i+1, array.get(names, i), text_color=color.gray, bgcolor=color.new(color.black, 30), text_size=size.tiny)
        table.cell(ftable, 1, i+1, fc >= 0.5 ? "✓" : fc <= -0.5 ? "✕" : "—", text_color=fc >= 0.5 ? color.green : fc <= -0.5 ? color.red : color.yellow, bgcolor=color.new(color.black, 30), text_size=size.tiny)
        table.cell(ftable, 2, i+1, str.tostring(array.get(weights, i) * 100, "#") + "%", text_color=color.gray, bgcolor=color.new(color.black, 30), text_size=size.tiny)

// ──── ALERTS ────
alertcondition(ta.crossover(score, 0.70), "Conviction A+", "QuantRead: Conviction crossed A-grade on {{ticker}}")
alertcondition(ta.crossunder(score, 0.40), "Conviction Drop", "QuantRead: Conviction dropped below C on {{ticker}}")
`;

/* ─── CopyButton Component ────────────────────────────────────────────────── */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
      style={{
        background: copied ? 'rgba(74,222,128,0.15)' : 'linear-gradient(135deg, #4B9EFF, #B04BFF)',
        color: copied ? '#4ade80' : '#fff',
        border: copied ? '1px solid rgba(74,222,128,0.3)' : 'none',
      }}
    >
      {copied ? <><IconCheckSmall /> Copied!</> : <><IconCopy /> {label}</>}
    </button>
  );
}

/* ─── Page Component ──────────────────────────────────────────────────────── */
export default function ThankYouPage() {
  const membershipUrl = "https://im.page/quantread";

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: 'var(--qr-border)', background: 'rgba(5,10,24,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>Q</div>
            <span className="font-bold text-lg tracking-tight">QuantRead</span>
          </Link>
        </div>
      </nav>

      {/* ═══ CONFIRMATION HERO ═══ */}
      <section className="relative pt-32 pb-16" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(74,222,128,0.08) 0%, transparent 70%)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(74,222,128,0.1)', border: '2px solid rgba(74,222,128,0.3)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            You&apos;re In. <span style={{ color: '#4ade80' }}>Welcome.</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-2" style={{ color: 'var(--qr-text-muted)' }}>
            Your QuantRead Indicator Suite is ready. Copy the Pine Script source code below and add it to your TradingView chart.
          </p>
          <p className="text-sm" style={{ color: 'var(--qr-text-dim)' }}>
            A receipt has been sent to your email via Stripe.
          </p>
        </div>
      </section>

      {/* ═══ INSTALLATION GUIDE ═══ */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border p-8 mb-8" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black" style={{ background: 'rgba(75,158,255,0.15)', color: '#4B9EFF' }}>?</span>
              How to Install (2 minutes)
            </h2>
            <div className="space-y-4">
              {[
                { step: "1", title: "Open TradingView", desc: "Go to tradingview.com and open any chart." },
                { step: "2", title: "Open Pine Script Editor", desc: "Click the \"Pine Script\" tab at the bottom of the chart." },
                { step: "3", title: "Create New Indicator", desc: "Click \"Open\" → \"New blank indicator\". Delete the default code." },
                { step: "4", title: "Paste the Code", desc: "Copy the Quant Model Visualizer code below and paste it into the editor." },
                { step: "5", title: "Add to Chart", desc: "Click \"Add to chart\". The indicator will appear on your chart immediately." },
                { step: "6", title: "Repeat for Histogram", desc: "Create another new indicator and paste the Conviction Histogram code." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(5,10,24,0.5)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0" style={{ background: 'rgba(212,175,55,0.15)', color: 'var(--qr-gold)' }}>{s.step}</div>
                  <div>
                    <h3 className="text-sm font-bold mb-0.5">{s.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--qr-text-muted)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDICATOR 1: QUANT MODEL VISUALIZER ═══ */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--qr-border)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="text-base font-bold">Quant Model Visualizer</h3>
                  <p className="text-xs" style={{ color: '#4B9EFF' }}>On-Chart Overlay · Pine Script v6</p>
                </div>
              </div>
              <CopyButton text={quantModelVisualizerCode} label="Copy Code" />
            </div>
            <pre className="p-6 overflow-x-auto text-xs leading-6 max-h-[400px] overflow-y-auto" style={{ background: '#060a14', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: 'var(--qr-text-dim)' }}>
              <code>{quantModelVisualizerCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══ INDICATOR 2: CONVICTION HISTOGRAM ═══ */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--qr-border)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ background: 'var(--qr-surface)', borderColor: 'var(--qr-border)' }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <h3 className="text-base font-bold">Quant Conviction Histogram</h3>
                  <p className="text-xs" style={{ color: 'var(--qr-gold)' }}>Sub-Pane Indicator · Pine Script v6</p>
                </div>
              </div>
              <CopyButton text={convictionHistogramCode} label="Copy Code" />
            </div>
            <pre className="p-6 overflow-x-auto text-xs leading-6 max-h-[400px] overflow-y-auto" style={{ background: '#060a14', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", color: 'var(--qr-text-dim)' }}>
              <code>{convictionHistogramCode}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ═══ PRO BUNDLE UPSELL ═══ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-2xl border p-10 text-center relative overflow-hidden" style={{ borderColor: 'rgba(212,175,55,0.25)', background: 'var(--qr-surface)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />
            <div className="relative">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--qr-gold)' }}>Upgrade Your Edge</p>
              <h2 className="text-2xl font-black mb-3">Want the Full QuantRead Experience?</h2>
              <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'var(--qr-text-muted)' }}>
                Get real-time trade alerts and pre-market intelligence briefs delivered to your Telegram — powered by the same engine behind these indicators.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {[
                  { icon: "⚡", label: "Real-time signals" },
                  { icon: "📋", label: "Pre-market briefs" },
                  { icon: "🤖", label: "Automated alerts" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: 'rgba(212,175,55,0.08)' }}>
                    <span>{f.icon}</span>
                    <span style={{ color: 'var(--qr-text-muted)' }}>{f.label}</span>
                  </div>
                ))}
              </div>
              <a href={membershipUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold transition-all animate-pulse-gold" style={{ background: 'var(--qr-gold)', color: 'var(--qr-bg)' }}>
                Explore Pro Bundle — $49/mo
              </a>
              <p className="mt-3 text-xs" style={{ color: 'var(--qr-text-dim)' }}>
                Your Indicator Suite purchase is already included. No double charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SUPPORT ═══ */}
      <section className="py-12 border-t" style={{ borderColor: 'var(--qr-border)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm mb-2" style={{ color: 'var(--qr-text-muted)' }}>
            Need help? Questions about setup?
          </p>
          <p className="text-sm" style={{ color: 'var(--qr-text-dim)' }}>
            Reach out on Twitter/X <a href="https://x.com/QuantReadapp" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#4B9EFF' }}>@QuantReadapp</a> — we respond fast.
          </p>
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
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <Link href="/indicators" className="transition-colors hover:text-white">Indicators</Link>
            <a href="https://x.com/QuantReadapp" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Twitter/X</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
