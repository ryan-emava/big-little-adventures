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
  const [y, m, d] = iso.split('T')[0].split('-').map(Number)
  return { y, m: m - 1, d, wd: new Date(y, m - 1, d).getDay() }
}

// Parse "YYYY-MM-DDTHH:MM" into local date + time parts.
function dtParts(iso) {
  const [datePart, timePart = '00:00'] = iso.split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [hh, mm] = timePart.split(':').map(Number)
  return { y, m: m - 1, d, hh, mm }
}

// "9:00 AM" — 12-hour clock time from an ISO datetime
export function timeOf(iso) {
  const p = dtParts(iso)
  const ampm = p.hh < 12 ? 'AM' : 'PM'
  const h = p.hh % 12 || 12
  return `${h}:${String(p.mm).padStart(2, '0')} ${ampm}`
}

// Whole-day difference between the date portions of two ISO values.
// dayOffset(depart, arrive) > 0 means arrival is on a later calendar day.
export function dayOffset(a, b) {
  const x = parts(a)
  const y = parts(b)
  return Math.round((new Date(y.y, y.m, y.d) - new Date(x.y, x.m, x.d)) / 86400000)
}

// "SUN · OCT 4" — flight ticket date badge
export function flightBadge(iso) {
  const p = parts(iso)
  return `${WD[p.wd].toUpperCase()} · ${MON[p.m].toUpperCase()} ${p.d}`
}

// "Sun, Oct 4" — inline segment date
export function shortDate(iso) {
  const p = parts(iso)
  return `${WD[p.wd]}, ${MON[p.m]} ${p.d}`
}

// "Sun, Oct 4, 2026" — hotel check-in / check-out
export function longDateWithWeekday(iso) {
  const p = parts(iso)
  return `${WD[p.wd]}, ${MON[p.m]} ${p.d}, ${p.y}`
}

// "July 15, 2026" — quoted / payment due dates
export function longDate(iso) {
  const p = parts(iso)
  return `${MON_FULL[p.m]} ${p.d}, ${p.y}`
}

// "04OCT26" — decorative barcode date
export function barcodeDate(iso) {
  const p = parts(iso)
  return `${String(p.d).padStart(2, '0')}${MON[p.m].toUpperCase()}${String(p.y).slice(-2)}`
}

// "Oct 4 – Oct 9, 2026"
export function dateRange(a, b) {
  const s = parts(a)
  const e = parts(b)
  return `${MON[s.m]} ${s.d} – ${MON[e.m]} ${e.d}, ${e.y}`
}

// Whole nights between two ISO dates
export function nightsBetween(a, b) {
  const s = parts(a)
  const e = parts(b)
  return Math.round((new Date(e.y, e.m, e.d) - new Date(s.y, s.m, s.d)) / 86400000)
}

// 3848.9 -> "$3,848.90"
export function money(n) {
  return `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
    return {
      date: flightBadge(first.depart),
      from: first.from,
      to: last.to,
      departTime: timeOf(first.depart),
      arriveTime: timeOf(last.arrive) + (arriveOffset > 0 ? ` +${arriveOffset}` : ''),
      // "Nonstop", "1 stop", "2 stops" — derived from the number of segments.
      stops: stopCount === 0 ? 'Nonstop' : `${stopCount} stop${stopCount > 1 ? 's' : ''}`,
      duration: fl.duration,
      segments: segs.map((s) => {
        const legOffset = dayOffset(s.depart, s.arrive)
        return {
          flight: `${f.airline} #${s.number}`,
          detail:
            `${s.from.code} ${timeOf(s.depart)} → ${s.to.code} ${timeOf(s.arrive)}` +
            `${legOffset > 0 ? ` +${legOffset}` : ''} · ${shortDate(s.depart)}`,
        }
      }),
      barcode: `${f.code} · ${first.from.code}→${last.to.code} · ${barcodeDate(first.depart)}`,
    }
  }

  return {
    client: trip.client,
    overview: {
      headline: o.headline,
      subhead: o.subhead,
      destination: o.category ? `${o.destination} · ${o.category}` : o.destination,
      preparedByLine:
        `Prepared for ${trip.client} by ${trip.advisor}, Big Little Adventures` +
        ` · Quoted ${longDate(trip.quotedDate)} · An ${trip.supplier} getaway`,
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
    },
    addons: trip.addons || [],
    pricing: {
      totalPrice: pr.totalPrice != null ? money(pr.totalPrice) : null,
      deposit: pr.deposit
        ? { amount: money(pr.deposit.amount), dueDate: `by ${longDate(pr.deposit.dueDate)}` }
        : null,
      fullPayment: pr.fullPaymentDueDate ? { dueDate: `by ${longDate(pr.fullPaymentDueDate)}` } : null,
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
          ? { label: `Promotion (${pr.promotion.code})`, amount: moneySigned(pr.promotion.amount) }
          : null,
        optionsAmount: pr.options != null ? money(pr.options) : null,
        payInDestination: pr.payInDestination != null ? money(pr.payInDestination) : null,
      },
    },
  }
}
