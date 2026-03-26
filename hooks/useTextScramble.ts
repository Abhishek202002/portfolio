'use client'

import { useEffect, useState } from 'react'
import { SCRAMBLE_DURATION_FRAMES } from '@/lib/animations'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'

/**
 * Returns a random character from the scramble pool.
 * Falls back to '?' if the pool is somehow empty (satisfies noUncheckedIndexedAccess).
 */
function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? '?'
}

/**
 * Scramble text effect — cycles through random characters, resolving
 * each character left-to-right until the final text is fully revealed.
 *
 * @param finalText - The target text to reveal
 * @param isActive  - Set to true to trigger the scramble animation
 * @returns The current display string (scrambled or resolved)
 */
export function useTextScramble(finalText: string, isActive: boolean): string {
  const [displayText, setDisplayText] = useState<string>(
    () => finalText.split('').map((c) => (c === ' ' ? ' ' : randomChar())).join('')
  )

  useEffect(() => {
    if (!isActive) return

    let frame = 0
    let rafId: number

    const charsPerFrame = finalText.length / SCRAMBLE_DURATION_FRAMES

    const tick = () => {
      const resolvedCount = Math.floor(frame * charsPerFrame)

      const next = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < resolvedCount) return char
          return randomChar()
        })
        .join('')

      setDisplayText(next)
      frame++

      if (frame <= SCRAMBLE_DURATION_FRAMES + 5) {
        rafId = requestAnimationFrame(tick)
      } else {
        // Guarantee exact final text
        setDisplayText(finalText)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [finalText, isActive])

  return displayText
}
