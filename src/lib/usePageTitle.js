import { useEffect } from 'react'

const SITE = 'Big Little Adventures'

// Sets document.title for the current page. Pass null/undefined while data is
// loading to leave the previous title alone; the site name is appended.
export function usePageTitle(title) {
  useEffect(() => {
    if (title === undefined || title === null) return
    document.title = title ? `${title} · ${SITE}` : SITE
  }, [title])
}
