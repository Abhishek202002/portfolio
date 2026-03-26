'use client'

import { useRef, type ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCROLL_REVEAL, SCROLL_TRIGGER_DEFAULTS } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  /** HTML element to render. Defaults to 'p'. */
  tag?: ElementType
  className?: string
  /** Extra delay (seconds) before the stagger begins */
  delay?: number
}

/**
 * TextReveal — splits text into words and reveals them word-by-word
 * on scroll entry using GSAP ScrollTrigger.
 *
 * Each word is wrapped in an `overflow: hidden` mask, and the inner span
 * starts at `translateY(110%)` then animates to 0 — creating a
 * "text rising from below" effect common in high-end editorial sites.
 */
export default function TextReveal({
  text,
  tag: Tag = 'p',
  className = '',
  delay = 0,
}: TextRevealProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const words = containerRef.current.querySelectorAll<HTMLSpanElement>('[data-word-inner]')
      if (words.length === 0) return

      gsap.from(words, {
        y: '110%',
        opacity: 0,
        duration: SCROLL_REVEAL.duration,
        stagger: SCROLL_REVEAL.stagger,
        ease: SCROLL_REVEAL.ease,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: SCROLL_TRIGGER_DEFAULTS.start,
          once: SCROLL_TRIGGER_DEFAULTS.once,
        },
      })
    },
    { scope: containerRef }
  )

  const words = text.split(' ')

  return (
    // Outer div holds the GSAP scope ref; Tag renders the semantic element
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => (
          // Overflow-hidden mask — clips the rising word
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <span
              data-word-inner=""
              style={{ display: 'inline-block' }}
            >
              {word}
              {/* Preserve space between words without an extra DOM node */}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
