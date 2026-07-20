import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Resets scroll to the top whenever the route changes — otherwise SPA
// navigation (e.g. clicking a trip) keeps the previous page's scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
