'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PERSONAL, NAV_LINKS } from '@/lib/data'
import { getLenis } from '@/lib/lenis'
import { EASE_EXPO_OUT_ARRAY } from '@/lib/animations'

const SCROLL_THRESHOLD = 60

/**
 * Navbar — fixed top navigation.
 *
 * Behaviour:
 * - Transparent on page top → frosted glass on scroll (`.navbar-glass`)
 * - Active section tracked via IntersectionObserver — highlights current nav link
 * - Desktop: horizontal link list with animated underline on hover/active
 * - Mobile: hamburger icon → full-screen overlay with staggered links + focus trap
 * - Link clicks use Lenis `scrollTo` for smooth anchor navigation
 * - Escape key closes mobile menu; Tab key is trapped inside overlay
 */
export default function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const menuRef = useRef<HTMLDivElement>(null)

  // Frosted glass trigger on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Focus trap + Escape key for mobile menu
  useEffect(() => {
    if (!menuOpen) return

    // Auto-focus first link when menu opens
    const firstLink = menuRef.current?.querySelector('a') as HTMLElement | null
    firstLink?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      const focusable = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? 'navbar-glass' : 'bg-transparent'
        }`}
      >
        <nav
          className="section-padding flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); getLenis()?.scrollTo(0, { duration: 1.6 }) }}
            className="font-serif text-2xl text-gold-gradient font-normal tracking-wide select-none"
            aria-label={`${PERSONAL.name} — scroll to top`}
          >
            {PERSONAL.initials}
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-sm transition-colors duration-300 tracking-wide group ${
                      isActive ? 'text-warm' : 'text-warm-muted hover:text-warm'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    data-cursor-expand
                  >
                    {link.label}
                    {/* Underline — visible when active or hovered */}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-400 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block h-px w-6 bg-warm origin-center"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_EXPO_OUT_ARRAY }}
              aria-hidden="true"
            />
            <motion.span
              className="block h-px w-6 bg-warm origin-center"
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_EXPO_OUT_ARRAY }}
              aria-hidden="true"
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="fixed inset-0 z-[999] bg-bg flex flex-col items-center justify-center"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: EASE_EXPO_OUT_ARRAY }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col items-center gap-8 list-none" role="list">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: EASE_EXPO_OUT_ARRAY }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-display-md font-serif transition-colors duration-300 ${
                        isActive ? 'text-gold' : 'text-warm hover:text-gold'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            {/* Close button at bottom */}
            <motion.button
              className="absolute bottom-12 text-xs text-warm-muted tracking-[0.3em] uppercase hover:text-warm transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              aria-label="Close navigation menu"
            >
              Close ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
