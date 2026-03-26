/**
 * Noise — SVG feTurbulence grain texture overlay.
 *
 * A purely static component (no JS, no client directive).
 * The CSS `noise-overlay` class animates the position at 2-frame steps
 * to create a cinematic film-grain effect.
 * `pointer-events: none` and `aria-hidden` ensure it never interrupts interaction.
 */
export default function Noise(): React.JSX.Element {
  return (
    <>
      {/* Hidden SVG filter definition */}
      <svg
        className="hidden"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Overlay that applies the filter — oversized to prevent edge seams */}
      <div
        className="noise-overlay"
        style={{ filter: 'url(#noise-filter)' }}
        aria-hidden="true"
      />
    </>
  )
}
