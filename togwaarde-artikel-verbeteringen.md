# Artikel-verbeteringen togwaarde.nl

Factcheck- en redactie-audit van alle inhoudelijke artikelen (juli 2026).
Gecontroleerd tegen VeiligheidNL / kinderveiligheid.nl, JGZ-richtlijn Preventie Wiegendood (NCJ),
Thuisarts, Lullaby Trust en NHS.

**Werkwijze:** 6 parallelle review-agents met websearch-verificatie. Labels: **KRITIEK** (veiligheid),
**FEIT** (onjuist/inconsistent), **VOLLEDIGHEID**, **TAAL**, **STIJL**.

**Kernbevinding:** de veiligheidskern klopt overal (rug, koele kamer, oververhitting = risico, nektest,
gecorrigeerde leeftijd), maar de **TOG-temperatuurtabellen en kritische ondergrenzen verschillen per
artikel**, met op enkele plekken een oververhittingsrisico. De grootste winst is één **canonieke
TOG-tabel + veiligheidsregels** die overal wordt aangehouden.

---

## 0. Canonieke waarden (eerst vaststellen, dan overal doorvoeren)

Deze inconsistenties zijn de rode draad. Kies onderstaande als de site-brede standaard:

**TOG ↔ kamertemperatuur (canoniek):**
| TOG | Kamertemperatuur | Seizoen |
|---|---|---|
| 0.5 | 24°C en warmer | zomer / warme kamer |
| 1.0 | 20-24°C | voor-/najaar |
| 2.5 | 16-20°C | winter |
| 3.5 | onder 16°C (liever kamer verwarmen) | zeer koud |

*(TOG 2.0 mag als tussenwaarde bij 18-22°C genoemd worden; vermijd losse 1.5/3.0/3.3 die nergens anders voorkomen.)*

**Veiligheidsregels (canoniek):**
- **Kamertemperatuur: ideaal 16-18°C; boven 20°C = oververhittingsrisico.** (Nu staat "16-20°C ideaal" met 20°C als optimum; dat legt de bovengrens te hoog — JGZ houdt ~18°C aan.)
- **Onder 16°C: verwarm de kamer**, stapel geen zwaardere TOG. (Nu 12 / 14 / 16°C door elkaar.)
- **Maximaal ~4.0 TOG totaal** (slaapzak + kleding). Boven 4.0 stijgt het oververhittings-/wiegendoodrisico (VeiligheidNL).
- **Elke laag kleding ≈ 0.5 TOG** (nu 0.3 vs 0.5 door elkaar; kies 0.5).
- **Koorts bij baby < 3 maanden (38°C+): altijd direct (huis)arts** — niet afwachten. 112 alleen bij levensbedreigende tekenen (slap/niet aanspreekbaar, blauw, ademnood, stuiptrekkingen).
- Op elke veilig-slaap-pagina: **rugligging expliciet noemen + geen losse dekens/kussens + korte medische disclaimer**.
- **TOG-oorsprong:** Brits (Shirley Institute, Manchester, jaren '40); "Thermal Overall Grade" is een veelgebruikte uitleg/backronym, niet de bewezen oorsprong. TOG is breed in Europa in gebruik. Harmoniseer "Britse" vs "internationale standaard".

---

## 1. Top-prioriteiten (veiligheid + harde feitfouten)

1. **`tog-waarde-gids` r.603-611 — combinatie > 4.0 TOG.** "<14°C: pyjama 1.0 + slaapzak 3.5 = 4.5 TOG totaal" overschrijdt de veilige max van ~4.0. Schrappen/corrigeren + regel "maximaal 4.0 TOG; onder 16°C beter de kamer verwarmen".
2. **Koorts-drempels als 112 gepresenteerd** (`warmtestuwing-baby` r.92-114 ">39°C"; `wiegendood-preventie` r.598 "rectaal >38°C"). Baby <3 mnd met koorts ≥38°C → altijd direct (huis)arts; 112 reserveren voor levensbedreigende tekenen. `baby-koorts-slaapzak` doet dit al goed — gebruik dat als standaard. Toevoegen aan `baby-temperatuur-controleren` en `oververhitting-herkennen`.
3. **Kritische ondergrens harmoniseren op <16°C** (`tog-waarde-winter` r.53-54 noemt 12°C; `babykleding-tabel` r.144 noemt 14°C; `kleding-onder-slaapzak` r.325 noemt 16°C).
4. **Gevaarlijke TOG↔temp-koppelingen** (2.5 TOG tot 24°C): `wat-is-tog-waarde` r.97-102 en `tog-waarde-berekenen` r.79-81. 2.5 TOG bij 24°C = oververhitting. Rechttrekken met de canonieke tabel.
5. **Zware winter-3-lagen-combinaties missen de oververhittingswaarschuwing** (`tog-waarde-winter` r.71-75). Voeg "let op oververhitting, controleer het nekje elk uur" toe (zoals `kleding-onder-slaapzak` dat wel doet).
6. **Ontbrekende medische disclaimer + rugligging** op o.a. `veilige-slaaptemperatuur`, `babykamer-temperatuur`, `inbakeren-tog-waarde`, `wat-is-tog`.
7. **`wiegendood-preventie` r.164 — "factor 3.9"** voor dekbedrisico → werkelijk aOR ~8,6 (volledig bedekt ~38 klopt wel). Corrigeren + bron.

---

## 2. Terugkerende patronen (site-breed)

| Patroon | Correctie | Getroffen artikelen |
|---|---|---|
| Kamertemp "16-20°C als ideaal" | ideaal 16-18°C, >20°C = risico | veilige-slaaptemperatuur, babykamer-temperatuur, meerdere |
| Inconsistente TOG↔temp-ranges | canonieke tabel (sectie 0) | wat-is-tog, wat-is-tog-waarde, tog-schaal-overzicht, tog-waarde-berekenen |
| Kritische ondergrens 12/14/16°C | overal <16°C = kamer verwarmen | tog-waarde-winter, babykleding-tabel, kleding-onder-slaapzak |
| Kledinglaag 0.3 vs 0.5 TOG | overal ≈ 0.5 TOG | wat-is-tog vs tog-schaal-overzicht |
| Koorts <3 mnd niet als "direct arts" | toevoegen; 112 alleen levensbedreigend | warmtestuwing, oververhitting, baby-temperatuur-controleren, wiegendood-preventie |
| Ontbrekende medische disclaimer | kort blok + verwijzing consultatiebureau | veilige-slaaptemperatuur, babykamer-temp, inbakeren, warmtestuwing, oververhitting, autostoel |
| Rugligging niet expliciet | "leg je baby altijd op de rug" toevoegen | veilige-slaaptemperatuur, babykamer-temp, inbakeren, wat-is-tog |
| Em-dashes / gedachtestreepje-als-em-dash | komma/dubbele punt | per-seizoen, kleding-onder-slaapzak, wiegendood-preventie, oververhitting, wat-is-tog-waarde |
| "flannellen" | "flanellen" | per-seizoen r.89, kleding-onder-slaapzak r.236/274/307, tog-schaal r.219 |
| Verzonnen precisiecijfers/merkclaims/testimonials | bron of afzwakken | tog-schaal, nederlandse-merken-vergelijking |
| "internationale" vs "Britse" standaard | harmoniseer (Brits, breed gebruikt) | wat-is-tog, wat-is-tog-waarde, tog-mythes |

---

## 3. Per artikel

### Veiligheid / wiegendood / warmte

**`wiegendood-preventie`**
- [FEIT] r.164 "factor 3.9" → dekbed aOR ~8,6 (bron NTVG/NCJ). r.74-76 statistiek-eenheden consistent maken.
- [FEIT] r.519/522 kamertemp bovengrens → 18°C.
- [VOLLEDIGHEID] r.598 koorts <3 mnd = direct (huis)arts, niet 112.
- [TAAL] r.390-392 "Blijf wel altijd op de rug te slapen leggen" kromme zin. [STIJL] em-dashes r.155/206/264.

**`wiegendood-voorkomen-tog`**
- [FEIT] r.116 kamertemp bovengrens → 18°C. r.157 "koorts zonder ziekte" bij oververhitting herformuleren ("verhoogde temperatuur door de warmte").
- [VOLLEDIGHEID] medische disclaimer toevoegen. [TAAL] r.171 werkwoordsvorm.

**`oververhitting-herkennen`** (sterk artikel)
- [VOLLEDIGHEID] r.259 koorts <3 mnd = direct arts toevoegen. [FEIT] r.226/280 kamertemp → 18°C.
- [STIJL] r.46 em-dash; "immature" → "onrijpe/onvolgroeide". [TAAL] "Gedrags Signalen" → "Gedragssignalen".

**`warmtestuwing-baby`**
- [KRITIEK] r.92-114 "112 bij >39°C" → koorts <3 mnd altijd direct arts; 112 alleen bij slap/stuiptrekkingen. [FEIT] r.135 kamertemp → 18°C.
- [VOLLEDIGHEID] medische disclaimer. [FEIT] r.43 "hyperthermie" nuanceren ("een vorm van").

**`baby-koorts-slaapzak`** — (geen belangrijke bevindingen; medisch het sterkste, gebruik als standaard). [TAAL] r.79 controleer calculator-link (/calculator vs /).

### Slaaptemperatuur / meten / inbakeren / prematuur

**`veilige-slaaptemperatuur`**
- [FEIT] "16-20°C ideaal" → 16-18°C. [KRITIEK/VOLLEDIGHEID] rugligging + disclaimer ontbreken. [FEIT] r.37 kop `text-white` mogelijk onleesbaar. [FEIT] r.63/83 slaap/melatonine-claim bronnen of afzwakken. [TAAL] r.336 "Hitteuitslag" → "hitte-uitslag".

**`babykamer-temperatuur`**
- [FEIT] "ideaal 16-20°C" vs eigen "boven 20°C = risico" (r.66-68) — trek consistent: ideaal 16-18, let op 18-20, te warm >20. [VOLLEDIGHEID] rugligging + disclaimer.

**`inbakeren-tog-waarde`**
- [KRITIEK] r.137/168 voeg de reden toe: een ingebakerde baby die naar de buik rolt kan niet terugrollen (verhoogd risico); daarom stoppen bij tekenen van omrollen. [KRITIEK] r.152 bij (verdenking) heupdysplasie niet inbakeren zonder overleg arts/consultatiebureau.
- [VOLLEDIGHEID] disclaimer. [FEIT] r.214 Swaddle UP (armen omhoog) botst met generieke "armen langs lichaam" r.139 — nuanceren. [TAAL] "moro-reflex", "armgaten".

**`premature-baby-tog-waarde`**
- [KRITIEK] r.63-139 concrete TOG/temperatuur-tabel voor prematuren → prominente disclaimer BOVEN de tabel ("indicatief, volg altijd kinderarts/NICU"). [TAAL] r.198 "armsgaten" → "armgaten".

**`baby-temperatuur-controleren`**
- [KRITIEK/VOLLEDIGHEID] r.121-136 toevoegen: baby <3 mnd met koorts → dezelfde dag huisarts. [FEIT] r.46 onderkoeling niet als wiegendood-risicofactor bestempelen (oververhitting is de bewezen factor).

### TOG-kernbegrippen

**`wat-is-tog`**
- [FEIT] r.118/332-334 TOG 1.0 "21-23°C" → 20-24°C (canoniek). r.336-339 rij "18-20°C → 1.5-2.0" harmoniseren (18-20°C → 2.0-2.5). r.233 kledinglaag 0.3 → 0.5 TOG.
- [VOLLEDIGHEID] rugligging/geen losse dekens expliciet.

**`wat-is-tog-waarde`**
- [KRITIEK/FEIT] r.97-102 "1.0-2.5 bij 18-24°C" en "2.5-3.5 bij 15-18°C" — 2.5 bij 24°C is oververhitting; rechttrekken met canonieke tabel.
- [FEIT] r.46 "Thermal Overall Grade" = backronym nuanceren. r.63 "80-95% isolatie" bronloos. [STIJL] r.62 gedachtestreepje-als-em-dash.

**`tog-waarde-berekenen`**
- [FEIT] r.79-81 "18-24°C → 1.0-2.5" en r.83-85 "15-18°C → 2.5-3.5" splitsen conform canonieke tabel. [VOLLEDIGHEID] rugligging/geen losse items.

**`tog-schaal-overzicht`**
- [KRITIEK/FEIT] r.34 "0.2 tot 4.0" + "vijf waardes" maar zes genoemd — consistent maken; 0.2 onderbouwen of weg. r.67 TOG 0.5 "23-26°C" → 24°C+. r.161/202 overlap 2.0/2.5 expliciet benoemen. r.298 kledinglaag 0.5 (uniformeren met wat-is-tog).
- [STIJL] r.204/255 merk-TOG-claims (Lodger 3.3, HEMA 3.5, Puckababy) verifiëren of generieker. r.234 "RIVM" → eerder VeiligheidNL/NCJ. [TAAL] r.219 "flannellen" → "flanellen".

**`tog-mythes-en-feiten`** (sterkste qua stijl/bronnen)
- [FEIT] r.70 "1.0 TOG bij 20°C" spanning met eigen winterlijn (2.5 bij 16-20°C) — nuanceren. r.78 "Britse standaard" (correct) vs "internationale" elders — harmoniseer. [TAAL] r.102 calculator-link /calculator vs /.

### TOG per situatie

**`tog-waarde-per-seizoen`**
- [VOLLEDIGHEID] zomersectie: "voeg nooit losse lakens/dekens toe" toevoegen. [STIJL] veel em-/en-dashes (r.34/332/368/371/445/448). [TAAL] r.89 "flannellen" → "flanellen".

**`tog-waarde-winter`**
- [KRITIEK/FEIT] r.53-54 ondergrens 12°C → <16°C (harmoniseren). r.71-75 zware combinaties: oververhittingswaarschuwing + nekcontrole toevoegen. [TAAL] r.83 "(intentioneel)" schrappen → duidelijk verbod op mutsje binnenshuis tijdens slaap.

**`baby-slapen-zomer`**
- [VOLLEDIGHEID] **ontbrekende SEO-metadata** (client component zonder metadata-export) — title/description toevoegen. [STIJL] r.115 "Te schrikken; lauw bad" kromme zin. [FEIT] r.49-51 banden herordenen (oplopend).

**`tog-waarde-babykleding-tabel`**
- [FEIT] r.144 ondergrens 14°C → 16°C (harmoniseren). [VOLLEDIGHEID] "dekens tellen niet mee, gebruik ze niet in de zomer" toevoegen.

**`kleding-onder-slaapzak`** (sterk op veiligheid)
- [FEIT] r.230/236 "16-20°C" vs "16-19°C" — één maken. [TAAL] "flannellen" → "flanellen" (r.236/274/307). [STIJL] em-/en-dashes (r.34/45/64/236/297/351/361/369).

### Producten / gidsen / praktisch / FAQ

**`baby-slaapzak-koopgids`**
- [FEIT] r.146 "0-6 mnd: 70cm" → 70cm is 3-6 mnd (newborn = 60cm). r.129 merk "Petit Stellou" verifiëren/vervangen. [VOLLEDIGHEID] kort naar "van-slaapzak-naar-dekbed" verwijzen. [TAAL] "Basis Garderobe" → "basisgarderobe".

**`nederlandse-merken-vergelijking`**
- [STIJL/KRITIEK] r.117/203/289/342/385 verzonnen testimonials/"nummer één"-superlatieven zonder bron → redactioneel herschrijven ("ouders noemen vaak...") zonder quotes. [FEIT] r.93/409 Puckababy "1.0" → 0.25 (Bag 4 Seasons: 0.25/0.5/2.0/2.5). r.206 Jollein 3.0 vs Puckababy — anekdote wringt met eigen specs. r.35 EN 16781-norm verifiëren/verzachten. r.265/421 HEMA 3.5 verifiëren. [STIJL] prijzen als "richtprijs" labelen; r.534 "Prénatal 59 winkels" verifiëren/weglaten.

**`van-slaapzak-naar-dekbed`** — (geen belangrijke bevindingen; sterkste van de set; VeiligheidNL correct genoemd). [VOLLEDIGHEID] kamertemp gelijktrekken naar canonieke range.

**`tog-waarde-gids`** (pillar)
- [KRITIEK] r.603-611 4.5 TOG-combi → corrigeren + max-4.0-regel toevoegen. [FEIT] r.377 Lodger "3.2" vs merkenpagina "3.3" — gelijktrekken/verifiëren. [VOLLEDIGHEID] max-TOG-4.0-grens expliciet noemen. [TAAL] r.561-562 "koel genoeg" → "warm genoeg" (wintercontext). [TAAL] class `text-secondary-dark-dark` (dubbel -dark) — mogelijk tikfout, checken.

**`autostoel-draagzak-warmte`** — (grotendeels prima; dikke jas uit, positional asphyxia correct). [VOLLEDIGHEID] korte disclaimer overwegen.

**`slaapzak-op-reis`** — (prima). [VOLLEDIGHEID] muts-advies harmoniseren (binnen/in slaapzak af, buiten bij kou mag op). [FEIT] r.69 "-5°C" als richtlijn framen.

**`slaapt-baby-slecht-check-voeding`** — (geen belangrijke bevindingen; disclaimer aanwezig, geen medische claims).

**`faq`** (sterk, bronnen genoemd)
- [STIJL] r.226/243-244 "u"-vorm → "je". [FEIT] r.64 EN 16781-norm dubbelchecken.

---

## 4. Aanpak-suggestie (zoals bij flesvoedingcalculator)

1. **Ronde 1 — veiligheid/medisch:** 4.0 TOG-plafond (gids), koorts-drempels, kritische ondergrens <16°C, inbakeren-veiligheid, prematuren-disclaimer, ontbrekende disclaimers + rugligging, zware-winter-combi-waarschuwing.
2. **Ronde 2 — canonieke TOG-tabel + kamertemp** overal doorvoeren (de inconsistente ranges), "factor 3.9", kledinglaag 0.5, Brits vs internationaal, backronym-nuance.
3. **Ronde 3 — merken/claims:** verzonnen testimonials/superlatieven, Puckababy/Lodger/HEMA-specs, prijzen als richtprijs, ontbrekende SEO-metadata (baby-slapen-zomer).
4. **Ronde 4 — taal/stijl:** em-dashes, "flannellen", "u"→"je" (FAQ), kromme zinnen, calculator-links, class-typo.

Per ronde build + push, net als bij fles.
