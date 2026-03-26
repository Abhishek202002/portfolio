'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { SKILLS_MARQUEE_ROW_1, SKILLS_MARQUEE_ROW_2, SKILL_CATEGORIES } from '@/lib/data'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/animations'

// ─── Marquee Row ──────────────────────────────────────────────────────────────

interface MarqueeRowProps {
  items: string[]
  direction: 'left' | 'right'
}

/**
 * MarqueeRow — horizontally scrolling skill list powered by CSS animation only.
 * No JavaScript involved in the scroll — this is just a CSS keyframe.
 * Pauses on hover via the `.marquee-track` parent class in globals.css.
 */
function MarqueeRow({ items, direction }: MarqueeRowProps): React.JSX.Element {
  return (
    <div
      className="marquee-track overflow-hidden py-3 border-y border-border bg-bg"
      aria-hidden="true" // Decorative — the skill grid below is the accessible version
    >
      <ul
        className={`marquee-row flex gap-8 w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        role="list"
      >
        {items.map((skill, i) => (
          <li
            key={`${skill}-${i}`}
            className="flex items-center gap-3 text-sm text-warm-muted whitespace-nowrap"
          >
            <span className="text-gold/50 text-xs" aria-hidden="true">
              ◆
            </span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Skills Section ───────────────────────────────────────────────────────────

/**
 * Skills — dual-direction marquee (decorative) + accessible categorised grid.
 *
 * The marquee rows use pre-doubled arrays from data.ts to ensure a
 * seamless loop without visible seams.
 */
export default function Skills(): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 })

  return (
    <section
      id="skills"
      className="relative z-0 py-32 md:py-44 bg-bg"
      aria-labelledby="skills-heading"
    >
      {/* Section label */}
      <div className="section-padding flex items-center gap-4 mb-16">
        <span className="text-xs text-gold tracking-[0.3em] uppercase font-medium">03</span>
        <div className="w-8 h-px bg-gold/40" aria-hidden="true" />
        <h2
          id="skills-heading"
          className="text-xs text-warm-muted tracking-[0.3em] uppercase"
        >
          Skills
        </h2>
      </div>

      {/* Marquee rows — full bleed (no section-padding) */}
      <div className="mb-20 space-y-0">
        <MarqueeRow items={SKILLS_MARQUEE_ROW_1} direction="left" />
        <MarqueeRow items={SKILLS_MARQUEE_ROW_2} direction="right" />
      </div>

      {/* Accessible skill categories grid */}
      <div className="section-padding">
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          aria-label="Skills organised by category"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.category}
              variants={fadeUpVariants}
              className="bg-surface border border-gold/20 rounded-xl p-8 md:p-10 space-y-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-3">
                <span className="text-gold text-lg leading-none" aria-hidden="true">
                  {cat.glyph}
                </span>
                <h3 className="text-sm font-medium text-warm tracking-wide">{cat.category}</h3>
              </div>

              {/* Skills list */}
              <ul className="flex flex-wrap gap-2" role="list">
                {cat.items.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs text-warm-muted px-2.5 py-1 rounded-full border border-gold/25 hover:border-gold/60 hover:text-warm transition-colors duration-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
