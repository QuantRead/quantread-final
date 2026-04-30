This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Schwab Callback Security

The Schwab weekly re-auth flow starts at `/api/schwab-start` and finishes at `/api/schwab-callback`.

`/api/schwab-start` creates a one-time browser safety code, sends the operator to Schwab, and stores the safety code in an HTTP-only cookie. `/api/schwab-callback` exchanges the returned Schwab code only if that safety code matches.

The route intentionally fails closed unless these server-only environment variables are configured:

- `SCHWAB_CLIENT_ID`
- `SCHWAB_CLIENT_SECRET`
- `SCHWAB_REDIRECT_URI`

Do not prefix these values with `NEXT_PUBLIC_`. They must only exist in local `.env.local` files or Vercel server environment variables.

`SCHWAB_OAUTH_STATE` is optional and only exists as a fallback for old manually generated authorization URLs. The normal weekly workflow should use `/api/schwab-start`, which generates a fresh state value each time.

The callback response is marked `no-store` and `noindex`, but the returned token JSON is still sensitive. Copy it only into the secured operator workflow, then close the browser tab.

If Schwab credentials were ever committed, pasted into chat, or deployed inside source code, rotate the Schwab app secret immediately, update the Vercel production environment variables, and redeploy.
