import { useEffect, useState, useCallback } from 'react'

// Hotel photo strip + explore links for the trip detail page.
//
// The strip renders "vacation snapshots" — white polaroid frames with
// alternating tilts. Clicking one opens an on-brand lightbox: the photo large
// in a polaroid frame, a ticket-style counter, arrow + keyboard navigation,
// and a clickable thumbnail rail below.
const TILTS = [-1.5, 1.2, -1, 1.6, -0.8]

export default function HotelGallery({ photos = [], links = [], hotelName = '' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const [loadedFull, setLoadedFull] = useState({}) // url -> true once full-res is cached
  const [touchX, setTouchX] = useState(null)
  const open = openIndex != null

  // Preload the current photo and its neighbors so the thumb-first display
  // upgrades quickly and the carousel arrows feel instant.
  useEffect(() => {
    if (openIndex == null || !photos.length) return
    ;[0, 1, -1].forEach((delta) => {
      const p = photos[(openIndex + delta + photos.length) % photos.length]
      if (!p || loadedFull[p.url]) return
      const img = new Image()
      img.onload = () => setLoadedFull((m) => (m[p.url] ? m : { ...m, [p.url]: true }))
      img.src = p.url
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, photos])

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta) =>
      setOpenIndex((i) => (i == null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  )

  // Keyboard: Escape closes, arrows navigate. Lock page scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, step])

  if (!photos.length && !links.length) return null
  const current = open ? photos[openIndex] : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {photos.length > 0 && (
        <div className="photo-strip" aria-label={`Photos of ${hotelName}`}>
          {photos.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="photo-frame"
              aria-label={`View ${hotelName} photo ${i + 1} larger`}
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)`, border: 'none', cursor: 'pointer' }}
            >
              <img
                src={p.thumb}
                alt={`${hotelName} photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                // Reserve the frame's width before the image loads (no layout
                // shift); min/max clamps in CSS crop extreme aspect ratios.
                style={p.width && p.height ? { aspectRatio: `${p.width} / ${p.height}` } : undefined}
              />
            </button>
          ))}
        </div>
      )}

      {links.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: 'var(--tracking-wide)',
              color: 'var(--color-text-muted)',
            }}
          >
            EXPLORE
          </span>
          {links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 13.5,
                padding: '8px 16px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--color-brand)',
                color: 'var(--color-brand)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {/* ===== Lightbox ===== */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${hotelName} photo gallery`}
          onClick={close}
          className="lightbox"
        >
          {/* Top bar: counter + close */}
          <div onClick={(e) => e.stopPropagation()} className="lightbox-top">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 'var(--tracking-widest)', color: 'var(--teal-100)' }}>
              PHOTO {String(openIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 15,
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: 'none',
                background: 'var(--coral-500)',
                color: '#fff',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Stage: polaroid frame with arrows overlaid on the photo edges;
              swipe left/right to navigate on touch screens. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-stage"
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX == null) return
              const dx = e.changedTouches[0].clientX - touchX
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
              setTouchX(null)
            }}
          >
            <div className="lightbox-frame">
              {/* Thumb shows instantly (already cached from the strip); swaps
                  to full-res once the preloader has it. */}
              <img
                key={current.url}
                src={loadedFull[current.url] ? current.url : current.thumb}
                alt={`${hotelName} photo ${openIndex + 1}`}
                className="lightbox-img"
                style={{
                  filter: loadedFull[current.url] ? 'none' : 'blur(0.5px)',
                  transition: 'filter 200ms ease',
                }}
              />
              <div className="lightbox-caption">{hotelName}</div>
            </div>
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="lightbox-arrow lightbox-arrow-prev">
                  ‹
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="lightbox-arrow lightbox-arrow-next">
                  ›
                </button>
              </>
            )}
          </div>

      {/* Thumbnail rail */}
          {photos.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="lightbox-thumbs"
            >
              {photos.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Photo ${i + 1}`}
                  aria-current={i === openIndex}
                  style={{
                    padding: 3,
                    borderRadius: 8,
                    border: i === openIndex ? '3px solid var(--coral-500)' : '3px solid transparent',
                    background: 'var(--white)',
                    cursor: 'pointer',
                    opacity: i === openIndex ? 1 : 0.7,
                    flex: '0 0 auto',
                  }}
                >
                  <img
                    src={p.thumb}
                    alt=""
                    style={{ display: 'block', height: 52, width: 72, objectFit: 'cover', borderRadius: 5 }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
