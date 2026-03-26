'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PRELOADER_DURATION_MS, EASE_EXPO_OUT_ARRAY } from '@/lib/animations'

const FULL_NAME = 'ABHISHEK YADAV'
const DEVANAGARI_TEXT = 'अभिषेक'

/** Kumkum red — the sacred anointment colour */
const KUMKUM = '#C41E3A'

// Canvas logical dimensions (CSS pixels)
const CANVAS_W = 480
const CANVAS_H = 140
const FONT_SIZE = 96
const TEXT_X = 8
const TEXT_Y = 110 // baseline

/** How long after mount before the water starts rising (ms) */
const FILL_START_DELAY_MS = 350
/** How long the fill takes to reach the top (ms) */
const FILL_DURATION_MS = 1550

/**
 * Preloader — full-screen intro that plays once on page load.
 *
 * Animation sequence:
 *  0–350ms     : "अभिषेक" appears as a faint gold outline on canvas
 *  350–1900ms  : Kumkum-red water rises from the bottom, filling the glyphs.
 *                A sine wave at the water surface oscillates continuously,
 *                referencing the ritual pouring of abhiṣeka (sacred anointment).
 *  1900–2100ms : Water overflows — text glows crimson
 *  2100ms+     : Name stagger reveal, then preloader slides up off-screen
 *  2800ms      : Component unmounts, `body.is-loading` class removed
 *
 * Technique: an offscreen <canvas> renders the wave fill shape, then a
 * `destination-in` composite operation clips it to the text pixels only,
 * before being drawn onto the visible canvas.
 */
export default function Preloader(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    document.body.classList.add('is-loading')
    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.classList.remove('is-loading')
    }, PRELOADER_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Offscreen canvas for compositing — created once and reused every frame
    const offscreen = document.createElement('canvas')
    offscreen.width = CANVAS_W
    offscreen.height = CANVAS_H
    const off = offscreen.getContext('2d')!

    // Resolve the CSS font-family variable injected by next/font
    const fontVar = getComputedStyle(document.documentElement)
      .getPropertyValue('--font-tiro-devanagari')
      .trim()
    const font = `${FONT_SIZE}px ${fontVar || 'serif'}`

    let startTime: number | null = null
    let waveOffset = 0

    const drawFrame = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime

      // Wave always oscillates
      waveOffset += 0.045

      // Fill progress: 0 → 1, ease-out cubic
      const fillElapsed = Math.max(0, elapsed - FILL_START_DELAY_MS)
      const raw = Math.min(fillElapsed / FILL_DURATION_MS, 1)
      const progress = 1 - Math.pow(1 - raw, 3)

      // ── Clear main canvas ──────────────────────────────────────────────
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
      ctx.font = font
      ctx.textBaseline = 'alphabetic'

      // ── Pass 1: ghost outline — always visible ─────────────────────────
      ctx.strokeStyle = 'rgba(201,168,76,0.20)'
      ctx.lineWidth = 0.7
      ctx.strokeText(DEVANAGARI_TEXT, TEXT_X, TEXT_Y)

      // ── Pass 2: rising water fill clipped to text shape ────────────────
      if (progress > 0) {
        const fillY = CANVAS_H * (1 - progress)
        // Wave amplitude grows as fill rises, shrinks near full
        const amplitude = Math.min(progress, 1 - progress + 0.05) * 9

        // --- Offscreen: draw wave fill shape ---
        off.clearRect(0, 0, CANVAS_W, CANVAS_H)
        off.fillStyle = KUMKUM

        off.beginPath()
        off.moveTo(0, fillY + amplitude * Math.sin(waveOffset))
        for (let x = 4; x <= CANVAS_W; x += 4) {
          const y = fillY + amplitude * Math.sin((x / CANVAS_W) * Math.PI * 4 + waveOffset)
          off.lineTo(x, y)
        }
        off.lineTo(CANVAS_W, CANVAS_H)
        off.lineTo(0, CANVAS_H)
        off.closePath()
        off.fill()

        // --- Clip fill to text pixels only via destination-in ---
        off.globalCompositeOperation = 'destination-in'
        off.font = font
        off.textBaseline = 'alphabetic'
        off.fillStyle = '#000'
        off.fillText(DEVANAGARI_TEXT, TEXT_X, TEXT_Y)
        off.globalCompositeOperation = 'source-over' // reset for next frame

        // --- Composite result onto main canvas ---
        ctx.drawImage(offscreen, 0, 0)
      }

      // ── Pass 3: overflow glow when fully filled ────────────────────────
      if (progress >= 0.96) {
        const glowAlpha = Math.min((progress - 0.96) / 0.04, 1) * 0.55
        ctx.save()
        ctx.globalAlpha = glowAlpha
        ctx.shadowColor = KUMKUM
        ctx.shadowBlur = 28
        ctx.fillStyle = KUMKUM
        ctx.fillText(DEVANAGARI_TEXT, TEXT_X, TEXT_Y)
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(drawFrame)
    }

    // Wait for Devanagari font to load before first draw
    document.fonts.ready.then(() => {
      rafRef.current = requestAnimationFrame(drawFrame)
    })

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE_EXPO_OUT_ARRAY, delay: 0.1 }}
          aria-live="polite"
          aria-label="Loading portfolio"
          role="status"
        >
          {/* Canvas: अभिषेक water-fill animation */}
          <motion.canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="select-none"
            style={{ maxWidth: '85vw', height: 'auto' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            aria-hidden="true"
          />

          {/* Meaning label — fades in once fill is underway */}
          <motion.p
            className="text-[0.6rem] tracking-[0.3em] text-warm-muted/50 uppercase mt-3 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            aria-hidden="true"
          >
            abhiṣeka · sacred anointment
          </motion.p>

          {/* Latin name — character stagger after fill completes */}
          <div
            className="flex tracking-[0.35em] text-xs text-warm-muted mt-4 select-none"
            aria-label={FULL_NAME}
          >
            {FULL_NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.5 + i * 0.04,
                  duration: 0.35,
                  ease: EASE_EXPO_OUT_ARRAY,
                }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 2.2, ease: 'linear', delay: 0.3 }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
