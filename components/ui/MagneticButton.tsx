'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useSpring } from 'motion/react'
import { SPRING_SOFT } from '@/lib/animations'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface MagneticButtonProps {
  /** Content to render inside the magnetic wrapper */
  children: ReactNode
  /**
   * Attraction strength as a percentage of the cursor-to-center distance.
   * Higher values = more pronounced movement. Default: 35
   */
  strength?: number
  className?: string
}

/**
 * MagneticButton — wraps children in a motion div that moves toward
 * the cursor when hovered, then springs back to origin on mouse leave.
 *
 * Uses Motion (framer-motion v12) `useSpring` for physics-based settling.
 * Works as a decorator — does not impose any styling on its children.
 *
 * On touch devices (pointer: coarse) the magnetic effect is disabled —
 * the wrapper renders as a plain div to avoid jank on tap.
 */
export default function MagneticButton({
  children,
  strength = 35,
  className = '',
}: MagneticButtonProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const isCoarse = useMediaQuery('(pointer: coarse)')

  // Spring values — animate x/y with physics rather than CSS transitions
  const x = useSpring(0, SPRING_SOFT)
  const y = useSpring(0, SPRING_SOFT)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isCoarse) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Normalise offset and scale by strength factor
    x.set((e.clientX - centerX) * (strength / 100))
    y.set((e.clientY - centerY) * (strength / 100))
  }

  const handleMouseLeave = () => {
    // Spring back to origin
    x.set(0)
    y.set(0)
  }

  // On touch devices, skip the motion wrapper entirely
  if (isCoarse) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
