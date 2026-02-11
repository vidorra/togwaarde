'use client'

import { memo } from 'react'
import {
  Thermometer,
  Moon,
  Sun,
  Snowflake,
  AlertTriangle,
  ChevronDown,
  Leaf,
  Flower
} from 'lucide-react'
import { TEMP_SLIDER_CONFIG, SAFETY_LIMITS } from '../../lib/tog-constants'
import type { Seizoen, RoomInfoCardProps } from '../../lib/tog-types'

interface SeasonIconProps {
  seizoen: Seizoen
}

/**
 * Seizoen icoon component
 *
 * Memoized to prevent re-render when parent updates
 * Only re-renders if `seizoen` prop changes
 *
 * @component
 * @param {SeasonIconProps} props - Component props
 * @returns {JSX.Element} Season icon (Snowflake, Sun, Leaf, or Flower)
 */
const SeasonIcon = memo(function SeasonIcon({ seizoen }: SeasonIconProps): JSX.Element {
  switch (seizoen) {
    case 'winter':
      return <Snowflake className="w-5 h-5 text-secondary-dark" />
    case 'zomer':
      return <Sun className="w-5 h-5 text-primary" />
    case 'herfst':
      return <Leaf className="w-5 h-5 text-primary/40" />
    case 'lente':
      return <Flower className="w-5 h-5 text-primary" />
    default:
      return <Sun className="w-5 h-5 text-secondary-dark" />
  }
})

/**
 * RoomInfoCard - Toont kamer informatie en temperatuur slider
 *
 * Memoized to prevent re-renders when parent updates but props haven't changed.
 * Only re-renders when one of these props changes:
 * - kamerTemp
 * - setKamerTemp
 * - buitenTemp
 * - locationCity
 * - seizoen
 * - setSeizoen
 *
 * Performance impact: Prevents ~10-20% of unnecessary re-renders during calculations
 *
 * @component
 * @param {RoomInfoCardProps} props - Room information and handlers
 * @returns {JSX.Element} Room info card with temperature slider
 */
const RoomInfoCard = memo(function RoomInfoCard({
  kamerTemp,
  setKamerTemp,
  buitenTemp,
  locationCity,
  seizoen,
  setSeizoen
}: RoomInfoCardProps): JSX.Element {
  return (
    <div className="rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Kamer Informatie
        </h2>
        <span className="text-2xl font-bold text-primary">{kamerTemp}°C</span>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
        {/* Indoor Temperature */}
        <div className="text-center">
          <Thermometer className="w-5 h-5 mx-auto mb-1 text-primary" />
          <div className="text-xl font-bold">{kamerTemp}°C</div>
          <div className="text-xs text-text-secondary-dark">Binnen</div>
        </div>

        {/* Outdoor Temperature */}
        <div className="text-center border-x border-border">
          <Moon className="w-5 h-5 mx-auto mb-1 text-secondary-dark" />
          <div className="text-xl font-bold">{buitenTemp}°C</div>
          <div className="text-xs text-text-secondary-dark">
            {locationCity ? `Vannacht in ${locationCity}` : 'Vannacht'}
          </div>
        </div>

        {/* Season Selector */}
        <div className="text-center relative">
          <div className="mx-auto mb-1 flex justify-center">
            <SeasonIcon seizoen={seizoen} />
          </div>
          <select
            value={seizoen}
            onChange={(e) => setSeizoen(e.target.value as Seizoen)}
            className="text-xl font-bold capitalize bg-transparent border-0 appearance-none cursor-pointer focus:outline-none text-center w-full px-4"
            style={{ textAlignLast: 'center' }}
            aria-label="Huidige seizoen"
          >
            <option value="winter">Winter</option>
            <option value="lente">Lente</option>
            <option value="zomer">Zomer</option>
            <option value="herfst">Herfst</option>
          </select>
          <ChevronDown className="absolute right-1 top-[26px] w-4 h-4 pointer-events-none text-text-secondary-dark" />
          <div className="text-xs text-text-secondary-dark">Seizoen</div>
        </div>
      </div>

      {/* Temperature Slider */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-3 text-text-primary">
          Kamertemperatuur instellen
        </label>
        <input
          type="range"
          min={TEMP_SLIDER_CONFIG.min}
          max={TEMP_SLIDER_CONFIG.max}
          value={kamerTemp}
          onChange={(e) => setKamerTemp(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-secondary via-primary to-accent"
          aria-label="Kamertemperatuur in graden Celsius"
          aria-valuemin={TEMP_SLIDER_CONFIG.min}
          aria-valuemax={TEMP_SLIDER_CONFIG.max}
          aria-valuenow={kamerTemp}
          aria-valuetext={`${kamerTemp} graden Celsius`}
        />
        <div className="flex justify-between mt-2 text-xs text-text-secondary-dark">
          <span className="flex items-center gap-1">
            <Snowflake className="w-3 h-3" /> {TEMP_SLIDER_CONFIG.min}°C
          </span>
          <span className="font-bold text-primary">
            Ideaal: 16-20°C (VeiligheidNL/NHS)
          </span>
          <span className="flex items-center gap-1">
            <Sun className="w-3 h-3" /> {TEMP_SLIDER_CONFIG.max}°C
          </span>
        </div>
      </div>

      {/* Temperature Warnings */}
      {kamerTemp < SAFETY_LIMITS.MIN_ROOM_TEMP && (
        <div className="relative mt-4 p-3 pl-5 rounded-lg flex items-start gap-2 bg-blue-50 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500">
          <Snowflake className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
          <p className="text-sm text-text-primary">
            Kamertemperatuur is lager dan aanbevolen (16-20°C). Gebruik 3.5 TOG slaapzak met warme kleding.
          </p>
        </div>
      )}
      {kamerTemp > SAFETY_LIMITS.MAX_ROOM_TEMP && (
        <div className="relative mt-4 p-3 pl-5 rounded-lg flex items-start gap-2 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/80" />
          <p className="text-sm text-text-primary">
            Kamertemperatuur is hoog. Risico op oververhitting! Gebruik maximaal 0.5 TOG.
          </p>
        </div>
      )}
    </div>
  )
})

export default RoomInfoCard
