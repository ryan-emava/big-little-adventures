import ImageSlot from './ImageSlot.jsx'
import { contact } from '../lib/contact.js'
import katieJpg from '../assets/katie.jpg'
import katieWebp from '../assets/katie.webp'

// "Real human" block on the quote page — people book with a person they trust.
export default function AdvisorCard({ advisorName }) {
  const digits = (contact.phone || '').replace(/[^\d]/g, '')
  const telHref = digits ? `tel:+1${digits}` : null
  const smsHref = digits ? `sms:+1${digits}` : null
  const fullName = advisorName || `${contact.advisorName} Truran`

  return (
    <div
      className="advisor-card"
      style={{
        background: 'var(--peach-100)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ width: 72, height: 72, flexShrink: 0 }}>
        <ImageSlot src={katieJpg} webp={katieWebp} alt={fullName} shape="circle" />
      </div>
      <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: 'var(--color-accent)', lineHeight: 1.1 }}>
          questions? Please reach out!
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--color-brand)' }}>
          {fullName}
        </span>
        <span style={{ fontSize: 13.5, color: 'var(--color-text-secondary)' }}>
          Your travel agent! No call centers, no hold music.
        </span>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {smsHref && (
          <a href={smsHref} style={pillStyle}>
            Text {contact.phone}
          </a>
        )}
        {telHref && (
          <a href={telHref} style={{ ...pillStyle, background: 'transparent', color: 'var(--color-brand)', border: '2px solid var(--color-brand)' }}>
            Call
          </a>
        )}
        {contact.email && (
          <a href={`mailto:${contact.email}`} style={{ ...pillStyle, background: 'transparent', color: 'var(--color-brand)', border: '2px solid var(--color-brand)' }}>
            Email
          </a>
        )}
      </div>
    </div>
  )
}

const pillStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
  fontSize: 14,
  padding: '10px 18px',
  borderRadius: 'var(--radius-pill)',
  background: 'var(--color-brand)',
  color: '#fff',
  textDecoration: 'none',
  border: '2px solid var(--color-brand)',
  whiteSpace: 'nowrap',
}
