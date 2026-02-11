import Layout from '../../components/Layout'
import Link from 'next/link'
import { Calculator, AlertCircle, Baby, Scale, Clock, Zap, BookOpen, ChevronRight, Shield } from 'lucide-react'

export const metadata = {
  title: 'Hoe Werkt de Flesvoeding Calculator? | Complete Uitleg 2025',
  description: 'Ontdek hoe onze flesvoeding calculator werkt. Uitleg over berekeningen, premature baby\'s, schepje-water ratio\'s en wetenschappelijke basis achter de aanbevelingen.',
}

export default function UitlegCalculatorPage() {
  const calculationSteps = [
    {
      step: 1,
      title: 'Gewicht Invoer',
      description: 'Voer het actuele gewicht van uw baby in (in grammen of kg)',
      details: 'De calculator accepteert gewichten van 500g tot 15kg voor optimale nauwkeurigheid'
    },
    {
      step: 2,
      title: 'Leeftijd Bepaling',
      description: 'Selecteer de leeftijd van uw baby voor gepaste aanpassingen',
      details: 'Verschillende leeftijdsgroepen hebben andere voedingsbehoeften en maagcapaciteit'
    },
    {
      step: 3,
      title: 'Basis Berekening',
      description: 'Leeftijdsspecifieke toepassing van ml per kg lichaamsgewicht per dag',
      details: 'Variërend van 75ml/kg (0-2 weken) tot 150ml/kg (1+ maanden) voor medische veiligheid'
    },
    {
      step: 4,
      title: 'Leeftijd Correctie',
      description: 'Automatische aanpassing voor verschillende leeftijdsgroepen',
      details: 'Speciale nadruk op veiligheid voor pasgeborenen (0-2 weken)'
    },
    {
      step: 5,
      title: 'Verdeling Berekening',
      description: 'Verdeling over aanbevolen aantal voedingen per dag',
      details: 'Rekening houdend met maagcapaciteit en verteringstijd'
    }
  ]

  const ageAdjustments = [
    {
      age: '0-2 weken',
      multiplier: '75ml/kg',
      frequency: '8-12x per dag',
      reason: 'Zeer voorzichtig voor pasgeborenen, kleine maag'
    },
    {
      age: '2-4 weken',
      multiplier: '115ml/kg',
      frequency: '7-10x per dag',
      reason: 'Opbouwperiode naar volledige voeding'
    },
    {
      age: '1-2 maanden', 
      multiplier: '150ml/kg',
      frequency: '6-8x per dag',
      reason: 'Stabiele groeiperiode'
    },
    {
      age: '2-3 maanden',
      multiplier: '140ml/kg',
      frequency: '5-7x per dag',
      reason: 'Efficiëntere vertering, minder frequent'
    },
    {
      age: '3-4 maanden',
      multiplier: '130ml/kg',
      frequency: '5-6x per dag',
      reason: 'Voorbereiding op vaste voeding introductie'
    },
    {
      age: '4-5 maanden',
      multiplier: '120ml/kg',
      frequency: '4-6x per dag',
      reason: 'Groeivertraging, voorbereid op bijvoeding'
    },
    {
      age: '5-6 maanden',
      multiplier: '110ml/kg',
      frequency: '4-5x per dag',
      reason: 'Begin van bijvoeding introductie'
    },
    {
      age: '6+ maanden',
      multiplier: '100ml/kg',
      frequency: '3-4x per dag',
      reason: 'Bijvoeding wordt hoofdvoeding'
    }
  ]

  const prematureCalculation = [
    {
      factor: 'Gecorrigeerde Leeftijd',
      calculation: 'Chronologische leeftijd - (40 weken - zwangerschapsduur)',
      example: 'Baby van 12 weken, geboren op 32 weken = 12 - (40-32) = 4 weken gecorrigeerd'
    },
    {
      factor: 'Aangepaste Formule',
      calculation: '160-180ml per kg in plaats van 150ml',
      example: 'Premature baby\'s hebben hogere calorie behoeften voor inhaalgroei'
    },
    {
      factor: 'Kleinere Porties',
      calculation: 'Meer frequente, kleinere voedingen',
      example: '10-12x per dag in plaats van 6-8x voor volledragen baby\'s'
    }
  ]

  const ratioExplanation = [
    {
      type: 'Standaard Poedervoeding',
      ratio: '1 schepje : 30ml water',
      concentration: '13.2g poeder per 100ml',
      preparation: 'Eerst water, dan poeder toevoegen'
    },
    {
      type: 'Geconcentreerde Voeding',
      ratio: '1 schepje : 15ml water',
      concentration: '26.4g poeder per 100ml',
      preparation: 'Alleen op medisch advies gebruiken'
    },
    {
      type: 'Verdunde Voeding',
      ratio: '1 schepje : 45ml water',
      concentration: '8.8g poeder per 100ml',
      preparation: 'Voor specifieke medische indicaties'
    }
  ]

  const scientificBasis = [
    {
      source: 'Voedingscentrum Nederland',
      guideline: '150ml per kg lichaamsgewicht per dag',
      evidence: 'Gebaseerd op uitgebreid onderzoek naar Nederlandse baby populatie'
    },
    {
      source: 'Nederlandse Vereniging voor Kindergeneeskunde (NVK)',
      guideline: 'Leeftijd-specifieke aanpassingen',
      evidence: 'Klinische studies naar groeipatronen en voedingsbehoeften'
    },
    {
      source: 'Nederlands Centrum Jeugdgezondheid (NCJ)',
      guideline: 'Consultatiebureaurichtlijnen',
      evidence: 'Longitudinaal onderzoek naar optimale voedingsadviezen'
    },
    {
      source: 'WHO/UNICEF',
      guideline: 'Internationale standaarden',
      evidence: 'Wereldwijde consensusrichtlijnen voor kunstvoeding'
    }
  ]

  const limitations = [
    'Algemene richtlijnen - elke baby is uniek',
    'Geen vervanging voor medisch advies',
    'Aanpassingen mogelijk bij prematuriteit',
    'Speciale diëten vereisen professioneel advies',
    'Groeispurts kunnen tijdelijke aanpassingen vereisen'
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Calculator className="w-6 h-6 mr-3 text-primary" />
            Hoe Werkt de Flesvoeding Calculator?
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Ontdek de wetenschappelijke basis en berekeningen achter onze flesvoeding calculator. 
            Leer hoe we tot betrouwbare aanbevelingen komen voor uw baby.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Snelle Samenvatting
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-medium text-primary mb-2">150ml</div>
              <div className="text-sm text-gray-600">per kg lichaamsgewicht per dag</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-medium text-primary mb-2">5-8x</div>
              <div className="text-sm text-gray-600">voedingen per dag (gemiddeld)</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-medium text-primary mb-2">1:30</div>
              <div className="text-sm text-gray-600">schepje:ml water ratio</div>
            </div>
          </div>
        </div>

        {/* How It Works - Step by Step */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Stap-voor-Stap Berekening
          </h2>
          
          <div className="space-y-6">
            {calculationSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-700 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                  <p className="text-gray-500 text-sm italic">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Improvements & New Features */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Veiligheidsupdates & Nieuwe Functies
          </h2>
          
          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-700 mb-2">🎯 Nieuwe Standaardleeftijd: 2-4 Weken</h3>
              <p className="text-gray-600 text-sm mb-2">
                De calculator start nu standaard met "2-4 weken" in plaats van "0-1 maand" voor betere gebruikerservaring.
              </p>
              <p className="text-gray-500 text-sm italic">
                Dit helpt ouders van jonge baby's om direct de juiste leeftijdscategorie te zien.
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-700 mb-2">ℹ️ Interactieve Tooltips voor 0-2 Weken</h3>
              <p className="text-gray-600 text-sm mb-2">
                Bij selectie van "0-2 weken" verschijnt een informatietooltip bij "Aanbevolen per voeding" die uitlegt waarom de berekening anders is.
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="font-medium text-gray-700 mb-1">Tooltip bevat:</div>
                <ul className="text-gray-600 space-y-1">
                  <li>• Gebruik van 75ml/kg in plaats van 150ml/kg</li>
                  <li>• 50% reductie voor medische veiligheid</li>
                  <li>• Advies om klein te beginnen en geleidelijk op te bouwen</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-700 mb-2">🔒 Verbeterde Medische Veiligheid</h3>
              <p className="text-gray-600 text-sm">
                Granulaire leeftijdscategorieën (0-2 weken, 2-4 weken) zorgen voor medisch verantwoorde voedingsadviezen 
                voor de meest kwetsbare leeftijdsgroep.
              </p>
            </div>
          </div>
        </div>

        {/* Age Adjustments */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Baby className="w-5 h-5 mr-2" />
            Leeftijd-Specifieke Aanpassingen
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-700">Leeftijd</th>
                  <th className="text-left py-3 font-medium text-gray-700">ml per kg/dag</th>
                  <th className="text-left py-3 font-medium text-gray-700">Frequentie</th>
                  <th className="text-left py-3 font-medium text-gray-700">Reden</th>
                </tr>
              </thead>
              <tbody>
                {ageAdjustments.map((adjustment, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-600">{adjustment.age}</td>
                    <td className="py-3 text-primary font-medium">{adjustment.multiplier}</td>
                    <td className="py-3 text-gray-600">{adjustment.frequency}</td>
                    <td className="py-3 text-gray-600 text-sm">{adjustment.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Premature Baby Calculations */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
            <Scale className="w-5 h-5 mr-2" />
            Premature Baby Berekeningen
          </h2>
          
          <p className="text-gray-600 mb-4">
            Voor premature baby's gebruikt onze calculator speciale aanpassingen om rekening te houden 
            met hun unieke groei- en voedingsbehoeften.
          </p>
          
          <div className="space-y-4">
            {prematureCalculation.map((factor, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-primary mb-2">{factor.factor}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Berekening:</strong> {factor.calculation}
                </p>
                <p className="text-gray-600 text-sm italic">{factor.example}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-700 text-sm">
              <strong>Belangrijk:</strong> Premature baby's hebben altijd individueel medisch advies nodig. 
              Onze calculator geeft alleen algemene richtlijnen.
            </p>
          </div>
        </div>

        {/* Powder-Water Ratios */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4">Schepje-Water Ratio Uitleg</h2>
          
          <div className="space-y-4">
            {ratioExplanation.map((ratio, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-primary mb-2">{ratio.type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Ratio:</span>
                    <div className="text-gray-600">{ratio.ratio}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Concentratie:</span>
                    <div className="text-gray-600">{ratio.concentration}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Bereiding:</span>
                    <div className="text-gray-600">{ratio.preparation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Bereidingsstappen:</h4>
            <ol className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start space-x-2">
                <span className="font-medium">1.</span>
                <span>Meet de juiste hoeveelheid gekookt, afgekoeld water (37°C)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-medium">2.</span>
                <span>Voeg het juiste aantal schepjes poeder toe (gestreken, niet aangedrukt)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-medium">3.</span>
                <span>Schud of roer goed tot alle poeder is opgelost</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-medium">4.</span>
                <span>Controleer de temperatuur voordat u voedt</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Scientific Basis */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Wetenschappelijke Basis
          </h2>
          
          <p className="text-gray-600 mb-4">
            Onze calculator is gebaseerd op erkende Nederlandse en internationale richtlijnen:
          </p>
          
          <div className="space-y-4">
            {scientificBasis.map((basis, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-primary mb-2">{basis.source}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Richtlijn:</strong> {basis.guideline}
                </p>
                <p className="text-gray-600 text-sm">{basis.evidence}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-primary mb-4">Beperkingen & Overwegingen</h2>
          
          <div className="space-y-2">
            {limitations.map((limitation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">{limitation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 mb-2">Medische Disclaimer</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                De informatie en berekeningen op deze pagina zijn alleen voor informatieve doeleinden en vervangen geen 
                professioneel medisch advies, diagnose of behandeling. Raadpleeg altijd uw kinderarts, consultatiebureau 
                of een gekwalificeerde zorgverlener voor specifieke medische vragen over de voeding van uw baby. 
                Elke baby is uniek en kan andere voedingsbehoeften hebben dan wat onze calculator aangeeft.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-gradient rounded-2xl p-6 text-white">
          <h2 className="text-lg font-medium text-white mb-4">Calculator Proberen?</h2>
          <p className="text-white/90 mb-4">
            Nu u weet hoe onze calculator werkt, kunt u hem gebruiken om gepersonaliseerde 
            voedingsaanbevelingen voor uw baby te krijgen.
          </p>
          <Link 
            href="/"
            className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-medium py-3 px-6 rounded-xl transition-all inline-flex items-center"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Naar Calculator
          </Link>
        </div>
      </div>
    </Layout>
  )
}