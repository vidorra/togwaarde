'use client'
import Layout from '../../components/Layout'
import TOGCalculatorV3 from '../../components/calculator-v3/TOGCalculatorV3'
import {
  ThermometerSun,
  Shield,
  Heart,
  BookOpen,
  ArrowRight,
  Check,
  Calculator,
  Award,
  Star
} from 'lucide-react'

export default function HomePageV3() {
  const scrollToCalc = () => {
    document.getElementById('tog-calculator-v3')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Layout>
      {/* Hero with decorative blurs and flanking images (lg+) */}
      <section className="pb-0">
        <div className="container mx-auto px-4 relative">
          {/* Decorative blur elements */}
          <div className="absolute top-10 left-10 w-60 h-60 bg-secondary/20 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat1 10s ease-in-out infinite' }}></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat2 12.5s ease-in-out infinite' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-xl pointer-events-none" style={{ animation: 'subtleFloat3 11s ease-in-out infinite' }}></div>

          <div className="max-w-4xl mx-auto text-center mb-4 relative z-10 pt-10 lg:pt-16">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-3">
              <ThermometerSun className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 font-display leading-tight">
              De Perfecte Slaaptemperatuur voor jouw baby
            </h1>
          </div>
        </div>
      </section>

      {/* Images flanking centre content (lg+ only) */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="flex items-end justify-center gap-0">
          {/* Mother — left, desktop only */}
          <div className="hidden lg:block flex-shrink-0 ml-10">
            <img
              src="/mother.webp"
              alt="Moeder met baby"
              className="w-[240px] h-auto object-cover object-top rounded-t-full"
            />
          </div>

          {/* Centre: tagline + trust + CTAs */}
          <div className="flex-1 max-w-3xl flex flex-col items-center justify-start px-4 pb-16 lg:pb-24 self-start pt-6">
            <p className="text-base lg:text-lg text-text-secondary text-center mb-6 max-w-2xl">
              Vul in wat past — wij rekenen live mee.
              Gebaseerd op NHS, Lullaby Trust en VeiligheidNL.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Shield className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium text-gray-700">SIDS Preventie</span>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">CE Gecertificeerd</span>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">Nederlands Advies</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={scrollToCalc}
                className="inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-hover text-white font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Start TOG Calculator</span>
              </button>
              <a
                href="/wat-is-tog-waarde"
                className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary border-2 border-primary font-medium px-6 sm:px-8 py-3 text-sm sm:text-base rounded-full hover:bg-primary/5 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Wat is TOG waarde?</span>
              </a>
            </div>
          </div>

          {/* Baby sleeping bag — right, desktop only */}
          <div className="hidden lg:block flex-shrink-0 mr-10">
            <img
              src="/baby-sleeping-bag.webp"
              alt="Baby in slaapzak"
              className="w-[240px] h-auto object-cover object-top rounded-t-full"
            />
          </div>
        </div>
      </div>

      {/* Calculator */}
      <section id="tog-calculator-v3" className="py-4">
        <div className="container mx-auto px-3 sm:px-4">
          <TOGCalculatorV3 titleTag="h2" />
        </div>
      </section>

      {/* Mini explainer — 3 cards */}
      <section className="py-10 mt-4">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 text-center">
              Wat betekent TOG?
            </h2>
            <div className="grid gap-3">
              <TOGCard tog="0.5" label="Warme zomernacht" temp="24°C+" />
              <TOGCard tog="1.0" label="Lente / herfst" temp="18–24°C" />
              <TOGCard tog="2.5" label="Koude winternacht" temp="15–18°C" />
            </div>
          </div>
        </div>
      </section>

      {/* Single CTA */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <a
              href="/kennisbank"
              className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
            >
              <BookOpen className="w-4 h-4" />
              Meer over veilig babyslapen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function TOGCard({ tog, label, temp }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-border rounded-2xl">
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
        <span className="text-xs text-primary font-medium leading-none">TOG</span>
        <span className="text-lg text-primary font-bold leading-none mt-0.5">{tog}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-text-primary">{label}</div>
        <div className="text-xs text-text-secondary">Kamertemperatuur {temp}</div>
      </div>
    </div>
  )
}
