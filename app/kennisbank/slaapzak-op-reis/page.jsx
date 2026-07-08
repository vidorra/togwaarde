import Layout from '../../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'
import { Plane, ChevronRight, Activity, CheckCircle, AlertTriangle, Snowflake } from 'lucide-react'

export const metadata = {
  title: 'Slaapzak op Reis: Welke TOG-waarde op Vakantie? | TOGWaarde.nl',
  description: 'Warm land, koude bergnachten of buiten slapen in de kinderwagen: zo pas je de TOG-waarde onderweg aan. Met paklijst en tips voor veilig slapen op vakantie.',
  keywords: 'slaapzak op reis, tog waarde vakantie, baby slapen vakantie, slaapzak warm land, buiten slapen kinderwagen, reisslaapzak baby',
  alternates: { canonical: '/kennisbank/slaapzak-op-reis/' },
}

export default function SlaapzakOpReisPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Slaapzak op Reis</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Plane className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Welke TOG-waarde op vakantie?
          </h1>
          <p className="text-lg text-gray-600">
            Warm land, koude bergnachten of buiten slapen in de kinderwagen: zo pas je de TOG-waarde onderweg aan.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">De hoofdregel verandert niet</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ook op vakantie geldt: de temperatuur van de slaapruimte bepaalt de TOG-waarde, niet het
              land of het seizoen. Neem dus een kleine thermometer mee (of gebruik die van de babyfoon)
              en meet waar je baby daadwerkelijk slaapt. Een hotelkamer met airco kan kouder zijn dan
              thuis, een tent in de zon juist veel warmer.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Warm land (Zuid-Europa en verder)</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Boven 27 graden in de slaapkamer:</strong> alleen een luier, geen slaapzak. Eventueel een dun hydrofiel doekje</li>
              <li><strong>24 tot 27 graden:</strong> 0.5 TOG zomerslaapzak met alleen een luier eronder</li>
              <li><strong>Met airco:</strong> stel in op 20 tot 22 graden, richt de luchtstroom nooit op het bedje en kleed aan op de gemeten kamertemperatuur</li>
              <li><strong>Overdag:</strong> houd slaapjes in de schaduw en check vaker het nekje, zie ook onze tips voor <Link href="/kennisbank/baby-slapen-zomer" className="text-primary hover:underline font-medium">baby slapen in de zomer</Link></li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Koude bestemming, tent of bergnachten</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Onder de 16 graden: 3.5 TOG slaapzak met warme kleding eronder (romper plus dikker pakje)</li>
              <li>In een tent daalt de temperatuur &apos;s nachts hard: meet bij het slapengaan én leg een extra laagje klaar</li>
              <li>Muts af zodra je baby in de slaapzak ligt, ook bij kou binnen</li>
              <li>Geen kruik of elektrische deken bij een baby in bed</li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Buiten slapen in de kinderwagen</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Buiten slapen (de Scandinavische gewoonte) kan prima en veel baby&apos;s slapen er heerlijk door.
              De spelregels:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Gebruik een voetenzak of slaapzak die past bij de buitentemperatuur; tussen 0 en 10 graden is dat al snel een dikke voetenzak met muts</li>
              <li>Zet de wagen uit de wind en uit de zon, met goed zicht op je baby (of een babyfoon met camera)</li>
              <li>Check elke 15 tot 30 minuten het nekje, buiten koelt of stijgt de temperatuur sneller dan binnen</li>
              <li>Niet buiten laten slapen bij vorst onder de min 5, dichte mist of harde wind</li>
              <li>Regenhoes alleen bij regen: een gesloten hoes in de zon werkt als een broeikas</li>
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800 mb-6">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Ook op reis: laat je baby op de rug slapen, op een vlakke ondergrond, zonder losse dekens
                of kussens. Een reisbedje met een strak passend matras is veiliger dan samen slapen in een
                onbekend bed.
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Paklijst voor de slaap</h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Twee slaapzakken: een lichte (0.5 of 1.0 TOG) en de zak die je thuis gebruikt</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Kleine thermometer voor de slaapruimte</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Rompers in twee diktes, zodat je per nacht kunt schakelen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Voetenzak of dikkere zak voor buiten slapen bij koelere bestemmingen</span>
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed mb-6">
              Twijfel je ter plekke over een combinatie? Onze{' '}
              <Link href="/calculator" className="text-primary hover:underline font-medium">TOG calculator</Link>{' '}
              werkt ook prima op je telefoon op de camping. Geef je de fles op vakantie? Op onze
              zustersite staat een praktische gids over{' '}
              <a href="https://flesvoedingcalculator.nl/kennisbank/praktische-tips/flesvoeding-op-vakantie/" className="text-primary hover:underline font-medium">
                flesvoeding op vakantie
              </a>.
            </p>
          </div>
        </div>

        {/* Affiliate: reis- en zomerslaapzakken */}
        <div className="mb-8">
          <AffiliateProductWidget
            pageId="slaapzak-op-reis"
            hideIndex
            title="Handig voor onderweg: reis- en zomerslaapzakken"
          />
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Check de TOG voor jullie bestemming
          </h3>
          <p className="text-gray-600 mb-6">
            Stel de verwachte nachttemperatuur in en zie direct welke slaapzak en kleding je inpakt.
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
              href="/kennisbank/baby-slapen-zomer"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Slapen in de Zomer</div>
              <div className="text-sm text-gray-600">TOG bij warm weer en hitteplan</div>
            </Link>
            <Link
              href="/kennisbank/autostoel-draagzak-warmte"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Autostoel, Draagzak en Warmte</div>
              <div className="text-sm text-gray-600">Veilig aankleden onderweg</div>
            </Link>
            <Link
              href="/kennisbank/tog-waarde-per-seizoen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">TOG-waarde per Seizoen</div>
              <div className="text-sm text-gray-600">Complete gids voor het hele jaar</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
