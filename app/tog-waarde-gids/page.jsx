import Layout from '../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../components/AffiliateProductWidget'
import { BookOpen, Book, ThermometerSun, Snowflake, Sun, AlertCircle, Activity, Info, ArrowRight, ChevronRight, Shirt } from 'lucide-react'
import { generateFAQSchema, generateBreadcrumbSchema } from '../../lib/structured-data'
import { KLEDING_WAARDEN, SLAAPZAK_TOG_OPTIES } from '../../lib/tog-constants'
import { TEMP_BANDEN, getReverseAdvies, kledingNamen, tempBereikVoorSlaapzak } from '../../lib/tog-advies'

export const metadata = {
  title: 'TOG-waarde: uitleg en tabel per temperatuur | TOGWaarde.nl',
  description: 'Wat is de TOG-waarde en welke slaapzak past bij jouw babykamer? Tabel per kamertemperatuur met slaapzak en kleding eronder.',
  keywords: 'tog waarde, wat is tog, tog betekenis, tog tabel, tog waarde slaapzak, tog per temperatuur, tog waarde baby',
  alternates: { canonical: '/tog-waarde-gids/' },
}

const SITE = 'https://togwaarde.nl'

// Alle getallen op deze pagina komen uit lib/tog-advies.ts, dezelfde bron als
// de calculator op de homepage. Zo spreken de tabel en de calculator elkaar
// nooit tegen.
const rijen = TEMP_BANDEN.map((band) => {
  const advies = getReverseAdvies(band.temp)
  return {
    label: band.label,
    slaapzak: advies.geenSlaapzak ? 'Geen slaapzak' : `${advies.slaapzakTOG.toFixed(1)} TOG`,
    kleding: kledingNamen(advies),
  }
})

const advies18 = getReverseAdvies(18)
const advies16 = getReverseAdvies(16)

const SLAAPZAK_UITLEG = {
  0.2: 'Heel dun, eigenlijk een laagje stof. Voor warme zomernachten als ook een 0.5 TOG te warm voelt.',
  0.5: 'Zomerslaapzak. Voor warme nachten en slaapkamers die boven de 22°C blijven.',
  1.0: 'Tussenseizoen. Voor lente en nazomer en voor kamers die rond de 20°C blijven.',
  2.5: 'De standaard voor herfst en winter in een normaal verwarmd huis.',
  3.5: 'Winterslaapzak voor koude slaapkamers. Liever de kamer iets warmer dan nog meer lagen.',
}

const faqs = [
  {
    question: 'Wat is de TOG-waarde?',
    answer: 'TOG staat voor Thermal Overall Grade. Het is een maat voor hoe goed een stof warmte vasthoudt. Hoe hoger het getal, hoe warmer. Bij babyslaapzakken lopen de waarden meestal van 0.2 TOG voor zomer tot 3.5 TOG voor winter.',
  },
  {
    question: 'Welke TOG-waarde bij 18 graden?',
    answer: `Bij een slaapkamer van 18 tot 19°C past een slaapzak van ${advies18.slaapzakTOG} TOG met een ${kledingNamen(advies18).toLowerCase()} eronder.`,
  },
  {
    question: 'Welke TOG-waarde bij 16 graden?',
    answer: `Bij 16 tot 17°C past een slaapzak van ${advies16.slaapzakTOG} TOG met een ${kledingNamen(advies16).toLowerCase()} eronder. Is het kouder dan 16°C, verwarm dan liever de kamer iets dan dat je meer lagen aantrekt.`,
  },
  {
    question: 'Is TOG hetzelfde bij alle merken?',
    answer: 'TOG wordt bij alle merken op dezelfde manier gemeten, maar snit, stof en pasvorm verschillen. Twee slaapzakken van 2.5 TOG kunnen daardoor iets anders aanvoelen. Voel na het slapengaan in het nekje of het goed zit.',
  },
  {
    question: 'Kan ik twee slaapzakken over elkaar gebruiken?',
    answer: 'Nee. Twee slaapzakken over elkaar maken het te warm en beperken de bewegingsvrijheid. Kies één slaapzak met de juiste TOG-waarde en pas de kleding eronder aan.',
  },
  {
    question: 'Vanaf welke leeftijd kan een baby in een slaapzak?',
    answer: 'Vanaf de geboorte. Er zijn slaapzakken in maat 50-56 voor pasgeboren baby\'s. Let op dat de halsopening en de armsgaten zo passen dat je baby er niet in kan wegzakken.',
  },
  {
    question: 'Moet ik voor elk seizoen een andere slaapzak kopen?',
    answer: 'Met twee slaapzakken kom je meestal het jaar door: een van 2.5 TOG voor herfst en winter en een van 0.5 of 1.0 TOG voor lente en zomer. Met de kleding eronder vang je de verschillen tussen nachten op.',
  },
]

const breadcrumbs = [
  { name: 'Home', url: `${SITE}/` },
  { name: 'TOG-waarde gids', url: `${SITE}/tog-waarde-gids/` },
]

export default function TOGWaardeGidsPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }} />

        <nav aria-label="Kruimelpad" className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">TOG-waarde gids</span>
        </nav>

        {/* Header: antwoord in de eerste twee zinnen */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Book className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            TOG-waarde: wat het is en welke je baby nodig heeft
          </h1>
          <p className="text-lg text-gray-600">
            De TOG-waarde geeft aan hoe warm een slaapzak is: hoe hoger het getal, hoe warmer.
            Bij een slaapkamer van 18°C past een slaapzak van {advies18.slaapzakTOG} TOG met een {kledingNamen(advies18).toLowerCase()} eronder.
            Voor elke andere temperatuur staat het advies in de tabel hieronder.
          </p>
        </header>

        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">

          <nav className="bg-secondary/10 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Op deze pagina
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 list-none">
              <li><a href="#tog-tabel" className="text-primary underline hover:text-primary/80">TOG-tabel per kamertemperatuur</a></li>
              <li><a href="#wat-is-tog" className="text-primary underline hover:text-primary/80">Wat is de TOG-waarde?</a></li>
              <li><a href="#per-tog" className="text-primary underline hover:text-primary/80">Welke slaapzak bij welke TOG</a></li>
              <li><a href="#kleding" className="text-primary underline hover:text-primary/80">Kleding onder de slaapzak</a></li>
              <li><a href="#kamertemperatuur" className="text-primary underline hover:text-primary/80">Kamertemperatuur en veiligheid</a></li>
              <li><a href="#seizoenen" className="text-primary underline hover:text-primary/80">Winter en zomer</a></li>
              <li><a href="#fouten" className="text-primary underline hover:text-primary/80">Veelgemaakte fouten</a></li>
              <li><a href="#vragen" className="text-primary underline hover:text-primary/80">Veelgestelde vragen</a></li>
            </ul>
          </nav>

          {/* TOG-tabel */}
          <section id="tog-tabel" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">TOG-tabel per kamertemperatuur</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Meet de temperatuur in de slaapkamer, niet in de woonkamer, en zoek de rij die erbij past.
              De TOG-waarde van een slaapzak geldt met gewone nachtkleding eronder, zo rekenen de fabrikanten ook.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-4 text-left font-semibold">Kamertemperatuur</th>
                    <th className="p-4 text-left font-semibold">Slaapzak</th>
                    <th className="p-4 text-left font-semibold">Kleding eronder</th>
                  </tr>
                </thead>
                <tbody>
                  {rijen.map((rij, i) => (
                    <tr key={rij.label} className={`border-b border-gray-100 ${i % 2 === 1 ? 'bg-default' : ''}`}>
                      <td className="p-4 font-medium">{rij.label}</td>
                      <td className="p-4">{rij.slaapzak}</td>
                      <td className="p-4 text-gray-700">{rij.kleding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="relative bg-primary/5 p-6 rounded-lg mt-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
              <p className="text-gray-800">
                <Info className="w-5 h-5 inline mr-2 text-primary" />
                Dit is een richtlijn. Voel na een half uur in het nekje of aan de rug: lauwwarm en droog is goed,
                zweterig is te warm. Kies bij twijfel een laagje minder.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-secondary/10 rounded-xl p-6">
              <p className="text-gray-700">
                Zit je temperatuur tussen twee rijen in, of wil je het meteen zien voor jouw kamer?
              </p>
              <Link href="/" className="inline-flex items-center px-5 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
                <Activity className="w-5 h-5 mr-2" />
                Naar de calculator
              </Link>
            </div>
          </section>

          {/* Producten */}
          <section className="mb-12">
            <AffiliateProductWidget pageId="tog-waarde-gids" title="Slaapzakken per TOG-waarde" />
          </section>

          {/* Wat is TOG */}
          <section id="wat-is-tog" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Wat is de TOG-waarde?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TOG staat voor Thermal Overall Grade. Het getal zegt hoe goed een stof warmte vasthoudt.
              Natuurkundig gezien is 1 TOG een warmteweerstand van 0.1 m²·K/W, maar voor ouders telt vooral
              dit: een hoger getal betekent een warmere slaapzak.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              De warmte zit niet zozeer in de stof zelf als in de lucht die tussen de vezels blijft hangen.
              Een dikkere vulling houdt meer lucht vast en isoleert dus beter. Daarom kan een lichte maar
              luchtige slaapzak toch een hoge TOG-waarde hebben.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Slaapzakfabrikanten zetten de TOG-waarde op het label. Voor losse kleding bestaat dat niet:
              de kledingwaarden verderop op deze pagina zijn schattingen.
            </p>
          </section>

          {/* Per TOG-waarde */}
          <section id="per-tog" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Welke slaapzak bij welke TOG-waarde</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Dit zijn de waarden die je het vaakst in de winkel ziet. Sommige merken hebben ook 1.5 of 3.0 TOG;
              die passen tussen de waarden hieronder in.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {SLAAPZAK_TOG_OPTIES.map((tog) => {
                const bereik = tempBereikVoorSlaapzak(tog)
                return (
                  <div key={tog} className="bg-default p-5 rounded-xl border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-1">{tog.toFixed(1)} TOG</h3>
                    {bereik && (
                      <p className="text-sm text-primary font-medium mb-2">Calculator-advies bij {bereik}</p>
                    )}
                    <p className="text-gray-600 text-sm">{SLAAPZAK_UITLEG[tog]}</p>
                  </div>
                )
              })}
            </div>
            <Link href="/kennisbank/tog-schaal-overzicht" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-6">
              Meer over de TOG-schaal
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* Kleding */}
          <section id="kleding" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Kleding onder de slaapzak</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Fabrikanten rekenen de TOG van een slaapzak met gewone nachtkleding eronder, zoals een romper en een slaappakje.
              Ter indicatie hoe warm losse kleding is (schattingen op basis van stof en dikte, fabrikanten geven hier geen TOG-waarde voor op):
            </p>
            <ul className="space-y-3 max-w-xl">
              {Object.values(KLEDING_WAARDEN).map((k) => (
                <li key={k.naam} className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700 flex items-center">
                    <Shirt className="w-4 h-4 mr-2 text-primary" />
                    {k.naam}
                  </span>
                  <span className="font-medium text-gray-900">±{k.TOG.toFixed(1)} TOG</span>
                </li>
              ))}
            </ul>
            <Link href="/kennisbank/tog-waarde-babykleding-tabel" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-6">
              Uitgebreide tabel met babykleding
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* Kamertemperatuur */}
          <section id="kamertemperatuur" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <ThermometerSun className="w-7 h-7 mr-3 text-primary" />
              Kamertemperatuur en veiligheid
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De Lullaby Trust adviseert een slaapkamer tussen 16 en 20°C. Daarbinnen kies je de slaapzak met de tabel hierboven.
              Te warm is gevaarlijker dan te koud: oververhitting is een bekende risicofactor voor wiegendood.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Een baby die het te koud heeft wordt meestal onrustig. Een baby die het te warm heeft wordt juist stil en slaperig,
              en dat merk je minder snel. Kies bij twijfel daarom een laagje minder.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Is je baby te vroeg geboren, dan gelden soms andere adviezen. Overleg dat met het consultatiebureau.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/kennisbank/babykamer-temperatuur" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                Ideale babykamer temperatuur
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/kennisbank/oververhitting-herkennen" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                Oververhitting herkennen
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/kennisbank/premature-baby-tog-waarde" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                TOG-waarde bij een premature baby
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </section>

          {/* Seizoenen */}
          <section id="seizoenen" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Winter en zomer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-default p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Snowflake className="w-5 h-5 mr-2 text-primary" />
                  Winter
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  In een verwarmd huis is de slaapkamer meestal 16 tot 19°C. Daar hoort een slaapzak van 2.5 TOG bij.
                  Wordt het kouder dan 16°C, dan is 3.5 TOG de warmste stap. Geen losse dekens erbij.
                </p>
                <Link href="/kennisbank/tog-waarde-winter" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                  TOG-waarde in de winter
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="bg-default p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Sun className="w-5 h-5 mr-2 text-primary" />
                  Zomer
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Boven 22°C is een slaapzak van 0.5 TOG genoeg, vaak met alleen een luier eronder.
                  Vanaf 27°C laat je de slaapzak weg. Zorg dan voor frisse lucht en controleer je baby vaker.
                </p>
                <Link href="/kennisbank/baby-slapen-zomer" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                  Baby laten slapen in de zomer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <Link href="/kennisbank/tog-waarde-per-seizoen" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-6">
              Alle seizoenen, ook lente en herfst
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* Fouten */}
          <section id="fouten" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-7 h-7 mr-3 text-primary" />
              Veelgemaakte fouten
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-semibold text-gray-900">Te veel lagen</h3>
                <p className="text-gray-700">Een warme slaapzak én een pyjama én een vestje is snel te warm. Pas eerst de slaapzak aan, dan pas de kleding.</p>
              </li>
              <li>
                <h3 className="font-semibold text-gray-900">De temperatuur schatten</h3>
                <p className="text-gray-700">Een slaapkamer is vaak een paar graden kouder of warmer dan je denkt. Een thermometer bij het bedje geeft de echte waarde.</p>
              </li>
              <li>
                <h3 className="font-semibold text-gray-900">Kijken naar handjes en voetjes</h3>
                <p className="text-gray-700">Die voelen bij baby's vaak koel aan, ook als het lijf warm genoeg is. Voel in het nekje of aan de rug.</p>
              </li>
              <li>
                <h3 className="font-semibold text-gray-900">Een deken over de slaapzak</h3>
                <p className="text-gray-700">Een slaapzak is bedoeld als enige bedekking. Een losse deken erbij maakt het te warm en kan over het hoofd schuiven.</p>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section id="vragen" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Veelgestelde vragen</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Meer lezen</h2>
                <p className="text-gray-700">Artikelen over veilig slapen, slaapzakken kiezen en speciale situaties.</p>
              </div>
              <Link href="/kennisbank" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
                <BookOpen className="w-5 h-5 mr-2" />
                Naar de kennisbank
              </Link>
            </div>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Laatst bijgewerkt: november 2026<br />
              Bronnen: The Lullaby Trust (kamertemperatuur en veilig slapen), VeiligheidNL, Nederlands Centrum Jeugdgezondheid (NCJ).
              Dit is algemene informatie en vervangt geen advies van het consultatiebureau of de huisarts.
            </p>
          </footer>
        </div>
      </article>
    </Layout>
  )
}
