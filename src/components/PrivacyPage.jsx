import LegalPage, { LegalSection } from './LegalPage.jsx'
import { contact, business } from '../lib/contact.js'

// NOTE: draft policy for a small travel agency — have a professional review
// before relying on it.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 17, 2026">
      <p>
        {business.legalName} ("we," "us") plans family trips. This policy describes what
        information we collect through this website and how we use it.
      </p>

      <LegalSection heading="What we collect">
        <p>
          <strong>Trip request form:</strong> your name, email address, and whatever you tell us
          about your travel plans (party size, dates, preferences). We collect this only when you
          submit the form.
        </p>
        <p>
          <strong>Trip quote pages:</strong> if we've prepared quotes for you, those pages display
          the trip details we prepared together. We record when quote pages are viewed so your
          advisor knows you've seen them.
        </p>
        <p>
          <strong>Site analytics:</strong> we use privacy-respecting, aggregate analytics to
          understand how the site is used. We do not run advertising trackers.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it">
        <p>
          To respond to your trip request, prepare and discuss quotes, book travel you approve, and
          keep in touch about your trip. We do not sell your information. We share it only with
          travel suppliers (airlines, hotels, tour operators) as needed to book the travel you
          request.
        </p>
      </LegalSection>

      <LegalSection heading="Retention & your choices">
        <p>
          We keep trip records for as long as needed to serve you and meet legal obligations. You
          can ask us to correct or delete your information, or to stop contacting you, at any time
          {contact.email ? (
            <>
              {' '}by emailing <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          ) : null}
          .
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          We collect traveler details for children only as provided by a parent or guardian for the
          purpose of booking family travel.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If this policy changes, we'll update this page and the date above.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
