import type { FoodTruckWithDistance } from '../types'
import { formatDistance, formatWaitTime } from '../utils/geo'

interface FoodTruckDetailProps {
  truck: FoodTruckWithDistance
  onClose: () => void
}

export function FoodTruckDetail({ truck, onClose }: FoodTruckDetailProps) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${truck.lat},${truck.lng}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="animate-bounce-in w-full max-w-md rounded-t-3xl bg-night-card p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `4px solid ${truck.color}` }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
            style={{ backgroundColor: `${truck.color}22` }}
          >
            {truck.emoji}
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-night-elevated text-lg transition hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <h2 className="font-heading text-2xl font-bold text-white">{truck.name}</h2>
        <p className="mt-1 text-sm italic text-white/50">"{truck.tagline}"</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-coral/20 px-3 py-1 text-xs font-semibold text-coral-light">
            {truck.cuisine}
          </span>
          {truck.isOpen ? (
            <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-mint">
              ● Open Now
            </span>
          ) : (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/40">
              Closed
            </span>
          )}
          <span className="rounded-full bg-sunshine/20 px-3 py-1 text-xs font-semibold text-sunshine">
            ★ {truck.rating} ({truck.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-night-elevated p-3 text-center">
            <p className="text-lg">📍</p>
            <p className="font-heading text-sm font-bold text-white">
              {formatDistance(truck.distance)}
            </p>
          </div>
          <div className="rounded-xl bg-night-elevated p-3 text-center">
            <p className="text-lg">⏱️</p>
            <p className="font-heading text-sm font-bold text-white">
              {formatWaitTime(truck.waitMinutes)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-heading mb-2 text-sm font-bold uppercase tracking-wider text-white/50">
            Must Try
          </h3>
          <div className="flex flex-wrap gap-2">
            {truck.specialties.map((item) => (
              <span
                key={item}
                className="rounded-xl px-3 py-1.5 text-sm font-medium text-white"
                style={{ backgroundColor: `${truck.color}33` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading mt-6 flex w-full items-center justify-center gap-2 rounded-2xl gradient-hero py-4 text-base font-bold text-white shadow-lg shadow-coral/30 transition hover:opacity-90 active:scale-[0.98]"
        >
          🧭 Get Directions
        </a>
      </div>
    </div>
  )
}
