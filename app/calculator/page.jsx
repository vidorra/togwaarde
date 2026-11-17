import CalculatorClient from './CalculatorClient'

export const metadata = {
  title: 'TOG Calculator: bereken de juiste TOG-waarde | TOGWaarde.nl',
  description: 'Bereken met de gratis TOG calculator de juiste TOG-waarde op basis van kamertemperatuur, en zie welke kleding eronder past. Zo voorkom je dat je baby het te warm krijgt.',
  keywords: 'tog calculator, tog-waarde berekenen, juiste tog-waarde, tog op basis van kamertemperatuur, babyslaapzak tog berekenen, veilige slaaptemperatuur, tog kledingadvies',
  alternates: { canonical: '/calculator/' },
}

// WebApplication-schema (google-plan §5)
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TOG Calculator - Bereken de TOG van jouw combinatie',
  description: 'Check of slaapzak en kleding passen bij de kamertemperatuur: welke slaapzak-TOG fabrikanten aanraden en welke kleding eronder hoort.',
  url: 'https://togwaarde.nl/calculator/',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: 'TOGWaarde.nl' },
  featureList: [
    'Slaapzak-TOG en kleding vergeleken met het advies voor de kamertemperatuur',
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
