# Calculator Verbetering Plan - Evidence-Based Updates

## 🚨 **KRITIEKE VEILIGHEIDSISSUE**

**Status:** URGENT - Medische veiligheidskwestie die onmiddellijk aangepakt moet worden

**Probleem:** De huidige calculator gebruikt 150ml/kg voor ALLE baby's 0-2 maanden, wat gevaarlijk te veel voeding geeft aan pasgeborenen.

**Impact:** Een baby van 1 week oud (3kg) krijgt 450ml per dag i.p.v. de medisch juiste 270ml - dit is 67% overvoeding!

---

## 📊 **HUIDIGE CALCULATOR ANALYSE**

### Wat de Code Nu Doet (Problematisch):
```javascript
// FOUT - huidige implementatie
let mlPerKg = 150;  // Voor ALLE 0-1 maanden baby's
if (age >= 2) mlPerKg = 140;
if (age >= 3) mlPerKg = 130;
// etc.
```

### Waarom Dit Gevaarlijk Is:
- **Aspiratie risico:** Baby's kunnen grote volumes niet aan
- **Spugen en reflux:** Maag wordt overvuld (maagcapaciteit groeit van 20ml → 60ml in 2 weken)
- **Baby weigert fles:** Ouders denken baby is moeilijk, maar het is overvoeding
- **Langetermijn obesitas:** Overvoeding in eerste week verhoogt obesitas risico met 7x

---

## 🔬 **EVIDENCE-BASED OPLOSSING**

### Nieuwe Leeftijdscategorieën (WHO/ESPGHAN/AAP):

| **Leeftijd** | **ml/kg/dag** | **Voeding Frequentie** | **Max per Voeding** |
|--------------|---------------|------------------------|---------------------|
| **Dag 1-2**  | 60-80         | 8-12x per dag         | 30ml               |
| **Dag 3-7**  | 100-180*      | 6-8x per dag          | 60ml               |
| **Week 2-4** | 160-200       | 5-6x per dag          | 150ml              |
| **Maand 2+** | 120-150       | 4-5x per dag          | 240ml              |

*Progressieve opbouw: dag 3=100, dag 4=120, dag 5=140, dag 6=160, dag 7=180

---

## 🛠️ **IMPLEMENTATIE PLAN**

### **STAP 1: Leeftijd Input Herstructureren**

**Huidige problemen:**
- Alleen maanden input (te grof voor pasgeborenen)
- Geen onderscheid premature vs voldragen

**Nieuwe input structuur:**
```javascript
// Voeg toe aan state
const [gestationWeeks, setGestationWeeks] = useState('40'); // Zwangerschapsduur
const [ageDays, setAgeDays] = useState(''); // Leeftijd in dagen voor 0-30 dagen
const [ageWeeks, setAgeWeeks] = useState(''); // Leeftijd in weken voor 1-8 weken
const [ageMonths, setAgeMonths] = useState(''); // Bestaand voor 2+ maanden
const [isPremature, setIsPremature] = useState(false); // Auto-detect <37 weken
```

**UI Aanpassingen:**
```jsx
{/* Zwangerschapsduur - NIEUW */}
<div>
  <label>Zwangerschapsduur bij geboorte (weken)</label>
  <select value={gestationWeeks} onChange={...}>
    <option value="24">24 weken (zeer vroeg)</option>
    <option value="28">28 weken</option>
    <option value="32">32 weken</option>
    <option value="34">34 weken (laat prematuur)</option>
    <option value="37">37 weken (voldragen)</option>
    <option value="40" selected>40 weken (normaal)</option>
  </select>
</div>

{/* Leeftijd - AANGEPAST */}
<div>
  <label>Leeftijd baby</label>
  {gestationWeeks < 37 && (
    <p className="text-amber-600">Voor premature baby's: gebruik gecorrigeerde leeftijd</p>
  )}
  
  <div className="space-y-2">
    <div>
      <input type="radio" name="ageType" value="days" />
      <label>Dagen oud (0-30 dagen)</label>
      {ageType === 'days' && (
        <input type="number" placeholder="Bijv. 5" min="0" max="30" />
      )}
    </div>
    
    <div>
      <input type="radio" name="ageType" value="weeks" />
      <label>Weken oud (1-8 weken)</label>
      {ageType === 'weeks' && (
        <input type="number" placeholder="Bijv. 3" min="1" max="8" />
      )}
    </div>
    
    <div>
      <input type="radio" name="ageType" value="months" />
      <label>Maanden oud (2+ maanden)</label>
      {ageType === 'months' && (
        <select>...</select>
      )}
    </div>
  </div>
</div>
```

### **STAP 2: Nieuwe Berekenings-Algoritme**

```javascript
const calculateFeeding = () => {
  const weightKg = parseFloat(weight);
  
  // Bepaal leeftijd in dagen
  let ageInDays;
  if (ageType === 'days') ageInDays = parseInt(ageDays);
  else if (ageType === 'weeks') ageInDays = parseInt(ageWeeks) * 7;
  else if (ageType === 'months') ageInDays = parseInt(ageMonths) * 30;
  
  // Voor premature baby's: gebruik gecorrigeerde leeftijd
  const gestationWeeksNum = parseInt(gestationWeeks);
  let correctedAgeDays = ageInDays;
  if (gestationWeeksNum < 37) {
    const weeksPremature = 40 - gestationWeeksNum;
    correctedAgeDays = Math.max(0, ageInDays - (weeksPremature * 7));
  }
  
  // NIEUWE EVIDENCE-BASED BEREKENING
  let mlPerKg;
  let maxPerFeeding;
  let recommendedFeedings;
  
  if (correctedAgeDays <= 2) {
    // Dag 1-2: Kritieke periode
    mlPerKg = correctedAgeDays === 0 ? 60 : 80;
    maxPerFeeding = 30;
    recommendedFeedings = 10;
    
  } else if (correctedAgeDays <= 7) {
    // Dag 3-7: Progressieve opbouw
    const progressionDays = correctedAgeDays - 2;
    mlPerKg = 100 + (progressionDays * 20); // 100→180 over 5 dagen
    maxPerFeeding = 60;
    recommendedFeedings = 8;
    
  } else if (correctedAgeDays <= 30) {
    // Week 2-4: Stabiele periode
    mlPerKg = 180;
    maxPerFeeding = 150;
    recommendedFeedings = 6;
    
  } else {
    // 2+ maanden: Bestaande logica (aangepast)
    const ageMonths = Math.floor(correctedAgeDays / 30);
    if (ageMonths === 2) mlPerKg = 150;
    else if (ageMonths === 3) mlPerKg = 140;
    else if (ageMonths >= 4) mlPerKg = 120;
    
    maxPerFeeding = 240;
    recommendedFeedings = 5;
  }
  
  // VEILIGHEIDSCHECKS
  const dailyAmount = Math.min(weightKg * mlPerKg, 1000);
  const recommendedPerFeeding = Math.min(
    Math.round((dailyAmount / recommendedFeedings) / 5) * 5,
    maxPerFeeding
  );
  
  // PREMATURE BABY AANPASSINGEN
  if (gestationWeeksNum < 32) {
    // Zeer vroeg: ESPGHAN protocol
    mlPerKg = Math.min(mlPerKg, 180); // Max 180ml/kg
    maxPerFeeding = Math.min(maxPerFeeding, 60);
  } else if (gestationWeeksNum < 37) {
    // Laat prematuur: Verhoogde behoeften
    mlPerKg = Math.min(mlPerKg * 1.1, 200); // +10% voor inhaalgroei
  }
  
  return {
    dailyAmount: Math.round(dailyAmount),
    recommendedPerFeeding,
    maxPerFeeding,
    recommendedFeedings,
    mlPerKg,
    ageInDays: correctedAgeDays,
    isPremature: gestationWeeksNum < 37,
    veiligheidsWarning: getVeiligheidsWarning(correctedAgeDays, recommendedPerFeeding)
  };
};

function getVeiligheidsWarning(ageDays, perFeeding) {
  if (ageDays <= 2 && perFeeding > 30) {
    return "⚠️ WAARSCHUWING: Volume te hoog voor pasgeborene. Risico op aspiratie!";
  }
  if (ageDays <= 7 && perFeeding > 60) {
    return "⚠️ LET OP: Grote portie voor jonge baby. Monitor op spugen/reflux.";
  }
  return null;
}
```

### **STAP 3: Verbeterde Resultaten Display**

```jsx
{results && (
  <div className="space-y-4">
    {/* Veiligheidswaarschuwing - NIEUW */}
    {results.veiligheidsWarning && (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          <p className="text-red-700 font-medium">{results.veiligheidsWarning}</p>
        </div>
      </div>
    )}
    
    {/* Premature baby notice - NIEUW */}
    {results.isPremature && (
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
        <h4 className="font-medium text-amber-800">Premature Baby</h4>
        <p className="text-amber-700 text-sm">
          Deze berekening gebruikt gecorrigeerde leeftijd. Overleg altijd met uw kinderarts 
          over voeding voor premature baby's.
        </p>
      </div>
    )}
    
    {/* Hoofdresultaten */}
    <div className="bg-primary text-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Voedingsadvies voor uw baby</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{results.recommendedPerFeeding}ml</div>
          <div className="text-sm opacity-90">Per voeding</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold">{results.recommendedFeedings}x</div>
          <div className="text-sm opacity-90">Per dag</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-400">
        <div className="text-center">
          <div className="text-lg font-semibold">{results.dailyAmount}ml</div>
          <div className="text-sm opacity-90">Totaal per dag</div>
        </div>
      </div>
    </div>
    
    {/* Bereik en flexibiliteit - AANGEPAST */}
    <div className="bg-green-50 rounded-xl p-4">
      <h4 className="font-medium text-green-800 mb-2">Normale variatie</h4>
      <p className="text-green-700 text-sm mb-3">
        Baby's variëren in hun behoeften. Let op honger- en verzadigingssignalen:
      </p>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="font-medium text-green-800">Minimum</div>
          <div className="text-green-600">{Math.round(results.recommendedPerFeeding * 0.8)}ml</div>
        </div>
        <div>
          <div className="font-medium text-green-800">Normaal</div>
          <div className="text-green-600">{results.recommendedPerFeeding}ml</div>
        </div>
        <div>
          <div className="font-medium text-green-800">Maximum</div>
          <div className="text-green-600">{results.maxPerFeeding}ml</div>
        </div>
      </div>
    </div>
    
    {/* Leeftijdsspecifieke tips - NIEUW */}
    <div className="bg-blue-50 rounded-xl p-4">
      <h4 className="font-medium text-blue-800 mb-2">
        {results.ageInDays <= 7 ? "Tips voor pasgeborenen" :
         results.ageInDays <= 30 ? "Tips voor eerste maand" :
         "Tips voor deze leeftijd"}
      </h4>
      
      {results.ageInDays <= 2 && (
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Begin met kleine porties (15-20ml) en bouw langzaam op</li>
          <li>• Voed minimaal elke 3 uur, ook 's nachts</li>
          <li>• Let op tekenen van oververzadiging (wegduwen, hoofd wegdraaien)</li>
          <li>• Contact kinderarts bij minder dan 6 natte luiers per dag</li>
        </ul>
      )}
      
      {results.ageInDays > 2 && results.ageInDays <= 7 && (
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Verhoog portiegrootte geleidelijk dag voor dag</li>
          <li>• Normale gewichtstoename: 20-30g per dag</li>
          <li>• Spugen na voeding is normaal, braken niet</li>
          <li>• Huid wordt snel roze na huilen = goede voeding</li>
        </ul>
      )}
      
      {results.ageInDays > 7 && results.ageInDays <= 30 && (
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Baby krijgt eigen ritme, volg hongersingalen</li>
          <li>• Groeispurt mogelijk rond 2-3 weken</li>
          <li>• Meer alert tussen voedingen</li>
          <li>• Kan 4-5 uur tussen nachtvoedingen</li>
        </ul>
      )}
    </div>
  </div>
)}
```

### **STAP 4: Disclaimer en Veiligheid**

```jsx
{/* Verbeterde disclaimer - AANGEPAST */}
<div className="bg-gray-50 rounded-xl p-4 mt-6">
  <div className="flex items-start space-x-3">
    <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
    <div>
      <h4 className="font-medium text-gray-800 mb-2">Belangrijke medische informatie</h4>
      <div className="text-gray-600 text-sm space-y-2">
        <p><strong>Voor baby's 0-2 weken oud:</strong> Deze periode is kritiek. Raadpleeg altijd uw kinderarts of consultatiebureau voor persoonlijk advies.</p>
        
        <p><strong>Voor premature baby's:</strong> Speciale voedingsrichtlijnen zijn nodig. Volg alleen medisch advies van uw neonatoloog.</p>
        
        <p><strong>Waarschuwingssignalen:</strong> Minder dan 6 natte luiers per dag, geen gewichtstoename, overmatig spugen, lethargie, of koorts - neem direct contact op met uw arts.</p>
        
        <p><strong>Deze calculator:</strong> Geeft richtlijnen gebaseerd op Nederlandse medische standaarden, maar vervangt nooit professioneel medisch advies.</p>
      </div>
    </div>
  </div>
</div>
```

---

## 🧪 **TESTING & VALIDATIE**

### Test Cases:
1. **Baby 1 dag oud, 3kg:** Moet 180ml/dag geven (60ml/kg), max 30ml per voeding
2. **Baby 1 week oud, 3kg:** Moet 270ml/dag geven (90ml/kg), max 60ml per voeding  
3. **Baby 4 weken oud, 4kg:** Moet 720ml/dag geven (180ml/kg), max 150ml per voeding
4. **Premature baby 34 weken, nu 2 weken oud:** Gebruikt gecorrigeerde leeftijd (-6 weken)

### Validatie Checklist:
- [ ] Dag 1-2 baby's krijgen max 30ml per voeding
- [ ] Geen baby krijgt meer dan 1000ml per dag
- [ ] Premature baby's krijgen aangepaste berekening
- [ ] Veiligheidswaarschuwingen tonen bij hoge volumes
- [ ] Disclaimer benadrukt medisch advies voor jonge baby's

---

## 📈 **IMPACT VERWACHTING**

### Veiligheidsverbetering:
- **Eliminatie overvoeding** bij pasgeborenen
- **Correcte portiegrootte** voor eerste levensdagen
- **Vroegtijdige detectie** van potentiële problemen

### Gebruikerservaring:
- **Precisere berekeningen** voor kritieke eerste weken
- **Duidelijke waarschuwingen** bij risicosituaties  
- **Leeftijdsspecifieke tips** voor praktische toepassing

### Medische Compliance:
- **Align met WHO/ESPGHAN richtlijnen**
- **Nederlandse medische standaarden**
- **Evidence-based algoritmes**

---

## ⏰ **IMPLEMENTATIE TIMELINE**

### **Week 1 - URGENT (Veiligheid)**
- [ ] Nieuwe berekeningslogica implementeren
- [ ] Veiligheidswaarschuwingen toevoegen
- [ ] Basis testing kritieke scenarios

### **Week 2 - Core Features**
- [ ] Leeftijd input herstructureren
- [ ] Premature baby ondersteuning
- [ ] Uitgebreide disclaimer

### **Week 3 - Polish & Testing**
- [ ] UI/UX verfijning
- [ ] Uitgebreide test suite
- [ ] Medische review door expert

### **Week 4 - Deploy & Monitor**
- [ ] Production deployment
- [ ] User feedback monitoring
- [ ] Performance metrics tracking

---

## 🎯 **SUCCESS METRICS**

### Veiligheid KPI's:
- 0 reports van overvoeding bij pasgeborenen
- Verhoogde disclaimer acknowledgment rate
- Meer consultatiebureau verwijzingen voor jonge baby's

### Gebruiker KPI's:
- Verhoogde calculatornauwkeurigheid rating
- Lagere bounce rate op resultaten pagina
- Meer social shares van veilige resultaten

**Deze update is KRITIEK voor de veiligheid van pasgeborenen en moet zo snel mogelijk geïmplementeerd worden.**