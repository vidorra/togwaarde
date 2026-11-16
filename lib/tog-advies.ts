/**
 * Advies per kamertemperatuur: welke slaapzak en welke kleding eronder.
 * Eén bron voor de calculator op de homepage (ReverseCalculator) en de
 * tabel op de TOG-waarde-gids, zodat die nooit uit elkaar lopen.
 */
import { KLEDING_WAARDEN, TOG_RECOMMENDATIONS } from './tog-constants'

export type KledingKey = keyof typeof KLEDING_WAARDEN

export interface ReverseAdvies {
  slaapzakTOG: number
  kleding: KledingKey[]
  geenSlaapzak?: boolean
}

// Aanbevolen totale TOG-bereik voor een kamertemperatuur
export function getRange(temp: number) {
  for (const rec of TOG_RECOMMENDATIONS) {
    if (temp >= rec.minTemp) return rec.range
  }
  return TOG_RECOMMENDATIONS[TOG_RECOMMENDATIONS.length - 1].range
}

// Slaapzak + kleding (incl. luier 0.1) blijft binnen het aanbevolen bereik
// en altijd ruim onder de 4.0 TOG veiligheidsgrens. Totalen ter controle:
// 27+ →0.1 · 24-26 →0.6 · 22-23 →0.8 · 20-21 →1.3 · 18-19 →2.8 · 16-17 →3.4 · <16 →3.6
export function getReverseAdvies(temp: number): ReverseAdvies {
  if (temp >= 27) return { slaapzakTOG: 0, kleding: ['luier'], geenSlaapzak: true }
  if (temp >= 24) return { slaapzakTOG: 0.5, kleding: ['luier'] }
  if (temp >= 22) return { slaapzakTOG: 0.5, kleding: ['korte_romper'] }
  if (temp >= 20) return { slaapzakTOG: 1.0, kleding: ['korte_romper'] }
  if (temp >= 18) return { slaapzakTOG: 2.5, kleding: ['korte_romper'] }
  if (temp >= 16) return { slaapzakTOG: 2.5, kleding: ['lange_romper'] }
  return { slaapzakTOG: 3.5, kleding: ['luier'] }
}

// De temperatuurbanden waarop het advies wisselt, voor tabellen
// (min/max in hele graden; null = open kant)
export interface TempBand { label: string; temp: number; min: number | null; max: number | null }
export const TEMP_BANDEN: readonly TempBand[] = [
  { label: '27°C of warmer', temp: 27, min: 27, max: null },
  { label: '24 tot 26°C', temp: 24, min: 24, max: 26 },
  { label: '22 tot 23°C', temp: 22, min: 22, max: 23 },
  { label: '20 tot 21°C', temp: 20, min: 20, max: 21 },
  { label: '18 tot 19°C', temp: 18, min: 18, max: 19 },
  { label: '16 tot 17°C', temp: 16, min: 16, max: 17 },
  { label: 'Onder 16°C', temp: 15, min: null, max: 15 }
]

// Bij welke kamertemperaturen adviseert de calculator deze slaapzak-TOG?
// Geeft bv. "22 tot 26°C", "onder 16°C" of null als hij nergens geadviseerd wordt.
export function tempBereikVoorSlaapzak(tog: number): string | null {
  const banden = TEMP_BANDEN.filter((b) => {
    const a = getReverseAdvies(b.temp)
    return !a.geenSlaapzak && Math.abs(a.slaapzakTOG - tog) < 0.01
  })
  if (banden.length === 0) return null
  const mins = banden.map((b) => b.min)
  const maxs = banden.map((b) => b.max)
  const min = mins.includes(null) ? null : Math.min(...(mins as number[]))
  const max = maxs.includes(null) ? null : Math.max(...(maxs as number[]))
  if (min === null && max !== null) return `onder ${max + 1}°C`
  if (max === null && min !== null) return `${min}°C of warmer`
  return `${min} tot ${max}°C`
}

export function kledingNamen(advies: ReverseAdvies): string {
  if (advies.kleding.length === 1 && advies.kleding[0] === 'luier') return 'Alleen een luier'
  // De luier zit altijd onder de kleding; alleen de kleding zelf noemen
  return advies.kleding.map((k) => KLEDING_WAARDEN[k]?.naam || k).join(' + ')
}

// Totale TOG inclusief luier (0.1), afgerond op één decimaal
export function totaalTOG(advies: ReverseAdvies): number {
  const kleding = advies.kleding.reduce((som, k) => som + (KLEDING_WAARDEN[k]?.TOG || 0), 0)
  const luier = advies.kleding.includes('luier') ? 0 : KLEDING_WAARDEN.luier.TOG
  return Math.round((advies.slaapzakTOG + kleding + luier) * 10) / 10
}
