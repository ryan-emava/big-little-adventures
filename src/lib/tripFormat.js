// Presentation helpers for trip data.
//
// trips.json stores raw values (ISO dates, numbers, adults/children counts).
// All display formatting lives here so the JSON stays clean and a new trip can
// be entered with plain facts. `toDisplayTrip` rebuilds the fully-formatted
// shape the trip components render.

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MON_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Parse the date portion of "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM" as a local
// calendar date (no timezone shifting).
function parts(iso) {
  const [y, m, d] = String(iso).split('T')[0].split('-').map(Number)
  if (!y || !m || !d || Number.isNaN(y + m + d)) return null
  return { y, m: m - 1, d, wd: new Date(y, m - 1, d).getDay() }
}

// Parse "YYYY-MM-DDTHH:MM" into local date + time parts.
function dtParts(iso) {
  const [datePart, timePart = '00:00'] = String(iso).split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [hh, mm] = timePart.split(':').map(Number)
  if (Number.isNaN(y + m + d + hh + mm)) return null
  return { y, m: m - 1, d, hh, mm }
}

// "9:00 AM" — 12-hour clock time from an ISO datetime
export function timeOf(iso) {
  if (!iso) return null
  const p = dtParts(iso)
  if (!p) return null
  const ampm = p.hh < 12 ? 'AM' : 'PM'
  const h = p.hh % 12 || 12
  return `${h}:${String(p.mm).padStart(2, '0')} ${ampm}`
}

// Whole-day difference between the date portions of two ISO values.
// dayOffset(depart, arrive) > 0 means arrival is on a later calendar day.
export function dayOffset(a, b) {
  if (!a || !b) return 0
  const x = parts(a)
  const y = parts(b)
  if (!x || !y) return 0
  return Math.round((new Date(y.y, y.m, y.d) - new Date(x.y, x.m, x.d)) / 86400000)
}

// "SUN · OCT 4" — flight ticket date badge
export function flightBadge(iso) {
  if (!iso) return null
  const p = parts(iso)
  if (!p) return null
  return `${WD[p.wd].toUpperCase()} · ${MON[p.m].toUpperCase()} ${p.d}`
}

// "Sun, Oct 4" — inline segment date
export function shortDate(iso) {
  if (!iso) return null
  const p = parts(iso)
  if (!p) return null
  return `${WD[p.wd]}, ${MON[p.m]} ${p.d}`
}

// "Sun, Oct 4, 2026" — hotel check-in / check-out
export function longDateWithWeekday(iso) {
  if (!iso) return null
  const p = parts(iso)
  if (!p) return null
  return `${WD[p.wd]}, ${MON[p.m]} ${p.d}, ${p.y}`
}

// "July 15, 2026" — quoted / payment due dates
export function longDate(iso) {
  if (!iso) return null
  const p = parts(iso)
  if (!p) return null
  return `${MON_FULL[p.m]} ${p.d}, ${p.y}`
}

// "04OCT26" — decorative barcode date
export function barcodeDate(iso) {
  if (!iso) return null
  const p = parts(iso)
  if (!p) return null
  return `${String(p.d).padStart(2, '0')}${MON[p.m].toUpperCase()}${String(p.y).slice(-2)}`
}

// "Oct 4 – Oct 9, 2026"
export function dateRange(a, b) {
  if (!a || !b) return null
  const s = parts(a)
  const e = parts(b)
  if (!s || !e) return null
  return `${MON[s.m]} ${s.d} – ${MON[e.m]} ${e.d}, ${e.y}`
}

// Whole nights between two ISO dates
export function nightsBetween(a, b) {
  if (!a || !b) return null
  const s = parts(a)
  const e = parts(b)
  if (!s || !e) return null
  return Math.round((new Date(e.y, e.m, e.d) - new Date(s.y, s.m, s.d)) / 86400000)
}

// 3848.9 -> "$3,848.90"
export function money(n) {
  return `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// 46 -> "46m", 166 -> "2h 46m", 293 -> "4h 53m". Passes strings through.
export function formatDuration(mins) {
  if (typeof mins !== 'number') return mins || null
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h && m) return `${h}h ${m}m`
  if (h) return `${h}h`
  return `${m}m`
}

// "AA1304" / "1304" -> "1304" (drop any leading airline-code letters)
function flightNumber(n) {
  return String(n).replace(/^[A-Za-z]+/, '')
}

// "WN2069" -> "WN" (the airline-code letters that prefix a flight number)
function airlineCode(n) {
  return String(n || '').match(/^[A-Za-z]+/)?.[0] || ''
}

// -50.71 -> "−$50.71"   (proper minus sign)
export function moneySigned(n) {
  const v = Number(n)
  return v < 0
    ? `−$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : money(v)
}

// { adults: 2, children: 1 } -> "2 adults · 1 child" (children omitted when 0)
export function travelersLine(adults, children) {
  const out = [`${adults} adult${adults !== 1 ? 's' : ''}`]
  if (children > 0) out.push(`${children} child${children !== 1 ? 'ren' : ''}`)
  return out.join(' · ')
}

// -> "ROOM 1 · 2 ADULTS · 1 CHILD" (children omitted when 0)
export function occupancy(adults, children, room = 1) {
  let s = `ROOM ${room} · ${adults} ADULT${adults !== 1 ? 'S' : ''}`
  if (children > 0) s += ` · ${children} CHILD${children !== 1 ? 'REN' : ''}`
  return s
}

// Rebuild the formatted shape the trip UI expects from the compact record.
export function toDisplayTrip(trip) {
  if (!trip) return null

  const f = trip.flights || {}
  const dep = f.departure || {}
  const ret = f.return || {}
  // Trip dates come from the flights: leave date and fly-home date.
  const start = dep.segments?.[0]?.depart
  const end = ret.segments?.[0]?.depart
  const nights = start && end ? nightsBetween(start, end) : null

  const t = trip.travelers || {}
  const adults = t.adults || 0
  const children = t.children || 0

  const o = trip.overview || {}
  const h = trip.hotel || {}
  const pr = trip.pricing || {}

  const flightView = (fl) => {
    const segs = fl.segments || []
    const first = segs[0] || {}
    const last = segs[segs.length - 1] || {}
    const stopCount = Math.max(0, segs.length - 1)
    // Days the final arrival lands after the initial departure date (overnight = +1).
    const arriveOffset = first.depart && last.arrive ? dayOffset(first.depart, last.arrive) : 0
    const arriveTime = timeOf(last.arrive)
    return {
      date: flightBadge(first.depart),
      from: first.from,
      to: last.to,
      departTime: timeOf(first.depart),
      arriveTime: arriveTime ? arriveTime + (arriveOffset > 0 ? ` +${arriveOffset}` : '') : null,
      // "Nonstop", "1 stop", "2 stops" — derived from the number of segments.
      stops: stopCount === 0 ? 'Nonstop' : `${stopCount} stop${stopCount > 1 ? 's' : ''}`,
      duration: formatDuration(fl.duration),
      segments: segs.map((s) => {
        const legOffset = dayOffset(s.depart, s.arrive)
        const leg = [
          [s.from?.code, timeOf(s.depart)].filter(Boolean).join(' '),
          [s.to?.code, timeOf(s.arrive)].filter(Boolean).join(' ') +
            (legOffset > 0 ? ` +${legOffset}` : ''),
        ]
          .filter(Boolean)
          .join(' → ')
        return {
          flight: `${f.airline} #${flightNumber(s.number)}`,
          detail: [leg, shortDate(s.depart)].filter(Boolean).join(' · '),
        }
      }),
      barcode: [
        f.code || airlineCode(first.number) || null,
        first.from?.code && last.to?.code ? `${first.from.code}→${last.to.code}` : null,
        barcodeDate(first.depart),
      ]
        .filter(Boolean)
        .join(' · '),
    }
  }

  // Whole days since the quote was prepared (staleness nudge). Null if unknown.
  const quotedParts = trip.quotedDate ? parts(trip.quotedDate) : null
  const quotedDaysAgo = quotedParts
    ? Math.max(0, Math.floor((Date.now() - new Date(quotedParts.y, quotedParts.m, quotedParts.d).getTime()) / 86400000))
    : null

  // "$257" — total split across travelers and nights; the honest all-in framing.
  const persons = adults + children
  const perPersonPerNight =
    pr.totalPrice != null && persons > 0 && nights > 0
      ? `$${Math.round(pr.totalPrice / persons / nights).toLocaleString('en-US')}`
      : null

  // `pricing.options` (array form): split by whether the option is part of the
  // package (CRM sends `includedInPackage: true`) — those render with the
  // add-ons cards; the rest are paid line items in the price breakdown.
  const optionList = Array.isArray(pr.options) ? pr.options : []
  const isIncluded = (opt) => opt.includedInPackage === true || opt.included === true
  const includedOptions = optionList.filter(isIncluded)
  const paidOptions = optionList.filter((opt) => !isIncluded(opt))

  return {
    client: trip.client,
    quotedDaysAgo,
    overview: {
      headline: o.headline,
      subhead: o.subhead,
      destination: o.category ? `${o.destination} · ${o.category}` : o.destination,
      preparedByLine: [
        `Prepared for ${trip.client} by ${trip.advisor}, Big Little Adventures`,
        trip.quotedDate ? `Quoted ${longDate(trip.quotedDate)}` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    },
    travelers: {
      count: travelersLine(adults, children),
      sleeps: nights != null ? `${nights} sleeps` : null,
      dateRange: start && end ? dateRange(start, end) : null,
    },
    flights: f.airline
      ? {
          airline: f.airline,
          departure: dep.segments?.length ? flightView(dep) : null,
          return: ret.segments?.length ? flightView(ret) : null,
        }
      : {},
    hotel: {
      name: h.name,
      tagline: h.tagline,
      rating: h.rating != null ? `★ ${Number(h.rating).toFixed(1)} RATING` : null,
      checkin: start ? longDateWithWeekday(start) : null,
      checkout: end ? longDateWithWeekday(end) : null,
      nights: nights != null ? String(nights) : null,
      room: h.room
        ? { occupancy: occupancy(adults, children), type: h.room.type, note: h.room.note }
        : null,
      amenities: h.amenities || [],
      note: h.note,
      // CRM media objects -> { url, thumb, width, height } for the photo strip.
      photos: (h.photos || [])
        .filter((p) => p && (p.thumb_url || p.url))
        .map((p) => ({
          url: p.url || p.thumb_url,
          thumb: p.thumb_url || p.url,
          width: p.width || null,
          height: p.height || null,
        })),
      // CRM links -> { label, url } pills ("Explore" row).
      links: (h.links || [])
        .filter((l) => l && l.url)
        .map((l) => ({ label: l.label || l.url, url: l.url })),
    },
    // Included-in-package options render in BOTH places: as "Included add-ons"
    // cards here, and as sub-rows under the package line in the breakdown.
    addons: [
      ...(trip.addons || []),
      ...includedOptions.map((opt) => ({
        title: opt.title,
        description: opt.description || null,
      })),
    ],
    // Per-trip "before you go" items. Each entry may be a plain string or
    // { title, description }; normalize to { title, description }.
    requirements: (trip.requirements || []).map((r) =>
      typeof r === 'string' ? { title: r, description: null } : r,
    ),
    pricing: {
      totalPrice: pr.totalPrice != null ? money(pr.totalPrice) : null,
      deposit: pr.deposit
        ? {
            amount: money(pr.deposit.amount),
            // dueAtBooking wins over an explicit date; renders under "Deposit due".
            dueDate: pr.deposit.dueAtBooking
              ? 'at booking'
              : pr.deposit.dueDate
                ? `by ${longDate(pr.deposit.dueDate)}`
                : null,
          }
        : null,
      fullPayment: pr.fullPaymentDueDate ? { dueDate: `by ${longDate(pr.fullPaymentDueDate)}` } : null,
      // Deposit-first framing: "balance not due until {this}" in the header.
      balanceNotDueUntil: pr.fullPaymentDueDate ? longDate(pr.fullPaymentDueDate) : null,
      perPersonPerNight,
      // "You're saving $50.71" (+ promo code when present)
      savings:
        pr.promotion && pr.promotion.amount < 0
          ? { amount: money(Math.abs(pr.promotion.amount)), code: pr.promotion.code || null }
          : null,
      payments: { packagePrice: pr.packagePrice != null ? money(pr.packagePrice) : null },
      breakdown: {
        adults:
          pr.adultBase != null
            ? { label: `Adult base price (×${adults})`, price: money(pr.adultBase) }
            : null,
        child:
          children > 0 && pr.childBase != null
            ? { label: `Child / junior base price (×${children})`, price: money(pr.childBase) }
            : null,
        promotion: pr.promotion
          ? {
              label: pr.promotion.code ? `Promotion (${pr.promotion.code})` : 'Promotion',
              amount: moneySigned(pr.promotion.amount),
            }
          : null,
        // Options with includedInPackage: true — indented sub-rows under the
        // "Flights, hotel & add-ons package" line (like adult/child base rows).
        packageOptions: includedOptions.map((opt) => ({
          title: opt.title,
          price: opt.price != null ? money(opt.price) : null,
        })),
        // Paid (non-included) options — their own line items.
        options: paidOptions.map((opt) => ({
          title: opt.title,
          description: opt.description || null,
          price: opt.price != null ? money(opt.price) : null,
        })),
        optionsAmount:
          typeof pr.options === 'number' ? money(pr.options) : null,
        payInDestination: pr.payInDestination != null ? money(pr.payInDestination) : null,
      },
    },
  }
}
