'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { PERSONAL } from '@/lib/data'
import { PRELOADER_DURATION_MS, EASE_EXPO_OUT_ARRAY } from '@/lib/animations'
import { useTextScramble } from '@/hooks/useTextScramble'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const FIRST_NAME = 'ABHISHEK'
const LAST_NAME = 'YADAV'

/** Delay (ms) after which the scramble begins — just after the preloader exits */
const SCRAMBLE_START_DELAY = PRELOADER_DURATION_MS + 200

/**
 * Hero — full-viewport first impression.
 *
 * Layout:
 * - Top row: role label (left) + availability status (right)
 * - Centre: giant display name with scramble-then-reveal effect
 * - Bottom row: scroll indicator (right)
 *
 * The text scramble starts after the preloader exits (~3s).
 * Reduced-motion users see the final text immediately, no scramble.
 */
export default function Hero(): React.JSX.Element {
  const [scrambleActive, setScrambleActive] = useState(false)
  const prefersReduced = useReducedMotion()

  // Trigger scramble shortly after the preloader finishes
  useEffect(() => {
    if (prefersReduced) {
      setScrambleActive(true)
      return
    }
    const timer = setTimeout(() => setScrambleActive(true), SCRAMBLE_START_DELAY)
    return () => clearTimeout(timer)
  }, [prefersReduced])

  const firstName = useTextScramble(FIRST_NAME, scrambleActive)
  const lastName = useTextScramble(LAST_NAME, scrambleActive)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col section-padding pt-28 md:pt-32 pb-12 overflow-hidden"
      aria-label="Hero introduction"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 65%), #080808',
      }}
    >
      {/* Main name block */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Availability badge — sits above the name */}
        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: PRELOADER_DURATION_MS / 1000 + 0.1, duration: 0.6, ease: EASE_EXPO_OUT_ARRAY }}
          aria-label="Availability status"
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-green-400 animate-blink" aria-hidden="true" />
          <span className="text-[0.65rem] tracking-[0.3em] text-warm-muted uppercase whitespace-nowrap">
            {PERSONAL.role}&nbsp;&nbsp;·&nbsp;&nbsp;Available for work
          </span>
        </motion.div>

        <h1 className="leading-[0.88] tracking-tight select-none" aria-label={PERSONAL.name}>
          {/* First name */}
          <span
            className="block font-serif text-display-xl text-warm"
            aria-hidden="true"
          >
            {firstName}
          </span>

          {/* Last name — gold gradient */}
          <span
            className="block font-serif text-display-xl text-gold-gradient"
            aria-hidden="true"
          >
            {lastName}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-sm md:text-base text-warm-muted tracking-wide max-w-xs md:max-w-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: PRELOADER_DURATION_MS / 1000 + 1.2,
            duration: 0.7,
            ease: EASE_EXPO_OUT_ARRAY,
          }}
        >
          React.js&nbsp;&nbsp;·&nbsp;&nbsp;TypeScript&nbsp;&nbsp;·&nbsp;&nbsp;Micro-Frontend
          <br />
          <span className="text-warm-muted/60">Fermion Infotech · Mumbai</span>
        </motion.p>

        <motion.a
          href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.pdf`}
          download="Abhishek_Yadav_Resume.pdf"
          className="mt-8 inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-colors duration-300 rounded-full px-6 py-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: PRELOADER_DURATION_MS / 1000 + 1.5,
            duration: 0.7,
            ease: EASE_EXPO_OUT_ARRAY,
          }}
          aria-label="Download resume PDF"
        >
          Download CV
          <span aria-hidden="true">↓</span>
        </motion.a>
      </div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        className="hidden md:flex flex-col items-center gap-3 absolute right-8 lg:right-24 bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: PRELOADER_DURATION_MS / 1000 + 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span
          className="text-[0.6rem] tracking-[0.3em] text-warm-muted uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        />
      </motion.div>

      {/* Decorative bottom divider */}
      <motion.div
        className="rule-gold absolute bottom-0 left-0 right-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: PRELOADER_DURATION_MS / 1000 + 0.8, duration: 1.2, ease: EASE_EXPO_OUT_ARRAY }}
        aria-hidden="true"
      />
    </section>
  )
}
