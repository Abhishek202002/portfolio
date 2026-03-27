import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-static'

/**
 * Generates /robots.txt — tells search engine crawlers what to index.
 * Allows all crawlers and points them to the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
