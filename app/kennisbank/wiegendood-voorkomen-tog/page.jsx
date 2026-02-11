'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Shield, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export default function WiegendoodVoorkomenTOGPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Wiegendood Voorkomen met TOG</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wiegendood Voorkomen met TOG-waarde
          </h1>
          <p className="text-lg text-gray-600">
            Complete SIDS preventie gids: wetenschappelijke inzichten en de cruciale rol van de juiste TOG-waarde.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Wat is wiegendood (SIDS)?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Wiegendood, ook wel SIDS (Sudden Infant Death Syndrome) genoemd, is het plotseling en
              onverwacht overlijden van een schijnbaar gezonde baby jonger dan 1 jaar, meestal tijdens
              de slaap. Hoewel de precieze oorzaak onbekend blijft, zijn er bewezen risicofactoren
              die je kunt beïnvloeden.
            </p>

            <div className="relative p-4 pl-5 rounded-xl flex items-center gap-3 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/80 mb-6">
              <AlertTriangle className="w-5 h-5 text-primary/80 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1 text-text-primary">Belangrijke Statistiek</div>
                <div className="text-sm text-text-secondary-dark">In Nederland overlijden jaarlijks ongeveer 50-100 baby's aan wiegendood. Door het naleven van de veiligheidsrichtlijnen, inclusief het gebruik van de juiste TOG-waarde, is dit aantal de afgelopen decennia significant gedaald met meer dan 70%.</div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">De rol van oververhitting</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Oververhitting is één van de belangrijkste aanpasbare risicofactoren voor wiegendood.
              Onderzoek toont aan dat baby's die oververhit raken tijdens de slaap een verhoogd risico
              hebben op SIDS. Hier speelt de TOG-waarde een cruciale rol.
            </p>

            <div className="bg-background rounded-xl p-6 my-8">
              <h4 className="font-semibold text-gray-900 mb-3">Waarom TOG-waarde Belangrijk is</h4>
              <ul className="text-sm text-gray-700 list-disc pl-6 space-y-1">
                <li>Voorkomt oververhitting door juiste isolatie</li>
                <li>Vervangt gevaarlijke losse dekens</li>
                <li>Biedt voorspelbare, constante warmte</li>
                <li>Maakt temperatuurregulatie overzichtelijk</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Complete SIDS Preventie Checklist</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Volg deze wetenschappelijk onderbouwde richtlijnen voor veilig slapen:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary-dark" />
                  1. Slaappositie
                </h4>
                <p className="text-sm text-gray-700">
                  Altijd op de rug laten slapen, vanaf de geboorte tot 1 jaar. Dit is de veiligste positie.
                </p>
              </div>

              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary-dark" />
                  2. Slaapomgeving
                </h4>
                <ul className="text-sm text-gray-700 list-disc pl-6 space-y-1">
                  <li>Stevig, plat matras zonder kussens of knuffels</li>
                  <li>Gebruik een slaapzak in plaats van losse dekens</li>
                  <li>Kamertemperatuur tussen 16-20°C</li>
                  <li>Geen rook in de slaapkamer</li>
                </ul>
              </div>

              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary-dark" />
                  3. TOG-waarde en Kleding
                </h4>
                <ul className="text-sm text-gray-700 list-disc pl-6 space-y-1">
                  <li>Kies de juiste TOG-waarde voor de kamertemperatuur</li>
                  <li>Geen mutsje tijdens het slapen</li>
                  <li>Niet te veel lagen onder de slaapzak</li>
                  <li>Controleer regelmatig de nektemperatuur</li>
                </ul>
              </div>

              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary-dark" />
                  4. Algemene Gezondheid
                </h4>
                <ul className="text-sm text-gray-700 list-disc pl-6 space-y-1">
                  <li>Geef borstvoeding indien mogelijk (vermindert SIDS-risico)</li>
                  <li>Houd je baby rookvrij (voor en na geboorte)</li>
                  <li>Laat baby slapen in je eigen kamer (eerste 6 maanden)</li>
                  <li>Overweeg een fopspeen bij het slapen</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Tekenen van oververhitting</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Leer deze signalen herkennen en handel direct:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Klam of bezweet:</strong> Nek, rug of hoofd voelt vochtig aan</li>
              <li><strong>Rood gezicht:</strong> Verhit en rood aangelopen</li>
              <li><strong>Snelle ademhaling:</strong> Opvallend sneller dan normaal</li>
              <li><strong>Huiduitslag:</strong> Kleine rode puntjes (warmte-uitslag)</li>
              <li><strong>Koorts:</strong> Verhoogde lichaamstemperatuur zonder ziekte</li>
            </ul>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Actie bij Oververhitting</p>
                <div className="text-base text-gray-700">
                  <p className="mb-3">
                    Als je tekenen van oververhitting ziet:
                  </p>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Verwijder direct een laag kleding</li>
                    <li>Verlaag de kamertemperatuur</li>
                    <li>Laat baby even afkoelen voor je weer aankleden</li>
                    <li>Gebruik een lagere TOG-waarde slaapzak</li>
                    <li>Bij aanhoudende problemen: raadpleeg je huisarts</li>
                  </ol>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Veelgestelde vragen</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Kan een baby in een slaapzak stikken?</h4>
                <p className="text-sm text-gray-700">
                  Nee, een goed passende slaapzak is juist veiliger dan losse dekens. Zorg dat de
                  halsopening niet te ruim is en de maat correct is voor het gewicht van je baby.
                </p>
              </div>

              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Tot welke leeftijd is wiegendood een risico?</h4>
                <p className="text-sm text-gray-700">
                  Het hoogste risico is tussen 2-4 maanden. Het risico neemt af na 6 maanden en is
                  minimaal na 1 jaar. Blijf echter alle veiligheidsrichtlijnen volgen tot je kind 1 jaar is.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Is een dikke TOG-waarde gevaarlijker?</h4>
                <p className="text-sm text-gray-700">
                  Niet per se, als het past bij de kamertemperatuur. Gevaar ontstaat bij een te hoge
                  TOG-waarde in een te warme kamer. Gebruik altijd onze calculator voor de juiste combinatie.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Veilige TOG-waarde voor Jouw Baby
          </h3>
          <p className="text-gray-600 mb-6">
            Verminder het risico op oververhitting met de juiste TOG-waarde voor jouw situatie.
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
              href="/kennisbank/warmtestuwing-baby"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Warmtestuwing bij Baby's</div>
              <div className="text-sm text-gray-600">Herkennen en behandelen</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest uitgelegd</div>
            </Link>
            <Link
              href="/kennisbank/babykamer-temperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Ideale Babykamer Temperatuur</div>
              <div className="text-sm text-gray-600">Veilige slaaptemperatuur</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/tog-waarde-babykleding-tabel"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                TOG-waarde Babykleding Tabel
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/warmtestuwing-baby"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Warmtestuwing bij Baby's
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="wiegendood-voorkomen-tog"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
