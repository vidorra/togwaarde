'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { Users, Heart, Star, Calculator, BookOpen } from 'lucide-react'

export default function OverOnsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  
  const team = [
    {
      name: 'Medisch Expert',
      role: 'Kinderarts & Voedingsspecialist',
      bio: 'Ons medisch team heeft uitgebreide ervaring in de kindergeneeskunde en specialiseert zich in voeding voor zuigelingen.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Voedingsspecialist',
      role: 'Verloskundige & Lactatie Expert',
      bio: 'Onze voedingsexperts begeleiden ouders bij voedingsvragen en hebben uitgebreide kennis van zowel borst- als flesvoeding.',
      avatar: '👩‍💼'
    },
    {
      name: 'Ontwikkelingsteam',
      role: 'Ontwikkelaars & Ouders',
      bio: 'Ons team ontwikkelde deze tool vanuit eigen ervaring als ouders en passie voor het helpen van andere ouders.',
      avatar: '👨‍💻'
    }
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
            Over TOGWaarde.nl
          </h1>
          <p className="text-lg text-gray-600">
            Leer meer over ons team, onze missie en waarom je onze TOG calculator kunt vertrouwen.
          </p>
        </div>

      <div className="space-y-6">


        {/* Why Trust Us */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-primary" />
            Waarom FlesvoedingCalculator.nl vertrouwen?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-medium">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Evidence-Based</h3>
                  <p className="text-sm text-gray-600">Gebaseerd op officiële Nederlandse richtlijnen van het Voedingscentrum en het Nederlands Centrum Jeugdgezondheid.</p>
                </div>
              </div>
              
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-medium">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Regelmatig Geüpdatet</h3>
                  <p className="text-sm text-gray-600">Onze informatie wordt regelmatig gecontroleerd en bijgewerkt volgens de laatste inzichten.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Privacy Gewaarborgd</h3>
                  <p className="text-sm text-gray-600">We bewaren geen persoonlijke gegevens en respecteren volledig uw privacy.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Gratis Toegankelijk</h3>
                  <p className="text-sm text-gray-600">Alle informatie en tools zijn gratis beschikbaar voor alle ouders in Nederland.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-600 font-medium">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Gebruiksvriendelijk</h3>
                  <p className="text-sm text-gray-600">Ontwikkeld met ouders, voor ouders. Simpel en duidelijk in gebruik.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Method */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary" />
            Onze Methode
          </h2>
          
          <div className="space-y-4">
            <div className="bg-default rounded-xl p-4">
              <h3 className="font-medium text-primary mb-2">Nederlandse Richtlijnen</h3>
              <p className="text-sm text-gray-700">
                Onze calculator gebruikt de officiële Nederlandse norm van 150ml flesvoeding per kg lichaamsgewicht per dag, 
                aangepast voor leeftijd volgens de richtlijnen van het Voedingscentrum.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-medium text-green-800 mb-2">Leeftijdsaanpassingen</h3>
              <p className="text-sm text-green-700">
                De berekening wordt automatisch aangepast op basis van de leeftijd van uw baby, omdat voedingsbehoeften 
                veranderen naarmate baby&apos;s groeien en ontwikkelen.
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4">
              <h3 className="font-medium text-amber-800 mb-2">Individuele Variatie</h3>
              <p className="text-sm text-amber-700">
                We benadrukken altijd dat elke baby uniek is. Onze calculator geeft een richtlijn, maar het is belangrijk 
                om ook naar de signalen van uw baby te luisteren en contact op te nemen met uw zorgverlener bij vragen.
              </p>
            </div>
          </div>
        </div>


        {/* Sources */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary" />
            Bronnen & Expertise
          </h2>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Voedingscentrum Nederland</strong> - Officiële voedingsrichtlijnen voor zuigelingen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Nederlands Centrum Jeugdgezondheid (NCJ)</strong> - Groei- en ontwikkelingsrichtlijnen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Nederlandse Vereniging voor Kindergeneeskunde</strong> - Medische standaarden</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Koninklijke Nederlandse Organisatie van Verloskundigen (KNOV)</strong> - Voedingsadvies</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Wetenschappelijke literatuur</strong> - Peer-reviewed onderzoek naar zuigelingenvoeding</span>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary rounded-2xl p-6 text-white">
          <h2 className="font-medium mb-2">Vragen of feedback?</h2>
          <p className="text-gray-100 mb-4">
            We horen graag van je! Neem contact met ons op voor vragen, suggesties of als je meer wilt weten over onze aanpak.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-primary hover:bg-default font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Contact opnemen
            </button>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gray-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Feedback versturen
            </button>
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