# Google Plan TOGWaarde.nl - SEO & Insights

Eén plan voor alles rond Google: Search Console, Analytics, Tag Manager,
technische SEO, content en de maandelijkse meetroutine. Bouwt voort op
`vragen-content.md` (50 vragen + regex) en `crosslink-plan.md`.

Stand vandaag: GA4 eigen stream (G-JC52G66X85), GTM (GTM-W88NL33G, lege
container), gtag hardcoded, sitemap/robots/canonicals/redirects opgeschoond,
Organization-schema gedeeld met flesvoedingcalculator.nl, FAQ-schema op /faq.

---

## 1. Google Search Console (inzicht)

**Eenmalige setup**
- [ ] Property `togwaarde.nl` (domein-property via DNS) geverifieerd
- [ ] Sitemap indienen: `https://togwaarde.nl/sitemap.xml`
- [ ] Indexdekking controleren na de opschoning: de 9 verwijderde phantom-URLs
      en de 6 verwijderde fork-routes moeten als redirect/404 uitfaseren
- [ ] URL-inspectie op de 4 kernpagina's: `/`, `/calculator`, `/kennisbank`,
      `/producten` (indexeerbaar, juiste canonical)
- [ ] Check dat `/old`, `/v2`, `/reverse` netjes als redirect worden gezien

**Maandelijkse regex-routine** (regexes staan in `vragen-content.md`)
- [ ] Draai de 6 thema-regexes in Prestaties > Zoekopdracht > Aangepast
- [ ] Noteer per thema: impressies, klikken, gemiddelde positie
- [ ] Thema met impressies maar CTR < 1%: titel/description van de doelpagina
      herschrijven (de vraag letterlijk in de title zetten)
- [ ] Thema met impressies maar geen dekkende pagina: volgende artikel uit
      het actieplan in `vragen-content.md` schrijven
- [ ] Los daarnaast: filter op `flesvoeding` om te zien of togwaarde nog op
      zustersite-onderwerpen rankt (hoort af te nemen na de purge)

## 2. Google Analytics 4 (gedrag)

**Setup afronden**
- [ ] Realtime-check na deploy: verkeer komt binnen op G-JC52G66X85
- [ ] Verwijzingsverkeer flesvoedingcalculator.nl -> togwaarde.nl als
      apart kanaal bekijken (Rapporten > Acquisitie > Verkeersbron)
- [ ] Google Signals / dataretentie op 14 maanden zetten (standaard is 2)
- [ ] GSC koppelen aan GA4 (Beheer > Product-koppelingen > Search Console)

**Events die het verschil maken (via GTM, geen code nodig)**
- [ ] `calculator_gebruikt`: klik/input op de temperatuurslider (element-id
      trigger op de homepage)
- [ ] `advies_gezien`: zichtbaarheid van het adviesblok (element visibility)
- [ ] `affiliate_click`: klik op uitgaande links naar bol.com/amazon
      (trigger: click url bevat `partner.bol.com` of `amazon`)
- [ ] `zustersite_click`: klik naar flesvoedingcalculator.nl
- [ ] `calculator_switch`: klik op de banner-knoppen tussen / en /calculator
- [ ] Markeer `affiliate_click` als key event (conversie)

**Waarom dit belangrijk is:** affiliate_click is de omzet-proxy. Pas als dit
gemeten wordt, kun je zien welke artikelen en welke TOG-adviezen geld opleveren
en waar je meer producten moet toevoegen.

## 3. Google Tag Manager (uitvoering)

- [ ] Bovengenoemde events als tags/triggers inrichten in GTM-W88NL33G
- [ ] GEEN GA4-configuratietag met G-JC52G66X85 aanmaken (gtag staat hardcoded
      op de site; anders meet je pageviews dubbel). Events via GTM sturen naar
      hetzelfde measurement ID kan wel, mits alleen events, geen page_view
- [ ] Let op CSP: custom-HTML-tags die inline scripts injecteren kunnen door
      strict-dynamic geblokkeerd worden; gebruik de ingebouwde GA4-eventtags

## 4. Consent Mode v2 (verplicht, blokkeert anders alles)

De site draait GA4 + AdSense zonder cookiebanner. Voor NL/EU is Consent Mode
v2 met een CMP sinds maart 2024 een eis van Google zelf (anders degradeert
AdSense-personalisatie en riskeer je AVG-problemen).

- [ ] CMP kiezen (gratis en Google-gecertificeerd: bijv. Cookiebot free tier,
      Consentmanager, of Google's eigen Funding Choices via AdSense)
- [ ] Consent Mode v2 defaults (denied) vóór gtag/GTM laden
- [ ] Zelfde oplossing op flesvoedingcalculator.nl uitrollen

Dit is de belangrijkste ontbrekende bouwsteen van het hele plan.

## 5. Technische SEO

**Al gedaan** (ter referentie): canonicals per pagina, noindex op /calculator
weggehaald en variant-routes verwijderd, 301-redirects, sitemap uit echte
routes, robots.txt gefixt, Organization-schema met sameAs, FAQ-schema,
CSP-veilige scripts, dark-mode contrastfix, next/image op hero's.

**Nog te doen**
- [ ] Structured data uitbreiden: `WebApplication`-schema op beide calculators
      en `BreadcrumbList` op kennisbankartikelen
- [ ] `Article`-schema (datePublished/dateModified) op kennisbankartikelen
- [ ] Core Web Vitals meten na deploy (PageSpeed Insights voor / en
      /calculator, mobiel); LCP-kandidaat: hero-afbeeldingen priority geven
- [ ] OG-images: 1 nette og-image per kernpagina (nu overal dezelfde)
- [ ] Titels A/B: vraag-vorm titels gebruiken ("Wat moet je baby aan bij
      18 graden?") conform de 50-vragenlijst
- [ ] Interne links: elk nieuw artikel linkt naar minimaal 2 bestaande
      artikelen en 1 calculator

## 6. Content (uit vragen-content.md)

Volgorde op verwacht rendement:
- [x] FAQ-uitbreiding uitgevoerd (12 vragen + categorie, 21 vragen in FAQ-schema)
- [x] Artikel 1: autostoel-draagzak-warmte (hoog volume, veiligheidsintentie)
- [x] Artikel 2: van-slaapzak-naar-dekbed (koopintentie einde klantreis)
- [x] Artikel 3: baby-koorts-slaapzak (angst-intentie, lage concurrentie)
- [x] Artikel 4: slaapzak-op-reis (+ cross-link zustersite, affiliate reiszakken)
- [x] Artikel 5: tog-mythes-en-feiten (deelbaar, forum-frustratie)
- [ ] Cadans: 1 artikel per 1 à 2 weken; elk artikel in de sitemap + kennisbank-
      index + minstens 1 affiliate-blok waar relevant

## 7. Autoriteit & off-page

- [ ] Cross-link fase 1-3 met flesvoedingcalculator.nl staat live; meet vanaf
      half augustus (GSC + GA4-referrals)
- [ ] 3 gratis NL-vermeldingen regelen: startpagina-achtige babyoverzichten,
      oudersvannu-linkpagina's, kraampakket-lijstjes (branded anchor)
- [ ] Digitale-PR-kans: elk jaar bij de eerste hittegolf een "hoe laat ik mijn
      baby veilig slapen bij 30 graden"-persmoment (journalisten zoeken dit);
      de zomer-pagina is de landingspagina
- [ ] Consultatiebureaus/verloskundigenpraktijken: printbare TOG-tabel (PDF)
      aanbieden met bronvermelding en link

## 8. Maandelijkse meetroutine (30 min)

| Check | Waar | Actie bij afwijking |
|---|---|---|
| Regex-thema's impressies/klikken | GSC | Titel herschrijven of artikel schrijven |
| Indexdekking (fouten, uitgesloten) | GSC | Redirect/canonical fixen |
| affiliate_click per pagina | GA4 | Producten toevoegen op toppers |
| Referrals van zustersite | GA4 | Cross-links bijsturen |
| Realtime na elke deploy | GA4 | Tagging kapot? direct fixen |
| CWV mobiel (/, /calculator) | PageSpeed | Regressies aanpakken |

## 9. Volgorde van uitvoeren

1. **Week 1:** Consent Mode v2 + CMP (blokkeert al het andere meetwerk),
   GSC-property + sitemap check, GA4-GSC koppeling
2. **Week 2:** GTM-events (affiliate_click eerst), FAQ-uitbreiding
3. **Week 3-8:** artikelen 1 t/m 5, elk met schema + interne links
4. **Doorlopend:** maandroutine hoofdstuk 8; kwartaalreview van dit plan
