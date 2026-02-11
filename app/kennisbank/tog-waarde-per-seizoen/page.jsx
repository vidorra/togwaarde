import Layout from '../../../components/Layout'
import { ThermometerSun, Snowflake, Sun, CloudRain, Leaf, Info, CheckCircle, AlertTriangle, Calculator, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'TOG-waarde per Seizoen in Nederland: Winter, Lente, Zomer & Herfst | TOGWaarde.nl',
  description: 'Ontdek welke TOG-waarde je baby nodig heeft per seizoen in Nederland. Complete gids met praktische tips voor winter, lente, zomer en herfst inclusief centrale verwarming advies.',
  keywords: 'TOG per seizoen, TOG winter Nederland, TOG zomer, TOG lente herfst, seizoensgebonden TOG, centrale verwarming baby, Nederlandse klimaat babyslaap'
}

export default function TOGWaardePerSeizoen() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Header - NOT framed */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <ThermometerSun className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            TOG-waarde per Seizoen in Nederland
          </h1>
          <p className="text-lg text-gray-600">
            Het gematigde Nederlandse klimaat vraagt om een pragmatische aanpak van TOG-waardes door de seizoenen heen. De buitentemperatuur is minder relevant dan de temperatuur in de babykamer – meet die altijd met een betrouwbare thermometer. Deze complete gids helpt je de juiste TOG-waarde te kiezen voor elke maand van het jaar, met specifieke tips voor het Nederlandse klimaat en centrale verwarming.
          </p>
        </header>

        {/* Main Content - FRAMED */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Info Box */}
          <div className="relative bg-primary/5 p-6 rounded-lg mb-10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
            <p className="text-gray-800 font-medium">
              <Info className="w-5 h-5 inline mr-2 text-primary" />
              <strong>Kamertemperatuur belangrijker dan seizoen:</strong> Het seizoen geeft een indicatie, maar de daadwerkelijke kamertemperatuur bepaalt welke TOG-waarde je nodig hebt. Een babykamer in de winter met centrale verwarming kan dezelfde TOG vereisen als in de lente. Meet daarom altijd de exacte temperatuur met een thermometer.
            </p>
          </div>

          {/* Winter Section */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Snowflake className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">Nederlandse Winter</h2>
                  <p className="text-lg text-gray-600 font-medium">December - Februari</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Typische Kamertemperatuur: 16-19°C</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nederlandse winters betekenen meestal binnentemperaturen van 16-19°C met centrale verwarming. De meeste huishoudens houden de thermostaat tussen 18-20°C overdag en laten deze 's nachts zakken naar 16-18°C. Dit is de periode waarin TOG 2.5 het meest wordt gebruikt.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Aanbevolen Setup Winter
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>TOG 2.5</strong> - De standaard winterkeuze
                    <p className="text-sm text-gray-600 mt-1">Perfect voor 16-20°C met centrale verwarming</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Kleding:</strong> Lange mouw romper + warme flannellen pyjama
                    <p className="text-sm text-gray-600 mt-1">Bij 18°C is dit de ideale combinatie</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>TOG 3.0-3.5</strong> - Alleen voor onverwarmde kamers
                    <p className="text-sm text-gray-600 mt-1">Bij temperaturen onder 16°C in slecht geïsoleerde huizen</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Veelgemaakte winterfout
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Verhoog niet de thermostaat boven 20°C "voor de baby" – dit vergroot juist het oververhittingsrisico. Baby's hebben dezelfde slaapkamertemperatuur nodig als volwassenen, of zelfs iets koeler. De ideale temperatuur is 18°C voor zowel baby als volwassene.
              </p>
            </div>

            <div className="bg-primary/10 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Praktische Wintertips</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Laat de verwarming 's nachts niet te laag zakken (minimum 16°C)</li>
                <li>✓ Plaats het bedje niet direct bij een radiator of raam</li>
                <li>✓ Controleer het nekje extra tijdens koude nachten</li>
                <li>✓ Voorwarm het bed niet met een kruik – dit is gevaarlijk</li>
                <li>✓ Gebruik geen extra dekentjes – TOG 2.5 is voldoende</li>
              </ul>
            </div>
          </section>

          {/* Spring Section */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">Nederlands Voorjaar</h2>
                  <p className="text-lg text-gray-600 font-medium">Maart - Mei</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Typische Kamertemperatuur: 15-22°C (wisselend)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Het voorjaar brengt de meeste uitdagingen door sterk wisselende temperaturen. Ochtenden kunnen nog 15°C zijn terwijl het overdag 22°C wordt. Dit is het seizoen waarin je het meest moet schakelen tussen verschillende TOG-waardes en kledinglagen.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Voorjaar Strategie
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Maart (nog koud):</strong> TOG 2.5 met warme kleding
                    <p className="text-sm text-gray-600 mt-1">Verwarming staat meestal nog aan, 16-18°C</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>April (wisselend):</strong> TOG 2.0 of 2.5 met aanpasbare kleding
                    <p className="text-sm text-gray-600 mt-1">Houd beide TOG-waardes bij de hand, 17-20°C</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Mei (warmer):</strong> TOG 1.0 of 2.0
                    <p className="text-sm text-gray-600 mt-1">Verwarming vaak uit, 18-22°C</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                Slimme voorjaarstip
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Slimme ouders houden zowel TOG 2.0 als TOG 2.5 bij de hand en passen aan per nacht. Slaapzakken met afritsbare mouwen van merken als Jollein en HEMA zijn ideaal voor dit seizoen – mouwtjes eraf voor warmere nachten, erop voor koelere.
              </p>
            </div>

            <div className="bg-secondary/20 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Praktische Voorjaarstips</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Check de temperatuur elke avond – niet automatisch dezelfde setup gebruiken</li>
                <li>✓ Het moment dat de verwarming uitgaat is kritiek – meet opnieuw</li>
                <li>✓ Warme lentedagen betekenen niet automatisch warme nachten</li>
                <li>✓ Pas eerst de kleding aan voordat je een andere TOG-waarde koopt</li>
                <li>✓ Investeer in slaapzakken met afritsbare mouwen voor flexibiliteit</li>
              </ul>
            </div>
          </section>

          {/* Summer Section */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Sun className="w-8 h-8 text-secondary-dark" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">Nederlandse Zomer</h2>
                  <p className="text-lg text-gray-600 font-medium">Juni - Augustus</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Typische Kamertemperatuur: 20-26°C</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nederlandse zomers schommelen meestal tussen 20-26°C, met incidentele hittegolven die nog warmer worden. Voor normale zomernachten rond 22°C is TOG 1.0 perfect. Tijdens hittegolven boven 26°C schakel je over op TOG 0.5. De uitdaging is dat zolderkamers of zuidgerichte slaapkamers overdag sterk kunnen opwarmen.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Aanbevolen Setup Zomer
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Normale zomernacht (20-24°C):</strong> TOG 1.0
                    <p className="text-sm text-gray-600 mt-1">Met kort of lang mouwtje rompertje, afhankelijk van precieze temperatuur</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Warme zomernacht (24-26°C):</strong> TOG 0.5 of 1.0
                    <p className="text-sm text-gray-600 mt-1">TOG 1.0 met alleen luier, of TOG 0.5 met kort rompertje</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Hittegolf (26°C+):</strong> TOG 0.5
                    <p className="text-sm text-gray-600 mt-1">Met alleen een luier of heel licht kort mouwtje rompertje</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Zolderkamers en hitte
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                De grote uitdaging in Nederlandse zomers is dat zolderkamers of zuidgerichte slaapkamers overdag sterk opwarmen. Houd gordijnen dicht tijdens de dag en ventileer in de vroege ochtend. Meet de temperatuur vlak voor het slapengaan, niet overdag.
              </p>
            </div>

            <div className="bg-accent/10 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Praktische Zomertips</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Investeer in hydrofiel katoen slaapzakken – ultra-ademend en snel drogend</li>
                <li>✓ Laat ramen open voor ventilatie, maar gebruik horren tegen muggen</li>
                <li>✓ Gebruik een ventilator (niet direct op baby gericht) voor luchtcirculatie</li>
                <li>✓ Bij alleen een luier: dit is veilig en nodig tijdens extreme hitte</li>
                <li>✓ Controleer vaker het nekje tijdens hittegolven</li>
                <li>✓ Donkere gordijnen overdag dicht houden om opwarming te voorkomen</li>
              </ul>
            </div>
          </section>

          {/* Autumn Section */}
          <section className="mb-12">
            <div className="bg-default rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <CloudRain className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-1">Nederlandse Herfst</h2>
                  <p className="text-lg text-gray-600 font-medium">September - November</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Typische Kamertemperatuur: 15-22°C (dalend)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              De herfst lijkt sterk op het voorjaar met wisselende temperaturen, maar dan in omgekeerde richting – dalende in plaats van stijgende temperaturen. Start het seizoen nog met TOG 1.0 of 2.0, maar houd TOG 2.5 klaar voor wanneer de verwarming aangaat (meestal oktober). De overgang verloopt geleidelijk.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                Herfst Strategie
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>September (nog warm):</strong> TOG 1.0 of 2.0
                    <p className="text-sm text-gray-600 mt-1">Vergelijkbaar met late lente, 18-22°C</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>Oktober (wisselend):</strong> TOG 2.0 of 2.5
                    <p className="text-sm text-gray-600 mt-1">Verwarming gaat meestal aan, temperatuur stabiliseert rond 18°C</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>November (koud):</strong> TOG 2.5
                    <p className="text-sm text-gray-600 mt-1">Overgang naar wintersetup, 16-18°C</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Het moment dat de verwarming aangaat
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Het moment waarop de verwarming aangaat (meestal oktober) is kritiek – controleer de kamertemperatuur daarna opnieuw omdat centrale verwarming alles verandert. De temperatuur stabiliseert dan meestal rond 18-19°C, perfect voor TOG 2.5.
              </p>
            </div>

            <div className="bg-accent/10 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Geleidelijke Herfsttransitie</h4>
              <p className="text-gray-700 text-sm mb-3">
                De overgang verloopt geleidelijk: eerst een extra laag kleding onder de lichtere slaapzak, dan pas overschakelen naar de warmere TOG-waarde. Dit voorkomt slaapverstoringen door plotselinge veranderingen.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>1. Start met TOG 2.0 + lange mouw romper (september)</li>
                <li>2. Voeg een dun pyjama topje toe (begin oktober)</li>
                <li>3. Schakel naar TOG 2.5 + romper + pyjama (eind oktober)</li>
                <li>4. Dit blijft je setup voor de hele winter</li>
              </ul>
            </div>
          </section>

          {/* Central Heating Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">
                Centrale Verwarming: De Nederlandse Standaard
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Woningen met centrale verwarming – de meeste Nederlandse huizen – kunnen het hele jaar door op 18-19°C gehouden worden. Dit vereenvoudigt de keuze enorm en maakt seizoenen minder relevant.
              </p>

              <div className="bg-white rounded-xl p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Met Centrale Verwarming</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>TOG 2.5 als standaard</strong> het hele jaar door bij 18-19°C
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Seizoensaanpassingen</strong> door de kleding onder de slaapzak te variëren
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>TOG 0.5 of 1.0</strong> alleen nodig tijdens extreme hittegolven
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Zonder Centrale Verwarming</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  In oudere, slecht geïsoleerde woningen zonder centrale verwarming is het verstandig om het complete TOG-bereik aan te schaffen:
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• TOG 0.5 voor zomerse hittegolven</li>
                  <li>• TOG 1.0 voor lente en zomer</li>
                  <li>• TOG 2.5 voor herfst en winter</li>
                  <li>• TOG 3.5 voor zeer koude nachten onder 16°C</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Transition Tips */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Tips voor Seizoensovergangen</h2>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Gouden regel: Één verandering tegelijk
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Pas ofwel de TOG-waarde aan, ofwel de kleding eronder – niet beide tegelijk. Monitor dan 2-3 nachten of deze aanpassing werkt voordat je verder gaat.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">✓ Wel doen</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Kamertemperatuur dagelijks meten</li>
                  <li>• Geleidelijk lagen toevoegen of verwijderen</li>
                  <li>• Het nekje controleren na aanpassingen</li>
                  <li>• Alle seizoens-slaapzakken toegankelijk bewaren</li>
                  <li>• Slaapzakken met afritsbare mouwen gebruiken</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">✗ Niet doen</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Op gevoel afgaan zonder thermometer</li>
                  <li>• Plotseling twee TOG-waardes omhoog/omlaag</li>
                  <li>• Extra dekentjes gebruiken bij twijfel</li>
                  <li>• Dezelfde setup blijven gebruiken uit gewoonte</li>
                  <li>• Alleen op handjes/voetjes afgaan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Snel Overzicht: TOG per Maand</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-secondary/10 border border-secondary/20">
                    <th className="border border-gray-200 px-4 py-2 text-left">Maand</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Typische Temp</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Aanbevolen TOG</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Kleding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">December - Februari</td>
                    <td className="border border-gray-200 px-4 py-2">16-19°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.5</td>
                    <td className="border border-gray-200 px-4 py-2">Romper + warme pyjama</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">Maart - Mei</td>
                    <td className="border border-gray-200 px-4 py-2">15-22°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.0 / 2.5</td>
                    <td className="border border-gray-200 px-4 py-2">Wisselend, pas aan</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Juni - Augustus</td>
                    <td className="border border-gray-200 px-4 py-2">20-26°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">0.5 / 1.0</td>
                    <td className="border border-gray-200 px-4 py-2">Licht rompertje of luier</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">September - November</td>
                    <td className="border border-gray-200 px-4 py-2">15-22°C</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold">2.0 / 2.5</td>
                    <td className="border border-gray-200 px-4 py-2">Geleidelijk warmere lagen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* CTA Sections */}
        <div className="mt-6 space-y-6">
          {/* Calculator CTA */}
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Ontdek jouw ideale TOG-waarde</h3>
                <p className="opacity-90">Gebruik onze gratis TOG Calculator voor persoonlijk advies op basis van jouw exacte kamertemperatuur en baby's leeftijd.</p>
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
                href="/kennisbank/tog-schaal-overzicht"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">De Complete TOG-Schaal</h4>
                <p className="text-sm text-gray-600 mb-3">Uitleg van alle TOG-waardes van 0.5 tot 3.5</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/wat-is-tog"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Wat is TOG?</h4>
                <p className="text-sm text-gray-600 mb-3">Complete uitleg over het TOG-systeem</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/producten"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Aanbevolen Slaapzakken</h4>
                <p className="text-sm text-gray-600 mb-3">Beste slaapzakken per seizoen</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Bekijk producten <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

      </article>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-waarde-per-seizoen"
          title="Aanbevolen Babyslaapzakken"
        />
    </Layout>
  )
}
