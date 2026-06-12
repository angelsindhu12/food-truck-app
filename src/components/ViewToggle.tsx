type ViewMode = 'list' | 'map'

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-xl bg-night-card p-1">
      <button
        onClick={() => onChange('list')}
        className={`font-heading flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition ${
          mode === 'list'
            ? 'bg-night-elevated text-white shadow-sm'
            : 'text-white/50 hover:text-white/70'
        }`}
      >
        📋 List
      </button>
      <button
        onClick={() => onChange('map')}
        className={`font-heading flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition ${
          mode === 'map'
            ? 'bg-night-elevated text-white shadow-sm'
            : 'text-white/50 hover:text-white/70'
        }`}
      >
        🗺️ Map
      </button>
    </div>
  )
}
