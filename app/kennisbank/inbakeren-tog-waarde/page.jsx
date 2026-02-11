'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Baby, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle, Check, X } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export default function InbakerenTOGWaardePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Inbakeren en TOG-waarde</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Baby className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Inbakeren en TOG-waarde
          </h1>
          <p className="text-lg text-gray-600">
            Veilig inbakeren met de juiste TOG-waarde aanpassing: complete gids met do's en don'ts.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Wat is inbakeren?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Inbakeren (ook wel swaddling genoemd) is een techniek waarbij je baby stevig ingepakt
              wordt in een doek of speciale inbakerslaapzak. Dit geeft baby's een veilig gevoel omdat
              het hen herinnert aan de baarmoeder. Echter, inbakeren moet wel op de juiste manier
              gebeuren en vereist aanpassing van de TOG-waarde.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Voordelen van Inbakeren</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kalmeert onrustige baby's (vermindert Moro reflex)</li>
                <li>Kan helpen bij betere slaap eerste weken</li>
                <li>Geeft gevoel van geborgenheid</li>
                <li>Kan koliek-klachten verminderen</li>
              </ul>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Belangrijke Waarschuwing</p>
                <div className="text-base text-gray-700">
                  <p className="mb-3">
                    Inbakeren vergroot het risico op oververhitting omdat je baby een extra isolerende
                    laag om zich heen heeft. Daarom moet je altijd de TOG-waarde aanpassen.
                  </p>
                  <p className="font-semibold">
                    Stop met inbakeren zodra je baby tekenen toont van kunnen rollen (meestal rond 3-4 maanden).
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">TOG-waarde aanpassen bij inbakeren</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Een inbakerdoek of inbakerslaapzak voegt ongeveer 0.5-1.0 TOG toe, afhankelijk van
              het materiaal. Je moet dit compenseren door minder kleding te gebruiken of een dunnere
              slaapzak te kiezen.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rekenregel</h3>
            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 mb-8">
              <p className="text-gray-700 mb-4">
                <strong>Standaard situatie zonder inbakeren:</strong><br/>
                Romper (0.2) + Slaapzak 2.5 TOG = 2.7 TOG totaal
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Met inbakeren:</strong><br/>
                Romper (0.2) + Inbakerdoek (0.5) + Slaapzak 1.0 TOG = 1.7 TOG totaal
              </p>
              <p className="text-sm text-gray-600 italic">
                Of: alleen romper + inbakerslaapzak 2.0 TOG = 2.2 TOG totaal
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Twee methodes voor veilig inbakeren</h2>

            <div className="space-y-6 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Methode 1: Inbakerdoek + Lichte Slaapzak</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Gebruik een dunne mousseline inbakerdoek (0.5 TOG) in combinatie met een lichte
                  slaapzak (0.5-1.0 TOG)
                </p>
                <div className="text-sm text-gray-700">
                  <strong>Kledinglagen per temperatuur:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>24°C+: Body korte mouw + inbakerdoek</li>
                    <li>20-24°C: Romper + inbakerdoek + slaapzak 0.5</li>
                    <li>18-20°C: Romper + inbakerdoek + slaapzak 1.0</li>
                  </ul>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Methode 2: Inbakerslaapzak (Aanbevolen)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Gebruik een speciale inbakerslaapzak met vleugels. Deze zijn veiliger omdat ze
                  niet los kunnen raken en beschikbaar zijn in verschillende TOG-waardes.
                </p>
                <div className="text-sm text-gray-700">
                  <strong>TOG-keuze per temperatuur:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>24°C+: 0.5 TOG inbakerslaapzak + body</li>
                    <li>20-24°C: 1.0 TOG inbakerslaapzak + romper</li>
                    <li>18-20°C: 2.0-2.5 TOG inbakerslaapzak + romper</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Veiligheidsregels voor inbakeren</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold mb-3 text-secondary-dark flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  WEL Doen
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Altijd op de rug leggen</li>
                  <li>• Benen los laten (heupjes moeten kunnen bewegen)</li>
                  <li>• Armen langs het lichaam inbakeren</li>
                  <li>• Gebruik ademende stoffen (katoen, mousseline)</li>
                  <li>• Regelmatig nektemperatuur controleren</li>
                  <li>• Stoppen bij eerste tekenen van rollen</li>
                </ul>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                  <X className="w-5 h-5" />
                  NIET Doen
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Beentjes strak inbakeren (risico op heupdysplasie)</li>
                  <li>• Te strakke doek (moet ademruimte hebben)</li>
                  <li>• Inbakeren na 3-4 maanden (rolrisico)</li>
                  <li>• Extra dekens over inbakerdoek</li>
                  <li>• Dikke, synthetische materialen</li>
                  <li>• Inbakeren bij temperatuur boven 24°C</li>
                </ul>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Stop met Inbakeren Als...</p>
                <div className="text-base text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Baby probeert te rollen (ook als dit nog niet lukt)</li>
                    <li>Baby zich verzet tegen het inbakeren</li>
                    <li>Je baby 3-4 maanden oud is (gecorrigeerde leeftijd bij prematuur)</li>
                    <li>Je vaak tekenen van oververhitting ziet</li>
                    <li>Je kinderarts adviseert te stoppen</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Overgang van inbakeren naar slaapzak</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              De overgang kan een paar nachten onrustig zijn. Volg deze stappen voor een soepele
              transitie:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stap 1: Één arm vrij (3-5 dagen)</h4>
                <p className="text-sm text-gray-700">
                  Laat eerst één arm uit de inbakerdoek. Meestal de arm waar baby naar neigt te rollen.
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stap 2: Beide armen vrij (3-5 dagen)</h4>
                <p className="text-sm text-gray-700">
                  Bakker alleen nog het lichaam in, beide armen zijn vrij. Of gebruik een inbakerslaapzak
                  met open vleugels.
                </p>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stap 3: Volledig naar slaapzak</h4>
                <p className="text-sm text-gray-700">
                  Ga over naar een reguliere slaapzak. Pas de TOG-waarde aan (meestal 0.5-1.0 hoger
                  dan je gebruikte met inbakeren).
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Populaire inbakerslaapzakken</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Deze merken maken veilige inbakerslaapzakken in verschillende TOG-waardes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Love to Dream Swaddle UP:</strong> 0.2, 1.0 en 2.5 TOG (met armen omhoog positie)</li>
              <li><strong>Ergobaby Swaddler:</strong> 0.5 en 1.0 TOG (verstelbare vleugels)</li>
              <li><strong>Aden + Anais Snug Swaddle:</strong> 0.5 en 1.0 TOG (3-weg ritssysteem)</li>
              <li><strong>Puckababy:</strong> Diverse TOG-waardes (Nederlandse merk)</li>
            </ul>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mb-6">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Pro Tip: Transitie Slaapzakken</p>
                <div className="text-base text-gray-700">
                  Sommige merken maken speciale transitie-slaapzakken waarbij je de vleugels kunt
                  losmaken. Deze zijn ideaal voor de geleidelijke overgang en kun je daarna gewoon
                  als reguliere slaapzak blijven gebruiken.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Juiste TOG-waarde voor Inbakeren
          </h3>
          <p className="text-gray-600 mb-6">
            Gebruik onze calculator en trek 0.5-1.0 TOG af voor de inbakerdoek/slaapzak.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar Calculator
          </Link>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kennisbank/wiegendood-voorkomen-tog"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Wiegendood Voorkomen</div>
              <div className="text-sm text-gray-600">SIDS preventie gids</div>
            </Link>
            <Link
              href="/kennisbank/baby-slaapzak-koopgids"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Slaapzak Koopgids</div>
              <div className="text-sm text-gray-600">Inbakerslaapzakken</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest uitgelegd</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/premature-baby-tog-waarde"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Premature Baby TOG-waarde
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Terug naar</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Kennisbank Overzicht
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="inbakeren-tog-waarde"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
