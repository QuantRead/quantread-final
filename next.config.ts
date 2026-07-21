import type { NextConfig } from "next";

const tradingTerminalOrigin = (
  process.env.TRADING_TERMINAL_ORIGIN || "https://157-245-119-187.sslip.io"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Keep the public site and Schwab callback on Vercel. Only the private
      // operator terminal and its explicit API surface proxy to the VPS.
      fallback: [
        { source: "/terminal", destination: `${tradingTerminalOrigin}/` },
        { source: "/dashboard", destination: `${tradingTerminalOrigin}/dashboard` },
        { source: "/broadcast", destination: `${tradingTerminalOrigin}/broadcast` },
        { source: "/analytics", destination: `${tradingTerminalOrigin}/analytics` },
        { source: "/auth/start", destination: `${tradingTerminalOrigin}/auth/start` },
        { source: "/api/data", destination: `${tradingTerminalOrigin}/api/data` },
        { source: "/api/status", destination: `${tradingTerminalOrigin}/api/status` },
        { source: "/api/trades", destination: `${tradingTerminalOrigin}/api/trades` },
        { source: "/api/history/:path*", destination: `${tradingTerminalOrigin}/api/history/:path*` },
        { source: "/api/analytics", destination: `${tradingTerminalOrigin}/api/analytics` },
        { source: "/api/logs", destination: `${tradingTerminalOrigin}/api/logs` },
        { source: "/api/strategy", destination: `${tradingTerminalOrigin}/api/strategy` },
        { source: "/api/killswitch", destination: `${tradingTerminalOrigin}/api/killswitch` },
        { source: "/api/strategy/mode", destination: `${tradingTerminalOrigin}/api/strategy/mode` },
        { source: "/api/execution-mode", destination: `${tradingTerminalOrigin}/api/execution-mode` },
      ],
    };
  },
};

export default nextConfig;
