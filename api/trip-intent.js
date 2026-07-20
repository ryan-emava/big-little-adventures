// Serverless proxy: POST /api/trip-intent
// Forwards a quote-page CTA ("book this" / "ask a question") to the CRM.
// Spec: docs/p0-api-requirements.md §1

const TRKIT_API = "https://admin.biglittleadventures.co/api/public/v1/trip-intents"

function json(res, status, body) {
  res.statusCode = status
  res.setHeader("content-type", "application/json")
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method && req.method !== "POST") {
    res.setHeader("allow", "POST")
    return json(res, 405, { error: "Method not allowed" })
  }

  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")

    const { clientId, tripId, kind, note } = body
    if (!clientId || !tripId || !["book", "question"].includes(kind)) {
      return json(res, 400, { error: "Missing or invalid fields" })
    }

    const secretKey = process.env.TRKIT_SECRET_KEY || process.env.TRIPKIT_SECRET_KEY
    if (!secretKey) return json(res, 500, { error: "Missing trkit configuration" })

    const response = await fetch(TRKIT_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        tripId,
        kind,
        note: note || null,
        source: "quote-page",
      }),
    })

    if (!response.ok) {
      return json(res, 502, { error: "CRM request failed", status: response.status })
    }
    return json(res, 202, { ok: true })
  } catch (error) {
    return json(res, 500, { error: String(error?.message || error) })
  }
}
