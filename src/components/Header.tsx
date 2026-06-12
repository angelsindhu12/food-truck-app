interface HeaderProps {
  openCount: number
  onRefresh: () => void
  isLoading: boolean
}

export function Header({ openCount, onRefresh, isLoading }: HeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-b-3xl gradient-hero px-5 pb-8 pt-10 shadow-2xl">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-sunshine/20 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="animate-float text-3xl">🚚</span>
            <span className="font-display text-2xl tracking-wide text-white">TruckBite</span>
          </div>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-sm transition hover:bg-white/30 active:scale-95 disabled:opacity-50"
            aria-label="Refresh location"
          >
            {isLoading ? '⏳' : '📍'}
          </button>
        </div>

        <h1 className="font-heading mt-3 text-3xl font-bold leading-tight text-white">
          Hungry? <span className="shimmer-text">Let's roll.</span>
        </h1>
        <p className="mt-2 max-w-xs text-sm font-light text-white/80">
          Discover food trucks open right now, right around the corner.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-night/30 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
          </span>
          <span className="font-heading text-sm font-semibold text-white">
            {openCount} truck{openCount !== 1 ? 's' : ''} open nearby
          </span>
        </div>
      </div>
    </header>
  )
}
