'use client'

import { memo } from 'react'

/**
 * TOGDisclaimer - Footer disclaimer voor de calculator
 *
 * Memoized for consistency, though it has no props.
 * Prevents unnecessary re-renders during parent updates.
 *
 * @component
 * @returns {JSX.Element} Static disclaimer text
 */
const TOGDisclaimer = memo(function TOGDisclaimer(): JSX.Element {
  return (
    <div className="mt-8 p-6 rounded-2xl text-center bg-gray-50">
      <p className="text-sm text-text-secondary-dark mb-2">
        <strong className="text-text-primary">Disclaimer:</strong> Deze calculator
        geeft algemene adviezen gebaseerd op Nederlandse en internationale richtlijnen:
        VeiligheidNL, NCJ (Nederlands Centrum Jeugdgezondheid), NHS (UK) en The Lullaby Trust.
        De TOG-waarden voor individuele kledingstukken en dekens zijn schattingen, niet industrie-standaarden.
      </p>
      <p className="text-sm text-text-secondary-dark mb-2">
        <strong className="text-primary/80">Dekenveiligheid:</strong> Losse dekens zijn
        gevaarlijk voor baby's onder 12 maanden. Indien dekens gebruikt worden, moeten ze
        volgens de "feet to foot" methode stevig ingestopt worden. Slaapzakken (vanaf 50cm
        voor newborns) zijn altijd de veiligere keuze.
      </p>
      <p className="text-sm text-text-secondary-dark">
        Raadpleeg bij twijfel altijd je kinderarts of consultatiebureau. Elke baby is uniek
        en heeft mogelijk andere behoeften. Vertrouw op je eigen observatie en pas aan waar nodig.
      </p>
    </div>
  )
})

export default TOGDisclaimer
