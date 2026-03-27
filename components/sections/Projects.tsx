'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/types'
import { EASE_EXPO_OUT, SCROLL_TRIGGER_DEFAULTS } from '@/lib/animations'
import MagneticButton from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

// ─── Project Card ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project
  index: number
}

/**
 * ProjectCard — individual project card with 3D tilt on mouse move.
 *
 * The tilt is implemented via vanilla DOM style manipulation inside
 * mouse event handlers (not Motion), giving immediate, zero-overhead
 * response to cursor movement.
 */
function ProjectCard({ project, index }: ProjectCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null)
  // Cache rect on mouseenter to avoid getBoundingClientRect on every mousemove (forced reflow)
  const rectCache = useRef<DOMRect | null>(null)

  const handleMouseEnter = () => {
    rectCache.current = cardRef.current?.getBoundingClientRect() ?? null
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !rectCache.current) return
    // Instant response on move — disable transition while cursor is moving
    cardRef.current.style.transition = 'none'

    const rect = rectCache.current
    // Normalise cursor position within the card: -0.5 to +0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    const rotY = x * 14  // ±7 degrees
    const rotX = -y * 10 // ±5 degrees

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    rectCache.current = null
    // Smooth spring-back when cursor leaves
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    cardRef.current.style.transform = ''
  }

  const isEven = index % 2 === 0

  return (
    <article
      ref={cardRef}
      className="project-card relative z-10 rounded-2xl bg-surface border border-border p-8 md:p-10 flex flex-col gap-6 group"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Project: ${project.title}`}
      data-gsap-card
    >
      {/* Card header: number + period */}
      <div className="flex items-start justify-between">
        <span
          className="font-serif text-5xl leading-none text-gold-gradient select-none"
          aria-hidden="true"
        >
          {project.number}
        </span>
        <span className="text-xs text-warm-muted tracking-wide pt-2">{project.period}</span>
      </div>

      {/* Decorative colour block */}
      <div
        className="h-28 rounded-xl transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}33, ${project.accentColor}0d)`,
          borderLeft: `3px solid ${project.accentColor}`,
          boxShadow: `inset 0 0 40px ${project.accentColor}1a`,
        }}
        aria-hidden="true"
      />

      {/* Project title + subtitle */}
      <div>
        <h3 className="font-serif text-2xl md:text-3xl text-warm leading-tight mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-warm-muted tracking-wide">{project.subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-warm-muted leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech stack chips */}
      <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
        {project.tech.slice(0, isEven ? 5 : 4).map((tech: string) => (
          <span
            key={tech}
            role="listitem"
            className="text-xs px-2.5 py-1 rounded-full border border-border text-warm-muted tracking-wide"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > (isEven ? 5 : 4) && (
          <span className="text-xs px-2.5 py-1 rounded-full border border-border text-warm-muted/50">
            +{project.tech.length - (isEven ? 5 : 4)}
          </span>
        )}
      </div>

      {/* Live site link */}
      <div className="pt-2 border-t border-border">
        <MagneticButton strength={25}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors duration-300 group/link"
            aria-label={`Visit ${project.title} live site (opens in new tab)`}
            title={`Visit ${project.title} live site`}
            data-cursor-expand
          >
            Visit Live Site
            <span
              className="inline-block transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </MagneticButton>
      </div>
    </article>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────

/**
 * Projects — 4 project cards in a 2-column grid with staggered
 * GSAP ScrollTrigger entrance animation.
 */
export default function Projects(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll('[data-gsap-card]')
      if (!cards || cards.length === 0) return

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: EASE_EXPO_OUT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: SCROLL_TRIGGER_DEFAULTS.start,
          once: SCROLL_TRIGGER_DEFAULTS.once,
        },
        onComplete: () => {
          // Clear GSAP's inline transform so hover JS has full control
          gsap.set(cards, { clearProps: 'all' })
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-20 section-padding py-32 md:py-44"
      aria-labelledby="projects-heading"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="text-xs text-gold tracking-[0.3em] uppercase font-medium">02</span>
        <div className="w-8 h-px bg-gold/40" aria-hidden="true" />
        <h2
          id="projects-heading"
          className="text-xs text-warm-muted tracking-[0.3em] uppercase"
        >
          Work
        </h2>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
