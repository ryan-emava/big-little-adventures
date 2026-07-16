# Big Little Adventures — Design System

Big Little Adventures is a family-travel agency ("a family travel agency is boarding soon"). This design system was built from two inputs:

- A single product screenshot: `uploads/Screenshot 2026-07-09 at 10.24.53 AM.png` — the brand's "launching soon" landing page, styled as a boarding-pass ticket with an email-capture form.
- Brand notes from the team: **fun and playful** voice, **teal + coral** color scheme.

No Figma file, GitHub repo, or existing codebase was attached. Everything here — tokens, components, the marketing UI kit — was reverse-engineered from that one screenshot plus the brand notes, then extended into a small, coherent standard component set (buttons, inputs, badges, toggles, cards, tabs, tooltip) since no component library existed to enumerate. The recurring **boarding-pass / flight** motif (ticket stubs, dashed flight path, flight codes, barcode, paper-airplane) is treated as the brand's core visual signature and is captured as its own primitive, `BoardingPassCard`.

## Index

- `styles.css` — root stylesheet; imports everything below. Link this one file.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css` (incl. radius/shadow/motion), `fonts.css` (Google Fonts import — see Caveats).
- `guidelines/` — foundation specimen cards (colors, type, spacing/radius, brand marks, iconography). Populates the Design System tab under groups **Colors**, **Type**, **Spacing**, **Brand**.
- `components/` — reusable React primitives, grouped by concern:
  - `forms/` — Button, Input, Checkbox, Switch
  - `feedback/` — Badge, StampTag, Tooltip
  - `layout/` — Card, BoardingPassCard
  - `navigation/` — Tabs
  - `brand/` — Wordmark, SunBurst, Barcode (brand-specific decorative marks, not generic UI)
- `ui_kits/marketing-site/` — click-through recreation of the one real screen we have (the Coming Soon / launch page).
- `assets/` — none copied in; see Iconography/Logo notes below.

## Components

Button, Input, Checkbox, Switch, Badge, StampTag, Tooltip, Card, BoardingPassCard, Tabs, Wordmark, SunBurst, Barcode.

**Intentional additions** (no source library existed to enumerate against, so a small standard set was authored to brand spec):

- `BoardingPassCard` — not a generic UI primitive; encodes the brand's signature ticket-stub motif so it's reusable across future pages (confirmations, itineraries, waitlists).
- `Wordmark`, `SunBurst`, `Barcode` — brand-specific decorative marks pulled directly out of the one source screenshot, split into their own primitives so they compose independently.
- Standard set (Button, Input, Checkbox, Switch, Badge, Tooltip, Card, Tabs) — sized conservatively; expand as real product surfaces are supplied.

## Content fundamentals

**Voice:** warm, playful, a little cheeky — travel-and-flight vocabulary applied to a pre-launch email capture ("A family travel agency is **boarding soon**", flight codes **DRM → BKD** standing for "Dreaming" → "Booked", a countdown framed as "**13 sleeps**" instead of "13 days", status stamped "**ON TIME**").

**Person & tone:** direct address to the reader ("Reserve your seat", "Be the first to book when the doors open"). Reassuring and low-pressure around data collection: "No spam. Just one 'we're live!' email."

**Casing:** sentence case for body copy and buttons ("Get boarding updates"); tracked-out ALL CAPS for eyebrow/meta labels (airline code, field labels like FLIGHT/GATE/SEAT/CLASS); the wordmark itself mixes a bold lowercase "big" with a script "little" and tracked caps "ADVENTURES".

**Emoji:** not used in the source screenshot. Treat as brand-appropriate but rare — reach for a single warm emoji only at a moment of delight (e.g. a confirmation state), never decoratively in headings or buttons.

**Vibe:** a paper boarding pass reimagined for a family trip — cozy, warm, a little nostalgic (perforated ticket stub, barcode, "sleeps" instead of "days"), never corporate-airline-cold.

## Visual foundations

**Color:** warm cream page background (`--cream-100`) with a white floating card surface. Two brand hues carry all meaning: deep teal (`--teal-800`) for headings, data, and structural text; coral (`--coral-500`) for every interactive/attention element — CTAs, the status stamp, flight-path dots, script accents. A soft peach (`--peach-100`) marks inset "highlight" panels (the departure countdown). No third accent hue is introduced.

**Type:** three-family system. A chunky rounded display face (Fredoka, substituted — see Caveats) carries the wordmark, flight codes, headings, and button labels. A humanist body sans (Nunito Sans) carries paragraphs and field text. A connected script face (Caveat) is reserved for handwritten-feeling accents — "little", city nicknames ("Dreaming"/"Booked"), "sleeps", and the tagline "big memories · little travelers". A monospace (IBM Plex Mono) appears once, for the ticket barcode caption.

**Spacing:** 4px base scale (4/8/12/16/20/24/32/40/48/64/80/96). Cards use generous internal padding (24–32px) — nothing feels cramped; this is a leisurely, unhurried brand.

**Backgrounds:** flat color only — no photography, no gradients, no repeating textures. The one illustrative flourish is a solid coral sun-with-rays in the page's top-right corner, echoing the travel/vacation theme without becoming a busy pattern.

**Animation:** not documented in the source (a static screenshot). Token defaults assume the brand's playful tone extends to motion: fast, snappy standard eases for hovers (`--ease-standard`) and a gentle overshoot/bounce (`--ease-bounce`) reserved for toggle knobs and confirmation moments — never for page-level or looping decoration.

**Hover states:** buttons darken one step (coral 500→600, teal 800→700); secondary/ghost buttons and tags gain a soft peach fill on hover. No lightening — always toward the deeper shade.

**Press states:** buttons scale to 0.97 on press; no color-only press state observed.

**Borders:** hairline 1px dividers in a warm taupe (`--line-200`) separate ticket sections; a 2px dashed taupe rule is the literal ticket-perforation between boarding-pass stubs. Interactive borders (secondary button, checkbox, input focus) are always 2px in a brand hue, never gray.

**Shadow:** cards float with a soft, warm-tinted shadow (`--shadow-card`, teal-tinted rgba, no black) — never a hard drop shadow. A lighter `--shadow-card-soft` is used for secondary surfaces.

**Corner radii:** everything is rounded, nothing sharp. Cards use a large 22px radius; small controls (checkbox, detail chips) use 8–14px; every button/input/tag is a full pill (999px). This pill-and-round-card vocabulary is the single strongest "family-friendly" visual cue in the brand.

**Cards:** white surface, 22px radius, soft teal-tinted shadow, no border. The signature card is the boarding pass: two stubs split by a dashed vertical perforation — left stub is the flight-code hero + detail row, right stub is freeform (form, CTA, barcode).

**Transparency/blur:** none observed; the brand favors flat, fully-opaque color blocking over glass/blur effects.

**Imagery color vibe:** none supplied yet — no photography appears in the source. If/when lifestyle photography is added, it should read warm (sun, coastal, golden-hour) to match the coral/cream palette, not cool or desaturated.

## Iconography

The one icon in the source screenshot is a small coral paper-airplane "send" glyph inside the email-capture button — a simple filled/line icon, not part of a documented icon font. No brand icon set, sprite sheet, or icon font was supplied.

**Substitution:** [Lucide](https://lucide.dev) (2px stroke, rounded joins) is used as the icon set for anything beyond that one glyph — closest open stroke-icon match to the source's simple line style. Flagged here as a substitution; swap for the brand's real icon set if one exists. No emoji or unicode glyphs are used as icons in the source.

## Logo

**No logo/mark file was supplied** — only a screenshot showing the wordmark set in type ("big" bold + "little" script + "ADVENTURES" tracked caps). Per instructions, no icon/symbol logo was invented; the `Wordmark` component reproduces the type treatment exactly as shown, and that's the only "logo" this system ships. If Big Little Adventures has an icon mark (a plane, suitcase, or similar), attach it and this system will incorporate it instead of the type-only version.

## Caveats — please help us iterate

1. **Only one real screen exists** (the Coming Soon page). Every other component (Checkbox, Switch, Tabs, Tooltip, Card) is a from-scratch standard primitive styled to match — not sourced from a real screen. Please share more product screens (booking flow, trip pages, itineraries, the actual app) so those components can be corrected against real usage.
2. **Fonts are Google Fonts substitutes, not the real brand files** — Fredoka (display), Nunito Sans (body), Caveat (script), IBM Plex Mono (barcode). If Big Little Adventures has licensed/actual brand fonts, please send the font files and we'll swap the `@font-face` declarations in `tokens/fonts.css`.
3. **No logo icon/mark, no photography, no icon set** was supplied — flagged above. Send these and we'll wire them in.
4. **Animation/hover/press behavior is inferred**, not observed (source is a static image) — flag if it doesn't match the real product feel.

Tell us what to fix and we'll get it right.
