import Link from 'next/link'

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="text-sm tracking-[0.3em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-serif text-4xl text-warm md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-warm-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-gold/30 px-8 py-3 text-sm tracking-widest text-gold uppercase transition-colors duration-300 hover:bg-gold/10"
        title="Return to homepage"
      >
        Back to Home
      </Link>
    </div>
  )
}
