import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Table, ArrowRight, ChevronRight, Activity, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'TOG-waarde Babykleding Tabel: Complete Referentie | TOGWaarde.nl',
  description: 'Complete referentietabel met TOG-waardes van alle babykledingstukken. Van rompertje tot pyjama - weet exact hoeveel isolatie elk kledingstuk biedt.',
  keywords: 'TOG waarde babykleding, kleding TOG tabel, romper TOG waarde, pyjama TOG waarde, babykleding isolatie'
}

export default function TOGWaardeBabykledingTabelPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">TOG-waarde Babykleding Tabel</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Table className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            TOG-waarde Babykleding Tabel
          </h1>
          <p className="text-lg text-gray-600">
            Complete referentietabel met TOG-waardes van alle babykledingstukken voor het samenstellen van de perfecte outfit.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Hoe gebruik je deze tabel?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Deze overzichtelijke tabel helpt je bij het combineren van kledinglagen onder de slaapzak.
              Tel de TOG-waardes van de kledingstukken op bij de TOG-waarde van de slaapzak om de
              totale isolatie te berekenen.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Rekenvoorbeeld</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Situatie:</strong> Babykamer is 18°C
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Rompertje korte mouw (0.2 TOG)</li>
                <li>+ Lange pyjama (0.5 TOG)</li>
                <li>+ Slaapzak 2.5 TOG</li>
                <li>= Totaal 3.2 TOG (perfect voor 18°C)</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Complete TOG-waarde Tabel</h2>

            {/* Rompers & Ondergoed */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rompers & Ondergoed</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 border border-secondary/20">
                      <th className="border border-gray-200 px-4 py-2 text-left">Kledingstuk</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">TOG-waarde</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Materiaal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Romper korte mouw</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.2</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Dun katoen</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Romper lange mouw</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.3</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Katoen</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Body korte mouw</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.1</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Dun katoen</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Body lange mouw</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.2</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Katoen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pyjama's */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pyjama's</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 border border-secondary/20">
                      <th className="border border-gray-200 px-4 py-2 text-left">Kledingstuk</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">TOG-waarde</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Materiaal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Dunne pyjama (kort)</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.3</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Dun katoen</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Pyjama lang (katoen)</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Katoen</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Pyjama lang (fleece)</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">1.0</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Fleece</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Pyjama gevoerd</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">1.5</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Gewatteerd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 font-semibold mb-1">Let op: Gevoerde Pyjama's</p>
                    <p className="text-sm text-gray-700">
                      Een gevoerde pyjama (1.5 TOG) met een TOG 2.5 slaapzak geeft 4.0+ totaal TOG. Dit kan te warm zijn voor de meeste baby's.
                      Gebruik een gevoerde pyjama alleen bij extreem koude kamers (onder 14°C) of kies voor een lagere TOG slaapzak.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessoires */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sokjes & Accessoires</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 border border-secondary/20">
                      <th className="border border-gray-200 px-4 py-2 text-left">Kledingstuk</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">TOG-waarde</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Opmerking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Dunne sokjes</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.1</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Niet altijd nodig</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Dikke sokjes</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.2</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Alleen bij zeer koud</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Mutsje</td>
                      <td className="border border-gray-200 px-4 py-2 font-semibold">0.3</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-accent">Niet tijdens slapen!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">
                * Mutsjes: De eerste week (kraamweek) mag een dun mutsje gebruikt worden, ook tijdens slapen, omdat pasgeboren baby's
                hun temperatuur nog niet kunnen reguleren. Na de eerste week is een mutsje niet meer nodig - baby's reguleren dan hun
                temperatuur via het hoofdje. Bij premature baby's kan een mutsje langer nodig zijn (bespreek met arts/kraamzorg).
              </p>
            </div>

            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Belangrijke Tips</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>TOG-waardes zijn geschatte gemiddelden en kunnen per merk verschillen</li>
                <li>Let op het materiaal: natuurlijke vezels ademen beter dan synthetisch</li>
                <li>Bij twijfel: voeg geen extra laag toe maar verhoog de TOG van de slaapzak</li>
                <li>Controleer altijd de nektemperatuur na 30 minuten slapen</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Praktische Combinaties</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Deze combinaties werken goed in verschillende temperatuurzones:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">Zomer (24°C+)</div>
                <div className="text-sm text-gray-700">
                  • Body korte mouw (0.1)<br/>
                  • + Slaapzak 0.5 TOG<br/>
                  • = Totaal 0.6 TOG
                </div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">Tussenseizoen (20°C)</div>
                <div className="text-sm text-gray-700">
                  • Romper lange mouw (0.3)<br/>
                  • + Slaapzak 1.0 TOG<br/>
                  • = Totaal 1.3 TOG
                </div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">Winter (18°C)</div>
                <div className="text-sm text-gray-700">
                  • Romper korte mouw (0.2)<br/>
                  • + Lange pyjama (0.5)<br/>
                  • + Slaapzak 2.5 TOG<br/>
                  • = Totaal 3.2 TOG
                </div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">Zeer Koud (15°C)</div>
                <div className="text-sm text-gray-700">
                  • Body lange mouw (0.2)<br/>
                  • + Lange pyjama (0.5)<br/>
                  • + Slaapzak 3.5 TOG<br/>
                  • = Totaal 4.2 TOG
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-waarde-babykleding-tabel"
          title="Aanbevolen Babyslaapzakken"
        />

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Laat de Calculator het Werk Doen
          </h3>
          <p className="text-gray-600 mb-6">
            Geen zin om te rekenen? Onze calculator vertelt je precies wat je baby moet dragen.
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
              href="/kennisbank/kleding-onder-slaapzak"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Kleding Onder de Slaapzak</div>
              <div className="text-sm text-gray-600">Hoe kleding te combineren</div>
            </Link>
            <Link
              href="/kennisbank/tog-schaal-overzicht"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">TOG-Schaal Overzicht</div>
              <div className="text-sm text-gray-600">Alle TOG-waardes begrijpen</div>
            </Link>
            <Link
              href="/kennisbank/tog-waarde-berekenen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">TOG-waarde Berekenen</div>
              <div className="text-sm text-gray-600">Totale TOG berekenen</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/baby-slaapzak-koopgids"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Baby Slaapzak Koopgids
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/wiegendood-voorkomen-tog"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Wiegendood Voorkomen met TOG
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>
      </div>
    </Layout>
  )
}
