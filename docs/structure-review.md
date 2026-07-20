# Structure Review

An honest pass over the codebase as it stands (Vite + React SPA, serverless proxies on
Vercel, homegrown CRM feeding trips). Ordered by priority: fix-soon first, then
maintainability, then nice-to-haves.

## What's working well

- **Clean data/presentation split.** The CRM sends raw facts; `src/lib/tripFormat.js`
  derives every display string (dates, money, stops, occupancy). Adding a trip requires
  no UI edits, and formatting rules live in exactly one place.
- **Secrets stay server-side.** Both proxies (`api/quotes.js`, `api/clients/[clientId]/trips.js`)
  keep tokens out of the browser, and the Vite dev middleware runs the *same handlers*
  locally — dev and prod exercise identical code.
- **Design tokens survived the migration.** All styling references `var(--*)` tokens
  from the original design system, so a brand tweak is still a one-file change.
- **The adapter proved its value already**: the trkit shape change (numeric durations,
  prefixed flight numbers, missing `code`) was absorbed entirely in `tripFormat.js`.

## Priority 1 — stale, broken, or risky

- [ ] **The testimonials pipeline points at a system that no longer exists.**
  `api/quotes.js` fetches Airtable; Airtable is gone. In production the endpoint 500s —
  homepage falls back to hardcoded quotes, `/quotes` and `/quotes/:slug` show error
  states. Either repoint it at the CRM or remove the routes until the CRM has a
  testimonials endpoint. Related dead weight: `AIRTABLE_*` in `.env.example`, README.
- [ ] **`api/tripkit-register.js` is a dead duplicate** of `api/trkit-register.js`
  (older copy, nothing references it). On Vercel it still deploys as a live endpoint.
  Delete it.
- [ ] **Legacy design-tool files exist in two places** — repo root (`Home.dc.html`,
  `SiteHeader/Footer.dc.html`, `support.js`, `image-slot.js`, `_ds/`, `assets/`,
  `Design.pdf`) *and* copies inside `public/` (`public/_ds`, `public/support.js`,
  `public/data`). Everything in `public/` ships to production verbatim — and
  **`public/data/trips.json` is confirmed to contain client PII** (client name, trip
  prices/dates from an older quote batch), published unauthenticated at
  `/data/trips.json` on the live site. Delete it and redeploy first; then decide what
  to keep from the root (as archive). `public/` should probably contain only `sun.png`.
- [ ] **`tripFormat.js` crashes the page on missing dates.** `parts()` calls
  `iso.split()` — a trip lacking `quotedDate`, `deposit.dueDate`, or any segment
  datetime white-screens the entire route (seen twice already). Make the date
  formatters null-safe (return `null`, render nothing) and add one guard test. An
  **error boundary** around routes is the backstop so one bad CRM record can't blank
  the site.
- [ ] **Trip endpoint auth is "unguessable URL" only.** `/api/clients/:clientId/trips`
  returns names, travel dates, and prices to anyone holding the client UUID. UUIDs are
  decent bearer tokens, but: add `noindex` headers/meta on client pages, make sure
  links are never posted publicly, and consider short-lived signed links or a
  per-client PIN later. Also worth rate-limiting the proxy.
- [ ] **CRM datetime quality is unenforced.** All timestamps arrive as `+00:00`
  regardless of true timezone (durations can't be derived; one PVR segment arrives
  before it departs). The site displays what it's told. Write a one-page data
  contract for the CRM (required fields, timezone rule, duration always supplied) —
  cheapest possible fix for a whole class of display bugs.

## Priority 2 — maintainability

- [ ] **Two monolith components.** `Home.jsx` (~900 lines) and `QuoteDetail.jsx` (~700)
  each hold several screens' worth of sections. Extract section components
  (`HeroSection`, `PriceSummary`, `FlightTicket` is already separate…) so diffs stay
  reviewable. No behavior change needed.
- [ ] **Styling is split across two systems that can't see each other.** Components use
  inline styles, but responsive behavior lives in `global.css` keyed to element IDs
  (`#hero-grid`, `#request-card`) with `!important` — because media queries can't
  touch inline styles. This is why `QuoteDetail` has no mobile layout: nobody added
  its IDs to the CSS. Pick one approach (CSS modules, or utility classes on the token
  system); the ID coupling will keep biting.
- [ ] **`QuoteDetail` computes money from formatted strings.** `computedBalanceDue`
  regex-parses `"$3,848.90"` back into a number after `tripFormat` just formatted it.
  Compute from raw `pricing` before formatting; parsing display strings is how
  currency bugs happen.
- [ ] **The trkit proposal-registration effect in `QuoteDetail` is architecturally
  circular — delete it, don't refactor it.** It registers the trip as a "proposal"
  in trkit and injects a tracking SDK — but trkit is the CRM the trip was just
  fetched *from*. Vestige of the trips.json era. View tracking moves server-side
  (see `quote-link-access.md`); removal also kills both register endpoints and the
  `TRKIT_PUBLIC_KEY` env var.
- [ ] **Duplication across pages:** `subpageLinks` defined in three files; label/input
  styles in two; the coral back-link styled twice; card styles copied between add-ons
  and requirements. One `src/components/ui/` pass would remove most of it.
- [ ] **No lint, no tests, no CI.** The Vite scaffold's linter was dropped along the
  way. `tripFormat.js` is pure-function gold for unit tests (every bug so far —
  missing dates, `undefined` codes, `+1` arrivals — would have been a 3-line test).
  Suggest: oxlint + vitest on `src/lib/`, run in a GitHub Action.
- [ ] **`vercel.json` hardcodes one client's GUID** in the `/trips/:guid` redirect.
  Fine today; breaks silently the day client #2 gets a short link.
- [ ] **README drift.** Still describes the Airtable setup and doesn't mention the CRM,
  the trip routes, or the proxy endpoints. The docs a future contributor needs are the
  CRM shape and env vars.
- [ ] **`ScrollToTop` races hash navigation.** Navigating from a subpage to `/#trips`
  changes pathname → scrolls to top, competing with the anchor scroll. Skip the reset
  when `location.hash` is present.
- [ ] **Uncommitted work is piling up** (10+ modified/deleted files against a 2-commit
  history). Commit at feature boundaries — several review findings here were only
  recoverable because the old code was still in git.

## Priority 3 — worth considering, not urgent

- [ ] **Type the trip shape.** TypeScript (or JSDoc typedefs) on the CRM contract +
  `toDisplayTrip` output. Most bugs so far have been shape mismatches — exactly what
  types catch. Incremental adoption is fine (`allowJs`, type `src/lib/` first).
- [ ] **Data fetching could dedupe.** `TripPage` re-fetches the whole client list the
  list page just fetched. Fine at this scale; if it grows, SWR/React Query gives
  cache + revalidation for free and removes both custom hooks.
- [ ] **Image pipeline is manual** (`cwebp`/`magick` by hand per image). `vite-imagetools`
  would generate WebP + sizes from originals at build time.
- [ ] **Unused design-system components.** The original bundle had Card, Tabs, Input,
  Checkbox, Tooltip, etc. — only Button/Badge/Barcode were ported. Port on demand;
  don't port speculatively.
- [ ] **`api/_sampleQuotes.js` and the quotes sample-fallback** should follow whatever
  decision is made on the testimonials pipeline (P1, first item).
