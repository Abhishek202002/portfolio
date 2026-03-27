/**
 * Central site configuration — single source of truth.
 *
 * To update the site URL (e.g. moving to a custom domain):
 *  1. Set NEXT_PUBLIC_SITE_URL in your .env / GitHub Actions secret
 *  2. Or update the fallback string below — ONE place, done.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://abhishek202002.github.io/portfolio/'

/** Resume PDF filename — used in Hero and Contact download links */
export const RESUME_FILENAME = 'Abhishek_Yadav_Resume.pdf' as const
