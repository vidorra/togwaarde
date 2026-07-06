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

## 4. Besluit (juli 2026, herzien): verdienmodel is 100% affiliate

Nieuwe feiten: AdSense stond bewust verborgen en de inkomsten waren nihil.
Het verdienmodel voor beide sites is volledig **affiliate marketing**
(bol.com en Amazon): relevante producten tonen bij de tool en artikelen.
- togwaarde: slaapzakken, gematcht op TOG-waarde (systeem bestaat al:
  AffiliateProductWidget met filterTag + admin-tags)
- flesvoedingcalculator: flesjes starterkits, sterilisatoren, spenen etc.
  per onderwerp/categorie

Belangrijk gevolg: **eigen affiliate-productkaarten zijn gewoon content**,
geen tracking. Een link naar bol.com/Amazon zet op ónze site geen cookies
(bol/Amazon regelen hun eigen consent na de klik). Zonder AdSense is er dus
geen advertentie-reden meer voor een cookiebanner.

**Gekozen model: volledig bannervrij op beide sites (scenario A)**
- AdSense-scripts en GoogleAdSlot-componenten verwijderen (beide sites)
- Umami (cookieless, self-host) wordt dé meettool: pageviews, bronnen,
  funnels, calculator_usage en affiliate_click over 100% van de bezoekers
- GA4, GTM, Clarity en de cookiebanner kunnen daarna van beide sites af;
  de site wordt lichter en de UX schoner (geen banner meer)
- GA4-property's laten bestaan (historie), maar niet meer laden

**Aandachtspunt bol-widgets:** affiliate-snippets van het type `bol_script`
injecteren JavaScript van partner.bol.com; dat kan third-party opslag doen.
Voor 100% bannervrij: productkaarten renderen als eigen afbeelding + tekst +
gewone affiliate-link (de widget en admin-snippets ondersteunen dit al via
image/link-weergave), en de bol-scriptvariant vermijden of per snippet
controleren. Amazon-links zijn al gewone links.

**Affiliate-uitrol (beide sites): home + elke artikelpagina**
- togwaarde home: slaapzak-blok onder het adviesresultaat, gematcht op de
  geadviseerde TOG (bestaat al op de homepage via reverse-slaapzakken)
- togwaarde artikelen: AffiliateProductWidget per pagina-id (reis, dekbed
  en producten-pagina bestaan al; overige artikelen aanvullen in admin)
- flesvoeding home: starterkit/bestsellers-blok onder de calculator
  (PopularProductsWidget bestaat al)
- flesvoeding artikelen: relevant blok per categorie (sterilisatoren bij
  hygiene, spenen bij voedingstechnieken, enz.), via het admin-systeem
- Vuistregel: 1 relevant productblok per pagina, boven de fold alleen op
  koopgerichte pagina's; content blijft leidend

## 5. Voorgestelde uitvoering (na akkoord)

1. Umami deployen op CapRover (database in bestaande Postgres, subdomein
   bijv. stats.server.devjens.nl)
2. Umami-script op beide sites + events calculator_usage en affiliate_click
3. Funnels inrichten: home -> advies -> affiliate_click en
   artikel -> calculator -> affiliate_click
4. AdSense volledig verwijderen (scripts, init, CSP-vermeldingen,
   GoogleAdSlot en de verborgen ad-units op flesvoeding)
5. Banner, GA4, GTM en Clarity verwijderen van beide sites (na 1-2 weken
   Umami parallel draaien ter controle)
6. Affiliate-uitrol per site: productblokken op home + artikelpagina's
   vullen via de admin (TOG-tags op togwaarde, categorieen op flesvoeding)
7. bol_script-snippets omzetten naar image/link-kaarten waar nodig

## 5b. Umami deploy-runbook (CapRover)

De code-kant staat al klaar op beide sites (UmamiScript-component met lege
WEBSITE_ID + event-spiegeling in trackEvent). Umami krijgt een eigen
database IN de bestaande gedeelde Postgres-instantie
`flesvoedingcalculator-db` (geen nieuwe Postgres nodig).

**Stap 1: database aanmaken (server-SSH)**
```bash
docker exec -it $(docker ps -qf name=flesvoedingcalculator-db) psql -U postgres -c \
  "CREATE USER umami WITH PASSWORD '<UMAMI_DB_WACHTWOORD>'; CREATE DATABASE umami OWNER umami;"
```

**Stap 2: CapRover-app (dashboard)**
1. Apps > nieuwe app: naam **stats** (geeft stats.server.devjens.nl)
2. HTTPS aanzetten + force HTTPS; Container HTTP Port: **3000**
3. App Configs > Environmental Variables:
   - `DATABASE_URL=postgresql://umami:<UMAMI_DB_WACHTWOORD>@srv-captain--flesvoedingcalculator-db:5432/umami`
   - `APP_SECRET=<APP_SECRET>`
4. Deployment > "Deploy via ImageName":
   `ghcr.io/umami-software/umami:postgresql-latest`
   (Umami draait zijn migraties zelf bij de eerste start)

**Stap 3: Umami inrichten (browser)**
1. https://stats.server.devjens.nl > inloggen met admin / umami
2. Direct het admin-wachtwoord wijzigen (Profiel > Wachtwoord)
3. Instellingen > Websites > Add website: togwaarde.nl en
   flesvoedingcalculator.nl > noteer beide **Website-ID's**

**Stap 4: Website-ID's invullen (code)**
- togwaarde: `components/UmamiScript.jsx` > WEBSITE_ID
- flesvoeding: `components/UmamiScript.tsx` > WEBSITE_ID
Commit + deploy; vanaf dan loopt alles (pageviews automatisch, events via
de bestaande trackEvent-spiegeling: calculator_usage, affiliate_click).

**Stap 5: funnels aanmaken in Umami** (Reports > Funnel)
- home -> /calculator -> event affiliate_click
- kennisbank-artikel -> home of /calculator -> event affiliate_click

## 6. Risico's en kanttekeningen

- Umami is een extra dienst om te draaien (updates, backups van de
  stats-database); minimaal maar niet nul onderhoud
- Historie: Umami begint op nul; GA4-historie blijft bestaan in Google
- "Terugkerende bezoekers" en week-retentie verdwijnen uit beeld bij
  volledig cookieless; accepteer dat bewust
- Juridisch: cookieless meten zonder banner is de expliciete opzet van deze
  tools en breed geaccepteerd (CNIL-lijn); 100% formele AP-zekerheid bestaat
  in NL voor geen enkele tool, maar dit is de veiligste variant die er is
