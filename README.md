# Abhishek Yadav — Portfolio

Personal portfolio website built with Next.js 16, React 19, and Tailwind CSS v4. Designed for performance, accessibility, and a premium dark aesthetic.

**Live:** https://abhishek202002.github.io/portfolio

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI | React 19, TypeScript 5.9 |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Animation | Motion v12, GSAP 3.14 |
| Smooth Scroll | Lenis 1.3 |
| Fonts | Space Grotesk, DM Serif Display, Noto Serif Devanagari |
| Deployment | GitHub Pages (static export) |

---

## Features

- Devanagari preloader with kumkum red water-fill animation
- Custom cursor with magnetic button interactions
- GSAP ScrollTrigger text and section reveals
- Lenis smooth scroll synced with GSAP RAF ticker
- Active nav section tracking via IntersectionObserver
- Mobile focus trap and accessible navigation
- Scroll progress indicator
- JSON-LD structured data + Open Graph SEO
- Zero layout shift, reduced motion support

---

## Sections

- **Hero** — Name, role, scramble text animation, availability status
- **About** — Bio, stats counters, word-by-word reveal
- **Projects** — DonorLink, DGV, AZA Fashions, Times Now News
- **Skills** — Dual-direction marquee + categorized skill grid
- **Experience** — Jio Platforms, animated timeline
- **Contact** — Large heading, email CTA, social links

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
npm run build    # production build
npx tsc --noEmit # type check
npm run lint     # lint
```

---

## Project Structure

```
app/             → layout, page, globals.css
components/
  ui/            → Preloader, CustomCursor, MagneticButton, Noise, ScrollProgress, TextReveal, SmoothScroll
  sections/      → Hero, About, Projects, Skills, Experience, Contact
  layout/        → Navbar, Footer, Providers
lib/             → data.ts, animations.ts, lenis.ts
hooks/           → useReducedMotion.ts, useTextScramble.ts
public/          → og-image.svg, .nojekyll
```

---

## Contact

**Abhishek Yadav** — Frontend Engineer (4.5 years)
- Email: ay0677241@gmail.com
- LinkedIn: [ay-abhishek-yadav](https://www.linkedin.com/in/ay-abhishek-yadav)
- GitHub: [Abhishek202002](https://github.com/Abhishek202002)
