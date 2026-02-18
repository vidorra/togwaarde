'use client'
import { useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import AffiliateProductWidget from '../../components/AffiliateProductWidget'
import { BookOpen, ThermometerSun, Baby, ShieldCheck, Snowflake, Sun, ShoppingBag, AlertCircle, Activity, Clock, ChevronRight, Grid, Shirt, Scale, Layers, Home, Star } from 'lucide-react'

export default function KennisbankPage() {
  const [activePhase, setActivePhase] = useState('all')

  const phases = [
    {
      id: 'all',
      title: 'Alle Artikelen',
      icon: Grid,
      description: 'Bekijk alle artikelen in onze kennisbank',
      articles: [] // Will be populated dynamically
    },
    {
      id: 'foundation',
      title: 'Basis - Basis Kennis',
      icon: BookOpen,
      description: 'Begin hier met de fundamenten van TOG-waardes',
      articles: [
        {
          title: 'Wat is TOG?',
          slug: 'wat-is-tog',
          description: 'Complete uitleg TOG-schaal en praktisch gebruik',
          icon: BookOpen,
          readTime: '12 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Wat is TOG-waarde?',
          slug: 'wat-is-tog-waarde',
          description: 'Betekenis, geschiedenis en wetenschappelijke basis',
          icon: BookOpen,
          readTime: '8 min',
          difficulty: 'Beginner'
        },
        {
          title: 'TOG-schaal Overzicht',
          slug: 'tog-schaal-overzicht',
          description: 'Complete referentie TOG 0.5 tot 4.0',
          icon: Scale,
          readTime: '10 min',
          difficulty: 'Beginner'
        },
        {
          title: 'TOG-waarde Berekenen',
          slug: 'tog-waarde-berekenen',
          description: 'Stap-voor-stap handleiding + gratis rekentool',
          icon: Activity,
          readTime: '10 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Ideale Babykamer Temperatuur',
          slug: 'babykamer-temperatuur',
          description: '16, 18 of 20 graden? De wetenschap',
          icon: ThermometerSun,
          readTime: '12 min',
          difficulty: 'Beginner'
        }
      ]
    },
    {
      id: 'seasonal',
      title: 'Seizoenen - Praktische Toepassing',
      icon: Sun,
      description: 'TOG-waardes per seizoen en weersomstandigheden',
      articles: [
        {
          title: 'TOG-waarde per Seizoen',
          slug: 'tog-waarde-per-seizoen',
          description: 'Complete gids lente, zomer, herfst, winter',
          icon: Sun,
          readTime: '20 min',
          difficulty: 'Gemiddeld'
        },
        {
          title: 'TOG-waarde Winter',
          slug: 'tog-waarde-winter',
          description: 'Baby warm én veilig aankleden in de winter',
          icon: Snowflake,
          readTime: '15 min',
          difficulty: 'Gemiddeld'
        },
        {
          title: 'Baby Slapen in de Zomer',
          slug: 'baby-slapen-zomer',
          description: 'TOG-waarde bij warm weer + hitteplan',
          icon: Sun,
          readTime: '14 min',
          difficulty: 'Gemiddeld'
        }
      ]
    },
    {
      id: 'commercial',
      title: 'Productkeuzes',
      icon: ShoppingBag,
      description: 'Welke producten kiezen op basis van TOG',
      articles: [
        {
          title: 'Baby Slaapzak Koopgids',
          slug: 'baby-slaapzak-koopgids',
          description: 'Complete gids per TOG-waarde + merkvergelijking',
          icon: ShoppingBag,
          readTime: '18 min',
          difficulty: 'Gemiddeld'
        },
        {
          title: 'Nederlandse Merken Vergelijking',
          slug: 'nederlandse-merken-vergelijking',
          description: 'Puckababy, Jollein, HEMA en meer vergeleken',
          icon: Star,
          readTime: '22 min',
          difficulty: 'Gemiddeld'
        },
        {
          title: 'Kleding Onder de Slaapzak',
          slug: 'kleding-onder-slaapzak',
          description: 'Complete kledingadvies per TOG en temperatuur',
          icon: Shirt,
          readTime: '16 min',
          difficulty: 'Gemiddeld'
        },
        {
          title: 'TOG-waarde Babykleding Tabel',
          slug: 'tog-waarde-babykleding-tabel',
          description: 'Complete referentie tabel alle kledingstukken',
          icon: Layers,
          readTime: '12 min',
          difficulty: 'Gemiddeld'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Veiligheid & Diepgang',
      icon: ShieldCheck,
      description: 'Kritieke veiligheid en speciale situaties',
      articles: [
        {
          title: 'Veilige Slaaptemperatuur',
          slug: 'veilige-slaaptemperatuur',
          description: 'Complete gids 16-20°C regel en TOG-waarde',
          icon: Home,
          readTime: '14 min',
          difficulty: 'Belangrijk'
        },
        {
          title: 'Wiegendood Preventie',
          slug: 'wiegendood-preventie',
          description: 'Uitgebreide SIDS preventiegids en richtlijnen',
          icon: ShieldCheck,
          readTime: '25 min',
          difficulty: 'Belangrijk'
        },
        {
          title: 'Wiegendood Voorkomen met TOG',
          slug: 'wiegendood-voorkomen-tog',
          description: 'Hoe TOG-waarde bijdraagt aan SIDS preventie',
          icon: ShieldCheck,
          readTime: '18 min',
          difficulty: 'Belangrijk'
        },
        {
          title: 'Oververhitting Herkennen',
          slug: 'oververhitting-herkennen',
          description: 'Symptomen, risico\'s en preventie',
          icon: AlertCircle,
          readTime: '16 min',
          difficulty: 'Belangrijk'
        },
        {
          title: 'Warmtestuwing bij Baby\'s',
          slug: 'warmtestuwing-baby',
          description: 'Herkennen, voorkomen en behandelen',
          icon: AlertCircle,
          readTime: '16 min',
          difficulty: 'Belangrijk'
        },
        {
          title: 'Baby Temperatuur Controleren',
          slug: 'baby-temperatuur-controleren',
          description: 'Nektest en andere methodes uitgelegd',
          icon: ThermometerSun,
          readTime: '10 min',
          difficulty: 'Gemiddeld'
        },
        {
          title: 'Premature Baby TOG-waarde',
          slug: 'premature-baby-tog-waarde',
          description: 'Speciale aandachtspunten voor te vroeg geboren baby\'s',
          icon: Baby,
          readTime: '18 min',
          difficulty: 'Specialistisch'
        },
        {
          title: 'Inbakeren en TOG-waarde',
          slug: 'inbakeren-tog-waarde',
          description: 'Veilig inbakeren met juiste TOG-aanpassing',
          icon: Baby,
          readTime: '15 min',
          difficulty: 'Gemiddeld'
        }
      ]
    }
  ]

  // Collect all articles from all phases for the "Alle Artikelen" view
  const allArticles = phases
    .filter(phase => phase.id !== 'all')
    .flatMap(phase => phase.articles)

  // Update the "all" phase with all articles
  const phasesWithAll = phases.map(phase =>
    phase.id === 'all' ? { ...phase, articles: allArticles } : phase
  )

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kennisbank TOG-waardes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Alles wat je moet weten over TOG-waardes voor veilig en comfortabel slapen van je baby.
            20 diepgaande artikelen, evidence-based informatie, praktische tips.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-primary mb-2">20</div>
            <div className="text-sm text-gray-600">Artikelen</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-primary mb-2">30.000+</div>
            <div className="text-sm text-gray-600">Woorden</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-sm text-gray-600">Fases</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-primary mb-2">
              <ShieldCheck className="w-8 h-8 mx-auto" />
            </div>
            <div className="text-sm text-gray-600">Evidence-based</div>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {phasesWithAll.map((phase) => {
            const Icon = phase.icon
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  activePhase === phase.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {phase.title.split(' - ')[0]}
              </button>
            )
          })}
        </div>

        {/* Active Phase Content */}
        {phasesWithAll.map((phase) => {
          if (phase.id !== activePhase) return null
          const PhaseIcon = phase.icon

          return (
            <div key={phase.id} className="mb-12">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <PhaseIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-2">{phase.title}</h2>
                    <p className="text-gray-600">{phase.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase.articles.map((article) => {
                  const ArticleIcon = article.icon
                  return (
                    <Link
                      key={article.slug}
                      href={`/kennisbank/${article.slug}`}
                      className="group bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 rounded-2xl p-6 border border-gray-100 hover:border-primary transition-all"
                    >
                      <div className="flex items-start mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <ArticleIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                            article.difficulty === 'Beginner' ? 'bg-secondary/20 text-secondary-dark' :
                            article.difficulty === 'Gemiddeld' ? 'bg-primary/20 text-primary' :
                            article.difficulty === 'Belangrijk' ? 'bg-accent/20 text-accent' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {article.difficulty}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center text-primary font-medium">
                          Lees meer
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bereken de Juiste TOG-waarde
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gebruik onze gratis calculator om direct te weten welke TOG-waarde
            jouw baby nodig heeft op basis van kamertemperatuur en leeftijd.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar Calculator
          </Link>
        </div>

        {/* Resources Section */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Extra Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-default rounded-xl">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Veiligheid Eerst</h3>
              <p className="text-gray-600 text-sm">
                Alle informatie gebaseerd op RIVM, VeiligheidNL en Nederlandse richtlijnen
              </p>
            </div>
            <div className="p-6 bg-default rounded-xl">
              <BookOpen className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Evidence-Based</h3>
              <p className="text-gray-600 text-sm">
                Wetenschappelijk onderbouwde informatie met bronvermelding
              </p>
            </div>
            <div className="p-6 bg-default rounded-xl">
              <Activity className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Praktisch Toepasbaar</h3>
              <p className="text-gray-600 text-sm">
                Direct bruikbare tips en checklists voor elke situatie
              </p>
            </div>
          </div>
        </div>

        {/* Affiliate Widget */}
        <AffiliateProductWidget
          pageId="kennisbank"
          title="Aanbevolen Babyslaapzakken"
        />
      </div>
    </Layout>
  )
}
