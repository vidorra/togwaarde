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
import { getReverseAdvies, kledingNamen } from '../lib/tog-advies'

// Kleding mag zoveel TOG (geschat) van het advies afwijken zonder dat het
// oordeel verschuift: een romper met lange mouw meer of minder is prima.
const KLEDING_SPELING = 0.6

function kledingZonderLuier(keys: readonly string[]): number {
  return keys.filter((k) => k !== 'luier').reduce((som, k) => som + (KLEDING_WAARDEN[k]?.TOG || 0), 0)
}

/**
 * Parameters for the useTOGCalculation hook
 * @interface UseTOGCalculationParams
 * @property {number} kamerTemp - Room temperature in Celsius (14-27°C)
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
   * Totaal van alle lagen. Alleen nog voor de anonieme statistiek: het oordeel
   * hieronder telt kleding niet meer op bij de slaapzak.
   */
  const totaleTOG = useMemo((): number => {
    const basisTOG = kledingTOG + dekenTOG
    return gebruikDekens ? basisTOG : slaapzakTOG + basisTOG
  }, [kledingTOG, dekenTOG, slaapzakTOG, gebruikDekens])

  // Fabrikantenmanier (17-11-2026): de TOG van een slaapzak geldt mét gewone
  // nachtkleding eronder. We vergelijken dus de slaapzak (of deken) met het
  // bereik voor de kamertemperatuur, en de kleding met de kleding uit het
  // advies (lib/tog-advies.ts). Wijkt de kleding meer dan KLEDING_SPELING af,
  // dan schuift dat het oordeel op. De luier telt aan beide kanten niet mee.
  const advies = useMemo(() => getReverseAdvies(kamerTemp), [kamerTemp])
  const jouwTOG = gebruikDekens ? dekenTOG : slaapzakTOG

  const effectieveTOG = useMemo((): number => {
    const afwijking = kledingZonderLuier(gekozenKleding) - kledingZonderLuier(advies.kleding)
    const correctie = Math.abs(afwijking) <= KLEDING_SPELING
      ? 0
      : afwijking - Math.sign(afwijking) * KLEDING_SPELING
    return jouwTOG + correctie
  }, [gekozenKleding, advies, jouwTOG])

  const status = useMemo((): CalculatorStatus => {
    const { min, max } = aanbevolenTOGRange
    // Uniform message tail for every alert; the component bolds this clause.
    const bijTekst = `voor een kamertemperatuur van ${Math.round(kamerTemp)}°C!`
    const bereik = min === max ? min.toFixed(1) : `${min.toFixed(1)} tot ${max.toFixed(1)}`
    const adviesTekst = advies.geenSlaapzak
      ? 'Advies: geen slaapzak, alleen een luier.'
      : `Advies: slaapzak ${bereik} TOG met ${kledingNamen(advies).toLowerCase()} eronder.`
    const laag = gebruikDekens ? 'slaapzak of deken' : 'slaapzak'

    if (effectieveTOG < min) {
      const actie = jouwTOG < min ? `Kies een warmere ${laag}.` : 'Trek je baby iets warmer aan.'
      const kamer = kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP ? ' Of verwarm de kamer naar minimaal 16°C.' : ''
      if (min - effectieveTOG > 0.5) {
        return { status: 'te_koud', kleur: 'red', titel: 'Aanpassing nodig', tekst: `Te koud ${bijTekst} ${actie}${kamer} ${adviesTekst}` }
      }
      return { status: 'iets_te_koud', kleur: 'orange', titel: 'Let op', tekst: `Iets te koud ${bijTekst} ${actie}${kamer} ${adviesTekst}` }
    }

    if (effectieveTOG > max) {
      const actie = jouwTOG > max ? `Kies een dunnere ${laag}.` : 'Trek je baby een laagje minder aan.'
      if (effectieveTOG - max > 0.5) {
        return { status: 'te_warm', kleur: 'red', titel: 'Aanpassing nodig', tekst: `Te warm ${bijTekst} ${actie} ${adviesTekst}` }
      }
      return { status: 'iets_te_warm', kleur: 'orange', titel: 'Let op', tekst: `Iets te warm ${bijTekst} ${actie} ${adviesTekst}` }
    }

    return {
      status: 'perfect',
      kleur: 'green',
      titel: 'Perfect!',
      tekst: `Perfect ${bijTekst} Slaapzak en kleding passen bij de kamer.`
    }
  }, [effectieveTOG, jouwTOG, aanbevolenTOGRange, kamerTemp, advies, gebruikDekens])

  const warnings = useMemo((): TOGWarning[] => {
    const result: TOGWarning[] = []

    if (kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP) {
      result.push({
        type: 'info',
        titel: 'Lage kamertemperatuur',
        tekst: 'Kouder dan de aanbevolen 16 tot 20°C. Verwarm liefst de kamer. Gebruik anders een 3.5 TOG slaapzak met een romper met lange mouw en een slaappakje eronder.'
      })
    }

    if (kamerTemp >= SAFETY_LIMITS.HEATWAVE_ROOM_TEMP) {
      result.push({
        type: 'critical',
        titel: 'Erg warm: alleen een luier',
        tekst: 'Vanaf 27°C is een slaapzak of deken te warm. Laat je baby alleen in een luier slapen, hooguit met een dun kortemouw-hemdje, zonder slaapzak of deken. Koel de kamer overdag met gesloten gordijnen, lucht ’s nachts (eventueel een ventilator die niet direct op je baby gericht staat), bied extra vocht aan en let goed op tekenen van oververhitting.'
      })
    } else if (kamerTemp > SAFETY_LIMITS.MAX_ROOM_TEMP) {
      result.push({
        type: 'warning',
        titel: 'Hoge kamertemperatuur',
        tekst: 'Kamertemperatuur is hoog. Risico op oververhitting! Gebruik maximaal 0.5 TOG.'
      })
    }

    return result
  }, [kamerTemp])

  return {
    aanbevolenTOGRange,
    jouwTOG,
    advies,
    adviesKleding: kledingNamen(advies),
    kledingTOG,
    dekenTOG,
    totaleTOG,
    status,
    warnings
  }
}
