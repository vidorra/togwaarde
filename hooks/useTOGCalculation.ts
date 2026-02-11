import { useMemo } from 'react'
import {
  KLEDING_WAARDEN,
  DEKEN_WAARDEN,
  TOG_RECOMMENDATIONS,
  SAFETY_LIMITS
} from '../lib/tog-constants'
import type {
  TOGRange,
  CalculatorStatus,
  TOGWarning,
  TOGCalculationResult
} from '../lib/tog-types'

/**
 * Parameters for the useTOGCalculation hook
 * @interface UseTOGCalculationParams
 * @property {number} kamerTemp - Room temperature in Celsius (8-28°C)
 * @property {number} slaapzakTOG - Selected sleeping bag TOG value (0.5-3.5 TOG)
 * @property {string[]} gekozenKleding - Array of selected clothing item keys
 * @property {string[]} gekozenDekens - Array of selected blanket item keys (if used)
 * @property {boolean} gebruikDekens - Whether using blankets instead of sleeping bag
 */
interface UseTOGCalculationParams {
  kamerTemp: number
  slaapzakTOG: number
  gekozenKleding: string[]
  gekozenDekens: string[]
  gebruikDekens: boolean
}

/**
 * Custom hook for TOG value calculations
 *
 * Calculates the optimal TOG (Thermal Overall Grade) value for baby sleep based on:
 * - Room temperature
 * - Selected clothing items
 * - Selected blankets or sleeping bag
 *
 * Uses memoization for performance optimization to avoid recalculating on every render.
 *
 * @function useTOGCalculation
 * @param {UseTOGCalculationParams} params - Configuration parameters
 * @returns {TOGCalculationResult} Calculation results including recommended TOG range, total TOG, status, and safety warnings
 *
 * @example
 * const {
 *   aanbevolenTOGRange,
 *   totaleTOG,
 *   status,
 *   warnings
 * } = useTOGCalculation({
 *   kamerTemp: 20,
 *   slaapzakTOG: 2.5,
 *   gekozenKleding: ['lange_romper', 'sokken'],
 *   gekozenDekens: [],
 *   gebruikDekens: false
 * })
 */
export function useTOGCalculation({
  kamerTemp,
  slaapzakTOG,
  gekozenKleding,
  gekozenDekens,
  gebruikDekens
}: UseTOGCalculationParams): TOGCalculationResult {
  /**
   * Calculate recommended TOG range based on room temperature
   * Uses memoization to prevent recalculation when temperature hasn't changed
   * Range is looked up from TOG_RECOMMENDATIONS config based on minimum temperature threshold
   */
  const aanbevolenTOGRange = useMemo((): TOGRange => {
    for (const rec of TOG_RECOMMENDATIONS) {
      if (kamerTemp >= rec.minTemp) {
        return rec.range
      }
    }
    return TOG_RECOMMENDATIONS[TOG_RECOMMENDATIONS.length - 1].range
  }, [kamerTemp])

  /**
   * Calculate total TOG value from selected clothing items
   * Sums up individual TOG values from KLEDING_WAARDEN config
   * Uses memoization to prevent recalculation when clothing selection hasn't changed
   */
  const kledingTOG = useMemo((): number => {
    return gekozenKleding.reduce((totaal, item) => {
      return totaal + (KLEDING_WAARDEN[item]?.TOG || 0)
    }, 0)
  }, [gekozenKleding])

  /**
   * Calculate total TOG value from selected blankets
   * Sums up individual TOG values from DEKEN_WAARDEN config
   * Uses memoization to prevent recalculation when blanket selection hasn't changed
   */
  const dekenTOG = useMemo((): number => {
    return gekozenDekens.reduce((totaal, item) => {
      return totaal + (DEKEN_WAARDEN[item]?.TOG || 0)
    }, 0)
  }, [gekozenDekens])

  /**
   * Calculate total TOG value combining all clothing and blanket/sleeping bag TOG
   * Formula:
   * - With sleeping bag: slaapzakTOG + kledingTOG + dekenTOG (dekens would be 0)
   * - With blankets: kledingTOG + dekenTOG (slaapzakTOG would be 0)
   * Uses memoization to prevent recalculation when dependencies haven't changed
   */
  const totaleTOG = useMemo((): number => {
    const basisTOG = kledingTOG + dekenTOG
    return gebruikDekens ? basisTOG : slaapzakTOG + basisTOG
  }, [kledingTOG, dekenTOG, slaapzakTOG, gebruikDekens])

  /**
   * Determine the comfort and safety status based on total TOG vs recommended range
   *
   * Status logic:
   * - totaleTOG < min - 0.5: "te_koud" (too cold) - RED
   * - totaleTOG < min: "iets_te_koud" (slightly cold) - ORANGE
   * - min <= totaleTOG <= max: "perfect" - GREEN
   * - totaleTOG > max: "iets_te_warm" (slightly warm) - ORANGE
   * - totaleTOG > max + 0.5: "te_warm" (too warm) - RED
   *
   * Also provides user-friendly messages with actionable advice.
   * Uses memoization to prevent recalculation when TOG values haven't changed
   */
  const status = useMemo((): CalculatorStatus => {
    const { min, max } = aanbevolenTOGRange

    if (totaleTOG < min) {
      const verschil = min - totaleTOG
      if (verschil > 0.5) {
        return {
          status: 'te_koud',
          kleur: 'red',
          titel: 'Aanpassing nodig',
          tekst: kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP
            ? 'Te koud! Verhoog de kamertemperatuur naar minimaal 16°C en voeg warmere lagen toe.'
            : 'Te koud! Voeg warmere lagen toe voor comfort.'
        }
      }
      return {
        status: 'iets_te_koud',
        kleur: 'orange',
        titel: 'Let op',
        tekst: kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP
          ? 'Kamertemperatuur te laag. Verhoog naar minimaal 16°C en overweeg een extra laagje.'
          : 'Iets te koud. Overweeg een extra laagje.'
      }
    }

    if (totaleTOG > max) {
      const verschil = totaleTOG - max
      if (verschil > 0.5) {
        return {
          status: 'te_warm',
          kleur: 'red',
          titel: 'Aanpassing nodig',
          tekst: 'Te warm! Verwijder lagen om oververhitting te voorkomen.'
        }
      }
      return {
        status: 'iets_te_warm',
        kleur: 'orange',
        titel: 'Let op',
        tekst: 'Iets te warm. Overweeg een lichtere slaapzak of minder lagen.'
      }
    }

    return {
      status: 'perfect',
      kleur: 'green',
      titel: 'Perfect!',
      tekst: 'Perfect! Ideale warmte voor je baby.'
    }
  }, [totaleTOG, aanbevolenTOGRange, kamerTemp])

  /**
   * Generate safety warnings based on SIDS (Sudden Infant Death Syndrome) and NHS guidelines
   *
   * Warning types:
   * - critical: Total TOG exceeds maximum safe limit (4.0 TOG) - risk of overheating
   * - warning: High TOG values (3.5+ for Dutch conditions) or unsafe room temperatures
   * - info: Low room temperature or other informational warnings
   *
   * Uses SAFETY_LIMITS constants from tog-constants.ts which align with:
   * - VeiligheidNL (Dutch safety guidelines)
   * - NHS (UK National Health Service)
   * - Lullaby Trust (SIDS prevention)
   *
   * Uses memoization to prevent recalculation when dependencies haven't changed
   */
  const warnings = useMemo((): TOGWarning[] => {
    const result: TOGWarning[] = []

    if (totaleTOG > SAFETY_LIMITS.MAX_SAFE_TOG) {
      result.push({
        type: 'critical',
        titel: 'Totale TOG boven veilige limiet!',
        tekst: 'Maximum veilig: 4.0 TOG. Verwijder een laag om oververhitting en wiegendood risico te verminderen.'
      })
    } else if (totaleTOG >= SAFETY_LIMITS.HIGH_TOG_WARNING) {
      result.push({
        type: 'warning',
        titel: 'Zeer hoge TOG-waarde!',
        tekst: 'Dit is te warm voor Nederlandse omstandigheden (ideaal: 2.5-3.0 TOG bij 18-20°C). Verwijder een laag om oververhitting te voorkomen.'
      })
    }

    if (kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP) {
      result.push({
        type: 'info',
        titel: 'Lage kamertemperatuur',
        tekst: 'Kamertemperatuur is lager dan aanbevolen (16-20°C). Gebruik 3.5 TOG slaapzak met warme kleding.'
      })
    }

    if (kamerTemp > SAFETY_LIMITS.MAX_ROOM_TEMP) {
      result.push({
        type: 'warning',
        titel: 'Hoge kamertemperatuur',
        tekst: 'Kamertemperatuur is hoog. Risico op oververhitting! Gebruik maximaal 0.5 TOG.'
      })
    }

    return result
  }, [totaleTOG, kamerTemp])

  return {
    aanbevolenTOGRange,
    kledingTOG,
    dekenTOG,
    totaleTOG,
    status,
    warnings
  }
}
