'use client'
import Layout from '../../components/Layout'
import { ShieldCheck, AlertTriangle, Info, CheckCircle, Thermometer, Baby, Heart, Eye } from 'lucide-react'

export default function VeiligheidscontrolePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="container mx-auto">
            {/* Header - NOT framed */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Veiligheidscontrole Baby Slaap
              </h1>

              <p className="text-lg text-gray-600">
                Controleer regelmatig of je baby het comfortabel heeft. Deze checklist helpt je
                om oververhitting en onderkoeling te voorkomen.
              </p>
            </div>

            {/* ALL Content - FRAMED */}
            <div className="p-6 lg:p-12 bg-white rounded-2xl">
              {/* Disclaimer */}
              <div className="relative p-4 pl-5 rounded-xl flex items-center gap-3 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/80 mb-8">
                <AlertTriangle className="w-5 h-5 text-primary/80 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1 text-text-primary">Belangrijk</div>
                  <div className="text-sm text-text-secondary-dark">
                    TOG-waarden zijn richtlijnen. Check altijd zelf of je baby het comfortabel heeft.
                    Baby's verschillen in warmteregulatie. Bij twijfel, raadpleeg je kinderarts of consultatiebureau.
                  </div>
                </div>
              </div>


              {/* Main Checklist */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Controlepunten voor Veilige Babyslaap
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Check 1 */}
              <div className="bg-default p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-secondary-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nek voelt warm maar niet zweterig
                  </h3>
                  <p className="text-gray-600">
                    Voel regelmatig aan de nek van je baby. Dit is de beste plek om te controleren of je baby
                    het warm genoeg heeft. De nek moet warm aanvoelen, maar niet bezweet of klam zijn.
                  </p>
                </div>
              </div>

              {/* Check 2 */}
              <div className="bg-default p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-secondary-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Geen vochtig haar, rode wangen of snelle ademhaling
                  </h3>
                  <p className="text-gray-600">
                    Tekenen van oververhitting zijn: vochtig haar, rode wangen, snelle of onregelmatige ademhaling,
                    en rusteloosheid. Als je deze signalen ziet, verwijder dan direct een laag kleding.
                  </p>
                </div>
              </div>

              {/* Check 3 */}
              <div className="bg-default p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Borst/rug voelt aangenaam warm (niet heet of koud)
                  </h3>
                  <p className="text-gray-600">
                    De borst en rug van je baby moeten aangenaam warm aanvoelen. Niet heet of bezweet,
                    maar ook niet koud. Let op: handjes en voetjes mogen wel wat koeler zijn, dat is normaal.
                  </p>
                </div>
              </div>

              {/* Check 4 */}
              <div className="bg-default p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Baby className="w-6 h-6 text-secondary-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Baby slaapt rustig zonder rillen of onrust
                  </h3>
                  <p className="text-gray-600">
                    Een baby die het comfortabel heeft slaapt rustig en vredig. Rillen, schokken of veel bewegen
                    kan betekenen dat je baby het te koud of te warm heeft.
                  </p>
                </div>
              </div>
              </div>

              {/* Belangrijke Veiligheidstips */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center mt-12">
                Belangrijke Veiligheidstips
              </h2>

              <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-secondary/20 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark mb-12">
              <Info className="w-6 h-6 text-secondary-dark mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Onthoud:</p>
                <ul className="text-base text-gray-700 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span>Geen mutsjes binnen (baby verliest warmte via hoofd)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span>Gezicht moet altijd onbedekt blijven</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Losse dekens: Niet voor baby's!</strong> Ingestopte dekens: alleen met "feet to foot" methode</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span>Slaapzakken bestaan vanaf 50cm voor newborns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span>Bij twijfel: één laag minder is veiliger dan teveel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Gebruik nooit TOG 4.0 of hoger (verhoogd SIDS-risico)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-secondary-dark mt-0.5 flex-shrink-0" />
                    <span>Slaapzak is altijd veiliger dan dekens</span>
                  </li>
                </ul>
              </div>
            </div>

              {/* Kamertemperatuur Richtlijnen */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
                Kamertemperatuur Richtlijnen
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative bg-default p-6 rounded-2xl overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
                <div className="flex items-center gap-3 mb-3">
                  <Thermometer className="w-6 h-6 text-secondary-dark" />
                  <h3 className="text-lg font-semibold text-gray-900">Te Koud (&lt;16°C)</h3>
                </div>
                <p className="text-gray-900 text-sm mb-3">
                  Kamer is kouder dan aanbevolen. Gebruik 3.5 TOG slaapzak met warme kleding.
                </p>
                <p className="text-gray-900 text-xs">
                  Let extra goed op of je baby het warm genoeg heeft.
                </p>
              </div>

                <div className="relative bg-secondary/20 p-6 rounded-2xl overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-secondary-dark" />
                  <h3 className="text-lg font-semibold text-gray-900">Ideaal (16-24°C)</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Perfecte temperatuur voor veilige babyslaap. AAP beveelt 20-22°C aan.
                </p>
                <p className="text-gray-600 text-xs">
                  Gebruik TOG 1.0-2.5 afhankelijk van exacte temperatuur.
                </p>
              </div>

                <div className="relative bg-primary/10 p-6 rounded-2xl overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">Te Warm (&gt;24°C)</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Risico op oververhitting! Gebruik maximaal 0.5 TOG.
                </p>
                <p className="text-gray-600 text-xs">
                  Overweeg alleen een romper of luier zonder slaapzak.
                </p>
              </div>

                <div className="relative bg-secondary/10 p-6 rounded-2xl overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-secondary-dark">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="w-6 h-6 text-secondary-dark" />
                  <h3 className="text-lg font-semibold text-gray-900">18-20°C (NHS)</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  NHS en Lullaby Trust adviseren 2.5 TOG bij 18-20°C.
                </p>
                <p className="text-gray-600 text-xs">
                  Dit is de meest voorkomende aanbeveling in winter.
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-primary to-accent rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ShieldCheck className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white">
              Bereken de Ideale TOG Waarde
            </h2>
            <p className="text-base lg:text-lg opacity-90 mb-6">
              Gebruik onze calculator om de perfecte slaapzak en kleding voor je baby te bepalen
            </p>
            <a
              href="/calculator"
              className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-colors"
            >
              <span>Naar TOG Calculator</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
