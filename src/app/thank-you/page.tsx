'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { convictionHistogramCode, quantModelVisualizerCode } from '@/lib/pinescript-source';

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

/* CopyButton Component */
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


