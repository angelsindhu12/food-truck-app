export type CuisineType =
  | 'Tacos'
  | 'BBQ'
  | 'Burgers'
  | 'Asian Fusion'
  | 'Desserts'
  | 'Vegan'
  | 'Pizza'
  | 'Seafood'

export interface FoodTruck {
  id: string
  name: string
  tagline: string
  cuisine: CuisineType
  emoji: string
  rating: number
  reviewCount: number
  priceRange: '$' | '$$' | '$$$'
  latOffset: number
  lngOffset: number
  openHour: number
  closeHour: number
  specialties: string[]
  waitMinutes: number
  color: string
}

export interface FoodTruckWithDistance extends FoodTruck {
  distance: number
  lat: number
  lng: number
  isOpen: boolean
}

export interface Coordinates {
  lat: number
  lng: number
}
