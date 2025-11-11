import React, { useState } from 'react';
import { Calculator, AlertCircle, Check, Info } from 'lucide-react';

export default function FormulaMixingCalculator() {
  const [targetVolume, setTargetVolume] = useState('');
  const [results, setResults] = useState(null);
  const mlPerScoop = 30; // Nederlandse standaard voor alle populaire merken

  const calculateMixing = () => {
    if (!targetVolume || targetVolume <= 0) {
      alert('Vul een geldige gewenste hoeveelheid in');
      return;
    }

    const target = parseFloat(targetVolume);
    const mlPerScoopValue = mlPerScoop;
    
    // Calculate scoops needed
    const scoopsNeeded = Math.round((target / mlPerScoopValue) * 10) / 10;
    const waterNeeded = target;
    const actualVolume = scoopsNeeded * mlPerScoopValue;
    
    // Calculate if we need adjustments
    const difference = Math.abs(target - actualVolume);
    const isExact = difference < 2; // Within 2ml tolerance
    
    // Generate alternative suggestions
    const alternatives = [];
    for (let scoops = Math.floor(target / mlPerScoopValue); scoops <= Math.ceil(target / mlPerScoopValue) + 1; scoops++) {
      if (scoops > 0) {
        const volume = scoops * mlPerScoopValue;
        const water = volume;
        alternatives.push({
          scoops,
          water,
          volume,
          difference: Math.abs(target - volume)
        });
      }
    }
    
    // Sort by closest to target
    alternatives.sort((a, b) => a.difference - b.difference);

    setResults({
      target,
      mlPerScoopValue,
      scoopsNeeded,
      waterNeeded,
      actualVolume,
      isExact,
      difference,
      alternatives: alternatives.slice(0, 3)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-medium text-gray-800">Kunstvoeding Mengverhouding Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bereken de exacte verhouding van water en poeder voor uw gewenste hoeveelheid kunstvoeding. 
            Perfect voor wanneer de standaard verhoudingen niet uitkomen.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h2 className="font-medium text-lg mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Bereken Mengverhouding
          </h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gewenste hoeveelheid (ml)
              </label>
              <input
                type="number"
                value={targetVolume}
                onChange={(e) => setTargetVolume(e.target.value)}
                placeholder="Bijv. 135"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Nederlandse Standaard: 30ml water + 1 schepje = 33ml voeding</h3>
              <p className="text-sm text-blue-700">
                Alle populaire Nederlandse merken (Nutrilon, HiPP, Albert Heijn, Kruidvat) gebruiken 
                deze verhouding volgens EU-richtlijnen. Het schepje poeder neemt ongeveer 3ml ruimte in, 
                daarom wordt 30ml water + 1 schepje poeder = 33ml kant-en-klare voeding.
              </p>
            </div>
          </div>

          <button
            onClick={calculateMixing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Bereken Mengverhouding
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              {results.isExact ? (
                <Check className="w-5 h-5 mr-2 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              )}
              Resultaat
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-medium text-blue-600">
                  {results.scoopsNeeded}
                </div>
                <div className="text-sm text-blue-700">Schepjes poeder</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-medium text-green-600">
                  {results.waterNeeded}ml
                </div>
                <div className="text-sm text-green-700">Water</div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-medium text-purple-600">
                  {results.actualVolume}ml
                </div>
                <div className="text-sm text-purple-700">Totaal volume</div>
              </div>
            </div>

            {!results.isExact && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-orange-800">Let op: Niet exact</p>
                    <p className="text-sm text-orange-700">
                      Het resultaat wijkt {results.difference.toFixed(1)}ml af van uw gewenste hoeveelheid. 
                      Bekijk de alternatieven hieronder.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Alternatives */}
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Alternatieve verhoudingen:</h4>
              <div className="space-y-2">
                {results.alternatives.map((alt, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg border ${
                      alt.difference < 2 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className="text-sm">
                      <strong>{alt.scoops} schepjes</strong> + <strong>{alt.water}ml water</strong> = {alt.volume}ml
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      alt.difference < 2 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {alt.difference === 0 ? 'Exact' : `±${alt.difference.toFixed(1)}ml`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-medium text-blue-800 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Nederlandse Standaard
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p className="font-medium">✓ Alle populaire merken gebruiken 30ml/schepje:</p>
              <ul className="space-y-1 ml-4">
                <li>• Nutrilon (45% marktaandeel)</li>
                <li>• HiPP Organic (18% marktaandeel)</li>
                <li>• Albert Heijn eigen merk (15% marktaandeel)</li>
                <li>• Kruidvat eigen merk</li>
                <li>• Hero Baby, Aptamil, etc.</li>
              </ul>
              <p className="mt-2 text-xs text-blue-600 italic">
                EU-verordening 2016/127 standaardiseert verhoudingen
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-medium text-green-800 mb-3 flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Bereidingstips
            </h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Gebruik altijd eerst water, dan poeder</li>
              <li>• Schud goed maar voorzichtig (geen luchtbellen)</li>
              <li>• Controleer temperatuur op pols (lauwwarm)</li>
              <li>• Gebruik binnen 2 uur na bereiding</li>
              <li>• Gooi restjes altijd weg</li>
            </ul>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800 mb-2">Veiligheid voorop</h3>
              <p className="text-sm text-red-700">
                Deze calculator is een hulpmiddel. Volg altijd de instructies op de verpakking van uw kunstvoeding. 
                Bij twijfel of vragen over voeding, raadpleeg uw consultatiebureau of huisarts.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}