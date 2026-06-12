interface EmptyStateProps {
  message: string
  showOpenOnly: boolean
  onToggleOpenOnly: () => void
}

export function EmptyState({ message, showOpenOnly, onToggleOpenOnly }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <span className="animate-float text-6xl">🍽️</span>
      <h3 className="font-heading mt-4 text-xl font-bold text-white">Nothing here yet</h3>
      <p className="mt-2 max-w-xs text-sm text-white/50">{message}</p>
      {showOpenOnly && (
        <button
          onClick={onToggleOpenOnly}
          className="font-heading mt-6 rounded-full bg-coral/20 px-5 py-2.5 text-sm font-semibold text-coral-light transition hover:bg-coral/30"
        >
          Show all trucks
        </button>
      )}
    </div>
  )
}
