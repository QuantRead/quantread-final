import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUTH_BASE_URL = "https://api.schwabapi.com/v1/oauth/authorize";
const STATE_COOKIE = "qr_schwab_oauth_state";
const CALLBACK_URL = "https://www.quantread.app/api/schwab-callback";

const NO_STORE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store, no-cache, private, max-age=0",
  "Pragma": "no-cache",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

export async function GET() {
  const clientId = process.env.SCHWAB_CLIENT_ID;
  const redirectUri = process.env.SCHWAB_REDIRECT_URI || CALLBACK_URL;

  if (!clientId) {
    return htmlResponse(errorPage("Schwab re-auth is not configured. Server-side client ID is required."), 503);
  }

  const state = randomBytes(32).toString("base64url");
  const authUrl = new URL(AUTH_BASE_URL);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl.toString(), { status: 302 });
  for (const [key, value] of Object.entries(NO_STORE_HEADERS)) {
    if (key !== "Content-Type") {
      response.headers.set(key, value);
    }
  }
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
  return response;
}

function htmlResponse(body: string, status: number) {
  return new NextResponse(body, {
    status,
    headers: NO_STORE_HEADERS,
  });
}

function errorPage(msg: string) {
  return `<!DOCTYPE html>
<html>
<head>
<title>Schwab Re-Auth Not Ready</title>
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="referrer" content="no-referrer">
</head>
<body style="background:#0a0a0a;color:#ff4444;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px">
  <div style="text-align:center;max-width:620px">
    <h1>Schwab Re-Auth Is Not Ready</h1>
    <p style="margin-top:16px;color:#94a3b8">${msg}</p>
  </div>
</body>
</html>`;
}
