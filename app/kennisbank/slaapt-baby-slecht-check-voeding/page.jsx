import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Baby, ChevronRight, Activity, CheckCircle, AlertTriangle, Moon } from 'lucide-react'

export const metadata = {
  title: 'Baby slaapt slecht? Check temperatuur en voeding | TOGWaarde.nl',
  description: 'Slaapt je baby slecht? Naast de juiste TOG en kamertemperatuur van 16 tot 20 graden verstoort ook honger de nacht. Zo check je in twee stappen temperatuur en voeding.',
  keywords: 'baby slaapt slecht, baby onrustig slapen, baby wakker honger, slaaptemperatuur baby, baby voeding en slapen, TOG en slapen',
  alternates: { canonical: '/kennisbank/slaapt-baby-slecht-check-voeding/' },
}

export default function SlaaptBabySlechtCheckVoedingPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Slaapt je Baby Slecht? Check ook de Voeding</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Moon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Slaapt je Baby Slecht? Check ook de Voeding
          </h1>
          <p className="text-lg text-gray-600">
            Temperatuur en TOG-waarde zijn belangrijk, maar honger of een onrustige voeding verstoren de nacht net zo goed. Zo check je beide kanten.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Twee oorzaken die vaak samen optreden</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Wordt je baby vaak wakker, dan kijken de meeste ouders eerst naar honger of naar
              slaapgedrag. De temperatuur wordt nogal eens overgeslagen, terwijl een te warme of te
              koude baby net zo onrustig slaapt als een hongerige baby. Andersom geldt hetzelfde:
              is de{' '}
              <Link href="/kennisbank/veilige-slaaptemperatuur" className="text-primary hover:underline font-medium">slaaptemperatuur</Link>{' '}
              op orde maar blijft je baby huilen, dan is de voeding een logische volgende check.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Stap 1: check de temperatuur</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Voel in het nekje:</strong> lauwwarm en droog is goed; klam of zweterig is te warm, koel is te koud</li>
              <li><strong>Meet de kamertemperatuur:</strong> ideaal is 16 tot 20 graden</li>
              <li><strong>Check de TOG-waarde:</strong> gebruik ons <Link href="/" className="text-primary hover:underline font-medium">kledingadvies per temperatuur</Link> of <Link href="/calculator" className="text-primary hover:underline font-medium">bereken de TOG van je huidige combinatie</Link></li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Stap 2: check de voeding</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Klopt de temperatuur maar blijft de nacht onrustig? Loop dan de voeding na:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Drinkt je baby genoeg overdag?</strong> Een baby die overdag te weinig binnenkrijgt, haalt dat &apos;s nachts in</li>
              <li><strong>Is de laatste voeding te vroeg?</strong> Een voeding vlak voor het slapen helpt veel baby&apos;s de eerste uren door</li>
              <li><strong>Verloopt de nachtvoeding rustig?</strong> Fel licht en veel prikkels maken wakker; gedimd licht en stilte helpen</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Geef je de fles? Op onze zustersite FlesvoedingCalculator.nl vind je een handige{' '}
              <a href="https://flesvoedingcalculator.nl" className="text-primary hover:underline font-medium">rekentool voor de juiste hoeveelheid flesvoeding</a>{' '}
              en praktische artikelen over{' '}
              <a href="https://flesvoedingcalculator.nl/kennisbank/praktische-tips/flesvoeding-en-slapen/" className="text-primary hover:underline font-medium">flesvoeding en slapen</a>{' '}
              en{' '}
              <a href="https://flesvoedingcalculator.nl/kennisbank/praktische-tips/nachtvoeding-optimaliseren/" className="text-primary hover:underline font-medium">nachtvoeding optimaliseren</a>.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Snelle checklist voor onrustige nachten</h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Nekje voelt lauwwarm en droog aan</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Kamertemperatuur tussen 16 en 20 graden</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Totale TOG-waarde past bij de temperatuur</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Voldoende voeding overdag en een rustige laatste voeding</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Nachtvoeding met gedimd licht en weinig prikkels</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800 mb-6">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Blijft je baby wekenlang slecht slapen, valt hij of zij af, of vertrouw je het niet?
                Neem dan contact op met het consultatiebureau of je huisarts.
              </span>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Check de Temperatuur in 30 Seconden
          </h3>
          <p className="text-gray-600 mb-6">
            Stel de kamertemperatuur in en zie direct welke slaapzak en kleding veilig zijn.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar het Kledingadvies
          </Link>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kennisbank/veilige-slaaptemperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Veilige Slaaptemperatuur</div>
              <div className="text-sm text-gray-600">De ideale temperatuur voor de babykamer</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest en andere methodes</div>
            </Link>
            <Link
              href="/kennisbank/oververhitting-herkennen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Oververhitting Herkennen</div>
              <div className="text-sm text-gray-600">Signalen en direct handelen</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
