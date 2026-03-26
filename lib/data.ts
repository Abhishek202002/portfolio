/**
 * Portfolio data — single source of truth for all content.
 * Update this file to reflect new projects, skills, or experience.
 */

// ─── Personal ────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: 'Abhishek Yadav',
  initials: 'AY',
  role: 'Frontend Engineer',
  company: 'Fermion Infotech',
  location: 'Mumbai, India',
  email: 'ay0677241@gmail.com',
  phone: '+91 8779981184',
  linkedin: 'https://www.linkedin.com/in/ay-abhishek-yadav',
  github: 'https://github.com/Abhishek202002',
  bio: `I craft high-performance web experiences with React and TypeScript.
Specialising in Micro-Frontend architecture, I have spent 4+ years shipping
products used by millions — from newsrooms to e-commerce to fundraising platforms.`,
  availableForWork: true,
} as const

// ─── Stats ───────────────────────────────────────────────────────────────────

export type Stat = {
  value: number
  suffix: string
  label: string
  decimals: number
}

export const STATS: Stat[] = [
  { value: 4.5, suffix: '+', label: 'Years Experience', decimals: 1 },
  { value: 4, suffix: '', label: 'Products Shipped', decimals: 0 },
  { value: 15, suffix: '+', label: 'Technologies', decimals: 0 },
  { value: 1, suffix: 'M+', label: 'Users Reached', decimals: 0 },
]

// ─── Projects ────────────────────────────────────────────────────────────────

export type Project = {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  period: string
  tech: string[]
  url: string
  accentColor: string
}

export const PROJECTS: Project[] = [
  {
    id: 'donorlink',
    number: '01',
    title: 'DonorLink',
    subtitle: 'Fundraising Platform · Australia',
    description:
      'Comprehensive fundraising SaaS for Australian nonprofits. Built a rich donor management dashboard with drag-and-drop campaign builders, interactive charts, maps, and real-time voice-call integration.',
    period: 'Aug 2024 — Present',
    tech: [
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Material-UI',
      'Radix UI',
      'Zustand',
      '@dnd-kit',
      'TiptapJS',
      'Recharts',
      'Leaflet',
      'Twilio Voice SDK',
    ],
    url: 'https://www.donorlink.com.au/',
    accentColor: '#4ade80',
  },
  {
    id: 'dgv',
    number: '02',
    title: 'DiggiVriddhi',
    subtitle: 'Micro-Frontend Portal · India',
    description:
      'Large-scale government digital portal built with Webpack Module Federation. Architected a multi-team micro-frontend system enabling independent deployments across Money, Pay, and Connect products.',
    period: 'Jan 2023 — Jun 2024',
    tech: [
      'React',
      'TypeScript',
      'Module Federation',
      'Webpack',
      'Redux',
      'Figma',
      'React Hook Form',
      'SonarQube',
      'GitLab CI',
    ],
    url: 'https://www.dgv.in/',
    accentColor: '#60a5fa',
  },
  {
    id: 'aza',
    number: '03',
    title: 'AZA Fashions',
    subtitle: 'E-Commerce Admin Panel · India',
    description:
      'Admin dashboard for a premium Indian luxury fashion e-commerce platform. Delivered inventory management, order processing workflows, and analytics dashboards for a catalogue of 50,000+ SKUs.',
    period: 'Jul 2022 — Dec 2022',
    tech: ['React.js', 'Bootstrap', 'Redux', 'REST APIs', 'Unit Testing'],
    url: 'https://www.azafashions.com/',
    accentColor: '#f472b6',
  },
  {
    id: 'timesnow',
    number: '04',
    title: 'Times Now News',
    subtitle: 'High-Traffic News Platform · India',
    description:
      'One of India\'s leading digital news portals. Implemented AMP pages for Google News, optimised Core Web Vitals, integrated programmatic ad networks, and built breaking-news real-time feeds.',
    period: 'Dec 2021 — Jun 2022',
    tech: [
      'React.js',
      'AMP',
      'SEO Optimisation',
      'Google Ad Manager',
      'REST APIs',
      'Performance Optimisation',
    ],
    url: 'https://www.timesnownews.com/',
    accentColor: '#fb923c',
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillCategory = {
  category: string
  glyph: string
  items: string[]
}

/** Pre-doubled arrays ensure seamless CSS marquee loop */
export const SKILLS_MARQUEE_ROW_1: string[] = [
  'React 18',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'Module Federation',
  'Redux',
  'Zustand',
  'Webpack',
  'React 18',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'Module Federation',
  'Redux',
  'Zustand',
  'Webpack',
]

export const SKILLS_MARQUEE_ROW_2: string[] = [
  'Material-UI',
  'HTML5',
  'CSS3',
  'JavaScript',
  'GIT',
  'GitLab',
  'Jira',
  'Figma',
  'TiptapJS',
  'Recharts',
  'Leaflet',
  'Radix UI',
  'Material-UI',
  'HTML5',
  'CSS3',
  'JavaScript',
  'GIT',
  'GitLab',
  'Jira',
  'Figma',
  'TiptapJS',
  'Recharts',
  'Leaflet',
  'Radix UI',
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Core Stack',
    glyph: '◈',
    items: ['React 18', 'TypeScript', 'Next.js', 'JavaScript ES2024', 'HTML5', 'CSS3'],
  },
  {
    category: 'Styling & UI',
    glyph: '◉',
    items: ['Tailwind CSS', 'Material-UI', 'Radix UI', 'Bootstrap', 'Responsive Design'],
  },
  {
    category: 'State & Data',
    glyph: '◎',
    items: ['Redux', 'Zustand', 'React Hook Form', 'Zod', 'REST APIs', 'API Integration'],
  },
  {
    category: 'Architecture',
    glyph: '◐',
    items: ['Micro-Frontend', 'Module Federation', 'Webpack', 'Vite', 'Performance Optimisation'],
  },
  {
    category: 'Tools & Workflow',
    glyph: '◑',
    items: ['GIT', 'GitLab', 'Jira', 'SonarQube', 'Figma', 'ESLint', 'Vitest'],
  },
  {
    category: 'Specialised',
    glyph: '◒',
    items: ['GSAP', 'Framer Motion', 'TiptapJS', 'Recharts', 'Leaflet', 'Twilio Voice SDK'],
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────

export type ExperienceHighlight = {
  text: string
}

export type ExperienceEntry = {
  company: string
  companyUrl: string
  role: string
  period: string
  duration: string
  location: string
  description: string
  highlights: ExperienceHighlight[]
}

export const EXPERIENCE: ExperienceEntry = {
  company: 'Fermion Infotech',
  companyUrl: 'https://fermioninfotech.com',
  role: 'Software Engineer',
  period: 'December 2021 — Present',
  duration: '4.5+ years',
  location: 'Vashi, Navi Mumbai',
  description:
    'Full-service software consultancy delivering enterprise and product-grade web applications for clients across India, Australia, and the US.',
  highlights: [
    {
      text: 'Architected a Micro-Frontend portal using Webpack Module Federation, enabling 3 independent frontend teams to deploy without merge conflicts.',
    },
    {
      text: 'Led frontend development for DonorLink (AU) from 0 to production — designed component systems, TypeScript contracts, and performance budgets.',
    },
    {
      text: 'Improved Lighthouse scores from 40s to 90+ on Times Now News via code splitting, lazy loading, and full AMP implementation.',
    },
    {
      text: 'Built a theme-based React admin panel for AZA Fashions managing 50,000+ product SKUs with real-time order workflows.',
    },
    {
      text: 'Consistently delivered across 4 distinct product verticals — fintech, media, fashion, and non-profit — on schedule and within scope.',
    },
  ],
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavLink = {
  label: string
  href: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
