# 📋 Implementatie TODO: togwaarde.nl Pillar Page Strategie

**Project:** togwaarde.nl - Complete TOG-waarde Gids  
**Doel:** Implementeer pillar page + 12 kennisbank artikelen  
**Gebaseerd op:** flesvoedingcalculator.nl structuur  
**Voor:** Claude Code uitvoering

---

## 🎯 OVERZICHT IMPLEMENTATIE

### Wat wordt gemaakt:
1. **Pillar Page** → `/tog-waarde-gids` (in menu)
2. **12 Kennisbank Artikelen** → `/kennisbank/[artikel-slug]`
3. **Menu Update** → TOG-waarde Gids ipv Wat is TOG-waarde
4. **Interne Linking** → Alle artikelen linken naar elkaar
5. **SEO Optimalisatie** → Schema markup + meta tags

### Huidige Situatie:
- ✅ Calculator bestaat al: `/`
- ✅ Basic routing werkt
- ❌ Pillar page bestaat niet
- ❌ Kennisbank artikelen bestaan niet
- ❌ Menu heeft nog geen pillar page link

---

## 📁 BESTANDSSTRUCTUUR OVERZICHT

```
togwaarde.nl/
├── app/
│   ├── components/
│   │   ├── Header.jsx ...................... [AANPASSEN]
│   │   └── Layout.jsx ...................... [GEBRUIKEN]
│   │
│   ├── tog-waarde-gids/
│   │   └── page.jsx ........................ [NIEUW - PILLAR PAGE]
│   │
│   ├── kennisbank/
│   │   ├── page.jsx ........................ [AANPASSEN - OVERZICHT]
│   │   │
│   │   ├── wat-is-tog-waarde/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 1]
│   │   │
│   │   ├── tog-waarde-berekenen/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 2]
│   │   │
│   │   ├── babykamer-temperatuur/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 3]
│   │   │
│   │   ├── tog-waarde-winter/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 4]
│   │   │
│   │   ├── baby-slapen-zomer/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 5]
│   │   │
│   │   ├── baby-slaapzak-koopgids/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 6]
│   │   │
│   │   ├── tog-waarde-babykleding-tabel/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 7]
│   │   │
│   │   ├── wiegendood-voorkomen-tog/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 8]
│   │   │
│   │   ├── warmtestuwing-baby/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 9]
│   │   │
│   │   ├── baby-temperatuur-controleren/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 10]
│   │   │
│   │   ├── premature-baby-tog-waarde/
│   │   │   └── page.jsx .................... [NIEUW - ARTIKEL 11]
│   │   │
│   │   └── inbakeren-tog-waarde/
│   │       └── page.jsx .................... [NIEUW - ARTIKEL 12]
│   │
│   └── globals.css ......................... [AANPASSEN - INDIEN NODIG]
│
├── public/
│   └── images/ ............................. [OPTIONEEL - AFBEELDINGEN]
│
└── content/
    └── pillar-artikelen/ ................... [NIEUW - MD BESTANDEN]
        ├── artikel-01-wat-is-tog-waarde.md
        ├── artikel-02-berekenen.md
        ├── artikel-03-temperatuur.md
        ├── artikel-04-winter.md
        ├── artikel-05-zomer.md
        ├── artikel-06-koopgids.md
        ├── artikel-07-kleding-tabel.md
        ├── artikel-08-wiegendood.md
        ├── artikel-09-warmtestuwing.md
        ├── artikel-10-temperatuur-check.md
        ├── artikel-11-premature-baby.md
        └── artikel-12-inbakeren.md
```

---

## ✅ STAP 1: MENU AANPASSEN

### File: `app/components/Header.jsx`

**Doel:** Vervang "Wat is TOG-waarde?" door "TOG-waarde Gids" in navigatie

**Huidige code (VINDEN):**
```jsx
const navigation = [
  { id: '/', name: 'Calculator', icon: Calculator, href: '/' },
  { id: '/kennisbank', name: 'Kennisbank', icon: BookOpen, href: '/kennisbank' },
  { id: '/wat-is-tog-waarde', name: 'Wat is TOG-waarde?', icon: Info, href: '/wat-is-tog-waarde' },
  { id: '/faq', name: 'FAQ', icon: HelpCircle, href: '/faq' }
]
```

**Nieuwe code (VERVANGEN DOOR):**
```jsx
const navigation = [
  { id: '/', name: 'Calculator', icon: Calculator, href: '/' },
  { id: '/kennisbank', name: 'Kennisbank', icon: BookOpen, href: '/kennisbank' },
  { id: '/tog-waarde-gids', name: 'TOG-waarde Gids', icon: Book, href: '/tog-waarde-gids' },
  { id: '/faq', name: 'FAQ', icon: HelpCircle, href: '/faq' }
]
```

**Import toevoegen (bovenaan bestand):**
```jsx
import { Book } from 'lucide-react' // Voeg Book icon toe
```

**Waarom:**
- Pillar page wordt hoofdnavigatie item
- Duidelijker dan "Wat is TOG-waarde?"
- Consistenter met content strategie

---

## ✅ STAP 2: PILLAR PAGE MAKEN

### File: `app/tog-waarde-gids/page.jsx`

**Doel:** Creëer de ultieme TOG-waarde gids als pillar page

**Complete code:**

```jsx
'use client'
import { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { BookOpen, ThermometerSun, Baby, ShieldCheck, Snowflake, Sun, ShoppingBag, AlertCircle, Activity, Clock, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Complete TOG-waarde Gids | Alles over Veilig Slapen Baby',
  description: 'Ultieme Nederlandse gids over TOG-waardes. Leer alles over veilig slapen, juiste temperatuur, seizoenen en TOG-berekeningen. 12 diepgaande artikelen.',
  keywords: 'tog waarde, tog gids, baby slapen, slaapzak, veilig slapen',
}

export default function TOGWaardeGidsPage() {
  const [activePhase, setActivePhase] = useState('foundation')

  const phases = [
    {
      id: 'foundation',
      title: 'Foundation - Basis Kennis',
      icon: BookOpen,
      description: 'Begin hier met de fundamenten van TOG-waardes',
      articles: [
        {
          title: 'Wat is TOG-waarde?',
          slug: 'wat-is-tog-waarde',
          description: 'Betekenis, geschiedenis en wetenschappelijke basis',
          icon: BookOpen,
          readTime: '8 min',
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
      title: 'Shopping - Product Keuzes',
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
          title: 'TOG-waarde Babykleding Tabel',
          slug: 'tog-waarde-babykleding-tabel',
          description: 'Complete referentie tabel alle kledingstukken',
          icon: Baby,
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
          title: 'Wiegendood Voorkomen met TOG',
          slug: 'wiegendood-voorkomen-tog',
          description: 'Complete SIDS preventie gids + TOG-waarde rol',
          icon: ShieldCheck,
          readTime: '20 min',
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Complete TOG-waarde Gids
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Alles wat je moet weten over TOG-waardes voor veilig en comfortabel slapen van je baby. 
            12 diepgaande artikelen, evidence-based informatie, praktische tips.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <div className="text-sm text-gray-600">Artikelen</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-primary mb-2">30k+</div>
            <div className="text-sm text-gray-600">Woorden</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-primary mb-2">4</div>
            <div className="text-sm text-gray-600">Fases</div>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-gray-600">Evidence-based</div>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {phases.map((phase) => {
            const Icon = phase.icon
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  activePhase === phase.id
                    ? 'bg-primary text-white shadow-lg'
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
        {phases.map((phase) => {
          if (phase.id !== activePhase) return null
          const PhaseIcon = phase.icon

          return (
            <div key={phase.id} className="mb-12">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 border border-gray-200 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                    <PhaseIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{phase.title}</h2>
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
                      className="group bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                          <ArticleIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                            article.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            article.difficulty === 'Gemiddeld' ? 'bg-blue-100 text-blue-700' :
                            article.difficulty === 'Belangrijk' ? 'bg-orange-100 text-orange-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {article.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bereken de Juiste TOG-waarde
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gebruik onze gratis calculator om direct te weten welke TOG-waarde 
            jouw baby nodig heeft op basis van kamertemperatuur en leeftijd.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            <Activity className="w-5 h-5 mr-2" />
            Naar Calculator
          </Link>
        </div>

        {/* Resources Section */}
        <div className="mt-12 bg-white/80 backdrop-blur rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Extra Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Veiligheid Eerst</h3>
              <p className="text-gray-600 text-sm">
                Alle informatie gebaseerd op RIVM, VeiligheidNL en AAP richtlijnen
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <BookOpen className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Evidence-Based</h3>
              <p className="text-gray-600 text-sm">
                Wetenschappelijk onderbouwde informatie met bronvermelding
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <Activity className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Praktisch Toepasbaar</h3>
              <p className="text-gray-600 text-sm">
                Direct bruikbare tips en checklists voor elke situatie
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
```

**Waarom deze structuur:**
- ✅ Duidelijke fasering (Foundation → Seasonal → Commercial → Safety)
- ✅ Visueel aantrekkelijk met icons en difficulty labels
- ✅ Interactieve tab navigatie
- ✅ Direct CTA naar calculator
- ✅ Trust signals (30k+ woorden, evidence-based)

---

## ✅ STAP 3: KENNISBANK OVERZICHT AANPASSEN

### File: `app/kennisbank/page.jsx`

**Doel:** Update kennisbank homepage met alle 12 TOG-artikelen

**Voeg toe aan bestaande sectie:**

```jsx
{/* TOG-waarde Sectie */}
<section className="mb-12">
  <div className="flex items-center mb-6">
    <ThermometerSun className="w-6 h-6 text-primary mr-3" />
    <h2 className="text-2xl font-bold text-gray-800">TOG-waarde & Veilig Slapen</h2>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Fase 1: Foundation */}
    <Link href="/kennisbank/wat-is-tog-waarde" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <BookOpen className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Beginner</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Wat is TOG-waarde?</h3>
      <p className="text-sm text-gray-600">Betekenis, geschiedenis en wetenschappelijke basis uitgelegd</p>
    </Link>

    <Link href="/kennisbank/tog-waarde-berekenen" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <Activity className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Beginner</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">TOG-waarde Berekenen</h3>
      <p className="text-sm text-gray-600">Stap-voor-stap handleiding + gratis rekentool</p>
    </Link>

    <Link href="/kennisbank/babykamer-temperatuur" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <ThermometerSun className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">Beginner</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Ideale Babykamer Temperatuur</h3>
      <p className="text-sm text-gray-600">16, 18 of 20 graden? De wetenschap achter de richtlijnen</p>
    </Link>

    {/* Fase 2: Seizoenen */}
    <Link href="/kennisbank/tog-waarde-winter" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <Snowflake className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gemiddeld</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">TOG-waarde Winter</h3>
      <p className="text-sm text-gray-600">Baby warm én veilig aankleden in de winter</p>
    </Link>

    <Link href="/kennisbank/baby-slapen-zomer" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <Sun className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gemiddeld</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Baby Slapen in de Zomer</h3>
      <p className="text-sm text-gray-600">TOG-waarde bij warm weer + hitteplan</p>
    </Link>

    {/* Fase 3: Commercial */}
    <Link href="/kennisbank/baby-slaapzak-koopgids" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <ShoppingBag className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gemiddeld</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Baby Slaapzak Koopgids</h3>
      <p className="text-sm text-gray-600">Complete gids per TOG-waarde + merkvergelijking</p>
    </Link>

    <Link href="/kennisbank/tog-waarde-babykleding-tabel" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <Baby className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gemiddeld</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">TOG-waarde Babykleding Tabel</h3>
      <p className="text-sm text-gray-600">Complete referentie tabel alle kledingstukken</p>
    </Link>

    {/* Fase 4: Safety */}
    <Link href="/kennisbank/wiegendood-voorkomen-tog" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <ShieldCheck className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Belangrijk</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Wiegendood Voorkomen</h3>
      <p className="text-sm text-gray-600">Complete SIDS preventie gids + TOG-waarde rol</p>
    </Link>

    <Link href="/kennisbank/warmtestuwing-baby" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <AlertCircle className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Belangrijk</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Warmtestuwing bij Baby's</h3>
      <p className="text-sm text-gray-600">Herkennen, voorkomen en behandelen</p>
    </Link>

    <Link href="/kennisbank/baby-temperatuur-controleren" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <ThermometerSun className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gemiddeld</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Baby Temperatuur Controleren</h3>
      <p className="text-sm text-gray-600">Nektest en andere methodes uitgelegd</p>
    </Link>

    <Link href="/kennisbank/premature-baby-tog-waarde" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <Baby className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Specialistisch</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Premature Baby TOG-waarde</h3>
      <p className="text-sm text-gray-600">Speciale aandachtspunten voor te vroeg geboren baby's</p>
    </Link>

    <Link href="/kennisbank/inbakeren-tog-waarde" className="group bg-white/80 backdrop-blur rounded-xl p-6 border border-gray-200 hover:border-primary transition-all">
      <div className="flex items-center mb-3">
        <Baby className="w-5 h-5 text-primary mr-2" />
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gemiddeld</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary">Inbakeren en TOG-waarde</h3>
      <p className="text-sm text-gray-600">Veilig inbakeren met juiste TOG-aanpassing</p>
    </Link>
  </div>

  {/* Link naar pillar page */}
  <div className="mt-8 text-center">
    <Link 
      href="/tog-waarde-gids"
      className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
    >
      <BookOpen className="w-5 h-5 mr-2" />
      Bekijk Complete TOG-waarde Gids
      <ChevronRight className="w-5 h-5 ml-2" />
    </Link>
  </div>
</section>
```

**Voeg bovenaan page toe:**
```jsx
import { ThermometerSun, BookOpen, Activity, Sun, Snowflake, ShoppingBag, Baby, ShieldCheck, AlertCircle, ChevronRight } from 'lucide-react'
```

---

## ✅ STAP 4: ARTIKEL TEMPLATE MAKEN

### File: `app/kennisbank/[artikel-template].jsx`

**Doel:** Herbruikbare template voor alle 12 artikelen

**Template structuur (voorbeeld voor artikel 1):**

```jsx
'use client'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { BookOpen, ArrowRight, ChevronRight, ThermometerSun, Activity } from 'lucide-react'

export const metadata = {
  title: 'Wat is TOG-waarde? Betekenis & Geschiedenis | TOGwaarde.nl',
  description: 'Leer alles over TOG-waardes: betekenis, geschiedenis, wetenschappelijke basis en praktische toepassing voor baby slaapzakken. Evidence-based gids.',
  keywords: 'tog waarde, wat is tog, tog betekenis, baby slaapzak',
}

export default function WatIsTOGWaardePage() {
  // Related articles voor interne linking
  const relatedArticles = [
    {
      title: 'TOG-waarde Berekenen',
      slug: 'tog-waarde-berekenen',
      description: 'Stap-voor-stap handleiding',
      icon: Activity
    },
    {
      title: 'Ideale Babykamer Temperatuur',
      slug: 'babykamer-temperatuur',
      description: 'De perfecte slaaptemperatuur',
      icon: ThermometerSun
    },
    {
      title: 'TOG-waarde Winter',
      slug: 'tog-waarde-winter',
      description: 'Veilig en warm in de winter',
      icon: BookOpen
    }
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/kennisbank" className="hover:text-primary">Kennisbank</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/tog-waarde-gids" className="hover:text-primary">TOG-waarde Gids</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Wat is TOG-waarde?</span>
        </nav>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Foundation
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">8 minuten leestijd</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Wat is TOG-waarde?
          </h1>
          <p className="text-xl text-gray-600">
            Leer alles over de TOG-waarde: betekenis, geschiedenis en hoe je het gebruikt 
            voor veilig slapen van je baby.
          </p>
        </div>

        {/* Article Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              {/* HIER KOMT DE MARKDOWN CONTENT UIT HET PROJECT KNOWLEDGE */}
              {/* Dit kan je dynamisch laden of handmatig plakken */}
              
              {/* Voorbeeld eerste sectie: */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Wat betekent TOG?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  TOG is een internationale maatstaf die aangeeft hoe goed textiel warmte vasthoudt. 
                  De term komt van het Engelse woord "togs" (kledingstukken) en is ontwikkeld door 
                  het Shirley Institute in Manchester in 1946.
                </p>
                {/* ... meer content ... */}
              </div>

              {/* Volgende secties... */}
            </article>

            {/* CTA naar Calculator */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Bereken de Juiste TOG-waarde
              </h3>
              <p className="text-gray-600 mb-6">
                Gebruik onze gratis calculator om direct te weten welke TOG-waarde 
                jouw baby nodig heeft.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <Activity className="w-5 h-5 mr-2" />
                Naar Calculator
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Table of Contents */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200 mb-6 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Inhoudsopgave
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#betekenis" className="text-gray-600 hover:text-primary transition-colors">
                    • Wat betekent TOG?
                  </a>
                </li>
                <li>
                  <a href="#geschiedenis" className="text-gray-600 hover:text-primary transition-colors">
                    • Geschiedenis Shirley Institute
                  </a>
                </li>
                <li>
                  <a href="#wetenschappelijk" className="text-gray-600 hover:text-primary transition-colors">
                    • Wetenschappelijke basis
                  </a>
                </li>
                <li>
                  <a href="#praktisch" className="text-gray-600 hover:text-primary transition-colors">
                    • Praktische toepassing
                  </a>
                </li>
              </ul>

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Snel naar:</h4>
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block text-sm text-primary hover:underline"
                  >
                    → TOG Calculator
                  </Link>
                  <Link
                    href="/tog-waarde-gids"
                    className="block text-sm text-primary hover:underline"
                  >
                    → Complete Gids
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Gerelateerde Artikelen</h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => {
                  const Icon = article.icon
                  return (
                    <Link
                      key={article.slug}
                      href={`/kennisbank/${article.slug}`}
                      className="group flex items-start p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                    >
                      <Icon className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {article.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Article Navigation (Vorige/Volgende) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/tog-waarde-gids"
            className="flex items-center p-6 bg-white/80 backdrop-blur rounded-xl border border-gray-200 hover:border-primary transition-all group"
          >
            <div className="flex-1">
              <div className="text-sm text-gray-500 mb-1">Vorige</div>
              <div className="font-semibold text-gray-800 group-hover:text-primary">
                Complete TOG-waarde Gids
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-180" />
          </Link>

          <Link
            href="/kennisbank/tog-waarde-berekenen"
            className="flex items-center p-6 bg-white/80 backdrop-blur rounded-xl border border-gray-200 hover:border-primary transition-all group"
          >
            <div className="flex-1 text-right">
              <div className="text-sm text-gray-500 mb-1">Volgende</div>
              <div className="font-semibold text-gray-800 group-hover:text-primary">
                TOG-waarde Berekenen
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
          </Link>
        </div>
      </div>
    </Layout>
  )
}
```

**Template Kenmerken:**
- ✅ Breadcrumbs voor SEO
- ✅ Table of Contents sidebar
- ✅ Related articles (interne linking)
- ✅ Vorige/Volgende navigatie
- ✅ CTA naar calculator
- ✅ Difficulty label
- ✅ Read time
- ✅ Responsive design

---

## ✅ STAP 5: MARKDOWN CONTENT INTEGREREN

### Optie A: Statisch (Eenvoudig)

**Voor elk artikel:**
1. Kopieer markdown content uit `/mnt/project/artikel-XX-[naam].md`
2. Converteer markdown naar JSX
3. Plak in artikel component

**Voorbeeld conversie:**
```markdown
# Sectie Titel

Normale tekst met **bold** en *italic*.

- Lijst item 1
- Lijst item 2
```

**Wordt:**
```jsx
<div className="bg-white/80 backdrop-blur rounded-2xl p-8 border border-gray-200 mb-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Sectie Titel</h2>
  <p className="text-gray-700 leading-relaxed mb-4">
    Normale tekst met <strong>bold</strong> en <em>italic</em>.
  </p>
  <ul className="list-disc pl-6 space-y-2">
    <li>Lijst item 1</li>
    <li>Lijst item 2</li>
  </ul>
</div>
```

### Optie B: Dynamisch met MDX (Geavanceerd)

**Install dependencies:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

**next.config.js toevoegen:**
```javascript
const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
})
```

**Content folder structuur:**
```
content/
└── kennisbank/
    ├── wat-is-tog-waarde.mdx
    ├── tog-waarde-berekenen.mdx
    └── ...
```

**Dan in component:**
```jsx
import ArticleContent from '@/content/kennisbank/wat-is-tog-waarde.mdx'

// In component:
<ArticleContent />
```

---

## ✅ STAP 6: SEO OPTIMALISATIE

### Voor elk artikel toevoegen:

**1. Metadata**
```jsx
export const metadata = {
  title: '[Artikel Titel] | TOGwaarde.nl',
  description: '[150 karakter beschrijving met keywords]',
  keywords: '[keyword1, keyword2, keyword3]',
  openGraph: {
    title: '[Artikel Titel]',
    description: '[Beschrijving]',
    url: 'https://togwaarde.nl/kennisbank/[slug]',
    images: ['/og-image.jpg'],
  }
}
```

**2. JSON-LD Schema**
```jsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Artikel Titel]",
  "description": "[Beschrijving]",
  "author": {
    "@type": "Organization",
    "name": "TOGwaarde.nl"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TOGwaarde.nl",
    "logo": {
      "@type": "ImageObject",
      "url": "https://togwaarde.nl/logo.png"
    }
  },
  "datePublished": "2025-11-08",
  "dateModified": "2025-11-08"
}
</script>
```

**3. Canonical URLs**
```jsx
<link rel="canonical" href="https://togwaarde.nl/kennisbank/[slug]" />
```

---

## ✅ STAP 7: INTERNE LINKING MATRIX

### Elk artikel linkt naar:

**Pillar Page:**
- Altijd link naar `/tog-waarde-gids` in breadcrumbs
- CTA button in sidebar

**Related Articles (3-4 per artikel):**

| Artikel | Link naar |
|---------|-----------|
| 1. Wat is TOG | 2. Berekenen, 3. Temperatuur, 4. Winter |
| 2. Berekenen | 1. Wat is, 3. Temperatuur, 10. Controleren |
| 3. Temperatuur | 1. Wat is, 2. Berekenen, 4. Winter, 5. Zomer |
| 4. Winter | 3. Temperatuur, 7. Kleding, 11. Premature |
| 5. Zomer | 3. Temperatuur, 9. Warmtestuwing, 10. Check |
| 6. Koopgids | 7. Kleding, 4. Winter, 5. Zomer |
| 7. Kleding | 6. Koopgids, 2. Berekenen, 4. Winter |
| 8. Wiegendood | 9. Warmtestuwing, 10. Check, 3. Temperatuur |
| 9. Warmtestuwing | 8. Wiegendood, 5. Zomer, 10. Check |
| 10. Controleren | 2. Berekenen, 9. Warmtestuwing, 11. Premature |
| 11. Premature | 4. Winter, 10. Check, 3. Temperatuur |
| 12. Inbakeren | 1. Wat is, 8. Wiegendood, 10. Check |

**Calculator links:**
- Elke artikel heeft CTA naar `/` (calculator)

---

## ✅ STAP 8: TESTING CHECKLIST

### Voor deployment test:

**Desktop:**
- [ ] Navigatie werkt (menu items klikbaar)
- [ ] Pillar page laadt correct
- [ ] Alle 12 artikel pagina's bestaan
- [ ] Breadcrumbs werken
- [ ] Interne links klikken door
- [ ] Table of contents scrollt naar secties
- [ ] Related articles tonen juiste links

**Mobile:**
- [ ] Menu hamburger werkt
- [ ] Artikelen leesbaar (geen horizontal scroll)
- [ ] Touch targets groot genoeg
- [ ] Sidebar verplaatst onder content

**SEO:**
- [ ] Alle pages hebben unique title tags
- [ ] Meta descriptions aanwezig
- [ ] Canonical URLs correct
- [ ] JSON-LD schema valide
- [ ] Breadcrumb schema aanwezig

**Performance:**
- [ ] Lighthouse score > 90
- [ ] Images geoptimaliseerd
- [ ] No console errors
- [ ] Fast page loads (< 2s)

---

## 🎯 PRIORITEIT VOLGORDE

### Week 1: Foundation
1. ✅ **STAP 1:** Menu aanpassen (Header.jsx)
2. ✅ **STAP 2:** Pillar page maken
3. ✅ **STAP 4:** Article template maken

### Week 2: Content
4. ✅ **STAP 5:** Eerste 6 artikelen (Foundation + Seasonal)
5. ✅ **STAP 3:** Kennisbank update

### Week 3: Content Afmaken
6. ✅ **STAP 5:** Laatste 6 artikelen (Commercial + Safety)
7. ✅ **STAP 7:** Interne linking toevoegen

### Week 4: Polish
8. ✅ **STAP 6:** SEO optimalisatie
9. ✅ **STAP 8:** Testing & fixes
10. ✅ **Launch!** 🚀

---

## 📝 COPY-PASTE CHECKLIST VOOR CLAUDE CODE

**Geef aan Claude Code:**

```
Implementeer togwaarde.nl pillar page strategie volgens IMPLEMENTATIE-TODO-PILLAR-PAGE.md

Specifieke taken:
1. Pas app/components/Header.jsx aan (navigatie update)
2. Maak app/tog-waarde-gids/page.jsx (pillar page)
3. Update app/kennisbank/page.jsx (12 artikel cards)
4. Maak artikel template en gebruik voor alle 12 artikelen
5. Voeg markdown content toe uit /mnt/project/artikel-XX-*.md bestanden
6. Implementeer interne linking volgens linking matrix
7. Voeg SEO metadata toe aan elke pagina
8. Test alle routes en links

Gebruik bestaande styling van flesvoedingcalculator.nl structuur.
Behoud Layout component en Tailwind classes.
```

---

## 🆘 TROUBLESHOOTING

### "Route niet gevonden"
**Fix:** Check of folder structuur klopt: `app/kennisbank/[artikel-naam]/page.jsx`

### "Styling werkt niet"
**Fix:** Importeer lucide-react icons bovenaan component

### "Links broken"
**Fix:** Gebruik Link van next/link, niet <a> tags

### "Menu niet update"
**Fix:** Server restart nodig na Header.jsx wijziging

### "SEO metadata niet zichtbaar"
**Fix:** export const metadata moet BUITEN component

---

## 📚 REFERENTIES

**Artikelen in project:**
- `/mnt/project/artikel-01-wat-is-tog-waarde.md` t/m 12
- `/mnt/project/complete-review-alle-artikelen.md`

**Styling referentie:**
- flesvoedingcalculator.nl Header.jsx
- flesvoedingcalculator.nl kennisbank page.jsx

**Icons library:**
- lucide-react: https://lucide.dev/

---

## ✅ SUCCESS CRITERIA

**✓ Menu heeft "TOG-waarde Gids" item**  
**✓ Pillar page is live op /tog-waarde-gids**  
**✓ Alle 12 artikelen zijn live**  
**✓ Kennisbank toont alle artikelen**  
**✓ Interne linking werkt**  
**✓ SEO metadata compleet**  
**✓ Mobile responsive**  
**✓ No console errors**

---

**KLAAR VOOR IMPLEMENTATIE!** 🚀

*Voor vragen of problemen: check troubleshooting sectie of vraag om hulp.*
