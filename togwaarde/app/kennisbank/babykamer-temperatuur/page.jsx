'use client'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { ThermometerSun, ArrowRight, ChevronRight, Activity, AlertCircle } from 'lucide-react'

export default function BabykamerTemperatuurPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Babykamer Temperatuur</span>
        </nav>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-dark rounded-full text-sm font-medium">
              Foundation
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">12 minuten leestijd</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ideale Babykamer Temperatuur
          </h1>
          <p className="text-xl text-gray-600">
            16, 18 of 20 graden? De wetenschap achter de richtlijnen en hoe je de perfecte slaaptemperatuur bereikt.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4">Wat is de ideale temperatuur?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Experts zijn het erover eens: de ideale babykamer temperatuur ligt tussen <strong>16-20°C</strong>,
              met een optimum rond <strong>18°C</strong>. Deze temperatuur biedt de beste balans tussen comfort
              en veiligheid.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Waarom 18°C Optimaal is</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Minimaliseert het risico op oververhitting</li>
                <li>Bevordert diepe, rustgevende slaap</li>
                <li>Ondersteunt natuurlijke temperatuurregulatie</li>
                <li>Vermindert het SIDS-risico (wiegendood)</li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">De wetenschap achter de richtlijn</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Onderzoek toont aan dat baby's beter slapen in een koelere omgeving. Hun lichaam heeft
              een natuurlijke temperatuurdaling nodig om in diepe slaap te komen, vergelijkbaar met volwassenen.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-accent/10 rounded-xl p-4 border-2 border-accent/30">
                <div className="text-2xl font-bold text-accent mb-2">Te Warm</div>
                <div className="text-sm text-gray-700 mb-2">Boven 20°C</div>
                <div className="text-xs text-gray-600">Verhoogd risico op oververhitting en SIDS</div>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 border-2 border-primary">
                <div className="text-2xl font-bold text-primary mb-2">Ideaal</div>
                <div className="text-sm text-gray-700 mb-2">16-20°C</div>
                <div className="text-xs text-gray-600">Optimale temperatuur voor veilig slapen</div>
              </div>
              <div className="bg-secondary/10 rounded-xl p-4 border-2 border-secondary/30">
                <div className="text-2xl font-bold text-secondary-dark mb-2">Te Koud</div>
                <div className="text-sm text-gray-700 mb-2">Onder 16°C</div>
                <div className="text-xs text-gray-600">Pas TOG-waarde aan of verhoog temperatuur</div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 mt-8">Tips voor de juiste temperatuur</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Het behouden van de juiste temperatuur kan uitdagend zijn, vooral bij wisselend weer:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Gebruik een betrouwbare kamerthermometer op bedrand-hoogte</li>
              <li>Houd rekening met temperatuurverschillen in de kamer</li>
              <li>Ventileer overdag, maar vermijd tocht tijdens slaap</li>
              <li>Overweeg een slimme thermostaat voor constante temperatuur</li>
            </ul>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 my-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                Belangrijke Waarschuwing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Een te warme babykamer (boven 20°C) is één van de belangrijkste risicofactoren voor
                wiegendood. Houd de temperatuur altijd tussen 16-20°C en pas de TOG-waarde van de
                slaapzak aan in plaats van de kamertemperatuur te verhogen.
              </p>
            </div>
          </div>
        </div>

        {/* CTA naar Calculator */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3">
            Bereken de Juiste TOG-waarde voor Jouw Kamertemperatuur
          </h3>
          <p className="text-gray-600 mb-6">
            Vul de temperatuur van je babykamer in en ontdek direct welke TOG-waarde je nodig hebt.
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
              href="/kennisbank/tog-waarde-berekenen"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">TOG-waarde Berekenen</div>
              <div className="text-sm text-gray-600">Stap-voor-stap handleiding</div>
            </Link>
            <Link
              href="/kennisbank/baby-temperatuur-controleren"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Baby Temperatuur Controleren</div>
              <div className="text-sm text-gray-600">Nektest en andere methodes</div>
            </Link>
            <Link
              href="/kennisbank/wiegendood-voorkomen-tog"
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors"
            >
              <div className="font-medium text-gray-900 mb-1">Wiegendood Voorkomen</div>
              <div className="text-sm text-gray-600">SIDS preventie met TOG-waarde</div>
            </Link>
          </div>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/kennisbank/tog-waarde-berekenen"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                TOG-waarde Berekenen
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/tog-waarde-winter"
            className="flex items-center p-6 bg-white rounded-xl border border-gray-100 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-900 group-hover:text-primary">
                TOG-waarde Winter
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>
      </div>
    </Layout>
  )
}
