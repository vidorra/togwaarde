# Calculator Verbetering Implementatie Plan

## 🎯 **Implementatie Overzicht**

Dit document beschrijft de **directe implementatie** van calculator verbeteringen om medische veiligheidsissues op te lossen voor pasgeborenen (0-2 weken oud).

## 🚨 **Probleem Samenvatting**

**Huidige Issue:** Calculator geeft 67% te veel voeding aan pasgeborenen
**Impact:** Medische risico's (aspiratie, reflux, overvoeding)  
**Prioriteit:** KRITIEK - Directe implementatie vereist

## 🔧 **Code Implementatie**

### **1. Core Calculator Logic Update**

**File:** `/app/page.jsx` (regel 135-190)

**Huidige Code:**
```javascript
let mlPerKg = 150
let age = parseInt(ageMonths)
// ... 
if (age >= 2) mlPerKg = 140
if (age >= 3) mlPerKg = 130
// etc...
```

**Nieuwe Code:**
```javascript
let mlPerKg = 150
let age = parseInt(ageMonths)
let specialNotes = []

// NIEUWE LOGICA: Speciale behandeling voor zeer jonge baby's
if (age === 0) {  // 0-1 maand categorie
  // Vraag om meer specifieke leeftijd via nieuwe UI component
  mlPerKg = 90;  // Veilige conservatieve waarde voor pasgeborenen
  specialNotes.push("⚠️ Voor baby's jonger dan 2 weken: begin met kleinere hoeveelheden");
  specialNotes.push("📞 Raadpleeg uw verloskundige of consultatiebureau bij twijfel");
  specialNotes.push("👀 Let goed op verzadigingssignalen van uw baby");
} else {
  // Bestaande logica voor oudere baby's
  if (age >= 2) mlPerKg = 140
  if (age >= 3) mlPerKg = 130
  if (age >= 4) mlPerKg = 120
  if (age >= 5) mlPerKg = 110
  if (age >= 6) mlPerKg = 100
}
```

### **2. Enhanced Age Selection UI**

**Nieuwe Component:** `NewbornAgeSelector.jsx`

```jsx
const NewbornAgeSelector = ({ ageMonths, setAgeMonths, setSpecialWarnings }) => {
  const [showNewbornDetails, setShowNewbornDetails] = useState(false);
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Leeftijd van uw baby
      </label>
      
      <select
        value={ageMonths}
        onChange={(e) => {
          setAgeMonths(e.target.value);
          if (e.target.value === '0') {
            setShowNewbornDetails(true);
            setSpecialWarnings(true);
          } else {
            setShowNewbornDetails(false);
            setSpecialWarnings(false);
          }
        }}
        className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary transition-all outline-none appearance-none bg-white text-gray-800"
      >
        <option value="0">0-1 maanden</option>
        <option value="1">1-2 maanden</option>
        <option value="2">2-3 maanden</option>
        <option value="3">3-4 maanden</option>
        <option value="4">4-5 maanden</option>
        <option value="5">5-6 maanden</option>
        <option value="6">6+ maanden</option>
      </select>
      
      {/* Speciale sectie voor pasgeborenen */}
      {showNewbornDetails && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="font-medium text-amber-800 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Extra informatie voor jonge baby's
          </h4>
          
          <div className="space-y-2 text-sm text-amber-700">
            <p>Voor een nauwkeurigere berekening, kunt u de exacte leeftijd aangeven:</p>
            
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="exact-age" value="0-3days" className="text-primary" />
                <span>0-3 dagen</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="exact-age" value="4-7days" className="text-primary" />
                <span>4-7 dagen</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="exact-age" value="1-2weeks" className="text-primary" />
                <span>1-2 weken</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="exact-age" value="2-4weeks" className="text-primary" />
                <span>2-4 weken</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

### **3. Newborn Warning System**

**Nieuwe Component:** `NewbornWarnings.jsx`

```jsx
const NewbornWarnings = ({ ageMonths, results }) => {
  if (ageMonths !== '0' || !results) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-red-800 mb-3">
            Belangrijke Waarschuwing voor Pasgeborenen
          </h3>
          
          <div className="space-y-3 text-sm text-red-700">
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium mb-2">⚠️ Medische Richtlijnen:</h4>
              <ul className="space-y-1 text-xs">
                <li>• <strong>0-3 dagen:</strong> Begin met 10-20ml per voeding</li>
                <li>• <strong>4-7 dagen:</strong> Opbouw naar 20-40ml per voeding</li>
                <li>• <strong>1-2 weken:</strong> Geleidelijk naar 30-60ml per voeding</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-medium mb-2">👀 Let Op Deze Signalen:</h4>
              <ul className="space-y-1 text-xs">
                <li>• Baby duwt fles weg = vol (niet koppig)</li>
                <li>• Veel spugen = te veel gekregen</li>
                <li>• Onrust na voeding = overvol gevoel</li>
                <li>• Slaapt niet na voeding = mogelijk overvoeding</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 font-medium text-center">
                📞 Bij twijfel: Bel uw verloskundige of consultatiebureau
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### **4. Enhanced Results Display**

**Update Results Component:**

```jsx
// In results display sectie toevoegen:
{results && ageMonths === '0' && (
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
    <h4 className="font-medium text-blue-800 mb-2">
      💡 Tips Voor Pasgeborenen
    </h4>
    <div className="text-sm text-blue-700 space-y-2">
      <p><strong>Start voorzichtig:</strong> Begin met de helft van de aanbevolen hoeveelheid</p>
      <p><strong>Frequentie:</strong> Kleinere hoeveelheden, vaker (8-12x per dag)</p>
      <p><strong>Tempo:</strong> Laat uw baby pauzes nemen tijdens de voeding</p>
      <p><strong>Signalen:</strong> Stop als baby de fles wegduwt of zijn hoofdje wegdraait</p>
    </div>
  </div>
)}
```

## 📱 **UI/UX Verbeteringen**

### **1. Progressive Disclosure**
- Toon eerst eenvoudige leeftijdskeuze
- Ontvouw details alleen voor 0-1 maanden categorie
- Educatieve content contextafhankelijk

### **2. Visual Hierarchy**
```css
/* Nieuwe CSS classes */
.newborn-warning {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-left: 4px solid #ef4444;
}

.safety-highlight {
  background: #fffbeb;
  border: 1px solid #f59e0b;
  border-radius: 8px;
}

.medical-advice {
  background: #ecfdf5;
  border: 1px solid #10b981;
  border-radius: 8px;
}
```

### **3. Interactive Elements**
- Tooltip hovers voor medische termen
- Expandable sections voor gedetailleerde uitleg
- Progress indicators voor veilige introductie

## 🧪 **Testing Strategy**

### **Test Cases voor Newborns:**

```javascript
describe('Newborn Calculator Safety', () => {
  test('0-1 maand baby krijgt veilige hoeveelheid', () => {
    const baby = { weight: 3, ageMonths: 0 };
    const result = calculateFeeding(baby);
    
    expect(result.mlPerKg).toBe(90);
    expect(result.dailyAmount).toBe(270); // 3kg × 90ml
    expect(result.warnings).toContain('begin met kleinere hoeveelheden');
  });
  
  test('Waarschuwingen worden getoond voor pasgeborenen', () => {
    const result = renderCalculator({ ageMonths: '0' });
    
    expect(result.getByText(/Belangrijke Waarschuwing/)).toBeVisible();
    expect(result.getByText(/verloskundige/)).toBeVisible();
  });
});
```

### **User Acceptance Criteria:**

- [ ] Baby 0-1 maand krijgt maximaal 90ml/kg/dag
- [ ] Duidelijke waarschuwingen voor alle pasgeborenen
- [ ] Educational content voor ouders van jonge baby's
- [ ] Verwijzing naar medische professionals
- [ ] Mobile-responsive design
- [ ] Toegankelijkheid (screen readers)

## 🚀 **Deployment Plan**

### **Fase 1: Emergency Fix (24 uur)**
1. Update core calculator logic (90ml/kg voor 0-1 maand)
2. Add basic warning messages
3. Deploy met feature flag voor rollback
4. Monitor error rates en user feedback

### **Fase 2: Enhanced UX (1 week)**
1. Implement NewbornAgeSelector component
2. Add comprehensive warning system
3. Enhanced educational content
4. A/B test met subset van users

### **Fase 3: Full Features (2 weken)**
1. Day-specific calculations voor <14 dagen
2. Progress tracking voor jonge baby's
3. Integration met medische richtlijnen
4. Full rollout naar alle users

## 📊 **Success Metrics**

### **Safety Metrics:**
- Geen complaints over overvoeding bij pasgeborenen
- Verhoogde consultatiebureau verwijzingen (positief)
- Minder support tickets over "baby weigert fles"

### **Usage Metrics:**
- User engagement met educational content
- Time spent op newborn-specific sections
- Conversion rate naar medische professionals

### **Technical Metrics:**
- Geen crashes bij nieuwe leeftijd logic
- Performance impact < 50ms
- Mobile usability score > 90%

## ⚖️ **Risk Mitigation**

### **Medical Liability:**
- Prominente disclaimers op elke pagina
- Clear CTA naar medische professionals
- Version tracking voor alle aanbevelingen
- Legal review van alle medical content

### **Technical Risks:**
- Feature flags voor gradual rollout
- Comprehensive error logging
- Rollback plan binnen 15 minuten
- Load testing voor traffic spikes

---

**Status:** Ready for Implementation  
**Priority:** P0 - Critical Safety Issue  
**Timeline:** 24 hours for emergency fix, 2 weeks for full implementation  
**Owner:** Development Team + Medical Advisor Review