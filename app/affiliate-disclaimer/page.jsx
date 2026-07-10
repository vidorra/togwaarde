import Layout from '../../components/Layout'
import Link from 'next/link'
import { ChevronRight, HeartHandshake, Euro, RefreshCw, Info } from 'lucide-react'

export const metadata = {
  title: 'Affiliate-disclaimer | TOGWaarde.nl',
  description: 'Hoe TOGWaarde.nl werkt met affiliate links van bol.com en Amazon, en hoe de getoonde prijzen tot stand komen en actueel gehouden worden.',
  robots: 'index, follow',
  alternates: { canonical: 'https://togwaarde.nl/affiliate-disclaimer' },
}

export default function AffiliateDisclaimerPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Affiliate-disclaimer</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Affiliate-disclaimer</h1>
          <p className="text-gray-600">
            Transparantie over de productaanbevelingen en prijzen op TOGWaarde.nl.
          </p>
        </header>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-primary" /> Affiliate links
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              TOGWaarde.nl toont productaanbevelingen (zoals slaapzakken) met affiliate links naar
              bol.com en Amazon. Koop je iets via zo&apos;n link, dan ontvangen wij mogelijk een
              kleine commissie van de winkel. <strong>Dit kost jou niets extra</strong>: je betaalt
              exact dezelfde prijs als wanneer je rechtstreeks naar de winkel gaat.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Met deze commissies houden we de TOG-calculator en de kennisbank gratis toegankelijk.
              De aanbevelingen selecteren we zelf op relevantie (zoals de juiste TOG-waarde bij de
              temperatuur); winkels of merken hebben geen invloed op onze adviezen.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Euro className="w-5 h-5 text-primary" /> Getoonde prijzen
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Bij producten tonen we waar mogelijk een prijs, met daarbij de datum waarop die prijs
              voor het laatst is bijgewerkt (&quot;Prijs van {'{datum}'}&quot;). Zo komen die prijzen tot stand:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li><strong>bol.com-producten:</strong> de prijs wordt dagelijks automatisch bijgewerkt op basis van de productpagina van bol.com</li>
              <li><strong>Amazon-producten:</strong> de prijs wordt handmatig door ons ingevoerd en periodiek gecontroleerd</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Prijzen in webwinkels veranderen regelmatig. De getoonde prijs kan daarom afwijken van
              de actuele prijs in de winkel. <strong>De prijs op bol.com of Amazon op het moment van
              aankoop is altijd leidend.</strong> Aan de op TOGWaarde.nl getoonde prijzen kunnen geen
              rechten worden ontleend.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" /> Beschikbaarheid
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Producten kunnen uitverkocht raken of uit het assortiment verdwijnen. We controleren
              de beschikbaarheid van bol.com-producten dagelijks en verwijderen aanbiedingen die
              niet meer leverbaar zijn, maar er kan altijd korte tijd een verouderde aanbieding
              zichtbaar zijn.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" /> Merken en vragen
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Genoemde merknamen en logo&apos;s (waaronder bol.com en Amazon) zijn eigendom van hun
              respectievelijke eigenaren en worden alleen gebruikt om aan te geven bij welke winkel
              een product verkrijgbaar is.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vragen over deze disclaimer? Neem contact op via de{' '}
              <Link href="/contact" className="text-primary hover:underline font-medium">contactpagina</Link>.
              Zie ook onze <Link href="/gebruiksvoorwaarden" className="text-primary hover:underline font-medium">gebruiksvoorwaarden</Link>{' '}
              en <Link href="/medische-disclaimer" className="text-primary hover:underline font-medium">medische disclaimer</Link>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
