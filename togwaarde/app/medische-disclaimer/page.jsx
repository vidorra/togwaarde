'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { AlertTriangle, Shield, UserCheck, Phone, Clock, AlertCircle } from 'lucide-react'

export default function MedischeDisclaimerPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  
  const warnings = [
    {
      icon: AlertTriangle,
      title: 'Geen Vervanging voor Medisch Advies',
      content: 'De informatie op deze website is bedoeld als algemene educatieve informatie en vervangt geen professioneel medisch advies, diagnose of behandeling.',
      color: 'amber'
    },
    {
      icon: UserCheck,
      title: 'Raadpleeg Uw Zorgverlener',
      content: 'Neem altijd contact op met uw kinderarts, consultatiebureau of andere gekwalificeerde zorgverlener voor specifiek medisch advies over uw baby.',
      color: 'blue'
    },
    {
      icon: Clock,
      title: 'Bij Spoedeisende Situaties',
      content: 'Bij acute zorgen over de gezondheid van uw baby, neem onmiddellijk contact op met uw huisarts, kinderarts of bel 112.',
      color: 'amber'
    }
  ]

  const limitations = [
    'Deze calculator geeft een algemene richtlijn gebaseerd op Nederlandse standaarden',
    'Individuele behoeften van uw baby kunnen afwijken van de berekende waarden',
    'Factoren zoals groeisnelheid, activiteitsniveau en gezondheid kunnen de voedingsbehoefte beïnvloeden',
    'De calculator houdt geen rekening met medische aandoeningen of speciale voedingsbehoeften',
    'Prematuur geboren baby\'s hebben mogelijk aangepaste voedingsrichtlijnen nodig'
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-primary" />
            Medische Disclaimer
          </h1>
          <p className="text-gray-600">
            Belangrijke informatie over het gebruik van deze website en calculator voor flesvoeding.
          </p>
        </div>

        {/* Main Disclaimer */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-medium text-amber-800 mb-3">Belangrijke Medische Disclaimer</h2>
              <p className="text-amber-700 leading-relaxed mb-4">
                <strong>Deze website en calculator zijn uitsluitend bedoeld voor educatieve en informatieve doeleinden.</strong> 
                De informatie die wordt verstrekt, is gebaseerd op algemene Nederlandse richtlijnen en vervangt onder geen 
                enkele omstandigheid professioneel medisch advies, diagnose of behandeling door een gekwalificeerde zorgverlener.
              </p>
              <p className="text-amber-700 leading-relaxed">
                Elke baby is uniek en kan verschillende voedingsbehoeften hebben. Raadpleeg altijd uw kinderarts, 
                consultatiebureau of andere bevoegde zorgverlener voor specifiek advies over de voeding en 
                gezondheid van uw baby.
              </p>
            </div>
          </div>
        </div>

        {/* Warning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warnings.map((warning, index) => (
            <div key={index} className={`bg-${warning.color}-50 rounded-2xl border border-${warning.color}-200 p-6`}>
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-${warning.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <warning.icon className={`w-5 h-5 text-${warning.color}-600`} />
                </div>
                <div>
                  <h3 className={`font-medium text-${warning.color}-800 mb-2`}>{warning.title}</h3>
                  <p className={`text-sm text-${warning.color}-700 leading-relaxed`}>{warning.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Limitations */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4">Beperkingen van de Calculator</h2>
          <div className="space-y-3">
            {limitations.map((limitation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">•</span>
                <span className="text-sm text-gray-600">{limitation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Guidance */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h2 className="font-medium text-blue-800 mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-blue-600" />
            Wanneer Professionele Hulp Zoeken
          </h2>
          <div className="space-y-3 text-sm text-blue-700">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Bij vragen over de groei en ontwikkeling van uw baby</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Wanneer uw baby consistent weigert te drinken of minder drinkt dan normaal</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Bij zorgen over gewichtstoename of gewichtsverlies</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Wanneer uw baby symptomen van ziekte vertoont</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Bij twijfels over de juiste voedingshoeveelheid of -frequentie</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Voor baby's met speciale medische behoeften of prematuur geboren baby's</span>
            </div>
          </div>
        </div>

        {/* Sources and Reliability */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <h2 className="font-medium text-green-800 mb-4">Betrouwbaarheid van Informatie</h2>
          <p className="text-sm text-green-700 leading-relaxed mb-4">
            Onze informatie is gebaseerd op officiële Nederlandse richtlijnen van erkende instanties zoals 
            het Voedingscentrum, het Nederlands Centrum Jeugdgezondheid (NCJ), en de Nederlandse Vereniging 
            voor Kindergeneeskunde (NVK). We streven ernaar om actuele en accurate informatie te verstrekken, 
            maar kunnen geen garanties geven over de volledigheid of geschiktheid voor individuele situaties.
          </p>
          <p className="text-sm text-green-700 leading-relaxed">
            De wetenschappelijke kennis over zuigelingenvoeding evolueert voortdurend. We raden aan om 
            regelmatig contact te houden met uw zorgverlener voor de meest actuele informatie en persoonlijk advies.
          </p>
        </div>

        {/* Legal Notice */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <h2 className="font-medium text-gray-800 mb-4">Aansprakelijkheid</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            De eigenaren en beheerders van deze website aanvaarden geen aansprakelijkheid voor eventuele 
            schade of gezondheidsrisico's die voortvloeien uit het gebruik van de informatie of calculator 
            op deze website. Het gebruik van deze website is geheel voor eigen risico. 
            Bij twijfel of zorgen, raadpleeg altijd een gekwalificeerde zorgverlener.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="bg-primary rounded-2xl p-6 text-white">
          <h2 className="font-medium mb-2">Vragen over deze disclaimer?</h2>
          <p className="text-gray-100 mb-4">
            Heeft u vragen over deze medische disclaimer of over het gebruik van onze website? 
            Neem gerust contact met ons op.
          </p>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-primary hover:bg-default font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Contact opnemen
          </button>
        </div>

        {/* Medical Disclaimer - FAQ Style */}
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
  )
}