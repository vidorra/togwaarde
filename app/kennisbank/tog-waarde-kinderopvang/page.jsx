import Layout from '../../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'
import { Baby, Thermometer, Info, CheckCircle, Calculator, Check, ClipboardList, AlertTriangle, ChevronRight, BookOpen } from 'lucide-react'
import { generateFAQSchema } from '../../../lib/structured-data'

export const metadata = {
  title: 'TOG-waarde bij de kinderopvang: welke slaapzak mee?',
  description: 'Welke TOG-waarde neem je mee naar de opvang? Kies de slaapzak op de slaapkamertemperatuur van de opvang, niet op thuis. Praktisch, overdraagbaar advies voor de leidster.',
  keywords: 'tog waarde kinderopvang, slaapzak opvang, welke tog opvang, baby slaapzak kinderdagverblijf, tog opvang temperatuur, veilig slapen opvang, slaapzak leidster',
  alternates: { canonical: '/kennisbank/tog-waarde-kinderopvang/' },
}

const faqSchema = [
  {
    question: 'Welke TOG-waarde neem ik mee naar de opvang?',
    answer: 'Kies de TOG op basis van de temperatuur van de slaapkamer op de opvang, niet op basis van je situatie thuis. Vraag de leidsters hoe warm hun slaapkamer is: bij 20-24°C past TOG 1.0, bij 16-20°C past TOG 2.5. Weet je de temperatuur niet zeker? Geef dan twee slaapzakken mee (bijvoorbeeld 1.0 en 2.5) zodat de opvang kan aanpassen.'
  },
  {
    question: 'Wat als de slaapkamer op de opvang warmer of kouder is dan thuis?',
    answer: 'Dan kan de juiste TOG anders zijn dan de slaapzak die je thuis gebruikt. Een opvangkamer heeft vaak een andere temperatuur door meer kinderen, andere verwarming of ventilatie. De TOG hangt altijd af van de kamertemperatuur waar de baby slaapt, dus laat de opvang die meten en stem de slaapzak daarop af.'
  },
  {
    question: 'Mag mijn baby ingebakerd op de opvang?',
    answer: 'Veel opvangen bakeren niet in vanwege hun eigen slaapbeleid. Wil je dat je baby ingebakerd slaapt, stem dit dan vooraf af met de leidsters. Inbakeren hoort sowieso te stoppen rond 4 maanden, of eerder zodra je baby tekenen van omrollen laat zien, omdat inbakeren dan onveilig wordt.'
  },
  {
    question: 'Wat geef ik mee aan de opvang?',
    answer: 'Geef een slaapzak met de juiste TOG mee, voorzien van de naam van je baby. Voeg eventueel een passend rompertje of pyjama toe dat bij de kamertemperatuur past. Geef geen losse dekens, kussens of knuffels mee voor in bed: dat past niet bij veilig slapen. Een kaartje met welke TOG bij welke temperatuur hoort en hoe de nek-test werkt, helpt de leidster om je baby goed aan te kleden.'
  }
]

export default function TOGWaardeKinderopvangPage() {
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
          <span className="text-primary">TOG-waarde bij de kinderopvang</span>
        </nav>

        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Baby className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            TOG-waarde bij de kinderopvang
          </h1>
          <p className="text-lg text-gray-600">
            Welke slaapzak neem je mee naar de opvang, en hoe geef je de leidster duidelijk advies?
          </p>
        </header>

        {/* Main Content - Single White Frame */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-4">TOG hangt af van de kamertemperatuur, niet van thuis of opvang</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ga je baby naar de opvang, dan slaapt hij of zij in een ander bedje en vaak in een kamer met een andere temperatuur dan thuis. Dat roept de vraag op: welke TOG-waarde neem je mee? Het antwoord is simpel: <strong>de juiste TOG hangt af van de temperatuur van de slaapkamer waar je baby slaapt</strong>, niet van de vraag of dat thuis of op de opvang is. Kies dus de slaapzak op basis van de kamertemperatuur op de opvang.
            </p>
            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mb-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Kort gezegd:</p>
                <div className="text-base text-gray-700">
                  Vraag de opvang hoe warm hun slaapkamer is en kies de TOG-waarde daarop. Weet je het niet zeker? Geef twee slaapzakken mee, zodat de leidsters kunnen aanpassen.
                </div>
              </div>
            </div>
          </section>

          {/* Waarom kan de TOG anders zijn */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Waarom de opvangkamer een andere temperatuur kan hebben</h2>
            <p className="text-lg text-gray-700 mb-6">
              Een slaapkamer op de opvang voelt vaak anders dan de babykamer thuis. Dat komt door een aantal dingen:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Er slapen meer kinderen in of naast dezelfde ruimte</li>
              <li>De opvang gebruikt andere verwarming en ventilatie</li>
              <li>Slaapkamers of buitenbedjes kunnen koeler of juist warmer zijn dan je thuis gewend bent</li>
            </ul>
            <p className="text-lg text-gray-700 mb-6">
              Daardoor kan de slaapzak die thuis perfect is, op de opvang net te warm of te koud zijn. De TOG-waarde die je meegeeft, stem je dus af op de opvangkamer.
            </p>
          </section>

          {/* TOG per temperatuur */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Welke TOG bij welke kamertemperatuur</h2>
            <p className="text-lg text-gray-700 mb-6">
              Dit zijn de gangbare TOG-banden. Vraag de opvang naar hun gemeten slaapkamertemperatuur en kies de bijbehorende waarde:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">Kamertemperatuur opvang</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Aanbevolen TOG</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Kleding onder slaapzak</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">24°C of hoger</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 0.5</td>
                    <td className="border border-gray-200 px-4 py-2">Alleen romper of body</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">20-24°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 1.0</td>
                    <td className="border border-gray-200 px-4 py-2">Korte mouw romper</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">16-20°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 2.5</td>
                    <td className="border border-gray-200 px-4 py-2">Lange mouw romper</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">Onder 16°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">TOG 3.5</td>
                    <td className="border border-gray-200 px-4 py-2">Lange mouw romper + slaappakje</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mt-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Let op de totale warmte:</p>
                <div className="text-base text-gray-700">
                  De ideale kamertemperatuur voor veilig slapen is 16-18°C. Ga nooit boven 4.0 TOG in totaal (kleding plus slaapzak samen), om oververhitting te voorkomen. Lees meer over{' '}
                  <Link href="/kennisbank/babykamer-temperatuur" className="text-primary hover:underline font-medium">de ideale babykamer temperatuur</Link>.
                </div>
              </div>
            </div>
          </section>

          {/* Twee slaapzakken meegeven */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Weet je de temperatuur niet? Geef twee slaapzakken mee</h2>
            <p className="text-lg text-gray-700 mb-6">
              Kun je de kamertemperatuur op de opvang niet goed inschatten, of wisselt die per seizoen? Geef dan twee slaapzakken mee, bijvoorbeeld een TOG 1.0 en een TOG 2.5. Zo kunnen de leidsters de juiste kiezen bij de temperatuur van dat moment.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vraag naar de slaapkamertemperatuur</h3>
                  <p className="text-gray-700">
                    Vraag de leidsters hoe warm hun slaapkamer is en of ze die meten. Zo kies je meteen de passende TOG.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Geef twee TOG-waardes mee bij twijfel</h3>
                  <p className="text-gray-700">
                    Een lichtere en een warmere slaapzak (bijvoorbeeld 1.0 en 2.5) geven de opvang ruimte om aan te passen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Overdraagbaar advies voor de leidster */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Overdraagbaar advies voor de leidster</h2>
            <p className="text-lg text-gray-700 mb-6">
              De leidsters zorgen voor veel kinderen tegelijk. Duidelijke, korte informatie helpt hen om jouw baby goed aan te kleden:
            </p>
            <div className="space-y-4">
              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Slaapzak met naam:</p>
                  <div className="text-base text-gray-700">
                    Zet de naam van je baby in de slaapzak, zodat hij niet verwisseld wordt met die van een ander kind.
                  </div>
                </div>
              </div>
              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Een kaartje met TOG per temperatuur:</p>
                  <div className="text-base text-gray-700">
                    Noteer welke TOG bij welke kamertemperatuur hoort en leg kort uit hoe de nek-test werkt: voel in de nek of tussen de schouderbladen of je baby lekker warm aanvoelt, niet klam of koud. Handjes en voetjes mogen wat koeler zijn.
                  </div>
                </div>
              </div>
              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Geen extra dekentje in bed:</p>
                  <div className="text-base text-gray-700">
                    De slaapzak vervangt dekens. Vraag de opvang om geen losse deken over je baby te leggen bovenop de slaapzak.
                  </div>
                </div>
              </div>
              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-primary/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Veilig slapen:</p>
                  <div className="text-base text-gray-700">
                    Baby op de rug te slapen, in een leeg bedje zonder kussens, knuffels of losse dekens. Dit is de basis van veilig slapen, thuis en op de opvang.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Checklist wat meegeven */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-primary" />
              Checklist: wat geef je mee?
            </h2>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Slaapzak(ken) met de juiste TOG, voorzien van de naam van je baby</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Bij twijfel over de temperatuur: een lichtere en een warmere slaapzak (bijvoorbeeld 1.0 en 2.5)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Een passend rompertje of pyjama dat bij de kamertemperatuur past</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Een kaartje met welke TOG bij welke temperatuur hoort en hoe de nek-test werkt</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Geen losse dekens, kussens of knuffels voor in bed, volgens de regels voor veilig slapen</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Inbakeren op de opvang */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Inbakeren op de opvang</h2>
            <p className="text-lg text-gray-700 mb-6">
              Wil je dat je baby ingebakerd slaapt? Stem dit dan vooraf af met de opvang. Veel opvangen bakeren namelijk niet in vanwege hun eigen slaapbeleid, en willen dit alleen doen na duidelijke afspraken. Houd er ook rekening mee dat inbakeren sowieso hoort te stoppen rond 4 maanden, of eerder zodra je baby tekenen van omrollen laat zien. Vanaf dat moment is inbakeren niet meer veilig.
            </p>
          </section>

          {/* Amber let op */}
          <section className="mb-4">
            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Let op:</p>
                <div className="text-base text-gray-700">
                  Veilig slapen gaat altijd voor. Stem het slaapbeleid af met de opvang en volg hun afspraken over slaaphouding, inbakeren en de inrichting van het bedje. Twijfel je of maak je je zorgen, overleg dan met het consultatiebureau.
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-4">
            <h2 className="text-lg font-semibold text-primary mb-6">Veelgestelde Vragen</h2>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Welke TOG-waarde neem ik mee naar de opvang?
                </h3>
                <p className="text-gray-700">
                  Kies de TOG op basis van de temperatuur van de slaapkamer op de opvang, niet op basis van je situatie thuis. Vraag de leidsters hoe warm hun slaapkamer is: bij 20-24°C past TOG 1.0, bij 16-20°C past TOG 2.5. Weet je de temperatuur niet zeker? Geef dan twee slaapzakken mee (bijvoorbeeld 1.0 en 2.5) zodat de opvang kan aanpassen.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Wat als de slaapkamer op de opvang warmer of kouder is dan thuis?
                </h3>
                <p className="text-gray-700">
                  Dan kan de juiste TOG anders zijn dan de slaapzak die je thuis gebruikt. Een opvangkamer heeft vaak een andere temperatuur door meer kinderen, andere verwarming of ventilatie. De TOG hangt altijd af van de kamertemperatuur waar de baby slaapt, dus laat de opvang die meten en stem de slaapzak daarop af.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Mag mijn baby ingebakerd op de opvang?
                </h3>
                <p className="text-gray-700">
                  Veel opvangen bakeren niet in vanwege hun eigen slaapbeleid. Wil je dat je baby ingebakerd slaapt, stem dit dan vooraf af met de leidsters. Inbakeren hoort sowieso te stoppen rond 4 maanden, of eerder zodra je baby tekenen van omrollen laat zien, omdat inbakeren dan onveilig wordt.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Wat geef ik mee aan de opvang?
                </h3>
                <p className="text-gray-700">
                  Geef een slaapzak met de juiste TOG mee, voorzien van de naam van je baby. Voeg eventueel een passend rompertje of pyjama toe dat bij de kamertemperatuur past. Geef geen losse dekens, kussens of knuffels mee voor in bed: dat past niet bij veilig slapen. Een kaartje met welke TOG bij welke temperatuur hoort en hoe de nek-test werkt, helpt de leidster om je baby goed aan te kleden.
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
              Bereken de TOG-waarde voor de kamertemperatuur op de opvang
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Vul de temperatuur van de opvangkamer in en zie direct welke TOG-waarde je het beste meegeeft
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
            <Link href="/kennisbank/babykamer-temperatuur" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">Ideale Babykamer Temperatuur →</div>
              <div className="text-sm text-gray-600">Welke kamertemperatuur is ideaal voor veilige babyslaap?</div>
            </Link>

            <Link href="/kennisbank/tog-waarde-babykleding-tabel" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">TOG-waarde Babykleding Tabel →</div>
              <div className="text-sm text-gray-600">Welke kleding onder de slaapzak bij welke TOG en temperatuur</div>
            </Link>

            <Link href="/kennisbank/veilige-slaaptemperatuur" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">Veilige Slaaptemperatuur →</div>
              <div className="text-sm text-gray-600">Veiligheidsgrenzen voor de slaapkamer van je baby</div>
            </Link>

            <Link href="/" className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default">
              <div className="font-medium text-primary">TOG Calculator →</div>
              <div className="text-sm text-gray-600">Bereken de juiste TOG-waarde voor jouw baby</div>
            </Link>
          </div>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-waarde-kinderopvang"
          title="Aanbevolen Babyslaapzakken"
        />
      </article>
    </Layout>
  )
}
