'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Sun, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export default function BabySlapenZomerPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Baby Slapen in de Zomer</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Sun className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Baby Slapen in de Zomer
          </h1>
          <p className="text-lg text-gray-600">
            TOG-waarde bij warm weer en complete hitteplan voor veilig slapen tijdens tropische nachten.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Welke TOG-waarde bij warm weer?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              In de zomer kies je voor de laagste TOG-waardes. Het doel is om je baby koel te houden
              zonder het risico op{' '}
              <Link href="/kennisbank/oververhitting-herkennen" className="text-primary hover:underline font-medium">oververhitting</Link>,
              terwijl je toch voldoende bescherming biedt voor een veilige slaapomgeving.
              Bekijk ook ons{' '}
              <Link href="/kennisbank/tog-waarde-per-seizoen" className="text-primary hover:underline font-medium">overzicht van TOG-waardes per seizoen</Link>.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Zomer TOG-waarde Richtlijnen</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>24-27°C:</strong> TOG 0.5 - Dunne zomerslaapzak</li>
                <li><strong>Boven 27°C:</strong> Alleen een rompertje of luier</li>
                <li><strong>21-24°C:</strong> TOG 1.0 - Lichte slaapzak</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Hitteplan voor tropische nachten</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Bij temperaturen boven 27°C vraagt slapen om extra maatregelen. Volg dit stappenplan
              voor veilig slapen tijdens hittegolven:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stap 1: Verlaag de kamertemperatuur</h4>
                <p className="text-sm text-gray-700 mb-2">Probeer de babykamer zo koel mogelijk te krijgen:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  <li>Sluit overdag gordijnen en ramen</li>
                  <li>Ventileer 's avonds laat en 's ochtends vroeg</li>
                  <li>Gebruik een ventilator (niet direct op baby gericht)</li>
                  <li>Overweeg airconditioning (18-20°C)</li>
                </ul>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stap 2: Minimaliseer kleding</h4>
                <p className="text-sm text-gray-700 mb-2">Bij extreme hitte:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  <li>Alleen een dunne romper of luier</li>
                  <li>Geen slaapzak bij 27°C+</li>
                  <li>Gebruik lichte, ademende katoenen materialen</li>
                </ul>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Stap 3: Monitor extra alert</h4>
                <p className="text-sm text-gray-700 mb-2">Controleer vaker:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
                  <li>Nektemperatuur elke 2-3 uur</li>
                  <li>Tekenen van oververhitting (rood gezicht, zweten)</li>
                  <li>Hydratatie (extra moedermelk/flesvoeding bij vraag)</li>
                </ul>
              </div>
            </div>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/5 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent my-8">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Waarschuwingstekenen Oververhitting</p>
                <div className="text-base text-gray-700">
                  <p className="mb-3">
                    Let op deze tekenen en handel direct:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Klam of bezweet hoofd en nek</li>
                    <li>Rood of verhit gezicht</li>
                    <li>Snelle ademhaling</li>
                    <li>Rusteloosheid of prikkelbaarheid</li>
                    <li>Huiduitslag (warmte-uitslag)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Veelgemaakte zomerfouten</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Ventilator direct op baby:</strong> Kan uitdrogen en verkoudheid veroorzaken</li>
              <li><strong>IJskoud bad voor slapen:</strong> Te schrikken; lauw bad is beter</li>
              <li><strong>Natte doek in bedje:</strong> Verhoogt luchtvochtigheid en verslechtert warmtebeleving</li>
              <li><strong>Veel drinken forceren:</strong> Baby neemt wat nodig is; bied aan maar forceer niet</li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Zomer slaapzak materialen</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              De juiste stof maakt het verschil bij warm weer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Mousseline/Hydrofiel:</strong> Extra luchtig en ademend</li>
              <li><strong>Bamboe:</strong> Natuurlijk temperatuurregelerend</li>
              <li><strong>Dun katoen:</strong> Klassiek en betrouwbaar</li>
              <li>Vermijd: Synthetische stoffen, fleece, dikke materialen</li>
            </ul>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Juiste Zomer TOG-waarde
          </h3>
          <p className="text-gray-600 mb-6">
            Vul de temperatuur in en ontdek direct welke TOG-waarde veilig is bij warm weer.
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
              href="/kennisbank/oververhitting-herkennen"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">Oververhitting Herkennen →</div>
              <div className="text-sm text-gray-600">Tekenen van oververhitting in de zomer</div>
            </Link>
            <Link
              href="/kennisbank/veilige-slaaptemperatuur"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">Veilige Slaaptemperatuur →</div>
              <div className="text-sm text-gray-600">Veilige temperatuurgrens voor zomernachten</div>
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
            href="/kennisbank/tog-waarde-winter"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                TOG-waarde Winter
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/baby-slaapzak-koopgids"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Baby Slaapzak Koopgids
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="baby-slapen-zomer"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
