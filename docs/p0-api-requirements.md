# P0 API Requirements (for the trkit CRM)

Endpoints the customer frontend needs to complete the P0 table-stakes items. Same
conventions as the existing public API: `Authorization: Bearer <secret key>` (calls
come only from the site's serverless proxies, never the browser), JSON in/out.

The site ships **before** these exist — buttons degrade to a "contact Katie directly"
fallback on any non-2xx — so these can land whenever, and the UI lights up.

---

## 1. Trip intent — "book this" / "ask a question" from a quote page

Powers the CTA on the trip detail page (P0 #2).

```
POST /api/public/v1/trip-intents
```

Request:

```jsonc
{
  "clientId": "21985a98-…",        // from the page's route context
  "tripId": "d6a328ca-…",
  "kind": "book" | "question",
  "note": "We're in! Can we do the oceanview room?",   // optional free text
  "source": "quote-page"
}
```

Behavior:
- Validate the trip belongs to the client → else `404`.
- Record the intent on the trip (visible in the admin panel timeline).
- `kind: "book"` → flip trip `status` to `on_hold` (or your equivalent) and notify
  the advisor immediately (this is the highest-value notification in the system).
- `kind: "question"` → notify the advisor with the note + trip context.
- Rate-limit ~5/hour per client to keep the button un-spammable.
- Response: `202 { "ok": true }`.

Notes:
- No contact fields needed — the CRM already knows the client's phone/email from the
  client record.
- When share-link tokens ship (`quote-link-access.md`), this endpoint gains a
  token-scoped twin (`POST /t/:token/trips/:tripId/intent`) and the clientId variant
  retires with the old routes.

## 2. Trip request — homepage inquiry form

Powers the homepage "Start your trip request" form (P0 #3). This is a **lead**, not
an existing client.

```
POST /api/public/v1/trip-requests
```

Request:

```jsonc
{
  "name": "Jamie Parker",
  "email": "jamie@email.com",
  "tripType": "Disney & theme parks",   // the form's select value, free-form string
  "party": "2 adults, 2 kids (4 & 7)",  // free text
  "notes": "Spring break-ish, budget ~$6k…",  // optional
  "source": "homepage"
}
```

Behavior:
- Require `name` + `email` (validate email format) → else `400` with a message the
  form can show.
- Create a lead/prospect record in the CRM; dedupe by email (append a note to the
  existing record rather than erroring).
- Notify the advisor.
- Spam controls: rate-limit by IP (the proxy forwards `x-forwarded-for`), and accept
  an optional `honeypot` field — if it's non-empty, return `202` but discard.
- Response: `202 { "ok": true }`.

## 3. Data requirement (no new endpoint): `quotedDate` required

The P0 price-disclaimer stamp (P0 #5) renders "prices & availability subject to
change until booked" alongside the quoted date from `quotedDate`. The site is being
made null-safe so a missing date degrades gracefully, but the contract stands:
**every trip payload must include `quotedDate`** (a missing one previously crashed
the page).

