import Layout from '../../../components/Layout'
import Link from 'next/link'
import { BookOpen, ArrowRight, ChevronRight, Activity, ThermometerSun, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'Wat is TOG-waarde? Betekenis en Uitleg voor Babyslaapzakken | TOGWaarde.nl',
  description: 'Ontdek wat TOG-waarde betekent, hoe het werkt en waarom het belangrijk is voor babyslaapzakken. Complete uitleg over de TOG-schaal van 0.5 tot 3.5.',
  keywords: 'wat is TOG waarde, TOG betekenis, TOG uitleg, TOG slaapzak, thermische isolatie baby'
}

export default function WatIsTOGWaardePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tog-waarde-gids" className="hover:text-primary">TOG-waarde Gids</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Wat is TOG-waarde?</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wat is TOG-waarde?
          </h1>
          <p className="text-lg text-gray-600">
            De complete gids over TOG-waardes voor veilig slapen van je baby. Leer alles over betekenis,
            geschiedenis en wetenschappelijke basis.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Wat is de TOG-waarde precies?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>TOG</strong> is een internationaal erkende maatstaf die aangeeft hoe goed textiel warmte vasthoudt.
              De term komt van het Engelse woord <strong>"togs"</strong> (kledingstukken) en is ontwikkeld door
              het Shirley Institute in Manchester in 1946.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Voor baby's worden TOG-waardes gebruikt tussen <strong>0.5 en 3.5</strong>. Dit geeft je een helder
              referentiekader bij het kiezen van slaapkleding.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wetenschappelijke Basis</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                De TOG-waarde wordt uitgedrukt in thermische weerstand: <strong>1 TOG = 0.1 m²·K/W</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Het geheim van isolatie zit in de lucht. Textiel zelf isoleert nauwelijks - het zijn de
                luchtlaagjes tussen de vezels die 80-95% van de isolatie verzorgen.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Waarom is TOG belangrijk voor je baby?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Baby's zijn bijzonder kwetsbaar als het gaat om temperatuurregulatie. De{' '}
              <Link href="/kennisbank/babykamer-temperatuur" className="text-primary hover:underline font-medium">ideale babykamer temperatuur</Link>{' '}
              speelt hierbij een cruciale rol. Ze kunnen nog niet:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Zelf dekens van zich af gooien als ze het te warm krijgen</li>
              <li>Aangeven wanneer ze het oncomfortabel warm of koud hebben</li>
              <li>Hun lichaamswarmte effectief aanpassen aan de omgeving</li>
            </ul>

            <div className="relative p-6 lg:p-8 rounded-2xl flex items-start gap-4 bg-accent/10 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent mb-6">
              <AlertTriangle className="w-6 h-6 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 mb-4">Gevaar van Oververhitting</p>
                <div className="text-base text-gray-700">
                  Oververhitting is een wetenschappelijk aangetoonde risicofactor voor wiegendood.
                  Het correct gebruiken van TOG-waardes helpt dit risico significant te verminderen.
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">TOG-waarde Bereiken</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-secondary-dark mb-2">0.5 - 1.0</div>
                <div className="text-sm text-gray-700">Dunne, luchtige materialen voor warme dagen (24°C+)</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary mb-2">1.0 - 2.5</div>
                <div className="text-sm text-gray-700">Tussenseizoenen met gematigde temperaturen (18-24°C)</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-accent mb-2">2.5 - 3.5</div>
                <div className="text-sm text-gray-700">Warme isolatie voor koude nachten (15-18°C)</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Juiste TOG-waarde
          </h3>
          <p className="text-gray-600 mb-6">
            Gebruik onze gratis calculator om direct te weten welke TOG-waarde jouw baby nodig heeft.
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
              href="/kennisbank/wat-is-tog"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">Wat is TOG? →</div>
              <div className="text-sm text-gray-600">Basis uitleg over het TOG-systeem</div>
            </Link>
            <Link
              href="/kennisbank/babykamer-temperatuur"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">Ideale Babykamer Temperatuur →</div>
              <div className="text-sm text-gray-600">16, 18 of 20 graden?</div>
            </Link>
            <Link
              href="/kennisbank/tog-waarde-berekenen"
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
            >
              <div className="font-medium text-primary">TOG-waarde Berekenen →</div>
              <div className="text-sm text-gray-600">Stap-voor-stap handleiding</div>
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
            href="/tog-waarde-gids"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Complete TOG-waarde Gids
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/tog-waarde-berekenen"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                TOG-waarde Berekenen
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="wat-is-tog-waarde"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
