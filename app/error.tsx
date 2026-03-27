'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="text-sm tracking-[0.3em] text-gold uppercase">Something went wrong</p>
      <h1 className="mt-4 font-serif text-4xl text-warm md:text-5xl">Unexpected Error</h1>
      <p className="mt-4 max-w-md text-warm-muted">
        An error occurred while loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-block border border-gold/30 px-8 py-3 text-sm tracking-widest text-gold uppercase transition-colors duration-300 hover:bg-gold/10"
      >
        Try Again
      </button>
    </div>
  )
}
