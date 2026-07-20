import { useState } from 'react'
import Button from '../ds/Button.jsx'
import { StampTag } from '../ds/Badge.jsx'
import { contact } from '../lib/contact.js'

// CTA card on the trip detail page: "start booking" / "ask a question".
// POSTs to /api/trip-intent (spec: docs/p0-api-requirements.md). If the CRM
// endpoint isn't live yet (or errors), falls back to direct contact info.
export default function TripCta({ clientId, tripId, headline }) {
  const [note, setNote] = useState('')
  const [state, setState] = useState('idle') // idle | sending | sent | failed
  const [sentKind, setSentKind] = useState(null)

  const send = async (kind) => {
    // "Start booking" must work with zero typing — an empty note gets an
    // auto-generated message so the CRM always receives one.
    const trimmed = note.trim()
    const finalNote =
      trimmed ||
      (kind === 'book'
        ? `I'd like to start booking this trip${headline ? `: ${headline}` : ''}. (auto-generated)`
        : `I have a question about this trip${headline ? `: ${headline}` : ''}. (auto-generated)`)
    setState('sending')
    try {
      const r = await fetch('/api/trip-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, tripId, kind, note: finalNote }),
      })
      if (!r.ok) throw new Error(`intent failed (${r.status})`)
      setSentKind(kind)
      setState('sent')
    } catch {
      setState('failed')
    }
  }

  if (state === 'sent') {
    return (
      <div className="trip-cta" style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '12px 0' }}>
          <StampTag>{sentKind === 'book' ? 'REQUEST RECEIVED' : 'MESSAGE SENT'}</StampTag>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--color-brand)' }}>
            {sentKind === 'book' ? "You're on the manifest!" : 'Got it!'}
          </div>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--color-text-secondary)', maxWidth: 420 }}>
            {contact.advisorName} will get back to you within one business day
            {sentKind === 'book' ? ' to get this trip booked.' : '.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="trip-cta" style={cardStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--color-brand)' }}>
          Ready to make it real?
        </div>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--color-text-secondary)' }}>
          No payment now — booking starts a conversation with {contact.advisorName} to lock everything in.
        </p>
      </div>

      <textarea
        aria-label="Message to your advisor"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Anything to add? Questions, room preferences, date wiggle-room…"
        rows={2}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          padding: '12px 16px',
          border: '2px solid var(--line-200)',
          borderRadius: 14,
          outline: 'none',
          color: 'var(--ink-900)',
          background: 'var(--white)',
          resize: 'vertical',
        }}
      />

      <div className="trip-cta-actions" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Button size="lg" disabled={state === 'sending'} onClick={() => send('book')}>
          {state === 'sending' ? 'Sending…' : `Start booking this trip ✈`}
        </Button>
        <Button size="lg" variant="secondary" disabled={state === 'sending'} onClick={() => send('question')}>
          Ask a question
        </Button>
      </div>

      {state === 'failed' && (
        <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-secondary)' }}>
          Hmm, that didn’t go through.{' '}
          {contact.email && (
            <>
              Email {contact.advisorName} directly at{' '}
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Trip quote: ${headline || tripId}`)}`}>
                {contact.email}
              </a>
              {contact.phone ? ' or ' : '.'}
            </>
          )}
          {contact.phone && <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>}
        </p>
      )}
    </div>
  )
}

const cardStyle = {
  background: 'var(--white)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-card)',
  padding: '32px 36px',
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
}
