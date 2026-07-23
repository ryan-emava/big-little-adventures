import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Controls scroll position on navigation:
//  - With a hash (e.g. /#request), scroll that section into view. On a fresh
//    SPA load or a cross-page jump the target isn't in the DOM yet, so retry
//    across a few frames before giving up.
//  - Without a hash, reset to the top so SPA navigation (e.g. clicking a trip)
//    doesn't inherit the previous page's scroll position.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let raf
      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          return
        }
        // ~20 frames (~330ms) covers the initial render/layout settle.
        if (attempts++ < 20) raf = requestAnimationFrame(tryScroll)
      }
      tryScroll()
      return () => raf && cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
