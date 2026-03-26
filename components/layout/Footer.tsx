'use client'

import { PERSONAL } from '@/lib/data'
import { getLenis } from '@/lib/lenis'

/**
 * Footer — minimal bottom bar with copyright and back-to-top.
 */
export default function Footer(): React.JSX.Element {
  const currentYear = new Date().getFullYear()
  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="section-padding py-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-warm-muted">
          <span aria-hidden="true">© </span>
          {currentYear} {PERSONAL.name}. Designed &amp; built with care.
        </p>

        {/* Back to top */}
        <button
          onClick={handleBackToTop}
          className="text-sm text-warm-muted hover:text-gold transition-colors duration-300 flex items-center gap-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
          aria-label="Scroll back to top of page"
          data-cursor-expand
        >
          Back to top
          <span
            className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            ↑
          </span>
        </button>
      </div>
    </footer>
  )
}
