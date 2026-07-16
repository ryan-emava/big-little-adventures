import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'

export default function QuoteDetail({ trip }) {
  if (!trip) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream-100)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: 'var(--white)', borderRadius: 18, padding: '28px 24px' }}>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', color: 'var(--teal-800)' }}>Trip not found</h1>
        </div>
      </div>
    )
  }

  const d = trip
  const overview = d.overview || {}
  const flights = d.flights || {}
  const hotel = d.hotel || {}
  const pricing = d.pricing || {}
  const travelers = d.travelers || {}
  const contact = d.contact || {}
  const addons = d.addons || []

  const amenities = hotel.amenities || []
  const parseMoney = (v) => parseFloat(String(v || '').replace(/[^0-9.-]/g, '')) || 0
  const formatMoney = (n) =>
    `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const totalPriceValue = parseMoney(pricing.totalPrice)
  const payInDestinationValue = parseMoney(pricing?.breakdown?.payInDestination)
  const computedBalanceDue =
    totalPriceValue > 0
      ? formatMoney(Math.max(0, totalPriceValue - payInDestinationValue))
      : pricing?.payments?.balanceDue || pricing.totalPrice
  const addonList = addons.map(a => `${a.title} | ${a.description}`).join('\n').split('\n').map(line => {
    const [title, ...rest] = line.split('|')
    return { title: (title || '').trim(), desc: rest.join('|').trim() }
  })

  return (
    <div style={{ background: 'var(--cream-100)', minHeight: '100vh', overflowX: 'clip' }}>
      <SiteHeader homeHref="/" ctaHref="/#request" links={[]} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 72px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ===== HEADER ===== */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-card)',
          padding: '40px 40px 32px',
        }}>
          <img
            src="/sun.png"
            alt=""
            style={{
              position: 'absolute',
              top: -34,
              right: -30,
              width: 104,
              height: 104,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
            {/* Left: logo + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--color-brand)' }}>
                  big <span style={{ fontFamily: 'var(--font-script)', fontWeight: 700, color: 'var(--color-accent)' }}>little</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.22em', color: 'var(--color-brand)', fontSize: 8, marginTop: 2 }}>
                  ADVENTURES
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.16em', color: 'var(--color-text-muted)' }}>
                TRIP QUOTE · PREPARED JUST FOR YOU
              </div>
            </div>

            {/* Right: price */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, zIndex: 1 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)' }}>TOTAL PRICE</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 34, color: 'var(--color-accent)', lineHeight: 1.05 }}>
                  {pricing.totalPrice || '$0.00'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>incl. taxes &amp; fees</div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 46, lineHeight: 1.05, color: 'var(--color-brand)' }}>
              {overview.headline}
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 28, color: 'var(--color-accent)', marginTop: 2 }}>
              {overview.subhead}
            </div>
            <div style={{ marginTop: 12, fontSize: 15, color: 'var(--color-text-secondary)' }}>
              {overview.preparedByLine}
            </div>
          </div>

          {/* Info boxes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
            {overview.destination && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--peach-100)', borderRadius: 'var(--radius-md)', padding: '12px 18px' }}>
                <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)' }}>DESTINATION</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                  {overview.destination}
                </div>
              </div>
            )}
            {travelers.dateRange && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--peach-100)', borderRadius: 'var(--radius-md)', padding: '12px 18px' }}>
                <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)' }}>TRAVEL DATES</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                  {travelers.dateRange}
                </div>
              </div>
            )}
            {travelers.count && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--peach-100)', borderRadius: 'var(--radius-md)', padding: '12px 18px' }}>
                <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)' }}>WHO'S GOING</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                  {travelers.count}
                </div>
              </div>
            )}
            {travelers.sleeps && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--peach-100)', borderRadius: 'var(--radius-md)', padding: '12px 18px' }}>
                <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)' }}>DURATION</div>
                <div style={{ fontFamily: 'var(--font-script)', fontWeight: 700, fontSize: 22, color: 'var(--color-accent)', lineHeight: 1 }}>
                  {travelers.sleeps}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== FLIGHTS ===== */}
        {flights.departure && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8, padding: '0 4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--color-brand)' }}>
                Your flights
              </div>
              {flights.airline && (
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: 'var(--tracking-wide)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '2px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                }}>
                  {flights.airline}
                </div>
              )}
            </div>

            {/* Departure ticket */}
            <FlightTicket flight={flights.departure} label="DEPARTURE" />

            {/* Return ticket */}
            {flights.return && <FlightTicket flight={flights.return} label="RETURN" />}
          </>
        )}

        {/* ===== HOTEL ===== */}
        {hotel.name && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8, padding: '0 4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--color-brand)' }}>
                Where you'll stay
              </div>
              {hotel.rating && (
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: 'var(--tracking-wide)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '2px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                }}>
                  {hotel.rating}
                </div>
              )}
            </div>

            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 320px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, color: 'var(--color-brand)', lineHeight: 1.1 }}>
                    {hotel.name}
                  </div>
                  {hotel.tagline && (
                    <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: 'var(--color-accent)', marginTop: 2 }}>
                      {hotel.tagline}
                    </div>
                  )}
                  {(hotel.checkin || hotel.checkout || hotel.nights) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: 16 }}>
                      {hotel.checkin && (
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>CHECK-IN</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                            {hotel.checkin}
                          </div>
                        </div>
                      )}
                      {hotel.checkout && (
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>CHECK-OUT</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                            {hotel.checkout}
                          </div>
                        </div>
                      )}
                      {hotel.nights && (
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>NIGHTS</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                            {hotel.nights}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {hotel.room && (
                  <div style={{ flex: '0 1 280px', background: 'var(--peach-100)', borderRadius: 'var(--radius-md)', padding: '18px 22px' }}>
                    {hotel.room.occupancy && (
                      <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 4 }}>
                        {hotel.room.occupancy}
                      </div>
                    )}
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, color: 'var(--color-brand)' }}>
                      {hotel.room.type}
                    </div>
                    {hotel.room.note && (
                      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 6 }}>
                        {hotel.room.note}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 22 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-brand)', marginBottom: 14 }}>
                    ALL-INCLUSIVE AMENITIES
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 28px' }}>
                    {amenities.map((a, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>›</span>
                        <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hotel.note && (
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-text-secondary)' }}>Hotel advisory:</strong> {hotel.note}
                </div>
              )}
            </div>
          </>
        )}

        {/* ===== ADD-ONS ===== */}
        {addonList.length > 0 && (
          <>
            <div style={{ padding: '0 4px', marginTop: 8 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--color-brand)' }}>
                Included add-ons
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {addonList.map((addon, i) => (
                addon.title && (
                  <div key={i} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card-soft)', padding: 24 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 12,
                      letterSpacing: 'var(--tracking-wide)',
                      color: 'var(--color-accent)',
                    }}>
                      INCLUDED
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--color-brand)', marginTop: 12 }}>
                      {addon.title}
                    </div>
                    {addon.desc && (
                      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                        {addon.desc}
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </>
        )}

        {/* ===== PRICE SUMMARY ===== */}
        <div style={{ padding: '0 4px', marginTop: 8 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--color-brand)' }}>
            The numbers
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {/* Payment schedule */}
          {pricing.deposit && (
            <div style={{ flex: '1 1 300px', background: 'var(--peach-100)', borderRadius: 'var(--radius-lg)', padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-brand)' }}>
                PAYMENT SCHEDULE
              </div>
              {pricing.deposit && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                      Deposit due
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      {pricing.deposit.dueDate}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--color-brand)' }}>
                    {pricing.deposit.amount}
                  </div>
                </div>
              )}
              {pricing.fullPayment && (
                <div style={{ borderTop: '1px solid var(--line-300)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                      Full payment due
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                      {pricing.fullPayment.dueDate}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--color-accent)' }}>
                    {computedBalanceDue}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price breakdown */}
          {pricing.breakdown && (
            <div style={{ flex: '1 1 300px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-brand)' }}>
                PRICE BREAKDOWN
              </div>
              {pricing.payments?.packagePrice && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'var(--color-text-secondary)' }}>
                  <span>Flights, hotel &amp; add-ons package</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-brand)' }}>
                    {pricing.payments.packagePrice}
                  </span>
                </div>
              )}
              {pricing.breakdown.adults && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-muted)', paddingLeft: 14 }}>
                  <span>{pricing.breakdown.adults.label}</span>
                  <span>{pricing.breakdown.adults.price}</span>
                </div>
              )}
              {pricing.breakdown.child && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--color-text-muted)', paddingLeft: 14 }}>
                  <span>{pricing.breakdown.child.label}</span>
                  <span>{pricing.breakdown.child.price}</span>
                </div>
              )}
              {pricing.breakdown.promotion && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'var(--color-text-secondary)' }}>
                  <span>{pricing.breakdown.promotion.label}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-accent)' }}>
                    {pricing.breakdown.promotion.amount}
                  </span>
                </div>
              )}
              {pricing.breakdown.optionsAmount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'var(--color-text-secondary)' }}>
                  <span>Options</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-brand)' }}>
                    {pricing.breakdown.optionsAmount}
                  </span>
                </div>
              )}
              {pricing.breakdown.payInDestination && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: 'var(--color-text-secondary)' }}>
                  <span>Pay in destination</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-brand)' }}>
                    {pricing.breakdown.payInDestination}
                  </span>
                </div>
              )}
              <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: 16, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--color-brand)' }}>
                  Total price
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, color: 'var(--color-accent)' }}>
                  {pricing.totalPrice}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                Includes all taxes &amp; fees. While we have included Pay in Destination charges provided to us by third parties at the time of booking, charges may fluctuate based on exchange rates at time of travel.
              </div>
            </div>
          )}
        </div>

        {/* ===== CTA ===== */}
        <div style={{ background: 'var(--color-brand)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: '#fff', lineHeight: 1.1 }}>
              Ready to make it real?
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 24, color: 'var(--coral-400)', marginTop: 2 }}>
              reserve your seats before they fly away
            </div>
            {pricing.deposit?.dueDate && (
              <div style={{ fontSize: 14, color: 'var(--teal-100)', marginTop: 8 }}>
                Prices may change until payment is received. Lock in the deposit {pricing.deposit.dueDate}.
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 16,
              padding: '16px 32px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: 'var(--color-accent)',
              color: '#fff',
              cursor: 'pointer',
            }}>
              Reserve your seats
            </button>
            <button style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 16,
              padding: '16px 32px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid rgba(255,255,255,0.5)',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
            }}>
              Ask {contact.advisor} a question
            </button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

// Flight ticket sub-component
function FlightTicket({ flight, label }) {
  return (
    <div style={{ display: 'flex', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
      {/* Left: flight info */}
      <div style={{ flex: '1 1 58%', padding: '28px 36px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: 'var(--tracking-widest)', color: 'var(--color-brand)' }}>
            {label}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 'var(--tracking-wide)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            border: '2px solid var(--color-accent)',
            color: 'var(--color-accent)',
          }}>
            {flight.date}
          </div>
        </div>

        {/* Route */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, color: 'var(--color-brand)', lineHeight: 1 }}>
              {flight.from?.code}
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: 'var(--color-accent)' }}>
              {flight.from?.city}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 60 }}>
            <div style={{ flex: 1, height: 0, borderTop: '2px dashed var(--line-300)' }}></div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9z"/></svg>
            <div style={{ flex: 1, height: 0, borderTop: '2px dashed var(--line-300)' }}></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 38, color: 'var(--color-brand)', lineHeight: 1 }}>
              {flight.to?.code}
            </div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: 'var(--color-accent)' }}>
              {flight.to?.city}
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 18, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {flight.departTime && (
            <div>
              <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>DEPART</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                {flight.departTime}
              </div>
            </div>
          )}
          {flight.arriveTime && (
            <div>
              <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>ARRIVE</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                {flight.arriveTime}
              </div>
            </div>
          )}
          {flight.stops && (
            <div>
              <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>STOPS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                {flight.stops}
              </div>
            </div>
          )}
          {flight.duration && (
            <div>
              <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)', marginBottom: 2 }}>TRAVEL TIME</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--color-brand)' }}>
                {flight.duration}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: segments + barcode */}
      <div style={{ borderLeft: '2px dashed var(--line-300)', flex: '1 1 42%', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 11, letterSpacing: 'var(--tracking-wide)', color: 'var(--color-text-muted)' }}>
          SEGMENTS · MAIN CABIN COACH (Q)
        </div>
        {flight.segment1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--color-brand)' }}>
              {flight.segment1.flight}
            </div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              {flight.segment1.detail}
            </div>
          </div>
        )}
        {flight.segment2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--color-brand)' }}>
              {flight.segment2.flight}
            </div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
              {flight.segment2.detail}
            </div>
          </div>
        )}
        {flight.barcode && (
          <div style={{ marginTop: 'auto', paddingTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--color-brand)', textAlign: 'center' }}>
            {flight.barcode}
          </div>
        )}
      </div>
    </div>
  )
}







