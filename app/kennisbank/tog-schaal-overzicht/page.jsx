import Layout from '../../../components/Layout'
import { ThermometerSun, Thermometer, Info, CheckCircle, AlertTriangle, Calculator, BookOpen, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'De Complete TOG-Schaal: Van 0.5 tot 3.5 Uitgelegd | TOGWaarde.nl',
  description: 'Volledig overzicht van alle TOG-waardes voor babyslaapzakken. Ontdek welke TOG 0.5, 1.0, 2.0, 2.5 en 3.5 betekenen en bij welke temperatuur je ze gebruikt in Nederland.',
  keywords: 'TOG schaal, TOG waardes, TOG 0.5, TOG 1.0, TOG 2.0, TOG 2.5, TOG 3.5, babyslaapzak TOG, thermische isolatie, temperatuurrichtlijnen'
}

export default function TOGSchaalOverzicht() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <ThermometerSun className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            De Complete TOG-Schaal: Van 0.5 tot 3.5 Uitgelegd
          </h1>
          <p className="text-lg text-gray-600">
            De TOG-schaal voor babyslaapzakken loopt van 0.2 tot maximaal 4.0, hoewel kinderartsen waarschuwen dat TOG 4.0 eigenlijk te warm is en oververhittingsrisico's met zich meebrengt. Voor het Nederlandse klimaat zijn vijf TOG-waardes het meest relevant: 0.5, 1.0, 2.0, 2.5 en 3.5. In deze complete gids leggen we elke TOG-waarde uit met exacte temperatuurbereiken, kledingadvies en praktische toepassingen.
          </p>
        </header>

        {/* Main Content - Single White Frame */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Info Box */}
          <div className="relative bg-accent/10 p-6 rounded-lg mb-12 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent/100">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Wat betekent TOG precies?</h3>
                <p className="text-gray-700 leading-relaxed">
                  TOG staat voor Thermal Overall Grade en is een wetenschappelijke eenheid voor thermische weerstand van textiel. Eén TOG-waarde komt overeen met 0,1 m²·K/W thermische isolatie. Het systeem werd in 1946 ontwikkeld in Engeland als praktische manier om kleding en beddengoed te classificeren.
                </p>
              </div>
            </div>
          </div>

          {/* TOG 0.5 Section */}
          <section className="mb-12">
            <div className="bg-default border border-gray-100 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-secondary-dark" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 0.5</h2>
                  <p className="text-lg text-gray-600 font-medium">Zomer & Tropisch</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Temperatuurbereik: 23-26°C of warmer</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TOG 0.5 slaapzakken zijn ultralight en bedoeld voor de warmste nachten van het jaar. Deze dunne slaapzakken zijn gemaakt van één laag ademend materiaal zoals hydrofiel katoen of bamboe-viscose. In Nederland gebruik je deze vooral tijdens hittegolven in de zomer, die gelukkig relatief zeldzaam zijn.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Wat draagt baby onder TOG 0.5?
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 26°C+:</strong> Alleen een luier of heel licht kort mouwtje rompertje</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 24-26°C:</strong> Kort mouwtje rompertje</span>
                </li>
              </ul>
            </div>

            <div className="relative bg-accent/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent/100">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Let op tijdens hittegolven
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Sommige ouders voelen zich ongemakkelijk met alleen een luier, maar tijdens extreme hitte is dit veilig en nodig. Hydrofiel katoen slaapzakken zijn ideaal omdat ze ultra-ademend zijn en vocht snel afvoeren.
              </p>
            </div>
          </section>

          {/* TOG 1.0 Section */}
          <section className="mb-12">
            <div className="bg-default border border-gray-100 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 1.0</h2>
                  <p className="text-lg text-gray-600 font-medium">Lichte Zomer & Tussenseizoen</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Temperatuurbereik: 20-24°C</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TOG 1.0 is de meest veelzijdige waarde en past bij een breed temperatuurbereik. Nederlandse ouders gebruiken deze vaak in de lente, vroege zomer en herfst. Veel merken zoals Jollein en Lodger bieden deze TOG aan in jersey of lichte katoen, wat comfortabel en ademend is.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Wat draagt baby onder TOG 1.0?
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 23-24°C:</strong> Kort mouwtje rompertje</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 20-23°C:</strong> Lange mouw romper</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 20°C:</strong> Lange mouw romper + dun pyjama topje</span>
                </li>
              </ul>
            </div>

            <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Praktijktip:</strong> <span className="text-gray-700">TOG 1.0 is ideaal voor Nederlandse lente en herfst wanneer de temperatuur 's nachts schommelt tussen 18-22°C. Door de kleding onder de slaapzak aan te passen, kan één TOG 1.0 slaapzak een breed temperatuurbereik dekken.</span>
              </p>
            </div>
          </section>

          {/* TOG 2.0 Section */}
          <section className="mb-12">
            <div className="bg-default border border-gray-100 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 2.0</h2>
                  <p className="text-lg text-gray-600 font-medium">Tussenseizoen</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Temperatuurbereik: 18-22°C</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TOG 2.0 vormt een brug tussen zomer en winter en werkt uitstekend bij temperaturen die net te koel zijn voor TOG 1.0, maar nog niet koud genoeg voor de dikke winterslaapzak. Voor veel Nederlandse huizen met verwarming op 19-20°C 's nachts is dit een uitstekende keuze voor het hele jaar.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Wat draagt baby onder TOG 2.0?
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 21-22°C:</strong> Lange mouw romper</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 19-21°C:</strong> Lange mouw romper + dun pyjama setje</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 18-19°C:</strong> Korte mouw romper + warme pyjama</span>
                </li>
              </ul>
            </div>
          </section>

          {/* TOG 2.5 Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-accent/20 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/100 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 2.5</h2>
                  <p className="text-lg text-gray-700 font-medium">Standaard Winter - Populairst in Nederland</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Temperatuurbereik: 16-20°C</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TOG 2.5 is veruit de populairste keuze in Nederland voor de wintermaanden. Dit is de standaard waarmee de meeste Nederlandse ouders door de winter komen. Bij een kamertemperatuur van 18°C – de aanbevolen Nederlandse standaard – is deze TOG-waarde perfect. Merken als Puckababy, Jollein en HEMA bieden uitstekende 2.5 TOG opties met gewatteerde vulling.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Wat draagt baby onder TOG 2.5?
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 19-20°C:</strong> Lange mouw romper + dun pyjama setje</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 17-19°C:</strong> Lange mouw romper + warme flannellen pyjama</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 16-17°C:</strong> Thermo romper + warme pyjama</span>
                </li>
              </ul>
            </div>

            <div className="relative bg-secondary/20 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                De Nederlandse standaard
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Bij een kamertemperatuur van 18°C met TOG 2.5 slaapzak, lange mouw romper en warme pyjama heeft je baby de perfecte temperatuur voor veilige babyslaap volgens RIVM en VeiligheidNL richtlijnen.
              </p>
            </div>
          </section>

          {/* TOG 3.0-3.5 Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-accent/20 p-8 rounded-2xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/100 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">TOG 3.0-3.5</h2>
                  <p className="text-lg text-gray-700 font-medium">Koude Winter</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Temperatuurbereik: Onder 16°C</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Deze dikke, zwaar gewatteerde slaapzakken zijn alleen nodig bij temperaturen onder 16°C, wat in goed verwarmde Nederlandse huizen zelden voorkomt. Ze zijn nuttig voor oude, slecht geïsoleerde huizen of onverwarmde slaapkamers. Lodger biedt bijvoorbeeld een TOG 3.3 winter Hopper, en HEMA heeft TOG 3.5 opties.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Wat draagt baby onder TOG 3.0-3.5?
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 15-16°C:</strong> Lange mouw romper + warme pyjama</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Bij 14-15°C:</strong> Lange mouw romper + extra boxpakje + warme pyjama</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Onder 14°C:</strong> Overweeg verwarming te verhogen naar 16°C minimum</span>
                </li>
              </ul>
            </div>

            <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Oververhittingsrisico
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Wees extra alert op oververhitting bij deze dikke slaapzakken. Controleer regelmatig je baby's nekje – het moet warm en droog aanvoelen, niet klam of zweterig. Een klam nekje is een teken dat je baby het te warm heeft en dat je een laag kleding moet verwijderen.
              </p>
            </div>
          </section>

          {/* Important Principle */}
          <section className="mb-12">
            <div className="relative bg-primary/5 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Belangrijk principe: TOG-waardes optellen
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Je kunt TOG-waardes niet simpelweg bij elkaar optellen tussen verschillende lagen, maar elke laag kleding voegt wel ongeveer 0.5 TOG warmte toe aan het totaal. Dit is een praktische richtlijn, geen exacte wetenschap.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Bijvoorbeeld:</strong> Een baby in een TOG 2.5 slaapzak met een romper (≈0.5 TOG) en pyjama (≈0.5 TOG) heeft effectief ongeveer TOG 3.5 totale isolatie. Gebruik dit als grove schatting en verifieer altijd door het nekje te voelen.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Snel Overzicht: Alle TOG-waardes</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">TOG</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Temperatuur</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Seizoen</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Kleding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">0.5</td>
                    <td className="border border-gray-200 px-4 py-2">23-26°C+</td>
                    <td className="border border-gray-200 px-4 py-2">Zomer hittegolf</td>
                    <td className="border border-gray-200 px-4 py-2">Luier of kort rompertje</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-semibold">1.0</td>
                    <td className="border border-gray-200 px-4 py-2">20-24°C</td>
                    <td className="border border-gray-200 px-4 py-2">Lente/zomer/herfst</td>
                    <td className="border border-gray-200 px-4 py-2">Kort of lang rompertje</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.0</td>
                    <td className="border border-gray-200 px-4 py-2">18-22°C</td>
                    <td className="border border-gray-200 px-4 py-2">Tussenseizoen</td>
                    <td className="border border-gray-200 px-4 py-2">Romper + dun pyjama</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.5</td>
                    <td className="border border-gray-200 px-4 py-2">16-20°C</td>
                    <td className="border border-gray-200 px-4 py-2">Winter standaard</td>
                    <td className="border border-gray-200 px-4 py-2">Romper + warme pyjama</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">3.0-3.5</td>
                    <td className="border border-gray-200 px-4 py-2">Onder 16°C</td>
                    <td className="border border-gray-200 px-4 py-2">Koude winter</td>
                    <td className="border border-gray-200 px-4 py-2">Meerdere lagen + pyjama</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Practical Tips */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Praktische Tips voor TOG-Keuze</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Meet Altijd de Kamertemperatuur
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Gebruik een betrouwbare thermometer in de babykamer. De kamertemperatuur is veel belangrijker dan de buitentemperatuur of het seizoen. Plaats de thermometer op kindhoogte, niet bij een raam of radiator.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Controleer het Nekje
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Voel regelmatig je baby's nekje om te controleren of de temperatuur goed is. Het nekje moet warm en droog aanvoelen. Een klam of zweterig nekje betekent dat je baby het te warm heeft.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Start met Twee TOG-waardes
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Voor het Nederlandse klimaat heb je minimaal twee slaapzakken nodig: TOG 1.0 voor zomer en TOG 2.5 voor winter. Dit is de minimale basisuitrusting voor veilige babyslaap door alle seizoenen.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Pas de Kleding Aan
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Bij twijfel tussen twee TOG-waardes: kies de lagere TOG en voeg een extra kledinglaag toe. Het is makkelijker om kleding aan te passen dan om een nieuwe slaapzak te kopen.
                </p>
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
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white">Twijfel je nog welke TOG je nodig hebt?</h3>
                <p className="opacity-90">Gebruik onze gratis TOG Calculator voor persoonlijk advies op basis van jouw situatie.</p>
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
                href="/kennisbank/wat-is-tog"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Wat is TOG?</h4>
                <p className="text-sm text-gray-600 mb-3">Complete uitleg over het TOG-systeem en hoe het werkt</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/producten"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Aanbevolen Slaapzakken</h4>
                <p className="text-sm text-gray-600 mb-3">Bekijk geteste slaapzakken per TOG-waarde</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Bekijk producten <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Volledige Kennisbank</h4>
                <p className="text-sm text-gray-600 mb-3">Ontdek alle artikelen over veilige babyslaap</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Naar kennisbank <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

      </article>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-schaal-overzicht"
          title="Aanbevolen Babyslaapzakken"
        />
    </Layout>
  )
}
