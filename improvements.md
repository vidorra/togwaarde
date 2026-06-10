# TOGwaarde.nl — Project Analysis & Improvements

> Analysis date: 28 May 2026. Status legend: ✅ fixed · ⏳ action needed · 💡 suggestion

## Critical

### 1. Database credentials were committed to GitHub ✅ / ⏳
`trash/DATABASE_CREDENTIALS.md` was tracked in git and pushed, containing the
Postgres password for the CapRover database (value redacted here).

- ✅ Removed `trash/` from git tracking and added it to `.gitignore`
- ⏳ **Rotate the Postgres password on CapRover** — the old value remains in git
  history. Rotation makes the leaked value useless; rewriting history
  (`git filter-repo` + force push) is optional after that.

### 2. Admin APIs were unauthenticated in committed code ✅ / ⏳
The committed versions of the admin API routes had `isAuthenticated() { return true }`
and plaintext password comparison. A security-hardening batch existed locally but
was never committed:

- JWT verification (`verifyAdminAndGetWebsite`, HS256 pinned) on all admin routes:
  admin-pages, admin-snippets, admin-page-snippets, sync-prices, admin-health,
  create-snippet-enhanced, generate-snippet, affiliate-automation, bol-feed, test-db
- bcrypt password hash check in `/api/admin-auth` (env: `ADMIN_PASSWORD_HASH`)
- `JWT_SECRET` required (no fallback default secret)
- Rate limiting on auth endpoints
- CORS narrowed from `*` to `https://togwaarde.nl`
- Secret-prefix logging removed from contact route; error details no longer leaked

- ✅ Batch reviewed, committed and pushed
- ⏳ **Before/at next deploy, set on CapRover:**
  - `JWT_SECRET` (random 32+ chars)
  - `ADMIN_PASSWORD_HASH` — generate with:
    `node -e "require('bcryptjs').hash(process.argv[1], 12).then(console.log)" 'your-password'`
  - Keep `ADMIN_PASSWORD` set as long as `/api/admin/login` still uses it (see §3)

## Important

### 3. Two parallel admin auth systems ⏳
- `/api/admin-auth`: bcrypt check, returns only `{success}` — issues **no token**
- `/api/admin/login`: issues the JWT the admin APIs require, but still compares
  **plaintext** `ADMIN_PASSWORD`
- `components/AdminAuth.jsx` calls the first and sets a client-side
  `sessionStorage` flag — cosmetic gating only, and it never obtains the JWT

**Fix:** consolidate on one flow: bcrypt check → issue JWT → client stores token →
admin fetches send `Authorization: Bearer`. Delete the other route.

### 4. Dependency vulnerabilities ⏳
`npm audit --omit=dev`: 1 critical, 3 high (as of analysis date)
- **jspdf** (critical): path traversal, JS injection — bump major
- **next** 14.2.31 (high): middleware SSRF, DoS — plan upgrade + test
- **drizzle-orm** (high): SQL injection via identifiers — fix in ≥0.45.2 (breaking)
- **jws** (high): HMAC verification flaw — relevant because auth = JWT/HS256;
  `npm audit fix` covers this one

### 5. robots.txt points to the wrong domain ⏳
`public/robots.txt` declares `Sitemap: https://flesvoedingcalculator.nl/sitemap.xml`
(copy-paste from the other project). Change to `https://togwaarde.nl/sitemap.xml`.

### 6. Duplicate calculator pages all indexable ⏳
`/`, `/calculator`, `/v2`, `/v3` render near-identical content with no `noindex`
and no canonical. While testing variants: add `noindex` (or canonical → `/`) to
`/calculator`, `/v2`, `/v3`. Delete the losing variants after picking a winner.

## Suggestions 💡

- **Homepage is fully client-rendered** (`'use client'` on `/`, `/v2`, `/v3`) so no
  per-page `metadata` export. Wrap in a server component that exports metadata and
  renders the client part for better SEO.
- **Dead files tracked in git:** `calc.html`, `dekens.tsx`,
  `improved-tog-calculator.tsx`, `components/TOGCalculator.jsx.backup`,
  `*.bak` files, timestamped dashboard backup. Git is the backup; delete them.
- **`max-height: 100vh` on `html, body`** in `app/globals.css` is incorrect CSS
  (pages are taller than the viewport). Currently harmless, latent footgun for
  sticky positioning.
- **In-memory rate limiter** in `/api/admin-auth` is a module-level array: global
  (not per-IP) and resets every deploy. `lib/rate-limiter.js` is the better
  pattern; reuse it.
- **ipapi.co free tier** (1k req/day) is called from every visitor's browser for
  the "Vannacht in …" feature. Degrades silently to seasonal estimates at real
  traffic; fine by design, just know it fails first.
