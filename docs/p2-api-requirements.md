# P2 API Requirements (for the trkit CRM)

**Nothing in P2 strictly requires CRM work** — disclosures, robots/sitemap,
accessibility, and skeletons are all frontend. Two adjacent items worth doing while
you're in the CRM, though:

## 1. Recommended: testimonials endpoint (fixes a stale pipeline)

Not a P2 line item, but P2 is the polish tier and this is the biggest unpolished
surface left: the homepage testimonials and the `/quotes` pages still call the old
**Airtable** integration (`api/quotes.js`), which no longer exists — in production
those requests fail (homepage silently falls back to two hardcoded quotes; `/quotes`
shows an error state). The CRM replaced Airtable everywhere else; this is the last
holdout.

```
GET /api/public/v1/testimonials
```

Response:

```jsonc
[
  {
    "slug": "becker-maui-2026",      // stable, URL-safe, lowercase
    "author": "The Becker Family",
    "trip": "Maui 2026",              // display line, optional
    "text": "Same price as booking it ourselves…",
    "photo": null,                    // optional image URL
    "featured": true                  // featured -> shown on the homepage
  }
]
```

- Bearer secret-key auth like everything else; the site proxies via `/api/quotes`.
- Admin side: a simple testimonials table Katie can add to (this is also where the
  post-trip review-request flow will eventually write).
- Site work once it exists: repoint `api/quotes.js` from Airtable to this endpoint
  and delete the `AIRTABLE_*` config. UI doesn't change.

## 2. Optional: sitemap freshness

`public/sitemap.xml` is static (home, /quotes, /privacy, /terms) — fine while public
pages are fixed. If destination guides or public quote pages ever ship, the sitemap
should become a serverless function that includes them; only then would it need a
CRM listing endpoint. Nothing to do now.

## Note: robots policy shipped site-side

`robots.txt` allows the public pages and disallows `/client/` and `/t/`; quote pages
additionally send `X-Robots-Tag: noindex` (vercel.json + the OG shell). No CRM
involvement needed.
