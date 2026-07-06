'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { generateFAQSchema } from '../../lib/structured-data'
import { Info, Calculator, Baby, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'


export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('calculator')
  const [openFAQ, setOpenFAQ] = useState(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const categories = [
    { id: 'calculator', name: 'Calculator gebruik', icon: Calculator },
    { id: 'tog', name: 'TOG & slaapzakken', icon: Baby },
    { id: 'medical', name: 'Veiligheid', icon: AlertCircle },
    { id: 'practical', name: 'Praktische tips', icon: Info }
  ]

  const faqs = {
    calculator: [
      {
        id: 1,
        question: 'Hoe nauwkeurig is deze calculator?',
        answer: 'Onze adviezen volgen de TOG-richtbanden per kamertemperatuur van de NHS, The Lullaby Trust en VeiligheidNL. Alleen slaapzakken hebben een officiële TOG-rating; de waarden voor losse kleding zijn schattingen. De calculator geeft dus een goede richtlijn, maar voel altijd ook zelf in het nekje van je baby.'
      },
      {
        id: 2,
        question: 'Wat is het verschil tussen de twee calculators?',
        answer: 'Op de homepage stel je de kamertemperatuur in en zie je direct welke slaapzak en kleding veilig zijn. Op de TOG Calculator werk je andersom: je vult in wat je baby aanheeft en checkt of die combinatie past bij de temperatuur.'
      }
    ],
    tog: [
      {
        id: 3,
        question: 'Welke TOG-waarde heeft mijn baby nodig?',
        answer: 'Dat hangt af van de kamertemperatuur: rond 0.5 TOG bij 24 graden of warmer, 1.0 TOG bij 20 tot 24 graden, 2.5 TOG bij 16 tot 20 graden en 3.5 TOG onder de 16 graden. Tel slaapzak en kleding altijd bij elkaar op.'
      },
      {
        id: 4,
        question: 'Hoeveel slaapzakken heb ik nodig?',
        answer: 'De meeste ouders redden zich met twee: een 1.0 TOG voor lente en herfst en een 2.5 TOG voor de winter. Voor hete zomernachten volstaat een 0.5 TOG of alleen een romper.'
      },
      {
        id: 5,
        question: 'Mag mijn baby onder een losse deken slapen?',
        answer: 'Onder de 12 maanden wordt een losse deken afgeraden vanwege het risico op bedekking van het gezicht. Gebruik een slaapzak, of stop een dekentje stevig in volgens de "feet to foot" methode. Vouw een deken nooit dubbel: dat verdubbelt de TOG-waarde.'
      }
    ],
    medical: [
      {
        id: 6,
        question: 'Hoe herken ik oververhitting?',
        answer: 'Signalen zijn een klam of bezweet nekje, rood gezicht, snelle ademhaling en onrust. Te warm slapen is een risicofactor voor wiegendood. Verwijder bij twijfel een laagje en check de kamertemperatuur (ideaal 16 tot 20 graden).'
      },
      {
        id: 7,
        question: 'Wanneer moet ik contact opnemen met een arts?',
        answer: 'Bel direct 112 als je baby slap of niet aanspreekbaar is, blauw verkleurt of ademproblemen heeft. Neem bij aanhoudende onrust, koorts of twijfel contact op met het consultatiebureau of je huisarts.'
      }
    ],
    practical: [
      {
        id: 8,
        question: 'Hoe controleer ik of mijn baby het te warm of te koud heeft?',
        answer: 'Voel met je vingers in het nekje of aan de rug: lauwwarm en droog is goed. Klam of zweterig betekent te warm (laagje uit), koel betekent mogelijk te koud (laagje erbij). Koele handjes zijn normaal.'
      },
      {
        id: 9,
        question: 'Wat trek ik mijn baby aan onder de slaapzak?',
        answer: 'Bij 16 tot 20 graden meestal een romper met eventueel een pyjama, bij 20 tot 24 graden alleen een romper, en boven de 24 graden vaak alleen een luier. Gebruik onze calculator op de homepage voor advies per graad.'
      }
    ]
  }

  const currentFAQs = faqs[selectedCategory] || []

  // Generate FAQ structured data for all categories
  const allFAQs = Object.values(faqs).flat()
  const faqSchemaData = allFAQs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }))

  return (
    <>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqSchemaData))
        }}
      />
      
    <Layout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Info className="w-6 h-6 mr-3 text-primary" />
            Veelgestelde Vragen
          </h1>
          <p className="text-gray-600">
            Vind snel antwoorden op de meest gestelde vragen over TOG-waardes, slaapzakken en onze calculators.
          </p>
        </div>


        {/* Categories */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4">Categorieën</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedCategory === category.id
                      ? 'bg-gradient-active border-primary text-primary'
                      : 'bg-white border-gray-200 hover:border-primary text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-2" />
                  <div className="font-medium">{category.name}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4">
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          <div className="space-y-4">
            {currentFAQs.map((faq) => (
              <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left hover:bg-default transition-colors flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {openFAQ === faq.id ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-4 pb-4 text-gray-600 border-t border-gray-100 bg-default/50">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary rounded-2xl p-6 text-white">
          <h2 className="font-medium mb-2">Vraag niet gevonden?</h2>
          <p className="text-gray-100 mb-4">
            Neem contact met ons op voor persoonlijke ondersteuning bij uw vragen over TOG-waardes en veilig slapen.
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-primary hover:bg-default font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Contact opnemen
          </button>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 mb-1">Medische Disclaimer</h3>
              <p className="text-sm text-amber-700">
                De informatie op deze pagina is alleen voor informatieve doeleinden en vervangt geen professioneel medisch advies. 
                Raadpleeg altijd uw kinderarts of een gekwalificeerde zorgverlener voor specifieke medische vragen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
    </>
  )
}