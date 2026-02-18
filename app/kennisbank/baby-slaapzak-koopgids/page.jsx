'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'
import { ShoppingCart, ArrowRight, ChevronRight, Activity, Star, Info, CheckCircle, ShoppingBag } from 'lucide-react'

export default function BabySlaapzakKoopgidsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Baby Slaapzak Koopgids</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <ShoppingBag className="w-6 h-6 mr-3 text-primary" />
            Baby Slaapzak Koopgids
          </h1>
          <p className="text-lg text-gray-600">
            Complete gids per TOG-waarde met merkvergelijking, prijsoverzicht en praktische aankooptips.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-lg font-semibold text-primary mb-4">Waar moet je op letten bij het kopen?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Het kopen van een baby slaapzak is een belangrijke investering in de veiligheid en het
              comfort van je baby. Deze gids helpt je de juiste keuze te maken op basis van TOG-waarde,
              maat, materiaal en prijs.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Belangrijkste Aandachtspunten</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Juiste TOG-waarde voor jouw klimaat/seizoen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Correcte maat (niet te groot voor veiligheid)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Kwaliteit van ritsen en stiksels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Materiaal (ademend, GOTS gecertificeerd)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">Wasinstructies en duurzaamheid</span>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Slaapzakken per TOG-waarde</h2>

            <div className="space-y-6 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">TOG 0.5 - Zomerslaapzakken</h4>
                  <span className="text-sm text-gray-600">€20-€45</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">Perfect voor warme zomernachten (24°C+)</p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Populaire merken:</span> Snoozebaby, Lodger, Meyco
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Materialen:</span> Mousseline, hydrofiel, dun katoen
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">TOG 1.0 - Lichte Slaapzakken</h4>
                  <span className="text-sm text-gray-600">€25-€55</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">Ideaal voor lente/herfst (21-24°C)</p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Populaire merken:</span> Bemini, Jollein, Little Dutch
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Materialen:</span> Jersey, dun katoen, bamboe
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">TOG 2.5 - Winterslaapzakken</h4>
                  <span className="text-sm text-gray-600">€35-€75</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">Standaard voor winter (16-20°C)</p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Populaire merken:</span> Snoozebaby, Bemini, aden + anais
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Materialen:</span> Gevoerd katoen, fleece voering
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">TOG 3.5 - Extra Warme Winterslaapzakken</h4>
                  <span className="text-sm text-gray-600">€45-€85</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">Voor zeer koude nachten (onder 15°C)</p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Populaire merken:</span> Petit Stellou, Bemini, Jollein
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Materialen:</span> Dikke fleece, gewatteerde voering
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Maten en leeftijden</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De juiste maat is cruciaal voor veiligheid. Een te grote slaapzak kan over het hoofd
              van je baby glijden. Standaard maten:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>0-6 maanden:</strong> 70 cm (tot ongeveer 6 kg)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>6-18 maanden:</strong> 90 cm (tot ongeveer 10 kg)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>18-36 maanden:</strong> 110 cm (tot ongeveer 15 kg)</span>
              </li>
            </ul>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mt-6">
              <CheckCircle className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Handige tip: Basis Garderobe</p>
                <p className="text-base text-gray-700 mb-2">
                  Aanbevolen basis set voor het hele jaar:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-base text-gray-700">1x TOG 0.5 (zomer)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-base text-gray-700">2x TOG 1.0 of 2.5 (tussenseizoen/winter - extra voor in de was)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-base text-gray-700">Optioneel: 1x TOG 3.5 (alleen bij zeer koude winters)</span>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Kwaliteitskenmerken</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Controleer deze kwaliteitskenmerken voor duurzaamheid:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>YKK ritsen:</strong> Beste kwaliteit, gaan langer mee</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>GOTS/OEKO-TEX:</strong> Certificering voor veilige materialen</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>Dubbele stiksels:</strong> Bij schouders en ritsen</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>Wasbaar op 60°C:</strong> Belangrijk voor hygiëne</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-gray-700"><strong>Drukknoopjes bij schouders:</strong> Makkelijker verschonen</span>
              </li>
            </ul>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Budget versus premium</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Je hoeft niet altijd het duurste merk te kiezen. Veel middensegment merken bieden
              uitstekende kwaliteit. Let wel op: goedkope slaapzakken (onder €20) hebben vaak
              slechtere ritsen en krimpen sneller na het wassen.
            </p>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="font-medium text-gray-900 mb-3">
            Bereken Welke TOG-waarde Je Nodig Hebt
          </h3>
          <p className="text-gray-600 mb-6">
            Weet je niet zeker welke TOG-waarde je moet kopen? Gebruik onze calculator.
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
              href="/kennisbank/tog-schaal-overzicht"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-gray-900 mb-1">TOG-schaal Overzicht</div>
              <div className="text-sm text-gray-600">Alle TOG-waardes uitgelegd</div>
            </Link>
            <Link
              href="/kennisbank/kleding-onder-slaapzak"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-gray-900 mb-1">Kleding Onder de Slaapzak</div>
              <div className="text-sm text-gray-600">Combinatie kleding en slaapzak</div>
            </Link>
            <Link
              href="/kennisbank/nederlandse-merken-vergelijking"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-gray-900 mb-1">Nederlandse Merken Vergelijking</div>
              <div className="text-sm text-gray-600">Puckababy, Jollein, HEMA vergeleken</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/baby-slapen-zomer"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Baby Slapen in de Zomer
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/tog-waarde-babykleding-tabel"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                TOG-waarde Babykleding Tabel
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="baby-slaapzak-koopgids"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
