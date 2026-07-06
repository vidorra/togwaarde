# Plan: meten zonder (vervelende) cookiebanner

Vraag: kunnen we geanonimiseerd funnels en klikgedrag meten zonder toestemming,
en zo van de banner af? Antwoord: ja, grotendeels. Dit plan legt uit wat
juridisch kan, welke tools passen, wat je mist en wat de opties zijn.
Nog niets uitgevoerd; eerst kiezen.

## 1. Waarom er nu een banner nodig is (de regels in het kort)

De banner-eis komt niet uit de AVG maar uit de ePrivacy-regels
(Telecommunicatiewet art. 11.7a): toestemming is nodig zodra je iets
**opslaat of uitleest op het apparaat** van de bezoeker (cookies,
localStorage) dat niet strikt noodzakelijk is. Er is een uitzondering voor
metingen met "geen of geringe gevolgen voor de privacy".

- **GA4 zet cookies** (_ga) en koppelt aan Google-servers: valt niet onder de
  uitzondering. De AP heeft (anders dan destijds voor Universal Analytics)
  nooit een "privacyvriendelijke GA4"-handleiding gepubliceerd en noemt GA4
  zonder toestemming risicovol. GA4 "cookieless pings" via Consent Mode
  bestaan, maar zijn een grijs gebied en geven alleen gemodelleerde data.
- **AdSense** wil cookies voor gepersonaliseerde advertenties: banner nodig,
  of accepteren dat EU-bezoekers "limited ads" zien.
- **Clarity** (session recording) kan niet zonder toestemming.
- **Cookieless analytics-tools** (geen cookies, geen apparaat-opslag, geen
  persoonsgegevens, data in de EU) vallen onder de uitzondering en mogen
  zonder banner. Dit is precies waarvoor Plausible, Simple Analytics, Umami
  en Matomo-cookieless gebouwd zijn; de Franse CNIL heeft dit model expliciet
  goedgekeurd voor Matomo-cookieless.

## 2. Wat jij wilt meten vs wat cookieless kan

Gewenst: funnels, click rate, geanonimiseerd, geen persoonsdata.

| Meting | Cookieless tool | GA4 met consent |
|---|---|---|
| Paginaweergaves, bronnen/referrers (ook zustersite) | ✅ | ✅ |
| UTM-campagnes | ✅ | ✅ |
| Custom events (calculator_usage, affiliate_click) | ✅ | ✅ |
| Funnels (home -> calculator -> affiliate_click) | ✅ (binnen sessie) | ✅ |
| Uitgaande kliks / CTR per pagina | ✅ | ✅ |
| Land, apparaat, browser | ✅ | ✅ |
| Terugkerende bezoekers over dagen/weken | ❌ (geen cookie = geen herkenning) | ✅ |
| Cross-device journeys, retentie-cohorten | ❌ | ✅ (met Signals) |
| Demografie/interesses | ❌ | ✅ (Signals, consent) |
| Google Ads-koppeling/remarketing | ❌ | ✅ |
| Search Console SEO-data | ✅ (GSC zelf blijft los van dit alles) | ✅ |

Conclusie: voor funnels en klikgedrag mis je met cookieless vrijwel niets.
Wat je echt inlevert: terugkerende-bezoeker-herkenning en alles rond
Google Ads. Beide zijn voor deze sites nu niet relevant.

## 3. Tool-opties

| Optie | Kosten | Funnels | Hosting | Banner nodig |
|---|---|---|---|---|
| **Umami (self-host)** | €0 (eigen CapRover + bestaande Postgres) | ✅ ingebouwd | eigen VPS (EU) | ❌ |
| Plausible Cloud | ~€9/mnd (EU-cloud) | ✅ | EU SaaS | ❌ |
| Simple Analytics | ~€19/mnd (Nederlands bedrijf) | beperkt | EU SaaS | ❌ |
| Matomo cookieless self-host | €0 + funnel-plugin €199/jr | betaald | eigen VPS | ❌ |
| GA4 + Consent Mode (huidig) | €0 | ✅ | Google/VS | ✅ |

**Advies: Umami self-hosted.** Past bij jullie stack (CapRover, bestaande
Postgres, alles in eigen beheer), kost niets, heeft events + funnels +
realtime, één script van ~2 kB (sneller dan gtag), en meet 100% van de
bezoekers in plaats van alleen wie op Accepteren klikt. Data blijft op de
eigen server in Falkenstein.

## 4. Besluit (juli 2026): beide sites krijgen advertenties

Richting vastgesteld: beide sites krijgen in de toekomst AdSense-units op de
homepage en op elke artikelpagina. Daarmee vervalt het bannervrij-scenario
(dat werkte alleen zonder gepersonaliseerde advertenties) en wordt het beleid
voor beide sites gelijk:

**Gekozen model: hybride op beide sites**
- **Banner + Consent Mode v2 blijven** (staat al live, subtiel vormgegeven).
  Dit is precies het juiste setup voor het advertentiemodel:
  - bezoeker accepteert -> gepersonaliseerde AdSense (hoogste eCPM) + GA4
  - bezoeker weigert -> AdSense schakelt automatisch naar limited/niet-
    gepersonaliseerde ads (nog steeds omzet, geen cookies) en GA4 meet niet
- **Umami parallel erbij** voor wat GA4 nooit kan leveren: funnels en
  klikdata over 100% van de bezoekers, cookieless, dus ook de weigeraars.
  GA4 blijft voor de accepterende meerderheid (retentie, Ads-koppeling later).

Feitelijke stand advertentie-inventory (check juli 2026):
- flesvoedingcalculator: units op 48+ pagina's (kennisbank-sidebar, home)
- togwaarde: script geladen maar 0 units geplaatst; GoogleAdSlot-component
  bestaat al en wordt nergens gebruikt

**Nog te plannen: advertentie-uitrol togwaarde** (aparte klus)
- Home: 1 unit onder het adviesblok of tussen de secties
- Artikelpagina's: 1 unit na de eerste sectie of onder Gerelateerde
  Artikelen (zelfde patroon als flesvoeding-sidebar)
- Balans bewaken: niet meer dan 1-2 units per pagina zolang het verkeer
  klein is; affiliate-blokken behouden voorrang op de koopgerichte pagina's

## 5. Voorgestelde uitvoering (na akkoord)

1. Umami deployen op CapRover (one-click/Docker, database in bestaande
   Postgres-instantie, subdomein bijv. stats.server.devjens.nl)
2. Umami-script op beide sites (2 kB, geen consent-gate nodig) + events:
   calculator_usage en affiliate_click parallel aan GA4 doorzetten
3. Funnels inrichten in Umami: home -> advies gezien -> affiliate_click en
   kennisbank -> calculator -> affiliate_click
4. Advertentie-uitrol togwaarde plannen en plaatsen (zie hierboven)
5. Na 2 maanden: GA4-consentgraad en Umami-dekking naast elkaar leggen;
   banner en tags blijven, dit wordt de vaste meetcombinatie

## 6. Risico's en kanttekeningen

- Umami is een extra dienst om te draaien (updates, backups van de
  stats-database); minimaal maar niet nul onderhoud
- Historie: Umami begint op nul; GA4-historie blijft bestaan in Google
- "Terugkerende bezoekers" en week-retentie verdwijnen uit beeld bij
  volledig cookieless; accepteer dat bewust
- Juridisch: cookieless meten zonder banner is de expliciete opzet van deze
  tools en breed geaccepteerd (CNIL-lijn); 100% formele AP-zekerheid bestaat
  in NL voor geen enkele tool, maar dit is de veiligste variant die er is
