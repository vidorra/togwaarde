# Implementation Guide: Adding Premature Baby Support to FlesvoedingCalculator.nl

*Complete technical guide for extending the calculator with premature baby functionality*

## 🎯 Overview

This guide explains how to extend your existing FlesvoedingCalculator.nl tool to support premature babies, as referenced in the article "Flesvoeding bij Premature Baby's". The implementation adds a "Prematuur" option to the age dropdown and adjusts calculations based on corrected age and special nutritional needs.

## 📋 Requirements

### Current Structure
- **File**: `app/page.jsx`
- **Framework**: Next.js with React
- **Current dropdown**: Age selector (0-6+ months)
- **Formula**: 150ml per kg body weight (adjusted by age)

### New Features to Add
1. Premature option in age dropdown
2. Gestational age input field
3. Corrected age calculation
4. Adjusted nutritional requirements
5. Special warnings and guidance

## 🔧 Step-by-Step Implementation

### Step 1: Update the Age Dropdown

**Current code:**
```jsx
<select
  value={ageMonths}
  onChange={(e) => setAgeMonths(e.target.value)}
  className="..."
>
  <option value="0">0-1 maand</option>
  <option value="1">1-2 maanden</option>
  // ...etc
</select>
```

**Updated code:**
```jsx
<select
  value={ageMonths}
  onChange={(e) => {
    setAgeMonths(e.target.value);
    if (e.target.value === 'premature') {
      setIsPremature(true);
    } else {
      setIsPremature(false);
      setGestationalAge('');
      setBirthDate('');
    }
  }}
  className="..."
>
  <option value="0">0-1 maand</option>
  <option value="1">1-2 maanden</option>
  <option value="2">2-3 maanden</option>
  <option value="3">3-4 maanden</option>
  <option value="4">4-5 maanden</option>
  <option value="5">5-6 maanden</option>
  <option value="6">6+ maanden</option>
  <option value="premature">Prematuur geboren</option>
</select>
```

### Step 2: Add New State Variables

Add these state variables at the top of your component:

```jsx
const [isPremature, setIsPremature] = useState(false);
const [gestationalAge, setGestationalAge] = useState('');
const [birthDate, setBirthDate] = useState('');
const [correctedAge, setCorrectedAge] = useState(null);
const [prematureCategory, setPrematureCategory] = useState('');
```

### Step 3: Add Conditional Input Fields for Premature Babies

Add this conditional rendering after the age dropdown:

```jsx
{isPremature && (
  <div className="space-y-5 mt-5 p-4 bg-blue-50 rounded-xl border border-blue-200">
    <div className="flex items-start space-x-2 mb-3">
      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
      <p className="text-sm text-blue-800">
        Voor premature baby's berekenen we de voeding op basis van gecorrigeerde leeftijd
      </p>
    </div>
    
    {/* Gestational Age at Birth */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Zwangerschapsduur bij geboorte (weken)
      </label>
      <select
        value={gestationalAge}
        onChange={(e) => {
          setGestationalAge(e.target.value);
          calculatePrematureCategory(e.target.value);
        }}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary"
      >
        <option value="">Selecteer weken</option>
        <option value="24">24 weken</option>
        <option value="25">25 weken</option>
        <option value="26">26 weken</option>
        <option value="27">27 weken</option>
        <option value="28">28 weken</option>
        <option value="29">29 weken</option>
        <option value="30">30 weken</option>
        <option value="31">31 weken</option>
        <option value="32">32 weken</option>
        <option value="33">33 weken</option>
        <option value="34">34 weken</option>
        <option value="35">35 weken</option>
        <option value="36">36 weken</option>
        <option value="37">37 weken</option>
      </select>
    </div>
    
    {/* Birth Date */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Geboortedatum
      </label>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        max={new Date().toISOString().split('T')[0]}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary"
      />
    </div>
    
    {/* Display Corrected Age */}
    {correctedAge !== null && (
      <div className="bg-white rounded-lg p-3">
        <div className="text-sm text-gray-600">Gecorrigeerde leeftijd:</div>
        <div className="font-semibold text-primary">
          {correctedAge < 0 
            ? `${correctedAge} weken (nog niet op termijn)` 
            : `${Math.floor(correctedAge / 4)} maanden en ${correctedAge % 4} weken`
          }
        </div>
      </div>
    )}
    
    {/* Premature Category */}
    {prematureCategory && (
      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
        <div className="text-sm text-amber-800">
          <strong>Categorie:</strong> {prematureCategory}
        </div>
      </div>
    )}
  </div>
)}
```

### Step 4: Add Helper Functions

Add these helper functions before the `calculateFeeding` function:

```jsx
// Calculate premature category based on gestational age
const calculatePrematureCategory = (weeks) => {
  const weeksNum = parseInt(weeks);
  if (weeksNum >= 34) {
    setPrematureCategory('Laat prematuur (speciale startvoeding aanbevolen)');
  } else if (weeksNum >= 32) {
    setPrematureCategory('Matig prematuur (prematurenvoeding nodig)');
  } else if (weeksNum >= 28) {
    setPrematureCategory('Zeer prematuur (NICU voeding vereist)');
  } else {
    setPrematureCategory('Extreem prematuur (gespecialiseerde NICU zorg)');
  }
};

// Calculate corrected age in weeks
const calculateCorrectedAge = () => {
  if (!birthDate || !gestationalAge) return null;
  
  const birth = new Date(birthDate);
  const today = new Date();
  const ageInDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
  const ageInWeeks = Math.floor(ageInDays / 7);
  
  // Corrected age = chronological age - weeks premature
  const weeksPremature = 40 - parseInt(gestationalAge);
  const correctedAgeWeeks = ageInWeeks - weeksPremature;
  
  return correctedAgeWeeks;
};

// Use effect to calculate corrected age when inputs change
useEffect(() => {
  if (isPremature && birthDate && gestationalAge) {
    const corrected = calculateCorrectedAge();
    setCorrectedAge(corrected);
  }
}, [birthDate, gestationalAge, isPremature]);
```

### Step 5: Update the Calculate Function

Replace the existing `calculateFeeding` function with this enhanced version:

```jsx
const calculateFeeding = () => {
  if (!weight || weight <= 0) {
    alert('Vul een geldig gewicht in');
    return;
  }

  const weightKg = parseFloat(weight);
  let age = parseInt(ageMonths);
  let mlPerKg = 150;
  let isPrematureCalculation = false;
  let specialNotes = [];

  // Special calculation for premature babies
  if (isPremature) {
    if (!gestationalAge || !birthDate) {
      alert('Vul de zwangerschapsduur en geboortedatum in voor premature berekening');
      return;
    }

    isPrematureCalculation = true;
    const correctedAgeWeeks = calculateCorrectedAge();
    
    // Convert corrected age to months for calculation
    if (correctedAgeWeeks < 0) {
      // Still before term - use special premature formula
      mlPerKg = 180; // Higher needs for very premature
      age = 0;
      specialNotes.push('Baby is nog niet op termijn datum - hogere voedingsbehoefte');
    } else {
      // Use corrected age in months
      age = Math.max(0, Math.floor(correctedAgeWeeks / 4));
      
      // Premature babies need more nutrition
      if (parseInt(gestationalAge) < 32) {
        mlPerKg = 170; // Very premature
        specialNotes.push('Verhoogde voedingsbehoefte voor inhaalgroei');
      } else if (parseInt(gestationalAge) < 34) {
        mlPerKg = 160; // Moderately premature
        specialNotes.push('Aangepaste voeding voor premature ontwikkeling');
      } else {
        mlPerKg = 155; // Late premature
        specialNotes.push('Licht verhoogde voedingsbehoefte');
      }
    }
    
    // Add specific product recommendations
    if (parseInt(gestationalAge) < 34) {
      specialNotes.push('Overweeg speciale prematurenvoeding zoals Nutrilon Nenatal of Aptamil Prematil');
    }
  } else {
    // Standard age-based adjustment
    if (age >= 2) mlPerKg = 140;
    if (age >= 3) mlPerKg = 130;
    if (age >= 4) mlPerKg = 120;
    if (age >= 5) mlPerKg = 110;
    if (age >= 6) mlPerKg = 100;
  }

  // Calculate daily amount with premature maximum
  const maxDaily = isPrematureCalculation ? 1200 : 1000;
  const dailyAmount = Math.min(weightKg * mlPerKg, maxDaily);
  
  // Adjust feeding frequency for premature babies
  let feedings = parseInt(feedingsPerDay);
  if (isPrematureCalculation && correctedAge < 0) {
    feedings = Math.max(8, feedings); // Minimum 8 feedings for very premature
    specialNotes.push('Minimaal 8 voedingen per dag aanbevolen');
  }
  
  const baseAmountPerFeeding = dailyAmount / feedings;
  
  // Round to nearest 5ml
  const roundToFive = (num) => Math.round(num / 5) * 5;
  
  // Calculate range
  const recommendedAmount = roundToFive(baseAmountPerFeeding);
  const minAmount = recommendedAmount;
  const maxAmount = roundToFive(baseAmountPerFeeding * 1.3);

  setResults({
    dailyAmount: Math.round(dailyAmount),
    feedingsPerDay: feedings,
    recommendedAmount,
    minAmount,
    maxAmount,
    mlPerKg,
    weightKg,
    isPremature: isPrematureCalculation,
    correctedAge: correctedAge,
    gestationalAge: gestationalAge,
    specialNotes: specialNotes
  });
  
  // Track special calculator usage
  if (isPrematureCalculation) {
    trackCalculatorUsage('premature_calculator', {
      weight: weightKg,
      gestational_age: gestationalAge,
      corrected_age: correctedAge
    });
  }
};
```

### Step 6: Update Results Display

Enhance the results section to show premature-specific information:

```jsx
{results && (
  <div className="space-y-6">
    {/* Special Premature Alert */}
    {results.isPremature && (
      <div className="bg-blue-50 border border-blue-300 rounded-xl p-4">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Premature Baby Berekening
            </h4>
            <p className="text-sm text-blue-800">
              Gecorrigeerde leeftijd: {results.correctedAge < 0 
                ? `${results.correctedAge} weken (pre-term)` 
                : `${Math.floor(results.correctedAge / 4)} maanden`
              }
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Geboren bij: {results.gestationalAge} weken zwangerschap
            </p>
          </div>
        </div>
      </div>
    )}
    
    {/* Main Results - existing code */}
    <div className="bg-primary-gradient rounded-2xl shadow-lg p-6 text-white">
      {/* ... existing results display ... */}
    </div>
    
    {/* Special Notes for Premature */}
    {results.specialNotes && results.specialNotes.length > 0 && (
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Belangrijke Aandachtspunten
        </h4>
        <ul className="space-y-1">
          {results.specialNotes.map((note, index) => (
            <li key={index} className="text-sm text-amber-800 flex items-start">
              <span className="mr-2">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    
    {/* Medical Disclaimer for Premature */}
    {results.isPremature && (
      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
        <p className="text-sm text-red-800">
          <strong>Medisch Advies Vereist:</strong> Voor premature baby's is begeleiding 
          door kinderarts en diëtist essentieel. Deze berekening is alleen een richtlijn.
        </p>
      </div>
    )}
  </div>
)}
```

### Step 7: Add Link to Premature Article

Add a help link when premature is selected:

```jsx
{isPremature && (
  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
    <Link 
      href="/kennisbank/basis-flesvoeding/flesvoeding-bij-premature-babys"
      className="text-sm text-primary hover:underline flex items-center"
    >
      <Info className="w-4 h-4 mr-1" />
      Lees meer over voeding voor premature baby's →
    </Link>
  </div>
)}
```

## 📊 Database Schema (Optional)

If you want to store premature calculations for analytics:

```sql
-- Add to existing calculations table
ALTER TABLE feeding_calculations
ADD COLUMN is_premature BOOLEAN DEFAULT FALSE,
ADD COLUMN gestational_age_weeks INTEGER,
ADD COLUMN corrected_age_weeks INTEGER,
ADD COLUMN birth_date DATE;

-- Create premature-specific analytics view
CREATE VIEW premature_analytics AS
SELECT 
  COUNT(*) as total_calculations,
  AVG(gestational_age_weeks) as avg_gestational_age,
  COUNT(CASE WHEN gestational_age_weeks < 28 THEN 1 END) as extreme_premature,
  COUNT(CASE WHEN gestational_age_weeks BETWEEN 28 AND 31 THEN 1 END) as very_premature,
  COUNT(CASE WHEN gestational_age_weeks BETWEEN 32 AND 33 THEN 1 END) as moderate_premature,
  COUNT(CASE WHEN gestational_age_weeks >= 34 THEN 1 END) as late_premature
FROM feeding_calculations
WHERE is_premature = TRUE;
```

## 🧪 Testing Scenarios

Test these specific cases:

1. **Extreme Premature (24 weeks, born 2 weeks ago)**
   - Expected: Very high ml/kg ratio, minimum 8 feedings
   - Corrected age: -14 weeks

2. **Late Premature (35 weeks, born 3 months ago)**
   - Expected: Slightly elevated needs
   - Corrected age: ~7 weeks

3. **Transition Point (premature now at term)**
   - Born at 32 weeks, now 8 weeks old
   - Corrected age: 0 weeks

## 🎨 UI/UX Enhancements

### Mobile Responsiveness
```css
/* Add to your CSS */
@media (max-width: 640px) {
  .premature-inputs {
    padding: 1rem;
  }
  
  .premature-category {
    font-size: 0.875rem;
  }
}
```

### Loading State for Calculation
```jsx
const [isCalculating, setIsCalculating] = useState(false);

// In calculate function
setIsCalculating(true);
// ... calculation logic
setTimeout(() => {
  setIsCalculating(false);
}, 300);
```

## 📈 Analytics Integration

Track premature calculator usage:

```javascript
// analytics.js
export const trackPrematureCalculation = (data) => {
  if (window.gtag) {
    window.gtag('event', 'premature_calculation', {
      event_category: 'calculator',
      event_label: 'premature_baby',
      gestational_age: data.gestationalAge,
      corrected_age: data.correctedAge,
      weight: data.weight
    });
  }
};
```

## 🚀 Deployment Checklist

- [ ] Test all premature age categories
- [ ] Verify corrected age calculations
- [ ] Test date picker constraints
- [ ] Mobile responsive testing
- [ ] Update sitemap with `/calculator?premature=true`
- [ ] Add meta tags for premature calculator
- [ ] Update FAQ with premature questions
- [ ] Test analytics tracking
- [ ] Medical disclaimer prominent
- [ ] Link to premature article works

## 📚 Additional Resources

- [ESPGHAN Guidelines for Preterm Nutrition](https://espghan.org)
- [Dutch NICU Protocols](https://nvk.nl)
- [WHO Growth Standards for Preterm](https://who.int/tools/child-growth-standards)

## 🔒 Security Considerations

1. **Input Validation**: Ensure gestational age is between 22-37 weeks
2. **Date Validation**: Birth date cannot be in future
3. **Weight Limits**: Set reasonable min/max for premature weights
4. **XSS Prevention**: Sanitize all user inputs

## 💡 Future Enhancements

1. **Growth Tracking**: Store calculations to track growth over time
2. **Product Recommendations**: Specific formula suggestions based on category
3. **Export Function**: PDF report for healthcare providers
4. **Multi-language**: English version for expat parents
5. **API Endpoint**: `/api/calculate-premature` for app integration

---

*This implementation guide provides a complete solution for adding premature baby support to your FlesvoedingCalculator.nl tool. The feature enhances your calculator's medical accuracy and serves a critical user group with special nutritional needs.*