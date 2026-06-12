import { CUISINE_FILTERS } from '../data/foodTrucks'

interface FilterChipsProps {
  active: string
  onChange: (filter: string) => void
}

const CHIP_EMOJI: Record<string, string> = {
  All: '✨',
  Tacos: '🌮',
  BBQ: '🍖',
  Burgers: '🍔',
  'Asian Fusion': '🥡',
  Desserts: '🍦',
  Vegan: '🥗',
  Pizza: '🍕',
  Seafood: '🦐',
}

export function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {CUISINE_FILTERS.map((filter) => {
        const isActive = active === filter
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`font-heading flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              isActive
                ? 'gradient-hero text-white shadow-lg shadow-coral/30'
                : 'bg-night-card text-white/70 hover:bg-night-elevated hover:text-white'
            }`}
          >
            <span>{CHIP_EMOJI[filter]}</span>
            <span>{filter}</span>
          </button>
        )
      })}
    </div>
  )
}
