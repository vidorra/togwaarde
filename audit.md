# TOGwaarde.nl Project Audit

**Audit Date:** 12 January 2026
**Auditor:** Claude Code
**Project:** TOG Waarde Calculator Nederland
**Version:** 1.0.0

---

## Executive Summary

This audit evaluates the TOGwaarde.nl project across three key areas:
1. **Accuracy** - Alignment with Dutch and international baby sleep safety guidelines
2. **Security** - Protection of user data and system integrity
3. **Code Quality** - Best practices, maintainability, and performance

### Overall Assessment

| Category | Rating | Status |
|----------|--------|--------|
| Accuracy | **B+** | Good with minor improvements needed |
| Security | **B-** | Adequate with significant concerns |
| Code Quality | **B** | Good with room for improvement |

---

## 1. Accuracy Audit: TOG Values vs Dutch Guidelines

### 1.1 Reference Sources

The audit compared TOGCalculator.jsx values against:
- **VeiligheidNL** (Kinderveiligheid.nl) - Dutch child safety authority
- **JGZ-richtlijn Preventie wiegendood** - NCJ (Nederlands Centrum Jeugdgezondheid)
- **Het Groene Kruis** - Dutch health organization
- **The Lullaby Trust** (UK) - Referenced as NHS/Lullaby Trust in code
- **American Academy of Pediatrics (AAP)**

### 1.2 Temperature Recommendations

#### Official Dutch Guidelines (VeiligheidNL):
> "De beste temperatuur voor de slaapkamer van je baby is 16-18°C"

#### Calculator Implementation:
```javascript
// Line 475 in TOGCalculator.jsx
<span className="font-bold text-primary">Ideaal: 18-22°C (AAP: 20-22°C)</span>
```

| Source | Recommended Range |
|--------|------------------|
| VeiligheidNL | 16-18°C |
| The Lullaby Trust | 16-20°C |
| AAP | 20-22°C |
| **Calculator Display** | 18-22°C |

**Finding:** The calculator shows 18-22°C as "ideal" which slightly differs from the Dutch VeiligheidNL recommendation of 16-18°C. The range is acceptable but leans warmer than Dutch standards.

**Severity:** LOW
**Recommendation:** Update to display "Ideaal: 16-20°C (VeiligheidNL/NHS)" for better Dutch alignment.

---

### 1.3 TOG Value Recommendations by Temperature

#### Official Guidelines (Combined Sources):

| Temperature | VeiligheidNL | Lullaby Trust | Calculator |
|-------------|--------------|---------------|------------|
| >26°C | 0.5 TOG | 0.5 TOG | 0.2-0.5 TOG |
| 24-26°C | - | 0.5 TOG | 0.2-0.5 TOG |
| 22-24°C | 1.0 TOG | 1.0 TOG | 0.5-1.0 TOG |
| 20-22°C | 2.0 TOG | 2.5 TOG | 1.0-2.5 TOG |
| 18-20°C | 2.5 TOG | 2.5 TOG | 2.5 TOG |
| 16-18°C | 2.5 TOG | 2.5 TOG | 2.5-3.5 TOG |
| <16°C | - | 3.5 TOG | 3.5 TOG |

#### Calculator Implementation (Line 240-247):
```javascript
const berekenAanbevolenTOG = (temp) => {
  if (temp >= 24) return { min: 0.2, ideal: 0.5, max: 0.5 }
  if (temp >= 22) return { min: 0.5, ideal: 0.8, max: 1.0 }
  if (temp >= 20) return { min: 1.0, ideal: 1.2, max: 2.5 }
  if (temp >= 18) return { min: 2.5, ideal: 2.5, max: 2.5 }
  if (temp >= 16) return { min: 2.5, ideal: 2.5, max: 3.5 }
  return { min: 3.5, ideal: 3.5, max: 3.5 }
}
```

**Finding:** TOG recommendations align well with international guidelines. The code correctly references NHS/Lullaby Trust standards in comments (Line 239, 244).

**Severity:** NONE
**Status:** COMPLIANT

---

### 1.4 Clothing TOG Values (Estimates)

#### Calculator Values (Lines 21-29):
```javascript
const kledingWaarden = {
  'luier': { TOG: 0.1, naam: 'Alleen luier', info: 'Geschatte waarde' },
  'korte_romper': { TOG: 0.2, naam: 'Korte mouw romper', info: 'Geschatte waarde' },
  'lange_romper': { TOG: 0.8, naam: 'Lange mouw romper', info: 'Standaard katoen (0.8-1.0 TOG)' },
  'dun_slaappak': { TOG: 0.6, naam: 'Dun slaappakje', info: 'Geschatte waarde' },
  'dik_slaappak': { TOG: 0.9, naam: 'Dik slaappakje', info: 'Geschatte waarde' },
  'vestje': { TOG: 0.3, naam: 'Vestje', info: 'Geschatte waarde' },
  'sokjes': { TOG: 0.1, naam: 'Sokjes', info: 'Geschatte waarde' }
}
```

**Finding:** The calculator correctly labels these as "geschatte waarden" (estimated values). There is no industry standard for individual clothing TOG ratings - only sleeping bags have official certifications (EN 16781:2018).

The code properly disclaims this:
- Line 339-341: Modal explaining these are estimates
- Line 516-520: Info alert warning users
- Line 901-905: Footer disclaimer

**Severity:** NONE
**Status:** PROPERLY DISCLOSED

---

### 1.5 Blanket Safety Guidelines

#### Dutch Guidance (VeiligheidNL/NCJ):
- Loose blankets: Not recommended for babies under 12 months
- Tucked blankets: Allowed if properly secured ("feet to foot" method)
- Sleeping bags: Preferred alternative

#### Calculator Implementation (Lines 31-37):
```javascript
const dekenWaarden = {
  'ingestopt_laken': { TOG: 0.2, naam: 'Ingestopt lakentje', info: 'Veilig indien goed ingestopt' },
  'ingestopt_katoen': { TOG: 1.2, naam: 'Ingestopte katoenen deken', info: 'Stevig onder armen instoppen - vouw NIET dubbel!' },
  'ingestopt_muslin': { TOG: 0.8, naam: 'Ingestopte hydrofiele deken', info: 'Lichtgewicht, ademend' },
  'los_deken': { TOG: 1.5, naam: 'Losse deken (12+ mnd)', info: 'ALLEEN voor 12+ maanden!' }
}
```

**Findings:**
1. Loose blankets correctly restricted to 12+ months (Lines 233-237)
2. Warning about double-folding blankets (Lines 609-618)
3. "Feet to foot" instructions included (Lines 374-381)
4. Footer specifically warns about loose blanket dangers (Lines 907-909)

**Severity:** NONE
**Status:** COMPLIANT WITH BEST PRACTICES

---

### 1.6 Safety Warnings

#### Maximum TOG Warnings (Lines 859-892):
- Warning at 3.5-4.0 TOG: "Zeer hoge TOG-waarde!"
- Critical warning above 4.0 TOG: "Totale TOG boven veilige limiet!"

**Finding:** Good implementation of safety thresholds.

#### Temperature Warnings:
- Below 16°C warning (Lines 481-485): Correctly advises 3.5 TOG slaapzak
- Above 24°C warning (Lines 487-492): Correctly warns of overheating risk

**Severity:** NONE
**Status:** EXCELLENT SAFETY IMPLEMENTATION

---

### 1.7 Missing Dutch-Specific Information

**Finding:** The calculator references international sources (NHS, Lullaby Trust, AAP) but could benefit from more explicit Dutch source citations.

**Recommendation:** Add direct references to:
- VeiligheidNL (veiligheid.nl)
- NCJ JGZ-richtlijn Preventie wiegendood
- Consultatiebureau guidelines

**Severity:** LOW

---

## 2. Security Audit

### 2.1 Authentication System

#### Admin Login (app/api/admin/login/route.js):
```javascript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'
```

**CRITICAL FINDING:** Hardcoded fallback credentials!

| Issue | Severity | Location |
|-------|----------|----------|
| Default password 'admin123' | **CRITICAL** | Line 7 |
| Default JWT secret | **CRITICAL** | Line 8 |

**Risk:** If environment variables are not set, the application runs with predictable, insecure defaults.

**Recommendation:**
1. Remove fallback values entirely
2. Fail startup if required secrets are not configured
3. Implement proper error handling for missing configuration

---

### 2.2 Authentication Bypass Vulnerability

#### Snippets API (app/api/admin/snippets/route.js, Lines 34-38):
```javascript
// Fallback to session-based auth for backwards compatibility
// In production, you should remove this and require JWT
console.warn('⚠️  Using fallback session auth - JWT token not provided')
return { admin: true, fallback: true }
```

**CRITICAL FINDING:** Authentication bypass allows any request without JWT to pass!

**Risk:** Any unauthenticated user can access admin API endpoints.

**Severity:** **CRITICAL**
**Recommendation:** Remove this fallback immediately in production.

---

### 2.3 JWT Token Configuration

| Aspect | Status | Notes |
|--------|--------|-------|
| Token expiry | OK | 24 hours (Line 25 login/route.js) |
| Algorithm | RISK | Not explicitly specified (defaults may vary) |
| Secret strength | DEPENDS | On environment configuration |

**Recommendation:** Explicitly specify algorithm: `{ algorithm: 'HS256', expiresIn: '24h' }`

---

### 2.4 Rate Limiting

#### Contact Form (app/api/contact/route.js):
```javascript
const windowMs = 15 * 60 * 1000 // 15 minutes
const maxAttempts = 5 // max 5 submissions per 15 minutes
```

**Finding:** Rate limiting implemented but uses in-memory Map storage.

| Issue | Severity |
|-------|----------|
| In-memory storage (lost on restart) | MEDIUM |
| Per-process storage (not shared across instances) | MEDIUM |
| No rate limiting on admin endpoints | HIGH |

**Recommendation:**
1. Use Redis for persistent rate limiting
2. Add rate limiting to /api/admin/* endpoints

---

### 2.5 Input Validation & Sanitization

#### Contact Form (Lines 72-126):
- Name length validation (2-100 chars)
- Email format validation
- Message length validation (10-5000 chars)
- Basic XSS prevention: `name?.replace(/[<>]/g, '')`
- Spam pattern detection

**Finding:** Good basic validation, but XSS prevention is minimal.

**Recommendation:** Use a proper sanitization library like `DOMPurify` or `xss`.

---

### 2.6 Security Headers

#### Middleware (middleware.js):
```javascript
response.headers.set('X-Frame-Options', 'DENY')  // Admin routes
response.headers.set('X-Content-Type-Options', 'nosniff')
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
```

**Finding:** Good security headers implemented.

**Missing Headers:**
- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-XSS-Protection (deprecated but still used)

**Severity:** MEDIUM

---

### 2.7 Environment Variable Security

#### .gitignore Check:
```
.env
.env*.local
```

**Finding:** Environment files correctly excluded from git.

#### .env.example Review:
- Contains placeholder values
- No real credentials exposed
- Provides clear documentation

**Status:** COMPLIANT

---

### 2.8 Database Security

| Aspect | Status |
|--------|--------|
| SQL Injection | PROTECTED (Drizzle ORM) |
| Connection string | Via environment variable |
| Schema validation | Basic (could be stricter) |

---

### 2.9 Third-Party Script Injection Risk

#### AffiliateProductWidget.jsx (Lines 21-44):
```javascript
tempDiv.innerHTML = product.generatedHtml
// ...
scripts.forEach((oldScript) => {
  const newScript = document.createElement('script')
  // Copy attributes and execute
  scriptContainer.appendChild(newScript)
})
```

**HIGH RISK FINDING:** Dynamic script execution from database content.

**Risk:** If an attacker compromises the admin panel or database, they can inject malicious JavaScript that executes on all user browsers.

**Severity:** **HIGH**
**Recommendation:**
1. Validate script sources against whitelist (partner.bol.com only)
2. Implement Content Security Policy
3. Consider using iframe sandboxing instead

---

### 2.10 Security Summary Table

| Issue | Severity | Status |
|-------|----------|--------|
| Default admin password | CRITICAL | NEEDS FIX |
| Default JWT secret | CRITICAL | NEEDS FIX |
| Auth bypass in snippets API | CRITICAL | NEEDS FIX |
| Dynamic script execution | HIGH | NEEDS REVIEW |
| No admin rate limiting | HIGH | NEEDS FIX |
| Missing CSP headers | MEDIUM | SHOULD FIX |
| In-memory rate limiting | MEDIUM | SHOULD FIX |
| Minimal XSS prevention | MEDIUM | SHOULD FIX |
| Missing HSTS | LOW | CONSIDER |

---

## 3. Code Quality Audit

### 3.1 Project Structure

```
togwaarde/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── admin/          # Admin pages
│   └── kennisbank/     # Knowledge base articles
├── components/          # React components
├── lib/                # Utility functions & database
├── data/               # Static data files
├── styles/             # CSS files
└── public/             # Static assets
```

**Finding:** Well-organized structure following Next.js 14 conventions.

**Status:** GOOD

---

### 3.2 Component Quality

#### TOGCalculator.jsx (918 lines):
**Findings:**
- Single component handles too much logic
- Good use of constants for configuration
- Proper state management with useState
- useEffect dependencies correctly specified
- Clear variable naming in Dutch (appropriate for Dutch market)

**Issues:**
- Component is too large (918 lines)
- Business logic mixed with UI rendering
- No TypeScript (JSX only)

**Recommendations:**
1. Extract calculation logic into custom hooks
2. Split into smaller sub-components
3. Consider TypeScript migration for type safety

---

### 3.3 Error Handling

#### API Routes:
```javascript
try {
  // ... logic
} catch (error) {
  console.error('Error:', error)
  return NextResponse.json({ error: 'Message' }, { status: 500 })
}
```

**Finding:** Consistent try-catch patterns, but:
- Error details sometimes exposed in development mode
- No centralized error handling
- No error monitoring integration

**Severity:** LOW

---

### 3.4 Performance Considerations

#### next.config.js:
```javascript
compress: true,
poweredByHeader: false,
experimental: {
  optimizePackageImports: ['lucide-react']
}
```

**Positive Findings:**
- Compression enabled
- Powered-by header removed (security)
- Package import optimization
- Image optimization configured

**Issues:**
- `images.unoptimized: true` disables Next.js image optimization
- No explicit caching strategies for API routes

---

### 3.5 Dependencies Review

#### package.json Analysis:

| Dependency | Version | Status |
|------------|---------|--------|
| next | ^14.0.0 | Current |
| react | ^18.2.0 | Current |
| drizzle-orm | ^0.44.5 | Current |
| jsonwebtoken | ^9.0.2 | Current |
| lucide-react | ^0.309.0 | Slightly old |

**Security Concern:** No `npm audit` output provided, but dependencies appear reasonably current.

**Recommendation:** Run `npm audit` regularly and update dependencies.

---

### 3.6 Code Duplication

**Finding:** Some repeated patterns across API routes:
- JWT verification code duplicated in multiple routes
- Error response formatting inconsistent

**Recommendation:** Create shared utilities:
```javascript
// lib/auth.js
export function verifyAdminToken(request) { ... }

// lib/api-response.js
export function errorResponse(message, status) { ... }
```

---

### 3.7 Documentation

| Aspect | Status |
|--------|--------|
| README | Not audited |
| Code comments | Good (in Dutch & English) |
| API documentation | Missing |
| Component documentation | Minimal |

---

### 3.8 Accessibility

**Calculator Component:**
- Semantic HTML used (labels, buttons)
- InfoTooltip component appears accessible
- Color contrast should be verified

**Recommendation:** Add ARIA labels where appropriate, especially for interactive elements.

---

## 4. Recommendations Summary

### Critical (Fix Immediately)

1. **Remove hardcoded fallback credentials**
   - File: `app/api/admin/login/route.js`
   - Lines: 7-8

2. **Remove authentication bypass**
   - File: `app/api/admin/snippets/route.js`
   - Lines: 34-38

3. **Review dynamic script execution**
   - File: `components/AffiliateProductWidget.jsx`
   - Implement whitelist validation

### High Priority

4. **Add rate limiting to admin endpoints**
5. **Implement Content Security Policy**
6. **Use persistent rate limiting (Redis)**

### Medium Priority

7. **Update ideal temperature display to match Dutch guidelines**
   - Change from "18-22°C" to "16-20°C"

8. **Add Dutch source citations**
   - Reference VeiligheidNL and NCJ directly

9. **Improve XSS sanitization**
   - Use DOMPurify library

10. **Add HSTS header**

### Low Priority

11. **Refactor TOGCalculator into smaller components**
12. **Add TypeScript for type safety**
13. **Create shared API utilities**
14. **Add API documentation**
15. **Enable Next.js image optimization**

---

## 5. Compliance Checklist

### Dutch Baby Safety Guidelines

| Requirement | Status | Notes |
|-------------|--------|-------|
| Temperature 16-20°C recommended | PARTIAL | Shows 18-22°C |
| TOG values per temperature | COMPLIANT | Matches guidelines |
| Loose blanket warnings | COMPLIANT | 12+ months restriction |
| Overheating warnings | COMPLIANT | Multiple warnings |
| Medical disclaimer | COMPLIANT | Footer + dedicated page |
| "Feet to foot" guidance | COMPLIANT | Included in info modal |

### GDPR/Privacy

| Requirement | Status |
|-------------|--------|
| Privacy policy page | EXISTS |
| Cookie consent | NOT AUDITED |
| Data retention policy | NOT AUDITED |
| Contact form data handling | BASIC COMPLIANCE |

### Security Standards

| Standard | Status |
|----------|--------|
| OWASP Top 10 | PARTIAL COMPLIANCE |
| Secure authentication | NEEDS IMPROVEMENT |
| Input validation | BASIC COMPLIANCE |
| Error handling | ADEQUATE |

---

## 6. Conclusion

The TOGwaarde.nl project provides accurate and helpful TOG value recommendations that align with Dutch and international baby safety guidelines. The application correctly warns users about safety risks and properly disclaims estimated values.

However, there are **critical security vulnerabilities** that must be addressed before production use, particularly the authentication bypass and hardcoded credentials.

### Action Items by Priority

1. **Immediate:** Fix authentication vulnerabilities
2. **This week:** Implement security headers and rate limiting
3. **This month:** Refactor code and add TypeScript
4. **Ongoing:** Regular security audits and dependency updates

---

*This audit was conducted on 12 January 2026. Regular re-audits are recommended every 6 months or after major code changes.*
