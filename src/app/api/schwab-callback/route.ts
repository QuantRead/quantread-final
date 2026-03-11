import { NextRequest, NextResponse } from "next/server";

/**
 * Schwab OAuth Callback — Token Code Display Page
 *
 * Schwab redirects here after user grants consent.
 * This page displays the code prominently so it can be
 * quickly copied and processed locally.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const session = searchParams.get("session");

  if (!code) {
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head><title>Auth Error</title></head>
<body style="background:#0a0a0a;color:#ff4444;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
  <div style="text-align:center">
    <h1>❌ No Code Received</h1>
    <p>Schwab did not return an authorization code.</p>
  </div>
</body>
</html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head>
<title>Schwab Auth — Code Ready</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0a0f1e;
    color: #e0e6ff;
    font-family: 'Courier New', monospace;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }
  .card {
    background: #111827;
    border: 1px solid #22d3ee;
    border-radius: 12px;
    padding: 40px;
    max-width: 700px;
    width: 100%;
    text-align: center;
    box-shadow: 0 0 40px rgba(34,211,238,0.15);
  }
  h1 { color: #22d3ee; font-size: 1.8em; margin-bottom: 8px; }
  .subtitle { color: #94a3b8; font-size: 0.9em; margin-bottom: 30px; }
  .label { color: #64748b; font-size: 0.75em; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
  .code-box {
    background: #0a0a0a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 16px;
    font-size: 0.85em;
    color: #4ade80;
    word-break: break-all;
    text-align: left;
    margin-bottom: 16px;
    line-height: 1.6;
  }
  .copy-btn {
    background: #22d3ee;
    color: #0a0f1e;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    margin-bottom: 16px;
    transition: background 0.2s;
    font-family: monospace;
  }
  .copy-btn:hover { background: #06b6d4; }
  .copy-btn.copied { background: #4ade80; color: #0a0f1e; }
  .warning {
    background: rgba(251,191,36,0.1);
    border: 1px solid #fbbf24;
    border-radius: 8px;
    padding: 12px;
    color: #fbbf24;
    font-size: 0.85em;
  }
  .timer { font-size: 1.2em; font-weight: bold; color: #f87171; }
</style>
</head>
<body>
<div class="card">
  <h1>✅ Auth Code Received</h1>
  <p class="subtitle">Copy the code below and paste it in the chat immediately</p>

  <div class="label">Authorization Code</div>
  <div class="code-box" id="code">${code}</div>
  <button class="copy-btn" id="copyBtn" onclick="copyCode()">📋 Copy Code</button>

  <div class="warning">
    ⚠️ This code expires in <span class="timer" id="timer">05:00</span> — paste it immediately!
  </div>
</div>

<script>
function copyCode() {
  var code = document.getElementById('code').innerText;
  navigator.clipboard.writeText(code).then(function() {
    var btn = document.getElementById('copyBtn');
    btn.textContent = '✅ Copied!';
    btn.className = 'copy-btn copied';
    setTimeout(function() {
      btn.textContent = '📋 Copy Code';
      btn.className = 'copy-btn';
    }, 3000);
  });
}

// Countdown timer
var seconds = 290;
var interval = setInterval(function() {
  seconds--;
  if (seconds <= 0) { clearInterval(interval); document.getElementById('timer').textContent = 'EXPIRED'; return; }
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  document.getElementById('timer').textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}, 1000);
</script>
</body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}
