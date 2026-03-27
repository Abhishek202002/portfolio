/**
 * Central site configuration — single source of truth.
 *
 * To update the site URL (e.g. moving to a custom domain):
 *  1. Set NEXT_PUBLIC_SITE_URL in your .env / GitHub Actions secret
 *  2. Or update the fallback string below — ONE place, done.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://abhishek202002.github.io/portfolio/'

/** SEO copy — single source of truth for metadata & schemas */
export const SITE_TITLE = 'Abhishek Yadav — Frontend Engineer'
export const SITE_DESCRIPTION =
  'Frontend Engineer specialising in React, TypeScript, and Micro-Frontend architecture. 4+ years building performant, scalable web applications across fintech, e-commerce, and non-profit.'

/** Resume PDF filename — used in Hero and Contact download links */
export const RESUME_FILENAME = 'Abhishek_Yadav_Resume.pdf' as const
