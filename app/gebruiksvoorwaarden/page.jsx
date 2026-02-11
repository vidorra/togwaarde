import Layout from '../../components/Layout'
import Link from 'next/link'
import { FileText, ArrowRight, Home, AlertTriangle, Scale, Shield, Info } from 'lucide-react'

export const metadata = {
  title: 'Gebruiksvoorwaarden | FlesvoedingCalculator.nl',
  description: 'Gebruiksvoorwaarden van FlesvoedingCalculator.nl - Voorwaarden voor het gebruik van onze flesvoeding calculator en informatie.',
}

export default function GebruiksvoorwaardenPage() {
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
          <span className="text-primary">Gebruiksvoorwaarden</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-primary" />
            Gebruiksvoorwaarden
          </h1>
          <p className="text-gray-600">
            Laatst bijgewerkt: 16 augustus 2025
          </p>
        </div>

        {/* Belangrijke disclaimer */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h2 className="text-lg font-medium text-amber-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Belangrijke medische disclaimer
          </h2>
          <div className="space-y-3 text-amber-800">
            <p className="font-medium">
              FlesvoedingCalculator.nl is een informatieve website en vervangt GEEN medisch advies.
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Raadpleeg altijd uw kinderarts of consultatiebureau voor persoonlijk advies</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>De calculator geeft richtlijnen, maar elk kind is uniek</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Bij twijfel over de voeding van uw baby, zoek professionele hulp</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Wij zijn niet aansprakelijk voor gevolgen van het gebruik van onze informatie</span>
                </li>
            </ul>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <p className="text-gray-700 leading-relaxed">
            Door gebruik te maken van FlesvoedingCalculator.nl stemt u in met deze gebruiksvoorwaarden. 
            Deze voorwaarden zijn van toepassing op alle diensten en informatie die wij aanbieden via onze website.
          </p>
        </div>

        {/* Diensten */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Onze diensten
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Wat wij aanbieden:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Gratis flesvoeding calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Educatieve informatie over flesvoeding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Voedingsschema's per leeftijd</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Kennisbank met praktische tips</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Veelgestelde vragen en antwoorden</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Bronnen van informatie:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Nederlandse Voedingscentrum richtlijnen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>NCJ (Nederlandse Centrum Jeugdgezondheid)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Nederlandse Vereniging voor Kindergeneeskunde</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>EU verordening 2016/127 voor zuigelingenvoeding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Gebruik van de website */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Scale className="w-5 h-5 mr-2 text-primary" />
            Gebruik van de website
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Toegestaan gebruik:</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Persoonlijk, niet-commercieel gebruik</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Informatieve doeleinden voor flesvoeding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Delen van links naar onze website</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Gebruik van de calculator voor uw eigen baby</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Niet toegestaan:</h3>
              <ul className="space-y-1 text-sm text-gray-600 ml-4">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Commercieel gebruik zonder toestemming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Kopiëren van onze content zonder bronvermelding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Misbruik van de website of diensten</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Inbreuk maken op rechten van anderen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Spam of ongewenste berichten verzenden</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Intellectueel eigendom */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Intellectueel eigendom
          </h2>
          
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-medium text-gray-800 mb-1">Onze content:</h3>
              <p className="text-sm text-gray-600">
                Alle teksten, afbeeldingen, logo's en calculator functionaliteit zijn eigendom van FlesvoedingCalculator.nl 
                of gebruikt met toestemming van derden.
              </p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-gray-800 mb-1">Gebruik toegestaan mits:</h3>
              <p className="text-sm text-gray-600">
                U mag onze content citeren of delen mits u een duidelijke bronvermelding toevoegt en linkt naar onze website.
              </p>
            </div>
          </div>
        </div>

        {/* Betrouwbaarheid informatie */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-primary" />
            Betrouwbaarheid van informatie
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-medium text-blue-800 mb-2">Wat wij garanderen:</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Informatie gebaseerd op officiële Nederlandse richtlijnen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Regelmatige updates van content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Zorgvuldige controle van medische informatie</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Verwijzing naar betrouwbare bronnen</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h3 className="font-medium text-amber-800 mb-2">Belangrijk om te weten:</h3>
              <ul className="space-y-1 text-sm text-amber-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Informatie kan veranderen door nieuwe inzichten</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Elk kind is uniek en kan afwijken van gemiddelden</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Bij twijfel altijd professionele hulp zoeken</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Wij zijn geen vervanging voor medisch advies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Aansprakelijkheid */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Beperking van aansprakelijkheid
          </h2>
          
          <div className="space-y-3">
            <p className="text-gray-700">
              FlesvoedingCalculator.nl streeft naar juiste en actuele informatie, maar kan niet garanderen dat alle informatie 
              volledig, juist of geschikt is voor uw specifieke situatie.
            </p>
            
            <div className="bg-primary/10 rounded-xl p-4 border border-red-200">
              <h3 className="font-medium text-red-800 mb-2">Wij zijn niet aansprakelijk voor:</h3>
              <ul className="space-y-1 text-sm text-primary">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Directe of indirecte schade door gebruik van onze website</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Gevolgen van het volgen van onze adviezen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Problemen door onjuiste invoer in de calculator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Technische problemen of tijdelijke uitval</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Content van externe websites waarnaar wij linken</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Privacy en gegevens
          </h2>
          
          <p className="text-gray-700 mb-4">
            Het gebruik van onze website is onderworpen aan ons privacybeleid. 
            Door onze website te gebruiken, stemt u in met de verwerking van uw gegevens zoals beschreven in het privacybeleid.
          </p>
          
          <Link 
            href="/privacy-beleid"
            className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Lees ons privacybeleid
          </Link>
        </div>

        {/* Wijzigingen */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Wijzigingen in voorwaarden
          </h2>
          
          <div className="space-y-3">
            <p className="text-gray-700">
              Wij behouden ons het recht voor om deze gebruiksvoorwaarden te wijzigen. 
              Wijzigingen worden aangekondigd op deze pagina met een nieuwe datum.
            </p>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Bookmark deze pagina en controleer regelmatig op updates. 
                Door verder gebruik te maken van onze website na wijzigingen, accepteert u de nieuwe voorwaarden.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-primary-gradient rounded-2xl p-6 text-white">
          <h2 className="font-medium text-lg mb-4">
            Vragen over deze voorwaarden?
          </h2>
          <p className="text-white/90 mb-4">
            Heeft u vragen over deze gebruiksvoorwaarden of over het gebruik van onze website? 
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