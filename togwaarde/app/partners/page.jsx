import Layout from '../../components/Layout'
import Link from 'next/link'
import { Users, ArrowRight, Home, ExternalLink, Shield, Award } from 'lucide-react'

export const metadata = {
  title: 'Partners & Merken | FlesvoedingCalculator.nl',
  description: 'Informatie over betrouwbare flesvoeding merken en onze bronnen voor medische informatie.',
}

export default function PartnersPage() {
  const brands = [
    {
      name: 'Nutrilon',
      description: 'Nederlandse marktleider in zuigelingenvoeding',
      features: ['Uitgebreid assortiment', 'Nederlandse ontwikkeling', 'Breed verkrijgbaar'],
      website: 'https://www.nutrilon.nl'
    },
    {
      name: 'Hero Baby',
      description: 'Swiss kwaliteit met goede prijs-kwaliteit verhouding',
      features: ['Internationale kwaliteit', 'Betaalbaar', 'Breed assortiment'],
      website: 'https://www.herobaby.nl'
    },
    {
      name: 'Kruidvat Zuigelingenmelk',
      description: 'Budget optie die voldoet aan EU-standaarden',
      features: ['Beste prijs-kwaliteit', 'EU-gecertificeerd', 'Goed verkrijgbaar'],
      website: 'https://www.kruidvat.nl'
    },
    {
      name: 'HIPP Bio',
      description: '100% biologische zuigelingenvoeding',
      features: ['Biologisch gecertificeerd', 'Europese kwaliteit', 'Duurzaam'],
      website: 'https://www.hipp.nl'
    }
  ]

  const sources = [
    {
      name: 'Voedingscentrum',
      description: 'Nederlandse autoriteit op het gebied van voeding en gezondheid',
      role: 'Officiële voedingsrichtlijnen en standaarden',
      website: 'https://www.voedingscentrum.nl'
    },
    {
      name: 'NCJ',
      description: 'Nederlands Centrum Jeugdgezondheid',
      role: 'Richtlijnen voor jeugdgezondheid en consultatiebureau',
      website: 'https://www.ncj.nl'
    },
    {
      name: 'NVK',
      description: 'Nederlandse Vereniging voor Kindergeneeskunde',
      role: 'Medische standaarden en behandelrichtlijnen',
      website: 'https://www.nvk.nl'
    },
    {
      name: 'KNOV',
      description: 'Koninklijke Nederlandse Organisatie van Verloskundigen',
      role: 'Expertise op het gebied van zwangerschap en bevalling',
      website: 'https://www.knov.nl'
    }
  ]

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
          <span className="text-primary">Partners & Merken</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Partners & Merken
          </h1>
          <p className="text-gray-600">
            Informatie over betrouwbare flesvoeding merken en onze bronnen voor medische informatie.
          </p>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h2 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Onafhankelijke informatie
          </h2>
          <p className="text-blue-800">
            FlesvoedingCalculator.nl is volledig onafhankelijk. Wij hebben geen commerciële banden met 
            flesvoeding merken en ontvangen geen betalingen voor het vermelden van producten. 
            Alle informatie is gebaseerd op Nederlandse zorgstandaarden en EU-regelgeving.
          </p>
        </div>

        {/* Trusted Brands */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary" />
            Betrouwbare Merken in Nederland
          </h2>
          
          <div className="mb-4 text-sm text-gray-600">
            Alle onderstaande merken voldoen aan EU-verordening 2016/127 en zijn veilig voor uw baby.
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{brand.name}</h3>
                  <a 
                    href={brand.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
                
                <div className="space-y-1">
                  {brand.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-xs text-gray-500">
                      • {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">
              <strong>Belangrijk:</strong> De keuze voor een merk is persoonlijk. Alle Nederlandse merken 
              zijn even veilig en voedzaam. Kies op basis van beschikbaarheid, prijs en voorkeuren van uw baby.
            </p>
          </div>
        </div>

        {/* Official Sources */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Onze Bronnen & Autoriteiten
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {sources.map((source, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{source.name}</h3>
                  <a 
                    href={source.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                <p className="text-xs text-gray-500">{source.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EU Regulation */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <h2 className="text-lg font-medium text-green-800 mb-4">
            EU-Verordening 2016/127
          </h2>
          
          <div className="space-y-3 text-green-800">
            <p>
              Alle flesvoeding in Nederland valt onder strikte Europese regelgeving die zorgt voor:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-1 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Verplichte voedingsstoffen (zoals DHA)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Maximum gehalten voor bepaalde stoffen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Kwaliteitscontroles en certificering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Strikte labeling voorschriften</span>
                </li>
              </ul>
              
              <ul className="space-y-1 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Veiligheidsstandaarden productie</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Traceerbaarheid van ingrediënten</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Regelmatige inspecties NVWA</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Verbod op misleidende claims</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* No Partnerships */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Waarom geen commerciële partnerships?
          </h2>
          
          <div className="space-y-3 text-gray-700">
            <p>
              FlesvoedingCalculator.nl houdt bewust afstand van commerciële partnerships om:
            </p>
            
            <ul className="space-y-2 text-sm ml-4">
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Onafhankelijke en objectieve informatie te garanderen</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Geen voorkeur te tonen voor bepaalde merken</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Te focussen op wat het beste is voor ouders en baby's</span>
                </li>
              <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Transparantie te behouden over onze bronnen</span>
                </li>
            </ul>
            
            <p className="text-sm">
              Onze informatie is gebaseerd op wetenschappelijk onderzoek en officiële richtlijnen, 
              niet op commerciële belangen.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-primary-gradient rounded-2xl p-6 text-white">
          <h2 className="font-medium text-lg mb-4">
            Vragen over merken of bronnen?
          </h2>
          <p className="text-white/90 mb-4">
            Heeft u vragen over specifieke merken of onze bronnen? 
            Neem gerust contact met ons op.
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