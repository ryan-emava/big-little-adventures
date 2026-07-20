import { useEffect, useState } from 'react'

// Fetches a client's trips from the serverless proxy (/api/clients/:clientId/trips,
// which forwards to trkit). The endpoint returns { [clientId]: { [tripId]: trip } };
// this hook unwraps it to the { [tripId]: trip } map the pages work with.
// Pass `status` (e.g. "drafts") to forward the CRM's status filter — used to
// preview trips that aren't live yet.
export function useClientTrips(clientId, status = null) {
  const [trips, setTrips] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setTrips(null)
    setError(null)
    const qs = status ? `?status=${encodeURIComponent(status)}` : ''
    fetch(`/api/clients/${encodeURIComponent(clientId)}/trips${qs}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load trips (${r.status})`)
        return r.json()
      })
      .then((data) => {
        if (alive) setTrips(data?.[clientId] || {})
      })
      .catch((e) => {
        if (alive) setError(e)
      })
    return () => {
      alive = false
    }
  }, [clientId, status])

  return { trips, loading: trips === null && !error, error }
}
