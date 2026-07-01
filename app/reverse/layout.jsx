export const metadata = {
  title: 'Wat moet mijn baby aan bij deze temperatuur? | TOG Advies',
  description: 'Stel de kamertemperatuur in en zie direct welke TOG-slaapzak en kleding je baby veilig aan kan. Gebaseerd op NHS, Lullaby Trust en VeiligheidNL.',
  keywords: 'welke kleding baby nacht temperatuur, welke tog slaapzak, wat baby aan in bed, tog waarde per temperatuur, baby aankleden nacht',
  alternates: { canonical: 'https://togwaarde.nl/reverse' },
  openGraph: {
    title: 'Wat moet mijn baby aan bij deze temperatuur?',
    description: 'Stel de kamertemperatuur in en zie direct welke slaapzak en kleding veilig zijn voor je baby.',
    url: 'https://togwaarde.nl/reverse',
    siteName: 'TOGWaarde.nl',
    locale: 'nl_NL',
    type: 'website',
  },
}

export default function ReverseLayout({ children }) {
  return children
}
