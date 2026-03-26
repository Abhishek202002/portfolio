'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis, destroyLenis } from '@/lib/lenis'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * SmoothScroll — Lenis smooth-scroll provider.
 *
 * Critical integration notes:
 * - `autoRaf: false` disables Lenis's own requestAnimationFrame loop.
 *   We drive Lenis from GSAP's ticker instead, ensuring both libraries
 *   share a single RAF loop and preventing scroll jank on animations.
 * - `ScrollTrigger.update()` is called on each Lenis scroll event so
 *   GSAP scroll-driven animations stay in sync with the smoothed position.
 * - `gsap.ticker.lagSmoothing(0)` prevents GSAP from dropping frames when
 *   the tab loses focus and then regains it.
 */
export default function SmoothScroll({ children }: SmoothScrollProps): React.JSX.Element {
  useEffect(() => {
    const lenis = new Lenis({
      // Disabled so GSAP's ticker drives the RAF — prevents double-loop jank
      autoRaf: false,
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    })

    // Expose instance globally via module singleton
    setLenis(lenis)

    // Keep ScrollTrigger positions in sync with smoothed scroll
    lenis.on('scroll', () => ScrollTrigger.update())

    // Use GSAP's ticker as the single RAF driver for both Lenis and GSAP
    const tickerCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      destroyLenis()
    }
  }, [])

  return <>{children}</>
}
