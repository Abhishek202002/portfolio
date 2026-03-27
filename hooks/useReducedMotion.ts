'use client'

import { useMediaQuery } from './useMediaQuery'

/**
 * Returns true when the user has requested reduced motion
 * via their OS accessibility settings.
 *
 * All animation-heavy components should respect this preference
 * by skipping or simplifying their animations.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
