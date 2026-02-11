'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { ArrowRight, Home, CheckCircle, Clock, BookOpen, Wrench, Shield, Baby, Thermometer, AlertTriangle, Info, Package } from 'lucide-react'


export default function InfographicsPage() {
  const [activeInfographic, setActiveInfographic] = useState('bereiding')

  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">Home • Infographics</div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            Visuele Guides
          </h1>
          <p className="text-gray-600">
            Handige infographics en stap-voor-stap guides voor flesvoeding
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-4">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveInfographic('bereiding')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center ${
                activeInfographic === 'bereiding'
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-default'
              }`}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Flesvoeding Bereiden
            </button>
            <button
              onClick={() => setActiveInfographic('schema')}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center ${
                activeInfographic === 'schema'
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-default'
              }`}
            >
              <Clock className="w-4 h-4 mr-2" />
              Voedingsschema per Leeftijd
            </button>
          </div>
        </div>

        {/* Infographic Content */}
        {activeInfographic === 'bereiding' && <BereidingInfographic />}
        {activeInfographic === 'schema' && <VoedingsschemaInfographic />}
      </div>
    </Layout>
  )
}

// Flesvoeding Bereiden Infographic
const BereidingInfographic = () => {
  const steps = [
    {
      number: 1,
      icon: Shield,
      title: "Handen wassen",
      description: "Was je handen grondig met zeep en warm water",
      tips: ["Minimaal 20 seconden wassen", "Ook onder de nagels"],
      warning: null
    },
    {
      number: 2,
      icon: Thermometer,
      title: "Water koken",
      description: "Kook vers kraanwater en laat afkoelen tot 40°C",
      tips: ["Gebruik koud kraanwater", "Nooit water opnieuw koken"],
      warning: "Bij baby's <3 maanden: gebruik 70°C water"
    },
    {
      number: 3,
      icon: Package,
      title: "Water afmeten",
      description: "Meet de exacte hoeveelheid water af in de fles",
      tips: ["Zet fles op vlakke ondergrond", "Kijk op ooghoogte"],
      warning: null
    },
    {
      number: 4,
      icon: Package,
      title: "Poeder toevoegen",
      description: "Voeg het juiste aantal afgestreken schepjes toe",
      tips: ["Gebruik bijgeleverde maatschep", "Niet aandrukken!"],
      warning: "1 schepje = 30ml water"
    },
    {
      number: 5,
      icon: Wrench,
      title: "Schudden",
      description: "Sluit de fles en schud krachtig tot alles opgelost is",
      tips: ["Horizontaal + verticaal schudden", "Check op klontjes"],
      warning: null
    },
    {
      number: 6,
      icon: Thermometer,
      title: "Temperatuur checken",
      description: "Test een druppel op je pols - moet lauw aanvoelen",
      tips: ["37°C is ideaal", "Te heet? Afkoelen onder kraan"],
      warning: "Nooit in magnetron opwarmen!"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">
          Flesvoeding Bereiden in 6 Stappen
        </h2>
        <p className="text-gray-600">
          Volg deze stappen voor veilige en correcte bereiding van flesvoeding
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6"
          >
            {/* Step Header */}
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-medium text-lg">
                {step.number}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-800 text-lg flex items-center">
                  <step.icon className="w-5 h-5 mr-2 text-primary" />
                  {step.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{step.description}</p>

            {/* Tips */}
            <div className="bg-default rounded-xl p-4 mb-3">
              <p className="text-sm font-medium text-primary mb-2">Tips:</p>
              <ul className="space-y-1">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning */}
            {step.warning && (
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{step.warning}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div className="bg-primary-gradient rounded-2xl p-6 text-white">
        <h3 className="font-medium text-lg mb-4">
          Belangrijke Hygiëneregels
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="font-medium mb-2">Altijd doen:</p>
            <ul className="text-sm space-y-1 text-white/90">
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Flessen steriliseren tot 6 maanden</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Direct opdrinken na bereiding</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Verse voeding per keer maken</span>
                </li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="font-medium mb-2">Nooit doen:</p>
            <ul className="text-sm space-y-1 text-white/90">
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Restjes bewaren voor later</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Fles opnieuw opwarmen</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Poeder vooraf in fles doen</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Voedingsschema Infographic
const VoedingsschemaInfographic = () => {
  const ageGroups = [
    {
      age: "0-1 maand",
      color: "bg-primary",
      mlPerKg: 150,
      avgWeight: "3.5-4.5 kg",
      feedings: "8-12x per dag",
      amount: "60-90 ml",
      interval: "2-3 uur",
      total: "500-650 ml/dag",
      milkType: "Startvoeding (1)",
      development: "Zoekreflex, veel slapen",
      tips: "Voeden op verzoek, nachtvoedingen normaal"
    },
    {
      age: "1-2 maanden",
      color: "bg-primary",
      mlPerKg: 150,
      avgWeight: "4.5-5.5 kg",
      feedings: "7-9x per dag",
      amount: "90-120 ml",
      interval: "3-4 uur",
      total: "650-800 ml/dag",
      milkType: "Startvoeding (1)",
      development: "Eerste lachjes, alerter",
      tips: "Ritme begint te ontstaan"
    },
    {
      age: "2-4 maanden",
      color: "bg-primary",
      mlPerKg: 150,
      avgWeight: "5.5-7.0 kg",
      feedings: "6-8x per dag",
      amount: "120-180 ml",
      interval: "3-4 uur",
      total: "800-1000 ml/dag",
      milkType: "Startvoeding (1)",
      development: "Hoofdje optillen, grabbelend",
      tips: "Mogelijk doorslapen 's nachts"
    },
    {
      age: "4-6 maanden",
      color: "bg-primary",
      mlPerKg: 150,
      avgWeight: "6.5-8.0 kg",
      feedings: "5-6x per dag",
      amount: "180-240 ml",
      interval: "4-5 uur",
      total: "900-1000 ml/dag",
      milkType: "Startvoeding (1)",
      development: "Klaar voor eerste hapjes",
      tips: "Start oefenhapjes rond 4-6 maanden"
    },
    {
      age: "6-9 maanden",
      color: "bg-primary",
      mlPerKg: 120,
      avgWeight: "7.5-9.0 kg",
      feedings: "4-5x per dag",
      amount: "200-250 ml",
      interval: "Rond maaltijden",
      total: "800-1000 ml/dag",
      milkType: "Opvolgmelk (2)",
      development: "Zit zelfstandig, eet hapjes",
      tips: "2-3 vaste maaltijden erbij"
    },
    {
      age: "9-12 maanden",
      color: "bg-primary",
      mlPerKg: 100,
      avgWeight: "8.5-10.0 kg",
      feedings: "3-4x per dag",
      amount: "200-250 ml",
      interval: "Ochtend & avond",
      total: "600-800 ml/dag",
      milkType: "Opvolgmelk (2)",
      development: "Kruipen, staan, eerste woordjes",
      tips: "3 maaltijden + 2 tussendoortjes"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">
          Voedingsschema per Leeftijd
        </h2>
        <p className="text-gray-600">
          Complete tijdlijn van 0 tot 12 maanden met aanbevolen hoeveelheden
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line - Hidden on mobile */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-primary"></div>

        {/* Age Groups */}
        <div className="space-y-6">
          {ageGroups.map((group, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot - Hidden on mobile */}
              <div className={`hidden lg:block absolute left-6 w-5 h-5 ${group.color} rounded-full border-4 border-white`}></div>
              
              {/* Content Card */}
              <div className="lg:ml-20 bg-white/80 backdrop-blur rounded-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className={`${group.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-xl">{group.age}</h3>
                      <p className="text-white/90 text-sm">Gem. gewicht: {group.avgWeight}</p>
                      <p className="text-white/90 text-xs">{group.mlPerKg} ml per kg</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-lg">{group.total}</p>
                      <p className="text-white/90 text-sm">per dag</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Feeding Details */}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <Package className="w-4 h-4 mr-2 text-gray-600" />
                        Voedingsdetails
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Frequentie:</span>
                          <span className="font-medium text-gray-800">{group.feedings}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Per voeding:</span>
                          <span className="font-medium text-gray-800">{group.amount}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Interval:</span>
                          <span className="font-medium text-gray-800">{group.interval}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Type melk:</span>
                          <span className="font-medium text-gray-800">{group.milkType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Development & Tips */}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <Baby className="w-4 h-4 mr-2 text-gray-600" />
                        Ontwikkeling & Tips
                      </h4>
                      <div className="bg-default rounded-xl p-4">
                        <p className="text-sm text-gray-800 mb-2">
                          <strong>Mijlpalen:</strong> {group.development}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Tip:</strong> {group.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formula Reference Card */}
      <div className="bg-primary-gradient rounded-2xl p-6 text-white">
        <h3 className="font-medium text-lg mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Berekeningsformule
        </h3>
        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <p className="font-medium mb-3">Nederlandse standaard richtlijn:</p>
          <div className="space-y-2 text-sm">
            <p>• <strong>Basis:</strong> Gewicht (kg) × ml per kg = Dagelijkse hoeveelheid</p>
            <p>• <strong>Voorbeeld:</strong> 6kg baby × 150ml/kg = 900ml per dag</p>
            <p>• <strong>Verdeling:</strong> 900ml ÷ 6 voedingen = 150ml per voeding</p>
            <p>• <strong>Maximum:</strong> 1000 ml per dag (tot 12 maanden)</p>
            <p className="mt-3 text-white/80 italic">
              Let op: Dit zijn richtlijnen. Elk kind is anders!
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Link */}
      <div className="text-center">
        <Link 
          href="/"
          className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-xl transition-all inline-flex items-center"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Bereken Persoonlijke Hoeveelheden
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          Gebruik onze calculator voor exact op maat gemaakte adviezen
        </p>
      </div>
    </div>
  )
}