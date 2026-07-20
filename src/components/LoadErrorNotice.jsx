import { useEffect } from 'react'
import { StampTag } from '../ds/Badge.jsx'
import Button from '../ds/Button.jsx'

// Friendly error card for data-loading failures. Distinguishes "you're
// offline" (airplane-mode joke, auto-reload when the connection returns)
// from "the server hiccuped" (softer retry message).
export default function LoadErrorNotice({ error, what = 'your trips' }) {
  const offline =
    (typeof navigator !== 'undefined' && navigator.onLine === false) ||
    /failed to fetch|load failed|networkerror/i.test(String(error?.message || ''))

  // The moment the connection comes back, pick up where they left off.
  useEffect(() => {
    if (!offline) return
    const onOnline = () => window.location.reload()
    window.addEventListener('online', onOnline)
    return () => window.removeEventListener('online', onOnline)
  }, [offline])

  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: 22,
        boxShadow: '0 10px 24px -12px rgba(13,71,80,0.18)',
        padding: '44px 36px',
        maxWidth: 520,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 14,
      }}
    >
      <StampTag>{offline ? 'AIRPLANE MODE' : 'SLIGHT DELAY'}</StampTag>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--teal-800)', margin: 0 }}>
        {offline ? 'Already in vacation mode?' : 'The runway’s a little busy'}
      </h2>
      {offline ? (
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-600)', maxWidth: 400 }}>
          Love the commitment — but we need a signal to load {what}.{' '}
          <span style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: 'var(--coral-500)' }}>
            reconnect &amp; we’ll take it from here
          </span>{' '}
          — this page reloads automatically when you’re back online.
        </p>
      ) : (
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-600)', maxWidth: 400 }}>
          We couldn’t load {what} just now. Give it a moment and try again — it usually clears right up.
        </p>
      )}
      <Button size="md" onClick={() => window.location.reload()}>
        Try again
      </Button>
    </div>
  )
}
