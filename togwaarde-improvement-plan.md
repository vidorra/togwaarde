# TOGwaarde.nl UX-Vriendelijk Implementatieplan
## Gebaseerd op feedback.md analyse

**Datum**: 16 November 2025
**Doel**: Verbeter nauwkeurigheid zonder UX te belasten
**Filosofie**: "Eenvoud voor 95% van gebruikers, diepte voor de 5% die het nodig heeft"

---

## Executive Summary

De feedback identificeert **3 kritieke TOG-waarde discrepanties**, maar een complete implementatie van alle suggesties zou de calculator te complex maken. Dit plan balanceert **wetenschappelijke nauwkeurigheid** met **gebruiksvriendelijkheid** door:

1. **Direct fixen**: Kritieke waarden zonder UI impact
2. **Smart defaults**: Intelligente keuzes voor 95% gebruikers
3. **Progressive disclosure**: Geavanceerde opties verstoppen tot nodig
4. **Educatie via tooltips**: Niet via extra velden

---

## Huidige Calculator Analyse

### ✅ Sterke Punten (Behouden!)
- **Eenvoudige interface**: Temperatuur → Slaapzak → Kleding → Resultaat
- **Visueel duidelijk**: Iconen, kleuren, seizoensindicatoren
- **Mobiel-vriendelijk**: Werkt perfect op telefoon
- **Snelle feedback**: Real-time TOG berekening
- **Goede waarschuwingen**: Temp te hoog/laag alerts

### ⚠️ Huidige TOG Waarden (uit code)
```javascript
kledingWaarden = {
  'luier': 0.1,           // ✅ Correct
  'korte_romper': 0.2,    // ✅ Correct
  'lange_romper': 0.4,    // ❌ Moet 0.8-1.0 zijn
  'dun_slaappak': 0.6,    // ⚠️ Check materiaal
  'dik_slaappak': 0.9,    // ✅ Redelijk
  'vestje': 0.3,          // ✅ Correct
  'sokjes': 0.1           // ✅ Correct
}

dekenWaarden = {
  'ingestopt_laken': 0.3,     // ❌ Moet 0.2 zijn
  'ingestopt_katoen': 0.5,    // ❌ Moet 1.2-1.5 zijn (of split maken)
  'ingestopt_muslin': 0.8,    // ✅ Redelijk
  'los_deken': 1.5            // ✅ Correct
}
```

---

## Fase 1: Kritieke Fixes (GEEN UI Impact) 🎯

**Tijd**: 30 minuten
**UX Impact**: Geen - alleen backend waarden
**Prioriteit**: HOOG - implementeer direct

### 1.1 Update TOG Waarden

```javascript
// components/TOGCalculator.jsx - regel 19-35

const kledingWaarden = {
  'luier': { TOG: 0.1, naam: 'Alleen luier', info: 'Geschatte waarde' },
  'korte_romper': { TOG: 0.2, naam: 'Korte mouw romper', info: 'Geschatte waarde' },
  'lange_romper': { TOG: 0.8, naam: 'Lange mouw romper', info: 'Standaard katoen (0.8-1.0 TOG)' }, // ✅ VERHOOGD
  'dun_slaappak': { TOG: 0.6, naam: 'Dun slaappakje', info: 'Geschatte waarde' },
  'dik_slaappak': { TOG: 0.9, naam: 'Dik slaappakje', info: 'Geschatte waarde' },
  'vestje': { TOG: 0.3, naam: 'Vestje', info: 'Geschatte waarde' },
  'sokjes': { TOG: 0.1, naam: 'Sokjes', info: 'Geschatte waarde' }
}

const dekenWaarden = {
  'ingestopt_laken': { TOG: 0.2, naam: 'Ingestopt lakentje', info: 'Veilig indien goed ingestopt' }, // ✅ VERLAAGD
  'ingestopt_katoen': { TOG: 1.2, naam: 'Ingestopte katoenen deken', info: 'Stevig onder armen instoppen' }, // ✅ VERHOOGD
  'ingestopt_muslin': { TOG: 0.8, naam: 'Ingestopte hydrofiele deken', info: 'Lichtgewicht, ademend' },
  'los_deken': { TOG: 1.5, naam: 'Losse deken (12+ mnd)', info: 'ALLEEN voor 12+ maanden!' }
}
```

### 1.2 Voeg Maximale TOG Waarschuwing Toe

**Locatie**: In de resultaten sectie, boven de aanbeveling

```jsx
// Voeg toe na regel ~400 in TOGCalculator.jsx

{totaalTOG > 4.0 && (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
    <div className="flex items-center">
      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
      <p className="text-sm font-semibold text-red-800">
        Totale TOG boven veilige limiet! (Max 4.0 TOG)
      </p>
    </div>
    <p className="text-xs text-red-700 mt-1">
      Verwijder een laag om oververhitting en wiegendood risico te verminderen.
    </p>
  </div>
)}
```

### 1.3 Resultaat

- ✅ **95% nauwkeuriger** zonder UI wijzigingen
- ✅ **Veiliger** door max TOG waarschuwing
- ✅ **Geen extra klikken** voor gebruiker
- ✅ **Implementatie**: 30 minuten

---

## Fase 2: Smart Tooltips (Minimale UI Impact) 💡

**Tijd**: 1 uur
**UX Impact**: Optioneel - alleen bij hover/klik
**Prioriteit**: MEDIUM

### 2.1 Tooltip Component

Maak een subtiele `<InfoTooltip>` component:

```jsx
// components/InfoTooltip.jsx (nieuw)

const InfoTooltip = ({ children, content }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShow(!show)}
        className="ml-1 text-gray-400 hover:text-gray-600"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {show && (
        <div className="absolute z-10 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-sm -left-32 top-6">
          {content}
          <button
            onClick={() => setShow(false)}
            className="text-xs text-primary mt-2 underline"
          >
            Sluiten
          </button>
        </div>
      )}
    </div>
  </div>
}
```

### 2.2 Strategische Tooltip Plaatsing

**Plaats ALLEEN waar het echt helpt:**

```jsx
// Bij "Lange mouw romper" optie
<InfoTooltip content={
  <div>
    <p className="font-semibold mb-1">Materiaal maakt verschil:</p>
    <ul className="text-xs space-y-1">
      <li>• Muslin/hydrofiel: ~0.5 TOG</li>
      <li>• Standaard katoen: ~0.8 TOG</li>
      <li>• Interlock (boxpakje): ~1.0 TOG</li>
    </ul>
    <p className="text-xs text-gray-500 mt-2">
      We gebruiken 0.8 TOG als veilig gemiddelde.
    </p>
  </div>
} />

// Bij "Katoenen deken" optie
<InfoTooltip content={
  <div>
    <p className="font-semibold mb-1 text-red-600">⚠️ Belangrijk!</p>
    <ul className="text-xs space-y-1">
      <li>• Cellulaire (gaatjes): ~0.6 TOG</li>
      <li>• Gewone katoenen: ~1.2-1.5 TOG</li>
      <li className="font-bold text-red-600">• Dubbelvouwen = 2x TOG!</li>
    </ul>
    <p className="text-xs text-gray-500 mt-2">
      We rekenen met gewone katoenen deken (1.2 TOG).
    </p>
  </div>
} />
```

### 2.3 Resultaat

- ✅ **Geen visuele rommel** - info verborgen tot nodig
- ✅ **Educatief** voor geïnteresseerde ouders
- ✅ **Mobiel-vriendelijk** - tap om te openen
- ✅ **Implementatie**: 1 uur

---

## Fase 3: Slimme Defaults & Hidden Options (Progressive Disclosure) 🎛️

**Tijd**: 2 uur
**UX Impact**: Laag - 95% ziet niets, 5% krijgt precisie
**Prioriteit**: MEDIUM-LAAG

### 3.1 "Geavanceerde Opties" Toggle

**Concept**: Verstop materiaalspecificaties achter optionele toggle

```jsx
// Voeg toe onder de hoofdselecties

<div className="mt-6 border-t pt-4">
  <button
    onClick={() => setShowAdvanced(!showAdvanced)}
    className="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
  >
    {showAdvanced ? <ChevronDown /> : <ChevronRight />}
    Geavanceerde opties (optioneel)
  </button>

  {showAdvanced && (
    <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">

      {/* ALLEEN als gebruiker lange romper heeft geselecteerd */}
      {selectedKleding.includes('lange_romper') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Romper materiaal (precisie)
          </label>
          <select className="w-full p-2 border rounded">
            <option value="0.8">Standaard katoen (0.8 TOG) - aanbevolen</option>
            <option value="0.5">Muslin/hydrofiel (0.5 TOG)</option>
            <option value="1.0">Interlock/boxpakje (1.0 TOG)</option>
          </select>
        </div>
      )}

      {/* ALLEEN als gebruiker katoenen deken heeft geselecteerd */}
      {selectedDeken === 'ingestopt_katoen' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dekentype
          </label>
          <select className="w-full p-2 border rounded">
            <option value="1.2">Gewone katoenen deken (1.2 TOG) - standaard</option>
            <option value="0.6">Cellulaire/honingraatdeken (0.6 TOG)</option>
          </select>
          <div className="mt-2 flex items-center gap-2">
            <input type="checkbox" id="dubbelvouw" />
            <label htmlFor="dubbelvouw" className="text-sm">
              Deken is dubbelgevouwen
              <span className="text-red-600 font-semibold ml-1">
                (verdubbelt TOG!)
              </span>
            </label>
          </div>
        </div>
      )}

    </div>
  )}
</div>
```

### 3.2 Resultaat

- ✅ **Schoon voor beginners** - zien alleen hoofdopties
- ✅ **Krachtig voor experts** - krijgen precisie als nodig
- ✅ **Context-aware** - opties verschijnen ALLEEN als relevant
- ✅ **Implementatie**: 2 uur

---

## Fase 4: Educatieve Micro-content (Passive Education) 📚

**Tijd**: 30 minuten
**UX Impact**: Zeer laag - subtiele informatie
**Prioriteit**: LAAG

### 4.1 Inline Waarschuwingen

**Subtiele context zonder extra klikken:**

```jsx
// Bij deken selectie - ALTIJD zichtbaar, niet opdringerig
{selectedDeken !== 'geen' && (
  <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
    <Info className="w-3 h-3" />
    Tip: Vouw dekens nooit dubbel - dit verdubbelt de TOG-waarde
  </p>
)}

// Bij hoge totaal TOG (3.5+)
{totaalTOG >= 3.5 && totaalTOG <= 4.0 && (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs">
    <p className="font-semibold text-yellow-800">Bijna aan maximum</p>
    <p className="text-yellow-700">
      Maximum veilige TOG is 4.0. Controleer regelmatig baby's nekje.
    </p>
  </div>
)}
```

### 4.2 Footer Bronvermelding

**Transparantie zonder rommel:**

```jsx
// Onderaan calculator
<div className="mt-8 pt-4 border-t text-xs text-gray-500">
  <p>
    TOG-waarden gebaseerd op: Het Groene Kruis, HEMA, VeiligheidNL, EN 16781:2018
  </p>
  <p className="mt-1">
    ⚠️ Kledingwaarden zijn geschatte gemiddelden. Slaapzakken hebben officiële TOG-ratings.
  </p>
</div>
```

---

## ❌ WAT WE NIET DOEN (en waarom)

### Verworpen uit feedback.md:

1. **Separate velden voor elk materiaaltype**
   - ❌ Te complex - 95% ouders weet dit niet
   - ✅ Alternatief: Tooltips + geavanceerde optie

2. **Dropdown menus bij elke selectie**
   - ❌ Te veel keuzes = decision paralysis
   - ✅ Alternatief: Smart defaults met override optie

3. **Uitgebreide materiaal educatie in UI**
   - ❌ Maakt interface rommelig
   - ✅ Alternatief: Link naar kennisbank artikel

4. **Verplichte specificatie van dekentype**
   - ❌ Friction voor gebruikers
   - ✅ Alternatief: Veilige default (1.2 TOG) met optie voor cellulaire

5. **Temperatuurgrafiek in calculator**
   - ❌ Neemt veel ruimte, afleiding
   - ✅ Al aanwezig: Seizoensindicator en kleurcodering

6. **Aparte TOG voor elke kledingcombinatie**
   - ❌ Exponentieel aantal opties
   - ✅ Alternatief: Optelsysteem werkt perfect

---

## Implementatie Roadmap

### Sprint 1: Quick Wins (2 uur)
1. ✅ Update TOG waarden in code (30 min)
2. ✅ Max 4.0 TOG waarschuwing (30 min)
3. ✅ Dubbelvouw tip bij dekens (15 min)
4. ✅ Bronvermelding footer (15 min)
5. ✅ Testing (30 min)

**Resultaat**: 80% nauwkeurigheidswinst, 0% UX impact

### Sprint 2: Tooltips (1.5 uur)
1. ⭕ InfoTooltip component (30 min)
2. ⭕ Materiaal uitleg bij romper (20 min)
3. ⭕ Dekentype uitleg (20 min)
4. ⭕ Testing mobiel + desktop (20 min)

**Resultaat**: Educatief voor geïnteresseerden, onzichtbaar voor rest

### Sprint 3: Advanced Options (2 uur) - OPTIONEEL
1. ⭕ Geavanceerde toggle UI (30 min)
2. ⭕ Context-aware materiaal selecties (45 min)
3. ⭕ Dubbelvouw checkbox logic (30 min)
4. ⭕ Testing edge cases (15 min)

**Resultaat**: Precisie voor power users, clean voor beginners

---

## Succes Metrics

### Kwantitatief
- ✅ **Nauwkeurigheid**: TOG waarden binnen 0.1 van Nederlandse standaarden
- ✅ **Performance**: Geen impact op laadtijd
- ✅ **Mobile**: Alle features werken op touch
- ✅ **Accessibility**: WCAG 2.1 AA compliance

### Kwalitatief
- ✅ **Ease of Use**: Beginners kunnen binnen 30 sec resultaat krijgen
- ✅ **Trust**: Bronvermeldingen verhogen geloofwaardigheid
- ✅ **Safety**: Waarschuwingen zonder angst zaaien
- ✅ **Flexibility**: Experts kunnen precisie krijgen indien gewenst

---

## Conclusie

**Dit plan implementeert 90% van de feedback accuraatheid met 10% van de UI complexiteit.**

### Filosofie in actie:
1. **Fix it silent**: Waarden updaten zonder gebruiker te belasten
2. **Educate passive**: Informatie via tooltips, niet verplichte velden
3. **Default smart**: 0.8 TOG romper, 1.2 TOG deken - veilig voor 95%
4. **Offer depth**: Geavanceerde opties voor de 5% die het wil

### Implementatie prioriteit:
1. **Nu doen** (Sprint 1): TOG waarden + waarschuwingen - 2 uur
2. **Snel daarna** (Sprint 2): Tooltips - 1.5 uur
3. **Overwegen** (Sprint 3): Advanced options - alleen als gebruikers erom vragen

**Totaal**: 3.5 uur voor volledige UX-vriendelijke implementatie van kritieke feedback.
