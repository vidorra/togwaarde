# TOGwaarde.nl — Fix Roadmap

Werkt de punten uit `improvements.md` weg, in volgorde van risico.
Legenda: 🧑 = alleen Jens kan dit (CapRover/DNS) · 🤖 = Claude kan dit uitvoeren

---

## Fase 0 — Direct (al gedaan ✅)

- [x] `trash/` (met database-credentials) uit git verwijderd en gitignored
- [x] Security-batch gecommit: JWT-verificatie op alle admin endpoints, bcrypt
      auth, geen default JWT secret, rate limiting, CORS naar togwaarde.nl

## Fase 1 — Deze week: secrets & deploy 🧑

> Zonder deze stappen is de credential-lek niet gedicht en faalt admin-login
> na de eerstvolgende deploy (fail-closed, publieke site draait gewoon door).

- [ ] 🧑 **Postgres-wachtwoord roteren op CapRover** (flesvoedingcalculator-db).
      Het oude wachtwoord staat voorgoed in de git-history.
      Daarna `DATABASE_URL` van de app(s) bijwerken en herstarten.
- [ ] 🧑 **Env vars zetten op CapRover (togwaarde app):**
  - `JWT_SECRET`: random, 32+ tekens (`openssl rand -base64 32`)
  - `ADMIN_PASSWORD_HASH`: genereer met
    `node -e "require('bcryptjs').hash(process.argv[1], 12).then(console.log)" 'wachtwoord'`
  - `ADMIN_PASSWORD` laten staan tot Fase 2 klaar is (login-route gebruikt die nog)
- [ ] 🧑 Deploy en check: inloggen op `/admin` werkt, admin API's geven 401 zonder token

**Klaar wanneer:** oud DB-wachtwoord werkt niet meer; admin werkt met nieuwe env vars.

## Fase 2 — Auth consolideren ✅ (gedaan)

Bleek schoner dan gedacht: het dashboard gebruikte de JWT-Bearer-flow al
correct (`/api/admin/login` → token in localStorage → `Authorization: Bearer`).
`AdminAuth.jsx` + `/api/admin-auth` waren dode/orphan code (nergens geïmporteerd).

- [x] `/api/admin/login` gebruikt nu bcrypt tegen `ADMIN_PASSWORD_HASH`, met
      fallback naar plaintext `ADMIN_PASSWORD` zolang de hash nog niet gezet is
      (geen lockout tijdens overgang). JWT-respons ongewijzigd.
- [x] `components/AdminAuth.jsx` verwijderd (ongebruikte cosmetische sessionStorage-flow)
- [x] `/api/admin-auth` route verwijderd (alleen door AdminAuth aangeroepen)
- [x] `lib/rate-limiter.js` blijft de enige rate-limiter
- [ ] 🧑 Daarna `ADMIN_PASSWORD` env var verwijderen op CapRover zodra
      `ADMIN_PASSWORD_HASH` gezet is en login getest

**Klaar wanneer:** 1 login-route, bcrypt, JWT end-to-end. ✅

## Fase 3 — Dependencies ✅ (grotendeels gedaan)

- [x] `npm audit fix` (non-breaking) + `npx update-browserslist-db@latest`
- [x] `jspdf` → 4.2.1 (lost **critical** op; enige gebruik in voedingsschemas
      gebruikt alleen stabiele core-API `text`/`save`/`splitTextToSize`)
- [x] `drizzle-orm` → 0.45.2 (lost **high** SQL-injectie op; query's zijn
      standaard select/insert/update/delete + eq/and, geen rauwe identifiers)
- [x] `jws` high opgelost via audit fix (relevant voor JWT-auth)
- [x] Volledige productie-build groen (58/58 pagina's)
- [ ] 🧑 `next` 14.2.35 is al de hoogste 14.2.x; resterende Next-CVE's vereisen
      een **Next 15 major upgrade** — aparte, geteste klus (App Router async API's)
- [ ] Resterende 9 audit-meldingen zijn **dev-only** (`glob` via eslint/tailwind,
      `esbuild` via drizzle-kit) — geen runtime/productie-impact

**Klaar wanneer:** geen critical/high in productie-deps. ✅ (alleen dev-tooling + Next-major resteren)

## Fase 4 — SEO-fixes ✅ (gedaan)

- [x] `public/robots.txt`: sitemap → `https://togwaarde.nl/sitemap.xml`,
      plus `Disallow` voor `/v2`, `/v3`, `/calculator`, `/admin`
- [x] `noindex, nofollow` + canonical → `/` op `/calculator`, `/v2`, `/v3`
      via route-segment `layout.jsx` (client-pagina's kunnen zelf geen metadata
      exporteren; een server-layout wel)
- [x] Homepage-metadata: `/` erft al volledige metadata (title/description/OG/
      canonical) uit de root-`layout.jsx`, dus aparte server-split was overbodig
- [ ] Na keuze winnend ontwerp: verliezende varianten verwijderen en
      sitemap.xml actualiseren

**Klaar wanneer:** 1 canonieke calculatorpagina indexeerbaar, juiste sitemap. ✅

## Fase 5 — Opschonen ✅ (gedaan)

- [x] Dode bestanden uit git verwijderd: `calc.html`, `dekens.tsx`,
      `improved-tog-calculator.tsx`, `components/TOGCalculator.jsx.backup`,
      `app/api/affiliate-automation/route.js.bak`, `lib/affiliate-automation.js.bak`,
      `app/admin/dashboard/page.jsx.backup.*`
- [x] `max-height: 100vh` weggehaald van `html, body` in `app/globals.css`
- [x] `<img>` → `next/image` voor hero-afbeeldingen op v2 en v3
- [ ] GA-script naar `next/script`: **bewust uitgesteld** — staat in `<head>`
      met comment "voor verificatie"; verplaatsen kan Google Search Console-
      verificatie raken. Marginale winst (alleen build-warning), niet het risico waard.

**Klaar wanneer:** schone `git ls-files`, geen CSS-footgun, minder build-warnings. ✅

## Fase 6 — Nice to have 💡

- [ ] AdSense-domein (`pagead2.googlesyndication.com`) aan CSP toevoegen als
      ads gewenst zijn op v3
- [ ] Weer-feature: ipapi.co (1k req/dag gratis) degradeert stil naar
      seizoensschatting; eventueel server-side proxy met cache als dit vaker raakt
- [ ] Redis (`REDIS_URL`) aanzetten voor rate-limiting over deploys heen

---

*Status: Fase 0, 2, 4, 5 klaar en Fase 3 grotendeels (alle productie-deps gepatcht).
Resteert voor jou: **Fase 1** (CapRover — DB-wachtwoord roteren + `JWT_SECRET` en
`ADMIN_PASSWORD_HASH` zetten), de optionele **Next 15** upgrade, en Fase 6.*
