import { useMemo, useState } from 'react'
import { FOOD_TRUCKS } from './data/foodTrucks'
import { useGeolocation } from './hooks/useGeolocation'
import { enrichTrucks } from './utils/geo'
import type { FoodTruckWithDistance } from './types'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { FilterChips } from './components/FilterChips'
import { ViewToggle } from './components/ViewToggle'
import { FoodTruckCard } from './components/FoodTruckCard'
import { FoodTruckDetail } from './components/FoodTruckDetail'
import { MapView } from './components/MapView'
import { EmptyState } from './components/EmptyState'

type ViewMode = 'list' | 'map'

function App() {
  const { location, status, error, refresh } = useGeolocation()
  const [search, setSearch] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('All')
  const [openOnly, setOpenOnly] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedTruck, setSelectedTruck] = useState<FoodTruckWithDistance | null>(null)

  const allTrucks = useMemo(
    () => enrichTrucks(FOOD_TRUCKS, location),
    [location]
  )

  const filteredTrucks = useMemo(() => {
    const query = search.toLowerCase().trim()
    return allTrucks.filter((truck) => {
      if (openOnly && !truck.isOpen) return false
      if (cuisineFilter !== 'All' && truck.cuisine !== cuisineFilter) return false
      if (!query) return true
      return (
        truck.name.toLowerCase().includes(query) ||
        truck.tagline.toLowerCase().includes(query) ||
        truck.cuisine.toLowerCase().includes(query) ||
        truck.specialties.some((s) => s.toLowerCase().includes(query))
      )
    })
  }, [allTrucks, search, cuisineFilter, openOnly])

  const openCount = allTrucks.filter((t) => t.isOpen).length

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-night pb-10">
      <Header
        openCount={openCount}
        onRefresh={refresh}
        isLoading={status === 'loading'}
      />

      <main className="animate-slide-up -mt-4 space-y-4 px-4">
        {(status === 'denied' || status === 'error') && error && (
          <div className="rounded-xl border border-sunshine/30 bg-sunshine/10 px-4 py-3 text-sm text-sunshine">
            ⚠️ {error}
          </div>
        )}

        <SearchBar value={search} onChange={setSearch} />

        <div className="flex items-center justify-between gap-3">
          <FilterChips active={cuisineFilter} onChange={setCuisineFilter} />
        </div>

        <div className="flex items-center justify-between">
          <ViewToggle mode={viewMode} onChange={setViewMode} />
          <button
            onClick={() => setOpenOnly((v) => !v)}
            className={`font-heading rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              openOnly
                ? 'bg-mint/20 text-mint'
                : 'bg-night-card text-white/50 hover:text-white/70'
            }`}
          >
            {openOnly ? '● Open only' : '○ Show all'}
          </button>
        </div>

        {status === 'loading' ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl bg-night-card"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
            <p className="text-center font-heading text-sm text-white/40">
              Finding trucks near you...
            </p>
          </div>
        ) : viewMode === 'map' ? (
          <MapView
            trucks={filteredTrucks}
            userLocation={location}
            onSelect={setSelectedTruck}
          />
        ) : filteredTrucks.length === 0 ? (
          <EmptyState
            message={
              openOnly
                ? 'No open trucks match your search. Try a different filter or show all trucks.'
                : 'No trucks match your search. Try a different keyword or cuisine.'
            }
            showOpenOnly={openOnly}
            onToggleOpenOnly={() => setOpenOnly(false)}
          />
        ) : (
          <div className="space-y-3">
            <p className="font-heading text-xs font-semibold uppercase tracking-wider text-white/40">
              {filteredTrucks.length} result{filteredTrucks.length !== 1 ? 's' : ''} nearby
            </p>
            {filteredTrucks.map((truck, i) => (
              <FoodTruckCard
                key={truck.id}
                truck={truck}
                index={i}
                onClick={() => setSelectedTruck(truck)}
              />
            ))}
          </div>
        )}

        {viewMode === 'map' && filteredTrucks.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="font-heading text-xs font-semibold uppercase tracking-wider text-white/40">
              Quick picks
            </p>
            {filteredTrucks.slice(0, 3).map((truck, i) => (
              <FoodTruckCard
                key={truck.id}
                truck={truck}
                index={i}
                onClick={() => setSelectedTruck(truck)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedTruck && (
        <FoodTruckDetail
          truck={selectedTruck}
          onClose={() => setSelectedTruck(null)}
        />
      )}
    </div>
  )
}

export default App
