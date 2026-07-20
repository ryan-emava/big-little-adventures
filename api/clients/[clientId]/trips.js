// Serverless proxy: GET /api/clients/:clientId/trips
//
// Forwards to the trkit public API using the server-side secret key (never
// exposed to the browser), mirroring api/trkit-register.js. Returns the trkit
// response body verbatim so the client can map it.

const TRKIT_BASE = "https://admin.biglittleadventures.co/api/public/v1"

function json(res, status, body) {
  res.statusCode = status
  res.setHeader("content-type", "application/json")
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.setHeader("allow", "GET")
    return json(res, 405, { error: "Method not allowed" })
  }

  const secretKey = process.env.TRKIT_SECRET_KEY || process.env.TRIPKIT_SECRET_KEY
  if (!secretKey) {
    return json(res, 500, {
      error: "Missing trkit configuration",
      expectedEnv: ["TRKIT_SECRET_KEY", "TRIPKIT_SECRET_KEY"],
    })
  }

  const url = new URL(req.url, "http://localhost")
  const match = url.pathname.match(/\/api\/clients\/([^/]+)\/trips/)
  const clientId = match ? decodeURIComponent(match[1]) : req.query?.clientId
  if (!clientId) return json(res, 400, { error: "Missing clientId" })

  // Optional status filter, forwarded to the CRM (e.g. ?status=draft to
  // preview trips that aren't live yet). The CRM accepts singular values
  // (draft, quoted, on_hold, booked, expired, archived) — normalize the
  // common plural slip.
  let status = url.searchParams.get("status")
  if (status === "drafts") status = "draft"

  try {
    const upstream = new URL(`${TRKIT_BASE}/clients/${encodeURIComponent(clientId)}/trips`)
    if (status) upstream.searchParams.set("status", status)
    const response = await fetch(upstream, {
      headers: { Authorization: `Bearer ${secretKey}` },
    })
    const text = await response.text()

    if (!response.ok) {
      return json(res, 502, { error: "trkit request failed", status: response.status, body: text })
    }

    res.statusCode = 200
    res.setHeader("content-type", "application/json")
    // Don't edge-cache drafts — they're actively being edited.
    res.setHeader(
      "cache-control",
      status ? "no-store" : "s-maxage=30, stale-while-revalidate=120"
    )
    res.end(text)
  } catch (error) {
    return json(res, 500, { error: String(error?.message || error) })
  }
}
