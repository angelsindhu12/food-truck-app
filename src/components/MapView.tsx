import type { Coordinates, FoodTruckWithDistance } from '../types'
interface MapViewProps {
  trucks: FoodTruckWithDistance[]
  userLocation: Coordinates
  onSelect: (truck: FoodTruckWithDistance) => void
}

function toPercent(
  coord: number,
  userCoord: number,
  range: number
): number {
  const offset = (coord - userCoord) / range
  return 50 + offset * 40
}

export function MapView({ trucks, userLocation, onSelect }: MapViewProps) {
  const range = 0.015

  return (
    <div className="relative h-80 overflow-hidden rounded-2xl border border-white/10 bg-night-elevated">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-electric/5 to-coral/10" />

      {/* User pin */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: '50%', top: '50%' }}
      >
        <div className="relative">
          <span className="absolute -inset-3 animate-ping rounded-full bg-electric/30" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-electric text-sm shadow-lg shadow-electric/50">
            📍
          </div>
          <p className="font-heading mt-1 whitespace-nowrap text-center text-[10px] font-bold text-electric">
            You
          </p>
        </div>
      </div>

      {/* Truck pins */}
      {trucks.map((truck) => {
        const left = toPercent(truck.lng, userLocation.lng, range)
        const top = toPercent(truck.lat, userLocation.lat, range)
        const clampedLeft = Math.max(8, Math.min(92, left))
        const clampedTop = Math.max(8, Math.min(92, top))

        return (
          <button
            key={truck.id}
            onClick={() => onSelect(truck)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition hover:scale-110 active:scale-95"
            style={{ left: `${clampedLeft}%`, top: `${clampedTop}%` }}
            title={truck.name}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-xl shadow-lg"
              style={{
                backgroundColor: truck.isOpen ? `${truck.color}44` : '#ffffff15',
                border: `2px solid ${truck.isOpen ? truck.color : '#ffffff30'}`,
                opacity: truck.isOpen ? 1 : 0.5,
              }}
            >
              {truck.emoji}
            </div>
            <p
              className="font-heading mt-0.5 max-w-[72px] truncate text-center text-[9px] font-bold"
              style={{ color: truck.isOpen ? truck.color : '#ffffff50' }}
            >
              {truck.name.split(' ')[0]}
            </p>
          </button>
        )
      })}

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-night/80 px-3 py-2 backdrop-blur-md">
        <span className="text-xs text-white/60">
          {trucks.filter((t) => t.isOpen).length} open trucks on map
        </span>
        <span className="text-xs text-coral-light">
          Tap a pin for details
        </span>
      </div>
    </div>
  )
}
