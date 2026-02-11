'use client'
import React, { useState, useEffect } from 'react'

// Sub-components
import {
  RoomInfoCard,
  ClothingSelector,
  TOGResultsPanel,
  TOGInfoModal,
  TOGDisclaimer
} from './calculator'

// Custom hooks
import { useTOGCalculation } from '../hooks/useTOGCalculation'
import { useWeatherLocation } from '../hooks/useWeatherLocation'

// Constants and types
import { TEMP_SLIDER_CONFIG, SAFETY_LIMITS } from '../lib/tog-constants'
import type { TOGCalculatorProps, BabyLeeftijd } from '../lib/tog-types'

/**
 * TOGCalculator - Hoofdcomponent voor de TOG waarde calculator
 *
 * Berekent de optimale TOG-waarde voor babyslaap op basis van:
 * - Kamertemperatuur
 * - Geselecteerde kleding
 * - Slaapzak of dekens
 */
export default function TOGCalculator({ titleTag = 'h2' }: TOGCalculatorProps): JSX.Element {
  // Weather and location state (from custom hook)
  const {
    buitenTemp,
    locationCity,
    seizoen,
    setSeizoen
  } = useWeatherLocation()

  // Calculator state
  const [kamerTemp, setKamerTemp] = useState<number>(TEMP_SLIDER_CONFIG.default)
  const [slaapzakTOG, setSlaapzakTOG] = useState<number>(1.0)
  const [gekozenKleding, setGekozenKleding] = useState<string[]>(['luier', 'lange_romper'])
  const [gekozenDekens, setGekozenDekens] = useState<string[]>([])
  const [babyLeeftijd, setBabyLeeftijd] = useState<BabyLeeftijd>(SAFETY_LIMITS.LOOSE_BLANKET_MIN_AGE as BabyLeeftijd)
  const [gebruikDekens, setGebruikDekens] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  // TOG calculations (from custom hook)
  const {
    aanbevolenTOGRange,
    totaleTOG,
    status,
    warnings
  } = useTOGCalculation({
    kamerTemp,
    slaapzakTOG,
    gekozenKleding,
    gekozenDekens,
    gebruikDekens
  })

  // Clear loose blanket selection if age changes to under 12 months
  useEffect(() => {
    if (babyLeeftijd !== SAFETY_LIMITS.LOOSE_BLANKET_MIN_AGE && gekozenDekens.includes('los_deken')) {
      setGekozenDekens(gekozenDekens.filter(d => d !== 'los_deken'))
    }
  }, [babyLeeftijd, gekozenDekens])

  // Title component based on titleTag prop
  const TitleComponent = titleTag === 'h1' ? 'h1' : 'h2'

  return (
    <div className="mx-auto px-4 py-6 bg-white rounded-3xl">
      {/* Info Modal */}
      <TOGInfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />

      {/* Calculator Title */}
      <TitleComponent className="text-3xl text-center md:text-4xl font-bold text-gray-900 w-full mx-6 mt-4 mb-4">
        Calculator
      </TitleComponent>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Input Section */}
        <div className="space-y-6">
          {/* Room Info Card */}
          <RoomInfoCard
            kamerTemp={kamerTemp}
            setKamerTemp={setKamerTemp}
            buitenTemp={buitenTemp}
            locationCity={locationCity}
            seizoen={seizoen}
            setSeizoen={setSeizoen}
          />

          {/* Clothing Selector */}
          <ClothingSelector
            gekozenKleding={gekozenKleding}
            setGekozenKleding={setGekozenKleding}
            gekozenDekens={gekozenDekens}
            setGekozenDekens={setGekozenDekens}
            slaapzakTOG={slaapzakTOG}
            setSlaapzakTOG={setSlaapzakTOG}
            gebruikDekens={gebruikDekens}
            setGebruikDekens={setGebruikDekens}
            babyLeeftijd={babyLeeftijd}
            onShowInfoModal={() => setShowInfoModal(true)}
          />
        </div>

        {/* Right Column - Results Section */}
        <TOGResultsPanel
          totaleTOG={totaleTOG}
          aanbevolenTOGRange={aanbevolenTOGRange}
          status={status}
          warnings={warnings}
          kamerTemp={kamerTemp}
          gekozenKleding={gekozenKleding}
          gekozenDekens={gekozenDekens}
          slaapzakTOG={slaapzakTOG}
          gebruikDekens={gebruikDekens}
        />
      </div>

      {/* Footer Disclaimer */}
      <TOGDisclaimer />
    </div>
  )
}
