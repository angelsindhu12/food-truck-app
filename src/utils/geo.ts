import type { Coordinates, FoodTruck, FoodTruckWithDistance } from '../types'

const EARTH_RADIUS_KM = 6371

export function haversineDistance(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

export function isOpenNow(openHour: number, closeHour: number, now = new Date()): boolean {
  const hour = now.getHours()
  if (closeHour > openHour) {
    return hour >= openHour && hour < closeHour
  }
  return hour >= openHour || hour < closeHour
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m away`
  return `${km.toFixed(1)} km away`
}

export function formatWaitTime(minutes: number): string {
  if (minutes <= 5) return '⚡ Quick bite'
  if (minutes <= 10) return `~${minutes} min wait`
  return `~${minutes} min — worth it!`
}

export function enrichTrucks(
  trucks: FoodTruck[],
  userLocation: Coordinates
): FoodTruckWithDistance[] {
  return trucks
    .map((truck) => {
      const lat = userLocation.lat + truck.latOffset
      const lng = userLocation.lng + truck.lngOffset
      const distance = haversineDistance(userLocation, { lat, lng })
      return {
        ...truck,
        lat,
        lng,
        distance,
        isOpen: isOpenNow(truck.openHour, truck.closeHour),
      }
    })
    .sort((a, b) => a.distance - b.distance)
}

export const DEFAULT_LOCATION: Coordinates = {
  lat: 40.7128,
  lng: -74.006,
}
