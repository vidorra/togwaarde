import CalculatorClient from './CalculatorClient'

export const metadata = {
  title: 'TOG Calculator: bereken de juiste TOG-waarde | TOGWaarde.nl',
  description: 'Bereken met de gratis TOG calculator de juiste TOG-waarde op basis van kamertemperatuur en kleding. Voorkom oververhitting, houd het totaal veilig onder 4.0 TOG.',
  keywords: 'tog calculator, tog-waarde berekenen, juiste tog-waarde, tog op basis van kamertemperatuur, babyslaapzak tog berekenen, veilige slaaptemperatuur, tog kledingadvies',
  alternates: { canonical: '/calculator/' },
}

export default function CalculatorPage() {
  return <CalculatorClient />
}
