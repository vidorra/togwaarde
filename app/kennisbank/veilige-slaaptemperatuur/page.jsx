import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Thermometer, Shield, AlertTriangle, CheckCircle, ArrowRight, Calculator, Check, Brain, Moon, Snowflake, Flower, Sun, Smartphone, Home, Baby, Square, BarChart3, RefreshCw, Lightbulb } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'Veilige Slaaptemperatuur Baby | Ideale Kamertemperatuur 16-20°C',
  description: 'Wat is de ideale slaaptemperatuur voor baby\'s? Leer alles over de veilige kamertemperatuur van 16-20°C en hoe je oververhitting voorkomt.',
  keywords: 'veilige slaaptemperatuur baby, ideale kamertemperatuur baby, baby kamertemperatuur, 16-20 graden baby',
}

export default function VeiligeSlaaptemperatuurPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Home className="w-6 h-6 mr-3 text-primary" />
            Veilige Slaaptemperatuur voor Baby's
          </h1>
          <p className="text-lg text-gray-600">
            De ideale kamertemperatuur voor een veilige en comfortabele babyslaap
          </p>
        </header>

        {/* Main Content - Single White Frame */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Key Takeaway */}
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/20 border-2 border-secondary/20 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <Thermometer className="w-12 h-12 text-secondary-dark flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">De Gulden Regel</h2>
                <p className="text-xl text-gray-800 font-semibold mb-2">
                  De ideale slaaptemperatuur voor baby's is tussen de <span className="text-secondary-dark">16°C en 20°C</span>
                </p>
                <p className="text-gray-700">
                  Dit kan kouder aanvoelen dan je gewend bent, maar is perfect voor baby's. Deze temperatuur helpt oververhitting te voorkomen en vermindert het risico op wiegendood (SIDS).
                </p>
              </div>
            </div>
          </div>

          {/* Why This Temperature */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Waarom 16-20°C?</h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Baby's kunnen hun lichaamstemperatuur nog niet goed reguleren. Ze verliezen sneller warmte dan volwassenen, maar kunnen ook snel oververhit raken. Een kamertemperatuur van 16-20°C biedt de perfecte balans.
            </p>

            <div className="space-y-6">
              <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Brain className="w-5 h-5 inline" />
                  Betere Hersenontwikkeling
                </h3>
                <p className="text-gray-700">
                  Onderzoek toont aan dat baby's die bij een koelere temperatuur slapen, dieper en rustiger slapen. Diepe slaap is essentieel voor hersenontwikkeling en groei.
                </p>
              </div>

              <div className="relative bg-secondary/20 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 inline" />
                  SIDS Preventie
                </h3>
                <p className="text-gray-700">
                  Oververhitting wordt gezien als een risicofactor voor wiegendood (SIDS). Een kamertemperatuur tussen 16-20°C helpt dit risico te verkleinen.
                </p>
              </div>

              <div className="relative bg-accent/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent/100">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Moon className="w-5 h-5 inline" />
                  Betere Slaapkwaliteit
                </h3>
                <p className="text-gray-700">
                  Een iets koelere kamer stimuleert de productie van melatonine (het slaaphormoon) en helpt baby's sneller in te slapen en langer te slapen.
                </p>
              </div>
            </div>
          </section>

          {/* Temperature Guide */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Temperatuur Gids per Seizoen</h2>

            <div className="space-y-6">
              {/* Winter */}
              <div className="bg-white border-2 border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/100 rounded-xl flex items-center justify-center">
                    <Snowflake className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Winter</h3>
                    <p className="text-gray-600">December - Februari</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Doel: 18°C</strong> - In de winter kan het lastig zijn om de kamer niet te warm te stoken. Hier is hoe:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Zet de verwarming op maximaal 18°C (gebruik een thermostaat)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Overweeg een TOG 2.5 slaapzak met lange mouw romper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Ventileer de kamer voor het slapen gaan (frisse lucht)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Spring/Fall */}
              <div className="bg-white border-2 border-secondary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                    <Flower className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Lente & Herfst</h3>
                    <p className="text-gray-600">Maart - Mei & September - November</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Doel: 18-19°C</strong> - Perfecte temperaturen, maar let op wisselend weer:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Houd meerdere TOG waardes bij de hand (1.0 en 2.5)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Check elke avond de temperatuur (kan veel schommelen)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Pas kleding onder slaapzak aan bij temperatuurschommelingen</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Summer */}
              <div className="bg-white border-2 border-accent/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/100 rounded-xl flex items-center justify-center">
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Zomer</h3>
                    <p className="text-gray-600">Juni - Augustus</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Doel: Niet boven 22°C</strong> - Warme zomernachten vragen om extra aandacht:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Gebruik een TOG 0.5 slaapzak of dun katoenen lakentje</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Laat baby slapen in alleen een romper bij 24°C+</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Houd gordijnen overdag gesloten om warmte buiten te houden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                      <span>Overweeg een ventilator (niet direct op baby gericht)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How to Measure */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Hoe Meet je de Kamertemperatuur?</h2>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gebruik een Betrouwbare Thermometer</h3>
              <p className="text-gray-700 mb-6">
                Het is verleidelijk om op je gevoel af te gaan, maar dit is vaak misleidend. Investeer in een goede babykamer thermometer. Dit kan zijn:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 inline" />
                    Digitale Thermometer
                  </h4>
                  <p className="text-sm text-gray-600">
                    Nauwkeurig en vaak met extra functies zoals luchtvochtigheid
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Home className="w-5 h-5 inline" />
                    Smart Home Thermostaat
                  </h4>
                  <p className="text-sm text-gray-600">
                    Kan automatisch temperatuur regelen en waarschuwingen sturen
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Baby className="w-5 h-5 inline" />
                    Baby Monitor met Thermometer
                  </h4>
                  <p className="text-sm text-gray-600">
                    Combineert camera en temperatuurmeting in één apparaat
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 inline" />
                    Klassieke Thermometer
                  </h4>
                  <p className="text-sm text-gray-600">
                    Goedkoop en effectief, hang op ooghoogte in het midden van de kamer
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Waar NIET te meten:
              </h4>
              <ul className="space-y-2 text-gray-900">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Direct naast de verwarming (te warm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Bij het raam (te koud)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Op de grond (koude lucht daalt)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Direct bij de babykast (kan temperatuur beïnvloeden)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Check Baby's Temperature */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Controleer de Temperatuur van Je Baby</h2>

            <p className="text-lg text-gray-700 mb-6">
              De kamertemperatuur is één ding, maar hoe weet je of je baby het ook daadwerkelijk comfortabel heeft?
            </p>

            <div className="bg-secondary/20 border-2 border-secondary/20 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary-dark" />
                De Nek Test
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>De beste manier:</strong> Voel voorzichtig aan de nek of bovenrug van je baby. Dit geeft de meest betrouwbare indicatie:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <span><strong>Warm en droog:</strong> Perfect! Je baby heeft het comfortabel</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Koel:</strong> Je baby heeft het waarschijnlijk te koud, voeg een laagje toe</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Vochtig/zweterig:</strong> Te warm! Verwijder een laag of verlaag de TOG waarde</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Tekenen van Oververhitting
                </h4>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Vochtig haar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Rode wangen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Snel ademen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Warm aanvoelen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Onrustig slapen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Hitteuitslag</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Snowflake className="w-5 h-5 text-primary" />
                  Tekenen van Onderkoeling
                </h4>
                <ul className="space-y-2 text-gray-900 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Koude handjes/voetjes (normaal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Koude borst/nek (niet normaal!)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Huilen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Bleke huid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Niet willen eten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Slaperig/suf</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative bg-primary/10 p-6 rounded-lg mt-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-gray-900">
                <strong>Let op:</strong> Koude handjes en voetjes zijn normaal bij baby's! Dit betekent NIET dat je baby het koud heeft. Check altijd de nek of borst.
              </p>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Veelgemaakte Fouten</h2>

            <div className="space-y-4">
              <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Te warm stoken uit bezorgdheid
                </h4>
                <p className="text-gray-700">
                  Veel ouders denken dat 18°C te koud is en zetten de verwarming hoger. Dit vergroot juist het risico op oververhitting.
                </p>
              </div>

              <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Afgaan op koude handjes
                </h4>
                <p className="text-gray-700">
                  Koude handjes en voetjes zijn normaal! Dit komt door de nog onrijpe circulatie. Check altijd de nek of borst.
                </p>
              </div>

              <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Dezelfde temperatuur als eigen slaapkamer
                </h4>
                <p className="text-gray-700">
                  Volwassenen hebben vaak liever 20-22°C. Voor baby's is dit te warm. Durf de babykamer kouder te maken dan je eigen kamer.
                </p>
              </div>

              <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Niet aanpassen aan seizoenen
                </h4>
                <p className="text-gray-700">
                  Wat werkt in de winter, werkt niet in de zomer. Pas de TOG waarde en kleding aan bij veranderende temperaturen.
                </p>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-primary mb-6">Praktische Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  Thermostaat Programmeren
                </h3>
                <p className="text-gray-700 text-sm">
                  Stel een slimme thermostaat in om de babykamer automatisch op 18°C te houden 's nachts. Veel thermostaten kunnen per kamer ingesteld worden.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Square className="w-5 h-5 text-primary" />
                  Ventilatie is Belangrijk
                </h3>
                <p className="text-gray-700 text-sm">
                  Zorg voor frisse lucht. Laat overdag een raam op een kier of ventileer goed voor het slapengaan. Frisse lucht helpt bij betere slaap.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Houd een Logboek Bij
                </h3>
                <p className="text-gray-700 text-sm">
                  Noteer de eerste weken: kamertemperatuur, TOG waarde, kleding, en hoe je baby geslapen heeft. Zo ontdek je wat voor jouw baby het beste werkt.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Check Midden in de Nacht
                </h3>
                <p className="text-gray-700 text-sm">
                  Als je 's nachts toch wakker bent voor voeding, voel even aan de nek van je baby. Zo leer je het normale gevoel kennen en kun je bijsturen indien nodig.
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
              Bereken de Juiste TOG voor Jouw Kamertemperatuur
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Gebruik onze gratis calculator om te zien welke TOG waarde perfect is bij jouw kamertemperatuur
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              <Thermometer className="w-5 h-5 mr-2" />
              Bereken Mijn TOG Waarde
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-primary mb-6">Gerelateerde Artikelen</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/kennisbank/babykamer-temperatuur" className="group bg-default border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                Babykamer Temperatuur
              </h3>
              <p className="text-gray-600 mb-4">
                Hoe meet je de kamertemperatuur en wat is ideaal voor je baby
              </p>
              <span className="inline-flex items-center text-primary font-medium">
                Lees meer <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link href="/kennisbank/wiegendood-preventie" className="group bg-default border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                Wiegendood Preventie
              </h3>
              <p className="text-gray-600 mb-4">
                De rol van temperatuur en TOG-waarde bij wiegendood preventie
              </p>
              <span className="inline-flex items-center text-primary font-medium">
                Lees meer <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link href="/kennisbank/oververhitting-herkennen" className="group bg-default border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                Oververhitting Herkennen
              </h3>
              <p className="text-gray-600 mb-4">
                Signalen dat je baby het te warm heeft en wat je kunt doen
              </p>
              <span className="inline-flex items-center text-primary font-medium">
                Lees meer <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </article>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="veilige-slaaptemperatuur"
          title="Aanbevolen Babyslaapzakken"
        />
    </Layout>
  )
}
