const TRKIT_API = "https://trkit.lovable.app/api/public/v1/proposals"

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

  const secretKey = process.env.TRKIT_SECRET_KEY
  const publicKey = process.env.TRKIT_PUBLIC_KEY

  if (!secretKey || !publicKey) {
    return json(res, 500, { error: "Missing TrKit configuration" })
  }

  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const raw = Buffer.concat(chunks).toString("utf8") || "{}"
    const body = JSON.parse(raw)

    const { externalId, clientName, destination, canonicalUrl } = body

    if (!externalId || !clientName || !destination || !canonicalUrl) {
      return json(res, 400, { error: "Missing required registration fields" })
    }

    const response = await fetch(TRKIT_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_id: externalId,
        client_name: clientName,
        destination,
        canonical_url: canonicalUrl,
      }),
    })

    if (!response.ok) {
      return json(res, 502, {
        error: "TrKit registration failed",
        status: response.status,
        body: await response.text(),
      })
    }

    return json(res, 200, { ok: true, publicKey })
  } catch (error) {
    return json(res, 500, { error: String(error?.message || error) })
  }
}

