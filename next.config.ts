import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // Required for static export — Next.js Image Optimisation needs a server
  images: { unoptimized: true },

  // Set this to your repo name if deploying to:
  //   https://abhishek202002.github.io/next-js-abhi-portfolio
  // Leave empty ('') if deploying to the root:
  //   https://abhishek202002.github.io  (repo must be named Abhishek202002.github.io)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
}

export default nextConfig
