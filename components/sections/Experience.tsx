'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { EXPERIENCE } from '@/lib/data'
import { EASE_EXPO_OUT_ARRAY } from '@/lib/animations'

/**
 * Experience — single-company timeline with an animated vertical line
 * that draws in from top to bottom as the section enters the viewport.
 *
 * Each highlight bullet fades in with a stagger after the line passes it.
 */
export default function Experience(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 bg-bg section-padding py-32 md:py-44"
      aria-labelledby="experience-heading"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-xs text-gold tracking-[0.3em] uppercase font-medium">04</span>
        <div className="w-8 h-px bg-gold/40" aria-hidden="true" />
        <h2
          id="experience-heading"
          className="text-xs text-warm-muted tracking-[0.3em] uppercase"
        >
          Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left column — company meta */}
        <div className="lg:col-span-4 space-y-3">
          <motion.p
            className="text-xs tracking-[0.2em] text-gold uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_EXPO_OUT_ARRAY, delay: 0.1 }}
          >
            {EXPERIENCE.period}
          </motion.p>

          <motion.h3
            className="font-serif text-display-md text-warm leading-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE_EXPO_OUT_ARRAY, delay: 0.2 }}
          >
            <a
              href={EXPERIENCE.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-300 group"
              aria-label={`Visit ${EXPERIENCE.company} website (opens in new tab)`}
              title={`Visit ${EXPERIENCE.company} website`}
              data-cursor-expand
            >
              {EXPERIENCE.company}
              <span className="inline-block ml-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-3xl align-middle" aria-hidden="true">↗</span>
            </a>
          </motion.h3>

          <motion.div
            className="space-y-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="text-sm text-warm-muted">{EXPERIENCE.role}</p>
            <p className="text-xs text-warm-muted/60">{EXPERIENCE.location}</p>
            <p className="text-xs text-gold/70 tracking-wide">{EXPERIENCE.duration}</p>
          </motion.div>

          <motion.p
            className="text-sm text-warm-muted leading-relaxed pt-2"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_EXPO_OUT_ARRAY, delay: 0.4 }}
          >
            {EXPERIENCE.description}
          </motion.p>
        </div>

        {/* Right column — highlights with animated timeline */}
        <div className="lg:col-span-8 relative">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-px bg-border overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="w-full bg-gold origin-top"
              initial={{ scaleY: 0, height: '100%' }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.6, ease: EASE_EXPO_OUT_ARRAY, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Highlights list */}
          <ul className="pl-8 space-y-10" role="list">
            {EXPERIENCE.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                className="relative pr-2"
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: EASE_EXPO_OUT_ARRAY,
                  delay: 0.6 + i * 0.12,
                }}
              >
                {/* Timeline dot */}
                <motion.span
                  className="absolute -left-[2.1rem] top-1.5 w-1.5 h-1.5 rounded-full bg-gold"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + i * 0.12,
                    type: 'spring',
                    stiffness: 300,
                  }}
                  aria-hidden="true"
                />
                <p className="text-sm md:text-base text-warm-muted leading-[1.75]">
                  {highlight.text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
