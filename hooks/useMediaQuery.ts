'use client'

import { useSyncExternalStore } from 'react'

/**
 * Subscribes to a CSS media query using useSyncExternalStore —
 * avoids the lint-flagged pattern of calling setState inside useEffect.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    () => window.matchMedia(query).matches,
    () => false // SSR snapshot — conservative default
  )
}
