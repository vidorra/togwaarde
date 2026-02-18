import Layout from '../../../components/Layout'
import { ThermometerSun, AlertTriangle, CheckCircle, Info, XCircle, Heart, Calculator, BookOpen, ArrowRight, Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'Oververhitting Herkennen bij Baby\'s: Signalen en Preventie | TOGWaarde.nl',
  description: 'Leer de waarschuwingssignalen van oververhitting bij baby\'s herkennen. RIVM richtlijnen, nekcontrole methode en praktische tips voor veilige babyslaap.',
  keywords: 'oververhitting baby, baby te warm, nekje voelen baby, temperatuur baby controleren, klam nekje, wiegendood oververhitting, baby zweten'
}

export default function OververhittingHerkennen() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">Oververhitting Herkennen</span>
        </nav>

        {/* Header - NOT framed */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Oververhitting Herkennen bij Baby's
          </h1>
          <p className="text-lg text-gray-600">
            Het Nederlandse consultatiebureau leert ouders de juiste controle: voel het nekje, de borst of de rug. Deze centrale lichaamsgebieden geven de échte lichaamstemperatuur weer. Handen en voetjes zijn vaak koeler door de nog onvolgroeide circulatie en zijn dus onbetrouwbare indicatoren. Deze complete gids helpt je de signalen van oververhitting tijdig te herkennen.
          </p>
        </header>

        {/* Main Content - FRAMED */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          {/* Critical Info Box */}
          <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-8">
            <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900 mb-4">Waarom Oververhitting Gevaarlijk Is</p>
              <div className="text-base text-gray-700">
                Warmtestress is een onafhankelijke risicofactor voor wiegendood (SIDS). Wanneer een baby te warm wordt, verhoogt de arousal threshold (prikkeldrempel) – het wordt moeilijker om wakker te worden bij ademhalingsproblemen. Baby's in diepe slaap reageren mogelijk niet op zuurstoftekort.
              </div>
            </div>
          </div>

          {/* Correct Method */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">De Juiste Controle Methode</h2>

            <div className="bg-default rounded-xl p-8 mb-6 border-2 border-secondary/20">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-secondary-dark" />
                <h3 className="text-xl font-bold text-gray-900">RIVM-richtlijn voor Controle</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Voel Centrale Lichaamsgebieden</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-secondary-dark" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Het Nekje</h5>
                      <p className="text-sm text-gray-600">Meest betrouwbare indicator</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-secondary-dark" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">De Borst</h5>
                      <p className="text-sm text-gray-600">Kerntemperatuur indicator</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-8 h-8 text-secondary-dark" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">De Rug</h5>
                      <p className="text-sm text-gray-600">Centrale temperatuur</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Goede Temperatuur</h4>
                  <div className="flex items-center gap-2 text-secondary-dark mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Nekje: Warm en droog</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-7">
                    Het nekje voelt aangenaam warm aan, zonder vochtigheid of zweet. Dit is de perfecte temperatuur.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative p-4 pl-5 rounded-xl flex items-center gap-3 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/80">
              <AlertTriangle className="w-5 h-5 text-primary/80 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1 text-primary">Onbetrouwbare Indicatoren</div>
                <div className="text-sm text-secondary-dark">
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    <li><strong>Handjes en voetjes</strong> - Deze zijn normaal koeler door immature circulatie</li>
                    <li><strong>Gezichtstemperatuur</strong> - Kan misleidend zijn door externe factoren</li>
                  </ul>
                  <p className="mt-3 font-medium">RIVM: "Zolang de voeten warm aanvoelen heeft een baby het niet te koud, terwijl een zwetende baby het in de regel te warm heeft."</p>
                </div>
              </div>
            </div>
          </section>

          {/* Warning Signs */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Waarschuwingstekenen van Oververhitting</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-gray-900">Fysieke Signalen</h3>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Klam, zweterig nekje</strong>
                      <p className="text-xs text-gray-600 mt-1">Of zweterig haar - meest duidelijke teken</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Verhit gevoel op borst/rug</strong>
                      <p className="text-xs text-gray-600 mt-1">Niet handen of voeten - die zijn altijd koeler</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Rood of verhit gezicht</strong>
                      <p className="text-xs text-gray-600 mt-1">Rode oren, opgezwollen gezicht</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Snelle ademhaling</strong>
                      <p className="text-xs text-gray-600 mt-1">Hijgen of onregelmatige ademhaling</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Hittepukkels</strong>
                      <p className="text-xs text-gray-600 mt-1">Kleine rode bultjes op nek, borst, oksels</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/20 border-2 border-accent/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-accent" />
                  <h3 className="font-semibold text-gray-900">Gedrags Signalen</h3>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Onrustig en lastig</strong>
                      <p className="text-xs text-gray-600 mt-1">Huilen, moeilijk te troosten</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Heel stil en slap</strong>
                      <p className="text-xs text-gray-600 mt-1">EXTRA ZORGELIJK - kan op ernstige oververhitting duiden</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Slecht slapen</strong>
                      <p className="text-xs text-gray-600 mt-1">Vaak wakker worden, onrustige slaap</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Weigeren van voeding</strong>
                      <p className="text-xs text-gray-600 mt-1">Geen interesse in drinken</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-900 font-semibold">
                    Een baby die heel stil en slap is kan ernstig oververhit zijn. Bel direct 112 als je je zorgen maakt.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Immediate Actions */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Direct Handelen bij Oververhitting</h2>

            <div className="relative p-4 pl-5 rounded-xl flex items-center gap-3 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/80 mb-6">
              <AlertTriangle className="w-5 h-5 text-primary/80 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1 text-primary">Stapsgewijze Actie</div>
                <div className="text-sm text-secondary-dark">
                  <div className="space-y-3 mt-2">
                    <div>
                      <strong>1. Verwijder Kledinglagen:</strong> Verwijder de slaapzak en overtollige kleding. Begin met de buitenste laag. Laat baby in een romper of luier afkoelen.
                    </div>
                    <div>
                      <strong>2. Verplaats naar Koelere Ruimte:</strong> Ga naar een koelere kamer of open ramen voor ventilatie (let op tocht). Ideale temperatuur is 16-20°C.
                    </div>
                    <div>
                      <strong>3. Dep met Lauw Water:</strong> Dep gezicht, nek en armpjes voorzichtig met een lauw (niet koud!) washandje. Geen koud water - dit kan shock veroorzaken.
                    </div>
                    <div>
                      <strong>4. Blijf Controleren:</strong> Voel elk 5-10 minuten het nekje tot het droog en warm (niet heet) aanvoelt. Monitor gedrag en ademhaling.
                    </div>
                    <div>
                      <strong>5. Aanpassen voor Volgende Keer:</strong> Gebruik lichtere TOG-waarde of minder kleding. Controleer kamertemperatuur met thermometer.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Bel 112 Direct Bij:</p>
                <div className="text-base text-gray-700">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Baby reageert niet of is slap en lusteloos</li>
                    <li>Ademhaling stopt of zeer onregelmatig is</li>
                    <li>Blauwe verkleuring van lippen, gezicht of romp</li>
                    <li>Baby niet wakker te krijgen is</li>
                    <li>Extreme temperatuur (rectaal boven 40°C)</li>
                    <li>Stuiptrekkingen of krampen</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prevention */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Oververhitting Voorkomen</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/20 border border-secondary/20 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary-dark" />
                  Wel Doen
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Kamertemperatuur 16-20°C, ideaal 18°C</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Juiste TOG-waarde voor de temperatuur gebruiken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Nekje voelen 30 min na slapen en minstens 1x per nacht</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Natuurlijke ademende materialen (katoen, bamboe)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Bij twijfel: kies lagere TOG en voeg kledinglaag toe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Thermometer in babykamer voor exacte meting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <span>Aanpassen bij seizoensveranderingen</span>
                  </li>
                </ul>
              </div>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent">
                <XCircle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-4">Niet Doen</p>
                  <div className="text-base text-gray-700">
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mutsje binnenshuis tijdens slaap</li>
                      <li>Slaapzak + dekbed combineren</li>
                      <li>Verwarming boven 20°C zetten "voor baby"</li>
                      <li>Alleen op handjes/voetjes afgaan</li>
                      <li>Te grote slaapzak (glijdgevaar)</li>
                      <li>Synthetische stoffen die niet ademen</li>
                      <li>Baby in directe zon of bij radiator</li>
                      <li>Bed voorverwarmen met kruik</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Check Schedule */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Controle Schema</h2>

            <div className="bg-default rounded-2xl p-6 border-2 border-primary/20">
              <h3 className="font-semibold text-gray-900 mb-4">Wanneer Controleren?</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Direct na het inslapen (30 min)</h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    Baby's warmteregulatie stabiliseert na 20-30 minuten. Eerste controle is cruciaal.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Midden in de nacht (1x minimum)</h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    Controleer bij voeding of luierverschoning. Of stel alarm voor controle rond 3-4 uur.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-secondary-dark font-bold text-sm">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Bij nieuwe setup/temperatuurverandering</h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    Eerste nachten met nieuwe TOG-waarde, seizoensovergang of andere kleding: elk uur controleren.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">4</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Bij ziekte of koorts</h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    Verhoogd oververhittingsrisico. Controleer elke 30-60 minuten en gebruik lichtere TOG.
                  </p>
                </div>
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
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white">Kies de Juiste TOG voor Veilige Temperatuur</h3>
                <p className="opacity-90">Onze gratis TOG Calculator helpt oververhitting voorkomen met persoonlijk advies.</p>
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
                href="/kennisbank/warmtestuwing-baby"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Warmtestuwing bij Baby's</h4>
                <p className="text-sm text-gray-600 mb-3">Gevolgen van oververhitting</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/veilige-slaaptemperatuur"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Veilige Slaaptemperatuur</h4>
                <p className="text-sm text-gray-600 mb-3">Veilige grenzen kamertemperatuur</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/baby-temperatuur-controleren"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Baby Temperatuur Controleren</h4>
                <p className="text-sm text-gray-600 mb-3">Nektest en andere methodes</p>
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
          pageId="oververhitting-herkennen"
          title="Aanbevolen Babyslaapzakken"
        />
    </Layout>
  )
}
