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

## Fase 2 — Auth consolideren 🤖 (~2 uur)

Eén auth-flow in plaats van twee halve:

- [ ] `/api/admin/login` ombouwen: bcrypt-check tegen `ADMIN_PASSWORD_HASH`
      (nu nog plaintext `ADMIN_PASSWORD`), JWT teruggeven zoals nu
- [ ] `components/AdminAuth.jsx` ombouwen: token uit login-response opslaan
      en als `Authorization: Bearer` meesturen in alle admin-fetches
      (sessionStorage-vlag "authenticated" vervalt)
- [ ] `/api/admin-auth` route verwijderen (overbodig na bovenstaande)
- [ ] In-memory rate-limit array in admin-auth vervalt mee; `lib/rate-limiter.js`
      blijft de standaard
- [ ] 🧑 Daarna `ADMIN_PASSWORD` env var verwijderen op CapRover

**Klaar wanneer:** 1 login-route, bcrypt, JWT end-to-end, devtools-bypass onmogelijk.

## Fase 3 — Dependencies 🤖 (~1-2 uur, met testronde)

- [ ] `npm audit fix` (dekt o.a. `jws`, relevant voor JWT-auth)
- [ ] `jspdf` major bump (critical: path traversal / JS-injectie); gebruik checken
      en PDF-export testen
- [ ] `drizzle-orm` naar ≥0.45.2 (SQL-injectie via identifiers; breaking, dus
      query's nalopen + db-routes testen)
- [ ] `next` upgraden binnen 14.x naar gepatchte versie (SSRF in middleware
      redirects raakt ons: wij gebruiken middleware); volledige build + smoke test
- [ ] Browserslist updaten: `npx update-browserslist-db@latest`

**Klaar wanneer:** `npm audit --omit=dev` toont 0 critical / 0 high.

## Fase 4 — SEO-fixes 🤖 (~1 uur)

- [ ] `public/robots.txt`: sitemap-regel naar `https://togwaarde.nl/sitemap.xml`
      (wijst nu naar flesvoedingcalculator.nl) en Allow-lijst nalopen op
      togwaarde-routes
- [ ] `noindex` op `/calculator`, `/v2`, `/v3` zolang het experimenten zijn
- [ ] Homepage opsplitsen: server component met `export const metadata`
      (title/description/OG per pagina) die de client-calculator rendert;
      zelfde patroon voor v2/v3 zolang die bestaan
- [ ] Na keuze winnend ontwerp: verliezende varianten verwijderen en
      sitemap.xml actualiseren

**Klaar wanneer:** 1 canonieke calculatorpagina indexeerbaar, juiste sitemap-verwijzing.

## Fase 5 — Opschonen 🤖 (~30 min)

- [ ] Dode bestanden uit git: `calc.html`, `dekens.tsx`,
      `improved-tog-calculator.tsx`, `components/TOGCalculator.jsx.backup`,
      `app/api/affiliate-automation/route.js.bak`, `lib/affiliate-automation.js.bak`,
      `app/admin/dashboard/page.jsx.backup.*`
- [ ] `max-height: 100vh` weghalen van `html, body` in `app/globals.css`
- [ ] `<img>` → `next/image` voor hero-afbeeldingen (v2/v3, build-warnings)
- [ ] GA-script in `app/layout.jsx` naar `next/script` (build-warning)

**Klaar wanneer:** schone `git ls-files`, geen latente CSS-footgun, minder build-warnings.

## Fase 6 — Nice to have 💡

- [ ] AdSense-domein (`pagead2.googlesyndication.com`) aan CSP toevoegen als
      ads gewenst zijn op v3
- [ ] Weer-feature: ipapi.co (1k req/dag gratis) degradeert stil naar
      seizoensschatting; eventueel server-side proxy met cache als dit vaker raakt
- [ ] Redis (`REDIS_URL`) aanzetten voor rate-limiting over deploys heen

---

*Volgorde-advies: Fase 1 kost je 15 minuten en dicht het echte lek. Fase 2-5 kan
Claude in één sessie wegwerken zodra Fase 1 staat.*
