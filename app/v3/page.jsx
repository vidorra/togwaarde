'use client'
import Layout from '../../components/Layout'
import TOGCalculatorV3 from '../../components/calculator-v3/TOGCalculatorV3'
import {
  ThermometerSun,
  Shield,
  Heart,
  BookOpen,
  ArrowRight,
  Check
} from 'lucide-react'

export default function HomePageV3() {
  const scrollToCalc = () => {
    document.getElementById('tog-calculator-v3')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Layout>
      {/* Compact hero — single column, mobile-first */}
      <section className="pt-6 pb-2">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <ThermometerSun className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              De juiste TOG voor jouw baby
            </h1>
            <p className="text-sm sm:text-base text-text-secondary mb-5">
              In 3 stappen het juiste slaapadvies — gebaseerd op NHS &amp; VeiligheidNL.
            </p>

            {/* Trust row — compact */}
            <div className="flex items-center justify-center gap-4 text-xs text-text-secondary mb-5 flex-wrap">
              <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-600" /> SIDS-richtlijnen</span>
              <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-600" /> 100% gratis</span>
              <span className="inline-flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-primary" /> Geen registratie</span>
            </div>
          </div>
        </div>
      </section>

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
