import CalculatorClient from './CalculatorClient'

export const metadata = {
  title: 'TOG Calculator: bereken de juiste TOG-waarde | TOGWaarde.nl',
  description: 'Bereken met de gratis TOG calculator de juiste TOG-waarde op basis van kamertemperatuur en kleding. Voorkom oververhitting, houd het totaal veilig onder 4.0 TOG.',
  keywords: 'tog calculator, tog-waarde berekenen, juiste tog-waarde, tog op basis van kamertemperatuur, babyslaapzak tog berekenen, veilige slaaptemperatuur, tog kledingadvies',
  alternates: { canonical: '/calculator/' },
}

// WebApplication-schema (google-plan §5)
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TOG Calculator - Bereken de TOG van jouw combinatie',
  description: 'Bereken de totale TOG-waarde van slaapzak plus kleding op basis van de kamertemperatuur, met bewaking van de veilige 4.0-grens.',
  url: 'https://togwaarde.nl/calculator/',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: 'TOGWaarde.nl' },
  featureList: [
    'Totale TOG-berekening van slaapzak en kledinglagen',
    'Slaapzak-, dekens- en zonder-slaapzak modus',
    'Leeftijdsspecifieke veiligheidsregels (geen losse deken onder 12 maanden)',
    'Advies per kamertemperatuur volgens NHS en VeiligheidNL'
  ]
}

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <CalculatorClient />
    </>
  )
}
