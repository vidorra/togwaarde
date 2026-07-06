'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { HelpCircle, ChevronRight, Activity, CheckCircle, XCircle } from 'lucide-react'

function Mythe({ mythe, feit }) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-2 mb-2">
        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
        <p className="text-gray-900 font-semibold">&quot;{mythe}&quot;</p>
      </div>
      <div className="flex items-start gap-2 pl-1">
        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
        <p className="text-gray-700">{feit}</p>
      </div>
    </div>
  )
}

export default function TogMythesEnFeitenPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">TOG-mythes en Feiten</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Iedereen zegt wat anders: TOG-mythes en feiten
          </h1>
          <p className="text-lg text-gray-600">
            Schoonmoeder zegt dik aankleden, het forum zegt luchtig, het label zegt weer wat anders. Dit zeggen de richtlijnen echt.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              Rond babyslaap en warmte bestaan hardnekkige adviezen die van generatie op generatie
              doorgegeven worden. Hieronder de tien meest gehoorde uitspraken, getoetst aan de
              richtlijnen van VeiligheidNL, het NCJ, de NHS en The Lullaby Trust.
            </p>

            <Mythe
              mythe="Een baby moet lekker warm ingepakt worden, koud is gevaarlijk"
              feit="Andersom: te warm is de bekende risicofactor voor wiegendood. Een baby die het koud heeft wordt wakker en huilt, een te warme baby wordt juist steeds stiller. Kies bij twijfel altijd de koelere optie."
            />
            <Mythe
              mythe="Koude handjes betekenen dat je baby het koud heeft"
              feit="Koele handjes en voetjes zijn normaal door de nog onrijpe bloedsomloop. Voel in het nekje of op de rug: lauwwarm en droog is goed."
            />
            <Mythe
              mythe="Bij koorts moet een kind uitzweten onder een extra deken"
              feit="Nooit doen. Bij koorts moet het lichaam warmte kwijt kunnen. Kleed juist een laag lichter aan en lees ons artikel over koorts en de slaapzak."
            />
            <Mythe
              mythe="Een dikkere slaapzak is altijd een betere slaapzak"
              feit="De juiste slaapzak past bij de kamertemperatuur. Bij 20 graden is 1.0 TOG passend en is 3.5 TOG gevaarlijk warm. Duurder of dikker is niet beter, passend is beter."
            />
            <Mythe
              mythe="Je kunt een deken gewoon dubbelvouwen als het kouder wordt"
              feit="Dubbelvouwen verdubbelt de isolatiewaarde. Van een 1.2 TOG deken maak je zo een deken van 2.4 TOG, boven op de rest. Gebruik liever een dikkere slaapzak."
            />
            <Mythe
              mythe="TOG-waardes zijn overal hetzelfde geregeld"
              feit="TOG is een Britse standaard die vooral in Europa op slaapzakken staat. In de VS zie je vaker eigen labels of geen waarde. Het principe blijft gelijk, maar vergelijk labels dus niet blind tussen landen en merken."
            />
            <Mythe
              mythe="Na een paar keer wassen klopt de TOG-waarde niet meer"
              feit="Een slaapzak die zijn vorm en vulling houdt, verliest nauwelijks isolatiewaarde. Pas op bij een zak die dun, klonterig of uitgelubberd is: dan klopt het label niet meer en is vervangen verstandig."
            />
            <Mythe
              mythe="Kleding heeft ook een officiële TOG-waarde"
              feit="Alleen slaapzakken hebben een gemeten TOG-rating. Waardes voor rompers en pyjama's zijn schattingen, ook in onze calculator. Daarom blijft het nekje voelen altijd de eindcheck."
            />
            <Mythe
              mythe="Een mutsje in bed houdt je baby lekker op temperatuur"
              feit="Baby's reguleren hun warmte via het hoofd. Een muts in bed blokkeert dat en verhoogt het risico op oververhitting. Muts is voor buiten."
            />
            <Mythe
              mythe="Bij 2.0 TOG kun je de calculator niet gebruiken"
              feit="Tussenwaardes bestaan gewoon. Behandel 2.0 TOG als een iets lichtere 2.5 en tel de kleding erbij op. De totale combinatie telt, niet het losse label."
            />

            <p className="text-gray-700 leading-relaxed mt-8 mb-6">
              Twijfel je na een goedbedoeld advies van familie of een forum? Toets het in 30 seconden:
              stel de kamertemperatuur in op ons{' '}
              <Link href="/" className="text-primary hover:underline font-medium">kledingadvies per temperatuur</Link>{' '}
              of reken je eigen combinatie na met de{' '}
              <Link href="/calculator" className="text-primary hover:underline font-medium">TOG calculator</Link>.
              Meer achtergrond over de basis lees je in{' '}
              <Link href="/kennisbank/wat-is-tog" className="text-primary hover:underline font-medium">wat is TOG</Link>.
            </p>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Zelf checken in plaats van gissen
          </h3>
          <p className="text-gray-600 mb-6">
            Stel de kamertemperatuur in en zie direct welke slaapzak en kleding veilig zijn volgens de richtlijnen.
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
              href="/kennisbank/wat-is-tog"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Wat is TOG?</div>
              <div className="text-sm text-gray-600">De basis in begrijpelijke taal</div>
            </Link>
            <Link
              href="/kennisbank/baby-koorts-slaapzak"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Koorts en de Slaapzak</div>
              <div className="text-sm text-gray-600">Waarom uitzweten een mythe is</div>
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
