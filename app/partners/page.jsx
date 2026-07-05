import Layout from '../../components/Layout'
import Link from 'next/link'
import { Users, ArrowRight, Home, ExternalLink, Shield, Award } from 'lucide-react'

export const metadata = {
  title: 'Merken & Bronnen | TOGWaarde.nl',
  description: 'Bekende slaapzakmerken in Nederland en de officiële bronnen achter onze TOG-adviezen: VeiligheidNL, NCJ, NHS en The Lullaby Trust.',
  alternates: { canonical: 'https://togwaarde.nl/partners' },
}

export default function PartnersPage() {
  const brands = [
    {
      name: 'Puckababy',
      description: 'Nederlands premium merk met duidelijke TOG-labels per seizoen',
      features: ['Duidelijke TOG-aanduiding', 'Doordachte pasvorm', 'Sterke wasbestendigheid'],
      website: 'https://www.puckababy.com'
    },
    {
      name: 'Jollein',
      description: 'Breed Nederlands assortiment slaapzakken in veel maten en dessins',
      features: ['Groot assortiment', 'Veel maten en stijlen', 'Goede verkrijgbaarheid'],
      website: 'https://www.jollein.nl'
    },
    {
      name: 'HEMA',
      description: 'Betaalbare slaapzakken met heldere TOG-informatie op het label',
      features: ['Beste prijs-kwaliteit', 'TOG op het label', 'Overal verkrijgbaar'],
      website: 'https://www.hema.nl'
    },
    {
      name: 'Meyco',
      description: 'Nederlands merk met basics en seizoensslaapzakken',
      features: ['Seizoenscollecties', 'Zachte materialen', 'Eerlijke prijzen'],
      website: 'https://www.meyco.nl'
    }
  ]

  const sources = [
    {
      name: 'VeiligheidNL',
      description: 'Nederlands kenniscentrum voor letselpreventie',
      role: 'Richtlijnen voor veilig slapen en preventie van wiegendood',
      website: 'https://www.veiligheid.nl'
    },
    {
      name: 'NCJ',
      description: 'Nederlands Centrum Jeugdgezondheid',
      role: 'JGZ-richtlijnen voor veilig slapen en gezonde slaap',
      website: 'https://www.ncj.nl'
    },
    {
      name: 'NHS (UK)',
      description: 'Britse nationale gezondheidsdienst',
      role: 'Temperatuur- en TOG-richtlijnen voor babyslaap',
      website: 'https://www.nhs.uk'
    },
    {
      name: 'The Lullaby Trust',
      description: 'Britse autoriteit op het gebied van veilig slapen',
      role: 'Onderzoek en advies over SIDS-preventie en slaaptemperatuur',
      website: 'https://www.lullabytrust.org.uk'
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
          <span className="text-primary">Merken & Bronnen</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-primary mb-3 flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Merken & Bronnen
          </h1>
          <p className="text-gray-600">
            Bekende slaapzakmerken in Nederland en de officiële bronnen achter onze TOG-adviezen.
          </p>
        </div>

        {/* Transparency Note */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h2 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Transparantie
          </h2>
          <p className="text-blue-800">
            Onze TOG-adviezen zijn gebaseerd op richtlijnen van VeiligheidNL, NCJ, NHS en
            The Lullaby Trust, nooit op commerciële belangen. Op sommige pagina&apos;s tonen we
            productaanbevelingen met affiliate links (onder andere via bol.com); als je via zo&apos;n
            link iets koopt, ontvangen wij mogelijk een commissie. Dit kost jou niets extra en
            heeft geen invloed op onze adviezen of op welke merken we noemen.
          </p>
        </div>

        {/* Bekende merken */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-primary" />
            Bekende Slaapzakmerken in Nederland
          </h2>

          <div className="mb-4 text-sm text-gray-600">
            Deze merken vermelden de TOG-waarde duidelijk op het label, wat het kiezen van de
            juiste slaapzak per seizoen makkelijker maakt. Zie ook onze{' '}
            <Link href="/kennisbank/nederlandse-merken-vergelijking" className="text-primary hover:underline font-medium">
              uitgebreide merkenvergelijking
            </Link>.
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
              <strong>Belangrijk:</strong> de juiste TOG-waarde is belangrijker dan het merk.
              Elke slaapzak met een officieel TOG-label kan veilig zijn, zolang de waarde past
              bij de kamertemperatuur en de kleding eronder.
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

        {/* EN 16781 norm */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
          <h2 className="text-lg font-medium text-green-800 mb-4">
            EN 16781: de norm voor babyslaapzakken
          </h2>

          <div className="space-y-3 text-green-800">
            <p>
              Babyslaapzakken die in Europa verkocht worden, vallen onder de veiligheidsnorm
              EN 16781. Die stelt eisen aan onder andere:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-1 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Halsopening en pasvorm (geen wegzakken)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Veilige sluitingen en ritsen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Geen losse koorden of kleine onderdelen</span>
                </li>
              </ul>

              <ul className="space-y-1 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Thermische eigenschappen en labeling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Brandveiligheid van materialen</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Duidelijke gebruiksinformatie</span>
                </li>
              </ul>
            </div>

            <p className="text-sm">
              Let bij aanschaf op een duidelijke TOG-aanduiding op het label. Alleen slaapzakken
              hebben een officiële TOG-rating; waarden voor losse kleding blijven schattingen.
            </p>
          </div>
        </div>

        {/* Zustersite */}
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Ook van de makers van TOGWaarde.nl
          </h2>
          <a
            href="https://flesvoedingcalculator.nl"
            className="block border border-gray-200 rounded-xl p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-800">FlesvoedingCalculator.nl</h3>
              <ExternalLink className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-gray-600">
              Bereken gratis hoeveel flesvoeding je baby nodig heeft per leeftijd en gewicht,
              met een uitgebreide kennisbank over flesvoeding volgens Nederlandse richtlijnen.
            </p>
          </a>
        </div>

        {/* Contact */}
        <div className="bg-primary-gradient rounded-2xl p-6 text-white">
          <h2 className="font-medium text-lg mb-4">
            Vragen over merken of bronnen?
          </h2>
          <p className="text-white/90 mb-4">
            Heb je vragen over slaapzakmerken, TOG-labels of onze bronnen?
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
