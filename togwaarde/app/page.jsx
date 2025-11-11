'use client'
import { useState } from 'react'
import Layout from '../components/Layout'
import TOGCalculator from '../components/TOGCalculator'
import { Calculator, BookOpen, ShoppingBag, Thermometer, ThermometerSun, CheckCircle, Snowflake, Shield, Heart, Award, Star } from 'lucide-react'

export default function HomePage() {
  const handleScrollToCalculator = () => {
    const calculator = document.getElementById('tog-calculator')
    if (calculator) {
      calculator.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 relative">
          {/* Decorative blur elements */}
          <div className="absolute top-10 left-10 w-60 h-60 bg-secondary/20 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat1 10s ease-in-out infinite' }}></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat2 12.5s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat3 11s ease-in-out infinite' }}></div>

          <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <ThermometerSun className="w-8 h-8 text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 font-display">
              De Perfecte Slaaptemperatuur voor jouw baby
            </h1>

            <p className="text-lg text-gray-600">
              Bereken in 30 seconden de ideale TOG waarde voor de slaapzak van je baby.
              Veilige babyslaap begint met de juiste temperatuur.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Shield className="w-4 h-4 text-green-700" />
              <span className="text-sm font-medium text-gray-700">SIDS Preventie</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">CE Gecertificeerd</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700">Nederlands Advies</span>
            </div>
          </div>

          <div className="relative z-10">

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScrollToCalculator}
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Start TOG Calculator</span>
              </button>

              <a
                href="/wat-is-tog-waarde"
                className="inline-flex items-center gap-2 sm:gap-3 bg-default text-primary border-2 border-primary font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full hover:bg-primary/5 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Wat is TOG waarde?</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="tog-calculator" className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <TOGCalculator />
        </div>
      </section>

      {/* What is TOG Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Wat is TOG?
            </h2>
            <p className="text-base lg:text-lg text-gray-600">
              TOG is een internationaal erkende maatstaf die aangeeft hoe goed textiel warmte vasthoudt. Een hogere TOG-waarde betekent meer isolatie en een warmere slaapzak.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 lg:p-8 mx-auto">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-secondary-dark" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TOG 0.5</h3>
                <p className="text-gray-600">Voor warme zomernachten (24°C+)</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TOG 1.0</h3>
                <p className="text-gray-600">Voor lente en herfst (18-24°C)</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TOG 2.5</h3>
                <p className="text-gray-600">Voor koude winternachten (15-18°C)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Waarom TOGWaarde.nl?
            </h2>
            <p className="text-base lg:text-lg text-gray-600">
              De meest complete TOG calculator van Nederland
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <CheckCircle className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wetenschappelijk Onderbouwd</h3>
              <p className="text-gray-600">
                Gebaseerd op Nederlandse richtlijnen en internationale veiligheidsnormen
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Calculator className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Persoonlijk Advies</h3>
              <p className="text-gray-600">
                Aangepaste aanbevelingen op basis van jouw babys leeftijd en kamertemperatuur
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <ThermometerSun className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Seizoensadvies</h3>
              <p className="text-gray-600">
                Specifieke tips voor lente, zomer, herfst en winter in Nederland
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Shield className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SIDS Preventie</h3>
              <p className="text-gray-600">
                Informatie over veilig slapen en het voorkomen van wiegendood
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <BookOpen className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Uitgebreide Kennisbank</h3>
              <p className="text-gray-600">
                Alles over TOG, veilige slaaptemperatuur en seizoensgebonden tips
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <Heart className="w-10 h-10 text-primary/60 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Gratis</h3>
              <p className="text-gray-600">
                Geen verborgen kosten, registratie of verplichtingen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Hoe Werkt Het?
              </h2>
              <p className="text-base lg:text-lg text-gray-600">
                In 5 eenvoudige stappen naar veilige babyslaap
              </p>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Meet de kamertemperatuur</h3>
                  <p className="text-gray-700">
                    Gebruik een betrouwbare thermometer of een babyfoon met temperatuurmeting. Meet op verschillende momenten van de dag en nacht, want temperaturen kunnen flink schommelen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bepaal de maximale TOG-waarde</h3>
                  <p className="text-gray-700">
                    Kijk in de tabel hierboven wat de aanbevolen maximale TOG-waarde is voor de gemeten temperatuur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kies de kleding en beddengoed</h3>
                  <p className="text-gray-700 mb-2">Tel de TOG-waardes van alle lagen bij elkaar op:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Alle kledingstukken die je baby aanheeft</li>
                    <li>Het slaapzakje of de dekentjes</li>
                    <li>Eventuele extra laagjes</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Blijf onder de maximum waarde</h3>
                  <p className="text-gray-700">
                    Zorg dat je totaal onder of gelijk aan de aanbevolen maximale TOG-waarde blijft. Liever iets onder dan erboven.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Controleer regelmatig</h3>
                  <p className="text-gray-700 mb-2">Voel in het nekje of aan de rug van je baby:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                      <span><strong>Lauwwarm en droog:</strong> Perfect!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ThermometerSun className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span><strong>Klam of zweterig:</strong> Te warm, verwijder een laagje</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Snowflake className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Koel:</strong> Mogelijk te koud, voeg een laagje toe</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-12 text-center">
              <button
                onClick={handleScrollToCalculator}
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Bereken Nu Jouw TOG Waarde</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Banner */}
      <section className="py-12 bg-gradient-to-r from-primary to-accent rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Shield className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white">
              Veilige Babyslaap Begint Hier
            </h2>
            <p className="text-base lg:text-lg opacity-90 mb-6">
              De juiste TOG waarde helpt oververhitting te voorkomen en draagt bij aan een veilige slaapomgeving voor je baby
            </p>
            <a
              href="/kennisbank"
              className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full hover:bg-gray-100 transition-colors"
            >
              <span>Lees Meer over Veilig Slapen</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ThermometerSun className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Klaar om te Beginnen?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Bereken nu de perfecte TOG waarde voor jouw baby
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScrollToCalculator}
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Naar Calculator</span>
              </button>

              <a
                href="/kennisbank/tog-waarde-per-seizoen"
                className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary border-2 border-primary font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full hover:bg-primary/5 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Seizoensadvies</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
