import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import { usePageTitle } from '../lib/usePageTitle.js'
import { contact } from '../lib/contact.js'

// Answers are arrays of paragraphs. A paragraph can be a plain string or an
// array of string/link parts, so we can drop an inline <a> where the copy
// points people to an official resource.
const link = (label, href) => ({ label, href })

const FAQS = [
  {
    q: 'Why should we plan our trip with Big Little Adventures?',
    a: [
      'Planning a family trip should feel exciting, not like a second job.',
      'Big Little Adventures helps you sort through the noise and find the vacation that fits your family, your budget, and your travel style. Instead of guessing your way through endless tabs, reviews, room categories, and fine print, you get real guidance from someone who knows what to look for.',
      'We help with the big-picture choices and the tiny details, from choosing the right resort or cruise to thinking through room setup, airport timing, kid-friendly schedules, and what will actually make the trip feel smooth once you are there.',
    ],
  },
  {
    q: 'Does it cost more to book with Big Little Adventures?',
    a: [
      'No. Booking with Big Little Adventures does not add an extra fee to your vacation package.',
      'For the trips we book, our compensation is already built into the supplier’s pricing. Resorts, cruise lines, and travel partners pay us after travel. You are not paying more just because you chose to work with us.',
      'In many cases, the price is the same whether you book with us, directly with the resort, or through a large online booking site. The difference is that you also get personalized help, honest guidance, and support before, during, and after your trip.',
    ],
  },
  {
    q: 'How does Big Little Adventures get paid?',
    a: [
      'Big Little Adventures is paid by our travel partners, not by adding surprise fees to your booking.',
      'When you book eligible resorts, cruises, or vacation packages through us, the supplier pays us a commission after your trip is complete. That commission is already part of the supplier’s pricing structure.',
      'Our job is to help you choose well, avoid common planning mistakes, and feel confident about the trip you are booking.',
    ],
  },
  {
    q: 'Can you help us stay within a budget?',
    a: [
      'Yes. Your budget is part of the plan from the beginning.',
      'A dream trip should not come with panic every time you check your credit card statement. We will talk through your comfort zone early and help you understand what is realistic for your dates, destination, and travel style.',
      'Sometimes that means choosing a different resort. Sometimes it means shifting travel dates. Sometimes it means showing you where it is worth spending a little more and where you can save. No pressure, no guilt, and no pushing you toward a trip that does not feel comfortable.',
    ],
  },
  {
    q: 'What makes booking with Big Little Adventures different from booking online?',
    a: [
      'Online booking sites show you options. Big Little Adventures helps you choose the right one.',
      'A booking site cannot tell you which resort is better for a toddler who still naps, which cruise cabin layout works best for a family of five, or whether that “great deal” comes with trade-offs you will feel later.',
      'We look at the whole picture: who is traveling, what matters most, what you want to avoid, and what will make the trip feel easy once you are actually there.',
      'And when questions come up before, during, or after travel, you are not starting from scratch with a call center. You have Big Little Adventures in your corner.',
    ],
  },
  {
    q: 'What types of trips does Big Little Adventures plan?',
    a: [
      'Big Little Adventures specializes in vacations that bring people together.',
      'We can help with family vacations, multigenerational trips, cruises, all-inclusive resorts, theme park vacations, honeymoons, anniversary trips, destination weddings, and group getaways.',
      'We are especially thoughtful about trips with kids, grandparents, friend groups, and travelers with different needs or travel styles. The best trip is not always the fanciest one. It is the one that fits your people.',
    ],
  },
  {
    q: 'When should we start planning?',
    a: [
      'The earlier you start, the more options you usually have.',
      'Families often need specific room setups, school-break dates, kid-friendly flight times, and resorts or cruises with the right amenities. Those pieces can book up early, especially for holidays, spring break, summer, and popular cruise sailings.',
      'Planning ahead usually gives you better choices, more time to make payments, and less last-minute scrambling. If your trip is coming up soon, reach out anyway. We can still help when availability allows.',
    ],
  },
  {
    q: 'What happens after we reach out?',
    a: [
      'We start with your people, your plans, and what would make the trip feel like a win.',
      'We will ask about who is traveling, where you are hoping to go, your dates, budget, must-haves, and anything you want to avoid. From there, we research options and help you compare the best fits.',
      'Once you are ready to book, we walk you through the deposit, payment schedule, travel documents, and important deadlines. After that, we stay available for questions as your trip gets closer.',
    ],
  },
  {
    q: 'Do I have to pay the whole vacation upfront?',
    a: [
      'Usually, no. Most vacation packages start with a deposit.',
      'Deposit amounts and final payment dates are set by the resort, cruise line, tour operator, or travel supplier. Those amounts can vary based on what you book, when you travel, and how close you are to departure.',
      'Before anything is booked, we will explain the deposit, payment schedule, cancellation rules, and important dates so there are no surprises.',
    ],
  },
  {
    q: 'Should we buy travel protection?',
    a: [
      'Yes, we strongly recommend it.',
      'Travel protection can help with certain covered situations, such as medical issues, trip delays, cancellations, lost luggage, or unexpected problems while traveling.',
      'Every policy is different, so it is important to review the coverage before you purchase. We can help you look at the options, but the insurance provider determines what is covered and how claims are handled.',
    ],
  },
  {
    q: 'What should I do if I need to cancel or change my trip?',
    a: [
      'Contact Big Little Adventures as soon as you know your plans may need to change.',
      'Cancellation and change rules depend on your specific booking, supplier, travel dates, and whether you purchased travel protection. The sooner you reach out, the more options we can help you review.',
      'We will walk you through the next steps, help you understand the supplier’s policy, and point you toward the correct travel protection claim process if that applies to your trip.',
    ],
  },
  {
    q: 'What happens if something goes wrong while we are traveling?',
    a: [
      'Reach out to Big Little Adventures. You do not have to figure it out alone.',
      'Travel can come with surprises: delayed flights, room questions, schedule changes, or a detail that does not match what you expected. When something comes up, we can help guide you on what to do next and who to contact.',
      'We cannot control every travel hiccup, but we can help you navigate the situation with more confidence than going it alone.',
    ],
  },
  {
    q: 'Do we need passports?',
    a: [
      'For international travel, plan on needing valid passports.',
      [
        'Passport rules depend on where you are going, how you are traveling, your citizenship, and your itinerary. Processing times can also change, so we recommend checking the official ',
        link('U.S. Department of State passport website', 'https://travel.state.gov/content/travel/en/passports.html'),
        ' before booking international travel.',
      ],
      'For families, remember that children need their own passports for many international trips. It is also smart to check expiration dates early, because some destinations require your passport to be valid for several months beyond your travel dates.',
    ],
  },
  {
    q: 'Can we cruise without passports?',
    a: [
      'Some cruises may allow U.S. citizens to sail without a passport, but we still recommend having valid passports whenever possible.',
      'Certain closed-loop cruises that begin and end at the same U.S. port may allow U.S. citizens to travel with other approved documents. However, a passport is still the safest option.',
      'If an emergency happens and you need to fly home from another country, having a valid passport can make a stressful situation much easier to handle. We will help you review the document requirements for your exact cruise before you travel.',
    ],
  },
  {
    q: 'Can you help with destination weddings or vow renewals?',
    a: [
      'Yes. Big Little Adventures can help with the travel side and planning pieces.',
      'Destination weddings can be beautiful, but they also come with extra details: guest travel, room blocks, resort rules, ceremony options, deadlines, and local marriage requirements.',
      'We can help coordinate travel plans and guide you through the resort or destination process. Legal marriage requirements vary by country, so those details should always be verified for the exact destination.',
    ],
  },
  {
    q: 'Can our group have rooms close together?',
    a: [
      'Yes, we can request that your rooms be close together.',
      'If you are traveling with friends, grandparents, or another family, let us know who should be near whom. We can request connecting rooms, adjoining rooms, or rooms close together.',
      'Room placement is handled by the hotel or resort and cannot always be guaranteed unless the property specifically confirms it as part of the booking. We will make the request clearly and help set expectations before you arrive.',
    ],
  },
  {
    q: 'Can Big Little Adventures help with special requests?',
    a: [
      'Yes. Tell us what would make the trip easier.',
      'Special requests might include crib requests, mobility needs, dietary concerns, celebration notes, room location preferences, or traveling with little ones who need a slower pace.',
      'Some requests are guaranteed only when booked as a specific room type or service. Others are noted as requests with the hotel, resort, cruise line, or supplier. Either way, we will help you understand what can be confirmed and what is simply requested.',
    ],
  },
  {
    q: 'What do you need from us to get started?',
    a: [
      'We need a few basics and a little honesty about what you want from the trip.',
      'The most helpful details are your travel dates, number of travelers, kids’ ages if children are coming, preferred destination or trip style, budget range, departure city, and anything that matters most to your family.',
      'Not sure where you want to go yet? That is okay too. Tell us what kind of trip you are dreaming about, and we can help narrow it down from there.',
    ],
  },
]

function Paragraph({ parts }) {
  if (typeof parts === 'string') {
    return <p style={{ margin: '0 0 14px' }}>{parts}</p>
  }
  return (
    <p style={{ margin: '0 0 14px' }}>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <a
            key={i}
            href={part.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--coral-500)', fontWeight: 600 }}
          >
            {part.label}
          </a>
        )
      )}
    </p>
  )
}

function FaqItem({ q, a, defaultOpen }) {
  return (
    <details
      className="faq-item"
      open={defaultOpen}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card-soft)',
        padding: '4px 28px',
      }}
    >
      <summary
        className="faq-summary"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '22px 0',
          cursor: 'pointer',
          listStyle: 'none',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 18,
          color: 'var(--teal-800)',
        }}
      >
        <span>{q}</span>
        <span className="faq-chevron" aria-hidden="true" style={{ color: 'var(--coral-500)', flexShrink: 0, display: 'inline-flex' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div style={{ padding: '0 0 22px', fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-600)' }}>
        {a.map((p, i) => (
          <Paragraph key={i} parts={p} />
        ))}
      </div>
    </details>
  )
}

export default function FaqPage() {
  usePageTitle('FAQ')

  return (
    <div style={{ background: 'var(--cream-100)', minHeight: '100vh' }}>
      <SiteHeader />

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.18em', color: 'var(--ink-400)' }}>
            GOOD TO KNOW
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 46, lineHeight: 1.05, color: 'var(--teal-800)', margin: '10px 0 0' }}>
            Frequently asked <span style={{ fontFamily: 'var(--font-script)', fontWeight: 700, color: 'var(--coral-500)' }}>questions</span>
          </h1>
          <p style={{ margin: '14px auto 0', maxWidth: 520, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-600)' }}>
            The stuff worth knowing before you go — how we work, what it costs, and the travel details that trip people up.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
          ))}
        </div>

        {/* Closing CTA */}
        <div
          style={{
            marginTop: 40,
            background: 'var(--peach-100)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px 36px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--teal-800)' }}>
            Still have a question?
          </div>
          <p style={{ margin: '8px auto 20px', maxWidth: 440, fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-600)' }}>
            No question is too small. Send it our way and a real person will get back to you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/#request" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'var(--coral-500)',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '13px 26px',
                  borderRadius: 'var(--radius-pill)',
                }}
              >
                Plan my trip
              </span>
            </Link>
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 15,
                  padding: '13px 26px',
                  borderRadius: 'var(--radius-pill)',
                  border: '2px solid var(--teal-800)',
                  color: 'var(--teal-800)',
                  textDecoration: 'none',
                }}
              >
                Email us
              </a>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
