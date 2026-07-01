'use client'
import Image from 'next/image'
import Layout from '../../components/Layout'
import ReverseCalculator from '../../components/calculator-v3/ReverseCalculator'
import {
  ThermometerSun,
  Shield,
  Heart,
  BookOpen,
  Calculator,
  Award,
  Star,
  Thermometer,
  CheckCircle,
  Snowflake,
  ArrowRight
} from 'lucide-react'

export default function ReversePage() {
  const scrollToCalc = () => {
    document.getElementById('reverse-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Layout>
      {/* Hero with decorative blurs and flanking images (lg+) */}
      <section className="pb-0">
        <div className="container mx-auto px-4 relative">
          <div className="absolute top-10 left-10 w-60 h-60 bg-secondary/20 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat1 10s ease-in-out infinite' }}></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat2 12.5s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat3 11s ease-in-out infinite' }}></div>

          <div className="max-w-4xl mx-auto text-center mb-4 relative z-10 pt-10 lg:pt-16">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-3">
              <ThermometerSun className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-display leading-tight">
              Wat trekt mijn baby aan<br />bij deze temperatuur?
            </h1>
          </div>
        </div>
      </section>

      {/* Images flanking centre content (lg+ only) */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="flex items-end justify-center gap-0">
          <div className="hidden lg:block flex-shrink-0 ml-6 lg:-translate-y-12">
            <Image
              src="/blije-dreumes.webp"
              alt="Blije dreumes"
              width={896}
              height={1344}
              sizes="240px"
              className="w-[240px] h-auto object-cover object-top rounded-full"
            />
          </div>

          <div className="flex-1 max-w-3xl flex flex-col items-center justify-start px-4 pb-16 lg:pb-24 self-start pt-6">
            <p className="text-base lg:text-lg text-text-secondary text-center mb-6 max-w-2xl">
              Stel de kamertemperatuur in en zie meteen welke slaapzak en kleding
              veilig zijn. Gebaseerd op NHS, Lullaby Trust en VeiligheidNL.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Shield className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium text-gray-700">SIDS Preventie</span>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">Wetenschappelijk onderbouwd</span>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">Nederlands Advies</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={scrollToCalc}
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Bekijk het kledingadvies</span>
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary border-2 border-primary font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full hover:bg-primary/5 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Bereken TOG van je combinatie</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:block flex-shrink-0 mr-6 lg:translate-y-4">
            <Image
              src="/slapende-baby.webp"
              alt="Slapende baby"
              width={896}
              height={1344}
              sizes="290px"
              className="w-[290px] h-auto object-cover object-top rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Reverse calculator */}
      <section id="reverse-calculator" className="py-4">
        <div className="container mx-auto px-3 sm:px-4">
          <ReverseCalculator titleTag="h2" />
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

      {/* How It Works — reverse flow */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Zo werkt het
              </h2>
              <p className="text-base lg:text-lg text-gray-600">
                In 3 stappen naar de juiste slaapkleding
              </p>
            </div>
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Meet de kamertemperatuur</h3>
                  <p className="text-gray-700">Gebruik een thermometer of babyfoon met temperatuurmeting en zet de slider op die waarde.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lees ons advies</h3>
                  <p className="text-gray-700">Je ziet meteen welke TOG-waarde slaapzak en welke kleding eronder veilig zijn voor die temperatuur.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Controleer je baby</h3>
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
                onClick={scrollToCalc}
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Naar het advies</span>
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
              Liever je eigen combinatie checken?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8">
              Weet je al wat je baby aanheeft? Reken andersom en kijk of het klopt.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Naar de TOG Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
