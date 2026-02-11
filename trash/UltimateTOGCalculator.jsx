'use client'
import React, { useState, useEffect } from 'react'
import { 
  Thermometer, 
  Baby, 
  Moon, 
  Sun, 
  Snowflake,
  AlertTriangle,
  Check,
  Info,
  ChevronDown,
  Shield,
  Award,
  Heart,
  Layers
} from 'lucide-react'

// Nederlandse productdatabase
const productDatabase = [
  { merk: "HEMA", naam: "Basis Slaapzak", TOG: 0.5, prijs: 19.99, seizoen: "zomer", getest: true, material: "Katoen" },
  { merk: "Jollein", naam: "4-Seizoenen Slaapzak", TOG: 1.0, prijs: 42.95, seizoen: "mild", getest: true, material: "Jersey" },
  { merk: "Puckababy", naam: "The Bag Newborn", TOG: 1.5, prijs: 59.95, seizoen: "herfst", getest: true, material: "Bamboe/Tencel" },
  { merk: "HEMA", naam: "Winter Slaapzak", TOG: 2.5, prijs: 34.99, seizoen: "winter", getest: true, material: "Katoen gevoerd" },
  { merk: "Lodger", naam: "Hopper Empire", TOG: 2.5, prijs: 54.95, seizoen: "winter", getest: false, material: "Fleece" },
  { merk: "VanZus", naam: "Bamboe Slaapzak", TOG: 0.5, prijs: 39.95, seizoen: "zomer", getest: false, material: "Bamboe" },
  { merk: "Jollein", naam: "Winter Slaapzak", TOG: 3.5, prijs: 69.95, seizoen: "winter", getest: true, material: "Gewatteerd" },
  { merk: "Prenatal", naam: "Basic Slaapzak", TOG: 1.5, prijs: 24.99, seizoen: "herfst", getest: false, material: "Katoen" }
];

// TOG waarden voor kledinglagen
const kledingWaarden = {
  'luier': { TOG: 0.1, naam: 'Alleen luier', icon: '🩲' },
  'korte_romper': { TOG: 0.2, naam: 'Korte mouw romper', icon: '👕' },
  'lange_romper': { TOG: 0.4, naam: 'Lange mouw romper', icon: '👔' },
  'dun_slaappak': { TOG: 0.6, naam: 'Dun slaappakje', icon: '👶' },
  'dik_slaappak': { TOG: 0.9, naam: 'Dik slaappakje', icon: '🧸' },
  'vestje': { TOG: 0.3, naam: 'Vestje', icon: '🧥' },
  'sokjes': { TOG: 0.1, naam: 'Sokjes', icon: '🧦' }
}

export default function UltimateTOGCalculator() {
  // State management
  const [kamerTemp, setKamerTemp] = useState(19)
  const [slaapzakTOG, setSlaapzakTOG] = useState(1.0)
  const [gekozenKleding, setGekozenKleding] = useState(['luier', 'lange_romper'])
  const [babyLeeftijd, setBabyLeeftijd] = useState('3-6')
  const [seizoen, setSeizoen] = useState('winter')
  const [isPremature, setIsPremature] = useState(false)
  const [safetyChecks, setSafetyChecks] = useState({
    neck: false,
    noSweat: false,
    chest: false,
    sleepQuality: false
  })
  const [showProducts, setShowProducts] = useState(false)

  // Bereken aanbevolen TOG op basis van temperatuur
  const berekenAanbevolenTOG = (temp) => {
    if (temp >= 24) return 0.5
    if (temp >= 22) return 0.8
    if (temp >= 20) return 1.2
    if (temp >= 18) return 1.8
    if (temp >= 16) return 2.5
    return 3.5
  }

  // Bereken huidige TOG van kleding
  const berekenKledingTOG = () => {
    return gekozenKleding.reduce((totaal, item) => {
      return totaal + (kledingWaarden[item]?.TOG || 0)
    }, 0)
  }

  const aanbevolenTOG = berekenAanbevolenTOG(kamerTemp)
  const kledingTOG = berekenKledingTOG()
  const totaleTOG = slaapzakTOG + kledingTOG
  const verschil = Math.abs(totaleTOG - aanbevolenTOG)
  
  // Bepaal status
  let status = 'perfect'
  let statusKleur = 'green'
  let statusTekst = 'Perfect! Ideale warmte voor je baby.'
  let statusIcon = <Check className="w-5 h-5" />
  
  if (verschil > 0.8) {
    status = 'gevaarlijk'
    statusKleur = 'red'
    statusIcon = <AlertTriangle className="w-5 h-5" />
    statusTekst = totaleTOG > aanbevolenTOG 
      ? '⚠️ Te warm! Verwijder lagen om oververhitting te voorkomen.'
      : '❄️ Te koud! Voeg warmere lagen toe voor comfort.'
  } else if (verschil > 0.4) {
    status = 'aanpassen'
    statusKleur = 'orange'
    statusIcon = <Info className="w-5 h-5" />
    statusTekst = totaleTOG > aanbevolenTOG 
      ? 'Iets te warm. Overweeg een lichtere slaapzak.'
      : 'Iets te koud. Misschien een extra laagje?'
  }

  // Get clothing recommendations based on temperature
  const getClothingRecommendations = () => {
    if (kamerTemp < 16) {
      return ['Lange mouw romper', 'Warm slaappakje', '3.5 TOG slaapzak']
    } else if (kamerTemp < 18) {
      return ['Lange mouw romper', 'Katoenen slaappakje', '2.5 TOG slaapzak']
    } else if (kamerTemp < 20) {
      return ['Korte mouw romper', 'Licht slaappakje', '1.5 TOG slaapzak']
    } else if (kamerTemp < 22) {
      return ['Korte mouw romper', '1.0 TOG slaapzak']
    } else {
      return ['Alleen romper', '0.5 TOG slaapzak of lakentje']
    }
  }

  // Zoek passende producten
  const geschikteProducten = productDatabase.filter(p => 
    Math.abs(p.TOG - aanbevolenTOG) <= 0.5
  ).slice(0, 3)

  const toggleKleding = (item) => {
    if (gekozenKleding.includes(item)) {
      setGekozenKleding(gekozenKleding.filter(k => k !== item))
    } else {
      setGekozenKleding([...gekozenKleding, item])
    }
  }

  const handleSafetyCheck = (check) => {
    setSafetyChecks(prev => ({ ...prev, [check]: !prev[check] }))
  }

  const allChecksPassed = Object.values(safetyChecks).every(check => check)

  // Get season icon
  const getSeasonIcon = () => {
    switch(seizoen) {
      case 'winter': return <Snowflake className="w-4 h-4" />
      case 'zomer': return <Sun className="w-4 h-4" />
      case 'herfst': return '🍂'
      case 'lente': return '🌸'
      default: return <Sun className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF9F0', fontFamily: "'Lexend Deca', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: '#E8D9C5' }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
                   style={{ background: 'linear-gradient(135deg, #E85D42, #FF6B4A)' }}>
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: '#E85D42', fontFamily: "'Poppins', sans-serif" }}>
                  TOG Waarde Calculator
                </h1>
                <p className="text-xs" style={{ color: '#666666' }}>Veilig slapen voor Nederlandse baby's</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1" 
                    style={{ backgroundColor: '#E8F5E9', color: '#166534' }}>
                <Shield className="w-3 h-3" /> Veilig
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1" 
                    style={{ backgroundColor: '#FFF3CD', color: '#856404' }}>
                <Award className="w-3 h-3" /> CE
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {/* Weather & Room Info Card */}
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                  Kamer Informatie
                </h2>
                <span className="text-2xl font-bold" style={{ color: '#E85D42' }}>{kamerTemp}°C</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pb-4 border-b" style={{ borderColor: '#E8D9C5' }}>
                <div className="text-center">
                  <Thermometer className="w-5 h-5 mx-auto mb-1" style={{ color: '#E85D42' }} />
                  <div className="text-xl font-bold">{kamerTemp}°C</div>
                  <div className="text-xs" style={{ color: '#666666' }}>Binnen</div>
                </div>
                <div className="text-center border-x" style={{ borderColor: '#E8D9C5' }}>
                  <Snowflake className="w-5 h-5 mx-auto mb-1" style={{ color: '#B4C4AE' }} />
                  <div className="text-xl font-bold">8°C</div>
                  <div className="text-xs" style={{ color: '#666666' }}>Buiten</div>
                </div>
                <div className="text-center">
                  <div className="w-5 h-5 mx-auto mb-1">{getSeasonIcon()}</div>
                  <div className="text-xl font-bold capitalize">{seizoen}</div>
                  <div className="text-xs" style={{ color: '#666666' }}>Seizoen</div>
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3" style={{ color: '#333333' }}>
                  Kamertemperatuur instellen
                </label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={kamerTemp}
                  onChange={(e) => setKamerTemp(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #B4C4AE 0%, #E85D42 50%, #FF6B4A 100%)`
                  }}
                />
                <div className="flex justify-between mt-2 text-xs" style={{ color: '#666666' }}>
                  <span>❄️ 14°C</span>
                  <span className="font-bold" style={{ color: '#E85D42' }}>Ideaal: 16-20°C</span>
                  <span>🔥 28°C</span>
                </div>
              </div>

              {/* Temperature Warning */}
              {kamerTemp < 16 && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#E3F2FD', borderLeft: '4px solid #2196F3' }}>
                  <p className="text-sm">❄️ Kamertemperatuur is lager dan aanbevolen. Overweeg extra laagjes of verwarming.</p>
                </div>
              )}
              {kamerTemp > 22 && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#FFF3E0', borderLeft: '4px solid #FF9800' }}>
                  <p className="text-sm">🔥 Kamertemperatuur is hoog. Let extra op tekenen van oververhitting.</p>
                </div>
              )}
              {kamerTemp >= 16 && kamerTemp <= 22 && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#E8F5E9', borderLeft: '4px solid #4CAF50' }}>
                  <p className="text-sm">✅ Ideale temperatuur voor veilige babyslaap (16-20°C)</p>
                </div>
              )}
            </div>

            {/* Baby Settings Card */}
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                <Baby className="inline-block w-5 h-5 mr-2" style={{ color: '#E85D42' }} />
                Baby Informatie
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Leeftijd
                  </label>
                  <div className="relative">
                    <select 
                      value={babyLeeftijd} 
                      onChange={(e) => setBabyLeeftijd(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: '#E8D9C5',
                        focusRingColor: '#E85D42'
                      }}
                    >
                      <option value="0-3">0-3 maanden</option>
                      <option value="3-6">3-6 maanden</option>
                      <option value="6-12">6-12 maanden</option>
                      <option value="12+">12+ maanden</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: '#666666' }} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#333333' }}>
                    Seizoen
                  </label>
                  <div className="relative">
                    <select 
                      value={seizoen} 
                      onChange={(e) => setSeizoen(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: '#E8D9C5',
                        focusRingColor: '#E85D42'
                      }}
                    >
                      <option value="winter">Winter</option>
                      <option value="lente">Lente</option>
                      <option value="zomer">Zomer</option>
                      <option value="herfst">Herfst</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: '#666666' }} />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50" style={{ backgroundColor: isPremature ? '#FFF3E0' : 'transparent' }}>
                  <input
                    type="checkbox"
                    checked={isPremature}
                    onChange={(e) => setIsPremature(e.target.checked)}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: '#E85D42' }}
                  />
                  <span className="ml-3 text-sm" style={{ color: '#333333' }}>
                    Prematuur geboren
                  </span>
                </label>
                {isPremature && (
                  <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: '#FFF3E0' }}>
                    <p className="text-sm" style={{ color: '#856404' }}>
                      ⚠️ Voor premature baby's wordt geadviseerd contact op te nemen met uw consultatiebureau.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Clothing Layers Card */}
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                <Layers className="inline-block w-5 h-5 mr-2" style={{ color: '#E85D42' }} />
                Kledinglagen
              </h2>

              {/* Slaapzak TOG Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3" style={{ color: '#333333' }}>
                  Slaapzak TOG waarde
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[0.2, 0.5, 1.0, 2.5, 3.5].map(tog => (
                    <button
                      key={tog}
                      onClick={() => setSlaapzakTOG(tog)}
                      className="py-3 px-2 rounded-lg font-semibold text-sm transition-all"
                      style={{
                        backgroundColor: slaapzakTOG === tog ? '#E85D42' : '#F5F5F5',
                        color: slaapzakTOG === tog ? 'white' : '#666666',
                        border: slaapzakTOG === tog ? '2px solid #E85D42' : '2px solid transparent'
                      }}
                    >
                      {tog}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clothing Items */}
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(kledingWaarden).map(([item, info]) => {
                  const isSelected = gekozenKleding.includes(item)
                  
                  return (
                    <button
                      key={item}
                      onClick={() => toggleKleding(item)}
                      className="p-4 rounded-xl text-left transition-all transform hover:scale-[1.02]"
                      style={{
                        backgroundColor: isSelected ? '#FFF9F0' : 'white',
                        border: `2px solid ${isSelected ? '#E85D42' : '#E8D9C5'}`
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{info.icon}</span>
                          <div>
                            <div className="font-medium text-sm" style={{ color: '#333333' }}>
                              {info.naam}
                            </div>
                            <div className="text-xs" style={{ color: '#666666' }}>
                              {info.TOG} TOG
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5" style={{ color: '#E85D42' }} />
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
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                📊 TOG Analyse
              </h2>

              {/* Status Alert */}
              <div 
                className="p-4 rounded-xl mb-6 flex items-start gap-3"
                style={{
                  backgroundColor: statusKleur === 'green' ? '#E8F5E9' : 
                                 statusKleur === 'orange' ? '#FFF3E0' : '#FFEBEE',
                  borderLeft: `4px solid ${statusKleur === 'green' ? '#4CAF50' : 
                                          statusKleur === 'orange' ? '#FF9800' : '#F44336'}`
                }}
              >
                <div style={{ color: statusKleur === 'green' ? '#4CAF50' : 
                              statusKleur === 'orange' ? '#FF9800' : '#F44336' }}>
                  {statusIcon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1" style={{ color: '#333333' }}>
                    {status === 'perfect' ? 'Perfect!' : 
                     status === 'aanpassen' ? 'Let op' : 'Aanpassing nodig'}
                  </div>
                  <div className="text-sm" style={{ color: '#666666' }}>
                    {statusTekst}
                  </div>
                </div>
              </div>

              {/* TOG Values Display */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#E8F5E9' }}>
                  <span className="text-sm font-medium" style={{ color: '#333333' }}>Aanbevolen TOG</span>
                  <span className="text-2xl font-bold" style={{ color: '#4CAF50' }}>{aanbevolenTOG.toFixed(1)}</span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#FFF9F0' }}>
                  <span className="text-sm font-medium" style={{ color: '#333333' }}>Huidige TOG</span>
                  <span className="text-2xl font-bold" style={{ color: '#E85D42' }}>{totaleTOG.toFixed(1)}</span>
                </div>

                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="text-xs" style={{ color: '#666666' }}>
                    Kleding: {kledingTOG.toFixed(1)} + Slaapzak: {slaapzakTOG} = {totaleTOG.toFixed(1)} TOG
                  </div>
                </div>
              </div>

              {/* Visual Baby Layers */}
              <div className="mt-6 p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #F5E6DB 100%)' }}>
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-40 mx-auto relative">
                      {/* Baby silhouette with layers */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Baby className="w-20 h-20" style={{ color: '#E85D42', opacity: 0.3 }} />
                      </div>
                      {gekozenKleding.map((item, index) => (
                        <div 
                          key={item}
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            transform: `scale(${1 + index * 0.1})`,
                            opacity: 0.2 + index * 0.1
                          }}
                        >
                          <div className="text-2xl">{kledingWaarden[item]?.icon}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium mt-2" style={{ color: '#666666' }}>
                    {gekozenKleding.length} lagen + slaapzak
                  </p>
                </div>
              </div>
            </div>

            {/* Clothing Recommendations Card */}
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                👕 Aanbevolen Kleding
              </h2>
              <ul className="space-y-2">
                {getClothingRecommendations().map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: '#4CAF50' }} />
                    <span className="text-sm" style={{ color: '#333333' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety Checklist Card */}
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                <Shield className="inline-block w-5 h-5 mr-2" style={{ color: '#E85D42' }} />
                Veiligheidscontrole
              </h2>

              <div className="space-y-3">
                {[
                  { key: 'neck', label: 'Nek voelt warm maar niet zweterig' },
                  { key: 'noSweat', label: 'Geen vochtig haar of rode wangen' },
                  { key: 'chest', label: 'Borst voelt aangenaam warm' },
                  { key: 'sleepQuality', label: 'Baby slaapt rustig zonder rillen' }
                ].map((check) => (
                  <label key={check.key} className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={safetyChecks[check.key]}
                      onChange={() => handleSafetyCheck(check.key)}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#E85D42' }}
                    />
                    <span className="ml-3 text-sm flex-1" style={{ color: '#333333' }}>
                      {check.label}
                    </span>
                  </label>
                ))}
              </div>

              {allChecksPassed && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#E8F5E9' }}>
                  <p className="text-sm font-medium" style={{ color: '#4CAF50' }}>
                    ✅ Alle veiligheidscontroles geslaagd!
                  </p>
                </div>
              )}
            </div>

            {/* Product Recommendations */}
            <div className="bg-white rounded-2xl p-6" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: '#333333' }}>
                  🛒 Aanbevolen Producten
                </h2>
                <button 
                  onClick={() => setShowProducts(!showProducts)}
                  className="text-sm font-medium"
                  style={{ color: '#E85D42' }}
                >
                  {showProducts ? 'Verberg' : 'Toon alle'}
                </button>
              </div>

              <div className="space-y-3">
                {geschikteProducten.map((product, index) => (
                  <div key={index} className="p-4 rounded-xl border-2 hover:shadow-md transition-all" 
                       style={{ borderColor: '#E8D9C5', backgroundColor: '#FAFAFA' }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold" style={{ color: '#333333' }}>
                            {product.merk}
                          </span>
                          {product.getest && (
                            <span className="px-2 py-0.5 text-xs rounded-full" 
                                  style={{ backgroundColor: '#E8F5E9', color: '#4CAF50' }}>
                              Getest
                            </span>
                          )}
                        </div>
                        <div className="text-sm mt-1" style={{ color: '#666666' }}>
                          {product.naam}
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#999999' }}>
                          {product.material} • {product.seizoen}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold" style={{ color: '#E85D42' }}>
                          €{product.prijs}
                        </div>
                        <div className="text-sm font-medium" style={{ color: '#666666' }}>
                          {product.TOG} TOG
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Box */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFF3E0', border: '2px solid #FFD700' }}>
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: '#92400E' }}>
                    Let Op: Merkverschillen
                  </h3>
                  <p className="text-sm" style={{ color: '#92400E' }}>
                    TOG waardes verschillen per merk. Een Jollein 3.0 TOG voelt dunner aan dan een HEMA 2.5 TOG. 
                    Test altijd zelf de warmte van je baby.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-8 p-6 rounded-2xl bg-white text-center" style={{ borderColor: '#E8D9C5', border: '1px solid' }}>
          <p className="text-sm" style={{ color: '#666666' }}>
            <strong style={{ color: '#333333' }}>Disclaimer:</strong> Deze calculator geeft algemene adviezen op basis van Nederlandse richtlijnen. 
            Raadpleeg bij twijfel altijd je kinderarts of consultatiebureau. Elke baby is uniek en heeft mogelijk andere behoeften.
          </p>
        </div>
      </main>
    </div>
  )
}
