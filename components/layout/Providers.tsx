'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

/**
 * Providers — Client Component that wraps browser-API-dependent components.
 *
 * `ssr: false` is only allowed inside Client Components in Next.js 16+.
 * We hoist those dynamic imports here so that layout.tsx (a Server Component)
 * stays clean.
 */

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  )
}
