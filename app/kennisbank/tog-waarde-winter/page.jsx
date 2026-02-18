import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Snowflake, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'TOG-waarde Winter: Baby Warm en Veilig Aankleden | TOGWaarde.nl',
  description: 'Complete wintergids voor TOG-waardes. Ontdek welke slaapzak en kleding je baby nodig heeft bij koude temperaturen voor warme en veilige winterslaap.',
  keywords: 'TOG waarde winter, baby warm aankleden winter, winterslaapzak baby, TOG 2.5, TOG 3.5'
}

export default function TOGWaardeWinterPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">TOG-waarde Winter</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Snowflake className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Snowflake className="w-6 h-6 mr-3 text-primary" />
            TOG-waarde Winter
          </h1>
          <p className="text-lg text-gray-600">
            Baby warm én veilig aankleden in de winter. Complete gids voor koude nachten zonder risico op oververhitting.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-lg font-semibold text-primary mb-4">Welke TOG-waarde in de winter?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              In de winter heb je een hogere TOG-waarde nodig om je baby warm te houden. Maar let op:
              meer is niet altijd beter. Het belangrijkste is dat je de juiste balans vindt tussen
              warmte en veiligheid.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Winter TOG-waarde Richtlijnen</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>16-20°C:</strong> TOG 2.5 - Dikke winterslaapzak</li>
                <li><strong>12-15°C:</strong> TOG 3.5 - Extra warme winterslaapzak</li>
                <li><strong>Onder 12°C:</strong> Verhoog eerst de kamertemperatuur</li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Laagjes combineren in de winter</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              De kunst van baby's warm houden in de winter zit in het slim combineren van lagen.
              Hier zijn de beste combinaties per temperatuur:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">18°C - Milde Winter</h4>
                <p className="text-sm text-gray-700">TOG 2.5 slaapzak + lange pyjama (lange mouwen en broekspijpen)</p>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">15-16°C - Koude Winter</h4>
                <p className="text-sm text-gray-700">TOG 2.5-3.5 slaapzak + lange pyjama + rompertje</p>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Onder 15°C - Zeer Koud</h4>
                <p className="text-sm text-gray-700">TOG 3.5 slaapzak + dikke pyjama + rompertje (of verhoog eerst de kamertemperatuur)</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Veelgemaakte winterfouten</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Te veel lagen:</strong> Dit kan juist leiden tot oververhitting</li>
              <li><strong>Dekentjes gebruiken:</strong> Gevaarlijk en niet nodig met de juiste TOG</li>
              <li><strong>Mutsje tijdens slapen:</strong> Baby's verliezen veel warmte via het hoofd (intentioneel)</li>
              <li><strong>Dikke sokken:</strong> Voetjes zijn de thermostaat van je baby</li>
            </ul>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Let Op: Oververhitting in de Winter</p>
                <div className="text-base text-gray-700">
                  Veel ouders hebben de neiging om hun baby extra warm aan te kleden in de winter.
                  Dit kan echter gevaarlijk zijn. Controleer regelmatig de nektemperatuur: deze moet
                  warm aanvoelen maar niet bezweet zijn.
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-primary mb-4 mt-8">Transitie tussen seizoenen</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              De overgang van herfst naar winter en van winter naar lente kan lastig zijn. Bekijk ons{' '}
              <Link href="/kennisbank/tog-waarde-per-seizoen" className="text-primary hover:underline font-medium">overzicht van TOG-waardes per seizoen</Link>{' '}
              voor een complete seizoensgids. Houd een thermometer bij het bed en pas de TOG-waarde
              geleidelijk aan bij temperatuurschommelingen van meer dan 2-3 graden.
            </p>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="font-medium text-gray-900 mb-3">
            Bereken de Juiste Winter TOG-waarde
          </h3>
          <p className="text-gray-600 mb-6">
            Vul je huidige kamertemperatuur in en krijg direct het juiste winter-slaapadvies.
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
          <h3 className="font-semibold text-primary mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/kennisbank/tog-waarde-per-seizoen"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">TOG-waarde per Seizoen →</div>
              <div className="text-sm text-gray-600">Seizoensoverzicht voor het Nederlandse klimaat</div>
            </Link>
            <Link
              href="/kennisbank/veilige-slaaptemperatuur"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">Veilige Slaaptemperatuur →</div>
              <div className="text-sm text-gray-600">Veiligheidscheck voor de wintermaanden</div>
            </Link>
            <Link
              href="/kennisbank/baby-slaapzak-koopgids"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">Baby Slaapzak Koopgids →</div>
              <div className="text-sm text-gray-600">De beste winterslaapzakken voor jouw baby</div>
            </Link>
            <Link
              href="/"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">TOG Calculator →</div>
              <div className="text-sm text-gray-600">Bereken de juiste TOG-waarde voor jouw baby</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/babykamer-temperatuur"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Ideale Babykamer Temperatuur
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/baby-slapen-zomer"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Baby Slapen in de Zomer
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-waarde-winter"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
