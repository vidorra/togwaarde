import Layout from '../../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'
import { Moon, Thermometer, Info, CheckCircle, ArrowRight, Calculator, Check, Lightbulb, XCircle } from 'lucide-react'

export const metadata = {
  title: 'Wat is TOG? Uitleg TOG Waarde voor Babyslaapzakken | TOGWaarde.nl',
  description: 'Wat betekent TOG? Complete uitleg over TOG waardes voor babyslaapzakken. Leer hoe je de juiste TOG kiest voor veilige babyslaap bij elke temperatuur.',
  keywords: 'wat is tog, tog betekenis, tog waarde, baby slaapzak tog, tog uitleg, thermal overall grade',
}

export default function WatIsTOGPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Info className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wat is TOG?
          </h1>
          <p className="text-lg text-gray-600">
            Alles wat je moet weten over TOG waardes voor een veilige babyslaap
          </p>
        </header>

        {/* Main Content - Single White Frame */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">TOG Betekenis</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>TOG staat voor Thermal Overall Grade</strong> en is een internationale maatstaf die aangeeft hoe warm een babyslaapzak is. Hoe hoger de TOG waarde, hoe warmer de slaapzak. Een slaapzak met TOG 2.5 houdt je baby dus warmer dan een slaapzak met TOG 0.5.
            </p>
            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mb-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Kort gezegd:</p>
                <div className="text-base text-gray-700">
                  De TOG waarde helpt je om de juiste slaapzak te kiezen, zodat je baby het niet te warm of te koud heeft tijdens de slaap.
                </div>
              </div>
            </div>
          </section>

          {/* TOG Scale */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">De TOG Schaal Uitgelegd</h2>
            <p className="text-lg text-gray-700 mb-6">
              De meest gebruikte TOG waardes voor babyslaapzakken zijn:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* TOG 0.5 */}
              <div className="bg-default border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <span className="text-secondary-dark font-bold text-lg">0.5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">TOG 0.5</h3>
                    <p className="text-sm text-gray-600">Zomer</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  <strong>Kamertemperatuur: 24°C of hoger</strong><br />
                  Ideaal voor warme zomernachten. Zeer lichte, dunne slaapzak die net genoeg bescherming biedt.
                </p>
              </div>

              {/* TOG 1.0 */}
              <div className="bg-default border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">1.0</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">TOG 1.0</h3>
                    <p className="text-sm text-gray-600">Lente/Herfst</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  <strong>Kamertemperatuur: 21-23°C</strong><br />
                  Perfect voor de tusenseizoenen. De meest veelzijdige TOG waarde die veel ouders het hele jaar gebruiken.
                </p>
              </div>

              {/* TOG 2.5 */}
              <div className="bg-default border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">2.5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">TOG 2.5</h3>
                    <p className="text-sm text-gray-600">Winter</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  <strong>Kamertemperatuur: 16-20°C</strong><br />
                  De standaard winterslaapzak. Houdt je baby lekker warm op koude winternachten zonder oververhitting.
                </p>
              </div>

              {/* TOG 3.5 */}
              <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/100 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">3.5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">TOG 3.5</h3>
                    <p className="text-sm text-gray-600">Extra Koud</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  <strong>Kamertemperatuur: onder 16°C</strong><br />
                  Voor extreem koude omstandigheden. Alleen gebruiken als de kamer echt koud is.
                </p>
              </div>
            </div>
          </section>

          {/* Why TOG Matters */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Waarom is TOG Belangrijk?</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Voorkomt Oververhitting</h3>
                  <p className="text-gray-700">
                    Baby's kunnen hun lichaamstemperatuur nog niet goed reguleren. Een te warme slaapzak verhoogt het risico op oververhitting, wat in verband wordt gebracht met wiegendood (SIDS). De juiste TOG helpt dit te voorkomen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Zorgt voor Comfort</h3>
                  <p className="text-gray-700">
                    Een baby die het te warm of te koud heeft, slaapt onrustig. De juiste TOG waarde zorgt voor een comfortabele slaaptemperatuur, wat resulteert in betere slaap voor je baby (en voor jou!).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vervangt Dekens</h3>
                  <p className="text-gray-700">
                    Dekens in het babybedje worden ontraden vanwege verstikkingsgevaar. Een slaapzak met de juiste TOG biedt veilige warmte zonder risico's.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Choose */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Hoe Kies je de Juiste TOG?</h2>
            <p className="text-lg text-gray-700 mb-6">
              De juiste TOG waarde kiezen hangt af van drie factoren:
            </p>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 mb-6">
              <ol className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Kamertemperatuur</h4>
                    <p className="text-gray-700">
                      Meet de temperatuur in de babykamer met een thermometer. Dit is de belangrijkste factor bij het kiezen van een TOG waarde.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Kleding Onder de Slaapzak</h4>
                    <p className="text-gray-700">
                      Wat draagt je baby onder de slaapzak? Een lange mouw romper voegt ongeveer 0.5 TOG toe, terwijl alleen een luier 0 TOG toevoegt.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Leeftijd van de Baby</h4>
                    <p className="text-gray-700">
                      Pasgeboren baby's hebben iets meer warmte nodig dan oudere baby's. Ook premature baby's hebben speciale aandacht nodig.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mb-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Tip:</p>
                <div className="text-base text-gray-700">
                  Gebruik onze TOG Calculator om automatisch de perfecte TOG waarde te berekenen op basis van jouw specifieke situatie.
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Veelgemaakte Fouten</h2>

            <div className="space-y-4">
              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Info className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Te veel lagen:</p>
                  <div className="text-base text-gray-700">
                    Veel ouders combineren een dikke slaapzak met warme pyjama's. Dit leidt vaak tot oververhitting.
                  </div>
                </div>
              </div>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Info className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Verkeerde inschatting temperatuur:</p>
                  <div className="text-base text-gray-700">
                    De kamer voelt voor volwassenen koud aan, maar is perfect voor baby's (16-20°C).
                  </div>
                </div>
              </div>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Info className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Geen thermometer gebruiken:</p>
                  <div className="text-base text-gray-700">
                    Gissen naar de temperatuur leidt vaak tot een verkeerde TOG keuze.
                  </div>
                </div>
              </div>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Info className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Extra dekentjes toevoegen:</p>
                  <div className="text-base text-gray-700">
                    Een slaapzak is bedoeld om dekens te vervangen, niet om er bovenop te gebruiken.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference Table */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Snelle Referentietabel</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">Kamertemperatuur</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Aanbevolen TOG</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Kleding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Boven 24°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 0.5</td>
                    <td className="border border-gray-200 px-4 py-2">Alleen romper of body</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">21-23°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 1.0</td>
                    <td className="border border-gray-200 px-4 py-2">Korte mouw romper</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">18-20°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 1.5-2.0</td>
                    <td className="border border-gray-200 px-4 py-2">Lange mouw romper</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">16-18°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 2.5</td>
                    <td className="border border-gray-200 px-4 py-2">Lange mouw romper + sokjes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Onder 16°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 3.5</td>
                    <td className="border border-gray-200 px-4 py-2">Lange mouw romper + slaappakje</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Veelgestelde Vragen</h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is TOG hetzelfde bij alle merken?
                </h3>
                <p className="text-gray-700">
                  Nee, niet helemaal. Hoewel TOG een internationale standaard is, kunnen er kleine verschillen zijn tussen merken. Een Jollein 2.5 TOG kan iets anders aanvoelen dan een HEMA 2.5 TOG. Test altijd zelf of je baby het comfortabel heeft.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Kan ik meerdere slaapzakken combineren?
                </h3>
                <p className="text-gray-700">
                  Nee, dit wordt afgeraden. Het combineren van twee slaapzakken vergroot het risico op oververhitting en beperkt de bewegingsvrijheid van je baby. Kies één slaapzak met de juiste TOG waarde.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vanaf welke leeftijd kan ik een slaapzak gebruiken?
                </h3>
                <p className="text-gray-700">
                  Vanaf de geboorte! Er zijn speciale newborn slaapzakken (maat 50-56) die perfect zijn voor pasgeboren baby's. Zorg wel dat de slaapzak goed past en je baby niet kan zakken.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Moet ik voor elk seizoen een andere slaapzak kopen?
                </h3>
                <p className="text-gray-700">
                  Idealiter heb je minimaal 2-3 slaapzakken: een TOG 1.0 voor mild weer, een TOG 2.5 voor winter, en eventueel een TOG 0.5 voor de zomer. Dit geeft je flexibiliteit bij wisselende temperaturen.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
            <Calculator className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white">
              Bereken de Perfecte TOG voor Jouw Baby
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Gebruik onze gratis TOG Calculator om direct te zien welke TOG waarde het beste past bij jouw situatie
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Naar TOG Calculator
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Gerelateerde Artikelen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/kennisbank/veilige-slaaptemperatuur" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                Veilige Slaaptemperatuur voor Baby's
              </h3>
              <p className="text-gray-600 mb-4">
                Leer welke kamertemperatuur ideaal is voor veilige babyslaap
              </p>
              <span className="inline-flex items-center text-primary font-medium">
                Lees meer <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link href="/kennisbank/kledinglagen" className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                Kledinglagen Onder de Slaapzak
              </h3>
              <p className="text-gray-600 mb-4">
                Ontdek wat je baby moet dragen onder de slaapzak
              </p>
              <span className="inline-flex items-center text-primary font-medium">
                Lees meer <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="wat-is-tog"
          title="Aanbevolen Babyslaapzakken"
        />
      </article>
    </Layout>
  )
}
