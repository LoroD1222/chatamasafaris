# Catama Safaris

Next.js homepage implementation for the Catama Safaris Figma canvas.

## Scripts

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript checks.
- `npm run test` runs Vitest.
- `npm run test:e2e` runs Playwright.
- `npm run build` creates a production build.

## Meta Conversions API

Each page view and successful enquiry submission sends matching browser Pixel and server Conversions API events, using a shared event ID for deduplication. Page views include browser identifiers, IP address, and user agent; completed leads also include SHA-256-hashed form contact data. Configure these production environment variables in Vercel (or the hosting provider):

- `META_CONVERSIONS_API_ACCESS_TOKEN` — Meta Events Manager access token. Keep this server-only; do not prefix it with `NEXT_PUBLIC_`.
- `META_PIXEL_ID` — the Meta Pixel / Dataset ID used by the Conversions API.
- `NEXT_PUBLIC_META_PIXEL_ID` — optional browser Pixel ID; defaults to the current site Pixel.
- `META_GRAPH_API_VERSION` — optional; defaults to `v23.0` and should be updated when Meta retires that Graph API version.

After deployment, open a page, submit a test enquiry, and use Meta Events Manager's Test Events panel to confirm that the browser and server `PageView` and `Lead` events are deduplicated.
