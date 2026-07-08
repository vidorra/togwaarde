'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { faqCategories } from './faq-data'
import { Info, Calculator, Baby, AlertCircle, Thermometer, ChevronDown, ChevronUp } from 'lucide-react'


export default function FaqClient() {
  const [selectedCategory, setSelectedCategory] = useState('calculator')
  const [openFAQ, setOpenFAQ] = useState(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const categories = [
    { id: 'calculator', name: 'Calculator gebruik', icon: Calculator },
    { id: 'tog', name: 'TOG & slaapzakken', icon: Baby },
    { id: 'temperatuur', name: 'Temperatuur in de praktijk', icon: Thermometer },
    { id: 'medical', name: 'Veiligheid', icon: AlertCircle },
    { id: 'practical', name: 'Praktische tips', icon: Info }
  ]

  const faqs = faqCategories

  const currentFAQs = faqs[selectedCategory] || []

  return (
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
            Neem contact met ons op voor persoonlijke ondersteuning bij je vragen over TOG-waardes en veilig slapen.
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
                Raadpleeg altijd je kinderarts of een gekwalificeerde zorgverlener voor specifieke medische vragen.
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
  )
}
