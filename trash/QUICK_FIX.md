# Quick Fix Guide

## TL;DR - What You Need to Do Right Now

### 1. Fix DATABASE_URL in CapRover (2 minutes)

Go to your **flesvoedingcalculator** app in CapRover and change:

**OLD (Wrong):**
```
DATABASE_URL=postgresql://flesvoedingcalculator-db:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
```

**NEW (Correct):**
```
DATABASE_URL=postgresql://flesvoedingcalculator_user:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
```

**What changed**: `flesvoedingcalculator-db` → `flesvoedingcalculator_user`

### 2. Add Missing NEXT_PUBLIC_ Variables in CapRover (1 minute)

Add these two variables to your app:
```
NEXT_PUBLIC_SITE_URL=https://flesvoedingcalculator.nl
NEXT_PUBLIC_GA_ID=G-3NZ90KFHQ6
```

### 3. Deploy Updated Code (3 minutes)

```bash
cd /Users/jensscholtanus/PhpstormProjects/claude-engineer/flesvoedingcalculator

git add .
git commit -m "Fix: Dockerfile and database configuration"
git push caprover main
```

### 4. Clear Build Cache - First Time Only (1 minute)

In CapRover:
1. App → "App Configs"
2. Enable "Do not use build cache"
3. Click "Save & Update"
4. (Re-enable after successful build)

### 5. Test (1 minute)

Visit these URLs:
- https://flesvoedingcalculator.nl (check console - no warnings)
- https://flesvoedingcalculator.nl/api/test-db (should show "connected")

## All CapRover Environment Variables

Copy-paste this entire block into CapRover:

```bash
DATABASE_URL=postgresql://flesvoedingcalculator_user:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
NEXT_PUBLIC_SITE_URL=https://flesvoedingcalculator.nl
NEXT_PUBLIC_GA_ID=G-3NZ90KFHQ6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QDm5pXMjr-KdAaSbQ
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_zge4lpj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tliffxj
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcDZNErAAAAADxTRPuyx7oBmk_JziaOi1UlZFvn
EMAILJS_PRIVATE_KEY=gT7RMqb9IQ8tbN2GxDvii
RECAPTCHA_SECRET_KEY=6LcDZNErAAAAADmXA7dLx3PsIFonoRwz9JlKZ3VQ
BOL_API_CLIENT_ID=8c2d47c1-3b50-4dcb-9167-d656a785bcaf
BOL_API_CLIENT_SECRET=dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP
BOL_PRODUCT_FEED_USERNAME=53f32149-2ddd-4974-a4da-8e26c6b98db5
BOL_PRODUCT_FEED_PASSWORD=j!Wk3Y=3XB{Rv#Nm
ADMIN_PASSWORD=your_secure_admin_password_here
```

## What Was Wrong & What Got Fixed

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| ❌ Browser console warnings | Missing NEXT_PUBLIC_ vars in Dockerfile | ✅ Updated Dockerfile |
| ❌ Database connection fails | Wrong username in DATABASE_URL | ✅ Corrected to `flesvoedingcalculator_user` |
| ❌ Local dev issues | No .env.local | ✅ Created .env.local |

## Files Changed

- ✅ [Dockerfile](Dockerfile) - Added NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA_ID, DATABASE_URL
- ✅ [.env](.env) - Fixed DATABASE_URL username
- ✅ [.env.local](.env.local) - Created for local dev
- ✅ [app/api/test-db/route.js](app/api/test-db/route.js) - DB test endpoint
- ✅ [scripts/test-db-connection.js](scripts/test-db-connection.js) - CLI test script

## Total Time: ~8 minutes

For detailed explanation, see:
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Complete deployment guide
- [CAPROVER_DATABASE_FIX.md](CAPROVER_DATABASE_FIX.md) - Database fix details
- [CAPROVER_SETUP.md](CAPROVER_SETUP.md) - CapRover setup guide
