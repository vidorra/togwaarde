import Layout from '../../../components/Layout'
import { ThermometerSun, Shield, Baby, AlertTriangle, CheckCircle, Info, Heart, Calculator, BookOpen, ArrowRight, Check, XCircle } from 'lucide-react'
import Link from 'next/link'
import AffiliateProductWidget from '../../../components/AffiliateProductWidget'

export const metadata = {
  title: 'Wiegendood Preventie: De Rol van Temperatuur en TOG-waarde | TOGWaarde.nl',
  description: 'Wetenschappelijk gefundeerde informatie over wiegendood preventie en de cruciale rol van temperatuur en TOG-waarde. RIVM en VeiligheidNL richtlijnen voor veilige babyslaap in Nederland.',
  keywords: 'wiegendood preventie, SIDS, oververhitting baby, veilig slapen baby, TOG veiligheid, RIVM wiegendood, VeiligheidNL, temperatuur wiegendood'
}

export default function WiegendoodPreventie() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Wiegendood Preventie: De Rol van Temperatuur en TOG-waarde
          </h1>
          <p className="text-lg text-gray-600">
            Nederlandse gezondheidsinstanties zoals het RIVM, VeiligheidNL en de Jeugdgezondheidszorg (JGZ) zijn glashelder over het verband tussen temperatuur en wiegendood. Warmtestress is een onafhankelijke risicofactor voor Sudden Infant Death Syndrome (SIDS), in Nederland bekend als wiegendood. Het correct kiezen van een TOG-waarde en het voorkomen van oververhitting zijn essentieel voor veilige babyslaap.
          </p>
        </header>

        {/* Main Content - Single White Frame */}
        <div className="p-6 lg:p-12 bg-white rounded-2xl mb-6">
        {/* Critical Warning Box */}
        <div className="relative bg-primary/10 p-6 rounded-lg mb-12 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-red-600">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Belangrijke Veiligheidsinformatie</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                De JGZ-richtlijn Preventie Wiegendood uit 2009 stelt expliciet: <strong>"Overmatige omgevingswarmte vermindert de wekbaarheid van de baby."</strong> Warmtestress verhoogt het risico op wiegendood significant.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Deze informatie is bedoeld voor educatieve doeleinden. Bij zorgen over de gezondheid of veiligheid van je baby, neem altijd contact op met je huisarts, consultatiebureau of bel 112 in noodgevallen.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">

          {/* What is SIDS */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Wat is Wiegendood (SIDS)?</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Wiegendood, medisch bekend als Sudden Infant Death Syndrome (SIDS), is het plotseling en onverwacht overlijden van een baby jonger dan één jaar, waarbij geen oorzaak kan worden vastgesteld na uitgebreid onderzoek. Het overlijden gebeurt meestal tijdens slaap en treft ogenschijnlijk gezonde baby's.
            </p>

            <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Nederlandse Cijfers
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>1984:</strong> 120 per 100.000 baby's overleden aan wiegendood</li>
                <li><strong>2004:</strong> Gedaald naar 9 per 100.000 door betere voorlichting</li>
                <li><strong>2022-2024:</strong> Zorgelijke stijging van 50%, nu ongeveer 25-39 gevallen per jaar (3 baby's per maand)</li>
              </ul>
              <p className="text-gray-700 text-sm mt-4">
                Deze dramatische daling en recente stijging benadrukken het belang van blijvende educatie over veilig slapen en correcte temperatuurregulatie.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Risicofactoren voor Wiegendood</h3>
              <p className="text-gray-700 text-sm mb-4">SIDS heeft geen enkele oorzaak, maar meerdere risicofactoren zijn wetenschappelijk aangetoond:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Beïnvloedbare Factoren</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Slapen op buik of zij</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Oververhitting / te warm aangekleed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Roken tijdens zwangerschap of in omgeving</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Dekbedden of losse dekens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Slapen in ouderlijk bed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Knuffels of kussens in bed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Te zachte matras</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">Niet-beïnvloedbare Factoren</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span>Jonge leeftijd (2-4 maanden hoogste risico)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span>Mannelijk geslacht (60% van gevallen)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span>Prematuriteit of laag geboortegewicht</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span>Wintermaanden (meer gevallen)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span>Genetische factoren</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Temperature and SIDS */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Hoe Oververhitting Gevaarlijk Wordt</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Het mechanisme achter temperatuur en wiegendood heeft te maken met de hersenfonctie van baby's. Wanneer een baby te warm wordt, verhoogt de <strong>arousal threshold</strong> – het wordt moeilijker om wakker te worden bij ademhalingsproblemen. Dit is bijzonder gevaarlijk omdat baby's in diepe slaap mogelijk niet reageren op zuurstoftekort.
            </p>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Wetenschappelijke Bevindingen
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Nederlandse studies tonen aan dat het gebruik van een dekbed in de eerste twee jaar het risico met <strong>factor 3.9</strong> verhoogt. Wanneer een baby volledig onder een dekbed raakt, schiet het risico omhoog naar <strong>factor 38</strong>.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Dit verklaart waarom VeiligheidNL slaapzakken promoot als één van <strong>"De 4 van Veilig Slapen"</strong>: op de rug, in eigen bedje, in slaapzak, rookvrije omgeving.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Waarom Warmte het Risico Verhoogt</h3>
              <div className="space-y-4 text-gray-700 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Verminderde Wekbaarheid</strong>
                    <p className="mt-1">Warmte verdiept de slaap en maakt het moeilijker voor baby's om wakker te worden bij ademhalingsproblemen of zuurstoftekort.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Verhoogde Metabolische Vraag</strong>
                    <p className="mt-1">Oververhitting verhoogt het metabolisme en dus de zuurstofbehoefte, terwijl de beschikbaarheid beperkt kan zijn.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Beperkte Zelfregulatie</strong>
                    <p className="mt-1">Baby's kunnen hun lichaamstemperatuur pas goed reguleren vanaf 1.5-2 jaar oud en zijn volledig afhankelijk van de omgeving.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">CO₂ Rebreathing</strong>
                    <p className="mt-1">Bij bedekking van het gezicht (door dekentjes die verschuiven) ademt baby uitgeademde lucht opnieuw in, wat bij warmte extra gevaarlijk is.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recognizing Overheating */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Herken Oververhitting</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Het Nederlandse consultatiebureau leert ouders de juiste controle: voel het nekje, de borst of de rug. Deze centrale lichaamsgebieden geven de échte lichaamstemperatuur weer. Handen en voetjes zijn vaak koeler door de nog onvolgroeide circulatie en zijn dus onbetrouwbare indicatoren.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-primary/10 border-2 border-red-300 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-gray-900">Waarschuwingstekenen</h3>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Klam, zweterig nekje</strong> of zweterig haar
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Verhit gevoel</strong> op borst of rug (niet handen/voeten)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Rood of verhit gezicht</strong>, rode oren
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Snelle ademhaling</strong> of hijgen
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Hittepukkels</strong> (kleine rode bultjes op nek, borst, oksels)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Onrustig en lastig</strong>, of paradoxaal <strong>heel stil en slap</strong> (extra zorgelijk!)
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/20 border-2 border-secondary/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-secondary-dark" />
                  <h3 className="font-semibold text-gray-900">Goede Temperatuur</h3>
                </div>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Nekje warm en droog</strong> (niet klam)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Borst en rug warm</strong> maar niet heet
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Rustige, regelmatige ademhaling</strong>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Normale huidskleur</strong> (niet rood of bleek)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Rustig slapend</strong> of tevreden wakker
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Handjes en voetjes koeler</strong> dan romp (dit is normaal!)
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative bg-primary/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                RIVM-richtlijn voor Controle
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>"Zolang de voeten warm aanvoelen heeft een baby het niet te koud, terwijl een zwetende baby het in de regel te warm heeft."</strong> Voel altijd het nekje en de borst, nooit alleen de extremiteiten. Doe dit minimaal één keer per nacht, vooral in de eerste weken en bij temperatuurveranderingen.
              </p>
            </div>
          </section>

          {/* The 4 of Safe Sleep */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">De 4 van Veilig Slapen (VeiligheidNL)</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              VeiligheidNL promoot vier essentiële regels voor veilige babyslaap. Het correct kiezen van TOG-waarde en slaapzak is regel nummer 3.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-bold text-gray-900">Op de Rug Slapen</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Leg baby altijd op de rug om te slapen, zowel overdag als 's nachts. Buikslaap verhoogt het wiegendoodrisico met factor 3-9. Zijligging is ook onveilig omdat baby kan rollen naar buikligging.
                </p>
              </div>

              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-bold text-gray-900">In Eigen Bedje</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Baby slaapt veilig in een eigen bedje of wieg in de ouderslaapkamer. Co-sleeping in het ouderbed verhoogt het risico significant door gevaar van bedekking, oververhitting en beknelling.
                </p>
              </div>

              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-bold text-gray-900">In Slaapzak</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Gebruik een goed passende slaapzak met de juiste TOG-waarde in plaats van losse dekens of dekbedden. Slaapzakken voorkomen bedekking van het gezicht en reguleren temperatuur beter. Geen kussens, knuffels of speelgoed in bed.
                </p>
              </div>

              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">4</span>
                  </div>
                  <h3 className="font-bold text-gray-900">Rookvrije Omgeving</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Rook niet tijdens zwangerschap en zorg voor een rookvrije omgeving rondom baby. Roken verhoogt het wiegendoodrisico met factor 3-4. Ook passief roken (kleding van rokers) is schadelijk.
                </p>
              </div>
            </div>
          </section>

          {/* TOG and Prevention */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">De Juiste TOG-waarde Kiezen voor Veiligheid</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Het correct kiezen van een TOG-waarde is essentieel voor wiegendood preventie. Te hoge TOG-waardes of verkeerde kledingcombinaties verhogen het oververhittingsrisico.
            </p>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-secondary/20 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-secondary-dark" />
                Veilige TOG-keuze Richtlijnen
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Meet de kamertemperatuur</strong> met een betrouwbare thermometer – niet op gevoel afgaan
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Volg de TOG-tabel</strong> exact: 18°C = TOG 2.5, 22°C = TOG 1.0-2.0, 26°C+ = TOG 0.5
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Bij twijfel: kies lagere TOG</strong> en voeg kledinglaag toe – makkelijker aan te passen
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Controleer het nekje</strong> 30 minuten na het slapen en minstens 1x per nacht
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Pas aan bij temperatuurveranderingen</strong> – seizoensovergangen zijn kritiek
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-secondary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Gebruik natuurlijke materialen</strong> (katoen, bamboe) die beter ademen dan synthetisch
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border-2 border-red-300 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Gevaarlijke Praktijken - NOOIT Doen
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Slaapzak + dekbed/dekentje combineren</strong> – levensgevaarlijk en onnodig
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Mutsje binnenshuis</strong> – voorkomt warmteafgifte via hoofd, zeer gevaarlijk
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Verwarming boven 20°C zetten "voor de baby"</strong> – verhoogt oververhittingsrisico
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Te grote slaapzak</strong> – baby kan erin glijden, verstikkingsgevaar
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Alleen op handjes/voetjes afgaan</strong> – deze zijn altijd koeler, geen indicator
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Inbakeren na 4 maanden</strong> of bij eerste tekenen van rollen – rolrisico
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Bed voorverwarmen met kruik</strong> – oververhittingsrisico en brandgevaar
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Ideal Conditions */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Ideale Slaapomstandigheden</h2>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">De Perfecte Nederlandse Baby Slaapkamer</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerSun className="w-5 h-5 text-primary" />
                    <strong className="text-gray-900">Temperatuur: 16-20°C, ideaal 18°C</strong>
                  </div>
                  <p className="text-gray-700 text-sm pl-7">
                    Niet hoger dan 20°C, niet lager dan 16°C. Gebruik een betrouwbare thermometer op kindhoogte.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <strong className="text-gray-900">TOG-waarde: 2.5 bij 18°C</strong>
                  </div>
                  <p className="text-gray-700 text-sm pl-7">
                    Met lange mouw romper en warme pyjama. Pas aan bij andere temperaturen volgens TOG-tabel.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Baby className="w-5 h-5 text-primary" />
                    <strong className="text-gray-900">Slaappositie: Altijd op de rug</strong>
                  </div>
                  <p className="text-gray-700 text-sm pl-7">
                    Zowel overdag als 's nachts. Voeten aan voeteneinde van bed (feet-to-foot).
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <strong className="text-gray-900">Leeg Bed: Geen losse items</strong>
                  </div>
                  <p className="text-gray-700 text-sm pl-7">
                    Geen kussens, knuffels, speelgoed, dekentjes. Alleen baby in goed passende slaapzak op stevige matras.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-primary" />
                    <strong className="text-gray-900">Locatie: Eigen bedje in ouderslaapkamer</strong>
                  </div>
                  <p className="text-gray-700 text-sm pl-7">
                    Minimaal eerste 6 maanden, bij voorkeur eerste jaar. Niet in ouderbed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Seek Help */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Wanneer Direct Hulp Zoeken</h2>

            <div className="bg-primary/10 border-2 border-primary rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Bel 112 Direct Bij:</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Baby reageert niet of is slap en lusteloos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Ademhaling stopt of zeer onregelmatig is</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Blauwe verkleuring van lippen, gezicht of romp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Baby niet wakker te krijgen is</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Extreme temperatuur (rectaal onder 36°C of boven 38°C bij baby onder 3 maanden)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative bg-accent/10 p-6 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent/100 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                Contact Consultatiebureau of Huisarts Bij:
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Zorgen over slaapgedrag of temperatuurregulatie</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Baby consequent te warm of te koud aanvoelt</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Vragen over correcte TOG-waarde voor jouw situatie</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Speciale omstandigheden (prematuriteit, medische conditie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Onzekerheid over veilige slaapmethoden</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Resources */}
          
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-6">Nederlandse Hulpbronnen</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Officiële Instanties</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>VeiligheidNL:</strong> veiligheid.nl/babyveiligheid</li>
                  <li><strong>RIVM:</strong> Richtlijnen wiegendood preventie</li>
                  <li><strong>JGZ:</strong> Lokaal consultatiebureau</li>
                  <li><strong>Huisarts:</strong> Bij medische vragen</li>
                  <li><strong>112:</strong> Noodgevallen</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Belangrijke Documenten</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>JGZ-richtlijn Preventie Wiegendood (2009)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>VeiligheidNL "De 4 van Veilig Slapen"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>RIVM Temperatuurrichtlijnen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span>Consumentenbond Slaapzak Tests</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>
        </div>

        {/* CTA Sections */}
        <div className="mt-12 space-y-6">
          {/* Calculator CTA */}
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Kies de Veiligste TOG-waarde voor jouw Baby</h3>
                <p className="opacity-90">Gebruik onze gratis TOG Calculator voor veilig slaapadvies op basis van jouw kamertemperatuur.</p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-primary font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                <Calculator className="w-5 h-5" />
                <span>Naar TOG Calculator</span>
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Gerelateerde Artikelen
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/kennisbank/tog-schaal-overzicht"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">TOG-Schaal Overzicht</h4>
                <p className="text-sm text-gray-600 mb-3">Kies de juiste TOG-waarde</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/kleding-onder-slaapzak"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Kleding Onder Slaapzak</h4>
                <p className="text-sm text-gray-600 mb-3">Veilig aankleden per temperatuur</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/kennisbank/wat-is-tog"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors group"
              >
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">Wat is TOG?</h4>
                <p className="text-sm text-gray-600 mb-3">Basis uitleg TOG-systeem</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1">
                  Lees meer <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="wiegendood-preventie"
          title="Aanbevolen Babyslaapzakken"
        />
    </Layout>
  )
}
