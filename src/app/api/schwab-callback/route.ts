import { NextRequest, NextResponse } from "next/server";

/**
 * Schwab OAuth Callback Passthrough
 *
 * Schwab redirects here after the user grants API access consent.
 * This endpoint forwards the 'code' parameter to the VPS-hosted
 * trading bot, which exchanges it for access/refresh tokens.
 *
 * Callback URL registered with Schwab: https://www.quantread.app/api/schwab-callback
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const session = searchParams.get("session");

    if (!code) {
        return new NextResponse(
            "<html><body><h2 style='color:red;font-family:sans-serif'>❌ No authorization code received from Schwab.</h2></body></html>",
            { status: 400, headers: { "Content-Type": "text/html" } }
        );
    }

    // Build the redirect URL to the VPS bot listener
    const VPS_URL = "http://209.97.146.240:8000/";
    const params = new URLSearchParams({ code });
    if (session) params.set("session", session);

    const botUrl = `${VPS_URL}?${params.toString()}`;

    // Redirect browser to VPS bot which will complete the token exchange
    return NextResponse.redirect(botUrl, { status: 302 });
}
