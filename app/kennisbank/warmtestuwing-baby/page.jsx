'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Thermometer, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export default function WarmtestuwingBabyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Warmtestuwing bij Baby's</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Thermometer className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Warmtestuwing bij Baby's
          </h1>
          <p className="text-lg text-gray-600">
            Complete gids om warmtestuwing te herkennen, voorkomen en behandelen. Inclusief de rol van TOG-waarde.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Wat is warmtestuwing?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Warmtestuwing, ook wel hyperthermie genoemd, treedt op wanneer het lichaam van je baby
              meer warmte vasthoudt dan het kan afvoeren. Baby's zijn extra kwetsbaar omdat hun
              temperatuurregulatie nog niet volledig ontwikkeld is en ze nog niet zelf kunnen aangeven
              dat ze het te warm hebben.
            </p>

            <div className="bg-background rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Waarom Baby's Extra Kwetsbaar Zijn</h4>
              <ul className="text-sm text-gray-700 list-disc pl-6 space-y-2">
                <li>Kleinere lichaamsoppervlak ten opzichte van massa</li>
                <li>Minder ontwikkelde zweetklieren</li>
                <li>Kunnen zich niet zelf ontkleden of aangeven dat het te warm is</li>
                <li>Verhoogd metabolisme produceert meer warmte</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Symptomen herkennen</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Het is cruciaal om warmtestuwing vroeg te herkennen. Let op deze tekenen:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-primary/10 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Milde Symptomen</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Warme, droge huid</li>
                  <li>• Rode wangen of gezicht</li>
                  <li>• Snellere ademhaling</li>
                  <li>• Rusteloosheid</li>
                  <li>• Extra dorstig</li>
                </ul>
              </div>

              <div className="bg-accent/10 rounded-xl p-6 border-2 border-accent">
                <h4 className="font-semibold text-gray-900 mb-3">Ernstige Symptomen - Bel 112</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Temperatuur boven 39°C</li>
                  <li>• Slap of niet responsief</li>
                  <li>• Stuiptrekkingen</li>
                  <li>• Braken</li>
                  <li>• Snelle, oppervlakkige ademhaling</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Voorkomen van warmtestuwing</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Preventie is de beste strategie. Volg deze richtlijnen:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">1. Juiste TOG-waarde</h4>
                <p className="text-sm text-gray-700">
                  Gebruik onze calculator om de juiste TOG-waarde te bepalen. Te dikke slaapzakken
                  zijn een veelvoorkomende oorzaak van oververhitting.
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">2. Kamertemperatuur</h4>
                <p className="text-sm text-gray-700">
                  Houd de babykamer tussen 16-20°C. Meet de temperatuur op bedrand-hoogte met een
                  betrouwbare thermometer.
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">3. Kleding aanpassen</h4>
                <p className="text-sm text-gray-700">
                  Kleed je baby in lagen die je makkelijk kunt aanpassen. Bij warm weer: alleen een
                  rompertje of body onder een lichte slaapzak.
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">4. Regelmatig controleren</h4>
                <p className="text-sm text-gray-700">
                  Voer de nektest uit: voel in de nek van je baby. Deze moet warm aanvoelen maar
                  niet bezweet of klam zijn.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">De Nektest</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                De betrouwbaarste manier om de temperatuur van je baby te controleren:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Plaats je hand op de nek van je baby (tussen schouderblaadjes)</li>
                <li>Warm = goed, koel = te koud, bezweet/klam = te warm</li>
                <li>Controleer minimaal 1x per nacht, vaker bij hitte of ziekte</li>
              </ol>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Eerste hulp bij warmtestuwing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Als je baby tekenen van warmtestuwing vertoont:
            </p>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Actieplan</p>
                <div className="text-base text-gray-700">
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Verplaats naar koelere plek:</strong> Breng baby naar een koele,
                      geventileerde ruimte
                    </li>
                    <li>
                      <strong>Verwijder kleding:</strong> Kleed baby uit tot alleen een luier of
                      dunne romper
                    </li>
                    <li>
                      <strong>Koel geleidelijk af:</strong> Gebruik lauwe (niet ijskoude) doekjes
                      op voorhoofd, nek en polsen
                    </li>
                    <li>
                      <strong>Geef te drinken:</strong> Borst- of flesvoeding in kleine hoeveelheden
                    </li>
                    <li>
                      <strong>Monitor temperatuur:</strong> Meet rectale temperatuur en blijf
                      controleren
                    </li>
                    <li>
                      <strong>Bel bij twijfel:</strong> Huisartsenpost of 112 bij ernstige symptomen
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Risicosituaties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Extra opletten is nodig in deze situaties:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Hittegolven:</strong> Temperaturen boven 25°C vragen extra monitoring</li>
              <li><strong>Auto's:</strong> Kan binnen minuten gevaarlijk warm worden</li>
              <li><strong>Direct zonlicht:</strong> Vermijd altijd tijdens slaap</li>
              <li><strong>Ziekte/koorts:</strong> Temperatuurregulatie extra verstoord</li>
              <li><strong>Premature baby's:</strong> Nog kwetsbaarder voor temperatuurschommelingen</li>
            </ul>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Let Op: Auto's</p>
                <div className="text-base text-gray-700">
                  Laat een baby NOOIT alleen in een auto, zelfs niet voor "even". Een auto kan binnen
                  10 minuten levensgevaarlijk warm worden, zelfs met een raampje open. Dit is één van
                  de meest voorkomende oorzaken van ernstige warmtestuwing bij baby's.
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Lange termijn gevolgen</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Herhaaldelijke oververhitting of één ernstig incident kan leiden tot blijvende schade.
              Daarom is preventie zo belangrijk. Het gebruik van de juiste TOG-waarde is een simpele
              maar effectieve manier om dit risico te minimaliseren.
            </p>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Voorkom Warmtestuwing met de Juiste TOG-waarde
          </h3>
          <p className="text-gray-600 mb-6">
            Gebruik onze calculator om de veilige TOG-waarde te bepalen en oververhitting te voorkomen.
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
              href="/kennisbank/wiegendood-voorkomen-tog"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Wiegendood Voorkomen</div>
              <div className="text-sm text-gray-600">SIDS preventie met TOG</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest en methodes</div>
            </Link>
            <Link
              href="/kennisbank/baby-slapen-zomer"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Slapen in de Zomer</div>
              <div className="text-sm text-gray-600">Hitteplan tropische nachten</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/wiegendood-voorkomen-tog"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Wiegendood Voorkomen met TOG
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/baby-temperatuur-controleren"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Baby Temperatuur Controleren
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="warmtestuwing-baby"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
