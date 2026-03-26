'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'
import { motion } from 'motion/react'
import { PERSONAL } from '@/lib/data'
import MagneticButton from '@/components/ui/MagneticButton'
import { EASE_EXPO_OUT_ARRAY } from '@/lib/animations'

/**
 * Contact — closing CTA section.
 *
 * Layout:
 * - Large serif display heading (two lines)
 * - Email as a large magnetic link
 * - Social links (LinkedIn + GitHub)
 *
 * No backend required — all links use `mailto:` or external URLs.
 */
export default function Contact(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 bg-bg section-padding py-32 md:py-44"
      aria-labelledby="contact-heading"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-xs text-gold tracking-[0.3em] uppercase font-medium">05</span>
        <div className="w-8 h-px bg-gold/40" aria-hidden="true" />
        <span className="text-xs text-warm-muted tracking-[0.3em] uppercase">Contact</span>
      </div>

      {/* Display heading */}
      <div className="overflow-hidden mb-12">
        <motion.h2
          id="contact-heading"
          className="font-serif leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
          initial={{ y: '110%', opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE_EXPO_OUT_ARRAY, delay: 0.1 }}
        >
          <span className="text-warm">Let&apos;s Work</span>
          <br />
          <span className="text-gold-gradient italic">Together.</span>
        </motion.h2>
      </div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE_EXPO_OUT_ARRAY, delay: 0.4 }}
        className="mb-16"
      >
        <p className="text-xs text-warm-muted tracking-[0.2em] uppercase mb-3">Say hello</p>
        <MagneticButton strength={20}>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-block font-serif text-xl md:text-2xl xl:text-3xl text-warm hover:text-gold transition-colors duration-300 group"
            aria-label={`Send email to ${PERSONAL.email}`}
            data-cursor-expand
          >
            {PERSONAL.email}
            <span
              className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-gold"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </MagneticButton>
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE_EXPO_OUT_ARRAY, delay: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs text-warm-muted tracking-[0.2em] uppercase mb-3">Phone</p>
        <a
          href={`tel:${PERSONAL.phone}`}
          className="font-serif text-lg md:text-xl text-warm hover:text-gold transition-colors duration-300"
          aria-label={`Call ${PERSONAL.phone}`}
        >
          {PERSONAL.phone}
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="flex flex-wrap gap-8 items-center"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE_EXPO_OUT_ARRAY, delay: 0.6 }}
      >
        <MagneticButton strength={30}>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-warm-muted hover:text-gold transition-colors duration-300 group border border-border hover:border-gold/40 rounded-full px-5 py-2.5"
            aria-label="View LinkedIn profile (opens in new tab)"
            data-cursor-expand
          >
            LinkedIn
            <span
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </MagneticButton>

        <MagneticButton strength={30}>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-warm-muted hover:text-gold transition-colors duration-300 group border border-border hover:border-gold/40 rounded-full px-5 py-2.5"
            aria-label="View GitHub profile (opens in new tab)"
            data-cursor-expand
          >
            GitHub
            <span
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </MagneticButton>

        <MagneticButton strength={30}>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.pdf`}
            download="Abhishek_Yadav_Resume.pdf"
            className="flex items-center gap-2 text-sm text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-colors duration-300 rounded-full px-5 py-2.5"
            aria-label="Download resume PDF"
            data-cursor-expand
          >
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </MagneticButton>

      </motion.div>

      {/* Bottom rule */}
      <div className="rule-gold mt-20" aria-hidden="true" />
    </section>
  )
}
