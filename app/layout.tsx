import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Serif_Display, Noto_Serif_Devanagari } from 'next/font/google'
import './globals.css'
import Noise from '@/components/ui/Noise'
import Preloader from '@/components/ui/Preloader'
import Providers from '@/components/layout/Providers'
import { SITE_URL } from '@/lib/config'
import { PERSONAL } from '@/lib/data'

// ─── Font configuration ───────────────────────────────────────────────────────

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
  // DM Serif Display ships only regular and italic weights
  weight: '400',
  style: ['normal', 'italic'],
})

// Noto Serif Devanagari — classical Sanskrit display font used in the preloader glyph
const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-tiro-devanagari',
  display: 'swap',
  weight: ['400', '700'],
})

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Abhishek Yadav — Frontend Engineer',
  description:
    'Frontend Engineer specialising in React, TypeScript, and Micro-Frontend architecture. 4+ years building performant, scalable web applications across fintech, e-commerce, and non-profit.',
  keywords: [
    'Frontend Engineer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Micro-Frontend',
    'JavaScript',
    'Web Developer',
    'Portfolio',
    'Frontend Developer India',
    'Mumbai',
  ],
  authors: [{ name: PERSONAL.name, url: PERSONAL.github }],
  openGraph: {
    title: 'Abhishek Yadav — Frontend Engineer',
    description:
      'Frontend Engineer specialising in React, TypeScript & Micro-Frontend architecture. 4.5+ years building performant web apps at Fermion Infotech, Mumbai.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: `${SITE_URL}og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Abhishek Yadav — Frontend Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Yadav — Frontend Engineer',
    description: 'Frontend Engineer specialising in React and TypeScript.',
    images: [`${SITE_URL}og-image.png`],
  },
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: true, follow: true },
  verification: {
    google: 'cn9HpP3dymS9JJlyIMKiQeDkXy7vfL3DbjqAiZrE2bI',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

// ─── Structured Data ──────────────────────────────────────────────────────────

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: PERSONAL.name,
  url: SITE_URL,
  jobTitle: PERSONAL.role,
  description:
    'Frontend Engineer specialising in React, TypeScript, and Micro-Frontend architecture with 4+ years of experience building performant web applications.',
  image: `${SITE_URL}og-image.png`,
  email: PERSONAL.email,
  worksFor: {
    '@type': 'Organization',
    name: PERSONAL.company,
    url: 'https://fermioninfotech.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressCountry: 'IN',
  },
  sameAs: [PERSONAL.linkedin, PERSONAL.github],
  knowsAbout: [
    'React',
    'TypeScript',
    'Next.js',
    'JavaScript',
    'Micro-Frontend',
    'Frontend Engineering',
    'Tailwind CSS',
    'Web Performance',
  ],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: 'Abhishek Yadav — Frontend Engineer',
  description:
    'Frontend Engineer specialising in React, TypeScript, and Micro-Frontend architecture. 4+ years building performant, scalable web applications across fintech, e-commerce, and non-profit.',
  inLanguage: 'en',
  mainEntity: { '@id': `${SITE_URL}/#person` },
  author: { '@id': `${SITE_URL}/#person` },
  datePublished: '2024-01-01',
  isPartOf: { '@id': `${SITE_URL}/#website` },
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Abhishek Yadav — Frontend Engineer',
  description: 'Portfolio of Abhishek Yadav, Frontend Engineer based in Mumbai, India.',
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: 'Abhishek Yadav — Frontend Engineer',
  mainEntity: { '@id': `${SITE_URL}/#person` },
  dateCreated: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en',
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSerifDisplay.variable} ${notoSerifDevanagari.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="bg-bg text-warm font-sans overflow-x-hidden">
        {/* Preloader: server-renders as a black screen, then animates client-side */}
        <Preloader />

        {/* Static SVG grain overlay — no client JS required */}
        <Noise />

        {/* CustomCursor + SmoothScroll via Client Component Providers wrapper
            (ssr: false dynamic imports are only allowed in Client Components) */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
