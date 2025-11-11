'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { Info, BookOpen, AlertTriangle, Shield, Scale, Baby } from 'lucide-react'

export default function InformatiePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  
  const infoSections = [
    {
      icon: Baby,
      title: 'Over Flesvoeding',
      content: 'Flesvoeding is een veilig en voedzaam alternatief voor borstvoeding. Moderne zuigelingenvoeding is zorgvuldig samengesteld om te voldoen aan alle voedingsbehoeften van uw baby.',
      color: 'blue'
    },
    {
      icon: Scale,
      title: 'Berekeningsbasis',
      content: 'Onze calculator gebruikt de Nederlandse standaard van 150ml per kg lichaamsgewicht per dag, aangepast naar leeftijd conform de richtlijnen van het Voedingscentrum.',
      color: 'green'
    },
    {
      icon: AlertTriangle,
      title: 'Individuele Verschillen',
      content: 'Elke baby is uniek. Sommige baby\'s drinken meer, anderen minder. Belangrijker dan de exacte hoeveelheid is dat uw baby groeit en zich goed ontwikkelt.',
      color: 'amber'
    },
    {
      icon: Shield,
      title: 'Veiligheid',
      content: 'Volg altijd de bereidingsinstructies op de verpakking. Gebruik zuiver water en steriele flessen. Bewaar bereide voeding niet langer dan 2 uur bij kamertemperatuur.',
      color: 'red'
    }
  ]

  const ageGuidelines = [
    { age: '0-1 maanden', feeds: '8-12 voedingen per dag', amount: '60-90ml per voeding', note: 'Kleine, frequente voedingen' },
    { age: '1-2 maanden', feeds: '7-9 voedingen per dag', amount: '75-105ml per voeding', note: 'Meer per voeding, iets minder frequent' },
    { age: '2-4 maanden', feeds: '6-8 voedingen per dag', amount: '105-135ml per voeding', note: 'Regelmatiger voedingspatroon' },
    { age: '4-6 maanden', feeds: '5-6 voedingen per dag', amount: '135-180ml per voeding', note: 'Voorbereiding op bijvoeding' },
    { age: '6+ maanden', feeds: '4-5 voedingen per dag', amount: '180-240ml per voeding', note: 'Combinatie met vaste voeding' }
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Info className="w-6 h-6 mr-3 text-primary" />
            Informatie over Flesvoeding
          </h1>
          <p className="text-gray-600">
            Alles wat u moet weten over flesvoeding, van berekeningen tot praktische tips voor het verzorgen van uw baby.
          </p>
        </div>

        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoSections.map((section, index) => (
            <div key={index} className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-${section.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <section.icon className={`w-5 h-5 text-${section.color}-600`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Age Guidelines */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary" />
            Richtlijnen per Leeftijd
          </h2>
          
          <div className="space-y-4">
            {ageGuidelines.map((guideline, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <span className="font-medium text-primary">{guideline.age}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{guideline.feeds}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{guideline.amount}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 italic">{guideline.note}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 rounded-xl">
            <p className="text-sm text-amber-800">
              <strong>Let op:</strong> Dit zijn algemene richtlijnen. Elke baby is anders en kan meer of minder nodig hebben. 
              Raadpleeg altijd uw consultatiebureau of kinderarts bij vragen over de groei en ontwikkeling van uw baby.
            </p>
          </div>
        </div>

        {/* When to Contact Healthcare */}
        <div className="bg-primary/10 rounded-2xl border border-red-200 p-6">
          <h2 className="font-medium text-red-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
            Wanneer Contact Opnemen met Zorgverlener
          </h2>
          
          <div className="space-y-3 text-sm text-primary">
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Uw baby weigert consistent voeding of drinkt veel minder dan normaal</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Gewichtsverlies of onvoldoende gewichtstoename</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Regelmatig overgeven na voedingen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Tekenen van uitdroging (droge luier, lusteloos, droge mond)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span>Zorgen over groei, ontwikkeling of voedingspatroon</span>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary rounded-2xl p-6 text-white">
          <h2 className="font-medium mb-2">Nog vragen?</h2>
          <p className="text-gray-100 mb-4">
            Heeft u na het lezen van deze informatie nog vragen over flesvoeding? 
            Neem gerust contact met ons op voor aanvullende informatie.
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-primary hover:bg-default font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Contact opnemen
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  )
}