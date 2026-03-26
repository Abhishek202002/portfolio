'use client'

import { useEffect, useState } from 'react'

/**
 * ScrollProgress — a 2px gold bar fixed at the very top of the viewport
 * that fills left-to-right as the user scrolls down the page.
 * Uses a passive scroll listener for zero-jank performance.
 */
export default function ScrollProgress(): React.JSX.Element {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        background: 'linear-gradient(90deg, #c9a84c, #e2c06e)',
        width: `${progress}%`,
        transition: 'width 0.1s linear',
      }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
