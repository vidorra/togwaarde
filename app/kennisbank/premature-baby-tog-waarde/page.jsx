'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Heart, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export default function PrematureBabyTOGWaardePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Premature Baby TOG-waarde</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Premature Baby TOG-waarde
          </h1>
          <p className="text-lg text-gray-600">
            Speciale aandachtspunten voor te vroeg geboren baby's: aangepaste TOG-waardes en extra veiligheidsmaatregelen.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Waarom premature baby's extra aandacht nodig hebben</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Premature baby's (geboren voor 37 weken) hebben een nog minder ontwikkelde
              temperatuurregulatie dan voldragen baby's. Hun lichaam is kwetsbaarder voor zowel
              onderkoeling als oververhitting, wat extra waakzaamheid vereist bij het kiezen van
              de juiste TOG-waarde.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifieke Kwetsbaarheden</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Minder bruin vetweefsel voor warmteproductie</li>
                <li>Dunnere huid met minder isolatie</li>
                <li>Groter lichaamsoppervlak in verhouding tot gewicht</li>
                <li>Minder energie beschikbaar voor temperatuurregulatie</li>
                <li>Nog kwetsbaardere longen en luchtwegen</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Van couveuse naar thuis</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              In het ziekenhuis ligt je baby in een couveuse met perfect gereguleerde temperatuur
              (meestal 32-34°C). De overgang naar huis is een grote stap en vereist zorgvuldige planning.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Week 1-2 Thuis</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Kamertemperatuur:</strong> 20-22°C (warmer dan voor voldragen baby's)
                </p>
                <p className="text-sm text-gray-700">
                  <strong>TOG-waarde:</strong> 2.5-3.5 + extra laag kleding (romper + pyjama)
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Week 3-8</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Kamertemperatuur:</strong> Geleidelijk verlagen naar 18-20°C
                </p>
                <p className="text-sm text-gray-700">
                  <strong>TOG-waarde:</strong> 2.5 + aangepaste kleding
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Na 2-3 Maanden</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Kamertemperatuur:</strong> 16-20°C (standaard richtlijn)
                </p>
                <p className="text-sm text-gray-700">
                  <strong>TOG-waarde:</strong> Volgens standaard calculator (op basis van gecorrigeerde leeftijd)
                </p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Gecorrigeerde Leeftijd</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Gebruik altijd de <strong>gecorrigeerde leeftijd</strong> voor het bepalen van de
                TOG-waarde en kledingmaten:
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Voorbeeld:</strong> Baby geboren op 32 weken, nu 12 weken oud
              </p>
              <p className="text-sm text-gray-700">
                Gecorrigeerde leeftijd = 12 - (40-32) = 4 weken<br/>
                Gebruik TOG-richtlijnen voor een 4 weken oude baby
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Aangepaste TOG-richtlijnen</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Voor premature baby's gelden aangepaste richtlijnen in de eerste maanden:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">Kamertemp</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Eerste 2 Maanden</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Na 2 Maanden</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">20-22°C</td>
                    <td className="border border-gray-200 px-4 py-2">TOG 2.5 + romper + pyjama</td>
                    <td className="border border-gray-200 px-4 py-2">TOG 1.0-2.5</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">18-20°C</td>
                    <td className="border border-gray-200 px-4 py-2">TOG 3.5 + romper + pyjama</td>
                    <td className="border border-gray-200 px-4 py-2">TOG 2.5</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">16-18°C</td>
                    <td className="border border-gray-200 px-4 py-2">Verhoog kamertemperatuur</td>
                    <td className="border border-gray-200 px-4 py-2">TOG 2.5-3.5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Extra controle noodzakelijk</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Premature baby's hebben frequentere temperatuurcontroles nodig:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Eerste 2 Weken Thuis</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Elk 2-3 uur nektest</li>
                  <li>• Bij elke voeding</li>
                  <li>• Voor het slapen gaan</li>
                  <li>• Midden in de nacht</li>
                </ul>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Na 2 Weken</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Elk 4-5 uur nektest</li>
                  <li>• Voor en na slaap</li>
                  <li>• Bij temperatuurverandering</li>
                  <li>• Volgens standaard richtlijn</li>
                </ul>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Waarschuwingssignalen</p>
                <div className="text-base text-gray-700">
                  <p className="mb-3">
                    Neem direct contact op met je huisarts of ziekenhuis bij:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Lichaamstemperatuur onder 36°C of boven 38°C</li>
                    <li>Koude huid over het hele lichaam</li>
                    <li>Blauwige verkleuring rond mond of nagels</li>
                    <li>Ongewone slapheid of prikkelbaarheid</li>
                    <li>Moeite met ademen of snelle ademhaling</li>
                    <li>Weigeren van voeding</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Speciale slaapzakken voor premature baby's</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Er zijn speciale slaapzakken beschikbaar voor premature en kleine baby's:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Maat 44-50 cm (1-3 kg)</h4>
                <p className="text-sm text-gray-700">
                  Speciale prematuur maat, vaak met extra voorzieningen zoals armsgaten die
                  afgedekt kunnen worden en zachte, rekbare stoffen.
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Maat 50-56 cm (2.5-4 kg)</h4>
                <p className="text-sm text-gray-700">
                  Eerste reguliere maat, maar let op: niet alle merken passen goed bij kleine baby's.
                  Test altijd de pasvorm (halsopening mag niet te ruim zijn).
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Tips van de NICU verpleegkundigen</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Begin met een iets warmere omgeving en verlaag geleidelijk</li>
              <li>Gebruik de nektest als leidraad, niet handjes/voetjes</li>
              <li>Houd een logboek bij van temperatuur en kleding eerste weken</li>
              <li>Bespreek je thuissituatie met de NICU verpleegkundigen voor ontslag</li>
              <li>Overweeg een babyfoon met temperatuurmeter</li>
              <li>Gebruik geen elektrische verwarmingsdeken of warmwaterkruik</li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Wanneer Normaliseren?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Rond de gecorrigeerde leeftijd van 3 maanden kunnen de meeste premature baby's
                volgens de standaard TOG-richtlijnen behandeld worden. Volg altijd het advies van
                je kinderarts en blijf in de eerste maanden extra alert.
              </p>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken TOG-waarde voor Premature Baby
          </h3>
          <p className="text-gray-600 mb-6">
            Gebruik de gecorrigeerde leeftijd van je baby voor de juiste TOG-waarde berekening.
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
              href="/kennisbank/tog-waarde-berekenen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">TOG-waarde Berekenen</div>
              <div className="text-sm text-gray-600">Berekening aanpassen voor premature baby</div>
            </Link>
            <Link
              href="/kennisbank/veilige-slaaptemperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Veilige Slaaptemperatuur</div>
              <div className="text-sm text-gray-600">Extra voorzichtigheid bij prematuren</div>
            </Link>
            <Link
              href="/kennisbank/babykamer-temperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Ideale Babykamer Temperatuur</div>
              <div className="text-sm text-gray-600">Hogere kamertemperatuur prematuren</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/baby-temperatuur-controleren"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Baby Temperatuur Controleren
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/inbakeren-tog-waarde"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Inbakeren en TOG-waarde
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="premature-baby-tog-waarde"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
