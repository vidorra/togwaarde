'use client'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { BookOpen, Book, ThermometerSun, Baby, ShieldCheck, Snowflake, Sun, ShoppingBag, AlertCircle, Activity, CheckCircle, Info, ArrowRight, Shirt, StickyNote } from 'lucide-react'

export default function TOGWaardeGidsPillarPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Book className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            TOG-waarde: De complete gids voor veilig en comfortabel slapen van je baby
          </h1>

          <p className="text-lg text-gray-600">
            Als ouder wil je dat je baby veilig en comfortabel slaapt. De TOG-waarde helpt je bepalen of je kindje het niet te warm of te koud heeft. In deze gids leggen we uit hoe je TOG-waardes gebruikt voor optimale babyslaap.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">

          {/* Table of Contents */}
          <nav className="bg-secondary/10 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Inhoudsopgave
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 list-none">
              <li><a href="#wat-is-tog" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">Wat is de TOG-waarde?</a></li>
              <li><a href="#waarom-belangrijk" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">Waarom is TOG belangrijk?</a></li>
              <li><a href="#ideale-temperatuur" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">Ideale temperatuur</a></li>
              <li><a href="#tog-tabel" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">TOG-tabel per temperatuur</a></li>
              <li><a href="#tog-producten" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">TOG-waardes van producten</a></li>
              <li><a href="#berekenen" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">Berekenen in 5 stappen</a></li>
              <li><a href="#seizoenen" className="text-primary underline hover:text-primary/80 transition-colors cursor-pointer">Seizoensgericht aankleden</a></li>
            </ul>
          </nav>

          {/* Section: Wat is TOG */}
          <section id="wat-is-tog" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Wat is de TOG-waarde precies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TOG is een internationaal erkende maatstaf die aangeeft hoe goed textiel warmte vasthoudt. De naam komt van het Engelse woord "togs" (kleding). Deze waarde wordt in een gecontroleerde laboratoriumomgeving gemeten en geeft objectief aan hoeveel isolatie een kledingstuk of dekentje biedt.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              In wetenschappelijke termen: TOG meet de thermische weerstand van textiel. Een TOG-waarde van 1.0 betekent dat het materiaal een thermische weerstand heeft van 0.1 m²·K/W. Deze meetmethode is in 1946 ontwikkeld door het Shirley Institute in Manchester en wordt wereldwijd gebruikt.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Hoe werkt het?</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-default p-4 rounded-xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Lage TOG (0.2-1.0)</h4>
                <p className="text-gray-600 text-sm">Dunne, luchtige materialen waarbij warmte makkelijk ontsnapt. Perfect voor warme dagen.</p>
              </div>
              <div className="bg-default p-4 rounded-xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Gemiddelde TOG (1.0-2.5)</h4>
                <p className="text-gray-600 text-sm">Geschikt voor tussenseizoenen met gematigde temperaturen.</p>
              </div>
              <div className="bg-default p-4 rounded-xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Hoge TOG (2.5-3.5)</h4>
                <p className="text-gray-600 text-sm">Warme, isolerende materialen die lichaamswarmte vasthouden. Ideaal voor koude nachten.</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              De TOG-waarde vind je meestal op het label van babykleding, slaapzakken en beddengoed. Staat deze er niet op? Neem dan contact op met de fabrikant of verkoper.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Welke TOG-waardes zijn beschikbaar?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              De meest voorkomende TOG-waardes voor babyslaapzakken in Nederland zijn:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Sun className="w-5 h-5 mr-2 text-accent" />
                  Zomer
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>0.2 TOG:</strong> Zeer dun, voor tropische nachten (&gt;26°C)</li>
                  <li><strong>0.5 TOG:</strong> Dun zomerslaapzakje (23-26°C)</li>
                  <li><strong>1.0 TOG:</strong> Licht tussenseizoen (20-23°C)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <ThermometerSun className="w-5 h-5 mr-2 text-primary" />
                  Tussenseizoen
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>1.5 TOG:</strong> Tussenseizoen (18-20°C)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Snowflake className="w-5 h-5 mr-2 text-secondary-dark" />
                  Winter
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>2.5 TOG:</strong> Warm, voor koelere nachten (16-18°C)</li>
                  <li><strong>3.0 TOG:</strong> Winter (15-17°C)</li>
                  <li><strong>3.5 TOG:</strong> Zeer koude winter (&lt;16°C)</li>
                </ul>
                <p className="text-sm text-gray-600 italic mt-3">
                  In Nederland komen temperaturen onder de 16°C in de babykamer zelden voor, waardoor 3.5 TOG slaapzakken hier meestal niet nodig zijn.
                </p>
              </div>
            </div>

            <div className="relative bg-primary/5 p-6 rounded-lg mt-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
              <p className="text-gray-800">
                <strong>Let op:</strong> Niet alle merken bieden alle TOG-waardes aan. Veel merken hebben bijvoorbeeld geen 2.0 TOG slaapzakken. Kies altijd een TOG-waarde die beschikbaar is bij jouw favoriete merk en combineer met extra of minder kleding om de totale TOG-waarde aan te passen.
              </p>
            </div>
          </section>

          {/* Section: Waarom belangrijk */}
          <section id="waarom-belangrijk" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Waarom is de TOG-waarde zo belangrijk voor je baby?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Baby's zijn bijzonder kwetsbaar als het gaat om temperatuurregulatie. Dit maakt het gebruik van TOG-waardes cruciaal voor hun veiligheid en welzijn.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Baby's kunnen hun temperatuur nog niet zelf regelen</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In de eerste maanden van hun leven is het vermogen van baby's om hun lichaamstemperatuur te reguleren nog onvoldoende ontwikkeld. Ze kunnen niet:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li>Zelf dekens van zich af gooien als ze het te warm krijgen</li>
              <li>Aangeven wanneer ze het oncomfortabel warm of koud hebben</li>
              <li>Hun lichaamswarmte effectief aanpassen aan de omgeving</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Baby's regelen hun temperatuur voornamelijk via hun hoofd, dat ongeveer 20% van hun lichaamsoppervlakte beslaat (bij volwassenen is dit slechts 9%). Dit verklaart waarom het hoofd onbedekt moet blijven tijdens het slapen.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Het gevaar van oververhitting</h3>
            <div className="relative bg-accent/5 p-6 rounded-lg mb-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent">
              <p className="text-gray-800 font-medium mb-3">
                <AlertCircle className="w-5 h-5 inline mr-2 text-accent" />
                Oververhitting, ook wel warmtestuwing genoemd, is een wetenschappelijk aangetoonde risicofactor voor wiegendood.
              </p>
              <p className="text-gray-700">
                Bij warmtestuwing kan het lichaam van je baby de overtollige warmte niet kwijtraken aan de omgeving, waardoor de lichaamstemperatuur gevaarlijk oploopt, bloedvaten zich verwijden, de bloeddruk daalt, en je baby minder alert is.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              Naast het verhoogde risico op wiegendood zorgt een verkeerde temperatuur ook voor:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li>Onrust en slaapproblemen</li>
              <li>Verminderde slaapkwaliteit</li>
              <li>Verspilde energie aan temperatuurregulatie in plaats van groei en ontwikkeling</li>
            </ul>

            <Link href="/kennisbank/wiegendood-voorkomen-tog" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              → Lees meer: Wiegendood voorkomen met de juiste TOG-waarde
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* Section: Ideale temperatuur */}
          <section id="ideale-temperatuur" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">De ideale babykamer temperatuur</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              De temperatuur van de babykamer is de basis voor het bepalen van de juiste TOG-waarde.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary/5 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Baby className="w-5 h-5 mr-2 text-primary" />
                  Eerste 6-8 weken
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  In de allereerste periode is een <strong>temperatuur van ongeveer 20°C</strong> ideaal. Pasgeboren baby's hebben nog moeite met warmteregulatie en hebben daarom een iets warmere omgeving nodig.
                </p>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Let op:</strong> Is je baby te vroeg geboren? Dan heeft je baby langer een hogere kamertemperatuur nodig. Reken de prematuriteit in weken bij de eerste 6-8 weken periode op.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Voorbeeld:</strong> Een baby die 4 weken te vroeg is geboren, heeft tot 10-12 weken ná de geboortedatum een kamertemperatuur van ongeveer 20°C nodig.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/5 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <ThermometerSun className="w-5 h-5 mr-2 text-secondary-dark" />
                  Na 2 maanden
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Als je baby ongeveer 2 maanden oud is, kun je de temperatuur geleidelijk verlagen naar <strong>16-19°C, met een optimum van 18°C</strong>. Deze temperatuur mag je aanhouden tot je kind ouder is.
                </p>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Waarom liever iets te koel dan te warm?
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Bij onderkoeling wordt je baby onrustig en huilt, waardoor je snel ingrijpt</li>
                    <li>Bij oververhitting wordt je baby juist slaperig en stil, wat gevaarlijk kan zijn</li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/kennisbank/babykamer-temperatuur" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              → Lees meer: Ideale babykamer temperatuur: 16, 18 of 20 graden?
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* Section: TOG-tabel */}
          <section id="tog-tabel" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">TOG-waarde per kamertemperatuur: De complete tabel</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Gebruik onderstaande tabel als leidraad voor het bepalen van de maximale totale TOG-waarde bij verschillende kamertemperaturen:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-4 text-left font-semibold">Kamertemperatuur</th>
                    <th className="p-4 text-left font-semibold">Aanbevolen totale TOG</th>
                    <th className="p-4 text-left font-semibold">Praktisch voorbeeld</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium">Boven 26°C</td>
                    <td className="p-4">0.5 TOG</td>
                    <td className="p-4 text-sm text-gray-600">Alleen luier of dun rompertje (0.2) + heel dun lakentje (0.2)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-default">
                    <td className="p-4 font-medium">24-26°C</td>
                    <td className="p-4">1.0 TOG</td>
                    <td className="p-4 text-sm text-gray-600">Rompertje korte mouw (0.2) + zomerslaapzak 0.5 of 1.0 TOG</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium">21-23°C</td>
                    <td className="p-4">1.5 TOG</td>
                    <td className="p-4 text-sm text-gray-600">Rompertje lange mouw (0.5) + slaapzak 1.0 TOG</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-default">
                    <td className="p-4 font-medium">18-20°C</td>
                    <td className="p-4">2.0-2.5 TOG</td>
                    <td className="p-4 text-sm text-gray-600">Dunne pyjama (0.5) + slaapzak 1.5 TOG OF rompertje (0.2) + slaapzak 2.5 TOG</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 font-medium">16-17°C</td>
                    <td className="p-4">3.0 TOG</td>
                    <td className="p-4 text-sm text-gray-600">Pyjama (0.5) + slaapzak 2.5 TOG OF dunne pyjama + slaapzak 3.0 TOG</td>
                  </tr>
                  <tr className="bg-default">
                    <td className="p-4 font-medium">Onder 16°C</td>
                    <td className="p-4">3.5+ TOG</td>
                    <td className="p-4 text-sm text-gray-600">Warmere pyjama (1.0) + slaapzak 2.5 TOG OF pyjama (0.5) + slaapzak 3.5 TOG</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mt-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Praktische tip:</p>
                <p className="text-base text-gray-700 mb-2">
                  Omdat 2.0 TOG slaapzakken niet bij alle merken verkrijgbaar zijn, kun je voor 18-20°C kiezen tussen:
                </p>
                <ul className="text-base text-gray-700 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span><strong>Optie A:</strong> Slaapzak 1.5 TOG + dunne pyjama (0.5 TOG) = 2.0 TOG totaal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span><strong>Optie B:</strong> Slaapzak 2.5 TOG + alleen rompertje (0.2 TOG) = 2.7 TOG totaal</span>
                  </li>
                </ul>
                <p className="text-base text-gray-700 mt-4">
                  Beide opties zijn geschikt. Controleer altijd het nekje om te zien of je baby het prettig heeft.
                </p>
              </div>
            </div>

            <div className="relative bg-primary/5 p-6 rounded-lg mt-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
              <p className="text-gray-800 font-medium">
                <Info className="w-5 h-5 inline mr-2 text-primary" />
                <strong>Belangrijk:</strong> Deze waardes zijn richtlijnen, geen wetten. Elke baby is anders en omstandigheden kunnen variëren.
              </p>
            </div>
          </section>

          {/* Section: TOG producten */}
          <section id="tog-producten" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">TOG-waardes van verschillende producten</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Om de totale TOG-waarde te berekenen, tel je de waardes van alle lagen kleding en beddengoed bij elkaar op. Hier zijn de gemiddelde TOG-waardes van veelgebruikte babyproducten:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shirt className="w-5 h-5 mr-2 text-primary" />
                  Kleding
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Romper zonder/korte mouwen</span>
                    <span className="font-semibold text-primary">0.2 TOG</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Romper met lange mouwen</span>
                    <span className="font-semibold text-primary">0.5 TOG</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Katoenen pyjama (dun)</span>
                    <span className="font-semibold text-primary">0.5-1.0 TOG</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Dikke pyjama met voetjes</span>
                    <span className="font-semibold text-primary">1.5-2.0 TOG</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-700">Trui of vest</span>
                    <span className="font-semibold text-primary">2.0 TOG</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <StickyNote className="w-5 h-5 mr-2 text-primary" />
                  Beddengoed
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Laken (katoen)</span>
                    <span className="font-semibold text-primary">0.2 TOG</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Zomerslaapzak</span>
                    <span className="font-semibold text-primary">0.2-1.0 TOG</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Tussenseizoen slaapzak</span>
                    <span className="font-semibold text-primary">1.0-1.5 TOG</span>
                  </li>
                  <li className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Winterslaapzak</span>
                    <span className="font-semibold text-primary">2.5-3.5 TOG</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-700">Inbakerdoek</span>
                    <span className="font-semibold text-primary">0.2-2.5 TOG</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary/10 p-6 rounded-xl mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Veelvoorkomende merken en hun TOG-waardes:</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Ergopouch, Love to Dream:</strong> 0.2, 1.0, 2.5, 3.5 TOG</li>
                <li><strong>Lodger:</strong> 0.3, 0.5, 3.2, 3.5 TOG</li>
                <li><strong>Jollein (met afritsbare mouwen):</strong> 2.0 (zonder mouwen), 3.0 (met mouwen)</li>
              </ul>
            </div>

            <div className="bg-secondary/5 p-6 rounded-xl mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Belangrijke opmerkingen:</h4>
              <ol className="text-sm text-gray-700 space-y-3 list-decimal list-inside">
                <li><strong>TOG-waardes kleding zijn schattingen:</strong> Fabrikanten vermelden TOG-waardes alleen op complete slaapzakken, niet op losse kledingstukken. De kledingwaardes in deze gids zijn gebaseerd op materiaaltype, dikte en laagopbouw, maar kunnen per merk variëren.</li>
                <li><strong>Niet alle TOG-waardes zijn verkrijgbaar:</strong> De meest gangbare TOG-waardes voor slaapzakken zijn: 0.2, 0.5, 1.0, 1.5, 2.5, 3.0 en 3.5. Waardes zoals 2.0 TOG zijn bij veel merken niet beschikbaar. Pas de kleding eronder aan om de gewenste totale TOG-waarde te bereiken.</li>
                <li><strong>Slaapzak TOG-waardes zijn officieel:</strong> Voor slaapzakken is de TOG-waarde altijd vermeld op het label - dit zijn officiële, geteste waardes die betrouwbaar zijn.</li>
              </ol>
            </div>

            <Link href="/kennisbank/tog-waarde-babykleding-tabel" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-8">
              → Lees meer: TOG-waarde babykleding: Complete tabel met alle kledingstukken
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <div className="bg-secondary/10 p-6 rounded-xl mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Rekenvoorbeelden</h4>

              <div className="mb-6">
                <p className="text-gray-900 font-semibold mb-3">Situatie 1: Babykamer is 18°C (aanbevolen: 2.0-2.5 TOG totaal)</p>

                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="font-medium text-gray-900 mb-2">Optie A - Met 1.5 TOG slaapzak:</p>
                  <ul className="space-y-1 text-gray-700 text-sm mb-2">
                    <li>• Luier (0 TOG)</li>
                    <li>• Dunne pyjama met lange mouwen (0.5 TOG)</li>
                    <li>• Slaapzak van 1.5 TOG</li>
                  </ul>
                  <p className="font-semibold flex items-center text-sm text-secondary-dark-dark">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary-dark" />
                    Totaal: 2.0 TOG - Perfect voor 18°C
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Optie B - Met 2.5 TOG slaapzak:</p>
                  <ul className="space-y-1 text-gray-700 text-sm mb-2">
                    <li>• Luier (0 TOG)</li>
                    <li>• Romper met lange mouwen (0.2 TOG)</li>
                    <li>• Slaapzak van 2.5 TOG</li>
                  </ul>
                  <p className="font-semibold flex items-center text-sm text-secondary-dark-dark">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary-dark" />
                    Totaal: 2.7 TOG - Ook prima voor 18°C (iets warmer)
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-900 font-semibold mb-3">Situatie 2: Babykamer is 16°C (aanbevolen: 3.0 TOG totaal)</p>

                <div className="bg-white p-4 rounded-lg">
                  <ul className="space-y-1 text-gray-700 text-sm mb-2">
                    <li>• Luier (0 TOG)</li>
                    <li>• Katoenen pyjama (0.5 TOG)</li>
                    <li>• Slaapzak van 2.5 TOG</li>
                  </ul>
                  <p className="font-semibold flex items-center text-sm text-secondary-dark-dark">
                    <CheckCircle className="w-4 h-4 mr-2 text-secondary-dark" />
                    Totaal: 3.0 TOG - Perfect voor 16°C
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Berekenen in 5 stappen */}
          <section id="berekenen" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Hoe bereken je de juiste TOG-waarde? Stap voor stap</h2>

            <div className="space-y-6">
              <div className="pt-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Meet de kamertemperatuur</h3>
                    <p className="text-gray-700">Gebruik een betrouwbare thermometer of een babyfoon met temperatuurmeting. Meet op verschillende momenten van de dag en nacht, want temperaturen kunnen flink schommelen.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bepaal de maximale TOG-waarde</h3>
                    <p className="text-gray-700">Kijk in de tabel hierboven wat de aanbevolen maximale TOG-waarde is voor de gemeten temperatuur.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Kies de kleding en beddengoed</h3>
                    <p className="text-gray-700 mb-2">Tel de TOG-waardes van alle lagen bij elkaar op:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      <li>Alle kledingstukken die je baby aanheeft</li>
                      <li>Het slaapzakje of de dekentjes</li>
                      <li>Eventuele extra laagjes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Blijf onder de maximum waarde</h3>
                    <p className="text-gray-700">Zorg dat je totaal onder of gelijk aan de aanbevolen maximale TOG-waarde blijft. Liever iets onder dan erboven.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Controleer regelmatig</h3>
                    <p className="text-gray-700 mb-2">Voel in het nekje of aan de rug van je baby:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                        <span><strong>Lauwwarm en droog:</strong> Perfect!</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ThermometerSun className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Klam of zweterig:</strong> Te warm, verwijder een laagje</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Snowflake className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                        <span><strong>Koel:</strong> Mogelijk te koud, voeg een laagje toe</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 mt-8">
              <p className="text-gray-900 font-medium mb-4">
                <Activity className="w-5 h-5 inline mr-2 text-primary" />
                <strong>Handig hulpmiddel:</strong> Wil je de TOG-waarde automatisch laten berekenen?
              </p>
              <Link href="/" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                Gebruik onze gratis TOG-waarde calculator
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <Link href="/kennisbank/tog-waarde-berekenen" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-6">
              → Lees meer: TOG-waarde berekenen: Stap-voor-stap handleiding + gratis rekentool
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </section>

          {/* Section: Seizoenen */}
          <section id="seizoenen" className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Seizoensgericht aankleden met TOG-waardes</h2>

            <div className="space-y-8">
              {/* Winter */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary-dark/20 rounded-xl flex items-center justify-center mr-4">
                    <Snowflake className="w-6 h-6 text-secondary-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Winter (koud weer, lage kamertemperatuur)</h3>
                    <p className="text-gray-600">De babykamer koel genoeg houden terwijl het buiten vriest</p>
                  </div>
                </div>

                <div className="ml-16">
                  <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Verwarm de kamer een half uur voor het slapengaan, maar schakel de verwarming daarna uit</li>
                    <li>Gebruik een winterslaapzak (2.5-3.5 TOG) met een pyjama eronder</li>
                    <li>Voorwarm het bedje met een kruik, maar haal deze altijd weg voordat je baby erin gaat</li>
                    <li>Plaats het bedje nooit direct bij een verwarming</li>
                  </ul>

                  <div className="bg-secondary-dark/5 p-4 rounded-lg space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Wintercombinatie voorbeeld (16°C):</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Luier (0 TOG)</li>
                        <li>• Katoenen pyjama met lange mouwen (0.5 TOG)</li>
                        <li>• Winterslaapzak (2.5 TOG)</li>
                        <li className="flex items-center gap-2 font-semibold text-secondary-dark-dark">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Totaal: 3.0 TOG - Perfect voor 16°C</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Voor koudere nachten (14-15°C):</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Luier (0 TOG)</li>
                        <li>• Warmere pyjama met voetjes (1.0 TOG)</li>
                        <li>• Winterslaapzak (2.5 TOG)</li>
                        <li className="flex items-center gap-2 font-semibold text-secondary-dark-dark">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Totaal: 3.5 TOG</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">Voor zeer koude nachten (&lt;14°C):</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Luier (0 TOG)</li>
                        <li>• Dikke pyjama met voetjes (1.0 TOG)</li>
                        <li>• Extra warme winterslaapzak (3.5 TOG)</li>
                        <li className="flex items-center gap-2 font-semibold text-secondary-dark-dark">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Totaal: 4.5 TOG</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-xs text-gray-600 italic">Let op: Deze combinaties zijn gebaseerd op de gangbare TOG-waardes (2.5 en 3.5) die je bij de meeste merken kunt kopen.</p>
                  </div>

                  <Link href="/kennisbank/tog-waarde-winter" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-4">
                    → Lees meer: TOG-waarde winter
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Zomer */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-4">
                    <Sun className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Zomer (warm weer, hoge kamertemperatuur)</h3>
                    <p className="text-gray-600">De babykamer koel houden tijdens tropische nachten</p>
                  </div>
                </div>

                <div className="ml-16">
                  <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Houd ramen, gordijnen en zonwering overdag gesloten</li>
                    <li>Ventileer 's avonds en 's ochtends vroeg wanneer het buiten koeler is</li>
                    <li>Gebruik een ventilator om lucht te laten circuleren (niet direct op je baby gericht)</li>
                    <li>Bij temperaturen boven 26°C is alleen een luier of dun rompertje voldoende</li>
                    <li>Kies voor natuurlijke, ademende stoffen zoals katoen of bamboe</li>
                  </ul>

                  <div className="bg-accent/5 p-4 rounded-lg space-y-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Zomercombinatie voorbeelden voor 24°C:</p>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Optie A - Met zomerslaapzak 0.5 TOG:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Luier (0 TOG)</li>
                        <li>• Rompertje met korte mouwtjes (0.2 TOG)</li>
                        <li>• Zomerslaapzak 0.5 TOG</li>
                        <li className="flex items-center gap-2 font-semibold text-secondary-dark-dark">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Totaal: 0.7 TOG</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Optie B - Met zomerslaapzak 1.0 TOG:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Luier (0 TOG)</li>
                        <li>• Alleen rompertje zonder mouwen (0.2 TOG)</li>
                        <li>• Zomerslaapzak 1.0 TOG</li>
                        <li className="flex items-center gap-2 font-semibold text-secondary-dark-dark">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Totaal: 1.2 TOG (iets warmer, voor baby's die snel koud hebben)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Optie C - Bij zeer warm weer (&gt;26°C):</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Luier (0 TOG)</li>
                        <li>• Dun rompertje of alleen luier (0.2 TOG)</li>
                        <li>• Heel dun lakentje (0.2 TOG)</li>
                        <li className="flex items-center gap-2 font-semibold text-secondary-dark-dark">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Totaal: 0.4 TOG</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link href="/kennisbank/baby-slapen-zomer" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-4">
                    → Lees meer: Baby slapen in de zomer
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Tussenseizoenen */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                    <ThermometerSun className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Tussenseizoenen (wisselend weer)</h3>
                    <p className="text-gray-600">Temperatuurschommelingen tussen dag en nacht</p>
                  </div>
                </div>

                <div className="ml-16">
                  <h4 className="font-semibold text-gray-900 mb-2">Tips:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Monitor de kamertemperatuur extra goed</li>
                    <li>Kies voor laagjes die je makkelijk kunt toevoegen of weghalen</li>
                    <li>Gebruik een tussenseizoen slaapzak (1.0 of 1.5 TOG)</li>
                    <li>Pas aan op basis van de nachttemperatuur, niet de dagtemperatuur</li>
                  </ul>

                  <div className="bg-primary/5 p-4 rounded-lg space-y-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Praktische combinaties voor wisselend weer (17-20°C):</p>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Met 1.5 TOG slaapzak (meest flexibel):</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Warme nacht (20°C): Rompertje (0.2) + slaapzak 1.5 = 1.7 TOG</li>
                        <li>• Gemiddelde nacht (18°C): Pyjama (0.5) + slaapzak 1.5 = 2.0 TOG</li>
                        <li>• Koele nacht (17°C): Dikke pyjama (1.0) + slaapzak 1.5 = 2.5 TOG</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Met 2.5 TOG slaapzak:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Warme nacht (20°C): Alleen rompertje (0.2) + slaapzak 2.5 = 2.7 TOG</li>
                        <li>• Koele nacht (17°C): Pyjama (0.5) + slaapzak 2.5 = 3.0 TOG</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Sections */}
          <div className="mt-8 space-y-6 mb-12">
            {/* Calculator CTA */}
            <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Ontdek jouw ideale TOG-waarde</h3>
                  <p className="opacity-90">Gebruik onze gratis TOG Calculator voor persoonlijk advies op basis van jouw exacte kamertemperatuur en baby's leeftijd.</p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <Activity className="w-5 h-5 mr-2" />
                  Naar Calculator
                </Link>
              </div>
            </div>

            {/* Kennisbank CTA */}
            <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Ontdek meer in onze Kennisbank</h3>
                  <p className="text-gray-700">12 diepgaande artikelen over TOG-waardes, veilig slapen en speciale situaties.</p>
                </div>
                <Link
                  href="/kennisbank"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Naar Kennisbank
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <em>Laatst bijgewerkt: November 2025</em><br />
              <em>Bronnen: VeiligheidNL, Nederlands Centrum Jeugdgezondheid (NCJ), wetenschappelijk onderzoek naar wiegendood en temperatuurregulatie bij baby's</em>
            </p>
          </footer>

        </div>
      </article>
    </Layout>
  )
}
