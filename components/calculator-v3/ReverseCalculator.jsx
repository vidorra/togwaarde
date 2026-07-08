'use client'
import { useState, useEffect, useRef } from 'react'
import {
  Thermometer,
  Sun,
  Snowflake,
  Moon,
  Leaf,
  Flower,
  Bed,
  Shirt,
  Info,
  AlertTriangle
} from 'lucide-react'
import { useWeatherLocation } from '../../hooks/useWeatherLocation'
import {
  TEMP_SLIDER_CONFIG,
  SAFETY_LIMITS,
  KLEDING_WAARDEN,
  TOG_RECOMMENDATIONS
} from '../../lib/tog-constants'
import AffiliateProductWidget from '../AffiliateProductWidget'
import { trackCalculatorUsage } from '../../lib/analytics'

function SeasonIcon({ seizoen }) {
  switch (seizoen) {
    case 'winter': return <Snowflake className="w-4 h-4" />
    case 'zomer': return <Sun className="w-4 h-4" />
    case 'herfst': return <Leaf className="w-4 h-4" />
    case 'lente': return <Flower className="w-4 h-4" />
    default: return <Sun className="w-4 h-4" />
  }
}

// Recommended total TOG range for a room temperature (same bands as the calculator)
function getRange(temp) {
  for (const rec of TOG_RECOMMENDATIONS) {
    if (temp >= rec.minTemp) return rec.range
  }
  return TOG_RECOMMENDATIONS[TOG_RECOMMENDATIONS.length - 1].range
}

// Reverse advice: given a temperature, what to actually put on the baby.
// Aligned with NHS / VeiligheidNL bands and Dutch consumer guidance.
function getReverseAdvies(temp) {
  // Slaapzak + kleding (incl. luier 0.1) blijft binnen het aanbevolen bereik
  // en altijd ruim onder de 4.0 TOG veiligheidsgrens. Totalen ter controle:
  // 27+ →0.1 · 24-26 →0.6 · 22-23 →0.8 · 20-21 →1.3 · 18-19 →2.8 · 16-17 →3.4 · <16 →3.6
  if (temp >= 27) return { slaapzakTOG: 0, kleding: ['luier'], geenSlaapzak: true }
  if (temp >= 24) return { slaapzakTOG: 0.5, kleding: ['luier'] }
  if (temp >= 22) return { slaapzakTOG: 0.5, kleding: ['korte_romper'] }
  if (temp >= 20) return { slaapzakTOG: 1.0, kleding: ['korte_romper'] }
  if (temp >= 18) return { slaapzakTOG: 2.5, kleding: ['korte_romper'] }
  if (temp >= 16) return { slaapzakTOG: 2.5, kleding: ['lange_romper'] }
  return { slaapzakTOG: 3.5, kleding: ['luier'] }
}

export default function ReverseCalculator({ titleTag = 'h2', affiliatePageId = 'reverse-slaapzakken' }) {
  const TitleComponent = titleTag === 'h1' ? 'h1' : 'h2'
  const { buitenTemp, locationCity, seizoen, setSeizoen } = useWeatherLocation()
  const [kamerTemp, setKamerTemp] = useState(TEMP_SLIDER_CONFIG.default)

  // GA4: fire calculator_usage once per pageview, only after the user
  // actually interacts (the calculator shows a default advies on load) and
  // debounced so slider-dragging doesn't count every intermediate value.
  const mountedRef = useRef(false)
  const hasTrackedRef = useRef(false)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    if (hasTrackedRef.current) return
    const timer = setTimeout(() => {
      if (hasTrackedRef.current) return
      hasTrackedRef.current = true
      const adviesNu = getReverseAdvies(kamerTemp)
      trackCalculatorUsage('reverse_advies', {
        kamer_temp: kamerTemp,
        advies_slaapzak_tog: adviesNu.geenSlaapzak ? 'geen' : adviesNu.slaapzakTOG,
      })
    }, 1200)
    return () => clearTimeout(timer)
  }, [kamerTemp])

  const advies = getReverseAdvies(kamerTemp)
  const range = getRange(kamerTemp)
  const isWarm = kamerTemp > SAFETY_LIMITS.MAX_ROOM_TEMP
  const isKoud = kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP
  const tempLabel = kamerTemp >= TEMP_SLIDER_CONFIG.max ? `${kamerTemp}°C+` : `${kamerTemp}°C`

  const kledingNamen = (advies.kleding.length === 1 && advies.kleding[0] === 'luier')
    ? 'Alleen een luier'
    : advies.kleding.map((k) => KLEDING_WAARDEN[k]?.naam || k).join(' + ')

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <TitleComponent className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Wat trekt mijn baby aan?
        </TitleComponent>
        <p className="text-sm text-text-secondary">
          Stel de kamertemperatuur in — wij vertellen je meteen welke slaapzak en kleding veilig zijn.
        </p>
      </div>

      {/* Temperatuur card */}
      <div className="bg-white rounded-3xl border border-border shadow-sm p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <Thermometer className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-text-primary leading-snug">Kamertemperatuur</h3>
              <p className="text-xs text-text-secondary mt-0.5">Meet de slaapkamer met een thermometer</p>
            </div>
          </div>
          <span className="text-xl font-bold text-primary flex-shrink-0">{tempLabel}</span>
        </div>

        <div className="px-1">
          <input
            type="range"
            min={TEMP_SLIDER_CONFIG.min}
            max={TEMP_SLIDER_CONFIG.max}
            value={kamerTemp}
            onChange={(e) => setKamerTemp(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-300 via-green-300 to-red-300"
            aria-label="Kamertemperatuur in graden Celsius"
            aria-valuenow={kamerTemp}
          />
          <div className="flex justify-between mt-2 text-xs text-text-secondary">
            <span className="flex items-center gap-1"><Snowflake className="w-3 h-3" /> {TEMP_SLIDER_CONFIG.min}°</span>
            <span className="font-medium text-primary">Ideaal 16–20°</span>
            <span className="flex items-center gap-1">{TEMP_SLIDER_CONFIG.max}°+ <Sun className="w-3 h-3" /></span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[16, 18, 20, 22].map((t) => (
            <button
              key={t}
              onClick={() => setKamerTemp(t)}
              className={`min-h-[44px] py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                kamerTemp === t
                  ? 'bg-primary text-white border-primary'
                  : 'bg-background text-text-primary border-transparent hover:border-primary/30'
              }`}
            >
              {t}°
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-background">
          <Moon className="w-5 h-5 text-secondary-dark flex-shrink-0" />
          <div className="flex-1 text-sm">
            <span className="text-text-secondary">Vannacht{locationCity ? ` in ${locationCity}` : ''}: </span>
            <span className="font-semibold text-text-primary">{buitenTemp}°C</span>
          </div>
          <div className="relative">
            <select
              value={seizoen}
              onChange={(e) => setSeizoen(e.target.value)}
              className="appearance-none bg-white border border-border rounded-lg pl-7 pr-3 py-2.5 text-sm font-medium capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Seizoen"
            >
              <option value="winter">winter</option>
              <option value="lente">lente</option>
              <option value="zomer">zomer</option>
              <option value="herfst">herfst</option>
            </select>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <SeasonIcon seizoen={seizoen} />
            </div>
          </div>
        </div>
      </div>

      {/* Advies card */}
      <div className="bg-white rounded-3xl border-2 border-primary/20 shadow-sm p-6 mt-4">
        <div className="text-center mb-5">
          <div className="text-sm text-text-secondary">Bij een kamertemperatuur van</div>
          <div className="text-3xl font-bold text-primary my-1">{tempLabel}</div>
          <div className="text-sm text-text-secondary">adviseren wij:</div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-primary/5 text-center flex flex-col justify-center">
            <Bed className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-[10px] uppercase tracking-wide text-text-secondary">Slaapzak</div>
            {advies.geenSlaapzak ? (
              <div className="text-lg font-bold text-primary leading-tight mt-1">Geen slaapzak<br /><span className="text-xs font-normal text-text-secondary">te warm</span></div>
            ) : (
              <div className="text-2xl font-bold text-primary leading-none mt-1">{advies.slaapzakTOG} TOG</div>
            )}
          </div>
          <div className="p-4 rounded-2xl bg-background text-center flex flex-col justify-center">
            <Shirt className="w-6 h-6 text-secondary-dark mx-auto mb-2" />
            <div className="text-[10px] uppercase tracking-wide text-text-secondary">Kleding eronder</div>
            <div className="text-sm font-semibold text-text-primary mt-1">{kledingNamen}</div>
          </div>
        </div>

        <p className="text-xs text-text-secondary text-center mt-4">
          Aanbevolen totaal {range.min.toFixed(1)}–{range.max.toFixed(1)} TOG · veilig tot 4.0 TOG (NHS / VeiligheidNL)
        </p>

        {/* Safety note */}
        <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2 text-sm text-blue-800">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            Voel in het nekje of aan de rug: lauwwarm en droog betekent goed. Te warm is gevaarlijker dan te koud — kies bij twijfel een laagje minder.
          </span>
        </div>

        {advies.geenSlaapzak && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Te warm voor een slaapzak. Alleen een luier is genoeg — eventueel een dun hydrofiel laken. Zorg voor frisse lucht en controleer je baby extra.</span>
          </div>
        )}
        {isWarm && !advies.geenSlaapzak && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Boven 24°C: risico op oververhitting. Gebruik een dunne slaapzak (max 0.5 TOG) en houd de kleding minimaal.</span>
          </div>
        )}
        {isKoud && (
          <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2 text-sm text-blue-800">
            <Snowflake className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Onder 16°C: verhoog liefst de kamertemperatuur. Gebruik anders een 3.5 TOG slaapzak met warme kleding eronder.</span>
          </div>
        )}
      </div>

      {/* Affiliate: slaapzakken met de aanbevolen TOG */}
      <div className="mt-6">
        <AffiliateProductWidget
          pageId={affiliatePageId}
          filterTag={advies.geenSlaapzak ? '0.5' : String(advies.slaapzakTOG)}
          hideIndex
          title={advies.geenSlaapzak ? 'Dunne zomerslaapzak (voor koelere nachten)' : `Slaapzakken met TOG ${advies.slaapzakTOG}`}
        />
      </div>
    </div>
  )
}
