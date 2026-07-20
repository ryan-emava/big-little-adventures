# P1 API Requirements (for the trkit CRM)

Smaller than P0's — most of P1 is frontend-only. Two operational requirements and one
optional endpoint.

## 1. Access policy: don't block the site's server-side calls (required)

The CRM currently rejects calls from localhost. Fine — but note **every** site→CRM
call comes from Vercel serverless functions (never the browser), authenticated with
the Bearer secret key:

- `GET /clients/:clientId/trips` — trips proxy **and** the new OG shell (below)
- `POST /trip-intents`, `POST /trip-requests` — P0 CTAs
- future: share-link resolve, refresh-request

If the CRM filters by origin/IP, it must allow Vercel's egress (which uses varying
AWS IPs — allowlisting by IP is impractical; the Bearer key should be the gate).
Recommendation: **key-based auth only** for `/api/public/v1/*`, no origin/IP
filtering — the secret key already restricts callers, and origin headers are
spoofable anyway.

Dev-testing note: since localhost is blocked, end-to-end testing happens against
preview deploys (`vercel dev`/`vercel deploy`), not `npm run dev`. If you want local
E2E later, add a second "test" secret key the CRM accepts without the origin block.

## 2. OG shell traffic (no new endpoint, heads-up)

Trip pages are now served through `/api/og-trip`, which fetches
`GET /clients/:clientId/trips` server-side to inject per-trip OpenGraph tags (so
texted links preview with the trip name instead of a blank card). Responses are
edge-cached 5 minutes, so CRM traffic stays low — but every cold trip-page load adds
one CRM call. If that's ever a concern, a lighter
`GET /clients/:clientId/trips/:tripId/summary` (headline, destination, subhead only)
would remove the full-payload fetch. Not needed now.

