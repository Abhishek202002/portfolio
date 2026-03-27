import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/config'
import { PERSONAL } from '@/lib/data'

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: PERSONAL.name,
  url: SITE_URL,
  jobTitle: PERSONAL.role,
  description: SITE_DESCRIPTION,
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

export const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  mainEntity: { '@id': `${SITE_URL}/#person` },
  author: { '@id': `${SITE_URL}/#person` },
  datePublished: '2024-01-01',
  isPartOf: { '@id': `${SITE_URL}/#website` },
}

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: 'Portfolio of Abhishek Yadav, Frontend Engineer based in Mumbai, India.',
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
}

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: SITE_TITLE,
  mainEntity: { '@id': `${SITE_URL}/#person` },
  dateCreated: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'en',
}
