/**
 * Module-level Lenis singleton.
 * Allows any client component to access the Lenis instance
 * without prop-drilling or React Context overhead.
 */
import type Lenis from 'lenis'

let instance: Lenis | null = null

export function getLenis(): Lenis | null {
  return instance
}

export function setLenis(lenis: Lenis): void {
  instance = lenis
}

export function destroyLenis(): void {
  instance?.destroy()
  instance = null
}
