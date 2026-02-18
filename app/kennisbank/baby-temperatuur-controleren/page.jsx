import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Hand, ArrowRight, ChevronRight, Activity, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'Baby Temperatuur Controleren: Nektest en Andere Methodes | TOGWaarde.nl',
  description: 'Leer hoe je de temperatuur van je baby controleert met de nektest en thermometer. Herken oververhitting en onderkoeling voor veilige babyslaap.',
  keywords: 'baby temperatuur controleren, nektest baby, baby te warm, baby te koud, thermometer baby'
}

export default function BabyTemperatuurControlerenPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Baby Temperatuur Controleren</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Hand className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Baby Temperatuur Controleren
          </h1>
          <p className="text-lg text-gray-600">
            Nektest en andere methodes uitgelegd: zo weet je zeker of je baby de juiste temperatuur heeft.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Waarom temperatuur controleren belangrijk is</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Baby's kunnen hun lichaamstemperatuur nog niet goed reguleren en kunnen niet aangeven
              wanneer ze het te warm of te koud hebben. Regelmatig controleren helpt om oververhitting
              of onderkoeling te voorkomen - beide risicofactoren voor wiegendood.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wanneer Controleren?</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Minimaal 1x per nacht (vooral eerste maanden)</li>
                <li>30 minuten na het inslapen</li>
                <li>Bij temperatuurschommelingen in huis</li>
                <li>Na het verwisselen van slaapzak of kleding</li>
                <li>Bij ziekte of koorts</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Methode 1: De Nektest (Meest Betrouwbaar)</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              De nektest is de gouden standaard voor het controleren van je baby's temperatuur.
              Deze methode is betrouwbaarder dan handjes of voetjes voelen.
            </p>

            <div className="bg-secondary/10 rounded-xl p-6 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Hand className="w-5 h-5 text-secondary-dark" />
                Hoe voer je de nektest uit?
              </h4>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-semibold min-w-[24px]">1.</span>
                  <span>Leg je hand voorzichtig op de nek van je baby, tussen de schouderblaadjes</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold min-w-[24px]">2.</span>
                  <span>Laat je hand minimaal 5 seconden liggen om een goed gevoel te krijgen</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold min-w-[24px]">3.</span>
                  <span>Beoordeel de temperatuur en vochtigheid</span>
                </li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Interpretatie nektest</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary/10 rounded-xl p-6 border-2 border-secondary/30">
                <div className="text-lg font-bold text-secondary-dark mb-2">Te Koud</div>
                <p className="text-sm text-gray-700 mb-3">Nek voelt koel of koud aan</p>
                <p className="text-xs text-gray-600">Actie: Voeg een laag kleding toe of gebruik een dikkere slaapzak</p>
              </div>
              <div className="bg-background rounded-xl p-6 border-2 border-primary/10">
                <div className="text-lg font-bold text-primary mb-2">Perfect</div>
                <p className="text-sm text-gray-700 mb-3">Nek voelt warm en droog aan</p>
                <p className="text-xs text-gray-600">Actie: Geen - je baby heeft de ideale temperatuur</p>
              </div>
              <div className="bg-accent/10 rounded-xl p-6 border-2 border-accent">
                <div className="text-lg font-bold text-accent mb-2">Te Warm</div>
                <p className="text-sm text-gray-700 mb-3">Nek voelt klam, bezweet of heet aan</p>
                <p className="text-xs text-gray-600">Actie: Verwijder een laag of gebruik een dunnere slaapzak</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Methode 2: Handjes en Voetjes</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Handjes en voetjes zijn NIET geschikt om te bepalen of je baby de juiste temperatuur heeft.
              Ze voelen vaak koel aan, zelfs wanneer je baby het goed warm heeft. Dit is normaal en
              geen reden voor bezorgdheid.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Waarom Zijn Handjes en Voetjes Koel?</h3>
              <p className="text-gray-700 leading-relaxed">
                Baby's hebben een minder efficiënte bloedsomloop naar de uiteinden van hun lichaam.
                Koele handjes en voetjes zijn normaal en betekenen niet dat je baby het koud heeft.
                De bloedstroom wordt eerst naar vitale organen gestuurd.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Methode 3: Thermometer (Bij Ziekte)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Een thermometer gebruik je alleen als je vermoedt dat je baby koorts heeft of ziek is.
              Voor dagelijkse controle is de nektest voldoende.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Rectale Thermometer (Meest Nauwkeurig)</h4>
                <p className="text-sm text-gray-700 mb-2">
                  De meest betrouwbare methode voor baby's onder de 3 maanden
                </p>
                <p className="text-xs text-gray-600">
                  Normale temperatuur: 36,5-37,5°C | Koorts: vanaf 38°C
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Oorthermometer</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Snel en comfortabel, maar minder nauwkeurig bij baby's onder 6 maanden
                </p>
                <p className="text-xs text-gray-600">
                  Let op: Kan 0,5-1°C afwijken bij onjuiste plaatsing
                </p>
              </div>

              <div className="bg-secondary/10 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Voorhoofdthermometer</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Handig voor snelle meting, maar minder betrouwbaar
                </p>
                <p className="text-xs text-gray-600">
                  Gebruik alleen voor indicatie, niet voor nauwkeurige meting
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Wat te doen bij afwijkende temperatuur?</h2>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-secondary pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">Baby heeft het te koud</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Voeg één laag kleding toe (bijvoorbeeld een rompertje)</li>
                  <li>Of verhoog de TOG-waarde van de slaapzak</li>
                  <li>Controleer of er tocht is in de kamer</li>
                  <li>Meet de kamertemperatuur (ideaal: 16-20°C)</li>
                </ul>
              </div>

              <div className="border-l-4 border-accent pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">Baby heeft het te warm</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Verwijder direct één laag kleding</li>
                  <li>Of verlaag de TOG-waarde van de slaapzak</li>
                  <li>Ventileer de kamer (vermijd tocht op baby)</li>
                  <li>Controleer na 15 minuten opnieuw</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Tips</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Controleer temperatuur VOOR je zelf naar bed gaat</li>
                <li>Gebruik een babyfoon met temperatuurmeter voor continue monitoring</li>
                <li>Maak een logboek in de eerste weken om patronen te herkennen</li>
                <li>Bij twijfel: liever iets te koel dan te warm (makkelijker op te lossen)</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Veelgemaakte fouten</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Alleen op handjes/voetjes afgaan:</strong> Deze zijn vaak koel maar dit is normaal</li>
              <li><strong>Te vaak verstoren:</strong> Controleer niet vaker dan nodig, dit verstoort de slaap</li>
              <li><strong>Direct reageren op één koude hand:</strong> Doe eerst de nektest</li>
              <li><strong>Kamertemperatuur te hoog houden:</strong> 16-20°C is ideaal, niet warmer</li>
            </ul>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Juiste TOG-waarde
          </h3>
          <p className="text-gray-600 mb-6">
            Voorkom temperatuurproblemen door de juiste TOG-waarde te gebruiken vanaf het begin.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar Calculator
          </Link>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kennisbank/babykamer-temperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Ideale Babykamer Temperatuur</div>
              <div className="text-sm text-gray-600">Kamertemperatuur meten</div>
            </Link>
            <Link
              href="/kennisbank/oververhitting-herkennen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Oververhitting Herkennen</div>
              <div className="text-sm text-gray-600">Betekenis van temperatuursignalen</div>
            </Link>
            <Link
              href="/kennisbank/veilige-slaaptemperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Veilige Slaaptemperatuur</div>
              <div className="text-sm text-gray-600">Veilige grenzen 16-20°C</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/warmtestuwing-baby"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Warmtestuwing bij Baby's
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/premature-baby-tog-waarde"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Premature Baby TOG-waarde
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="baby-temperatuur-controleren"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
