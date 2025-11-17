# Vergelijking TOG-waarden: Nederlandse Bronnen vs Onze Calculator

## Datum: 13 November 2025

## Geraadpleegde Bronnen

1. **24baby.nl** - Website niet meer beschikbaar (HTTP 410 - Gone)
2. **HEMA.nl** - TOG-waarde productinformatie
3. **Het Groene Kruis** - Veilig en comfortabel slapen informatie

---

## 1. HEMA.nl TOG Aanbevelingen

### Temperatuur & TOG Tabel

| Kamertemperatuur | Maximum TOG | Aanbevolen Babytextiel en Kleding |
|------------------|-------------|-----------------------------------|
| < 16°C | 4.0 TOG | Romper, slaapzak, laken, deken |
| 16-19°C | 2.5 TOG | Romper, slaapzak, laken, dunne deken |
| 20-22°C | 2.0 TOG | Romper met slaapzak, of romper met laken en dunne deken |
| 23-25°C | 1.0 TOG | Romper of laken |
| > 26°C | 0.5 TOG | Alleen luier |

### TOG-waarden Specifieke Items (HEMA)

- **Romper (kort)**: 0.2 TOG
- **Romper (lang)**: Niet gespecificeerd, maar waarschijnlijk ~0.5-1.0 TOG
- **Laken**: 0.2 TOG
- **Katoenen romper**: 1.0 TOG
- **Oude deken (1 laag)**: 1.5 TOG
- **Nieuwe deken (1 laag)**: 2.0 TOG
- **Dekbed**: 8.0 TOG (NIET aanbevolen voor baby's!)
- **Zomer slaapzak**: 1.0 TOG
- **Winter slaapzak**: 3.5 TOG

### Veiligheidsinformatie HEMA

- Ideale kamertemperatuur: **18-20°C**
- Ideale lichaamstemperatuur baby: **36.5-37.5°C**
- Controleer nek en voeten voor comfort
- Vermijd oververhitting (verhoogd risico op wiegendood)
- Nooit slaapzak met dekbed/dikke deken combineren

---

## 2. Het Groene Kruis Aanbevelingen

### Temperatuur & TOG Tabel

| Kamertemperatuur | TOG-waarde Slaapzak |
|------------------|---------------------|
| Boven 26°C | 0.5 TOG (alleen luier) |
| 23-24°C | 1.0 TOG (luier met laken of romper) |
| 20-22°C | 2.0 TOG (baby deken met laken) |
| 16-19°C | 2.5 TOG (slaapzak, deken met laken) |

### Algemene Richtlijnen

- Maximum TOG-waarde: **4.0 TOG**
- Bij 0.5 TOG: alleen romper zonder mouwen
- Lagen zijn cumulatief: Romper (1.0) + Slaapzak (3.0) = 4.0 TOG totaal

---

## 3. Onze Calculator - Huidige Waarden

### Kledingwaarden in Calculator

| Kledingstuk | TOG-waarde | Status |
|-------------|------------|--------|
| Luier | 0.1 | ✅ Zeer dicht bij HEMA/Groene Kruis |
| Korte mouw romper | 0.2 | ✅ **Exact match** met HEMA |
| Lange mouw romper | 0.4 | ⚠️ Conservatief (HEMA: 1.0 voor katoen) |
| Dun slaappak | 0.6 | ℹ️ Redelijke schatting |
| Dik slaappak | 0.9 | ℹ️ Redelijke schatting |
| Vestje | 0.3 | ℹ️ Redelijke schatting |
| Sokjes | 0.1 | ℹ️ Redelijke schatting |

### Dekenwaarden in Calculator

| Deken Type | TOG-waarde | Status |
|------------|------------|--------|
| Ingestopt lakentje | 0.3 | ⚠️ Hoger dan HEMA (0.2) |
| Ingestopte katoenen deken | 0.5 | ⚠️ Lager dan HEMA (1.5-2.0) |
| Ingestopte hydrofiele deken | 0.8 | ℹ️ Geen vergelijkingsdata |
| Losse deken (12+ mnd) | 1.5 | ✅ Match met HEMA oude deken |

### Temperatuur Aanbevelingen in Calculator

| Kamertemperatuur | Onze Min-Ideal-Max | HEMA Max | Groene Kruis |
|------------------|---------------------|----------|--------------|
| ≥ 24°C | 0.2 - 0.5 - 0.5 | 0.5-1.0 | 0.5 |
| 22-24°C | 0.5 - 0.8 - 1.0 | 1.0-2.0 | 1.0 |
| 20-22°C | 1.0 - 1.2 - 2.5 | 2.0 | 2.0 |
| 18-20°C | 2.5 - 2.5 - 2.5 | 2.5 | 2.5 |
| 16-18°C | 2.5 - 2.5 - 3.5 | 2.5-4.0 | 2.5 |
| < 16°C | 3.5 - 3.5 - 3.5 | 4.0 | - |

---

## Bevindingen & Aanbevelingen

### ✅ Wat Goed Gaat

1. **Temperatuur ranges**: Onze calculator volgt grotendeels de NHS/Lullaby Trust richtlijnen, die vergelijkbaar zijn met HEMA en Groene Kruis
2. **Veiligheidswaarschuwingen**: Goede implementatie van waarschuwingen voor lage/hoge temperaturen
3. **Deken veiligheid**: Correct geïmplementeerd met 12+ maanden restrictie voor losse dekens
4. **Korte romper TOG**: Perfect match met HEMA (0.2)
5. **Algemene TOG ranges**: Binnen acceptabele marges

### ⚠️ Aanbevolen Updates

#### 1. **Lange Mouw Romper TOG** (PRIORITEIT: HOOG)
- **Huidige waarde**: 0.4 TOG
- **HEMA waarde**: 1.0 TOG (katoenen romper)
- **Aanbeveling**: Verhogen naar **0.8-1.0 TOG**
- **Reden**: Te conservatief, kan leiden tot onderkoeling

```javascript
// VOOR:
'lange_romper': { TOG: 0.4, naam: 'Lange mouw romper', info: 'Geschatte waarde' },

// NA:
'lange_romper': { TOG: 0.8, naam: 'Lange mouw romper', info: 'Geschatte waarde' },
// OF zelfs:
'lange_romper': { TOG: 1.0, naam: 'Lange mouw romper (katoen)', info: 'Gebaseerd op HEMA richtlijnen' },
```

#### 2. **Ingestopt Lakentje TOG** (PRIORITEIT: MEDIUM)
- **Huidige waarde**: 0.3 TOG
- **HEMA waarde**: 0.2 TOG
- **Aanbeveling**: Verlagen naar **0.2 TOG** voor consistentie

```javascript
// VOOR:
'ingestopt_laken': { TOG: 0.3, naam: 'Ingestopt lakentje', info: 'Veilig indien goed ingestopt' },

// NA:
'ingestopt_laken': { TOG: 0.2, naam: 'Ingestopt lakentje', info: 'Veilig indien goed ingestopt' },
```

#### 3. **Ingestopte Katoenen Deken TOG** (PRIORITEIT: HOOG)
- **Huidige waarde**: 0.5 TOG
- **HEMA waarde**: 1.5 TOG (oude deken) / 2.0 TOG (nieuwe deken)
- **Probleem**: Veel te laag! Dit is een significante discrepantie
- **Aanbeveling**: Verhogen naar **1.2-1.5 TOG**
- **Reden**: Risico op onderschatting van warmte, mogelijk onderkoeling

```javascript
// VOOR:
'ingestopt_katoen': { TOG: 0.5, naam: 'Ingestopte katoenen deken', info: 'Stevig onder armen instoppen' },

// NA:
'ingestopt_katoen': { TOG: 1.2, naam: 'Ingestopte katoenen deken (dun)', info: 'Stevig onder armen instoppen' },
// Of zelfs toevoegen:
'ingestopt_katoen_dik': { TOG: 1.8, naam: 'Ingestopte katoenen deken (normaal)', info: 'Stevig onder armen instoppen' },
```

#### 4. **Maximum TOG bij Lage Temperaturen** (PRIORITEIT: MEDIUM)
- **Huidige waarde**: < 16°C → max 3.5 TOG
- **HEMA waarde**: < 16°C → max 4.0 TOG
- **Aanbeveling**: Overweeg max te verhogen naar **4.0 TOG** voor extreme kou
- **Let op**: Dit is veilig volgens HEMA richtlijnen

```javascript
// Optioneel toevoegen aan berekenAanbevolenTOG():
if (temp < 14) return { min: 3.5, ideal: 4.0, max: 4.0 }
```

#### 5. **Ideale Kamertemperatuur Bericht** (PRIORITEIT: LAAG)
- **Huidige**: "Ideaal: 18-22°C (AAP: 20-22°C)"
- **HEMA**: "Ideaal: 18-20°C"
- **Aanbeveling**: Update tekst naar:
  ```
  "Ideaal: 18-20°C (HEMA/NL) / 20-22°C (AAP/US)"
  ```

#### 6. **Dik Slaappak TOG** (PRIORITEIT: LAAG)
- **Huidige waarde**: 0.9 TOG
- **Overweging**: Mogelijk verhogen naar **1.0-1.2 TOG** voor duidelijkere scheiding met dun slaappak
- **Reden**: Geen directe brondata, maar logische progressie

### ℹ️ Opmerkingen

1. **Geschatte Waarden**: Onze calculator communiceert correct dat kledingwaarden schattingen zijn - dit is goed
2. **Officiële TOG**: Alleen slaapzakken hebben officiële TOG ratings - dit is correct geïmplementeerd
3. **Veiligheidsinformatie**: Uitstekend geïmplementeerd met duidelijke waarschuwingen
4. **Bronnen**: Calculator verwijst naar NHS/Lullaby Trust - overweeg ook HEMA/Nederlandse bronnen toe te voegen

---

## Conclusie

De calculator is **grotendeels goed**, maar er zijn **3 kritieke updates** nodig:

### Must-Fix (Hoge Prioriteit)
1. ✅ **Lange romper**: 0.4 → 0.8-1.0 TOG
2. ✅ **Katoenen deken**: 0.5 → 1.2-1.5 TOG

### Should-Fix (Medium Prioriteit)
3. ✅ **Laken**: 0.3 → 0.2 TOG
4. ✅ **Max TOG < 16°C**: 3.5 → 4.0 TOG

### Nice-to-Have (Lage Prioriteit)
5. ⭕ **Ideale temp tekst**: Voeg Nederlandse bronnen toe
6. ⭕ **Dik slaappak**: Overweeg verhoging naar 1.0-1.2 TOG

---

## Implementatie Checklist

- [ ] Update `lange_romper` TOG naar 0.8 of 1.0
- [ ] Update `ingestopt_katoen` TOG naar 1.2-1.5
- [ ] Update `ingestopt_laken` TOG naar 0.2
- [ ] Overweeg maximum TOG < 16°C verhogen naar 4.0
- [ ] Update tekst met Nederlandse bronnen (HEMA, Groene Kruis)
- [ ] Test alle scenario's na updates
- [ ] Update disclaimer met verwijzing naar Nederlandse bronnen

---

## Bronnen

- HEMA.nl - TOG-waarde informatiegids (november 2025)
- Het Groene Kruis - Veilig en comfortabel slapen (november 2025)
- Huidige Calculator - TOGCalculator.jsx (lines 19-35, 238-244)
