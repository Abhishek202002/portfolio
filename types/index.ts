// ─── Stat ─────────────────────────────────────────────────────────────────────

export type Stat = {
  value: number
  suffix: string
  label: string
  decimals: number
}

// ─── Project ──────────────────────────────────────────────────────────────────

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

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillCategory = {
  category: string
  glyph: string
  items: string[]
}

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

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavLink = {
  label: string
  href: string
}
