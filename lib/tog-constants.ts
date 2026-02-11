/**
 * TOG Calculator Constants
 * Gebaseerd op: Het Groene Kruis, HEMA, VeiligheidNL, EN 16781:2018
 * NHS/Lullaby Trust, AAP, Red Nose Australia
 */

import type {
  KledingWaarden,
  DekenWaarden,
  TOGRecommendation,
  LocationCoords,
  SafetyLimits,
  TempSliderConfig,
  Seizoen
} from './tog-types'

// TOG waarden voor kledinglagen - GESCHATTE WAARDEN (geen industrie-standaard)
export const KLEDING_WAARDEN: KledingWaarden = {
  'luier': { TOG: 0.1, naam: 'Alleen luier', info: 'Geschatte waarde' },
  'korte_romper': { TOG: 0.2, naam: 'Korte mouw romper', info: 'Geschatte waarde' },
  'lange_romper': { TOG: 0.8, naam: 'Lange mouw romper', info: 'Standaard katoen (0.8-1.0 TOG)' },
  'dun_slaappak': { TOG: 0.6, naam: 'Dun slaappakje', info: 'Geschatte waarde' },
  'dik_slaappak': { TOG: 0.9, naam: 'Dik slaappakje', info: 'Geschatte waarde' },
  'vestje': { TOG: 0.3, naam: 'Vestje', info: 'Geschatte waarde' },
  'sokjes': { TOG: 0.1, naam: 'Sokjes', info: 'Geschatte waarde' }
} as const

// Deken waarden - Met onderscheid tussen ingestopt en los
export const DEKEN_WAARDEN: DekenWaarden = {
  'ingestopt_laken': { TOG: 0.2, naam: 'Ingestopt lakentje', info: 'Veilig indien goed ingestopt' },
  'ingestopt_katoen': { TOG: 1.2, naam: 'Ingestopte katoenen deken', info: 'Stevig onder armen instoppen - vouw NIET dubbel!' },
  'ingestopt_muslin': { TOG: 0.8, naam: 'Ingestopte hydrofiele deken', info: 'Lichtgewicht, ademend' },
  'los_deken': { TOG: 1.5, naam: 'Losse deken (12+ mnd)', info: 'ALLEEN voor 12+ maanden!' }
} as const

// Beschikbare slaapzak TOG waarden
export const SLAAPZAK_TOG_OPTIES: readonly number[] = [0.2, 0.5, 1.0, 2.5, 3.5] as const

// Seizoen temperatuur schattingen voor Nederland
export const SEIZOEN_TEMP_NL: Record<Seizoen, Record<number, number>> = {
  winter: { 12: 5, 1: 3, 2: 4 },
  lente: { 3: 8, 4: 11, 5: 15 },
  zomer: { 6: 18, 7: 20, 8: 19 },
  herfst: { 9: 16, 10: 12, 11: 7 }
}

// Algemene seizoen temperaturen (niet-NL)
export const SEIZOEN_TEMP_GENERAL: Record<Seizoen, number> = {
  lente: 12,
  zomer: 22,
  herfst: 10,
  winter: 4
}

// Timezone naar coördinaten mapping
export const TIMEZONE_COORDS: Record<string, LocationCoords> = {
  'Europe/Amsterdam': { lat: 52.37, lon: 4.89, city: 'Nederland' },
  'Europe/Brussels': { lat: 50.85, lon: 4.35, city: 'België' },
  'Europe/Berlin': { lat: 52.52, lon: 13.40, city: 'Duitsland' },
  'Europe/Paris': { lat: 48.85, lon: 2.35, city: 'Frankrijk' },
  'Europe/London': { lat: 51.51, lon: -0.13, city: 'VK' },
  'Europe/Madrid': { lat: 40.42, lon: -3.70, city: 'Spanje' },
  'Europe/Rome': { lat: 41.90, lon: 12.50, city: 'Italië' },
  'America/New_York': { lat: 40.71, lon: -74.01, city: 'New York' },
  'America/Los_Angeles': { lat: 34.05, lon: -118.24, city: 'Los Angeles' },
  'America/Chicago': { lat: 41.88, lon: -87.63, city: 'Chicago' },
  'Asia/Tokyo': { lat: 35.68, lon: 139.65, city: 'Tokyo' },
  'Australia/Sydney': { lat: -33.87, lon: 151.21, city: 'Sydney' },
}

// Fallback coördinaten per regio
export const REGION_FALLBACK_COORDS: Record<string, LocationCoords> = {
  'Europe': { lat: 52.37, lon: 4.89, city: 'Europa' },
  'America': { lat: 40.71, lon: -74.01, city: 'VS' },
  'Asia': { lat: 35.68, lon: 139.65, city: 'Azië' },
  'Australia': { lat: -33.87, lon: 151.21, city: 'Australië' },
  'default': { lat: 52.37, lon: 4.89, city: 'Nederland' }
}

// TOG aanbevelingen per temperatuur (NHS/Lullaby Trust richtlijnen)
export const TOG_RECOMMENDATIONS: readonly TOGRecommendation[] = [
  { minTemp: 24, range: { min: 0.2, ideal: 0.5, max: 0.5 } },
  { minTemp: 22, range: { min: 0.5, ideal: 0.8, max: 1.0 } },
  { minTemp: 20, range: { min: 1.0, ideal: 1.2, max: 2.5 } },
  { minTemp: 18, range: { min: 2.5, ideal: 2.5, max: 2.5 } },
  { minTemp: 16, range: { min: 2.5, ideal: 2.5, max: 3.5 } },
  { minTemp: -Infinity, range: { min: 3.5, ideal: 3.5, max: 3.5 } }
] as const

// Veiligheidslimieten
export const SAFETY_LIMITS: SafetyLimits = {
  MAX_SAFE_TOG: 4.0,
  HIGH_TOG_WARNING: 3.5,
  MIN_ROOM_TEMP: 16,
  MAX_ROOM_TEMP: 24,
  LOOSE_BLANKET_MIN_AGE: '12+'
} as const

// Temperatuur slider configuratie
export const TEMP_SLIDER_CONFIG: TempSliderConfig = {
  min: 14,
  max: 28,
  default: 19
} as const
