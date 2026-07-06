'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Thermometer, ChevronRight, Activity, CheckCircle, AlertTriangle, Phone } from 'lucide-react'

export default function BabyKoortsSlaapzakPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Koorts en de Slaapzak</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Thermometer className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mag mijn baby met koorts in een slaapzak?
          </h1>
          <p className="text-lg text-gray-600">
            Ja, maar kies een lichtere TOG dan normaal. Een baby met koorts moet warmte kwijt kunnen, niet vasthouden.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Het principe: niet inpakken</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Bij koorts is de lichaamstemperatuur al verhoogd. Dik aankleden of extra toedekken
              (&quot;lekker uitzweten&quot;) is een hardnekkige mythe: het lichaam kan de warmte dan niet kwijt
              en de temperatuur loopt verder op, met extra risico op{' '}
              <Link href="/kennisbank/warmtestuwing-baby" className="text-primary hover:underline font-medium">warmtestuwing</Link>.
              Kleed je baby dus juist lichter aan dan je normaal bij die kamertemperatuur zou doen.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Praktisch: TOG bij koorts</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Ga één stap lichter:</strong> gebruik je normaal een 2.5 TOG slaapzak, kies dan tijdelijk een 1.0 TOG. Normaal 1.0? Dan een 0.5 of alleen kleding</li>
              <li><strong>Lichte kleding eronder:</strong> een dunne romper of alleen een luier is vaak genoeg</li>
              <li><strong>Kamertemperatuur normaal houden:</strong> 16 tot 20 graden blijft het doel, niet extra stoken</li>
              <li><strong>Vaker voelen:</strong> check het nekje elk uur of bij elke controle. Klam en heet betekent nog een laagje eraf</li>
              <li><strong>Extra drinken aanbieden:</strong> koorts kost vocht, bied vaker borst- of flesvoeding aan</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              Rilt je baby bij het opkomen van de koorts? Dat is normaal bij een stijgende temperatuur.
              Leg dan tijdelijk een extra dun laagje over de slaapzak en haal het weer weg zodra het
              rillen stopt. Niet blijven toedekken.
            </p>

            <div className="p-4 rounded-xl bg-red-50 border border-red-200 mb-6">
              <div className="flex items-start gap-2 mb-2">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-base font-semibold text-red-800">Bel direct de huisarts of huisartsenpost bij:</p>
              </div>
              <ul className="list-disc pl-10 space-y-1 text-sm text-red-700">
                <li>Koorts (38 graden of hoger) bij een baby jonger dan 3 maanden</li>
                <li>Sufheid, slap aanvoelen of niet goed wakker te krijgen</li>
                <li>Huilen met een andere toon, ontroostbaar zijn of juist opvallend stil</li>
                <li>Vlekjes die niet wegdrukbaar zijn, benauwdheid of uitdroging (droge luiers)</li>
                <li>Koorts die langer dan 3 dagen aanhoudt, op elke leeftijd</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Na de koorts</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Is de koorts gezakt en slaapt je baby weer normaal? Ga dan gewoon terug naar de
              TOG-combinatie die bij de kamertemperatuur hoort. Gebruik het{' '}
              <Link href="/" className="text-primary hover:underline font-medium">kledingadvies per temperatuur</Link>{' '}
              of check je eigen combinatie met de{' '}
              <Link href="/calculator" className="text-primary hover:underline font-medium">TOG calculator</Link>.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Samengevat</h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Slaapzak mag, maar één TOG-stap lichter dan normaal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Nooit extra toedekken om uit te zweten</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Vaker nekje voelen en extra vocht aanbieden</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Jonger dan 3 maanden met koorts: altijd direct de huisarts bellen</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Dit artikel is algemene informatie en vervangt geen medisch advies. Vertrouw bij een ziek
                kind altijd op je eigen gevoel en neem bij twijfel contact op met huisarts of consultatiebureau.
              </span>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Weer beter? Terug naar de juiste TOG
          </h3>
          <p className="text-gray-600 mb-6">
            Stel de kamertemperatuur in en zie direct welke slaapzak en kleding weer veilig zijn.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar het Kledingadvies
          </Link>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kennisbank/oververhitting-herkennen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Oververhitting Herkennen</div>
              <div className="text-sm text-gray-600">Signalen en direct handelen</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest en andere methodes</div>
            </Link>
            <Link
              href="/kennisbank/warmtestuwing-baby"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Warmtestuwing bij Baby&apos;s</div>
              <div className="text-sm text-gray-600">Herkennen, voorkomen en behandelen</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
