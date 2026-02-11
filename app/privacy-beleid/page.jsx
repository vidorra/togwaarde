import Layout from '../../components/Layout'
import Link from 'next/link'
import { Shield, ArrowRight, Home, Eye, Cookie, Mail, Lock } from 'lucide-react'

export const metadata = {
  title: 'Privacy Beleid | FlesvoedingCalculator.nl',
  description: 'Privacybeleid van FlesvoedingCalculator.nl - Hoe wij omgaan met uw persoonlijke gegevens volgens de AVG.',
}

export default function PrivacyBeleidPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-primary">Privacy Beleid</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-primary" />
            Privacy Beleid
          </h1>
          <p className="text-gray-600">
            Laatst bijgewerkt: 16 augustus 2025
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <p className="text-gray-700 leading-relaxed">
            Bij FlesvoedingCalculator.nl respecteren wij uw privacy en zijn wij transparant over hoe wij omgaan met uw persoonlijke gegevens. 
            Dit privacybeleid legt uit welke gegevens wij verzamelen, hoe wij deze gebruiken en welke rechten u heeft volgens de 
            Algemene Verordening Gegevensbescherming (AVG).
          </p>
        </div>

        {/* Gegevens die wij verzamelen */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-primary" />
            Welke gegevens verzamelen wij?
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Gegevens die u vrijwillig verstrekt:</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Baby's gewicht en leeftijd (alleen voor calculatie, niet opgeslagen)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>E-mailadres bij het sturen van contactberichten</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Naam en bericht inhoud bij contact formulier</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Automatisch verzamelde gegevens:</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>IP-adres (geanonimiseerd voor analytics)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Browser type en versie</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Bezochte pagina's en tijdstip van bezoek</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Apparaat informatie (desktop/mobiel)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hoe wij gegevens gebruiken */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Hoe gebruiken wij uw gegevens?
          </h2>
          
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium text-gray-800 mb-1">Voor de calculator functie:</h3>
              <p className="text-sm text-gray-600">
                Gewicht en leeftijd worden alleen gebruikt voor de berekening en <strong>niet opgeslagen</strong> op onze servers.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">Voor website verbetering:</h3>
              <p className="text-sm text-gray-600">
                Geanonimiseerde gebruiksstatistieken helpen ons de website te verbeteren en populaire content te identificeren.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">Voor klantenservice:</h3>
              <p className="text-sm text-gray-600">
                Contact gegevens worden alleen gebruikt om uw vragen te beantwoorden.
              </p>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Cookie className="w-5 h-5 mr-2 text-primary" />
            Cookies en tracking
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Essentiële cookies:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Voorkeursinstellingen onthouden</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Sessie informatie bewaren</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Beveiliging waarborgen</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Analytische cookies:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Google Analytics (geanonimiseerd)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Microsoft Clarity voor gebruikersgedrag</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Gebruiksstatistieken verzamelen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Website prestaties monitoren</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Microsoft Clarity */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Microsoft Clarity
          </h2>
          
          <p className="text-gray-700 mb-4">
            Wij gebruiken Microsoft Clarity om inzicht te krijgen in hoe bezoekers onze website gebruiken. 
            Clarity verzamelt informatie over gebruikersgedrag zoals klikken, scrollen en muis bewegingen 
            om ons te helpen de website te verbeteren.
          </p>
          
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Wat verzamelt Clarity?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Algemene gebruikspatronen en navigatie</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Klik- en scroll gedrag (geanonimiseerd)</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Technische informatie over uw browser en apparaat</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Prestatie gegevens van de website</span>
                </li>
            </ul>
            <p className="text-xs text-blue-700 mt-3">
              Voor meer informatie zie het <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="underline">Microsoft Privacy Statement</a>.
            </p>
          </div>
        </div>

        {/* Gegevens delen */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Delen wij uw gegevens?
          </h2>
          
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-green-800 mb-3 font-medium">Wij verkopen of verhuren NOOIT uw persoonlijke gegevens aan derden.</p>
            <p className="text-sm text-green-700">
              Uw gegevens kunnen alleen worden gedeeld in de volgende situaties:
            </p>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Met uw expliciete toestemming</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Bij wettelijke verplichting</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Voor technische dienstverlening (zoals hosting)</span>
                </li>
            </ul>
          </div>
        </div>

        {/* Uw rechten */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary" />
            Uw rechten (AVG)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">U heeft het recht op:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span><strong>Inzage</strong> - Welke gegevens hebben wij van u?</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span><strong>Rectificatie</strong> - Onjuiste gegevens corrigeren</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span><strong>Verwijdering</strong> - Uw gegevens laten wissen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span><strong>Beperking</strong> - Gebruik van gegevens beperken</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span><strong>Overdraagbaarheid</strong> - Gegevens overdragen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span><strong>Bezwaar</strong> - Tegen verwerking bezwaar maken</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Hoe uw rechten uitoefenen:</h3>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-800 mb-2">Stuur een e-mail naar:</p>
                <p className="font-medium text-blue-900">privacy@flesvoedingcalculator.nl</p>
                <p className="text-xs text-blue-700 mt-2">
                  Wij reageren binnen 30 dagen op uw verzoek.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Beveiliging */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Hoe beveiligen wij uw gegevens?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">SSL Versleuteling</h3>
              <p className="text-xs text-gray-600">HTTPS verbinding voor alle data</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">Beveiligde Servers</h3>
              <p className="text-xs text-gray-600">EU-gehoste, beveiligde datacenters</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-gray-800 mb-1">Minimale Data</h3>
              <p className="text-xs text-gray-600">Alleen noodzakelijke gegevens</p>
            </div>
          </div>
        </div>

        {/* Bewaarperiode */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Hoe lang bewaren wij uw gegevens?
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Calculator gegevens:</span>
              <span className="font-medium text-gray-800">Niet opgeslagen</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Contact berichten:</span>
              <span className="font-medium text-gray-800">3 jaar</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Analytics (geanonimiseerd):</span>
              <span className="font-medium text-gray-800">2 jaar</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Technische logs:</span>
              <span className="font-medium text-gray-800">6 maanden</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-primary-gradient rounded-2xl p-6 text-white">
          <h2 className="font-medium text-lg mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Vragen over privacy?
          </h2>
          <p className="text-white/90 mb-4">
            Heeft u vragen over dit privacybeleid of over hoe wij omgaan met uw gegevens? 
            Neem dan contact met ons op.
          </p>
          <Link 
            href="/contact"
            className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Contact opnemen
          </Link>
        </div>
      </div>
    </Layout>
  )
}