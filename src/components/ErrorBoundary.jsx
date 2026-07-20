import { Component } from 'react'
import { contact } from '../lib/contact.js'

// Route-level error boundary: one bad record or render bug shows a friendly
// card instead of a white screen. Errors are logged to the console (and to
// error monitoring, once a service is wired up).
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Render error:', error, info?.componentStack)
    // TODO: forward to error monitoring (e.g. Sentry) when a DSN is configured.
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ background: 'var(--cream-100)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 22,
            boxShadow: '0 18px 44px rgba(15,92,102,0.14)',
            padding: '40px 36px',
            maxWidth: 480,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            fontFamily: 'var(--font-body)',
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--teal-800)', margin: 0 }}>
            Slight turbulence
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-600)' }}>
            Something went wrong loading this page. Try refreshing —{' '}
            {contact.email ? (
              <>
                and if it keeps happening, email us at <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </>
            ) : (
              'and if it keeps happening, let us know.'
            )}
          </p>
          <div>
            <button
              onClick={() => window.location.reload()}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 16,
                padding: '12px 24px',
                borderRadius: 999,
                border: 'none',
                background: 'var(--coral-500)',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Refresh the page
            </button>
          </div>
        </div>
      </div>
    )
  }
}
