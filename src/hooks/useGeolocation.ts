import { useCallback, useEffect, useState } from 'react'
import type { Coordinates } from '../types'
import { DEFAULT_LOCATION } from '../utils/geo'

type GeoStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'error'

interface UseGeolocationResult {
  location: Coordinates
  status: GeoStatus
  error: string | null
  refresh: () => void
}

export function useGeolocation(): UseGeolocationResult {
  const [location, setLocation] = useState<Coordinates>(DEFAULT_LOCATION)
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      setError('Geolocation is not supported on this device.')
      return
    }

    setStatus('loading')
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setStatus('granted')
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus('denied')
          setError('Location access denied — showing demo area.')
        } else {
          setStatus('error')
          setError('Could not get your location — showing demo area.')
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  return { location, status, error, refresh: requestLocation }
}
