import KennisbankClient from './KennisbankClient'

export const metadata = {
  title: 'Kennisbank TOG-waardes voor veilige babyslaap | TOGWaarde.nl',
  description: 'Kennisbank over TOG-waardes voor babyslaapzakken: uitleg TOG-schaal, ideale kamertemperatuur 16-18°C, seizoensadvies en veilig slapen. Evidence-based artikelen.',
  keywords: 'kennisbank tog, tog-waarde uitleg, babyslaapzak tog, veilige slaaptemperatuur, tog per seizoen, ideale kamertemperatuur baby, wiegendood preventie',
  alternates: { canonical: '/kennisbank/' },
}

export default function KennisbankPage() {
  return <KennisbankClient />
}
