import React, { useState, useEffect } from 'react';
import { Baby, Calculator, Info, Clock, Calendar, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FlesvoedingCalculator = () => {
  const [weight, setWeight] = useState('');
  const [ageMonths, setAgeMonths] = useState('0');
  const [feedingsPerDay, setFeedingsPerDay] = useState('7');
  const [calculationMethod, setCalculationMethod] = useState('standard');
  const [results, setResults] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Calculate feeding amounts based on Dutch guidelines
  const calculateFeeding = () => {
    if (!weight || weight <= 0) {
      alert('Vul een geldig gewicht in');
      return;
    }

    const weightKg = parseFloat(weight);
    const age = parseInt(ageMonths);
    const feedings = parseInt(feedingsPerDay);
    
    // Dutch standard: 150ml per kg, adjusted by age
    let mlPerKg = 150;
    if (age >= 2) mlPerKg = 140;
    if (age >= 3) mlPerKg = 130;
    if (age >= 4) mlPerKg = 120;
    if (age >= 5) mlPerKg = 110;
    if (age >= 6) mlPerKg = 100;

    const dailyAmount = Math.min(weightKg * mlPerKg, 1000); // Max 1000ml per day
    const baseAmountPerFeeding = dailyAmount / feedings;
    
    // Round to nearest 5ml
    const roundToFive = (num) => Math.round(num / 5) * 5;
    
    // Calculate range: base to +30% for growth spurts
    const recommendedAmount = roundToFive(baseAmountPerFeeding);
    const minAmount = recommendedAmount; // Start at recommended
    const maxAmount = roundToFive(baseAmountPerFeeding * 1.3); // Up to 30% more during growth spurts

    setResults({
      dailyAmount: Math.round(dailyAmount),
      feedingsPerDay: feedings,
      recommendedAmount,
      minAmount,
      maxAmount,
      mlPerKg,
      weightKg
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Baby className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-medium text-gray-800">FlesvoedingCalculator.nl</h1>
            </div>
            <button
              onClick={() => setShowDisclaimer(!showDisclaimer)}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Disclaimer Banner */}
      {showDisclaimer && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="container mx-auto flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Medische Disclaimer</p>
              <p>Deze calculator is alleen voor informatieve doeleinden. Raadpleeg altijd uw kinderarts of consultatiebureau voor persoonlijk advies over de voeding van uw baby.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Introduction Card */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <Baby className="w-5 h-5 mr-2 text-blue-500" />
            Bereken de juiste hoeveelheid flesvoeding
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Gebruik deze calculator om te bepalen hoeveel flesvoeding uw baby nodig heeft. 
            Gebaseerd op de officiële Nederlandse richtlijnen van het Voedingscentrum (150ml per kg lichaamsgewicht).
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-100 p-6 mb-6">
          <div className="space-y-5">
            {/* Weight Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gewicht van uw baby (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Bijv. 4.5"
                  step="0.1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            </div>

            {/* Number of Feedings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aantal voedingen per dag
              </label>
              <select
                value={feedingsPerDay}
                onChange={(e) => setFeedingsPerDay(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none appearance-none bg-white"
              >
                <option value="4">4 voedingen (om de 6 uur)</option>
                <option value="5">5 voedingen (om de 4-5 uur)</option>
                <option value="6">6 voedingen (om de 4 uur)</option>
                <option value="7">7 voedingen (om de 3-4 uur)</option>
                <option value="8">8 voedingen (om de 3 uur)</option>
                <option value="9">9 voedingen (om de 2-3 uur)</option>
                <option value="10">10 voedingen (om de 2 uur)</option>
              </select>
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leeftijd van uw baby
              </label>
              <select
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none appearance-none bg-white"
              >
                <option value="0">0-1 maand</option>
                <option value="1">1-2 maanden</option>
                <option value="2">2-3 maanden</option>
                <option value="3">3-4 maanden</option>
                <option value="4">4-5 maanden</option>
                <option value="5">5-6 maanden</option>
                <option value="6">6+ maanden</option>
              </select>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateFeeding}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-sm flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Bereken Voeding</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
            {/* Main Results */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Baby className="w-5 h-5 mr-2" />
                Aanbevolen Hoeveelheden
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Totaal per dag</span>
                    <span className="text-2xl font-medium">{results.dailyAmount} ml</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <div className="text-blue-100 text-sm mb-1">Aantal voedingen</div>
                    <div className="text-xl font-medium">{results.feedingsPerDay}x</div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <div className="text-blue-100 text-sm mb-1">Aanbevolen per voeding</div>
                    <div className="text-xl font-medium">{results.recommendedAmount} ml</div>
                    <div className="text-xs text-blue-200 mt-1">Bij groeispurt: tot {results.maxAmount} ml</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-100 p-4 flex items-center justify-between text-gray-700 hover:bg-white transition-colors"
            >
              <span className="font-medium">Bekijk details & voedingsschema</span>
              {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {/* Detailed Schedule */}
            {showDetails && (
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-100 p-6 animate-in slide-in-from-top duration-300">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Voorbeeldschema (flexibel aan te passen)
                </h4>
                
                <div className="space-y-2 mb-4">
                  {generateFeedingSchedule(results.feedingsPerDay, results.recommendedAmount, results.maxAmount).map((time, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-blue-50/50 rounded-lg">
                      <span className="text-sm text-gray-600">{time.time}</span>
                      <span className="font-medium text-gray-800">{time.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>Aanbeveling:</strong> Start met {results.recommendedAmount}ml per voeding (gebaseerd op {results.mlPerKg}ml per kg lichaamsgewicht). 
                    Bij groeispurts kan dit oplopen tot {results.maxAmount}ml per voeding.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <h5 className="font-medium text-blue-900 mb-2">Waarom variatie in hoeveelheid?</h5>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Groeispurts:</strong> Rond 7-10 dagen, 3 weken, 6 weken, 3 maanden en 6 maanden. 
                        Baby kan dan tijdelijk 20-30% meer drinken.
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Wonderweken/Regeldagen:</strong> Mentale ontwikkelingssprongen waarbij baby onrustig is 
                        en vaker kleine beetjes wil drinken.
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Dagritme:</strong> 's Ochtends vaak meer honger, 's avonds kleinere porties.
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <div>
                        <strong>Temperatuur:</strong> Bij warm weer minder per keer, maar vaker dorst.
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-3 italic">
                    Volg altijd de signalen van je baby. Een tevreden baby die goed groeit, krijgt genoeg binnen.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Information Cards */}
        <div className="mt-8 space-y-4">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-blue-100 p-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              Soorten Flesvoeding
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="font-medium text-blue-500 mt-0.5">1</span>
                <div>
                  <p className="font-medium text-gray-700">Startvoeding (0-6 maanden)</p>
                  <p>Volledige zuigelingenvoeding, geschikt vanaf geboorte</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-medium text-blue-500 mt-0.5">2</span>
                <div>
                  <p className="font-medium text-gray-700">Opvolgmelk (6-12 maanden)</p>
                  <p>Vanaf 6 maanden, naast vaste voeding</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="font-medium text-blue-500 mt-0.5">3</span>
                <div>
                  <p className="font-medium text-gray-700">Peutermelk (12+ maanden)</p>
                  <p>Optioneel vanaf 1 jaar, gewone melk kan ook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">© 2025 FlesvoedingCalculator.nl</p>
            <p className="text-xs">
              Gebaseerd op richtlijnen van het Voedingscentrum en Nederlands Centrum Jeugdgezondheid
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper function to generate feeding schedule
const generateFeedingSchedule = (feedingsPerDay, recommendedAmount, maxAmount) => {
  const schedules = {
    4: ['07:00', '12:00', '17:00', '22:00'],
    5: ['07:00', '11:00', '15:00', '19:00', '23:00'],
    6: ['06:00', '10:00', '14:00', '18:00', '22:00', '02:00'],
    7: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
    8: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00', '03:00'],
    9: ['06:00', '08:30', '11:00', '13:30', '16:00', '18:30', '21:00', '23:30', '02:00'],
    10: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00']
  };
  
  const times = schedules[feedingsPerDay] || schedules[5];
  return times.map(time => ({ 
    time, 
    amount: `${recommendedAmount} ml` 
  }));
};

export default FlesvoedingCalculator;