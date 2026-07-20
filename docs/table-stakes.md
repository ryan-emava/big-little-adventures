# Table Stakes — prioritized

Expected features not yet implemented, ranked. Order within each tier is the
recommended build order. Rationale for ranking: quote links go to clients' phones at
the decision moment — anything broken or missing *on that path* outranks everything
else; then trust signals; then hygiene.

## P0 — actively losing bookings or data (do first)

- [x] **1. Make the trip detail page responsive.** All `@media` rules target
  homepage/header/footer IDs only. `QuoteDetail`'s flight tickets (two-pane flex),
  add-on/requirements grids (`repeat(3, 1fr)`), and price columns squish or overflow
  on phones — and phones are where quote links get opened. The single highest-impact
  item in this file.
- [x] **2. Add a CTA to the trip page.** A client reads a quote and the page
  dead-ends — no "book it," no "ask a question," no contact info. Minimum: contact
  CTA with the trip id pre-filled. Better: booking-intent POST to the CRM that flips
  `status` and notifies Katie.
- [x] **3. Wire the homepage inquiry form.** "Send trip request" only flips local
  state — no email, no CRM record. A real prospect's request silently vanishes. This
  is data loss, not a missing feature.
- [x] **4. Put contact info on the site.** No email, phone, or contact page exists
  anywhere. The footer links to social + domain only.
- [x] **5. Price-accuracy disclaimer on every quote.** "Quoted {date} · prices &
  availability subject to change until booked." Protects Katie the moment a supplier
  reprices mid-conversation. (Pairs with per-quote `expiresAt` — see
  `quote-link-access.md`.)

## P1 — before sending links to more clients / any promotion

- [x] **6. OG/Twitter tags + favicon + meta description.** When Katie texts a quote
  link today, the preview is blank. Trip pages should preview destination, dates,
  and an image — shared links are the marketing surface.
- [x] **7. Per-route page titles.** Everything is "Big Little Adventures." Trip pages
  should read "Riu Santa Fe · Oct 4–9 · Big Little Adventures."
- [~] **8. Error monitoring** — route-level ErrorBoundary shipped (friendly fallback
  instead of white screen, console logging). Sentry wiring pending a DSN — needs an
  account decision.
- [x] **9. Analytics** — Vercel Analytics wired (`<Analytics/>`); enable it in the
  Vercel dashboard (project → Analytics tab). The per-client sales signal is spec'd
  as optional in `p1-api-requirements.md` §3 / superseded by `token_views` later.
- [x] **10. A real 404 page.** Unknown routes render blank (no catch-all `<Route>`).
- [x] **11. Privacy policy & terms.** Required once the inquiry form actually collects
  names/emails; expected by ad platforms later.
- [x] **12. Business identity in the footer** — legal name, location, year.
  Anonymous sites read as unestablished.

## P2 — soon after

- [~] **13. Seller-of-travel / agency disclosures** — display slots shipped (footer +
  Terms "Registration" section, hidden until `business.sellerOfTravel` is set in
  `src/lib/contact.js`). Pending: confirm the state of registration and the actual
  number.
- [x] **14. robots.txt + sitemap; `noindex` client trip pages** — robots.txt allows
  public pages, disallows `/client/` + `/t/`; static sitemap for home/quotes/legal;
  quote pages send `X-Robots-Tag: noindex` via vercel.json headers + the OG shell.
- [~] **15. Accessibility pass** — done: label/`htmlFor` on all form fields, aria on
  the CTA textarea, `:focus-visible` outlines site-wide, form labels darkened to pass
  AA (ink-400 → ink-600, 5.5:1). Audit results for the rest (brand decisions, not
  bugs): coral-500 eyebrows on cream = 2.7:1 (fails even large-text AA), ink-400
  micro-caps on white = 2.9:1, white-on-coral buttons = 3.0:1 (AA-large only).
  Passing all would mean darkening the brand coral for text use — flagging rather
  than restyling unilaterally.
- [x] **16. Loading skeletons** — pulsing card skeletons on the trips list, trip
  detail, and reviews pages (reduced-motion aware).

## P3 — when convenient

- [ ] **17. Print stylesheet for the quote page.** People print itineraries; the
  boarding-pass design would print beautifully with a small `@media print` pass.
- [ ] **18. Uptime/health check** on the CRM proxy endpoints.
