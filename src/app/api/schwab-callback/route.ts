import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_COOKIE = "qr_schwab_oauth_state";

const NO_STORE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store, no-cache, private, max-age=0",
  "Pragma": "no-cache",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

/**
 * Schwab OAuth callback.
 *
 * Schwab redirects here after the operator grants consent. This route exchanges
 * the one-time authorization code server-side and displays the resulting token
 * JSON for the operator to save into the secured trading bot workflow.
 *
 * The route is intentionally fail-closed:
 * - credentials must come from server-only environment variables
 * - OAuth state must match the one-time browser cookie from schwab-start
 * - responses must never be cached or indexed
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const clientId = process.env.SCHWAB_CLIENT_ID;
  const clientSecret = process.env.SCHWAB_CLIENT_SECRET;
  const redirectUri =
    process.env.SCHWAB_REDIRECT_URI || "https://www.quantread.app/api/schwab-callback";
  const expectedState = request.cookies.get(STATE_COOKIE)?.value || process.env.SCHWAB_OAUTH_STATE;

  if (!clientId || !clientSecret) {
    return htmlResponse(
      errorPage("Schwab callback is not configured. Server-side credentials are required."),
      503,
    );
  }

  if (!code) {
    return htmlResponse(errorPage("No authorization code received from Schwab."), 400);
  }

  if (!expectedState) {
    return htmlResponse(
      errorPage("Schwab login was not started from the Re-Auth button. Go back to the dashboard and try again."),
      403,
      true,
    );
  }

  if (!state || !safeEqual(state, expectedState)) {
    return htmlResponse(errorPage("Invalid Schwab login state. Go back to the dashboard and try again."), 403, true);
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });

    const resp = await fetch("https://api.schwabapi.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    if (!resp.ok) {
      return htmlResponse(errorPage(`Token exchange failed. Schwab returned HTTP ${resp.status}.`), 500, true);
    }

    const tokens = await resp.json();
    const tokenJson = JSON.stringify(tokens, null, 2);

    return htmlResponse(successPage(tokenJson), 200, true);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return htmlResponse(errorPage(`Internal error: ${escapeHtml(message)}`), 500, true);
  }
}

function htmlResponse(body: string, status: number, clearStateCookie = false) {
  const response = new NextResponse(body, {
    status,
    headers: NO_STORE_HEADERS,
  });

  if (clearStateCookie) {
    response.cookies.set(STATE_COOKIE, "", {
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function successPage(tokenJson: string) {
  const escaped = escapeHtml(tokenJson);
  return `<!DOCTYPE html>
<html>
<head>
<title>Schwab Tokens Ready</title>
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="referrer" content="no-referrer">
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
  <h1>TOKENS ACQUIRED</h1>
  <p class="subtitle">Copy the JSON below only into the secured operator workflow</p>
  <div class="label">schwab_tokens.json - Copy this entire block</div>
  <pre class="json-box" id="tokens">${escaped}</pre>
  <button class="btn" id="btn" onclick="copy()">Copy Full Token JSON</button>
  <div class="note">Exchange was done server-side. Treat this page as sensitive and close it after copying.</div>
</div>
<script>
function copy(){
  var txt=document.getElementById('tokens').innerText;
  navigator.clipboard.writeText(txt).then(function(){
    var b=document.getElementById('btn');
    b.textContent='Copied';b.className='btn ok';
    setTimeout(function(){b.textContent='Copy Full Token JSON';b.className='btn';},3000);
  });
}
</script>
</body>
</html>`;
}

function errorPage(msg: string) {
  return `<!DOCTYPE html>
<html>
<head>
<title>Auth Error</title>
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="referrer" content="no-referrer">
</head>
<body style="background:#0a0a0a;color:#ff4444;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px">
  <div style="text-align:center;max-width:600px">
    <h1>Token Exchange Failed</h1>
    <p style="margin-top:16px;color:#94a3b8">${msg}</p>
  </div>
</body>
</html>`;
}
