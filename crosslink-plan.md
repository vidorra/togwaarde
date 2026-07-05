# Cross-link plan: flesvoedingcalculator.nl ↔ togwaarde.nl

Doel: togwaarde.nl (jong, weinig autoriteit) laten meeliften op flesvoedingcalculator.nl
(ouder, meer bezoekers), en beide sites relevanter maken door echte inhoudelijke bruggen.

## Analyse: wat werkt hier wel en niet

**De realiteit vooraf.** Beide sites draaien op dezelfde server (zelfde IP), zelfde
eigenaar, zelfde niche. Google herkent dat verband vrijwel zeker. Dat betekent:

- Links tussen de sites tellen als "brand network"-links, niet als onafhankelijke
  backlinks. Ze geven wél waarde (crawling, indexatie, relevantie, entiteit-associatie),
  maar minder dan een externe link van een onafhankelijk domein.
- De grootste échte winst is **verkeer en gedragssignalen**: flesvoedingcalculator heeft
  bezoekers die letterlijk de doelgroep van togwaarde zijn (ouders van baby's die
  's nachts voeden en aankleden). Een goed geplaatste link stuurt echte bezoekers, en
  bezoekers die blijven hangen zijn het sterkste SEO-signaal dat togwaarde kan krijgen.
- Risico om te vermijden: site-brede keyword-rijke links ("tog waarde calculator" in
  elke footer) zijn een klassieke footprint voor linkschema's. Merk-anchors en
  contextuele links zijn veilig.

**Conclusie:** weinig links, maar op precies de juiste plekken, met eerlijke
merk-/beschrijvende anchors. Kwaliteit boven kwantiteit.

## Fase 1: branded footer-vermelding (beide sites, laag risico)

Eén regel in de footer-onderbalk, alleen merknaam als anchor:

- **flesvoedingcalculator.nl footer:** "Van de makers van FlesvoedingCalculator:
  [TOGWaarde.nl](https://togwaarde.nl), de slaapzak en aankleedwijzer voor je baby."
- **togwaarde.nl footer:** "Ook van ons: [FlesvoedingCalculator.nl](https://flesvoedingcalculator.nl),
  bereken hoeveel flesvoeding je baby nodig heeft."

Regels: dofollow, gewoon 1 link per site, merknaam als anchor (geen keyword-anchor),
in de bestaande onderbalk naast de copyright-regel.

## Fase 2: contextuele kennisbank-links (de echte winst)

In-content links vanuit artikelen waar de lezer er echt iets aan heeft. Prioriteit
ligt bij flesvoeding → togwaarde (autoriteit en verkeer stromen die kant op).

### flesvoedingcalculator.nl → togwaarde.nl (5 links)

| Artikel (flesvoeding) | Linkt naar (togwaarde) | Anchor (voorstel) |
|---|---|---|
| praktische-tips/flesvoeding-en-slapen | / (homepage, kledingadvies) | "welke slaapzak en kleding bij welke kamertemperatuur" |
| praktische-tips/flesvoeding-bij-warm-weer | /kennisbank/baby-slapen-zomer | "baby veilig laten slapen in de zomer" |
| praktische-tips/nachtvoeding-optimaliseren | /kennisbank/veilige-slaaptemperatuur | "de veilige slaaptemperatuur voor je baby" |
| voedingstechnieken/juiste-temperatuur-controleren | /kennisbank/baby-temperatuur-controleren | "de lichaamstemperatuur van je baby controleren" |
| basis-flesvoeding/flesvoeding-bij-premature-babys | /kennisbank/premature-baby-tog-waarde | "TOG-waarde en aankleden bij premature baby's" |

### togwaarde.nl → flesvoedingcalculator.nl (5 links)

| Artikel (togwaarde) | Linkt naar (flesvoeding) | Anchor (voorstel) |
|---|---|---|
| kennisbank/baby-slapen-zomer | praktische-tips/flesvoeding-bij-warm-weer | "flesvoeding geven bij warm weer" |
| kennisbank/premature-baby-tog-waarde | basis-flesvoeding/flesvoeding-bij-premature-babys | "flesvoeding bij premature baby's" |
| kennisbank/baby-temperatuur-controleren | voedingstechnieken/juiste-temperatuur-controleren | "de temperatuur van de fles controleren" |
| kennisbank/veilige-slaaptemperatuur | praktische-tips/nachtvoeding-optimaliseren | "nachtvoedingen rustig laten verlopen" |
| kennisbank/oververhitting-herkennen | praktische-tips/flesvoeding-bij-warm-weer | "extra vocht aanbieden bij warm weer" |

Plaatsing: als lopende zin in de tekst waar het onderwerp langskomt, of als
"Lees ook"-blokje onderaan de relevante sectie. Geen exact gespiegelde paren
op dezelfde twee artikelen heen en weer; de tabellen hierboven variëren bewust.

## Fase 3: structurele bruggen (later, hoogste duurzame waarde)

1. **Nieuw brugartikel op flesvoedingcalculator:** "Nachtvoeding: zo leg je je baby
   daarna goed terug" (aankleden, temperatuur, TOG) met 1 à 2 links naar togwaarde.
   Dit artikel kan zelf ranken op "baby terugleggen na nachtvoeding".
2. **Nieuw brugartikel op togwaarde:** "Slaapt je baby slecht? Check ook de voeding"
   met link naar voedingsritme/nachtvoeding op flesvoedingcalculator.
3. **Partners-pagina's:** beide sites hebben/krijgen een partnerspagina waar de
   zustersite met logo en één alinea beschreven staat (entiteit-signaal).
4. **Structured data:** zelfde `Organization` (publisher) in schema markup op beide
   sites zodat Google de sites als één merk-entiteit ziet; dat maakt de kruislinks
   legitiem in plaats van verdacht.

## Wat we bewust NIET doen

- Geen site-brede keyword-anchors ("tog waarde calculator" in elke footer/sidebar)
- Geen links vanuit elke kennisbankpagina; alleen waar het de lezer helpt
- Geen linkruil-patroon (A→B en B→A op exact dezelfde paginaparen)
- Geen doorverwijzende redirects of iframes tussen de sites

## Meetpunten (na 4-6 weken)

- Search Console togwaarde: impressies/klikken op "welke kleding baby nacht"-queries
- Referral-verkeer flesvoedingcalculator → togwaarde (GA4)
- Indexatiestatus /calculator en / op togwaarde

## Status (uitgevoerd 5 juli 2026)

- [x] Fase 1: footer-vermelding beide sites (branded anchor in onderbalk)
- [x] Fase 2: 5 + 5 contextuele links geplaatst volgens de tabellen hierboven
- [x] Fase 3.1: brugartikel flesvoedingcalculator:
      `/kennisbank/praktische-tips/baby-terugleggen-na-nachtvoeding`
- [x] Fase 3.2: brugartikel togwaarde:
      `/kennisbank/slaapt-baby-slecht-check-voeding`
- [x] Fase 3.3: zustersite-blok op beide partnerspagina's
- [x] Fase 3.4: gedeelde Organization ("Vidorra") met sameAs naar beide domeinen
      in de schema markup van beide sites

Meetpunten checken vanaf ~half augustus 2026 (zie hierboven).
