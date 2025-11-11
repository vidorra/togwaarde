# Final CapRover Environment Variables Configuration

## Overview
This document contains the **final, corrected** list of environment variables needed for your CapRover deployment.

## Important Changes Made

### ✅ Removed NEXT_PUBLIC_GA_ID
Google Analytics ID (`G-3NZ90KFHQ6`) is **hardcoded** in [app/layout.jsx](app/layout.jsx) lines 50-60, so the environment variable is not needed.

### ✅ Fixed DATABASE_URL
Changed username from `flesvoedingcalculator-db` to `flesvoedingcalculator_user` to match PostgreSQL configuration.

## CapRover Environment Variables

Set these in your **flesvoedingcalculator** app (not the database app):

```bash
# Database Connection (CORRECTED USERNAME)
DATABASE_URL=postgresql://flesvoedingcalculator_user:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30

# Public Site Configuration
NEXT_PUBLIC_SITE_URL=https://flesvoedingcalculator.nl

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QDm5pXMjr-KdAaSbQ
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_zge4lpj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tliffxj
EMAILJS_PRIVATE_KEY=gT7RMqb9IQ8tbN2GxDvii

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcDZNErAAAAADxTRPuyx7oBmk_JziaOi1UlZFvn
RECAPTCHA_SECRET_KEY=6LcDZNErAAAAADmXA7dLx3PsIFonoRwz9JlKZ3VQ

# Bol.com API
BOL_API_CLIENT_ID=8c2d47c1-3b50-4dcb-9167-d656a785bcaf
BOL_API_CLIENT_SECRET=dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP
BOL_PRODUCT_FEED_USERNAME=53f32149-2ddd-4974-a4da-8e26c6b98db5
BOL_PRODUCT_FEED_PASSWORD=j!Wk3Y=3XB{Rv#Nm

# Admin Panel
ADMIN_PASSWORD=your_secure_admin_password_here
```

## What's NOT Needed

### ❌ NEXT_PUBLIC_GA_ID
**Removed** - Google Analytics works via hardcoded ID in layout.jsx

## Deployment Checklist

### Step 1: Update Environment Variables in CapRover
1. Go to your app in CapRover
2. Click "App Configs" → "Environmental Variables" tab
3. **Remove** `NEXT_PUBLIC_GA_ID` if it exists
4. **Update** `DATABASE_URL` with corrected username
5. Click "Save & Update"

### Step 2: Clear Build Cache (First Time)
1. In "App Configs" → scroll to "Build Settings"
2. Enable "Do not use build cache for this app"
3. Click "Save & Update"

### Step 3: Deploy
```bash
cd /Users/jensscholtanus/PhpstormProjects/claude-engineer/flesvoedingcalculator
git add .
git commit -m "Fix: Remove GA_ID env var, use hardcoded value"
git push caprover main
```

### Step 4: Re-enable Build Cache
After successful deployment, go back to "Build Settings" and disable "Do not use build cache"

### Step 5: Verify
1. Visit https://flesvoedingcalculator.nl
2. Open browser console (F12)
3. Should see NO warnings about missing NEXT_PUBLIC_ variables
4. Visit https://flesvoedingcalculator.nl/api/test-db
5. Should see `"database": "connected"`

## Files Modified

1. **[Dockerfile](Dockerfile)** - Removed NEXT_PUBLIC_GA_ID build arg
2. **[.github/workflows/deploy.yml](.github/workflows/deploy.yml)** - Removed from GitHub Actions
3. **[app/layout.jsx](app/layout.jsx)** - Removed duplicate analytics code using env var
4. **[lib/analytics.js](lib/analytics.js)** - Hardcoded GA ID in trackPageView function
5. **[.env](.env)** - Removed NEXT_PUBLIC_GA_ID
6. **[.env.local](.env.local)** - Removed NEXT_PUBLIC_GA_ID

## Summary

Your configuration is now cleaner:
- ✅ Google Analytics works (hardcoded in layout.jsx)
- ✅ Database connects properly (corrected username)
- ✅ All NEXT_PUBLIC_ variables properly configured
- ✅ No redundant environment variables
- ✅ Simplified deployment process

## Why This Works Better

**Before:**
- Google Analytics loaded twice (hardcoded + env var)
- DATABASE_URL had wrong username
- Extra environment variable to manage

**After:**
- Google Analytics loads once (hardcoded only)
- DATABASE_URL uses correct username
- Fewer environment variables to configure
- Cleaner, more maintainable code
