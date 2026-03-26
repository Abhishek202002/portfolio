/**
 * Shared animation constants and variants.
 * Centralising these prevents magic numbers scattered across components
 * and ensures visual consistency throughout the portfolio.
 */
import type { Variants } from 'motion/react'

// ─── GSAP Easing Strings ──────────────────────────────────────────────────────

export const EASE_EXPO_OUT = 'expo.out' as const
export const EASE_EXPO_IN = 'expo.in' as const
export const EASE_CIRC_OUT = 'circ.out' as const

// ─── CSS Cubic-bezier Values ──────────────────────────────────────────────────

/** expo.out equivalent for Motion/CSS transitions */
export const EASE_EXPO_OUT_ARRAY = [0.16, 1, 0.3, 1] as const

/** Standard transition for UI elements */
export const EASE_STANDARD_ARRAY = [0.4, 0, 0.2, 1] as const

// ─── Motion (Framer Motion v12) Spring Configs ────────────────────────────────

export const SPRING_SOFT = { stiffness: 120, damping: 20 } as const
export const SPRING_MEDIUM = { stiffness: 200, damping: 25 } as const
export const SPRING_SNAPPY = { stiffness: 350, damping: 30 } as const

// ─── GSAP ScrollTrigger Defaults ─────────────────────────────────────────────

export const SCROLL_REVEAL = {
  duration: 0.8,
  ease: EASE_EXPO_OUT,
  stagger: 0.06,
} as const

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 80%',
  once: true,
} as const

// ─── Motion Variants ─────────────────────────────────────────────────────────
// Use Motion's own Variants type to ensure strict compatibility

/** Fade up — used for cards, text blocks, and generic reveals */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO_OUT_ARRAY },
  },
}

/** Staggered container — wraps a list of fadeUp children */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

/** Fade in — subtle reveal without movement */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_STANDARD_ARRAY },
  },
}

// ─── Duration Constants ───────────────────────────────────────────────────────

export const PRELOADER_DURATION_MS = 2800 as const
export const SCRAMBLE_DURATION_FRAMES = 55 as const
