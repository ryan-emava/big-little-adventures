import { useParams } from "react-router-dom"
import tripsData from "../data/trips.json"
import QuoteDetail from "./QuoteDetail.jsx"

export default function TripPage() {
  const { clientId, guid } = useParams()
  const trip = tripsData[clientId]?.[guid] || null

  return <QuoteDetail trip={trip} clientId={clientId} tripGuid={guid} />
}
