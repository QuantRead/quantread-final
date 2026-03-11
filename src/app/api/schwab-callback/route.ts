import { NextRequest, NextResponse } from "next/server";

/**
 * Schwab OAuth Callback — Server-Side Token Exchange
 *
 * Schwab redirects here after user grants consent.
 * This function immediately exchanges the code for tokens
 * server-side (no race condition) and displays them for
 * copy-paste into the trading bot.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse(errorPage("No authorization code received from Schwab."), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  // ── Credentials (hardcoded for this one-time setup) ──────────────────────
  const CLIENT_ID     = "NV4vGaW3qcCmPMrKEORweKb8wJg0KYcnvXOUrRwQqhk7fwAy";
  const CLIENT_SECRET = "ezA70RE5nYkG04x4cgh8o9wbnB1RYExJDZZ5M2VR9Zx6HTbGCOkph9uAKoeWveFk";
  const REDIRECT_URI  = "https://www.quantread.app/api/schwab-callback";
  // ─────────────────────────────────────────────────────────────────────────

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const body = new URLSearchParams({
      grant_type:   "authorization_code",
      code:         code,
      redirect_uri: REDIRECT_URI,
    });

    const resp = await fetch("https://api.schwabapi.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization:  `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return new NextResponse(errorPage(`Token exchange failed (HTTP ${resp.status}):<br><pre>${escapeHtml(err)}</pre>`), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }

    const tokens = await resp.json();
    const tokenJson = JSON.stringify(tokens, null, 2);

    return new NextResponse(successPage(tokenJson), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new NextResponse(errorPage(`Internal error: ${escapeHtml(message)}`), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function successPage(tokenJson: string) {
  const escaped = escapeHtml(tokenJson);
  return `<!DOCTYPE html>
<html>
<head>
<title>✅ Schwab Tokens Ready</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0f1e;color:#e0e6ff;font-family:'Courier New',monospace;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.card{background:#111827;border:1px solid #22d3ee;border-radius:12px;padding:40px;max-width:800px;width:100%;text-align:center;box-shadow:0 0 40px rgba(34,211,238,0.2)}
h1{color:#4ade80;font-size:1.8em;margin-bottom:8px}
.subtitle{color:#94a3b8;font-size:0.9em;margin-bottom:28px}
.label{color:#64748b;font-size:0.75em;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;text-align:left}
.json-box{background:#000;border:1px solid #22d3ee;border-radius:8px;padding:20px;font-size:0.8em;color:#4ade80;text-align:left;margin-bottom:16px;max-height:300px;overflow-y:auto;white-space:pre-wrap;word-break:break-all}
.btn{background:#22d3ee;color:#0a0f1e;border:none;border-radius:8px;padding:14px 32px;font-size:1em;font-weight:bold;cursor:pointer;width:100%;margin-bottom:12px;font-family:monospace;transition:background 0.2s}
.btn:hover{background:#06b6d4}
.btn.ok{background:#4ade80}
.note{background:rgba(74,222,128,0.1);border:1px solid #4ade80;border-radius:8px;padding:12px;color:#4ade80;font-size:0.85em;margin-top:16px}
</style>
</head>
<body>
<div class="card">
  <h1>🎉 TOKENS ACQUIRED</h1>
  <p class="subtitle">Copy the JSON below and paste it into the chat</p>
  <div class="label">schwab_tokens.json — Copy this entire block</div>
  <pre class="json-box" id="tokens">${escaped}</pre>
  <button class="btn" id="btn" onclick="copy()">📋 Copy Full Token JSON</button>
  <div class="note">✅ Exchange was done server-side in milliseconds — these tokens are fresh and valid for 30 minutes (access) / 7 days (refresh).</div>
</div>
<script>
function copy(){
  var txt=document.getElementById('tokens').innerText;
  navigator.clipboard.writeText(txt).then(function(){
    var b=document.getElementById('btn');
    b.textContent='✅ Copied!';b.className='btn ok';
    setTimeout(function(){b.textContent='📋 Copy Full Token JSON';b.className='btn';},3000);
  });
}
</script>
</body>
</html>`;
}

function errorPage(msg: string) {
  return `<!DOCTYPE html>
<html>
<head><title>Auth Error</title></head>
<body style="background:#0a0a0a;color:#ff4444;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px">
  <div style="text-align:center;max-width:600px">
    <h1>❌ Token Exchange Failed</h1>
    <p style="margin-top:16px;color:#94a3b8">${msg}</p>
  </div>
</body>
</html>`;
}
