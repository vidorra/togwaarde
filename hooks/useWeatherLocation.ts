import { useState, useEffect } from 'react'
import {
  TIMEZONE_COORDS,
  REGION_FALLBACK_COORDS,
  SEIZOEN_TEMP_NL,
  SEIZOEN_TEMP_GENERAL
} from '../lib/tog-constants'
import type { Seizoen, LocationCoords, WeatherLocationResult } from '../lib/tog-types'

interface GeoAPIResponse {
  latitude?: number
  longitude?: number
  country_code?: string
  city?: string
  region?: string
  country_name?: string
}

interface WeatherAPIResponse {
  hourly?: {
    temperature_2m?: number[]
  }
}

interface CachedLocationData {
  city: string
  lat: number
  lon: number
  timestamp: number
}

interface CachedWeatherData {
  temp: number
  city: string
  timestamp: number
}

/**
 * Determine current season based on month
 *
 * Season mapping (Northern Hemisphere):
 * - Spring (lente): March-May
 * - Summer (zomer): June-August
 * - Fall (herfst): September-November
 * - Winter (winter): December-February
 *
 * @function getHuidigSeizoen
 * @returns {Seizoen} Current season key ('lente', 'zomer', 'herfst', or 'winter')
 *
 * @example
 * const seizoen = getHuidigSeizoen() // 'lente' in April
 */
export function getHuidigSeizoen(): Seizoen {
  const maand = new Date().getMonth() + 1 // 1-12
  if (maand >= 3 && maand <= 5) return 'lente'
  if (maand >= 6 && maand <= 8) return 'zomer'
  if (maand >= 9 && maand <= 11) return 'herfst'
  return 'winter'
}

/**
 * Retrieve cached weather data from localStorage if still valid
 *
 * Cache validity: 1 hour from last fetch
 * Purpose: Reduces API calls and improves performance on repeated visits
 *
 * @function getCachedWeatherData
 * @returns {CachedWeatherData | null} Cached weather data if valid, null otherwise
 *
 * @private Internal use only - not exported
 *
 * @example
 * const cachedData = getCachedWeatherData()
 * if (cachedData) {
 *   console.log(`${cachedData.temp}°C in ${cachedData.city}`)
 * }
 */
function getCachedWeatherData(): CachedWeatherData | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem('tog_weather_cache')
    if (!cached) return null

    const data: CachedWeatherData = JSON.parse(cached)
    const now = Date.now()
    const oneHourMs = 60 * 60 * 1000

    // Check if cache is still valid (1 hour old)
    if (now - data.timestamp < oneHourMs) {
      console.log('Weather data from cache:', data.temp, `°C (${data.city})`)
      return data
    }
  } catch (err) {
    console.error('Error reading weather cache:', err)
  }

  return null
}

/**
 * Save weather data to browser's localStorage for 1-hour caching
 *
 * Purpose: Avoid redundant API calls within 1-hour window
 * Reduces bandwidth and improves app responsiveness
 *
 * @function setCachedWeatherData
 * @param {number} temp - Night temperature in Celsius
 * @param {string} city - Location city/region name
 * @returns {void}
 *
 * @private Internal use only - not exported
 * @see getCachedWeatherData For cache retrieval
 */
function setCachedWeatherData(temp: number, city: string): void {
  if (typeof window === 'undefined') return

  try {
    const data: CachedWeatherData = {
      temp,
      city,
      timestamp: Date.now()
    }
    localStorage.setItem('tog_weather_cache', JSON.stringify(data))
  } catch (err) {
    console.error('Error saving weather cache:', err)
  }
}

/**
 * Retrieve cached geolocation data from localStorage if still valid
 *
 * Cache validity: 24 hours from last fetch
 * Purpose: Avoids repeated IP geolocation API calls for the same location
 *
 * @function getCachedLocationData
 * @returns {CachedLocationData | null} Cached location data if valid, null otherwise
 *
 * @private Internal use only - not exported
 *
 * @example
 * const location = getCachedLocationData()
 * if (location) {
 *   console.log(`${location.city} at ${location.lat},${location.lon}`)
 * }
 */
function getCachedLocationData(): CachedLocationData | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem('tog_location_cache')
    if (!cached) return null

    const data: CachedLocationData = JSON.parse(cached)
    const now = Date.now()
    const oneDayMs = 24 * 60 * 60 * 1000

    // Check if cache is still valid (24 hours old)
    if (now - data.timestamp < oneDayMs) {
      console.log('Location data from cache:', data.city)
      return data
    }
  } catch (err) {
    console.error('Error reading location cache:', err)
  }

  return null
}

/**
 * Save geolocation data to browser's localStorage for 24-hour caching
 *
 * Purpose: Avoid redundant IP geolocation API calls within 24-hour window
 * Assumes user location doesn't change frequently
 *
 * @function setCachedLocationData
 * @param {string} city - Location city/region name
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 * @returns {void}
 *
 * @private Internal use only - not exported
 * @see getCachedLocationData For cache retrieval
 */
function setCachedLocationData(city: string, lat: number, lon: number): void {
  if (typeof window === 'undefined') return

  try {
    const data: CachedLocationData = {
      city,
      lat,
      lon,
      timestamp: Date.now()
    }
    localStorage.setItem('tog_location_cache', JSON.stringify(data))
  } catch (err) {
    console.error('Error saving location cache:', err)
  }
}

/**
 * Get estimated outdoor night temperature as fallback when API is unavailable
 *
 * Uses smart fallback logic:
 * 1. Detects user timezone to determine location region
 * 2. For Netherlands/Belgium: Uses detailed seasonal month-by-month estimates
 * 3. For other regions: Uses general seasonal temperature estimates
 * 4. Data based on typical night-time temperatures for each season
 *
 * This ensures the calculator always has a reasonable temperature value
 * even if geolocation or weather API fails.
 *
 * @function getGeschatteBuitenTemp
 * @returns {number} Estimated outdoor night temperature in Celsius
 *
 * @example
 * const fallbackTemp = getGeschatteBuitenTemp() // ~12°C in winter, ~18°C in summer
 */
export function getGeschatteBuitenTemp(): number {
  const seizoen = getHuidigSeizoen()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Detecteer of gebruiker in Nederland/België is (CET timezone)
  const isNederlands = timezone.includes('Amsterdam') ||
                       timezone.includes('Brussels') ||
                       timezone.includes('Europe')

  if (!isNederlands) {
    return SEIZOEN_TEMP_GENERAL[seizoen]
  }

  // Voor Nederland: specifiekere schatting op basis van seizoen en maand
  const maand = new Date().getMonth() + 1
  const seizoenTemps = SEIZOEN_TEMP_NL[seizoen]

  return seizoenTemps[maand] || SEIZOEN_TEMP_GENERAL[seizoen]
}

/**
 * Coördinaten op basis van timezone
 */
function getCoordinatesFromTimezone(timezone: string): LocationCoords {
  // Probeer exacte match
  if (TIMEZONE_COORDS[timezone]) {
    return TIMEZONE_COORDS[timezone]
  }

  // Probeer gedeeltelijke match per regio
  for (const region of Object.keys(REGION_FALLBACK_COORDS)) {
    if (region !== 'default' && timezone.startsWith(`${region}/`)) {
      return REGION_FALLBACK_COORDS[region]
    }
  }

  // Default naar Amsterdam
  return REGION_FALLBACK_COORDS.default
}

/**
 * Custom React hook for fetching weather and location data
 *
 * **Features:**
 * - Automatically detects user location via IP geolocation API
 * - Fetches current night temperature from weather API
 * - Implements intelligent caching:
 *   - Location cache: 24 hours (IP doesn't change often)
 *   - Weather cache: 1 hour (temperature changes predictably)
 * - Graceful fallback to seasonal estimates if APIs fail
 * - Server-safe (checks for window object)
 *
 * **Data flow:**
 * 1. Check weather cache (1 hour) → Return cached if valid
 * 2. Check location cache (24 hours) → Use if valid
 * 3. Fetch location via IP geolocation (ipapi.co)
 * 4. Fetch weather for coordinates (open-meteo.com)
 * 5. Cache both for future use
 * 6. Fallback to seasonal estimates if any API fails
 *
 * **Return values:**
 * - `buitenTemp`: Estimated night temperature in Celsius (or fallback seasonal estimate)
 * - `locationCity`: User's city/region name (empty if unavailable)
 * - `seizoen`: Current season ('lente', 'zomer', 'herfst', 'winter')
 * - `setSeizoen`: Function to manually override detected season
 * - `isLoading`: Boolean indicating if data is being fetched
 * - `error`: Error message if fetch failed (null if successful)
 *
 * @function useWeatherLocation
 * @returns {WeatherLocationResult} Weather and location data with loading/error states
 *
 * @example
 * export default function MyComponent() {
 *   const { buitenTemp, locationCity, seizoen, isLoading, error } = useWeatherLocation()
 *
 *   return (
 *     <div>
 *       {isLoading ? (
 *         <p>Loading weather...</p>
 *       ) : (
 *         <p>{buitenTemp}°C in {locationCity}</p>
 *       )}
 *       {error && <p>Failed to load weather: {error}</p>}
 *     </div>
 *   )
 * }
 */
export function useWeatherLocation(): WeatherLocationResult {
  const [buitenTemp, setBuitenTemp] = useState<number>(getGeschatteBuitenTemp())
  const [locationCity, setLocationCity] = useState<string>('')
  const [seizoen, setSeizoen] = useState<Seizoen>(getHuidigSeizoen())
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNightTemp = async (): Promise<void> => {
      try {
        setIsLoading(true)
        let lat: number
        let lon: number
        let city: string

        // Check weather cache first
        const cachedWeather = getCachedWeatherData()
        if (cachedWeather) {
          setBuitenTemp(cachedWeather.temp)
          setLocationCity(cachedWeather.city)
          setError(null)
          setIsLoading(false)
          return
        }

        // Check location cache first
        const cachedLocation = getCachedLocationData()
        if (cachedLocation) {
          lat = cachedLocation.lat
          lon = cachedLocation.lon
          city = cachedLocation.city
          setLocationCity(city)
        } else {
          // Stap 1: Probeer locatie via IP-geolocation
          try {
            const geoResponse = await fetch('https://ipapi.co/json/')
            const geoData: GeoAPIResponse = await geoResponse.json()

            if (geoData.latitude && geoData.longitude) {
              lat = geoData.latitude
              lon = geoData.longitude
              const countryCode = geoData.country_code

              // Bepaal regio naam
              if (countryCode === 'NL') {
                city = lat >= 52.09 ? 'Noord-Nederland' : 'Zuid-Nederland'
              } else if (countryCode === 'BE') {
                city = lat >= 50.8 ? 'Noord-België' : 'Zuid-België'
              } else {
                city = geoData.city || geoData.region || geoData.country_name || ''
              }

              console.log('Locatie gevonden via IP:', city, `(${lat.toFixed(2)}°N)`)
            } else {
              throw new Error('Geen geolocatie data')
            }
          } catch (geoError) {
            console.log('IP geolocation fallback naar timezone:', geoError)
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const location = getCoordinatesFromTimezone(timezone)
            lat = location.lat
            lon = location.lon
            city = location.city
          }

          setLocationCity(city)
          setCachedLocationData(city, lat, lon)
        }

        // Stap 2: Haal nachttemperatuur op basis van coördinaten
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&forecast_days=2`
        )
        const data: WeatherAPIResponse = await response.json()

        if (data.hourly?.temperature_2m) {
          const now = new Date()
          const currentHour = now.getHours()

          // Als het voor 06:00 's ochtends is, gebruik huidige nacht
          // Anders gebruik volgende nacht
          const nightStartIndex = currentHour < 6 ? 20 : 44 // 44 = volgende dag 20:00

          // Pak temperaturen van 20:00 tot 06:00 (10 uur)
          const nightTemps = data.hourly.temperature_2m.slice(
            nightStartIndex,
            nightStartIndex + 10
          )

          // Bereken gemiddelde nachttemperatuur
          const avgNightTemp = Math.round(
            nightTemps.reduce((sum, temp) => sum + temp, 0) / nightTemps.length
          )

          setBuitenTemp(avgNightTemp)
          setCachedWeatherData(avgNightTemp, city)
        }

        setError(null)
      } catch (err) {
        console.error('Fout bij ophalen temperatuur:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        // Gebruik fallback bij fout
        setBuitenTemp(getGeschatteBuitenTemp())
      } finally {
        setIsLoading(false)
      }
    }

    fetchNightTemp()
  }, [])

  return {
    buitenTemp,
    setBuitenTemp,
    locationCity,
    seizoen,
    setSeizoen,
    isLoading,
    error
  }
}
