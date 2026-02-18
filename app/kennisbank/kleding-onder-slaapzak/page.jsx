import Layout from '../../../components/Layout'
import { ThermometerSun, Shirt, Baby, Info, CheckCircle, AlertTriangle, XCircle, Calculator, BookOpen, ArrowRight, Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'Wat Draagt Baby Onder de Slaapzak? Complete Kledingadvies per TOG | TOGWaarde.nl',
  description: 'Ontdek precies wat je baby onder de slaapzak moet dragen per TOG-waarde en temperatuur. Van rompertje tot pyjama - complete kledingadvies voor veilige babyslaap in Nederland.',
  keywords: 'kleding onder slaapzak, wat aan onder babyslaapzak, romper onder slaapzak, pyjama onder slaapzak, baby aankleden slapen, TOG kleding combinatie'
}

export default function KledingOnderSlaapzak() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Kleding Onder de Slaapzak</span>
        </nav>

        {/* Header - NOT framed */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shirt className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wat Draagt Baby Onder de Slaapzak?
          </h1>
          <p className="text-lg text-gray-600">
            De kunst van het kleden onder een slaapzak ligt in het vinden van de juiste balans. Nederlandse kraamzorg en consultatiebureaus hanteren de "plus één laag" regel: kleed je baby in één laag meer dan een volwassene comfortabel zou dragen bij die temperatuur. Deze complete gids geeft exact aan wat je baby moet dragen onder verschillende TOG-waardes en temperaturen.
          </p>
        </header>

        {/* Main Content - FRAMED */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Info Box */}
          <div className="relative p-4 pl-5 rounded-xl flex items-center gap-3 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/80 mb-10">
            <AlertTriangle className="w-5 h-5 text-primary/80 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-sm mb-1 text-primary">De "Plus Één Laag" Regel</div>
              <div className="text-sm text-secondary-dark">Kleed je baby in één laag meer dan wat een volwassene comfortabel zou dragen bij die temperatuur. Als jij 's nachts een t-shirt en pyjama draagt onder je dekbed bij 18°C, dan draagt je baby een romper en pyjama onder de TOG 2.5 slaapzak.</div>
            </div>
          </div>

          {/* TOG 0.5 Clothing */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-secondary-dark" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 0.5</h2>
                  <p className="text-lg text-gray-600 font-medium">26°C of warmer</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Bij TOG 0.5 in 26°C+ kamers zijn de opties minimaal. Deze ultralight slaapzakken zijn bedoeld voor de warmste nachten en tijdens hittegolven. Het doel is maximale koeling en ventilatie.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border-2 border-secondary/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900">Bij 26-28°C</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Optie 1:</strong> Alleen een luier
                      <p className="text-sm text-gray-600 mt-1">Veilig en nodig tijdens extreme hitte</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Optie 2:</strong> Heel licht kort mouwtje rompertje
                      <p className="text-sm text-gray-600 mt-1">Dunne katoen of hydrofiel</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900">Bij 24-26°C</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Aanbevolen:</strong> Kort mouwtje rompertje
                      <p className="text-sm text-gray-600 mt-1">Dunne katoen, ademend materiaal</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Waarom alleen een luier oké is</p>
                <div className="text-base text-gray-700">Sommige ouders voelen zich ongemakkelijk met alleen een luier, maar tijdens extreme hitte is dit veilig en nodig. Baby's kunnen oververhitten tijdens hittegolven, en minimale kleding helpt warmte af te voeren. Hydrofiel katoen slaapzakken zijn ideaal omdat ze ultra-ademend zijn.</div>
              </div>
            </div>
          </section>

          {/* TOG 1.0 Clothing */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 1.0</h2>
                  <p className="text-lg text-gray-600 font-medium">20-24°C</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Voor TOG 1.0 bij 23-24°C draag je typisch een kort of lang mouw rompertje, afhankelijk van je baby's natuurlijke temperatuur. Sommige baby's slapen van nature warmer dan andere. Dit is de meest veelzijdige TOG-waarde waar je door kleding aan te passen een breed temperatuurbereik kunt dekken.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">23-24°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Kort mouwtje rompertje</strong></p>
                <p className="text-xs text-gray-600">Dunne katoen, enkele laag</p>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">21-23°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Lange mouw romper</strong></p>
                <p className="text-xs text-gray-600">Normale dikte katoen</p>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">20-21°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Romper + dun pyjama topje</strong></p>
                <p className="text-xs text-gray-600">Twee dunne lagen</p>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Praktijktip voor TOG 1.0</p>
                <div className="text-base text-gray-700">TOG 1.0 is ideaal voor Nederlandse lente en herfst wanneer de temperatuur 's nachts schommelt tussen 20-22°C. Door de kleding onder de slaapzak aan te passen, kan één TOG 1.0 slaapzak een breed temperatuurbereik dekken zonder dat je meerdere TOG-waardes nodig hebt.</div>
              </div>
            </div>
          </section>

          {/* TOG 2.0 Clothing */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 2.0</h2>
                  <p className="text-lg text-gray-600 font-medium">18-22°C</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              TOG 2.0 bij 20-22°C vraagt om wat meer: een lange mouw romper plus een dun pyjama setje, of een korte mouw romper onder warme pyjama's. In de praktijk zijn dit vaak twee lagen plus de slaapzak. Dit is een veelvoorkomend scenario in Nederlandse huizen tijdens lente en herfst.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">21-22°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Lange mouw romper</strong></p>
                <p className="text-xs text-gray-600">Alleen romper zonder extra pyjama</p>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">19-21°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Romper + dun pyjama setje</strong></p>
                <p className="text-xs text-gray-600">Lange mouw romper + dunne pyjama</p>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">18-19°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Kort romper + warme pyjama</strong></p>
                <p className="text-xs text-gray-600">Of: lange romper + warme pyjama</p>
              </div>
            </div>
          </section>

          {/* TOG 2.5 Clothing */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 2.5</h2>
                  <p className="text-lg text-gray-600 font-medium">16-20°C - Nederlandse Standaard</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              De TOG 2.5 setup bij 16-19°C – de Nederlandse winter standaard – combineert een lange mouw romper met een warme flannellen pyjama onder de slaapzak. Sommige ouders gebruiken een thermo romper onder normale pyjama's, wat ook uitstekend werkt. Bij een stabiele kamertemperatuur van 18°C is deze combinatie ideaal en voldoende.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">19-20°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Romper + dun pyjama setje</strong></p>
                <p className="text-xs text-gray-600">Lange mouw romper + lichte pyjama</p>
              </div>

              <div className="bg-white border-2 border-accent/20 rounded-xl p-5 ring-2 ring-accent/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-gray-900 text-sm">17-19°C (optimaal)</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Romper + warme pyjama</strong></p>
                <p className="text-xs text-gray-600">Standaard Nederlandse wintercombinatie</p>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">16-17°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Thermo romper + warme pyjama</strong></p>
                <p className="text-xs text-gray-600">Extra warme laag nodig</p>
              </div>
            </div>

            <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                De perfecte Nederlandse wintercombinatie
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Bij een kamertemperatuur van 18°C met TOG 2.5 slaapzak, lange mouw romper en warme flannellen pyjama heeft je baby de perfecte temperatuur voor veilige babyslaap in lijn met RIVM en VeiligheidNL aanbevelingen voor babyslaap.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Materialen:</strong> Kies voor natuurlijke materialen zoals katoen of flanel voor de pyjama. Deze ademen beter dan synthetische stoffen en voeren vocht goed af.
              </p>
            </div>
          </section>

          {/* TOG 3.0-3.5 Clothing */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl p-6 border border-accent/20 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/100 rounded-xl flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 3.0-3.5</h2>
                  <p className="text-lg text-gray-600 font-medium">Onder 16°C</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Voor TOG 3.0-3.5 onder 16°C laag je zwaarder: lange mouw romper, plus een extra boxpakje of romper, plus warme pyjama, allemaal onder de dikke slaapzak. Let hier extra op oververhitting – deze setup is de maximale isolatie en veel baby's hebben het hier te warm. Controleer elk uur het nekje in de eerste nachten met een nieuwe combinatie.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">15-16°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Romper + warme pyjama</strong></p>
                <p className="text-xs text-gray-600">Lange mouw romper + flannellen pyjama</p>
              </div>

              <div className="bg-white border-2 border-secondary/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900 text-sm">14-15°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Romper + boxpakje + pyjama</strong></p>
                <p className="text-xs text-gray-600">Drie lagen onder slaapzak</p>
              </div>

              <div className="bg-white border-2 border-accent/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-gray-900 text-sm">Onder 14°C</h3>
                </div>
                <p className="text-gray-700 text-sm mb-2"><strong>Verhoog verwarming!</strong></p>
                <p className="text-xs text-gray-600">Minimum 16°C voor babyveiligheid</p>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Extra alertheid bij TOG 3.0-3.5</p>
                <div className="text-base text-gray-700">
                  <p className="mb-3">Wees extra alert op oververhitting bij deze dikke slaapzakken met veel kledinglagen. Controleer regelmatig je baby's nekje – het moet warm en droog aanvoelen, niet klam of zweterig.</p>
                  <p>Een klam nekje is een teken dat je baby het te warm heeft en dat je een laag kleding moet verwijderen. Bij deze TOG-waarde is het beter om te conservatief te zijn dan te warm aan te kleden.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Important Exceptions */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Belangrijke Uitzonderingen</h2>

            <div className="space-y-6">
              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent">
                <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Nooit een Muts of Hoofdbedekking Binnenshuis</p>
                  <div className="text-base text-gray-700">
                    <p className="mb-3">Gebruik nooit een muts of hoofdbedekking binnenshuis tijdens slaap. Baby's reguleren hun temperatuur hoofdzakelijk via het hoofd, en een muts verhoogt het risico op oververhitting aanzienlijk. Een mutsje binnenshuis tijdens het slapen verhoogt het risico op oververhitting aanzienlijk.</p>
                    <p><strong>Regel:</strong> Mutsen zijn alleen voor buiten. Verwijder ze zodra je binnenkomt.</p>
                  </div>
                </div>
              </div>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
                <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Sokjes: Meestal Niet Nodig</p>
                  <div className="text-base text-gray-700">Sokjes zijn meestal niet nodig als de kamertemperatuur correct is en je de juiste TOG gebruikt. Baby's hebben van nature koelere handjes en voetjes door onvolgroeide circulatie – dit is normaal en geen teken van onderkoeling. In de Nederlandse slaapkamercultuur zijn blote voetjes onder een goed gekozen slaapzak volkomen veilig.</div>
                </div>
              </div>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
                <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Individuele Verschillen</p>
                  <div className="text-base text-gray-700">Sommige baby's slapen van nature warmer of koeler dan andere. Deze richtlijnen zijn startpunten – pas aan op basis van wat je voelt bij het nekje. Een baby die altijd klam is, heeft minder lagen nodig. Een baby met een consistent koel nekje kan een extra laag gebruiken.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Material Guide */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Materiaaladvies voor Kleding</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Aanbevolen Materialen
                </h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>100% Katoen</strong> - Ademend, absorbeert vocht, comfortabel
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Bamboe-viscose</strong> - Extra ademend, zacht, temperatuurregulerend
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Flanel</strong> - Perfect voor winter pyjama's, warm maar ademend
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Jersey</strong> - Rekbaar, comfortabel, goed voor rompers
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Hydrofiel katoen</strong> - Ultralight voor zomer, snel drogend
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-primary" />
                  Vermijd Deze Materialen
                </h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>100% Polyester/Synthetisch</strong> - Ademt niet, houdt warmte vast
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Fleece (behalve buitenkleding)</strong> - Te warm voor slapen
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Wol (tegen blote huid)</strong> - Kan irriteren, te warm
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Dikke hoodies/sweaters</strong> - Oververhittingsrisico
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mt-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Waarom Natuurlijke Materialen?</p>
                <div className="text-base text-gray-700">Natuurlijke materialen zoals katoen en bamboe ademen veel beter dan synthetische stoffen. Ze laten lucht circuleren en voeren vocht (zweet) snel af van de huid. Dit helpt je baby's lichaamstemperatuur te reguleren en voorkomt oververhitting en klamme huid.</div>
              </div>
            </div>
          </section>

          {/* Quick Reference Table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Snelle Referentie: Kleding per TOG en Temperatuur</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">Temperatuur</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">TOG</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Kleding Onder Slaapzak</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">26°C+</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">0.5</td>
                    <td className="border border-gray-200 px-4 py-2">Luier of kort rompertje</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">24-26°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">0.5</td>
                    <td className="border border-gray-200 px-4 py-2">Kort mouwtje rompertje</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">23-24°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">1.0</td>
                    <td className="border border-gray-200 px-4 py-2">Kort mouwtje rompertje</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">21-23°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">1.0</td>
                    <td className="border border-gray-200 px-4 py-2">Lange mouw romper</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">20-21°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">1.0</td>
                    <td className="border border-gray-200 px-4 py-2">Romper + dun pyjama topje</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">19-21°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.0</td>
                    <td className="border border-gray-200 px-4 py-2">Romper + dun pyjama setje</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">18-19°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.0</td>
                    <td className="border border-gray-200 px-4 py-2">Korte/lange romper + warme pyjama</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">17-19°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.5</td>
                    <td className="border border-gray-200 px-4 py-2"><strong>Romper + warme pyjama</strong> (standaard NL)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">16-17°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.5</td>
                    <td className="border border-gray-200 px-4 py-2">Thermo romper + warme pyjama</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">14-16°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">3.0-3.5</td>
                    <td className="border border-gray-200 px-4 py-2">Romper + boxpakje + warme pyjama</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Practical Tips */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Praktische Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Controle Checklist
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Voel het nekje: warm en droog = goed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Voel de borst/rug: niet klam of zweterig</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Controleer 30 minuten na het slapen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Let niet alleen op handjes en voetjes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Pas aan bij eerste tekenen van te warm/koud</span>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-secondary-dark" />
                  Handige Aanpak
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Koop kleding in sets (3-4 rompers, 3-4 pyjama's)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Label kledingcombinaties per temperatuur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Bereid kleding voor op basis van voorspelling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Houd reserve bij wieg voor snelle aanpassing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Was op 40°C voor hygiëne zonder slijtage</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Sections */}
        <div className="mt-12 space-y-6">
          {/* Calculator CTA */}
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white">Weet niet zeker welke kleding je nodig hebt?</h3>
                <p className="opacity-90">Gebruik onze TOG Calculator voor persoonlijk advies inclusief exacte kledingcombinaties.</p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-primary font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                <Calculator className="w-5 h-5" />
                <span>Naar TOG Calculator</span>
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Gerelateerde Artikelen
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/kennisbank/tog-waarde-babykleding-tabel"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">TOG-waarde Babykleding Tabel</h4>
                <p className="text-sm text-gray-600 mb-3">Kledingcombinaties per temperatuur</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/tog-schaal-overzicht"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">TOG-Schaal Overzicht</h4>
                <p className="text-sm text-gray-600 mb-3">Alle TOG-waardes uitgelegd</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/oververhitting-herkennen"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Oververhitting Herkennen</h4>
                <p className="text-sm text-gray-600 mb-3">Te warm door extra kleding?</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

      </article>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="kleding-onder-slaapzak"
          title="Aanbevolen Babyslaapzakken"
        />
    </Layout>
  )
}
