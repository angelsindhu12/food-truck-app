import type { FoodTruckWithDistance } from '../types'
import { formatDistance, formatWaitTime } from '../utils/geo'

interface FoodTruckCardProps {
  truck: FoodTruckWithDistance
  index: number
  onClick: () => void
}

export function FoodTruckCard({ truck, index, onClick }: FoodTruckCardProps) {
  return (
    <button
      onClick={onClick}
      className="card-glow group w-full rounded-2xl bg-night-card p-4 text-left transition hover:-translate-y-1 active:scale-[0.98]"
      style={{
        animationDelay: `${index * 60}ms`,
        borderLeft: `4px solid ${truck.color}`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
          style={{ backgroundColor: `${truck.color}22` }}
        >
          {truck.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading truncate text-lg font-bold text-white group-hover:text-coral-light transition">
                {truck.name}
              </h3>
              <p className="truncate text-xs text-white/50">{truck.tagline}</p>
            </div>
            {truck.isOpen ? (
              <span className="animate-pulse-glow shrink-0 rounded-full bg-mint/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint">
                Open
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                Closed
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
            <span className="font-semibold text-sunshine">★ {truck.rating}</span>
            <span>({truck.reviewCount})</span>
            <span>{truck.priceRange}</span>
            <span className="text-coral-light">{formatDistance(truck.distance)}</span>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {truck.specialties.slice(0, 2).map((item) => (
              <span
                key={item}
                className="rounded-lg bg-night-elevated px-2 py-0.5 text-[11px] text-white/70"
              >
                {item}
              </span>
            ))}
            {truck.specialties.length > 2 && (
              <span className="rounded-lg bg-night-elevated px-2 py-0.5 text-[11px] text-white/40">
                +{truck.specialties.length - 2} more
              </span>
            )}
          </div>

          <p className="mt-2 text-xs font-medium text-mint">
            {truck.isOpen ? formatWaitTime(truck.waitMinutes) : 'Opens later today'}
          </p>
        </div>
      </div>
    </button>
  )
}
