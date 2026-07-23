import { Link } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import { StampTag } from '../ds/Badge.jsx'
import Button from '../ds/Button.jsx'
import { usePageTitle } from '../lib/usePageTitle.js'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <div style={{ background: 'var(--cream-100)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 18,
          padding: '64px 24px',
        }}
      >
        <StampTag>GATE NOT FOUND</StampTag>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 44, color: 'var(--teal-800)', margin: 0 }}>
          Looks like a missed connection
        </h1>
        <p style={{ fontSize: 17, color: 'var(--ink-600)', margin: 0, maxWidth: 440 }}>
          This page doesn't exist — or its boarding pass expired. Let's get you back to the good part.
        </p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button size="lg">Back to the homepage</Button>
        </Link>
      </div>
      <SiteFooter />
    </div>
  )
}
