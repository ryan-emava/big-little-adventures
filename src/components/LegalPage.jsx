import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import { usePageTitle } from '../lib/usePageTitle.js'

// Shared layout for privacy / terms pages.
export default function LegalPage({ title, updated, children }) {
  usePageTitle(title)

  return (
    <div style={{ background: 'var(--cream-100)', minHeight: '100vh' }}>
      <SiteHeader />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 22,
            boxShadow: '0 10px 24px -12px rgba(13,71,80,0.18)',
            padding: '44px 40px',
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: 'var(--teal-800)', margin: 0 }}>
            {title}
          </h1>
          {updated && (
            <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--ink-400)' }}>Last updated {updated}</p>
          )}
          <div className="legal-body" style={{ marginTop: 24, fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-600)' }}>
            {children}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

export function LegalSection({ heading, children }) {
  return (
    <>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--teal-800)', margin: '28px 0 8px' }}>
        {heading}
      </h2>
      {children}
    </>
  )
}
