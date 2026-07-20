# Quote Link Access — client access tokens

## The model, in one paragraph

Keep the exact UX of `/client/abc123/trips` — one link per client that shows **all
their quotes**, click into any of them, share it with family, reopen it forever-ish.
The only change: the URL key is a **revocable alias** for the client, not the client's
permanent CRM id. `/t/8f3ka92xkq` resolves server-side to "Steph Perz + her currently
visible trips." Revoking = deleting the alias and minting a new one; the client record
never changes. Which quotes appear is controlled **in the CRM per trip** (archive a
trip → it leaves the list), so there's no batch/scope bookkeeping — the list is always
"this client's live quotes," same as today.

## Architecture note (who is what)

- **admin.biglittleadventures.co** — the full-stack CRM and admin panel. Owns all data, all
  authority: clients, trips, tokens, view logs, notifications.
- **This repo** — the customer-facing frontend only. Holds one service secret, proxies
  API calls through its serverless functions, renders. It stores nothing and decides
  nothing about access; it just displays whatever the resolve endpoint returns.

Trip ids in URLs: the *token* is the credential; trip ids only resolve through an
active token, so exposing the CRM's trip ids in the path is fine. A short `public_id`
slug per trip is an **optional** nicety (prettier URLs, internal re-keying freedom) —
not a security measure, and not worth blocking on.

Why this beats alternatives:
- **Not one-time URLs** — clients reopen quotes many times and forward them to a
  spouse; both must keep working.
- **No expiry on the *link*** — prices floating until booked means there's no honest
  "this page self-destructs on X." Links go *dormant* after 60 days without views
  (soft "ask Katie to refresh" interstitial, quotes still visible).
- **But individual *quotes* can expire** — that's a per-trip business state, not a
  link property. See "Quote expiry" below.
- **No accounts/passwords** — friction at the decision moment; save auth for
  post-booking.

## Quote expiry — per-trip state, not a link property

Sometimes Katie *knows* a quoted price has a real deadline: a promotion ends
(`JULY26`), a group hold releases, a fare class is nearly gone. When she knows it,
expiry is honest — and honest urgency sells. When she doesn't, the quote just carries
the standing "prices subject to change until booked" stamp and never fake-expires.

- **CRM:** optional `expiresAt` on the trip (set manually, or auto-filled from an
  attached promotion's end date). Katie can also expire a quote immediately
  ("prices moved") or un-expire by requoting. `expired` is derived on read:
  `expiresAt != null && now > expiresAt`.
- **Before expiry** (when `expiresAt` is set): the trip page shows a real deadline —
  "This quote's pricing ends July 18" — sourced from a fact, not invented.
- **After expiry:** the quote stays visible (the family still compares against it)
  but renders as a voided ticket — rotated **EXPIRED** stamp (the existing StampTag
  motif), price de-emphasized/struck, prominent "request updated pricing" CTA wired
  to `refresh-request`. On the list page, expired quotes sort below live ones with an
  EXPIRED badge.
- **Booking CTAs are disabled on expired quotes** — the one hard rule, since the
  price is no longer real.

---

## Implementation spec (paste-ready for Lovable)

Implement client access tokens for the public trips API:

**1. Table `client_access_tokens`**
- `token` text PK — random URL-safe, 22+ chars (128 bits). Never reuse the client UUID.
- `client_id` FK → clients
- `status` enum: `active` | `revoked`
- `created_at`, `revoked_at`, `last_viewed_at` timestamps
- One client may have multiple rows, but only one `active` at a time: minting a new
  token auto-revokes the previous active one.

**2. Trip aliases (optional)**
- Optionally add `public_id` to the trips table (random URL-safe slug, 8–10 chars,
  unique, immutable) and key API payloads by it — purely for shorter URLs and the
  freedom to re-key internally. Existing trip ids as URL keys are fine; skip this if
  it slows anything down.

**3. View log `token_views`**
- `token` FK, `viewed_at`, `user_agent_hash`

**4. Endpoint: `GET /api/public/v1/t/:token`** (Bearer secret-key auth, same as the
existing trips endpoint)
- Look up token. If missing or `revoked` → `404 { "status": "not_found" }` (revoked
  and never-existed must be indistinguishable).
- If `active`: return the same payload shape as the current
  `GET /clients/:clientId/trips`, plus a status wrapper:
  ```jsonc
  {
    "status": "active",            // "dormant" if last_viewed_at > 60 days ago
    "client": { "name": "Steph Perz" },
    "trips": { "<tripId>": { /* existing trip shape */ } }
  }
  ```
- `dormant` is **computed on read** (active + no views in 60 days) — do not store it,
  no cron.
- Include only trips the CRM marks visible (e.g. status `quoted`/`on_hold`, not
  archived). Archiving a trip in the CRM removes it from the payload.
- Side effect: insert a `token_views` row and update `last_viewed_at`.

**5. Endpoint: `POST /api/public/v1/t/:token/refresh-request`**
- Body: optional `{ "note": "..." }`. Notifies the advisor that this client wants
  refreshed pricing. Rate-limit 1/day per token. Returns `202`.

**6. Quote expiry**
- Add nullable `expires_at` to trips. Include it in the trip payload. A trip is
  expired when `expires_at != null && now > expires_at` — derive on read, don't
  store a flag.
- Admin controls: set/clear the date on a trip (auto-suggest from an attached
  promotion's end date), plus an "expire now" action for when pricing moves early.

**7. Admin UI (advisor-facing)**
- On the client record: show the current active link (`/t/<token>`) with a copy
  button, a "regenerate link" action (revokes old, mints new), and the view history
  (count + timestamps).

**8. Keep the old endpoint** `GET /clients/:clientId/trips` working until the site
migrates, then remove it.

---

## Site-side changes (this repo, after the CRM ships the above)

- Routes `/t/:token` (trip list — same UI as today's `/client/:clientId/trips`) and
  `/t/:token/:tripId` (trip detail). Navigation between quotes just swaps the trip
  id; the token stays in the path, one fetch serves both pages.
- **Delete the proposal-registration flow.** `QuoteDetail`'s `/api/trkit-register`
  call + SDK script injection date from when trips lived in a local JSON file and
  trkit was an external tracker. Now that the CRM *is* the data source, the frontend
  registering the CRM's own trips back into it is circular, and the SDK's view
  tracking is replaced by `token_views` on the resolve endpoint. Remove
  `api/trkit-register.js`, `api/tripkit-register.js`, the `useEffect` in
  `QuoteDetail`, and the `TRKIT_PUBLIC_KEY` env var.
- Serverless proxy `/api/t/:token` → CRM resolve endpoint.
- `status: "dormant"` → render the soft interstitial ("It's been a while — prices have
  likely moved. Want Katie to refresh?") above the still-visible quotes; wire the
  button to `refresh-request`.
- Stamp every trip page: "Quoted {quotedDate} · prices & availability subject to
  change until booked."
- Expiry rendering from `expiresAt`: future date → "pricing ends {date}" banner;
  past date → EXPIRED stamp over the ticket, price struck, booking CTA disabled,
  "request updated pricing" CTA; list page sorts expired below live with a badge.
- `404` from the resolve endpoint → friendly "This link is no longer active — text
  Katie for a fresh one."
- Hygiene: `X-Robots-Tag: noindex` on `/t/*`, `Referrer-Policy: same-origin`, delete
  the leftover `public/data/trips.json`, retire `/client/:clientId/*` routes once old
  texted links age out (plus the hardcoded redirect in `vercel.json`).
