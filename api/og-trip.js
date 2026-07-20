// OG shell for trip detail pages.
//
// Link-preview crawlers (iMessage, WhatsApp, Slack, Facebook…) don't run JS, so
// a texted quote link previews blank without server-side tags. vercel.json
// rewrites /client/:clientId/trips/:guid here; this function fetches the trip
// from the CRM, injects per-trip OpenGraph tags (plus noindex — quote pages are
// personal) into the built index.html, and returns it. Humans get the same
// HTML and the SPA hydrates normally. On any failure it falls back to the
// stock index.html so the page always loads.

const TRKIT_BASE = "https://admin.biglittleadventures.co/api/public/v1"

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

export default async function handler(req, res) {
  const url = new URL(req.url, "http://localhost")
  const clientId = url.searchParams.get("clientId")
  const guid = url.searchParams.get("guid")
  const host = req.headers["x-forwarded-host"] || req.headers.host
  const proto = req.headers["x-forwarded-proto"] || "https"
  const origin = `${proto}://${host}`

  // Always fetch the deployed SPA shell first — it's the fallback for every path.
  let html
  try {
    const shellRes = await fetch(`${origin}/index.html`)
    html = await shellRes.text()
  } catch {
    res.statusCode = 500
    return res.end("")
  }

  // Quote pages are personal: never indexed, regardless of OG success.
  let inject = `<meta name="robots" content="noindex">`

  try {
    const secretKey = process.env.TRKIT_SECRET_KEY || process.env.TRIPKIT_SECRET_KEY
    if (secretKey && clientId && guid) {
      const r = await fetch(`${TRKIT_BASE}/clients/${encodeURIComponent(clientId)}/trips`, {
        headers: { Authorization: `Bearer ${secretKey}` },
      })
      if (r.ok) {
        const data = await r.json()
        const trip = data?.[clientId]?.[guid] || data?.[clientId]?.[guid?.toLowerCase()]
        const o = trip?.overview
        if (o?.headline) {
          const title = `${o.headline} · Big Little Adventures`
          const desc = [o.destination, o.subhead].filter(Boolean).join(" — ")
          inject += `
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(`${origin}/client/${clientId}/trips/${guid}`)}">
<title>${esc(title)}</title>`
        }
      }
    }
  } catch {
    // fall through with just the noindex tag
  }

  res.statusCode = 200
  res.setHeader("content-type", "text/html; charset=utf-8")
  res.setHeader("cache-control", "s-maxage=300, stale-while-revalidate=600")
  res.setHeader("x-robots-tag", "noindex")
  res.end(html.replace("</head>", `${inject}\n</head>`))
}
