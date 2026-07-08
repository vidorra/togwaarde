import Layout from '../../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'
import { Baby, Thermometer, Info, CheckCircle, AlertTriangle, Calculator, Check, ChevronRight, BookOpen } from 'lucide-react'
import { generateFAQSchema } from '../../../lib/structured-data'

export const metadata = {
  title: 'TOG-waarde per leeftijd: van newborn tot dreumes | TOGWaarde.nl',
  description: 'TOG-waarde per leeftijd? De TOG hangt af van de kamertemperatuur, niet van de leeftijd. Leeftijd bepaalt vooral de maat van de slaapzak. Bekijk het overzicht.',
  keywords: 'tog waarde per leeftijd, tog newborn, tog dreumes, slaapzak maat leeftijd, tog baby, babyslaapzak leeftijd, tog kamertemperatuur',
  alternates: { canonical: '/kennisbank/tog-waarde-per-leeftijd/' },
}

const faqSchema = [
  {
    question: 'Welke TOG-waarde per leeftijd?',
    answer: 'Er is geen vaste TOG-waarde per leeftijd. De TOG-waarde die je nodig hebt, wordt bepaald door de kamertemperatuur, niet door de leeftijd van je baby. Bij 20-24°C gebruik je TOG 1.0, bij 16-20°C TOG 2.5 en onder 16°C TOG 3.5. De leeftijd bepaalt vooral welke maat slaapzak je kiest.'
  },
  {
    question: 'Verandert de TOG met de leeftijd van mijn baby?',
    answer: 'Nee. Een newborn en een dreumes hebben in dezelfde kamer bij dezelfde temperatuur dezelfde TOG-waarde nodig. Wat wel verandert met de leeftijd is de maat van de slaapzak en een paar aandachtspunten per fase, zoals de overgang van inbakeren naar een slaapzak of van slaapzak naar dekbed.'
  },
  {
    question: 'Welke TOG voor een newborn?',
    answer: 'Een newborn mag vanaf de geboorte in een slaapzak (maat 50-56/60). Ook hier bepaalt de kamertemperatuur de TOG: bij 16-20°C een TOG 2.5, bij 20-24°C een TOG 1.0. Let bij een pasgeborene extra op dat de baby het niet te warm heeft en controleer de temperatuur via het nekje.'
  },
  {
    question: 'Welke TOG voor een dreumes?',
    answer: 'Ook voor een dreumes (12-24 maanden, maat ~90-110) bepaalt de kamertemperatuur de TOG-waarde. Een dreumes is actiever en woelt meer, dus een slaapzak met beentjes kan handig zijn. Richting het dekbed ga je pas vanaf ongeveer 2 jaar.'
  }
]

export default function TOGWaardePerLeeftijdPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqSchema)) }} />
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">TOG-waarde per leeftijd</span>
        </nav>

        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Baby className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            TOG-waarde per leeftijd: van newborn tot dreumes
          </h1>
          <p className="text-lg text-gray-600">
            De belangrijkste vuistregel vooraf: de TOG-waarde wordt bepaald door de kamertemperatuur, niet door de leeftijd. De leeftijd bepaalt vooral de maat van de slaapzak en een paar aandachtspunten per fase.
          </p>
        </header>

        {/* Main Content - Single White Frame */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Core message */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-4">TOG hangt af van de temperatuur, niet van de leeftijd</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Veel ouders zoeken naar een overzicht van de TOG-waarde per leeftijd. Toch werkt de TOG-schaal niet zo. De juiste TOG-waarde volgt uit de <strong>kamertemperatuur</strong> waarin je baby slaapt, niet uit hoe oud je baby is. Een newborn en een dreumes in dezelfde kamer bij dezelfde temperatuur hebben dus dezelfde TOG-waarde nodig.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              De canonieke temperatuurbanden voor babyslaapzakken zijn:
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
                    <p className="text-sm text-gray-600">Vanaf 24°C</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Voor warme zomernachten van 24°C en warmer. Een dunne, lichte slaapzak.
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
                    <p className="text-sm text-gray-600">20-24°C</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  De veelzijdige tussenwaarde voor lente, zomer en herfst bij 20-24°C.
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
                    <p className="text-sm text-gray-600">16-20°C</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  De standaard winterslaapzak voor 16-20°C, de meest gebruikte waarde in Nederland.
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
                    <p className="text-sm text-gray-600">Onder 16°C</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Voor koude kamers onder 16°C. Alleen gebruiken als de kamer echt koud is.
                </p>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mb-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Onthoud:</p>
                <div className="text-base text-gray-700">
                  De ideale kamertemperatuur voor babyslaap ligt tussen 16 en 18°C. De totale isolatie (slaapzak plus kleding) blijft bij voorkeur onder de 4.0 TOG om oververhitting te voorkomen. Meet de temperatuur met een thermometer en laat de TOG daarop volgen, niet op de leeftijd.
                </div>
              </div>
            </div>

            <div className="relative bg-primary/5 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Direct het juiste antwoord?</strong> <span className="text-gray-700">Gebruik onze <Link href="/" className="text-primary hover:underline font-medium">TOG Calculator</Link> om op basis van de kamertemperatuur en de kleding van je baby de juiste TOG-waarde te bepalen.</span>
              </p>
            </div>
          </section>

          {/* What the age determines */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Wat bepaalt de leeftijd dan wel?</h2>
            <p className="text-lg text-gray-700 mb-6">
              De leeftijd van je baby bepaalt vooral de <strong>maat</strong> van de slaapzak en een aantal praktische aandachtspunten per fase. Hieronder loop je per leeftijdsfase langs de typische slaapzakmaat, de aandachtspunten en welke TOG-waardes je in de praktijk per seizoen het meest gebruikt.
            </p>

            {/* Newborn */}
            <div className="bg-default border border-gray-100 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Baby className="w-8 h-8 text-secondary-dark" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Newborn: 0-3 maanden</h3>
                  <p className="text-lg text-gray-600 font-medium">Slaapzakmaat ~50-56/60</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Een baby mag vanaf de geboorte in een slaapzak. Kies een newborn slaapzak die goed aansluit, zodat je baby niet naar beneden kan zakken.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Let er extra op dat een pasgeborene het niet te warm heeft, want een newborn kan de eigen temperatuur nog niet goed reguleren.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Controleer de temperatuur met de nek-test: voel in de nek of het warm en droog aanvoelt, niet klam of zweterig.</span>
                </li>
              </ul>
              <p className="text-gray-700">
                <strong>In de praktijk:</strong> in de winter (16-20°C) een TOG 2.5, in het tussenseizoen (20-24°C) een TOG 1.0, tijdens een hittegolf (24°C en warmer) een TOG 0.5.
              </p>
            </div>

            {/* Baby */}
            <div className="bg-default border border-gray-100 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Baby className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Baby: 3-12 maanden</h3>
                  <p className="text-lg text-gray-600 font-medium">Slaapzakmaat ~70-90</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Inbakeren stopt meestal rond 4 maanden, als je baby zich begint om te rollen. Dit is het moment voor de overgang naar een slaapzak.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Kies een maat die past bij de lengte van je baby, niet bij de leeftijd op de verpakking. De slaapzak mag niet te ruim zijn rond de hals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Blijf de temperatuur via het nekje controleren en pas de kleding onder de slaapzak aan bij warmere of koudere nachten.</span>
                </li>
              </ul>
              <p className="text-gray-700">
                <strong>In de praktijk:</strong> in de winter (16-20°C) een TOG 2.5, in lente en herfst (20-24°C) een TOG 1.0, in de warme zomer (24°C en warmer) een TOG 0.5.
              </p>
            </div>

            {/* Dreumes / peuter */}
            <div className="bg-default border border-gray-100 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Baby className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Dreumes en peuter: 12-24 maanden</h3>
                  <p className="text-lg text-gray-600 font-medium">Slaapzakmaat ~90-110</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Een dreumes is actiever en woelt meer. Een slaapzak met beentjes kan handig zijn, zodat je kind kan staan en bewegen zonder de slaapzak uit te trekken.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>De overgang richting een dekbed maak je pas vanaf ongeveer 2 jaar, wanneer het risico op verstikking kleiner is.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Ook nu blijft de kamertemperatuur leidend voor de TOG-keuze, ongeacht de leeftijd.</span>
                </li>
              </ul>
              <p className="text-gray-700">
                <strong>In de praktijk:</strong> in de winter (16-20°C) een TOG 2.5, in het tussenseizoen (20-24°C) een TOG 1.0, in de warme zomer (24°C en warmer) een TOG 0.5.
              </p>
            </div>
          </section>

          {/* Overview table */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Overzicht: maat per leeftijd, TOG per temperatuur</h2>
            <p className="text-lg text-gray-700 mb-6">
              Deze tabel laat de kernboodschap zien: de leeftijd bepaalt de <strong>maat</strong> van de slaapzak, terwijl de TOG-waarde altijd volgt uit de <strong>kamertemperatuur</strong>. Er staat dus bewust geen vaste TOG-waarde per leeftijd in.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">Leeftijd</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Slaapzakmaat</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Welke TOG?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Newborn (0-3 mnd)</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">~50-56/60</td>
                    <td className="border border-gray-200 px-4 py-2">Hangt af van de kamertemperatuur, zie temperatuurbanden</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">Baby (3-12 mnd)</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">~70-90</td>
                    <td className="border border-gray-200 px-4 py-2">Hangt af van de kamertemperatuur, zie temperatuurbanden</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Dreumes/peuter (12-24 mnd)</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">~90-110</td>
                    <td className="border border-gray-200 px-4 py-2">Hangt af van de kamertemperatuur, zie temperatuurbanden</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="relative bg-accent/10 p-6 rounded-lg mt-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent/100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Geen leeftijd is geen TOG</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kies nooit een TOG-waarde puur op basis van de leeftijd van je baby. Meet de kamertemperatuur en gebruik de temperatuurbanden hierboven. Zo voorkom je dat je baby het te warm of te koud heeft.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Veelgestelde Vragen</h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welke TOG-waarde per leeftijd?
                </h3>
                <p className="text-gray-700">
                  Er is geen vaste TOG-waarde per leeftijd. De TOG-waarde die je nodig hebt, wordt bepaald door de kamertemperatuur, niet door de leeftijd van je baby. Bij 20-24°C gebruik je TOG 1.0, bij 16-20°C TOG 2.5 en onder 16°C TOG 3.5. De leeftijd bepaalt vooral welke maat slaapzak je kiest.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verandert de TOG met de leeftijd van mijn baby?
                </h3>
                <p className="text-gray-700">
                  Nee. Een newborn en een dreumes hebben in dezelfde kamer bij dezelfde temperatuur dezelfde TOG-waarde nodig. Wat wel verandert met de leeftijd is de maat van de slaapzak en een paar aandachtspunten per fase, zoals de overgang van inbakeren naar een slaapzak of van slaapzak naar dekbed.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welke TOG voor een newborn?
                </h3>
                <p className="text-gray-700">
                  Een newborn mag vanaf de geboorte in een slaapzak (maat 50-56/60). Ook hier bepaalt de kamertemperatuur de TOG: bij 16-20°C een TOG 2.5, bij 20-24°C een TOG 1.0. Let bij een pasgeborene extra op dat de baby het niet te warm heeft en controleer de temperatuur via het nekje.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welke TOG voor een dreumes?
                </h3>
                <p className="text-gray-700">
                  Ook voor een dreumes (12-24 maanden, maat ~90-110) bepaalt de kamertemperatuur de TOG-waarde. Een dreumes is actiever en woelt meer, dus een slaapzak met beentjes kan handig zijn. Richting het dekbed ga je pas vanaf ongeveer 2 jaar.
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
              Bereken de Juiste TOG voor Jouw Baby
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Vul de kamertemperatuur en de kleding van je baby in en zie direct welke TOG-waarde past bij jouw situatie
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Naar TOG Calculator
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-primary mb-6">Gerelateerde Artikelen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/kennisbank/tog-schaal-overzicht" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">De Complete TOG-Schaal →</div>
              <div className="text-sm text-gray-600">Overzicht van alle TOG-waardes van 0.5 tot 3.5</div>
            </Link>

            <Link href="/kennisbank/baby-slaapzak-koopgids" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">Baby Slaapzak Koopgids →</div>
              <div className="text-sm text-gray-600">Zo kies je de juiste slaapzak en maat voor je baby</div>
            </Link>

            <Link href="/kennisbank/tog-waarde-per-seizoen" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">TOG-waarde per Seizoen →</div>
              <div className="text-sm text-gray-600">Welke TOG-waarde per seizoen in Nederland?</div>
            </Link>

            <Link href="/" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">TOG Calculator →</div>
              <div className="text-sm text-gray-600">Bereken de juiste TOG-waarde voor jouw baby</div>
            </Link>
          </div>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-waarde-per-leeftijd"
          title="Aanbevolen Babyslaapzakken"
        />
      </article>
    </Layout>
  )
}
