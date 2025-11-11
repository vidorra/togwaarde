# 🚨 Affiliate System Fix Guide - STOP THE LOOP!

**Date:** October 13, 2025  
**Problem:** 31+ commits in 7 days creating a complex web of broken functionality  
**Goal:** Fix affiliate system once and for all with clear guidelines  

## 📊 Git History Analysis (Last 7 Days)

**The Endless Loop Pattern:**
```
c71cc81 Fix pageId to match backend data format and load dynamic images
bb28e90 Fix pageId for affiliate widget to ensure static fallback works
538f527 Show all widget content by default in correct order
7f0db87 Fix differentiated fallback logic for Bol.com vs regular widgets
9a2eca4 Fix test widget structure - move bol-widget-content inside fallback-content
8fbeec8 Restructure fallback-content to contain bol-widget-content as child
d30d780 Enhance CSS to aggressively hide Bol.com images and titles
3d9b317 Customize Bol.com widget display to show only essential info
```

**Pattern Recognition:**
- 🔄 **15+ "Fix" commits** - each breaking something else
- 🎨 **8+ CSS/styling changes** - over-engineering display logic
- 📦 **6+ data recreation commits** - losing configured data
- 🧪 **12+ test widget changes** - constant restructuring

**Key Insight:** Each fix created new problems because we were treating **symptoms** not **root causes**.

## 🎯 Root Problems Identified

### 1. **Data Structure Corruption**
Looking at `data/admin/snippets.json`, I found:
```json
"generatedHtml": "<div class=\"media h-boxedbottom--m\"><div class=\"media__img\"><img src=\"\" class=\"h-fluid-img\" id=\"preview-image\"></div>"
```
**ISSUE:** Empty `src=""` attributes - images can't load!

### 2. **Confusion Between Two Different Systems**
The code mixes up **TWO SEPARATE CONCEPTS**:
- **Image HTML**: Static images from admin dashboard (should have proper `src` URLs)
- **Bol.com Code Snippet**: JavaScript widgets that dynamically load content

### 3. **Complex Fallback Logic**
Over-engineered hide/show logic that breaks constantly with each change.

---

## 📋 Current Status Update (October 21, 2025)

### ✅ What's Currently Working
**Frontend Display:**
- ✅ **Bol.com Snippet Loading**: On `eerste-keer-flesvoeding-geven` page → "Aanbevolen Producten voor de Eerste Fles" shows Bol.com snippet with dynamic content (price, rating)
- ✅ **Basic Structure**: The 4-part widget structure is partially implemented
- ✅ **Test Page**: On `flessen-steriliseren` → "Test Bol.com Widget" shows all components (title, image, snippet, button)

### 🚨 Critical Backend Issues (URGENT FIX NEEDED)

**Backend Field Mapping Problem:**
- ❌ **WRONG FIELD MAPPING**: When admin adds Bol.com snippet, it's being saved to "Image HTML" field instead of "Bol.com Code Snippet" field
- ❌ **MISSING IMAGE EXTRACTION**: Backend should automatically fetch product image from Bol.com when snippet is added
- ❌ **MISSING URL EXTRACTION**: Backend should automatically extract and save the product URL from the snippet

**Real Example That Needs to Work:**
```javascript
// User adds this snippet in admin:
<script type="text/javascript">var bol_sitebar_v2={"id":"bol_1761052302805", "baseUrl":"partner.bol.com","productId":"9300000042840603","familyId":"","siteId":"1472968","target":true,"rating":true,"price":true,"deliveryDescription":true,"button":false,"linkName":"Dr.%20Brown%27s%20stoomsterilisator%20met%20droogfunctie","linkSubId":""};</script><script type="text/javascript" src="https://partner.bol.com/promotion/static/js/partnerProductlinkV2.js" id="bol_1761052302805"></script>

// Backend should automatically:
// 1. Save snippet to "Bol.com Code Snippet" field (NOT Image HTML)
// 2. Extract URL: https://partner.bol.com/click/click?p=2&t=url&s=1472968&f=TXL&url=https%3A%2F%2Fwww.bol.com%2Fnl%2Fnl%2Fp%2Fdr-brown-s-stoomsterilisator-met-droogfunctie%2F9300000042840603%2F&name=Dr.%20Brown%27s%20stoomsterilisator%20met%20droogfunctie
// 3. Fetch product image from Bol.com and save to "Image HTML" field
```

### 🔧 What's Missing in Frontend
- ❌ **Backend Image Not Showing**: Admin-uploaded images from Image HTML field are not displayed
- ❌ **Field Separation**: Frontend correctly expects separate fields, but backend isn't providing them correctly  

---

## 🏗️ Correct System Architecture

### Admin Dashboard Structure
```
Admin Dashboard
├── Snippets Management
│   ├── Image HTML (for fallback display)
│   │   ├── id: "philips-avent-sterilisator"
│   │   ├── name: "Philips Avent Flessterilisator"  
│   │   ├── imageHtml: "<img src='ACTUAL_URL' alt='Product'>"
│   │   └── fallbackUrl: "https://bol.com/..."
│   └── Bol.com Code Snippet (for dynamic content)
│       ├── bolScript: "<script>var bol_sitebar_v2={...}</script>"
│       └── productId: "9300000006206090"
└── Page Management
    └── Assign snippets to pages
```

### 🎯 TARGET STRUCTURE (Frontend Ready, Backend Needs Implementation)
```
┌─────────────────────┐
│ 1. Product Title    │ ← ✅ WORKING: From admin backend (name field)
├─────────────────────┤
│ 2. Backend Image    │ ← ❌ NOT WORKING: From admin Image HTML field (backend saves snippet here instead)
├─────────────────────┤  
│ 3. Bol.com Snippet  │ ← ✅ PARTIALLY WORKING: Shows on some pages, but backend field mapping is wrong
├─────────────────────┤
│ 4. CTA Button       │ ← ❌ NOT WORKING: URL extraction from snippet not implemented in backend
└─────────────────────┘
```

**Current Status per Component:**
1. **✅ Title**: Working correctly from admin name field
2. **❌ Backend Image**: Backend incorrectly saves Bol.com snippet to Image HTML field  
3. **🟡 Bol.com Snippet**: Shows dynamic content but backend field mapping is wrong
4. **❌ CTA Button**: URL not extracted automatically from snippet

---

## 🔧 Priority Fix Plan (October 21, 2025)

### 🚨 PHASE 1: Backend Field Mapping Fix (CRITICAL - DO THIS FIRST)

#### Step 1.1: Fix Admin Backend Field Assignment
**PROBLEM**: When admin adds Bol.com snippet, it's saved to wrong field

**REQUIRED BACKEND CHANGES:**
```javascript
// When admin pastes Bol.com snippet like:
// <script type="text/javascript">var bol_sitebar_v2={"id":"bol_1761052302805"...

// Backend should detect this is a Bol.com snippet and:
// 1. Save snippet to "bolScript" field (NOT "imageHtml" field)
// 2. Extract productId from snippet: "9300000042840603"
// 3. Extract linkName from snippet: "Dr. Brown's stoomsterilisator met droogfunctie"
// 4. Build Bol.com product URL and fetch image
// 5. Save fetched image to "imageHtml" field
// 6. Build click URL for "fallbackUrl" field
```

#### Step 1.2: Implement Automatic Image Fetching
**BACKEND REQUIREMENT**: When Bol.com snippet is detected, automatically:
1. **Extract Product ID**: From `productId":"9300000042840603"`
2. **Fetch Product Data**: Call Bol.com API or scrape product page  
3. **Download Product Image**: Get high-quality product image
4. **Save to Image HTML Field**: `<img src="[fetched_image_url]" alt="[product_name]" class="product-img">`

#### Step 1.3: Implement URL Extraction
**BACKEND REQUIREMENT**: Extract and build proper URLs:
```javascript
// From snippet data, build:
const clickUrl = `https://partner.bol.com/click/click?p=2&t=url&s=1472968&f=TXL&url=https%3A%2F%2Fwww.bol.com%2Fnl%2Fnl%2Fp%2F${linkName}%2F${productId}%2F&name=${linkName}`;

// Save to fallbackUrl field for CTA button
```

### Phase 2: Component Simplification

#### Step 2.1: Simplify AffiliateProductWidget
**REMOVE** complex fallback logic. **USE** simple display order:
```jsx
<div className="affiliate-widget">
  {/* 1. Image HTML - from admin */}
  <div dangerouslySetInnerHTML={{__html: product.imageHtml}} />
  
  {/* 2. Title - from admin */}
  <h4>{product.name}</h4>
  
  {/* 3. Bol.com Script - if exists */}
  {product.bolScript && (
    <div dangerouslySetInnerHTML={{__html: product.bolScript}} />
  )}
  
  {/* 4. Fallback Button - always show */}
  <a href={product.url}>Bekijk op bol.com →</a>
</div>
```

#### Step 2.2: Remove Complex CSS
**DELETE** all the complex hide/show CSS:
- ❌ Remove: `.bol-script-container .fallback-content .bol-widget-content ~ div:first-child { display: none; }`
- ❌ Remove: Complex `:has()` selectors
- ❌ Remove: JavaScript hide/show management

**KEEP** only basic styling:
- ✅ Keep: Product layout and spacing
- ✅ Keep: Bol.com content styling (price, rating display)

### Phase 3: Admin System Fix

#### Step 3.1: Separate Data Fields
Update admin interface to have **SEPARATE** fields:
```javascript
// Admin Snippet Object
{
  id: "philips-avent-sterilisator",
  name: "Philips Avent Flessterilisator",
  type: "bol",
  
  // SEPARATE: Image HTML (for fallback display)
  imageHtml: "<img src='...' alt='...' class='product-image'>",
  
  // SEPARATE: Bol.com Code Snippet (for dynamic content)  
  bolScript: "<script type='text/javascript'>var bol_sitebar_v2={...};</script>",
  
  // SEPARATE: Fallback URL
  fallbackUrl: "https://www.bol.com/nl/nl/p/...",
  
  active: true
}
```

#### Step 3.2: Update API Response Format
```javascript
// Frontend API Response
{
  success: true,
  snippets: [{
    id: "philips-avent-sterilisator",
    name: "Philips Avent Flessterilisator", 
    tag: "Aanbevolen",
    type: "bol_snippet",
    
    // Image data for display
    imageHtml: "<img src='https://...' alt='...'>",
    
    // Bol.com script for dynamic content
    bolScript: "<script>...</script>",
    
    // Fallback URL for button
    fallbackUrl: "https://www.bol.com/..."
  }]
}
```

---

## 🚫 What NOT To Do (STOP THE LOOP!)

### DON'T Change These Anymore:
1. ❌ **DON'T** modify CSS hide/show logic
2. ❌ **DON'T** add complex JavaScript fallback management  
3. ❌ **DON'T** change the widget structure without updating this guide
4. ❌ **DON'T** mix Image HTML with Bol.com Scripts in the same field
5. ❌ **DON'T** force recreate data files without backing up working data

### DON'T Commit These Patterns:
- "Fix affiliate widget display logic" (you've done this 15+ times)
- "Hide Bol.com images" (this breaks Image HTML display)
- "Restructure fallback content" (this causes alignment issues)
- "Force production data recreation" (this loses admin configuration)

---

## ✅ Implementation Checklist (October 21, 2025)

### 🚨 CRITICAL BACKEND FIXES (Do These First)
- [ ] **Fix field mapping**: Stop saving Bol.com snippets to Image HTML field
- [ ] **Implement snippet detection**: Auto-detect when user pastes Bol.com script
- [ ] **Add automatic image fetching**: Fetch product images from Bol.com when snippet is added
- [ ] **Add URL extraction**: Auto-extract and build click URLs from snippet data
- [ ] **Test with real snippet**: Use Dr. Brown's sterilizer example to verify all parts work

### Frontend Verification (After Backend Fix)
- [ ] **Verify backend images show**: Check that Image HTML field displays correctly
- [ ] **Verify Bol.com snippets work**: Check dynamic content (price, rating) loads
- [ ] **Verify CTA buttons work**: Check that extracted URLs work correctly
- [ ] **Test on both pages**: Verify on `eerste-keer-flesvoeding-geven` and `flessen-steriliseren`

### Data Quality (This Week)
- [ ] **Update existing products**: Fix any products with wrong field assignments
- [ ] **Backup current working state**: Before making major backend changes
- [ ] **Test with multiple products**: Ensure system works with various Bol.com products
- [ ] **Validate all image URLs**: Ensure all fetched images load correctly

### System Stability (Long-term)
- [ ] **Add backend validation**: Prevent incorrect field assignments in future
- [ ] **Create admin interface feedback**: Show what fields are populated when snippet is added
- [ ] **Add error handling**: Handle cases where Bol.com images can't be fetched
- [ ] **Document backend process**: Update this guide with exact backend implementation

---

## 🔍 Debug Commands

### Check Current Data
```bash
# Check current admin data
cat data/admin/snippets.json | jq '.[0]'

# Test API response
curl "https://www.flesvoedingcalculator.nl/api/affiliates/page/hygiene-bereiding_flessen-steriliseren/" | jq .

# Check git history
git log --oneline --since="7 days ago" --grep="affiliate"
```

### Verify Images
```bash
# Check for empty image sources
grep -n 'src=""' data/admin/snippets.json

# Verify image URLs work
curl -I "https://media.s-bol.com/NKX9XZWN3RGL/0RNmv15/550x707.jpg"
```

---

## 📞 Emergency Rollback

If affiliate system breaks completely:

1. **Revert to working commit** (find last known good state)
2. **Restore data files** from backup
3. **Test single widget** before deploying all
4. **Update this guide** with lessons learned

---

## 🎯 Success Criteria (Updated October 21, 2025)

### When Backend is Fixed, Test Widget Should Show:
- ✅ **Product title** (from admin data - CURRENTLY WORKING)
- ❌ **Product image** (from Image HTML field - NEEDS BACKEND FIX)
- 🟡 **Bol.com dynamic content** (price, rating, delivery - PARTIALLY WORKING)
- ❌ **CTA button with extracted URL** (NEEDS BACKEND IMPLEMENTATION)

### When Backend is Fixed, Main Widget List Should Show:
- ✅ **Product titles and tags** (CURRENTLY WORKING)
- ❌ **Backend-fetched images** (from auto-fetched Bol.com images)
- 🟡 **Bol.com integration** (working but field mapping wrong)
- ❌ **Proper CTA URLs** (extracted from snippets)

### Admin System Must Be Enhanced To:
- ❌ **Auto-detect Bol.com snippets** when pasted
- ❌ **Auto-fetch product images** from Bol.com
- ❌ **Auto-extract URLs** from snippet data
- ❌ **Separate field assignment** (snippet → bolScript, image → imageHtml)
- ❌ **Validation feedback** showing what was auto-populated

### Test Case for Backend Validation:
```
INPUT: Admin pastes Dr. Brown's snippet (bol_1761052302805, productId: 9300000042840603)
EXPECTED OUTPUT:
- bolScript field: Contains the full script
- imageHtml field: Contains fetched product image
- fallbackUrl field: Contains built click URL
- name field: Populated with "Dr. Brown's stoomsterilisator met droogfunctie"
```

---

**⚠️ CRITICAL RULE: Before making ANY affiliate system changes, update this guide first!**

**Last Updated:** October 21, 2025  
**Next Review:** After backend field mapping is implemented  
**Status:** 🔧 BACKEND CRITICAL - Frontend working, backend field mapping needs urgent fix