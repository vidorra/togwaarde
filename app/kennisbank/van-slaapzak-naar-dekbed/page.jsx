import Layout from '../../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'
import { BedDouble, ChevronRight, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Van Slaapzak naar Dekbed: Tot Welke Leeftijd? | TOGWaarde.nl',
  description: 'Wanneer stap je over van slaapzak naar dekbed? Slaapzak minimaal tot 12 maanden, dekbed pas vanaf 2 jaar. Plus tips voor de peuter die uit de slaapzak klimt.',
  keywords: 'van slaapzak naar dekbed, tot welke leeftijd slaapzak, slaapzak of dekbed, peuter dekbed, overstappen slaapzak, peuter klimt uit slaapzak',
  alternates: { canonical: '/kennisbank/van-slaapzak-naar-dekbed/' },
}

export default function VanSlaapzakNaarDekbedPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Van Slaapzak naar Dekbed</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <BedDouble className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tot welke leeftijd een slaapzak?
          </h1>
          <p className="text-lg text-gray-600">
            Wanneer stap je over naar een dekbed, wat doe je met een peuter die uit de slaapzak klimt, en hoe houd je de warmte kloppend?
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">De korte antwoorden</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Minimaal tot 12 maanden:</strong> onder het jaar is een slaapzak de veiligste keuze, een los dekbed wordt afgeraden</li>
              <li><strong>Dekbed en kussen pas vanaf 2 jaar:</strong> dat is het advies van VeiligheidNL; veel kinderen slapen prima tot 2,5 à 3 jaar in een slaapzak</li>
              <li><strong>Er is geen haast:</strong> zolang je kind lekker in een slaapzak slaapt, is er geen reden om over te stappen</li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Signalen dat je kind eraan toe is</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Je kind is 2 jaar of ouder en slaapt in een peuterbed</li>
              <li>De slaapzak zit qua lengte echt in de weg bij staan of lopen in bed</li>
              <li>Je kind klimt over de bedrand, met slaapzak aan is dat valgevaar</li>
              <li>Je kind protesteert consequent tegen de slaapzak en trapt een dekentje niet steeds los</li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Peuter klimt uit de slaapzak of het bed?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dit is de meest gestelde vraag in de overgangsfase. Opties op een rij:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Slaapzak met voetopeningen of pijpjes:</strong> je kind kan staan en lopen, maar houdt de warmte van een slaapzak. Ideale tussenstap</li>
              <li><strong>Een maat kleiner ritsen:</strong> sommige zakken hebben drukkers om de lengte in te korten, waardoor uitklimmen lastiger wordt</li>
              <li><strong>Rits aan de achterkant:</strong> er bestaan slaapzakken die een handige peuter niet zelf open krijgt</li>
              <li><strong>Overstappen op pyjama plus dekbed:</strong> vanaf 2 jaar prima, kies dan een peuterdekbed zonder kussen in het begin</li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Slaapzak met beentjes voor een actieve dreumes</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rond 18 maanden wil een dreumes vaak staan, lopen en klimmen, ook in bed. Een gewone slaapzak zit dan in de weg,
              maar voor een dekbed is het nog te vroeg. Een slaapzak met beentjes (ook wel pijpjes of voetopeningen) is dan een
              handige tussenoplossing.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Het is een slaapzak waarbij de onderkant in twee losse pijpjes uitloopt, soms met openingen voor de voetjes. Zo
              kan je kind gewoon staan, lopen en klimmen, terwijl het lijfje toch bedekt blijft. Je houdt daarmee de warmte en
              de veiligheid van een slaapzak, zonder dat je kind erover struikelt.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ook bij dit type kies je nog steeds de juiste TOG-waarde op basis van de kamertemperatuur, net als bij een gewone
              slaapzak. Het is een fijne tussenstap voordat een dekbed mag, want een los dekbed en kussen worden pas vanaf 2 jaar
              geadviseerd.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Warmte na de overstap</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Een dekbed heeft geen TOG-label zoals een slaapzak, en je kind trapt het &apos;s nachts
              regelmatig van zich af. Praktische vuistregels:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Kies een dun peuterdekbed en een warmere pyjama, in plaats van een dik dekbed met dunne pyjama. Zo blijft het comfortabel als het dekbed wegglijdt</li>
              <li>Houd de <Link href="/kennisbank/veilige-slaaptemperatuur" className="text-primary hover:underline font-medium">slaapkamertemperatuur</Link> ideaal op 16-18°C, en zeker niet warmer dan 20°C, dat verandert niet na de overstap</li>
              <li>Twijfel je in de overgangsfase over de combinatie slaapzak plus kleding? Check het met de <Link href="/calculator" className="text-primary hover:underline font-medium">TOG calculator</Link></li>
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800 mb-6">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Onder de 12 maanden geen los dekbed, dekbedovertrek of kussen in bed. Ook bij een peuter:
                begin zonder kussen en houd het bed vrij van grote knuffels.
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Stappenplan voor de overstap</h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Begin met het dekbed tijdens middagslaapjes, zo went je kind rustig</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Kies een moment zonder andere veranderingen (geen verhuizing naar groot bed én dekbed tegelijk)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Warmere pyjama aan in de eerste weken, het dekbed ligt er vaak af</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Voel de eerste nachten even in het nekje, net als vroeger</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate: peuterslaapzakken en overgangsproducten */}
        <div className="mb-8">
          <AffiliateProductWidget
            pageId="van-slaapzak-naar-dekbed"
            hideIndex
            title="Slaapzakken met voetjes en peuterdekbedden"
          />
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Nog in de slaapzakfase?
          </h3>
          <p className="text-gray-600 mb-6">
            Check of de combinatie van slaapzak en kleding klopt bij jullie kamertemperatuur.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar de TOG Calculator
          </Link>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kennisbank/baby-slaapzak-koopgids"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Slaapzak Koopgids</div>
              <div className="text-sm text-gray-600">De juiste slaapzak per TOG-waarde</div>
            </Link>
            <Link
              href="/kennisbank/veilige-slaaptemperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Veilige Slaaptemperatuur</div>
              <div className="text-sm text-gray-600">De ideale temperatuur voor de kinderkamer</div>
            </Link>
            <Link
              href="/kennisbank/wiegendood-preventie"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Wiegendood Preventie</div>
              <div className="text-sm text-gray-600">Veilig slapen in elke fase</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
