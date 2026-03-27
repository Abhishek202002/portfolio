'use client'

import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** CSS selector for elements that trigger the cursor ring expansion */
const INTERACTIVE_SELECTOR = 'a, button, label, input, textarea, [data-cursor-expand]'

/**
 * Lerp coefficients — higher = faster tracking.
 * Dot is fast (near-instant), ring trails with a noticeable lag
 * creating the "elastic" feel common in award-winning portfolios.
 */
const DOT_LERP = 0.8
const RING_LERP = 0.1

/**
 * CustomCursor — replaces the native cursor with a dot + ring combo.
 *
 * Behaviour:
 * - Dot: tiny gold circle, tracks mouse almost instantly
 * - Ring: larger hollow circle, trails behind the dot (lerp lag)
 * - On interactive elements: ring expands via `.is-expanded` class
 * - On touch devices (pointer: coarse): returns null, preserving native touch UX
 * - SSR-safe: nothing renders until after mount
 */
export default function CustomCursor(): React.JSX.Element | null {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isPointerFine = useMediaQuery('(pointer: fine)')

  useEffect(() => {
    if (!isPointerFine) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0
    let rafId = 0
    let isIdle = false
    let idleTimer: ReturnType<typeof setTimeout>

    const startLoop = () => {
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    // Track raw mouse position — restart loop if idle
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (isIdle) {
        isIdle = false
        startLoop()
      }

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        isIdle = true
      }, 150)
    }

    // Expand ring when hovering interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(INTERACTIVE_SELECTOR)) {
        ringRef.current?.classList.add('is-expanded')
        dotRef.current?.classList.add('is-hidden')
      }
    }

    // Reset ring when leaving interactive elements
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(INTERACTIVE_SELECTOR)) {
        ringRef.current?.classList.remove('is-expanded')
        dotRef.current?.classList.remove('is-hidden')
      }
    }

    // Hide cursors when mouse leaves the viewport
    const onMouseLeave = () => {
      dotRef.current?.classList.add('is-hidden')
      ringRef.current?.classList.add('is-hidden')
    }

    const onMouseEnter = () => {
      dotRef.current?.classList.remove('is-hidden')
      ringRef.current?.classList.remove('is-hidden')
    }

    // Single rAF loop: lerp both elements toward the current mouse position
    const tick = () => {
      dotX += (mouseX - dotX) * DOT_LERP
      dotY += (mouseY - dotY) * DOT_LERP
      ringX += (mouseX - ringX) * RING_LERP
      ringY += (mouseY - ringY) * RING_LERP

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`
        dotRef.current.style.top = `${dotY}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }

      // Stop the loop once idle and the ring has settled (ring is the slowest)
      if (isIdle && Math.abs(mouseX - ringX) < 0.5 && Math.abs(mouseY - ringY) < 0.5) {
        rafId = 0
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    startLoop()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      clearTimeout(idleTimer)
      stopLoop()
    }
  }, [isPointerFine])

  // Do not render on SSR or touch devices
  if (!isPointerFine) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
