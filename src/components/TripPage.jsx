import { useParams, useSearchParams } from "react-router-dom"
import { useClientTrips } from "../lib/useClientTrips.js"
import { usePageTitle } from "../lib/usePageTitle.js"
import QuoteDetail from "./QuoteDetail.jsx"
import { SkeletonCard } from "./Skeleton.jsx"
import LoadErrorNotice from "./LoadErrorNotice.jsx"

export default function TripPage() {
  const { clientId, guid } = useParams()
  const [searchParams] = useSearchParams()
  const status = searchParams.get("status")
  const { trips, loading, error } = useClientTrips(clientId, status)
  const found = trips && (trips[guid] || trips[guid?.toLowerCase()])
  usePageTitle(loading ? null : found?.overview?.headline || "Trip not found")

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream-100)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <SkeletonCard height={220} />
          <SkeletonCard height={160} />
          <SkeletonCard height={160} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream-100)", padding: "64px 24px" }}>
        <LoadErrorNotice error={error} what="this quote" />
      </div>
    )
  }

  // Case-insensitive lookup (trkit ids are lowercase; older links may be upper).
  return <QuoteDetail trip={found || null} clientId={clientId} tripGuid={guid} />
}
