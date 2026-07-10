import HomeClient from './HomeClient'

export const metadata = {
  title: 'Gratis TOG Calculator voor Babyslaapzak | TOGWaarde.nl',
  description: 'Bereken gratis welke TOG-waarde slaapzak en kleding je baby nodig heeft. Stel de kamertemperatuur in en zie meteen het juiste, veilige slaapadvies.',
  keywords: [
    'tog waarde',
    'tog calculator',
    'babyslaapzak',
    'slaapzak temperatuur',
    'tog waarde slaapzak',
    'kamertemperatuur baby',
    'veilig slapen baby'
  ],
  alternates: {
    canonical: '/'
  }
}

// WebApplication-schema (google-plan §5): vertelt Google dat dit een
// gratis interactieve tool is, kanshebber voor rich results
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TOG Calculator - Kledingadvies per temperatuur',
  description: 'Stel de kamertemperatuur in en zie direct welke TOG-slaapzak en kleding je baby veilig aan kan.',
  url: 'https://togwaarde.nl/',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: 'TOGWaarde.nl' },
  featureList: [
    'Kledingadvies per kamertemperatuur (omgekeerde TOG-calculator)',
    'Gebaseerd op NHS, Lullaby Trust en VeiligheidNL richtlijnen',
    'Veilige TOG-grens van 4.0 bewaakt',
    'Actueel nachttemperatuur-advies per locatie'
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <HomeClient />
    </>
  )
}
