# Standout Ideas — ways to differentiate

Things most small agencies *don't* have, ranked by expected impact vs. effort. The
theme: the boarding-pass aesthetic and the human advisor are the brand — every idea
here leans into one of those. Checkboxes so you can hand-pick.

## Tier 1 — high impact, buildable now (no new CRM fields)

- [x] **Deposit-first pricing.** Show "Hold this trip for $750 — balance due Aug 20"
  as the headline number instead of leading with $3,848.90. People commit to the
  deposit, not the total. All data already exists (`pricing.deposit`).
- [x] **Per-person / per-night math.** "$257 per person per night, flights included" —
  derivable in `tripFormat.js` from totalPrice ÷ travelers ÷ nights. Makes
  all-inclusive pricing feel dramatically cheaper than one big number.
- [x] **Honest price-movement urgency.** Prices float until booked — so *never* claim
  "price locked until X." The truthful version sells better anyway: stamp every quote
  "Quoted July 15 · prices & availability subject to change until booked," and once a
  quote is >~1 week old, add "prices have likely moved — ask Katie for a refresh."
  Doubles as the required accuracy disclaimer. (`deposit.dueDate` still belongs in the
  payment schedule — it's a booking deadline, not a price guarantee.) When Katie knows
  a real deadline (promo end, hold release), per-quote `expiresAt` gives honest hard
  urgency — see quote expiry in `quote-link-access.md`.
- [x] **Advisor presence on the quote page.** Katie's photo (already optimized in
  `src/assets/`), a one-liner, and a "text me with questions" link. People book with
  humans; today the quote page is anonymous below the wordmark.
- [x] **Savings framing.** Promotion shows as a breakdown line (`−$50.71`); reframe near
  the total as "You're saving $50.71 with the July sale."

## Tier 2 — high impact, needs a CRM field or endpoint

- [ ] **"Book this trip" flow.** POST to the CRM → trip `status` flips `quoted → on
  hold` → Katie gets notified → the page shows the DRM→BKD progress motif (already
  designed on the homepage form stub) as *their* trip's status. Turns the quote page
  into the transaction surface. Pairs with a Stripe payment link for the deposit.
- [ ] **Hotel photos.** `hotel.images[]` + a small gallery. Text amenity lists don't
  sell beaches; photos do. Single highest-impact visual change on the quote page.
- [ ] **Hotel guest reviews on the quote.** `hotel.reviews[]` (text, author, rating,
  source) curated in the CRM per quote — "What guests say about Riu Santa Fe" with
  ★ ratings and "via Google" attribution. Curation beats an API feed: Katie picks the
  three reviews that mention kids clubs.
- [ ] **"Katie recommends" badge.** A `recommended: true` flag on one trip per client
  batch. When someone gets 6 options, the advisor's pick is the strongest signal on
  the list page — it's literally what they're paying an agent for.
- [ ] **Option comparison.** The trips list shows 6 near-identical cards; add a compare
  strip: "Riu Palace is +$458 over Santa Fe → oceanview junior suite + 5★." Deltas
  are computable client-side from data already returned.
- [ ] **Share with your travel buddy.** Copy-link button + OG preview tags. Trips are
  two-person decisions; make the link the client forwards look great and track that
  it was opened (view count in the CRM = buying signal for Katie).

## Tier 3 — the memorable stuff (post-booking & brand moments)

- [ ] **The trip page becomes a countdown page after booking.** Status `booked` swaps the
  pricing card for "47 days until Cabo" + itinerary + requirements checklist. Clients
  share countdown pages; every share is an ad.
- [ ] **Apple/Google Wallet pass.** The site already looks like a boarding pass —
  generate a real `.pkpass` "trip ticket" (destination, dates, BLA barcode) when a
  trip books. On-brand to the point of delight, and genuinely rare among agencies.
- [ ] **Add-to-calendar (.ics)** for payment deadlines and travel dates. "Final payment
  due Aug 20" in the client's own calendar is retention *and* fewer chases for Katie.
- [ ] **Requirements as a personal checklist.** The "Before you go" cards become
  checkable (state in the CRM): passport ✓, insurance ✓. Katie sees who's ready;
  clients feel taken care of.
- [ ] **Post-trip loop.** Automated "welcome home" email → 2-sentence review request →
  feeds the testimonials section (solves the slim-testimonials problem permanently)
  → 90 days later, "thinking about next summer?" with a pre-filled trip request.
- [ ] **Referral hook.** "Give a friend a free trip consult" link on the countdown page —
  travel referrals happen at peak excitement, which is *before and during* the trip,
  not after.
- [ ] **Destination mini-guides** (one page per recurring destination: Cabo, Punta Cana,
  Disney). Sells expertise, gives quote pages internal links, and is the only real
  SEO play a new agency can win locally.
