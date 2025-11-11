'use client'
import React, { useState, useEffect } from 'react'
import {
  Thermometer,
  Moon,
  Sun,
  Snowflake,
  AlertTriangle,
  Check,
  Info,
  ChevronDown,
  LeafyGreen,
  Flower,
  Layers,
  HelpCircle
} from 'lucide-react'

// TOG waarden voor kledinglagen - GESCHATTE WAARDEN (geen industrie-standaard)
const kledingWaarden = {
  'luier': { TOG: 0.1, naam: 'Alleen luier', info: 'Geschatte waarde' },
  'korte_romper': { TOG: 0.2, naam: 'Korte mouw romper', info: 'Geschatte waarde' },
  'lange_romper': { TOG: 0.4, naam: 'Lange mouw romper', info: 'Geschatte waarde' },
  'dun_slaappak': { TOG: 0.6, naam: 'Dun slaappakje', info: 'Geschatte waarde' },
  'dik_slaappak': { TOG: 0.9, naam: 'Dik slaappakje', info: 'Geschatte waarde' },
  'vestje': { TOG: 0.3, naam: 'Vestje', info: 'Geschatte waarde' },
  'sokjes': { TOG: 0.1, naam: 'Sokjes', info: 'Geschatte waarde' }
}

// Deken waarden - Met onderscheid tussen ingestopt en los
const dekenWaarden = {
  'ingestopt_laken': { TOG: 0.3, naam: 'Ingestopt lakentje', info: 'Veilig indien goed ingestopt' },
  'ingestopt_katoen': { TOG: 0.5, naam: 'Ingestopte katoenen deken', info: 'Stevig onder armen instoppen' },
  'ingestopt_muslin': { TOG: 0.8, naam: 'Ingestopte hydrofiele deken', info: 'Lichtgewicht, ademend' },
  'los_deken': { TOG: 1.5, naam: 'Losse deken (12+ mnd)', info: 'ALLEEN voor 12+ maanden!' }
}

// Functie om seizoen te bepalen op basis van huidige datum
const getHuidigSeizoen = () => {
  const maand = new Date().getMonth() + 1 // 1-12
  if (maand >= 3 && maand <= 5) return 'lente'
  if (maand >= 6 && maand <= 8) return 'zomer'
  if (maand >= 9 && maand <= 11) return 'herfst'
  return 'winter'
}

// Functie om geschatte buitentemperatuur te bepalen (fallback)
const getGeschatteBuitenTemp = () => {
  const seizoen = getHuidigSeizoen()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Detecteer of gebruiker in Nederland/België is (CET timezone)
  const isNederlands = timezone.includes('Amsterdam') || timezone.includes('Brussels') || timezone.includes('Europe')

  if (!isNederlands) {
    // Voor andere locaties: algemene schatting op basis van seizoen
    const temps = { lente: 12, zomer: 22, herfst: 10, winter: 4 }
    return temps[seizoen]
  }

  // Voor Nederland: specifiekere schatting op basis van seizoen en maand
  const maand = new Date().getMonth() + 1

  if (seizoen === 'winter') {
    if (maand === 12) return 5
    if (maand === 1) return 3
    return 4 // februari
  }
  if (seizoen === 'lente') {
    if (maand === 3) return 8
    if (maand === 4) return 11
    return 15 // mei
  }
  if (seizoen === 'zomer') {
    if (maand === 6) return 18
    if (maand === 7) return 20
    return 19 // augustus
  }
  // herfst
  if (maand === 9) return 16
  if (maand === 10) return 12
  return 7 // november
}

// Functie om coördinaten te krijgen op basis van timezone
const getCoordinatesFromTimezone = (timezone) => {
  // Mapping van timezones naar hoofdsteden/centrale locaties
  const timezoneCoords = {
    'Europe/Amsterdam': { lat: 52.37, lon: 4.89, city: 'Nederland' },
    'Europe/Brussels': { lat: 50.85, lon: 4.35, city: 'België' },
    'Europe/Berlin': { lat: 52.52, lon: 13.40, city: 'Duitsland' },
    'Europe/Paris': { lat: 48.85, lon: 2.35, city: 'Frankrijk' },
    'Europe/London': { lat: 51.51, lon: -0.13, city: 'VK' },
    'Europe/Madrid': { lat: 40.42, lon: -3.70, city: 'Spanje' },
    'Europe/Rome': { lat: 41.90, lon: 12.50, city: 'Italië' },
    'America/New_York': { lat: 40.71, lon: -74.01, city: 'New York' },
    'America/Los_Angeles': { lat: 34.05, lon: -118.24, city: 'Los Angeles' },
    'America/Chicago': { lat: 41.88, lon: -87.63, city: 'Chicago' },
    'Asia/Tokyo': { lat: 35.68, lon: 139.65, city: 'Tokyo' },
    'Australia/Sydney': { lat: -33.87, lon: 151.21, city: 'Sydney' },
  }

  // Probeer exacte match
  if (timezoneCoords[timezone]) {
    return timezoneCoords[timezone]
  }

  // Probeer gedeeltelijke match voor Europe timezones
  if (timezone.startsWith('Europe/')) {
    return { lat: 52.37, lon: 4.89, city: 'Europa' }
  }
  if (timezone.startsWith('America/')) {
    return { lat: 40.71, lon: -74.01, city: 'VS' }
  }
  if (timezone.startsWith('Asia/')) {
    return { lat: 35.68, lon: 139.65, city: 'Azië' }
  }
  if (timezone.startsWith('Australia/')) {
    return { lat: -33.87, lon: 151.21, city: 'Australië' }
  }

  // Default naar Amsterdam
  return { lat: 52.37, lon: 4.89, city: 'Nederland' }
}

export default function UltimateTOGCalculator() {
  // Bepaal seizoen en buitentemp dynamisch
  const huidigSeizoen = getHuidigSeizoen()
  const geschatteBuitenTemp = getGeschatteBuitenTemp()

  // State management
  const [kamerTemp, setKamerTemp] = useState(19)
  const [slaapzakTOG, setSlaapzakTOG] = useState(1.0)
  const [gekozenKleding, setGekozenKleding] = useState(['luier', 'lange_romper'])
  const [gekozenDekens, setGekozenDekens] = useState([])
  const [babyLeeftijd, setBabyLeeftijd] = useState('12+')
  const [seizoen, setSeizoen] = useState(huidigSeizoen)
  const [buitenTemp, setBuitenTemp] = useState(geschatteBuitenTemp)
  const [locationCity, setLocationCity] = useState('')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [gebruikDekens, setGebruikDekens] = useState(false)

  // Fetch night temperature based on actual location (via IP geolocation)
  useEffect(() => {
    const fetchNightTemp = async () => {
      try {
        // Stap 1: Probeer eerst echte locatie via IP-geolocation
        let lat, lon, city, countryCode

        try {
          // ipapi.co - gratis, geen API key, 1000 requests/dag
          const geoResponse = await fetch('https://ipapi.co/json/')
          const geoData = await geoResponse.json()

          if (geoData.latitude && geoData.longitude) {
            lat = geoData.latitude
            lon = geoData.longitude
            countryCode = geoData.country_code

            // Voor Nederland: bepaal Noord of Zuid
            if (countryCode === 'NL') {
              // Grens ongeveer bij Utrecht (52.09°N)
              if (lat >= 52.09) {
                city = 'Noord-Nederland'
              } else {
                city = 'Zuid-Nederland'
              }
            } else if (countryCode === 'BE') {
              // Voor België: Vlaanderen vs Wallonië
              if (lat >= 50.8) {
                city = 'Noord-België'
              } else {
                city = 'Zuid-België'
              }
            } else {
              // Voor andere landen: gebruik stad of regio
              city = geoData.city || geoData.region || geoData.country_name || ''
            }

            console.log('Locatie gevonden via IP:', city, `(${lat.toFixed(2)}°N)`)
          } else {
            throw new Error('Geen geolocatie data')
          }
        } catch (geoError) {
          console.log('IP geolocation fallback naar timezone:', geoError)
          // Fallback naar timezone-gebaseerde schatting
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
          const location = getCoordinatesFromTimezone(timezone)
          lat = location.lat
          lon = location.lon
          city = location.city
        }

        setLocationCity(city)

        // Stap 2: Haal nachttemperatuur op basis van coördinaten
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&forecast_days=2`
        )
        const data = await response.json()

        if (data.hourly && data.hourly.temperature_2m) {
          // Vind temperaturen voor komende nacht (20:00 - 06:00)
          const now = new Date()
          const currentHour = now.getHours()

          // Als het voor 06:00 's ochtends is, gebruik huidige nacht
          // Anders gebruik volgende nacht
          let nightStartIndex = currentHour < 6 ? 20 : 44 // 44 = volgende dag 20:00

          // Pak temperaturen van 20:00 tot 06:00 (10 uur)
          const nightTemps = data.hourly.temperature_2m.slice(nightStartIndex, nightStartIndex + 10)

          // Bereken gemiddelde nachttemperatuur
          const avgNightTemp = Math.round(
            nightTemps.reduce((sum, temp) => sum + temp, 0) / nightTemps.length
          )

          setBuitenTemp(avgNightTemp)
        }
      } catch (error) {
        console.error('Fout bij ophalen temperatuur:', error)
        // Gebruik fallback bij fout
        setBuitenTemp(geschatteBuitenTemp)
      }
    }

    fetchNightTemp()
  }, []) // Alleen bij mount

  // Clear loose blanket selection if age changes to under 12 months
  useEffect(() => {
    if (babyLeeftijd !== '12+' && gekozenDekens.includes('los_deken')) {
      setGekozenDekens(gekozenDekens.filter(d => d !== 'los_deken'))
    }
  }, [babyLeeftijd, gekozenDekens])

  // VERBETERDE TOG aanbevelingen op basis van onderzoek (NHS/Lullaby Trust)
  const berekenAanbevolenTOG = (temp) => {
    if (temp >= 24) return { min: 0.2, ideal: 0.5, max: 0.5 }
    if (temp >= 22) return { min: 0.5, ideal: 0.8, max: 1.0 }
    if (temp >= 20) return { min: 1.0, ideal: 1.2, max: 2.5 }
    if (temp >= 18) return { min: 2.5, ideal: 2.5, max: 2.5 } // AANGEPAST - NHS/Lullaby Trust
    if (temp >= 16) return { min: 2.5, ideal: 2.5, max: 3.5 }
    return { min: 3.5, ideal: 3.5, max: 3.5 }
  }

  // Bereken huidige TOG van kleding
  const berekenKledingTOG = () => {
    const kledingTOG = gekozenKleding.reduce((totaal, item) => {
      return totaal + (kledingWaarden[item]?.TOG || 0)
    }, 0)
    const dekenTOG = gekozenDekens.reduce((totaal, item) => {
      return totaal + (dekenWaarden[item]?.TOG || 0)
    }, 0)
    return kledingTOG + dekenTOG
  }

  const aanbevolenTOGRange = berekenAanbevolenTOG(kamerTemp)
  const kledingTOG = berekenKledingTOG()
  const totaleTOG = gebruikDekens ? kledingTOG : slaapzakTOG + kledingTOG

  // Bepaal status met verbeterde logica
  let status = 'perfect'
  let statusKleur = 'green'
  let statusTekst = 'Perfect! Ideale warmte voor je baby.'
  let statusIcon = <Check className="w-5 h-5" />

  if (totaleTOG < aanbevolenTOGRange.min) {
    const verschil = aanbevolenTOGRange.min - totaleTOG
    if (verschil > 0.5) {
      status = 'te_koud'
      statusKleur = 'red'
      statusIcon = <AlertTriangle className="w-5 h-5" />
      statusTekst = kamerTemp < 16
        ? 'Te koud! Verhoog de kamertemperatuur naar minimaal 16°C en voeg warmere lagen toe.'
        : 'Te koud! Voeg warmere lagen toe voor comfort.'
    } else {
      status = 'iets_te_koud'
      statusKleur = 'orange'
      statusIcon = <Info className="w-5 h-5" />
      statusTekst = kamerTemp < 16
        ? 'Kamertemperatuur te laag. Verhoog naar minimaal 16°C en overweeg een extra laagje.'
        : 'Iets te koud. Overweeg een extra laagje.'
    }
  } else if (totaleTOG > aanbevolenTOGRange.max) {
    const verschil = totaleTOG - aanbevolenTOGRange.max
    if (verschil > 0.5) {
      status = 'te_warm'
      statusKleur = 'red'
      statusIcon = <AlertTriangle className="w-5 h-5" />
      statusTekst = 'Te warm! Verwijder lagen om oververhitting te voorkomen.'
    } else {
      status = 'iets_te_warm'
      statusKleur = 'orange'
      statusIcon = <Info className="w-5 h-5" />
      statusTekst = 'Iets te warm. Overweeg een lichtere slaapzak of minder lagen.'
    }
  }

  const toggleKleding = (item) => {
    if (gekozenKleding.includes(item)) {
      setGekozenKleding(gekozenKleding.filter(k => k !== item))
    } else {
      setGekozenKleding([...gekozenKleding, item])
    }
  }

  const toggleDeken = (item) => {
    if (gekozenDekens.includes(item)) {
      setGekozenDekens(gekozenDekens.filter(d => d !== item))
    } else {
      setGekozenDekens([...gekozenDekens, item])
    }
  }

  // Get season icon
  const getSeasonIcon = () => {
    switch(seizoen) {
      case 'winter': return <Snowflake className="w-5 h-5 text-secondary-dark" />
      case 'zomer': return <Sun className="w-5 h-5 text-primary" />
      case 'herfst': return <LeafyGreen className="w-5 h-5 text-primary/40" />
      case 'lente': return <Flower className="w-5 h-5 text-primary" />
      default: return <Sun className="w-5 h-5 text-secondary-dark" />
    }
  }

  return (
    <div className="mx-auto px-4 py-6 bg-white rounded-3xl">
        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4 text-text-primary">Over TOG-waarden</h3>

              <div className="space-y-4 text-sm text-text-secondary-dark">
                <div className="relative p-4 rounded-lg bg-background pl-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                  <p className="font-semibold text-primary/80 mb-2">Belangrijke informatie:</p>
                  <p>De TOG-waarden voor individuele kledingstukken in deze calculator zijn <strong>schattingen</strong>.
                  De industrie kent alleen officiële TOG-waarden toe aan slaapzakken en inbakerdoeken, niet aan rompers, luiers of sokjes.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Wat is TOG?</h4>
                  <p>TOG staat voor "Thermal Overall Grade" - een maat voor thermische isolatie.
                  Één TOG = 0.1 m²·K/W warmteweerstand.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Officiële aanbevelingen:</h4>
                  <ul className="space-y-1">
                    <li>• <strong>24°C+:</strong> 0.2-0.5 TOG</li>
                    <li>• <strong>22-24°C:</strong> 0.5-1.0 TOG</li>
                    <li>• <strong>20-22°C:</strong> 1.0-2.5 TOG</li>
                    <li>• <strong>18-20°C:</strong> 2.5 TOG (NHS/Lullaby Trust)</li>
                    <li>• <strong>16-18°C:</strong> 2.5-3.5 TOG</li>
                    <li>• <strong>&lt;16°C:</strong> 3.5 TOG maximum</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Dekens & Veiligheid:</h4>
                  <ul className="space-y-1">
                    <li>• <strong className="text-primary">Losse dekens:</strong> Alleen voor 12+ maanden (niet aanbevolen)</li>
                    <li>• <strong className="text-secondary-dark">Ingestopte dekens:</strong> Toegestaan mits correct gedaan</li>
                    <li>• <strong>"Feet to foot" methode:</strong> Voetjes aan voeteneind, deken onder armen</li>
                    <li>• <strong>Slaapzakken:</strong> Vanaf 50cm voor newborns beschikbaar</li>
                    <li>• <strong>Altijd veiliger:</strong> Slaapzak boven dekens verkiezen</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Veilig instoppen instructie:</h4>
                  <ol className="space-y-1 list-decimal list-inside text-sm">
                    <li>Leg baby met voetjes aan voeteneind bedje</li>
                    <li>Gebruik lichtgewicht deken(s)</li>
                    <li>Trek deken tot schouders/oksels (niet hoger!)</li>
                    <li>Stop deken stevig onder matras aan beide zijden</li>
                    <li>Controleer of deken niet omhoog kan schuiven</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Bronnen:</h4>
                  <p>NHS (UK), The Lullaby Trust, American Academy of Pediatrics (AAP), Red Nose Australia</p>
                </div>

                <div className="relative p-4 rounded-lg bg-blue-50 pl-6 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500">
                  <p className="font-semibold text-blue-800 mb-2">Advies:</p>
                  <p>Gebruik deze calculator als richtlijn, maar vertrouw vooral op je eigen observatie.
                  Controleer regelmatig de nek en borst van je baby op tekenen van oververhitting of onderkoeling.</p>
                </div>
              </div>

              <button
                onClick={() => setShowInfoModal(false)}
                className="mt-6 w-full py-3 bg-primary text-white rounded-lg font-semibold"
              >
                Sluiten
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {/* Weather & Room Info Card */}
            <div className="rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">
                  Kamer Informatie
                </h2>
                <span className="text-2xl font-bold text-primary">{kamerTemp}°C</span>
              </div>

              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border">
                <div className="text-center">
                  <Thermometer className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-xl font-bold">{kamerTemp}°C</div>
                  <div className="text-xs text-text-secondary-dark">Binnen</div>
                </div>
                <div className="text-center border-x border-border">
                  <Moon className="w-5 h-5 mx-auto mb-1 text-secondary-dark" />
                  <div className="text-xl font-bold">{buitenTemp}°C</div>
                  <div className="text-xs text-text-secondary-dark">
                    {locationCity ? `Vannacht in ${locationCity}` : 'Vannacht'}
                  </div>
                </div>
                <div className="text-center relative">
                  <div className="mx-auto mb-1 flex justify-center">{getSeasonIcon()}</div>
                  <select
                    value={seizoen}
                    onChange={(e) => setSeizoen(e.target.value)}
                    className="text-xl font-bold capitalize bg-transparent border-0 appearance-none cursor-pointer focus:outline-none text-center w-full px-4"
                    style={{ textAlignLast: 'center' }}
                  >
                    <option value="winter">Winter</option>
                    <option value="lente">Lente</option>
                    <option value="zomer">Zomer</option>
                    <option value="herfst">Herfst</option>
                  </select>
                  <ChevronDown className="absolute right-1 top-[26px] w-4 h-4 pointer-events-none text-text-secondary-dark" />
                  <div className="text-xs text-text-secondary-dark">Seizoen</div>
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3 text-text-primary">
                  Kamertemperatuur instellen
                </label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={kamerTemp}
                  onChange={(e) => setKamerTemp(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-secondary via-primary to-accent"
                />
                <div className="flex justify-between mt-2 text-xs text-text-secondary-dark">
                  <span className="flex items-center gap-1"><Snowflake className="w-3 h-3" /> 14°C</span>
                  <span className="font-bold text-primary">Ideaal: 18-22°C (AAP: 20-22°C)</span>
                  <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> 28°C</span>
                </div>
              </div>

              {/* Temperature Warning - UPDATED */}
              {kamerTemp < 16 && (
                <div className="relative mt-4 p-3 pl-5 rounded-lg flex items-start gap-2 bg-blue-50 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500">
                  <Snowflake className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <p className="text-sm text-text-primary">Kamertemperatuur is lager dan aanbevolen (16-20°C). Gebruik 3.5 TOG slaapzak met warme kleding.</p>
                </div>
              )}
              {kamerTemp > 24 && (
                <div className="relative mt-4 p-3 pl-5 rounded-lg flex items-start gap-2 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/80" />
                  <p className="text-sm text-text-primary">Kamertemperatuur is hoog. Risico op oververhitting! Gebruik maximaal 0.5 TOG.</p>
                </div>
              )}
            </div>

            {/* Clothing Layers Card - UPDATED */}
            <div className="rounded-2xl p-6 -mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold font-poppins text-text-primary">
                  <Layers className="inline-block w-5 h-5 mr-2 text-primary" />
                  Kledinglagen
                </h2>
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Info over TOG-waarden"
                >
                  <HelpCircle className="w-5 h-5 text-text-secondary-dark" />
                </button>
              </div>

              {/* Info Alert */}
              <div className="relative mb-4 p-4 pl-5 rounded-xl flex items-start gap-3 bg-background overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary">
                <Info className="w-5 h-5 text-primary/80 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1 text-text-primary">Let op</div>
                  <div className="text-sm text-text-secondary-dark">
                    TOG-waarden voor kleding zijn schattingen. Alleen slaapzakken hebben officiële TOG-ratings.
                  </div>
                </div>
              </div>

              {/* Slaapzak of Dekens keuze */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-text-primary">
                    {gebruikDekens ? 'Dekens & Lakens' : 'Slaapzak TOG waarde (officiële rating)'}
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gebruikDekens}
                      onChange={(e) => {
                        setGebruikDekens(e.target.checked)
                        if (e.target.checked) {
                          setSlaapzakTOG(0)
                        } else {
                          setGekozenDekens([])
                          setSlaapzakTOG(1.0)
                        }
                      }}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-text-secondary-dark">Gebruik dekens</span>
                  </label>
                </div>

                {!gebruikDekens ? (
                  <div className="grid grid-cols-5 gap-2">
                    {[0.2, 0.5, 1.0, 2.5, 3.5].map(tog => (
                      <button
                        key={tog}
                        onClick={() => setSlaapzakTOG(tog)}
                        className={`py-3 px-2 rounded-lg font-semibold text-sm transition-all border-2 ${
                          slaapzakTOG === tog ? 'bg-primary text-white border-primary' : 'bg-primary/10 text-gray-700 border-transparent'
                        }`}
                      >
                        {tog}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Veiligheidsinformatie op basis van leeftijd */}
                    {(babyLeeftijd === '0-3' || babyLeeftijd === '3-6' || babyLeeftijd === '6-12') ? (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(dekenWaarden).filter(([key]) => !key.includes('los')).map(([item, info]) => {
                            const isSelected = gekozenDekens.includes(item)

                            return (
                              <button
                                key={item}
                                onClick={() => toggleDeken(item)}
                                className={`p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] bg-background border-2 ${
                                  isSelected ? 'border-primary' : 'border-transparent'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-text-primary">
                                      {info.naam}
                                    </div>
                                    <div className="text-xs text-text-secondary-dark">
                                      ±{info.TOG} TOG - {info.info}
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-5 h-5 flex-shrink-0 ml-2 text-primary" />
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(dekenWaarden).map(([item, info]) => {
                            const isSelected = gekozenDekens.includes(item)

                            return (
                              <button
                                key={item}
                                onClick={() => toggleDeken(item)}
                                className={`p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] bg-background border-2 ${
                                  isSelected ? 'border-primary' : 'border-transparent'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-text-primary">
                                      {info.naam}
                                    </div>
                                    <div className="text-xs text-text-secondary-dark">
                                      ±{info.TOG} TOG - {info.info}
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-5 h-5 flex-shrink-0 ml-2 text-primary" />
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Clothing Items */}
              <label className="block text-sm font-medium mb-3 text-text-primary">
                Kleding {gebruikDekens ? 'onder dekens' : 'onder slaapzak'} (geschatte waarden)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(kledingWaarden).map(([item, info]) => {
                  const isSelected = gekozenKleding.includes(item)

                  return (
                    <button
                      key={item}
                      onClick={() => toggleKleding(item)}
                      className={`p-4 rounded-xl text-left transition-all transform hover:scale-[1.02] bg-background border-2 ${
                        isSelected ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-text-primary">
                            {info.naam}
                          </div>
                          <div className="text-xs text-text-secondary-dark">
                            ±{info.TOG} TOG
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 flex-shrink-0 ml-2 text-primary" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {/* TOG Analysis Card */}
            <div className="rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 font-poppins text-text-primary">
                <Info className="inline-block w-5 h-5 mr-2 text-primary" />
                TOG Analyse
              </h2>

              {/* Status Alert */}
              <div
                className={`relative p-4 pl-5 rounded-xl mb-8 flex items-start gap-3 overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${
                  statusKleur === 'green' ? 'bg-green-50 before:bg-green-500' :
                  statusKleur === 'orange' ? 'bg-background before:bg-primary' : 'bg-primary/10 before:bg-primary/100'
                }`}
              >
                <div className={statusKleur === 'green' ? 'text-green-500' : statusKleur === 'orange' ? 'text-primary/80' : 'text-primary'}>
                  {statusIcon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1 text-text-primary">
                    {status === 'perfect' ? 'Perfect!' :
                     status.includes('iets') ? 'Let op' : 'Aanpassing nodig'}
                  </div>
                  <div className="text-sm text-text-secondary-dark">
                    {statusTekst}
                  </div>
                </div>
              </div>

              {/* Gecombineerde TOG Vergelijking */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/20 to-blue-50 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-text-secondary-dark mb-1">Jouw TOG</div>
                    <div className="text-3xl font-bold text-primary">
                      {totaleTOG.toFixed(1)}
                    </div>
                    <div className="text-xs text-text-secondary-dark mt-1">
                      huidige combinatie
                    </div>
                  </div>

                  <div className="px-4">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                  </div>

                  <div className="flex-1 text-right">
                    <div className="text-sm font-medium text-text-secondary-dark mb-1">Aanbevolen TOG</div>
                    <div className="text-3xl font-bold text-secondary-dark">
                      {aanbevolenTOGRange.min === aanbevolenTOGRange.max
                        ? aanbevolenTOGRange.ideal.toFixed(1)
                        : `${aanbevolenTOGRange.min.toFixed(1)} - ${aanbevolenTOGRange.max.toFixed(1)}`}
                    </div>
                    <div className="text-xs text-secondary-dark mt-1">
                      voor {kamerTemp}°C
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-green-200/50">
                  <div className="text-xs text-center text-text-secondary-dark">
                    Kleding: ±{gekozenKleding.reduce((t, i) => t + (kledingWaarden[i]?.TOG || 0), 0).toFixed(1)}
                    {gekozenDekens.length > 0 && ` + Dekens: ±${gekozenDekens.reduce((t, i) => t + (dekenWaarden[i]?.TOG || 0), 0).toFixed(1)}`}
                    {!gebruikDekens && ` + Slaapzak: ${slaapzakTOG}`} = {totaleTOG.toFixed(1)} TOG
                  </div>
                  <div className="text-[10px] text-center text-gray-500 mt-1">
                    NHS/Lullaby Trust richtlijnen
                  </div>
                </div>
              </div>

              {/* Visual Baby Layers */}
              <div className="mt-6 rounded-xl bg-background h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-[140px] h-[180px] mx-auto">
                    {/* Baby core - always visible */}
                    <div className="absolute inset-[60px_50px] bg-accent rounded-full transition-all duration-300"></div>

                    {/* Dynamically render layers based on selected clothing */}
                    {gekozenKleding.map((item, index) => {
                      const insetVertical = 60 - ((index + 1) * 15);
                      const insetHorizontal = 50 - ((index + 1) * 12);
                      const opacity = 0.3 + (index * 0.1);
                      return (
                        <div
                          key={item}
                          className="absolute rounded-full transition-all duration-300"
                          style={{
                            top: `${insetVertical}px`,
                            bottom: `${insetVertical}px`,
                            left: `${insetHorizontal}px`,
                            right: `${insetHorizontal}px`,
                            background: index % 2 === 0 ? `rgba(180, 196, 174, ${opacity})` : `rgba(232, 93, 66, ${opacity})`
                          }}
                        ></div>
                      );
                    })}

                    {/* Slaapzak - outer layer based on TOG value */}
                    <div
                      className="absolute inset-0 rounded-full transition-all duration-300"
                      style={{
                        background: slaapzakTOG >= 2.5 ? 'rgba(180, 196, 174, 0.5)' : slaapzakTOG >= 1.5 ? 'rgba(180, 196, 174, 0.4)' : 'rgba(180, 196, 174, 0.3)'
                      }}
                    ></div>

                    {/* Dekens - outermost layers if selected */}
                    {gekozenDekens.length > 0 && gekozenDekens.map((deken, index) => (
                      <div
                        key={deken}
                        className="absolute rounded-full transition-all duration-300"
                        style={{
                          inset: `${-2 - (index * 3)}px`,
                          background: `rgba(139, 69, 19, ${0.2 + (dekenWaarden[deken]?.TOG || 0) * 0.1})`,
                          border: '2px dashed rgba(139, 69, 19, 0.4)'
                        }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary-dark mt-4">
                    Totale TOG: <span className="font-bold text-primary">{totaleTOG.toFixed(1)}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {gekozenKleding.length} kledingla{gekozenKleding.length === 1 ? 'ag' : 'gen'}
                    {gekozenDekens.length > 0 && ` + ${gekozenDekens.length} deken${gekozenDekens.length === 1 ? '' : 's'}`}
                    {!gebruikDekens && ` + ${slaapzakTOG} TOG slaapzak`}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      {/* Footer Disclaimer - UPDATED */}
      <div className="mt-8 p-6 rounded-2xl text-center bg-gray-50">
        <p className="text-sm text-text-secondary-dark mb-2">
          <strong className="text-text-primary">Disclaimer:</strong> Deze calculator geeft algemene adviezen op basis van richtlijnen van NHS, Lullaby Trust, AAP en Red Nose Australia.
          De TOG-waarden voor individuele kledingstukken en dekens zijn schattingen, niet industrie-standaarden.
        </p>
        <p className="text-sm text-text-secondary-dark mb-2">
          <strong className="text-primary/80">Dekenveiligheid:</strong> Losse dekens zijn gevaarlijk voor baby's onder 12 maanden.
          Indien dekens gebruikt worden, moeten ze volgens de "feet to foot" methode stevig ingestopt worden.
          Slaapzakken (vanaf 50cm voor newborns) zijn altijd de veiligere keuze.
        </p>
        <p className="text-sm text-text-secondary-dark">
          Raadpleeg bij twijfel altijd je kinderarts of consultatiebureau. Elke baby is uniek en heeft mogelijk andere behoeften.
          Vertrouw op je eigen observatie en pas aan waar nodig.
        </p>
      </div>
    </div>
  )
}
