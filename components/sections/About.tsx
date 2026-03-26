'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { PERSONAL, STATS, type Stat } from '@/lib/data'
import TextReveal from '@/components/ui/TextReveal'

// ─── Animated Counter ─────────────────────────────────────────────────────────

interface CounterProps {
  stat: Stat
}

/**
 * Counter — animates a number from 0 to `stat.value` using a rAF loop
 * with cubic ease-out, triggered once the element enters the viewport.
 */
function Counter({ stat }: CounterProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!inView) return

    const DURATION = 2000 // ms
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / DURATION, 1)
      // Cubic ease-out: deceleration toward the final value
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue((stat.value * eased).toFixed(stat.decimals))

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setDisplayValue(stat.value.toFixed(stat.decimals))
      }
    }

    const rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, stat.value, stat.decimals])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="text-display-md font-serif text-gold-gradient leading-none">
        {displayValue}
        {stat.suffix}
      </span>
      <span className="text-xs text-warm-muted tracking-widest uppercase">{stat.label}</span>
    </div>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

/**
 * About — two-column layout: bio text (left) + animated stat counters (right).
 * Text reveals word-by-word on scroll using the TextReveal component.
 */
export default function About(): React.JSX.Element {
  return (
    <section
      id="about"
      className="section-padding py-24 md:py-36"
      aria-labelledby="about-heading"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-xs text-gold tracking-[0.3em] uppercase font-medium">01</span>
        <div className="w-8 h-px bg-gold/40" aria-hidden="true" />
        <h2
          id="about-heading"
          className="text-xs text-warm-muted tracking-[0.3em] uppercase"
        >
          About
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Bio text */}
        <div className="space-y-6">
          <TextReveal
            text="Dedicated Frontend Developer with 4+ years crafting high-performance web applications."
            tag="h3"
            className="font-serif text-2xl md:text-3xl xl:text-4xl text-warm leading-snug"
          />

          <TextReveal
            text={PERSONAL.bio.replace(/\n/g, ' ')}
            tag="p"
            className="text-base text-warm-muted leading-relaxed"
            delay={0.2}
          />

          <TextReveal
            text="My engineering philosophy: performance is a feature, accessibility is non-negotiable, and every interaction should feel intentional."
            tag="p"
            className="text-base text-warm-muted leading-relaxed"
            delay={0.4}
          />

          {/* CTA links */}
          <div className="flex gap-6 pt-4">
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
              aria-label="View Abhishek's LinkedIn profile (opens in new tab)"
              data-cursor-expand
            >
              LinkedIn ↗
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
              aria-label="View Abhishek's GitHub profile (opens in new tab)"
              data-cursor-expand
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-10 lg:gap-12 lg:pt-4">
          {STATS.map((stat) => (
            <Counter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
