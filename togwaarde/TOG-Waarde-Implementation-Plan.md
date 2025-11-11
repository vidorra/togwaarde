# 🚀 TOG WAARDE.NL - IMPLEMENTATION PLAN
## Based on FlesvoedingCalculator.nl Codebase

---

## 📋 PROJECT OVERVIEW

**Goal**: Build TOG Waarde.nl by forking and adapting the flesvoedingcalculator.nl codebase, maintaining shared infrastructure while creating a unique product identity.

**Timeline**: 4-5 weeks total
- Week 1-2: Core adaptation & MVP
- Week 3: Feature enhancement
- Week 4: Premium features & testing
- Week 5: Deployment & optimization

---

## 🔄 PHASE 1: CODEBASE MIGRATION (Week 1)

### Step 1.1: Fork & Initial Setup
```bash
# Clone flesvoedingcalculator repository
git clone [flesvoedingcalculator-repo] togwaarde
cd togwaarde
git remote set-url origin [new-togwaarde-repo]

# Update package.json
npm install
```

**Update `package.json`:**
```json
{
  "name": "tog-waarde-calculator",
  "version": "1.0.0",
  "description": "TOG Waarde Calculator Nederland - Optimale babyslaap temperatuur tool"
}
```

### Step 1.2: Environment Configuration
Create new `.env.local`:
```env
DATABASE_URL=postgresql://[shared-database-connection]
NEXT_PUBLIC_SITE_URL=https://togwaarde.nl
NEXT_PUBLIC_GA_ID=G-XXXXXXXX  # New GA property for TOG
NEXTAUTH_URL=https://togwaarde.nl
NEXTAUTH_SECRET=[generate-new-secret]
```

### Step 1.3: Update Core Metadata
**Files to update:**
- `app/layout.jsx` - Site metadata, title, description
- `public/manifest.json` - App manifest
- `public/sitemap.xml` - Update URLs
- `public/robots.txt` - Domain reference

---

## 🎨 PHASE 2: DESIGN SYSTEM TRANSFORMATION (Week 1)

### Step 2.1: Color Palette Update
**Update `tailwind.config.js`:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Remove old flesvoeding colors
        // Add TOG Waarde 2025 colors
        primary: '#E85D42',        // Vibrant Warm Terracotta
        'primary-hover': '#D14A2F',
        'primary-active': '#B93D24',
        background: '#FFF9F0',      // Warm Cream
        secondary: '#B4C4AE',       // Soft Sage
        accent: '#FF6B4A',          // Vibrant Coral
        border: '#E8D9C5',          // Warm Sand
        'text-primary': '#333333',
        'text-secondary': '#666666'
      },
      fontFamily: {
        // Update from Lexend Deca to new fonts
        display: ['Poppins', 'sans-serif'],
        body: ['Lexend Deca', 'sans-serif']  // Keep this
      }
    }
  }
}
```

### Step 2.2: Update Global Styles
**Update `app/globals.css`:**
```css
/* Import new fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');

/* Update CSS variables */
:root {
  --color-primary: #E85D42;
  --color-background: #FFF9F0;
  --color-secondary: #B4C4AE;
  /* Remove flesvoeding-specific variables */
}

/* Update body background */
body {
  background-color: var(--color-background);
}
```

### Step 2.3: Component Style Updates
**Components to restyle:**
- `components/Header.jsx` - New color scheme
- `components/Footer.jsx` - TOG branding
- `components/Layout.jsx` - Background colors
- All buttons: terracotta primary color

---

## 🔁 PHASE 3: CONTENT REPLACEMENT (Week 1-2)

### Step 3.1: Remove Flesvoeding-Specific Content

**Files/Folders to DELETE:**
```
❌ app/calculator/page.jsx (flesvoeding calculator)
❌ app/voedingsschemas/
❌ app/blog/ (if flesvoeding-specific)
❌ components/FlesvoedingCalculator.jsx
❌ lib/feeding-logic.js
❌ public/images/flesvoeding-*
```

### Step 3.2: Keep & Adapt Shared Infrastructure

**Files to KEEP & MODIFY:**
```
✅ app/layout.jsx → Update metadata
✅ app/page.jsx → New TOG landing page
✅ app/over-ons/page.jsx → Update team/content
✅ app/contact/page.jsx → Keep structure
✅ app/privacy/page.jsx → Update references
✅ app/api/ → Keep API structure
✅ components/Layout.jsx → Keep structure
✅ components/SchemaMarkup.jsx → Adapt for TOG
✅ lib/db.js → KEEP AS-IS (shared database)
✅ lib/structured-data.js → Adapt schemas
```

### Step 3.3: Add TOG-Specific Content

**New Files to CREATE:**
```
📁 app/calculator/page.jsx → TOG calculator page
📁 app/producten/ → Product recommendations
📁 app/dashboard/ → Premium dashboard (Phase 3)
📁 components/TOGCalculator.jsx → From tog-calculator-working.tsx
📁 lib/tog-logic.js → TOG calculation formulas
📁 lib/product-data.js → Product database queries
```

---

## 💾 PHASE 4: DATABASE INTEGRATION (Week 2)

### Step 4.1: Add TOG Tables to Shared Database
```sql
-- Keep existing flesvoeding tables untouched
-- Add new TOG-specific tables:

CREATE TABLE tog_products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  tog_rating DECIMAL(3,1) NOT NULL,
  material VARCHAR(255),
  size_range VARCHAR(100),
  price_eur DECIMAL(10,2),
  is_tested BOOLEAN DEFAULT false,
  review_count INTEGER DEFAULT 0,
  affiliate_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tog_calculations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  room_temperature DECIMAL(4,1) NOT NULL,
  baby_age_months INTEGER NOT NULL,
  season VARCHAR(20),
  premature_adjusted BOOLEAN DEFAULT false,
  recommended_tog DECIMAL(3,1) NOT NULL,
  recommended_clothing JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tog_sleep_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  room_temp DECIMAL(4,1),
  tog_used DECIMAL(3,1),
  sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 4.2: Update Database Connection
Keep `lib/db.js` but add TOG-specific queries:
```javascript
// lib/tog-queries.js
export async function getTogProducts(filters = {}) {
  // Query tog_products table
}

export async function saveCalculation(data) {
  // Save to tog_calculations
}
```

---

## 🧩 PHASE 5: COMPONENT IMPLEMENTATION (Week 2)

### Step 5.1: Convert TOG Calculator
Transform `tog-calculator-working.tsx` to Next.js component:

```javascript
// components/TOGCalculator.jsx
'use client'
import { useState } from 'react'
// ... adapt TypeScript to JavaScript
// ... apply new design system colors
```

### Step 5.2: Update Navigation
**Update `components/Header.jsx`:**
```javascript
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'TOG Calculator', href: '/calculator' },
  { name: 'Producten', href: '/producten' },
  { name: 'Kennisbank', href: '/kennisbank' },
  { name: 'Over Ons', href: '/over-ons' },
  { name: 'Contact', href: '/contact' }
]
```

### Step 5.3: Create Product Components
```javascript
// components/ProductCard.jsx
// components/ProductGrid.jsx
// components/ProductFilter.jsx
```

---

## 📚 PHASE 6: KENNISBANK MIGRATION (Week 2-3)

### Step 6.1: Remove Flesvoeding Articles
**Delete from `/app/kennisbank/`:**
- All flesvoeding-specific articles
- Keep the template structure

### Step 6.2: Add TOG Articles
**Create new articles based on `Kennisbank_Content_-_Alle_Subpagina_s.md`:**
```
📁 app/kennisbank/
  ├── wat-is-tog/page.jsx
  ├── veilige-slaaptemperatuur/page.jsx
  ├── sids-preventie/page.jsx
  ├── seizoensgebonden-tips/page.jsx
  ├── merk-vergelijking/page.jsx
  └── koopgids/page.jsx
```

### Step 6.3: Update Sidebar Navigation
```javascript
// components/KennisbankSidebar.jsx
const togArticles = [
  { title: 'Wat is TOG?', href: '/kennisbank/wat-is-tog' },
  { title: 'Veilige Slaaptemperatuur', href: '/kennisbank/veilige-slaaptemperatuur' },
  // ... etc
]
```

---

## 🔍 PHASE 7: SEO & STRUCTURED DATA (Week 3)

### Step 7.1: Update Schema Markup
**Modify `components/SchemaMarkup.jsx`:**
```javascript
export function WebApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TOG Waarde Calculator",
    "url": "https://togwaarde.nl",
    "description": "Bereken de ideale TOG waarde voor je baby's slaapzak",
    // ... update all references
  }
}
```

### Step 7.2: Create New Sitemap
```xml
<!-- public/sitemap.xml -->
<urlset>
  <url>
    <loc>https://togwaarde.nl/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://togwaarde.nl/calculator</loc>
    <priority>0.9</priority>
  </url>
  <!-- ... all TOG pages -->
</urlset>
```

---

## 🚀 PHASE 8: DEPLOYMENT (Week 4)

### Step 8.1: Pre-deployment Checklist
- [ ] Remove all flesvoeding references
- [ ] Update all metadata and SEO tags
- [ ] Test calculator functionality
- [ ] Verify database connections
- [ ] Update environment variables
- [ ] Test mobile responsiveness
- [ ] Fix all console errors
- [ ] Update Google Analytics

### Step 8.2: Deployment Steps
```bash
# Build and test locally
npm run build
npm run start

# Deploy to Vercel
vercel --prod
```

### Step 8.3: DNS Configuration
- Point togwaarde.nl to Vercel
- Configure SSL certificate
- Set up www redirect

---

## 📊 METRICS & TESTING

### Performance Targets
- [ ] Lighthouse score > 95
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 2.5s
- [ ] Core Web Vitals: All green

### Testing Checklist
- [ ] Calculator accuracy
- [ ] Product filtering
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] Database queries optimized
- [ ] Error handling
- [ ] Analytics tracking

---

## 🔄 MIGRATION SUMMARY TABLE

| Component | Action | Notes |
|-----------|--------|-------|
| **Database** | SHARE | Use same PostgreSQL instance |
| **Auth System** | ADAPT | New user table prefix |
| **Calculator** | REPLACE | Use TOG calculator component |
| **Design System** | REPLACE | New color palette & fonts |
| **Navigation** | MODIFY | TOG-specific menu items |
| **Kennisbank** | REPLACE | TOG sleep articles |
| **Products** | NEW | Add product database |
| **API Routes** | ADAPT | Keep structure, new endpoints |
| **SEO/Schema** | MODIFY | TOG-specific metadata |
| **Analytics** | NEW | Separate GA property |
| **Deployment** | SAME | Use Vercel |
| **Domain** | NEW | togwaarde.nl |

---

## 🛠️ TECHNICAL DEBT TO ADDRESS

### From FlesvoedingCalculator.nl:
1. **Fix Header Component Quote Issue**
   ```javascript
   // Fix apostrophe escaping in Header.jsx
   { name: "Voedingsschema's", ... }  // Use double quotes
   ```

2. **Remove Fictional Team Members**
   - Remove or replace fictional names in Over Ons
   - Use roles instead of names

3. **Add Missing Environment Variables**
   ```env
   NEXT_PUBLIC_GA_ID=G-L58FEMT8Y2  # From feedback
   ```

4. **Fix Next.js Config**
   ```javascript
   // Remove static export for dynamic features
   // output: 'export' ← DELETE THIS
   ```

---

## 📝 FILE-BY-FILE MIGRATION GUIDE

### Files to DELETE Completely:
```
❌ app/calculator/page.jsx (flesvoeding version)
❌ app/voedingsschemas/
❌ app/blog/ (if flesvoeding-specific)
❌ components/FlesvoedingCalculator.jsx
❌ lib/feeding-logic.js
❌ All flesvoeding images
❌ Flesvoeding-specific API routes
```

### Files to KEEP Unchanged:
```
✅ lib/db.js (database connection)
✅ .github/workflows/ (CI/CD)
✅ public/robots.txt (update domain only)
✅ app/api/structure (keep pattern)
```

### Files to MODIFY:
```
🔧 package.json → Update name, description
🔧 app/layout.jsx → New metadata, fonts
🔧 app/page.jsx → TOG landing page
🔧 tailwind.config.js → New color tokens
🔧 app/globals.css → New CSS variables
🔧 components/Header.jsx → New navigation
🔧 components/Footer.jsx → TOG branding
🔧 components/SchemaMarkup.jsx → TOG schemas
```

### Files to CREATE:
```
➕ app/calculator/page.jsx → TOG calculator
➕ components/TOGCalculator.jsx → Core calc
➕ app/producten/page.jsx → Products page
➕ app/dashboard/page.jsx → Premium dash
➕ lib/tog-logic.js → Calculation logic
➕ lib/product-queries.js → Database queries
➕ components/ProductCard.jsx → Product UI
➕ components/SafetyChecklist.jsx → Interactive list
```

---

## 🎯 WEEK-BY-WEEK EXECUTION PLAN

### Week 1: Foundation
- [ ] Day 1-2: Fork repo, setup environment, update configs
- [ ] Day 3-4: Implement design system, update colors/fonts
- [ ] Day 5: Remove flesvoeding content, update navigation

### Week 2: Core Features
- [ ] Day 1-2: Integrate TOG calculator from working prototype
- [ ] Day 3-4: Create product database and UI components
- [ ] Day 5: Basic kennisbank structure with 3-5 articles

### Week 3: Enhancement
- [ ] Day 1-2: Complete kennisbank (12+ articles)
- [ ] Day 3: Add safety checklist component
- [ ] Day 4: Visual baby layers diagram
- [ ] Day 5: SEO optimization & structured data

### Week 4: Premium & Polish
- [ ] Day 1-2: Authentication system (NextAuth)
- [ ] Day 3: Sleep logger functionality
- [ ] Day 4: Dashboard visualizations
- [ ] Day 5: Testing & bug fixes

### Week 5: Deployment
- [ ] Day 1: Performance optimization
- [ ] Day 2: Final testing & QA
- [ ] Day 3: Deploy to production
- [ ] Day 4: Monitor & hotfixes
- [ ] Day 5: Documentation & handoff

---

## 🚨 CRITICAL SUCCESS FACTORS

### Must-Have for MVP:
1. ✅ Working TOG calculator
2. ✅ Product recommendations
3. ✅ Basic kennisbank (5+ articles)
4. ✅ Mobile responsive
5. ✅ Dutch language throughout
6. ✅ Safety warnings implemented

### Nice-to-Have for MVP:
- Visual baby diagram
- User accounts
- Sleep logger
- Advanced filtering

### Do NOT Launch Without:
- [ ] Removing ALL flesvoeding references
- [ ] Testing calculator accuracy
- [ ] Mobile responsiveness verified
- [ ] Privacy policy updated
- [ ] SSL certificate active
- [ ] Analytics configured

---

## 📋 QUALITY ASSURANCE CHECKLIST

### Pre-Launch Testing:
- [ ] Calculator gives correct TOG values
- [ ] Product filters work correctly
- [ ] All links functional
- [ ] Forms submit properly
- [ ] Images optimized and loading
- [ ] No console errors
- [ ] WCAG AA compliance
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS, Android)
- [ ] Tablet responsive layout

### Performance Metrics:
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

---

## 🔗 USEFUL RESOURCES

### Reference Files in Project:
- `TOG-Waarde-Styleguide-v2.md` - Design specifications
- `tog-calculator-working.tsx` - Calculator logic
- `TOG-Waarde-Visual-Styleguide.html` - Component examples
- `Kennisbank_Content_-_Alle_Subpagina_s.md` - Article content

### External Resources:
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 📧 CONTACTS & RESPONSIBILITIES

### Development Team:
- Frontend: [Responsible for UI/UX implementation]
- Backend: [Database integration, API development]
- Content: [Kennisbank articles, product descriptions]
- QA: [Testing, bug tracking]
- DevOps: [Deployment, monitoring]

### Stakeholders:
- Product Owner: [Final approval]
- Marketing: [Launch strategy, SEO]
- Legal: [Privacy policy, terms]

---

## 🎉 POST-LAUNCH TASKS

### Week 1 After Launch:
- [ ] Monitor error logs
- [ ] Track user behavior (GA)
- [ ] Collect user feedback
- [ ] Fix critical bugs
- [ ] Optimize slow queries

### Month 1 Tasks:
- [ ] A/B testing calculator UI
- [ ] Add more products
- [ ] Expand kennisbank
- [ ] Implement premium features
- [ ] Partner integrations

### Long-term Roadmap:
- Mobile app development
- API for partners
- AI sleep recommendations
- Community features
- International expansion

---

## 📌 FINAL NOTES

1. **Database Sharing**: Be careful not to modify existing flesvoeding tables
2. **Brand Separation**: Ensure complete separation of brand identities
3. **Code Reuse**: Maximize infrastructure sharing while maintaining independence
4. **Testing Priority**: Calculator accuracy is critical - test extensively
5. **Dutch Compliance**: All safety guidelines must follow Dutch standards
6. **Mobile First**: Most users will be tired parents on phones
7. **Performance**: Keep it fast - parents have no patience at 3 AM
8. **Accessibility**: Consider sleep-deprived parent user experience

---

**Document Version**: 1.0
**Last Updated**: November 2025
**Next Review**: After Phase 1 completion