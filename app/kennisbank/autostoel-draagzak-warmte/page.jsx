'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Car, ChevronRight, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

export default function AutostoelDraagzakWarmtePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Autostoel, Draagzak en Warmte</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Car className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mag een dikke jas aan in de autostoel?
          </h1>
          <p className="text-lg text-gray-600">
            Nee, en dat heeft twee redenen: gordelveiligheid en warmte. Zo houd je je baby onderweg veilig en op temperatuur.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Waarom geen dikke jas in de autostoel?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Een dikke winterjas of skipak drukt in elkaar bij een botsing. De gordels lijken strak te
              zitten over de jas, maar bij een klap perst de vulling samen en ontstaat er ineens
              centimeters speling. Daarnaast wordt een auto snel warm: wat buiten comfortabel was,
              is binnen na tien minuten veel te heet, met risico op{' '}
              <Link href="/kennisbank/oververhitting-herkennen" className="text-primary hover:underline font-medium">oververhitting</Link>.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Zo doe je het wel</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Gordels op de kleding, niet op de jas:</strong> dunne laagjes aan (romper, pyjama of dun vestje), gordels strak, en leg de jas of een dekentje er daarna overheen</li>
              <li><strong>Voetenzak voor de autostoel:</strong> kies een model zonder rugvulling, zodat de gordels direct op het lichaam blijven</li>
              <li><strong>Auto voorverwarmen:</strong> een paar minuten verwarming vooraf werkt beter dan dik aankleden</li>
              <li><strong>Check onderweg:</strong> voel bij langere ritten in het nekje, net als in bed. Klam betekent laagje eraf</li>
              <li><strong>Muts af in de auto:</strong> baby&apos;s reguleren warmte via het hoofd</li>
            </ul>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">En in de draagzak?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In een draagzak telt jouw lichaamswarmte mee als een flinke extra laag. Reken de draagzak
              zelf als ongeveer één kledinglaag en jouw lichaam als nog een laag erbij.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Kleed je baby één laag lichter aan dan je op basis van de buitentemperatuur zou doen</li>
              <li>Draag je onder je eigen jas? Dan heeft je baby meestal genoeg aan een romper met dun pakje</li>
              <li>Houd het gezichtje altijd vrij en zichtbaar, ook bij kou</li>
              <li>Bescherm uitstekende delen: mutsje buiten, sokjes of beenwarmers voor blote beentjes</li>
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-sm text-amber-800 mb-6">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Laat een baby nooit slapen in de autostoel buiten de auto (bijvoorbeeld thuis of in de winkelwagen).
                De houding knelt de luchtweg af. Verplaats een slapende baby thuis altijd naar een vlak bedje.
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Van auto naar bed</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Valt je baby onderweg in slaap? Haal bij aankomst eerst de warme buitenlaag eraf voordat je
              je baby in bed legt, en check daarna of de{' '}
              <Link href="/kennisbank/veilige-slaaptemperatuur" className="text-primary hover:underline font-medium">slaaptemperatuur</Link>{' '}
              en de TOG-combinatie kloppen. Snel checken kan met onze{' '}
              <Link href="/calculator" className="text-primary hover:underline font-medium">TOG calculator</Link>.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Snelle checklist onderweg</h2>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Dunne laagjes aan, gordels strak op het lichaam</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Jas of dekentje pas over de gordels heen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Muts af zodra je binnen of in de auto bent</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>In de draagzak: één laag minder, gezichtje vrij</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span>Nekje voelen bij twijfel, onderweg en bij aankomst</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Thuis weer in bed?
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
              href="/kennisbank/slaapzak-op-reis"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Slaapzak op Reis</div>
              <div className="text-sm text-gray-600">Vakantie, kinderwagen en buiten slapen</div>
            </Link>
            <Link
              href="/kennisbank/oververhitting-herkennen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Oververhitting Herkennen</div>
              <div className="text-sm text-gray-600">Signalen en direct handelen</div>
            </Link>
            <Link
              href="/kennisbank/kleding-onder-slaapzak"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Kleding Onder de Slaapzak</div>
              <div className="text-sm text-gray-600">Kledingadvies per TOG en temperatuur</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
