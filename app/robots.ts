import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const SITE_URL = 'https://abhishek202002.github.io'

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
