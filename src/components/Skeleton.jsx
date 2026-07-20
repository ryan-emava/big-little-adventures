// Pulsing placeholder block for loading states (animation in global.css).
export default function Skeleton({ width = '100%', height = 16, radius = 8, style }) {
  return (
    <div
      aria-hidden="true"
      className="skeleton"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}

// Card-shaped skeleton matching the trip/quote list cards.
export function SkeletonCard({ height = 150 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        background: 'var(--white)',
        borderRadius: 22,
        boxShadow: '0 4px 24px rgba(15,92,102,0.06)',
        padding: '32px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minHeight: height,
      }}
    >
      <Skeleton width="30%" height={12} />
      <Skeleton width="60%" height={26} />
      <Skeleton width="45%" height={14} />
    </div>
  )
}
