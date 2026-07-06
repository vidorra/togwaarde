'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import ContactModal from '../../components/ContactModal'
import { generateFAQSchema } from '../../lib/structured-data'
import { Info, Calculator, Baby, AlertCircle, Thermometer, ChevronDown, ChevronUp } from 'lucide-react'


export default function FAQPage() {
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
      },
      {
        id: 10,
        question: 'Mijn slaapzak heeft een tussenwaarde zoals 2.0 TOG, wat nu?',
        answer: 'Geen probleem: behandel een 2.0 TOG als een iets lichtere variant van de 2.5-band. Bij 18 tot 20 graden werkt hij prima met een romper eronder. Kijk naar het totaal van slaapzak plus kleding en voel in het nekje of het klopt.'
      },
      {
        id: 11,
        question: 'Telt een slaapzak met mouwen zwaarder mee?',
        answer: 'De TOG-waarde op het label geldt voor de slaapzak zoals hij is, dus inclusief eventuele mouwen. Mouwloos is de standaard omdat baby\'s via armen en hoofd warmte kwijt kunnen. Kies je in de winter een variant met mouwen, houd dan het label aan en kleed eronder iets lichter aan.'
      },
      {
        id: 12,
        question: 'Is een tweedehands slaapzak veilig?',
        answer: 'Ja, mits het TOG-label nog leesbaar is, de rits en drukkers goed werken, de halsopening niet uitgelubberd is en de stof geen losse delen heeft. Controleer of de zak voldoet aan de norm EN 16781. Een gewassen slaapzak die vorm houdt, verliest nauwelijks isolatiewaarde.'
      }
    ],
    temperatuur: [
      {
        id: 13,
        question: 'De temperatuur zakt \'s nachts flink, waar kleed ik op aan?',
        answer: 'Kleed aan op de temperatuur die het grootste deel van de nacht geldt. Twijfel je tussen twee TOG-waardes, kies dan de lagere: te warm is gevaarlijker dan iets te koud. Voel als je zelf gaat slapen nog even in het nekje en pas eventueel aan.'
      },
      {
        id: 14,
        question: 'De verwarming valt \'s nachts uit, moet ik warmer aankleden?',
        answer: 'Bij een eenmalige koude nacht hoef je niet in paniek te raken: een baby die het echt te koud heeft, wordt wakker en laat dat merken. Is de kamer structureel kouder dan 16 graden, gebruik dan een 3.5 TOG slaapzak met warme kleding of verwarm de kamer voor het slapen kort voor.'
      },
      {
        id: 15,
        question: 'Wij slapen met het raam open, welke temperatuur telt?',
        answer: 'De temperatuur bij het bedje telt, niet die bij het raam. Leg een thermometer naast of boven het bedje en zet het bedje uit de directe tochtstroom. Frisse lucht is prima, tocht op de baby niet.'
      },
      {
        id: 16,
        question: 'Mijn baby slaapt bij ons op de kamer, moet de TOG anders?',
        answer: 'Meet gewoon de temperatuur in die kamer: door lichaamswarmte van ouders is een ouderslaapkamer vaak 1 tot 2 graden warmer. Stel de calculator in op de gemeten waarde, niet op die van de babykamer.'
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
      },
      {
        id: 17,
        question: 'Ik ontdekte dat mijn baby te warm aangekleed lag, is er nu iets mis?',
        answer: 'Een enkele te warme nacht is vrijwel nooit een probleem als je baby zich normaal gedraagt. Check de signalen: klam nekje, rood gezicht of onrust. Pas de combinatie voor de volgende nacht aan en gebruik de calculator om het structureel goed te zetten.'
      },
      {
        id: 18,
        question: 'Is te koud net zo gevaarlijk als te warm?',
        answer: 'Nee. Te warm slapen is een bekende risicofactor voor wiegendood, te koud is vooral oncomfortabel: een baby die het koud heeft, wordt wakker en gaat huilen. Kies daarom bij twijfel altijd de koelere optie en check het nekje.'
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
      },
      {
        id: 19,
        question: 'Mijn baby heeft koude handjes of voetjes, moet er een laagje bij?',
        answer: 'Koele handjes en voetjes zijn normaal en zeggen weinig over de lichaamstemperatuur. Beoordeel altijd via het nekje of de rug: lauwwarm en droog is goed. Alleen bij ijskoude handjes in combinatie met een koel nekje is een laagje extra verstandig.'
      },
      {
        id: 20,
        question: 'Kan mijn baby ook zonder slaapzak slapen?',
        answer: 'Boven de 24 graden is alleen een luier of dun rompertje vaak al genoeg, dan is geen slaapzak nodig. Bij koelere temperaturen zonder slaapzak: gebruik een stevig ingestopt lakentje of dekentje volgens de "feet to foot" methode, nooit een losse deken onder de 12 maanden. In de calculator kies je hiervoor de optie "Geen".'
      },
      {
        id: 21,
        question: 'Mijn baby is klein of licht voor de leeftijd, moet ik warmer aankleden?',
        answer: 'Kleine en lichte baby\'s koelen sneller af en mogen aan de warme kant van het advies zitten, bijvoorbeeld een laagje extra binnen het veilige bereik. Voel wel vaker in het nekje. Voor te vroeg geboren baby\'s gelden aparte aandachtspunten, zie ons artikel over premature baby\'s en TOG.'
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