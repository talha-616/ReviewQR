# ReviewQR

Create a beautiful Google Review QR card for your business. Search a Google Maps place, customize a print-ready design, and download — entirely in the browser. No account. No backend.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Maps (optional but recommended)

Location search and the map picker need a **browser-restricted** Google Maps Platform key.

1. Create a Google Cloud project.
2. Enable **Maps JavaScript API** and **Places API (New)**.
3. Create an API key.
4. Restrict the key:
   - Application restriction: HTTP referrers (`http://localhost:3000/*`, your production domain).
   - API restriction: only the APIs above.
5. Put the key in `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never ship an unrestricted key. This app only uses `NEXT_PUBLIC_` values that are safe for a referrer-locked browser key.

Without a key, users can still paste a Google review link and design a card.

## Review destination

When a Place ID is selected, the app builds Google’s write-review URL:

`https://search.google.com/local/writereview?placeid=PLACE_ID`

You can also paste an existing Maps / review link.

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Deploy

This is a standard Next.js frontend. Deploy to Vercel, Netlify, or Cloudflare Pages. No database or server routes are required for the generator.

Set the same environment variables in the host. Add the production domain to the Google API key referrer list.

## Privacy

Uploads (logo, background) and exports run locally with Canvas APIs. Files are not sent to a ReviewQR server.
