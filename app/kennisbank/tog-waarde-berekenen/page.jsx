'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { Calculator, ArrowRight, ChevronRight, Activity, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export default function TOGWaardeBerekenenPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">TOG-waarde Berekenen</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            TOG-waarde Berekenen
          </h1>
          <p className="text-lg text-gray-600">
            Stap-voor-stap handleiding om de juiste TOG-waarde voor je baby te berekenen, plus gratis rekentool voor direct resultaat.
          </p>
        </header>

        {/* Main Content */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Hoe bereken je de TOG-waarde?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Het berekenen van de juiste TOG-waarde voor je baby is eenvoudiger dan je denkt. Met onze
              stap-voor-stap methode weet je binnen enkele minuten welke slaapzak het beste past bij de
              kamertemperatuur.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Belangrijkste Factoren</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kamertemperatuur (meet dit altijd op babybed-hoogte)</li>
                <li>Aantal kledinglagen onder de slaapzak</li>
                <li>Leeftijd en gewicht van je baby</li>
                <li>Seizoen en verwachte temperatuurschommelingen</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Stap 1: Meet de kamertemperatuur</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Plaats een betrouwbare thermometer op de hoogte van het babybed. De temperatuur kan tot
              2-3 graden verschillen tussen vloer en plafond.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Stap 2: Kies de basislaag kleding</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Start met een rompertje of pyjama als basislaag. Afhankelijk van de temperatuur kun je
              hier lagen aan toevoegen of juist verminderen.
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Stap 3: Gebruik de TOG-tabel</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-secondary-dark mb-2">24°C+</div>
                <div className="text-sm text-gray-700 mb-2">TOG 0.5</div>
                <div className="text-xs text-gray-600">Alleen romper of dunne pyjama</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary mb-2">18-24°C</div>
                <div className="text-sm text-gray-700 mb-2">TOG 1.0-2.5</div>
                <div className="text-xs text-gray-600">Romper + slaapzak</div>
              </div>
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4">
                <div className="text-2xl font-bold text-accent mb-2">15-18°C</div>
                <div className="text-sm text-gray-700 mb-2">TOG 2.5-3.5</div>
                <div className="text-xs text-gray-600">Pyjama + warme slaapzak</div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Tip</h3>
              <p className="text-gray-700 leading-relaxed">
                Controleer altijd de nektemperatuur van je baby. De nek moet warm aanvoelen, maar niet
                klam of bezweet. Dit is de beste indicator of de TOG-waarde correct is.
              </p>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Juiste TOG-waarde Direct
          </h3>
          <p className="text-gray-600 mb-6">
            Gebruik onze gratis calculator om binnen 30 seconden de perfecte TOG-waarde te berekenen.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Naar Calculator
          </Link>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Gerelateerde Artikelen</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kennisbank/wat-is-tog-waarde"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Wat is TOG-waarde?</div>
              <div className="text-sm text-gray-600">Complete gids en uitleg</div>
            </Link>
            <Link
              href="/kennisbank/babykamer-temperatuur"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Ideale Babykamer Temperatuur</div>
              <div className="text-sm text-gray-600">16, 18 of 20 graden?</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest en andere methodes</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/wat-is-tog-waarde"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Wat is TOG-waarde?
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/babykamer-temperatuur"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                Ideale Babykamer Temperatuur
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="tog-waarde-berekenen"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
