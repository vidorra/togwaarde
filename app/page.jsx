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

export default function Page() {
  return <HomeClient />
}
