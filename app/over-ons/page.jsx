'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { Users, Star, Calculator, BookOpen } from 'lucide-react'

export default function OverOnsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

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
            Leer meer over onze missie en waarom je onze TOG-adviezen kunt vertrouwen.
          </p>
        </div>

      <div className="space-y-6">

        {/* Why Trust Us */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-primary" />
            Waarom TOGWaarde.nl vertrouwen?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-700 font-medium">✓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Evidence-Based</h3>
                  <p className="text-sm text-gray-600">Gebaseerd op richtlijnen voor veilig slapen van VeiligheidNL, het NCJ, de NHS en The Lullaby Trust.</p>
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
              <h3 className="font-medium text-primary mb-2">TOG per Kamertemperatuur</h3>
              <p className="text-sm text-gray-700">
                Onze adviezen volgen de internationale TOG-richtbanden per kamertemperatuur
                (NHS en The Lullaby Trust): van 0.5 TOG bij warme zomernachten tot 3.5 TOG
                bij koude kamers, met 16 tot 20 graden als ideale slaaptemperatuur.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-medium text-green-800 mb-2">Alles Telt Mee</h3>
              <p className="text-sm text-green-700">
                We tellen slaapzak, kleding en eventuele dekens bij elkaar op tot een totale
                TOG-waarde en bewaken daarbij de veiligheidsgrens van 4.0 TOG, omdat te warm
                slapen gevaarlijker is dan iets te koud.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4">
              <h3 className="font-medium text-amber-800 mb-2">Individuele Variatie</h3>
              <p className="text-sm text-amber-700">
                Elke baby is uniek. Onze calculator geeft een richtlijn; voel daarnaast
                regelmatig in het nekje van je baby (lauwwarm en droog is goed) en neem bij
                twijfel contact op met het consultatiebureau of je huisarts.
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
              <span><strong>VeiligheidNL</strong> - Richtlijnen voor veilig slapen en preventie van wiegendood</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Nederlands Centrum Jeugdgezondheid (NCJ)</strong> - JGZ-richtlijnen veilig slapen</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>NHS (UK)</strong> - Temperatuur- en TOG-richtlijnen voor babyslaap</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>The Lullaby Trust</strong> - Onderzoek naar SIDS-preventie en slaaptemperatuur</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>EN 16781</strong> - Europese veiligheidsnorm voor babyslaapzakken</span>
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
