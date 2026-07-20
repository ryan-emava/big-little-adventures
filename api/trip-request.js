// Serverless proxy: POST /api/trip-request
// Forwards a homepage inquiry-form submission (a new lead) to the CRM.
// Spec: docs/p0-api-requirements.md §2

const TRKIT_API = "https://admin.biglittleadventures.co/api/public/v1/trip-requests"

function json(res, status, body) {
  res.statusCode = status
  res.setHeader("content-type", "application/json")
  res.end(JSON.stringify(body))
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method && req.method !== "POST") {
    res.setHeader("allow", "POST")
    return json(res, 405, { error: "Method not allowed" })
  }

  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")

    const { name, email, tripType, party, notes, honeypot } = body

    // Bot honeypot: pretend success, record nothing.
    if (honeypot) return json(res, 202, { ok: true })

    if (!name?.trim() || !EMAIL_RE.test(email || "")) {
      return json(res, 400, { error: "Please provide your name and a valid email." })
    }

    const secretKey = process.env.TRKIT_SECRET_KEY || process.env.TRIPKIT_SECRET_KEY
    if (!secretKey) return json(res, 500, { error: "Missing trkit configuration" })

    const response = await fetch(TRKIT_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
        "x-forwarded-for": req.headers["x-forwarded-for"] || "",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        tripType: tripType || null,
        party: party || null,
        notes: notes || null,
        source: "homepage",
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
