# Plan: één pagina voor "tog waarde" en merkpagina's (togwaarde.nl)

Opgesteld 16 november 2026. Bronnen: Search Console-export van 5 juli t/m
14 november 2026 (208 klikken, 9.252 vertoningen) en de code op `main`.

## Doel

1. Voor de hoofdterm "tog waarde" één sterke pagina overhouden in plaats van
   vijf die elkaar in de weg zitten.
2. Bezoekers met koopintentie binnenhalen via pagina's per slaapzakmerk.
3. Nu het winter wordt: op de pagina's die al verkeer krijgen de warme
   slaapzakken (TOG 2.5 en 3.5) tonen.

## Wat de data zegt

**De hoofdtermen staan op pagina 7.** Samen ruim 1.100 vertoningen, 0 klikken:

| Zoekopdracht | Vertoningen | Positie |
|---|---|---|
| tog waarde | 286 | 74 |
| tog-waarde | 224 | 68 |
| tog-waarde slaapzak | 220 | 63 |
| wat is tog waarde | 113 | 74 |
| tog-waarde slapen | 110 | 65 |
| tog-waarde temperatuur | 89 | 71 |
| tog waarde slaapzak | 46 | 74 |

**Vijf URL's mikken op dezelfde vraag**, plus de homepage:

| URL | Title | Canonical | Interne links | Vertoningen | Positie | Klikken |
|---|---|---|---|---|---|---|
| `/` | Gratis TOG Calculator voor Babyslaapzak | ja | overal | 1.037 | 71 | 20 |
| `/tog-waarde-gids/` | TOG-waarde: complete gids voor veilige babyslaap | ja | 1 pagina | 1.561 | 36 | 11 |
| `/kennisbank/wat-is-tog/` | Wat is TOG? Uitleg TOG Waarde voor Babyslaapzakken | ja | footer + 2 pagina's | 1.439 | 62 | 3 |
| `/kennisbank/wat-is-tog-waarde/` | Wat is TOG-waarde? Betekenis en Uitleg | nee | 1 pagina | 14 | 17 | 0 |
| `/wat-is-tog-waarde/` | Wat is TOG Waarde? Complete Uitleg | nee | geen | niet in Search Console | | |

Wat hieruit volgt:

- De gids is de langste pagina en staat het hoogst, maar is bijna een wees:
  de enige interne link komt van `/kennisbank/wat-is-tog-waarde/`, een van de
  pagina's die verdwijnt. De footer linkt naar `wat-is-tog`, niet naar de gids.
- `/wat-is-tog-waarde/` staat in de sitemap, heeft geen canonical en geen
  enkele interne link. Google toont hem nergens.
- De drie "wat is"-pagina's kregen samen 3 klikken in ruim vier maanden.
  Samenvoegen kost dus geen verkeer.
- De site kan wel ranken: `warmtestuwing-baby` (positie 8), `baby-koorts-slaapzak`
  (5,6), `kleding-onder-slaapzak` (7,2) en de merkenvergelijking (8,2) staan
  op pagina 1. Het probleem zit specifiek bij de hoofdterm.

**Eerlijke verwachting.** Dat de vijf pagina's elkaar hinderen is een
vermoeden, geen gemeten oorzaak. Het kan ook zijn dat Google de site voor zo'n
brede term nog te jong vindt (Search Console heeft pas data sinds 5 juli).
Samenvoegen is de goedkoopste stap en hoe dan ook nodig. Reken op een
verbetering van positie ±70 naar 20 à 30 binnen zes tot acht weken, niet op
pagina 1. Lukt dat niet, dan zijn links van andere sites de volgende hefboom.

## Vooraf: nulmeting en redirect

- [ ] In Search Console: Prestaties, filter op zoekopdracht "tog waarde", tab
      Pagina's. Noteer hier welke URL Google toont en met hoeveel vertoningen.
      Herhaal voor "tog-waarde slaapzak" en "wat is tog waarde".
      Wijkregel: krijgt de homepage daar meer dan 70% van de vertoningen, dan
      wordt de homepage de doelpagina voor "tog waarde" en de gids die voor
      "wat is tog waarde". In alle andere gevallen geldt het besluit hieronder.
      Stand 16-11: gemiddelde positie 73,5 bevestigd; welke pagina Google
      toont is nog niet nagekeken. Tot die tijd geldt het besluit hieronder.
- [x] (Gecontroleerd 16-11: één 301 naar https zonder www.) www naar niet-www was twee keer een 302 (eerst naar http). In CapRover
      via "Edit Default Nginx Configurations" beide `return 302` naar `301`
      zetten en de doorstuurregel naar `https://togwaarde.nl$request_uri`.

## Deel 1: samenvoegen tot één pijlerpagina

**Besluit: `/tog-waarde-gids/` wordt de pijler.** Hij staat het hoogst, heeft
al een canonical en de meeste inhoud. De homepage blijft de tool en houdt
"tog calculator" (positie 1,5).

- [x] **Inhoud samenvoegen.** (16-11: gids herschreven, tabel en advies uit
      [lib/tog-advies.ts](lib/tog-advies.ts), dezelfde bron als de calculator.
      De claim "1946 Shirley Institute" is eruit: geen bron.) Loop de drie "wat is"-pagina's langs en neem
      alleen over wat de gids nog mist. Niet langer maken om het langer maken:
      overlap schrappen. Volgorde van de nieuwe gids:
      1. Antwoord in de eerste twee zinnen: wat TOG is, in gewone taal.
      2. Tabel TOG per kamertemperatuur, opgebouwd uit
         [lib/tog-constants.ts](lib/tog-constants.ts) zodat tabel en calculator
         nooit uit elkaar lopen.
      3. Knop naar de calculator.
      4. Per TOG-waarde kort wat het is, met link naar
         `/kennisbank/tog-schaal-overzicht/`. Die pagina blijft bestaan: hij
         staat gemiddeld op positie 12 en is de logische plek voor
         zoekopdrachten als "tog 2.5" en "tog 3.5".
      5. Veelgestelde vragen, bronnen (Lullaby Trust, JGZ-richtlijn).
- [x] **Title en H1 op de hoofdterm.** Voorstel title: "TOG-waarde: uitleg en
      tabel per temperatuur | TOGWaarde.nl". Voorstel H1: "TOG-waarde: wat het
      is en welke je baby nodig heeft".
- [x] **Redirects** in [next.config.js](next.config.js), permanent, naar
      `/tog-waarde-gids/`:
      `/wat-is-tog-waarde`, `/kennisbank/wat-is-tog-waarde`, `/kennisbank/wat-is-tog`.
      Daarna de drie mappen onder `app/` verwijderen.
- [x] **Interne links omzetten.** `components/Footer.jsx` (regel 74), de twee
      items `wat-is-tog` en `wat-is-tog-waarde` in
      `app/kennisbank/KennisbankClient.jsx` (worden één item naar de gids), en
      de links in `tog-waarde-berekenen` en `tog-mythes-en-feiten`.
- [x] **Nieuwe links naar de gids.** Op de homepage onder de calculator, op
      `/calculator/` en in alle 24 kennisbankartikelen één link direct onder de
      intro (16-11), drie linkteksten verdeeld over 8 artikelen elk.
      Wissel de linktekst af: "TOG-waarde", "wat is TOG-waarde", "TOG-tabel".
- [x] **Sitemap.** In `public/sitemap.xml` de drie URL's verwijderen en de
      `lastmod` van de gids bijwerken.
- [ ] In Search Console de gids opnieuw laten indexeren (Jens).
- [x] **Controle na deploy.** (Live 16-11: met slash één 308, zonder slash
      twee stappen, alle zes eindigen op de gids met 200.) `curl -sIL` op de drie oude URL's, met en zonder
      slash aan het eind: één stap, status 308, eindigt op de gids. (Next geeft
      308 bij `permanent: true`; Google behandelt dat als 301.)
      Lokaal getest 16-11: met slash één stap; zonder slash twee stappen,
      omdat Next eerst de slash toevoegt. Dat is voor Google geen probleem.

## Deel 2: winter, nu meteen (admin, geen code)

**Admin-fout gevonden en opgelost (16-11).** De admin-paginalijst gaf de
togwaarde-pagina's een id met `tog_` ervoor (`tog_tog-waarde-winter`), terwijl
de widgets op de site `tog-waarde-winter` opvragen. Een koppeling per pagina
kwam dus nooit op de site. Nu kloppen de ids, staan ook de gids en
`reverse-slaapzakken` (homepage, onder de uitkomst) in de lijst, en maakt de
admin ontbrekende rijen in `pages` zelf aan.

De homepage toont al slaapzakken met de berekende TOG. De artikelen hieronder
krijgen verkeer en hebben een productblok in de code. Welke producten er nu in
staan is vanuit de code niet te zien: dat staat in de database.

- [x] Slaapzakken met TOG 2.5 en 3.5 bovenaan: automatisch sinds 16-11-2026.
      De API sorteert op de TOG uit de tag van het product
      ([lib/togVolgorde.js](lib/togVolgorde.js)): nov-mrt 2.5-3.5, jun-aug
      0.5-1.0, rest 1.0-2.5; `tog-waarde-winter` altijd winter,
      `baby-slapen-zomer` altijd zomer. Bij gelijke afstand geldt de
      admin-volgorde, producten zonder TOG in de tag gaan achteraan.
- [ ] `baby-koorts-slaapzak` (616 vertoningen, positie 5,6) heeft geen
      productblok. Bij koorts geen slaapzakken aanprijzen: hooguit een
      kamerthermometer, of bewust leeg laten. Keuze aan Jens.

**Bol-kliks worden op togwaarde mogelijk niet geteld.** De admin toont voor
togwaarde 533 berekeningen en 4 kliks, alle vier Amazon, bol 0. Bol-producten
worden hier getoond via het script van bol
(`BolScriptWidget` in [components/AffiliateProductWidget.jsx](components/AffiliateProductWidget.jsx)).
Een klik binnen dat ingevoegde bol-onderdeel wordt alleen herkend als de muis
erboven hing, en dat werkt niet op een telefoon (92% van de Google-klikken). Alleen
de eigen knop "Bekijk op bol.com" telt zeker mee.

- [x] In de admin nakijken of er op togwaarde bol-snippets gekoppeld zijn.
      Antwoord Jens 16-11: alleen Amazon. Bol 0 is dus echt 0; eerst
      bol-producten toevoegen.
- [x] Bol-producten tonen als eigen kaart (foto, naam, prijs, link), zoals de
      Gedaan 16-11: bol en Amazon delen één kaart (ProductCard), geen bol-script
      meer, link via partner.bol.com (anders opgebouwd uit productId + siteId),
      geen lege doos of admin-melding als een pagina geen producten heeft.
      homepage van flesvoedingcalculator al doet. Dan telt elke klik mee en
      laadt er geen script van bol meer: dat stond al als stap 7 in
      [cookieless-analytics-plan.md](cookieless-analytics-plan.md).
      Dit eerst doen: het blok onder de uitkomst op togwaarde is de proef voor
      het productblok dat op flesvoedingcalculator gepland staat.

## Deel 3: merkpagina's

**Wat de data zegt over vraag per merk:**

| Merk | Zoekopdrachten | Vertoningen | Positie | Voorbeeld |
|---|---|---|---|---|
| Puckababy | 20 | 155 | 15 | "tog waarde puckababy", "puckababy tog tabel" |
| HEMA | 12 | 106 | 23 | "hema tog waarde", "hema tog tabel" |
| Jollein | 3 | 6 | 10 | "jollein tog schema" |
| Meyco | 0 | 0 | | |

Voor Jollein en Meyco is er in onze data dus geen aantoonbare vraag. Dat kan
komen doordat we er nergens voor ranken, maar het is geen reden om er nu al
vier te bouwen.

**Besluit: in twee rondes.**

- Ronde A: Puckababy en HEMA.
- Ronde B: Jollein en Meyco, alleen als de pagina's uit ronde A na zes weken
  vertoningen trekken, of als een zoekwoordtool voldoende volume laat zien.

**Commercieel verschil.** Puckababy is het duurst (de vergelijkingspagina
noemt 60 tot 90 euro) en staat op bol.com: de beste kans op commissie. HEMA
heeft een partnerprogramma via TradeTracker. Jens heeft zich op 16-11-2026
aangemeld; de goedkeuring loopt nog. De HEMA-pagina kan dus naar de eigen
HEMA-slaapzakken linken, maar pas na goedkeuring en na de bouwstap hieronder.

**Derde winkel in het snippetsysteem.** Het systeem kent nu alleen bol en
Amazon. De admin biedt alleen die twee aan, het productblok op de homepage
van flesvoedingcalculator toont bij elk ander type het logo van bol, de
statistiek "kliks per platform" zet de rest onder "overig", en de
route `/api/affiliates/page/[pageId]` geeft voor elk ander type niets terug:
een HEMA-snippet zou op togwaarde niet verschijnen. Nodig is een algemeen
type "link" (foto, naam, prijs, link, winkelnaam en logo). De prijs van
HEMA-producten vul je met de hand in: de prijssync leest alleen bol.

**Opzet per merkpagina**

- URL: `/kennisbank/puckababy-tog-waarde/` en `/kennisbank/hema-slaapzak-tog-waarde/`.
- H1 volgt de zoekvraag: "Puckababy TOG-waarde: tabel per slaapzak en temperatuur".
- Bovenaan het antwoord: tabel met per model de TOG, de kamertemperatuur
  waarbij hij past en wat eronder gaat. Het kledingadvies komt uit
  `lib/tog-constants.ts`, dus gelijk aan de calculator.
- Waar het advies van het merk afwijkt van onze tabel: dat benoemen.
- Productblok met de slaapzakken van dat merk (eigen `pageId`, volgorde in de
  admin, winter bovenaan).
- Link naar de calculator en naar de pijlerpagina.
- Onderaan: "TOGWaarde.nl is niet verbonden aan [merk]". Geen logo's.

**Feiten: alleen uit de bron.** Elke TOG-waarde en elk model komt van de
productpagina of maattabel van het merk zelf, met URL en datum van controle in
een opmerking in de code. Niets overnemen uit
`nederlandse-merken-vergelijking`: de productgegevens daar (zoals het
TOG-bereik per merk) zijn bij de content-audit van juli niet nagekeken. Geen
"ervaringen van ouders" schrijven die we niet kunnen aantonen.

**Bouwstappen ronde A**

- [ ] Per merk de modellen en TOG-waardes verzamelen uit de bron. Ontbreekt een
      waarde, dan staat die niet op de pagina.
- [ ] Twee pagina's bouwen volgens de opzet hierboven.
- [ ] Registreren: item in `KennisbankClient.jsx`, URL in `public/sitemap.xml`,
      pagina in de admin-paginalijst zodat er snippets aan te koppelen zijn.
- [ ] Winkeltype "link" toevoegen: keuze in de admin (in de
      flesvoedingcalculator-repo), weergave in beide apps, eigen logo, en HEMA
      als eigen regel in "kliks per platform".
- [ ] Snippets per merk aanmaken en koppelen (Jens, in de admin). HEMA pas na
      goedkeuring door TradeTracker; tot dan staat de pagina live zonder
      productblok.
- [ ] `nederlandse-merken-vergelijking` ombouwen tot overzicht dat naar de
      merkpagina's linkt. De meta description belooft nu "eerlijke reviews van
      ouders": schrappen, en de productgegevens daar meteen naast de bron leggen.
- [ ] Vanuit de pijlerpagina en `baby-slaapzak-koopgids` naar de merkpagina's
      linken.

## Wat we bewust niet doen

- Geen nieuwe URL voor de pijler. `/tog-waarde-gids/` heeft al een positie en
  een verhuizing kost weer weken.
- `tog-schaal-overzicht` niet samenvoegen: die rankt zelfstandig.
- Nog niet aan deze dubbelingen komen, eerst het effect van de pijler afwachten:
  `/calculator/` en `/kennisbank/tog-waarde-berekenen/` (beide "TOG-waarde
  berekenen"), `tog-waarde-winter` en `tog-waarde-per-seizoen`,
  `wiegendood-preventie` en `wiegendood-voorkomen-tog`.
- Geen vier merkpagina's tegelijk.

## Meetpunten

Wekelijks in Search Console, eerste oordeel na zes weken:

| Wat | Nu | Doel na 6 tot 8 weken |
|---|---|---|
| Positie "tog waarde" | 74 | onder de 30 |
| Positie "tog-waarde slaapzak" | 63 | onder de 30 |
| Klikken op de gids per 28 dagen | ±2 | 30 of meer |
| Vertoningen merkzoekopdrachten per 28 dagen | ±55 gemiddeld | verdubbeld |
| Positie "tog waarde puckababy" | 16 | top 5 |

Affiliate-kliks per merkpagina lees je in de admin onder Statistieken, per snippet.

## Open vragen voor Jens

1. Welke URL toont Google nu voor "tog waarde"? (Filter op de zoekopdracht,
   daarna de tab Pagina's.)
2. Staan er op togwaarde bol-snippets gekoppeld, of alleen Amazon?
3. `baby-koorts-slaapzak`: kamerthermometer tonen of leeg laten?
4. Staan er in het campagne-overzicht van TradeTracker meer babywinkels of
   slaapzakmerken? Die kunnen via hetzelfde winkeltype "link" mee.

Beantwoord op 16-11: HEMA loopt via TradeTracker, aanmelding ingediend.
