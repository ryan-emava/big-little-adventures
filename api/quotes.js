// Serverless function (Vercel-style: /api/quotes).
// Fetches quote records from Airtable using a server-side token so the secret
// never reaches the browser. Uses plain Node req/res so it runs unchanged both
// on Vercel and inside the Vite dev middleware (see vite.config.js).
//
// Query:
//   GET /api/quotes           -> array of all quotes
//   GET /api/quotes?slug=xyz  -> a single quote object, or null if not found
//
// Env vars (set in Vercel project settings, and in .env.local for `vercel dev`):
//   AIRTABLE_TOKEN    - Airtable personal access token (data.records:read scope)
//   AIRTABLE_BASE_ID  - the base id, e.g. appXXXXXXXXXXXXXX
//   AIRTABLE_TABLE    - table name (defaults to "Quotes")

import { sampleQuotes } from "./_sampleQuotes.js";

const AIRTABLE_API = "https://api.airtable.com/v0";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(body));
}

function mapRecord(rec) {
  const f = rec.fields || {};
  const photo =
    Array.isArray(f.Photo) && f.Photo.length ? f.Photo[0].url : null;
  return {
    id: rec.id,
    slug: f.Slug || "",
    author: f.Author || "",
    trip: f.Trip || "",
    text: f.Quote || "",
    photo,
    featured: Boolean(f.Featured),
  };
}

export default async function handler(req, res) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE || "Quotes";

  const url = new URL(req.url, "http://localhost");
  const slug = url.searchParams.get("slug");

  // Local-dev fallback: no token configured and not in production -> sample data.
  if (!token || !baseId) {
    if (process.env.NODE_ENV === "production") {
      return json(res, 500, { error: "Missing Airtable configuration" });
    }
    const quotes = sampleQuotes;
    return json(
      res,
      200,
      slug ? quotes.find((q) => q.slug === slug) || null : quotes,
    );
  }

  try {
    const params = new URLSearchParams();
    if (slug) {
      params.set("filterByFormula", `{Slug} = '${slug.replace(/'/g, "\\'")}'`);
      params.set("maxRecords", "1");
    }
    const airtableUrl = `${AIRTABLE_API}/${baseId}/${encodeURIComponent(table)}?${params}`;
    const r = await fetch(airtableUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!r.ok) {
      const body = await r.text();
      return json(res, 502, {
        error: "Airtable request failed",
        status: r.status,
        body,
      });
    }

    const data = await r.json();
    const quotes = (data.records || []).map(mapRecord).filter((q) => q.slug);

    // Edge-cache at the CDN: fast for readers, ~1 min lag after an edit.
    res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate=300");
    return json(res, 200, slug ? quotes[0] || null : quotes);
  } catch (err) {
    return json(res, 500, { error: String((err && err.message) || err) });
  }
}
