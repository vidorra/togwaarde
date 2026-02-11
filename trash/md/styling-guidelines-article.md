# Kennisbank Article Styling Guidelines

This document outlines the complete styling standards for all kennisbank articles to ensure consistency, accessibility, and proper visual hierarchy.

## 🎨 Color Scheme Standards

### ✅ Approved Colors

**Text Colors:**
- `text-primary` - For main headings (h1, h2) and important elements
- `text-gray-600` - For body text and secondary content
- `text-gray-700` - For slightly darker body text
- `text-gray-800` - For dark emphasis text (rare use)

**Background Colors:**
- `bg-white/80` - For main content cards with transparency
- `bg-white` - For child cards within main cards (ALWAYS white, never gray)
- `bg-gray-50` - For subtle section backgrounds (limited use)
- `bg-default` - For brand-consistent backgrounds

**CRITICAL CARD RULE:** 
- Main cards: `bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6`
- Child cards: `bg-white rounded-xl p-4` (NEVER use bg-gray-100 or bg-gray-50)

**Icon Colors:**
- `text-primary` - For brand-consistent icons
- `text-gray-500` - For neutral/secondary icons
- `text-gray-600` - For content-related icons

### ❌ Forbidden Colors

**STRICTLY PROHIBITED - Never use any of these color classes:**

**Text Colors:**
- `text-blue-*` (any shade: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900)
- `text-red-*` (any shade)
- `text-green-*` (any shade)
- `text-yellow-*` (any shade)
- `text-purple-*` (any shade)
- `text-pink-*` (any shade)
- `text-indigo-*` (any shade)
- `text-amber-*` (any shade)
- `text-orange-*` (any shade)

**Background Colors:**
- `bg-blue-*` (any shade)
- `bg-red-*` (any shade)
- `bg-green-*` (any shade)
- `bg-yellow-*` (any shade)
- `bg-purple-*` (any shade)
- `bg-pink-*` (any shade)
- `bg-indigo-*` (any shade)
- `bg-amber-*` (any shade)
- `bg-orange-*` (any shade)

**Border Colors:**
- `border-blue-*` (any shade)
- `border-red-*` (any shade)
- `border-green-*` (any shade)
- `border-yellow-*` (any shade)
- `border-purple-*` (any shade)
- `border-pink-*` (any shade)
- `border-amber-*` (any shade)

**ONE EXCEPTION - Warning/Alert Colors:**
- ✅ `bg-amber-*`, `text-amber-*`, `border-amber-*` ONLY for warning/alert messages
- ✅ Must include "Let op" text or warning context
- ✅ Must use proper alert structure with warning icon
- ✅ Example: `<div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-6">` with AlertTriangle icon

**Standard Warning Alert Structure:**
```jsx
<div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-6">
  <div className="flex items-start space-x-3">
    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <AlertTriangle className="w-5 h-5 text-amber-600" />
    </div>
    <div>
      <h3 className="font-semibold text-amber-800 mb-2">Let op</h3>
      <p className="text-sm text-amber-700 leading-relaxed">Warning message content</p>
    </div>
  </div>
</div>
```

**ALL OTHER COLORED ELEMENTS FORBIDDEN:** All other colored elements must use neutral colors only (gray shades + primary brand color).

## 📱 Layout Structure

### Required Layout Pattern

Every kennisbank article MUST follow this structure:

```jsx
import Layout from '../../../components/Layout'
import Link from 'next/link'
import KennisbankSidebar from '../../../components/KennisbankSidebar'
import { /* required icons */ } from 'lucide-react'

export default function ArticlePage() {
  // Sidebar configuration
  const sidebarImages = [
    {
      src: "/relevant-image.png",
      alt: "Descriptive alt text",
      caption: "Helpful caption"
    }
    // 2-3 images maximum
  ]

  const adTopics = ["Topic 1", "Topic 2", "Topic 3"]

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <div className="space-y-6">
            {/* Article content */}
          </div>
        </div>
        
        <KennisbankSidebar images={sidebarImages} adTopics={adTopics} />
      </div>
    </Layout>
  )
}
```

### Layout Rules

1. **Container Structure:**
   - Use `grid grid-cols-12 gap-6` for main container
   - **Never** add `min-h-screen` to grid containers
   - Content area: `col-span-12 lg:col-span-7`
   - Sidebar automatically takes remaining space

2. **CRITICAL: Layout Component Requirement:**
   - ✅ **ALL pages MUST use Layout component wrapper**
   - ❌ **NEVER start with naked grid structure**
   ```jsx
   // ✅ CORRECT - Layout wrapper required
   <Layout>
     <div className="grid grid-cols-12 gap-6">
       // Content
     </div>
   </Layout>
   
   // ❌ WRONG - Missing Layout wrapper causes scrollbar issues
   <div className="grid grid-cols-12 gap-6">
     // Content - NO Layout wrapper!
   </div>
   ```

3. **Content Organization:**
   - **Never** wrap all content in single large container (`max-w-4xl mx-auto p-8`)
   - Each major section must be in separate card container
   - Use individual `bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6` cards
   - Content structure: `<div className="space-y-6">` containing individual section cards

3. **Section Structure:**
   ```jsx
   <div className="space-y-6">
     {/* Header section */}
     <div className="mb-6">
       <h1>...</h1>
     </div>
     
     {/* Each content section */}
     <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
       <h2 className="text-lg font-semibold text-primary mb-4">Section Title</h2>
       {/* Section content */}
     </div>
   </div>
   ```

4. **Content Spacing:**
   - Use `space-y-6` for main content sections
   - Use `space-y-4` for subsections
   - Use `space-y-2` for list items

## 📝 Typography Hierarchy

### ⚠️ CRITICAL: Font Size Consistency

**STRICTLY ENFORCED - Typography must follow exact hierarchy:**

**Main Titles (h1):**
- ✅ `text-2xl font-bold` - ONLY size allowed for main page titles
- ❌ NEVER use: `text-3xl`, `text-4xl`, `text-xl`, or any other size
- ✅ ALWAYS include icon: `<Icon className="w-6 h-6 mr-3 text-primary" />`

**Section Headers (h2):**
- ✅ `text-lg font-semibold` - ONLY size allowed for major sections
- ❌ NEVER use: `text-2xl`, `text-3xl`, `text-xl`, or any other size

**Introduction Headers (in intro sections):**
- ✅ `text-lg font-semibold` - Consistent with section headers
- ❌ NEVER use: `text-2xl font-semibold`, `font-semibold` without size, or any other variations

**Subsection Headers (h3):**
- ✅ `font-medium` - NO text-size class needed
- ❌ NEVER use: `text-lg`, `text-xl`, or any size classes

**Body Text & List Items:**
- ✅ `text-gray-600` or `text-gray-700` - NO size classes
- ❌ NEVER use: `text-sm text-gray-700` for regular list items
- ❌ NEVER use: `text-lg`, `text-base`, `text-sm` for body text
- ✅ `text-sm` ONLY for meta information, captions, or secondary details

### Contrast Requirements

**MINIMUM CONTRAST STANDARDS:**

**Background/Text Combinations:**
- ✅ `bg-gray-100` + `text-gray-700` (Good contrast)
- ✅ `bg-white` + `text-gray-600` (Good contrast)
- ❌ `bg-gray-50` + `text-gray-600` (Insufficient contrast)
- ❌ `bg-gray-50` + `text-gray-500` (Poor contrast)

**Card Contrast Rules:**
- If using `bg-gray-50`, text must be minimum `text-gray-700`
- For better accessibility, use `bg-gray-100` + `text-gray-700`
- Never use text lighter than `text-gray-600` on light backgrounds

### Heading Structure

```jsx
{/* Main Page Title - Always h1 */}
<h1 className="text-2xl font-bold text-primary mb-3 flex items-center">
  <Icon className="w-6 h-6 mr-3 text-primary" />
  Article Title
</h1>

{/* Major Sections - h2 */}
<h2 className="text-lg font-semibold text-primary mb-4">Section Title</h2>

{/* Subsections - h3 */}
<h3 className="font-medium text-primary mb-3">Subsection Title</h3>

{/* Minor headings - h4 */}
<h4 className="font-medium text-gray-700 mb-2">Minor Heading</h4>
```

### Text Content

```jsx
{/* Body paragraphs */}
<p className="text-gray-600 leading-relaxed">Body text content</p>

{/* Emphasis text */}
<p className="text-gray-700">Slightly emphasized text</p>

{/* Small text */}
<p className="text-sm text-gray-600">Secondary information</p>
```

## 🎯 Component Standards

### ⚠️ CRITICAL: Introduction Section Consistency

**ALL ARTICLES MUST HAVE CONSISTENTLY FRAMED INTRODUCTION SECTIONS:**

**Required Structure:**
```jsx
{/* Introduction section - REQUIRED for all articles */}
<section className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-primary mb-4">Inleiding</h2>
  <p className="text-gray-700 leading-relaxed">
    Introduction content explaining the article purpose and what the reader will learn.
  </p>
</section>
```

**Common Mistakes Found & Fixed:**

❌ **NEVER use these deprecated patterns:**
```jsx
{/* OLD - Gray background without glassmorphism */}
<div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
  <h2 className="text-2xl font-semibold text-primary mb-4">Inleiding</h2>
  // content
</div>

{/* OLD - Inconsistent heading size */}
<div className="bg-white/80 p-6">
  <h2 className="font-medium text-primary mb-4">Inleiding</h2>  {/* Wrong size */}
  // content
</div>

{/* OLD - Border box styling that misaligns with content */}
<div className="mt-4 p-4 border border-gray-200 rounded-lg">
  <h3 className="font-semibold text-primary mb-2">Timing voor eerste fles:</h3>
  // content
</div>
```

✅ **Always use the standardized glassmorphism pattern:**
- `bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6`
- `text-lg font-semibold text-primary mb-4` for introduction headers
- `<section>` semantic HTML element, not generic `<div>`

**Introduction Content Guidelines:**
- Explain the article's purpose and scope
- Mention key benefits or learning outcomes
- Keep to 2-4 sentences maximum
- Use `text-gray-700 leading-relaxed` for readability
- No special timing boxes or highlighted sections within intro

**Header Card Content Rules:**
- Content within header cards should flow naturally without nested containers
- ❌ **NEVER create card-within-card in headers:**
```jsx
{/* BAD - Creates alignment issues */}
<div className="bg-white/80 p-6">
  <h1>Title</h1>
  <p>Description</p>
  <div className="mt-4 p-4 border border-gray-200 rounded-lg">  {/* Card within card! */}
    <h3>Timing info</h3>
    <ul>...</ul>
  </div>
</div>
```

- ✅ **Keep content flat and aligned:**
```jsx
{/* GOOD - Clean alignment */}
<div className="bg-white/80 p-6">
  <h1>Title</h1>
  <p>Description</p>
  <h3 className="mt-6">Timing info</h3>  {/* No container, just proper spacing */}
  <ul>...</ul>
</div>
```

**Key Principles:**
- Use `mt-6` for spacing between sections within cards
- No borders, backgrounds, or padding for subsections within header cards
- Let content flow naturally within the card container
- Avoid visual separation within single conceptual sections

### ⚠️ CRITICAL: Article Introduction Standards

**ALL ARTICLE INTROS MUST FOLLOW THIS EXACT PATTERN:**

✅ **REQUIRED Structure:**
```jsx
{/* Header - OUTSIDE any card container */}
<div>
  <div className="text-sm text-gray-600 mb-2">Category • Subcategory</div>
  <h1 className="text-2xl font-bold text-primary mb-3 flex items-center">
    <Icon className="w-6 h-6 mr-3 text-primary" />
    Article Title
  </h1>
  <p className="text-gray-500 leading-relaxed">  {/* NOTE: gray-500 for intro text */}
    Brief description of what the article covers
  </p>
</div>
```

**🚨 FONT SIZING HIERARCHY - CRITICAL VIOLATIONS FOUND:**

❌ **WRONG: Intro text heavier than body text:**
```jsx
// BAD - Introduction text is visually heavier than body text
<p className="text-gray-700 mb-4">
  Tijdens het drinken van flesvoeding slikt je baby onvermijdelijk lucht mee.
</p>
// Later in body:
<span className="text-gray-600">Leg baby rechtop tegen je schouder</span>
// Results in: Introduction appears LARGER than body text!
```

✅ **CORRECT: Proper visual hierarchy:**
```jsx
// GOOD - Introduction text is lighter than body text  
<p className="text-gray-500 leading-relaxed">
  Tijdens het drinken van flesvoeding slikt je baby onvermijdelijk lucht mee.
</p>
// Later in body:
<span className="text-gray-600">Leg baby rechtop tegen je schouder</span>
// Results in: Body text appears darker/more prominent than intro
```

**FONT HIERARCHY RULES:**
- ✅ **Intro paragraph uses `text-gray-500`** (lighter than body text)
- ✅ **Body text uses `text-gray-600` or `text-gray-700`** (darker than intro)
- ✅ **Category breadcrumb uses `text-gray-500`**
- ✅ **Clear visual hierarchy: breadcrumb → title → light intro → darker body**
- ❌ **NEVER use `text-gray-700` for intro text** - creates reverse hierarchy

**Breadcrumb Format Rules:**
❌ **WRONG: Complex navigation breadcrumbs:**
```jsx
<div className="flex items-center text-sm text-gray-600 mb-2">
  <Link href="/" className="hover:text-primary flex items-center">
    <Home className="w-4 h-4 mr-1" />Home
  </Link>
  <ArrowRight className="w-4 h-4 mx-2" />
  <Link href="/kennisbank">Kennisbank</Link>
  // ... complex chain
</div>
```

✅ **CORRECT: Simple tag format:**
```jsx
<div className="text-sm text-gray-500 mb-2">Category • Subcategory</div>
```

**Common Mistakes:**
- ❌ Using `text-gray-600` or `text-gray-700` for intro text (too dark)
- ❌ Using complex navigation-style breadcrumbs instead of simple tags
- ❌ Missing icon in h1 title
- ❌ Placing intro inside a card container

### Content Cards

```jsx
{/* Primary content card */}
<div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-primary mb-4">Card Title</h2>
  {/* Content */}
</div>

{/* Secondary background card */}
<div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-primary mb-4">Card Title</h2>
  {/* Content */}
</div>
```

### 🚨 CRITICAL: NO CARD-WITHIN-CARD PATTERNS

**⚠️ ZERO TOLERANCE POLICY - This is the #1 styling violation that MUST be eliminated from all articles.**

**🚫 SPECIFIC FORBIDDEN PATTERNS:**

❌ **NEVER use `border border-gray-200 rounded-* p-*` WITHOUT background colors**
- Borders without backgrounds create alignment issues and visual clutter
- Examples: `border border-gray-200 rounded-lg p-4` (no bg-*)
- Must be replaced with clean content flow or visual separators

✅ **BORDERS ARE ALLOWED with background colors**
- `bg-gray-50 border border-gray-200 rounded-lg p-4` ✅ (has background)
- `bg-amber-50 border border-amber-200 rounded-xl p-6` ✅ (has background) 
- Background provides visual context and proper contrast for borders

❌ **FORBIDDEN: Borders without backgrounds**
- `border border-gray-200 rounded-lg p-4` (no background)
- `border border-gray-200 rounded-xl p-6` (no background)
- These create floating boxes that break visual flow

**✅ APPROVED EXCEPTION - Related Articles Cards:**
**ONLY for gerelateerde artikelen sections within `bg-white/80` containers:**
```jsx
{/* APPROVED: Related articles with bg-gray-50 for visibility */}
<div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2>Gerelateerde artikelen</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Link href="/link" className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-primary">
      <div className="font-medium text-primary">Article Title →</div>
      <div className="text-sm text-gray-600">Description</div>
    </Link>
  </div>
</div>
```
**Key Requirements for this exception:**
- ✅ Must use `bg-gray-50` for sufficient contrast within white containers
- ✅ Only for navigation/link cards in related articles sections
- ✅ Must include hover states for interactivity
- ❌ Never use this pattern for content sections or informational cards

**🚨 SPECIFIC VIOLATIONS FOUND & FIXED:**

❌ **ACTUAL VIOLATION EXAMPLE - eerste-keer-flesvoeding-geven:**
```jsx
{/* BAD - Multiple card-within-card violations */}
<section className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2>What you need?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="border border-gray-200 rounded-xl p-6">  {/* ← VIOLATION! */}
      <h3>Essential items</h3>
      <ul>...</ul>
    </div>
    <div className="border border-gray-200 rounded-xl p-6">  {/* ← VIOLATION! */}
      <h3>Nice to have</h3>
      <ul>...</ul>
    </div>
  </div>
</section>
```

✅ **CORRECTED VERSION:**
```jsx
{/* GOOD - Clean grid layout without nested cards */}
<section className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2>What you need?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>  {/* No borders/backgrounds - clean content */}
      <h3>Essential items</h3>
      <ul>...</ul>
    </div>
    <div>
      <h3>Nice to have</h3>
      <ul>...</ul>
    </div>
  </div>
</section>
```

❌ **ACTUAL VIOLATION EXAMPLE - hypoallergene-flesvoeding:**
```jsx
{/* BAD - Card within card causing alignment issues */}
<div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2>Section Title</h2>
  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">  {/* ← VIOLATION! */}
    <div className="flex items-start space-x-3">
      <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-gray-700 mb-1">Important info</h4>
        <p className="text-gray-600 text-sm">Content becomes misaligned</p>
      </div>
    </div>
  </div>
</div>
```

✅ **CORRECTED VERSION:**
```jsx
{/* GOOD - Clean separator instead of nested container */}
<div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2>Section Title</h2>
  <div className="border-t border-gray-200 pt-6 mt-6">  {/* Clean separator */}
    <div className="flex items-start space-x-3">
      <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-gray-700 mb-1">Important info</h4>
        <p className="text-gray-600 text-sm">Content flows naturally</p>
      </div>
    </div>
  </div>
</div>
```

**What constitutes a card-within-card violation:**

❌ **STRICTLY FORBIDDEN:**
```jsx
{/* VIOLATION 1: Bordered containers within main sections */}
<section className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2>Section Title</h2>
  <div className="border border-gray-200 rounded-xl p-6">  {/* ← VIOLATION! */}
    <h3>Subsection</h3>
    <p>Content</p>
  </div>
</section>

{/* VIOLATION 2: Background containers with borders within main sections */}
<div className="bg-white/80 p-6">
  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">  {/* ← VIOLATION! */}
    <h3>Info box causes alignment issues</h3>
  </div>
</div>

{/* VIOLATION 3: Emergency protocol misaligned sections */}
<section className="bg-white/80 p-6">
  <div className="border-t border-gray-200 pt-6 mt-6">  {/* OK separator */}
    <div className="border-t border-gray-200 pt-6 mt-6">  {/* VIOLATION - redundant nesting! */}
      <h3>Creates double spacing and alignment issues</h3>
    </div>
  </div>
</section>
```

✅ **ALWAYS USE INSTEAD:**
```jsx
{/* CORRECT: Clean content flow within sections */}
<section className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-lg font-semibold text-primary mb-4">Section Title</h2>
  
  <h3 className="font-medium text-primary mb-4">Subsection</h3>
  <p className="text-gray-700 mb-6">Content flows naturally</p>
  
  {/* Use visual separators instead of nested containers */}
  <div className="border-t border-gray-200 pt-6 mt-6">  {/* Only ONE level of separation */}
    <h3 className="font-medium text-primary mb-4">Another Subsection</h3>
    <ul className="space-y-2">...</ul>
  </div>
</section>

{/* CORRECT: Grid layouts instead of nested cards */}
<section className="bg-white/80 p-6">
  <h2 className="text-lg font-semibold text-primary mb-4">Title</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>  {/* No borders/backgrounds - just clean content */}
      <h3 className="font-medium text-primary mb-3">Item 1</h3>
      <p className="text-gray-700">Content</p>
    </div>
    <div>
      <h3 className="font-medium text-primary mb-3">Item 2</h3>
      <p className="text-gray-700">Content</p>
    </div>
  </div>
</section>
```

**Visual Separation Techniques (APPROVED ALTERNATIVES):**
- ✅ `border-t border-gray-200 pt-6` - Top border separator
- ✅ `mt-6` - Spacing between content blocks
- ✅ Grid layouts with `gap-*` 
- ✅ `space-y-*` for vertical spacing
- ✅ Typography hierarchy (h2 → h3 → h4)

**Card Nesting Rules:**
- ✅ **MAXIMUM 1 level** of background/border containers per content section
- ✅ Use visual separators (`border-t`) instead of nested containers
- ✅ Prefer semantic spacing (`mt-*`, `pt-*`) over bordered containers
- ❌ **NEVER nest any containers with `border`, `bg-`, `p-` within main section cards**
- ❌ **ZERO TOLERANCE** for timing boxes, info boxes, or special containers within header/section cards

### ⚠️ CRITICAL: Bullet Point Standards

**ALL BULLET POINTS MUST USE PRIMARY COLOR:**

✅ **CORRECT - Standard bullet points:**
```jsx
<ul className="space-y-2">
  {items.map((item, index) => (
    <li key={index} className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
      <span className="text-gray-700">{item}</span>
    </li>
  ))}
</ul>
```

❌ **FORBIDDEN - Gray bullet points:**
```jsx
{/* NEVER USE THESE */}
<div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>  {/* WRONG */}
<div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></div>  {/* WRONG */}
<div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></div>  {/* WRONG */}
```

**BULLET POINT RULES:**
- ✅ **ALWAYS use `bg-primary`** for bullet points
- ✅ **Standard size: `w-2 h-2`** for regular bullets
- ✅ **Consistent spacing: `space-x-2`** between bullet and text
- ❌ **NEVER use `bg-gray-*`** for bullets
- ❌ **NEVER use different sizes** (`w-1 h-1`) for bullets

✅ **Icon-based lists (alternative):**
```jsx
<ul className="space-y-2">
  {items.map((item, index) => (
    <li key={index} className="flex items-start space-x-2">
      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <span className="text-gray-600 text-sm">{item}</span>
    </li>
  ))}
</ul>
```

## 🚫 Content Restrictions

### No UTF-8 Icons/Emojis

**Never use these in article content:**
- 📊 💡 🎯 💰 ⚠️ 🏥 👶 🍼 
- ✅ ❌ ⭐ 🔍 📝 💪 🌟 ⚡
- 📈 🎉 💯 🚀 ❄️ ⏰ 💧
- Any other UTF-8 emoji or symbol

**Instead use:**
- Lucide React icons for visual elements
- Text bullets with `bg-primary rounded-full` dots
- Proper semantic HTML elements

### No Inline Styling

- Never use `style` attributes
- All styling must use Tailwind CSS classes
- Follow the approved color palette only

## 📋 Kennisbank Article Template

### ✅ APPROVED TEMPLATE - Based on overstappen-van-borst-naar-fles

**Perfect template for all future kennisbank articles** - see `kennisbank-article-template.jsx`

**Template demonstrates correct implementation of:**
- ✅ Proper breadcrumb structure with `text-gray-500`
- ✅ Clean header outside card containers with correct hierarchy
- ✅ Intro text lighter than body text (`text-gray-500` vs `text-gray-600`)
- ✅ No card-within-card violations - uses grid layouts and border-t separators
- ✅ Proper bullet points with `bg-primary rounded-full`
- ✅ Related articles section with `bg-gray-50` for visibility
- ✅ Consistent spacing, typography, and visual hierarchy

## 🚨 CRITICAL ISSUES DISCOVERED & FIXED (January 2025)

### Issue 10: Text Color Hierarchy Problems
**Problem:** Overuse of `text-primary` for regular body text and descriptions
**Solution:** Reserve `text-primary` ONLY for headings and highlights. Use proper gray hierarchy:
- Headings: `text-primary`
- Body text: `text-gray-700` or `text-gray-600` 
- Descriptions: `text-gray-600`
- Meta/secondary text: `text-gray-500`
**Prevention:** Maintain clear visual hierarchy with appropriate text colors for content type

### Issue 11: Child Element Padding in Cards
**Problem:** Child elements having padding (`p-4`, `p-3`) when parent card already has padding, causing alignment issues
**Solution:** Remove padding from child elements that don't have their own backgrounds
**Rule:** Child elements in cards should NOT have padding unless they have their own background color
```jsx
// ❌ WRONG - Child with padding in padded parent
<div className="bg-white/80 p-6">
  <div className="p-4">  {/* Unnecessary padding! */}
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>

// ✅ CORRECT - Clean child without padding
<div className="bg-white/80 p-6">
  <div>
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>

// ✅ CORRECT - Child with own background can have padding
<div className="bg-white/80 p-6">
  <div className="p-4 bg-default rounded-lg">
    <h3>Title</h3>
    <p>Content</p>
  </div>
</div>
```

### Issue 12: Related Articles Link Styling
**Problem:** Related article links missing proper background color for visibility
**Solution:** All "Gerelateerde artikelen" Link elements MUST use `bg-default` for proper contrast
```jsx
// ✅ CORRECT - Related articles with bg-default
<Link 
  href="/kennisbank/other-article" 
  className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors bg-default"
>
  <div className="font-medium text-primary">Article Title →</div>
  <div className="text-sm text-gray-600">Description</div>
</Link>
```
**Prevention:** Always test link visibility within their container backgrounds

### Issue 1: Missing Breadcrumbs
**Problem:** `verschil-startvoeding-opvolgmelk` had no breadcrumb navigation
**Solution:** Added `<div className="text-sm text-gray-500 mb-2">Category • Subcategory</div>`
**Prevention:** All articles must include category breadcrumbs

### Issue 2: UTF-8 Icons Everywhere  
**Problem:** Multiple articles using ❌ ✅ ⭐ 📊 💰 and other UTF-8 symbols
**Solution:** Replace all with proper Lucide icons or remove entirely
**Prevention:** Zero tolerance for UTF-8 symbols - use semantic HTML and Lucide icons

### Issue 3: Forbidden Red/Green Colors
**Problem:** `text-red-600`, `text-green-600`, `bg-red-400`, `bg-green-400` found across articles
**Solution:** Replace with approved colors (`text-primary`, `text-gray-700`, `bg-primary`, `bg-gray-400`)
**Prevention:** Only neutral colors + primary brand color allowed

### Issue 4: Wrong Bullet Points
**Problem:** Using `•` UTF-8 character instead of proper styled bullets
**Solution:** Replace with `<div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>`
**Prevention:** All bullet points must use primary color rounded elements

### Issue 5: Card-Within-Card Violations
**Problem:** `border border-gray-200 rounded-xl p-6` nested within `bg-white/80` containers
**Solution:** Remove nested containers, use clean content flow and `border-t` separators
**Prevention:** Maximum one level of card nesting (exception: related articles with `bg-gray-50`)

### Issue 6: Text-Primary Overuse
**Problem:** Body text using `text-primary` instead of proper gray hierarchy
**Solution:** Reserve `text-primary` for headings/emphasis only, use `text-gray-600` for body
**Prevention:** Maintain clear hierarchy: breadcrumb (gray-500) → intro (gray-500) → body (gray-600+)

### Issue 7: Alignment Issues from Incorrect Padding
**Problem:** Using `p-3` causing vertical misalignment in content containers
**Solution:** Use `py-2 px-3` for proper vertical/horizontal spacing balance
**Prevention:** Consider vertical rhythm when choosing padding classes

### Issue 8: Poor Related Article Visibility  
**Problem:** Related article cards invisible within white containers
**Solution:** Add `bg-gray-50` to related article cards for proper contrast
**Prevention:** Test contrast ratios, especially for interactive elements

### Issue 9: Breadcrumb Color Inconsistency
**Problem:** Using `text-gray-600` instead of lighter `text-gray-500` for breadcrumbs  
**Solution:** Standardize all breadcrumbs to `text-gray-500`
**Prevention:** Maintain proper visual hierarchy - breadcrumbs should be lighter than body text

## 🔗 Navigation & Links

### Internal Links

```jsx
<Link 
  href="/kennisbank/other-article"
  className="text-primary hover:underline font-medium"
>
  Link Text
</Link>
```

### Call-to-Action Links

```jsx
<Link 
  href="/calculator"
  className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-default transition-colors"
>
  <div className="font-medium text-primary">CTA Title →</div>
  <div className="text-sm text-gray-600">Description</div>
</Link>
```

## 📱 Responsive Design

### Grid Layouts

```jsx
{/* Two column layout */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{/* Three column layout */}  
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{/* Responsive flex */}
<div className="flex flex-wrap gap-4">
```

### Mobile Considerations

- Content cards should stack on mobile
- Ensure proper spacing with `space-y-*` classes
- Use `text-sm` for mobile-friendly text sizes
- Test all layouts on mobile viewport

## ✅ Quality Checklist

Before publishing any article, verify:

### 🚨 CRITICAL PRIORITY: Card-Within-Card Violations ✓
- [ ] **ZERO TOLERANCE: NO card-within-card patterns anywhere**
- [ ] **NO `border border-gray-200 rounded-* p-*` containers within main sections**
- [ ] **NO `bg-gray-50` or background containers within `bg-white/80` sections**  
- [ ] **NO timing boxes, info boxes, or special containers within header cards**
- [ ] **NO nested containers with borders/backgrounds/padding**
- [ ] **ALL content flows naturally with typography hierarchy only**
- [ ] **Uses `border-t border-gray-200 pt-6` separators instead of nested containers**
- [ ] **Uses `mt-6` spacing instead of padded containers**

### Colors & Text Hierarchy ✓
- [ ] **NO colored text**: No `text-blue-*`, `text-red-*`, `text-green-*`, `text-yellow-*`, `text-purple-*`, `text-pink-*` 
- [ ] **NO colored backgrounds**: No `bg-blue-*`, `bg-red-*`, `bg-green-*`, `bg-yellow-*`, `bg-purple-*`, `bg-pink-*`
- [ ] **NO colored borders**: No `border-blue-*`, `border-red-*`, `border-green-*`, etc.
- [ ] **EXCEPTION: Amber colors ONLY for warnings** with "Let op" text and proper alert structure
- [ ] **ALL h2 headers use `text-primary`** (not gray colors)
- [ ] **`text-primary` ONLY for headings and highlights** - NOT for regular body text
- [ ] **Body text uses proper gray hierarchy**: `text-gray-700` or `text-gray-600`
- [ ] **Descriptions use `text-gray-600`** for secondary content
- [ ] **Meta/secondary text uses `text-gray-500`**
- [ ] Only neutral colors: `text-gray-*`, `bg-gray-*`, `text-primary`, `bg-primary`
- [ ] Proper contrast ratios maintained

### Bullet Points ✓  
- [ ] **CRITICAL: ALL bullet points use `bg-primary rounded-full`** - NO gray bullets
- [ ] **NO `bg-gray-400`, `bg-gray-500` bullets** - Strictly forbidden
- [ ] **Standard size: `w-2 h-2`** for all bullets
- [ ] **Consistent spacing: `space-x-2`** between bullet and text
- [ ] **NEVER use `w-1 h-1` bullet sizes**

### Article Introduction ✓
- [ ] **CRITICAL: Uses `text-gray-500` for intro paragraph** - lighter than body text  
- [ ] **Category breadcrumb uses `text-gray-500`**
- [ ] **Clear visual hierarchy: breadcrumb → title → light intro → darker body**
- [ ] **h1 includes required icon** with `w-6 h-6 mr-3 text-primary`
- [ ] **Intro is OUTSIDE card containers** - direct child of main div

### Typography & Contrast ✓
- [ ] **h1 ONLY uses `text-2xl font-bold`** - NO other sizes allowed
- [ ] **h2 ONLY uses `text-lg font-semibold`** - NO other sizes allowed  
- [ ] **h3 ONLY uses `font-medium`** - NO text-size classes
- [ ] **Body text uses NO size classes** - only `text-gray-600` or `text-gray-700`
- [ ] **NO `text-3xl`, `text-4xl`, `text-xl` anywhere** - Strictly forbidden
- [ ] **All h1 have required icon** with `<Icon className="w-6 h-6 mr-3 text-primary" />`
- [ ] **Sufficient contrast**: No `bg-gray-50` + `text-gray-600` combinations
- [ ] **Child cards use `bg-white` + `text-gray-600`** for proper contrast
- [ ] **NO light text on light backgrounds** - minimum `text-gray-600`

### Layout ✓
- [ ] **CRITICAL: Uses Layout component wrapper** - Never start with naked grid structure
- [ ] Uses `grid grid-cols-12 gap-6` structure
- [ ] Has `KennisbankSidebar` component
- [ ] No `min-h-screen` on containers
- [ ] **NO single large container** wrapping all content
- [ ] Each section in **individual card containers**
- [ ] **NO excessive card nesting** (maximum 2 levels)
- [ ] Uses visual separators instead of nested borders
- [ ] Uses `space-y-6` for section spacing
- [ ] Proper responsive breakpoints
- [ ] Content flows naturally on mobile

### Introduction Section Consistency ✓
- [ ] **CRITICAL: Has properly framed introduction section** using glassmorphism pattern
- [ ] Uses `bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6`
- [ ] **NO old-style `bg-gray-50` introduction sections**
- [ ] **NO border-box timing sections in header** - keep intro clean and aligned
- [ ] Introduction header uses `text-lg font-semibold text-primary mb-4`
- [ ] Uses `<section>` semantic element, not generic `<div>`

### Header Card Content Flow ✓
- [ ] **NO card-within-card patterns in headers** - content flows naturally
- [ ] **NO nested containers with borders/backgrounds** within header cards
- [ ] Uses `mt-6` for spacing between subsections within cards
- [ ] Content aligns properly without visual separation boxes
- [ ] Subsections use heading + content pattern, not container + content

### Padding & Child Elements ✓
- [ ] **Child elements in cards have NO padding** unless they have their own background
- [ ] **Remove `p-4`, `p-3` etc. from child divs** in padded parent cards
- [ ] **Exception: Elements with backgrounds CAN have padding** (e.g., `p-4 bg-default rounded-lg`)
- [ ] **Proper spacing with `mt-6`, `mb-4`** instead of unnecessary padding
- [ ] **No double-padding violations** - parent card padding should be sufficient

### Links & Navigation ✓
- [ ] **Related articles links use `bg-default`** for proper visibility
- [ ] **All Link elements have proper hover states** with `hover:bg-default`
- [ ] **Link text uses `font-medium text-primary` for titles**
- [ ] **Link descriptions use `text-sm text-gray-600`**
- [ ] **Links are easily distinguishable** from their container background

### Content ✓
- [ ] No UTF-8 emojis or symbols
- [ ] Proper heading hierarchy (h1 → h2 → h3 → h4)
- [ ] Consistent spacing with `space-y-*`
- [ ] All images have proper alt text
- [ ] Links have hover states

### Components ✓
- [ ] All imports are correct
- [ ] Sidebar configuration is complete
- [ ] Icons use Lucide React library
- [ ] Cards use approved styling patterns

## 🛠 Maintenance

### Regular Updates
- Review color usage quarterly
- Update deprecated Tailwind classes
- Ensure accessibility compliance
- Test on multiple devices/browsers

### Common Issues to Fix

**RECENT FIXES IMPLEMENTED (January 2025):**

1. **Introduction Section Inconsistency** - FIXED in 4 files:
   - ❌ `bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8` 
   - ✅ `bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6`
   - Fixed in: `fles-bereiden-stap-voor-stap`, `juiste-houding-bij-flesvoeding`, `juiste-temperatuur-controleren`, `kosten-van-flesvoeding`

2. **Missing Layout Component** - FIXED:
   - ❌ Naked grid structure causing scrollbar issues
   - ✅ Added proper `<Layout>` wrapper to `uitgebreide-flesvoeding-gids`

3. **Font Size Inconsistencies** - FIXED:
   - ❌ `text-sm text-gray-700` for regular list items
   - ✅ `text-gray-700` for consistent list styling
   - ❌ `text-2xl font-semibold` for introduction headers
   - ✅ `text-lg font-semibold` for consistency

4. **Header Alignment Issues** - FIXED:
   - ❌ Border-box timing sections misaligned with intro text
   - ✅ Clean alignment using consistent typography hierarchy

**ONGOING MAINTENANCE ISSUES:**

5. **Double scroll**: Remove `min-h-screen` from grid containers
6. **Color violations**: Replace ALL colored elements with neutral styling
   - `bg-red-50` → `bg-gray-50`
   - `text-blue-700` → `text-gray-700`
   - `text-green-600` → `text-primary` (for icons)
   - `border-yellow-200` → `border-gray-200`
7. **Header styling**: All h2 elements MUST use `text-primary`, not gray colors
8. **Missing sidebar**: Add KennisbankSidebar component and configuration
9. **UTF-8 icons**: Replace with proper Lucide icons or remove entirely
10. **Colored cards**: Convert info/warning/success cards to neutral gray styling
11. **Excessive card nesting**: Remove unnecessary nested containers, use visual separators instead
    - Replace 3+ levels of card nesting with cleaner layouts
    - Use `border-b border-gray-200` dividers between content sections
    - Prefer grid layouts over nested card structures

## 📚 Examples

See these articles as reference implementations:
- `/kennisbank/basis-flesvoeding/flesvoeding-vs-borstvoeding/`
- `/kennisbank/financiele-aspecten/kosten-van-flesvoeding/`
- `/kennisbank/voedingstechnieken/juiste-temperatuur-controleren/`

---

**Last Updated:** January 2025 (Major Update - Critical Issues Fixed + Template Added)
**Version:** 2.0
**Status:** Active Guidelines

**MAJOR UPDATE 2.0 - COMPREHENSIVE VIOLATION FIXES + TEMPLATE:**
- ✅ **Created kennisbank-article-template.jsx** based on overstappen-van-borst-naar-fles
- ✅ **Documented 9 critical issues** discovered and fixed across multiple articles
- ✅ **Added prevention strategies** for each violation type
- ✅ **Fixed UTF-8 icons, forbidden colors, card violations** across artikel pages
- ✅ **Standardized bullet points and breadcrumb colors** 
- ✅ **Improved related article visibility** with bg-gray-50 pattern
- ✅ **Fixed text-primary overuse** and alignment issues

**Previous Updates (v1.3):**
- Added specific font size hierarchy examples with actual violations found
- Clarified card-within-card violations with real examples
- Added breadcrumb format violations (complex navigation vs simple tags)
- Enhanced bullet point standards with zero tolerance policy
- Updated emergency protocol alignment examples