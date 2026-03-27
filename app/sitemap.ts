import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

export const dynamic = 'force-static'

/**
 * Generates /sitemap.xml — tells Google which pages exist and when they
 * were last updated. Single-page portfolio so only the root URL is listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
