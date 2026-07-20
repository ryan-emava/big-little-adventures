import LegalPage, { LegalSection } from './LegalPage.jsx'
import { contact, business } from '../lib/contact.js'

// NOTE: draft terms for a small travel agency — have a professional review
// before relying on them. Check seller-of-travel registration requirements for
// your state (FL, CA, WA, HI require displayed registration numbers).
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 17, 2026">
      <p>
        These terms cover your use of this website and the travel-planning services provided by{' '}
        {business.legalName}.
      </p>

      <LegalSection heading="Quotes are not guarantees">
        <p>
          Trip quotes reflect prices and availability at the time they were prepared. Airfare,
          hotel rates, promotions, and availability change until a booking is confirmed and, where
          applicable, paid. The final price is the one confirmed at booking.
        </p>
      </LegalSection>

      <LegalSection heading="Our role">
        <p>
          We act as an agent arranging travel with third-party suppliers (airlines, hotels, cruise
          lines, tour operators). Those suppliers' own terms, fees, and cancellation policies apply
          to your booking, and we are not responsible for their acts, omissions, schedule changes,
          or failures. We'll always advocate for you when things go sideways.
        </p>
      </LegalSection>

      <LegalSection heading="Payments, changes & cancellations">
        <p>
          Deposits, payment schedules, and change/cancellation fees are stated on each quote or at
          booking and are largely set by suppliers. Travel insurance is strongly recommended and
          available on request.
        </p>
      </LegalSection>

      <LegalSection heading="Travel documents">
        <p>
          You are responsible for ensuring every traveler has valid identification, passports,
          visas, and any required health documentation for the destination. We'll flag requirements
          we're aware of, but final responsibility rests with the traveler.
        </p>
      </LegalSection>

      <LegalSection heading="Website">
        <p>
          Site content is provided as-is. Quote pages prepared for you are personal — please don't
          share your quote link beyond the people traveling with you.
        </p>
      </LegalSection>

      {business.sellerOfTravel && (
        <LegalSection heading="Registration">
          <p>{business.sellerOfTravel}</p>
        </LegalSection>
      )}

      <LegalSection heading="Contact">
        <p>
          Questions about these terms
          {contact.email ? (
            <>
              {' '}— email <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          ) : null}
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
