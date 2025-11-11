# CapRover Database Configuration Fix

## Current Database Setup

Your PostgreSQL database app has these environment variables:
```
POSTGRES_USER=flesvoedingcalculator_user
POSTGRES_PASSWORD=b3f1911f7b58306f
POSTGRES_DB=flesvoedingcalculator
POSTGRES_INITDB_ARGS=(empty - this is OK)
```

## Issue: DATABASE_URL Mismatch

Your current DATABASE_URL is:
```
postgresql://flesvoedingcalculator-db:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
```

**Problem**: The username in the URL is `flesvoedingcalculator-db` but the actual PostgreSQL user is `flesvoedingcalculator_user`

## Corrected DATABASE_URL

Update your DATABASE_URL in the **flesvoedingcalculator** app (not the database app) to:

```
postgresql://flesvoedingcalculator_user:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
```

**What changed**: `flesvoedingcalculator-db` → `flesvoedingcalculator_user`

## Step-by-Step Fix

### 1. In CapRover - Database App (srv-captain--flesvoedingcalculator-db)
Your database environment variables are correct. Leave them as is:
- ✅ POSTGRES_USER=flesvoedingcalculator_user
- ✅ POSTGRES_PASSWORD=b3f1911f7b58306f
- ✅ POSTGRES_DB=flesvoedingcalculator

### 2. In CapRover - Application App (flesvoedingcalculator)
Set ALL these environment variables in your main application:

```bash
# Database Connection - UPDATED USERNAME
DATABASE_URL=postgresql://flesvoedingcalculator_user:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30

# Public Environment Variables (exposed to browser)
NEXT_PUBLIC_SITE_URL=https://flesvoedingcalculator.nl
NEXT_PUBLIC_GA_ID=G-3NZ90KFHQ6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QDm5pXMjr-KdAaSbQ
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_zge4lpj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tliffxj
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcDZNErAAAAADxTRPuyx7oBmk_JziaOi1UlZFvn

# Server-side Only (not exposed to browser)
EMAILJS_PRIVATE_KEY=gT7RMqb9IQ8tbN2GxDvii
RECAPTCHA_SECRET_KEY=6LcDZNErAAAAADmXA7dLx3PsIFonoRwz9JlKZ3VQ
BOL_API_CLIENT_ID=8c2d47c1-3b50-4dcb-9167-d656a785bcaf
BOL_API_CLIENT_SECRET=dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP
BOL_PRODUCT_FEED_USERNAME=53f32149-2ddd-4974-a4da-8e26c6b98db5
BOL_PRODUCT_FEED_PASSWORD=j!Wk3Y=3XB{Rv#Nm
ADMIN_PASSWORD=your_secure_admin_password_here
```

### 3. Clear Build Cache and Rebuild

**Important**: After setting environment variables:

1. In CapRover app settings → **"App Configs"** tab
2. Scroll down to **"Build Settings"**
3. Enable **"Do not use build cache for this app"** (temporarily)
4. Click **"Save & Update"**
5. Click **"Re-deploy"** or push new code to trigger rebuild
6. After successful rebuild, you can re-enable build cache

### 4. Test Database Connection

After deployment, you can test the database connection using the CapRover web terminal:

1. Go to your app in CapRover
2. Click "Deployment" tab
3. Click "Web Terminal" (if available) or use SSH
4. Run:
```bash
node scripts/test-db-connection.js
```

Or test through an API endpoint - create a test endpoint:

```javascript
// pages/api/test-db.js
import { checkDatabaseConnection } from '../../lib/db/connection'

export default async function handler(req, res) {
  const isConnected = await checkDatabaseConnection()
  res.status(200).json({
    database: isConnected ? 'connected' : 'failed',
    timestamp: new Date().toISOString()
  })
}
```

Then visit: `https://flesvoedingcalculator.nl/api/test-db`

## Why This Fixes Your Issues

### Issue 1: Missing NEXT_PUBLIC_ Variables
**Fixed by**:
- Updated Dockerfile to accept NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_GA_ID as build args
- These variables are now baked into the build when you deploy

**Result**: Browser console will show ✅ for all NEXT_PUBLIC_ variables

### Issue 2: Database Connection
**Fixed by**:
- Corrected DATABASE_URL username from `flesvoedingcalculator-db` to `flesvoedingcalculator_user`
- Added DATABASE_URL to Dockerfile build args so migrations can run during build

**Result**: Database queries will work in production

## Verification Checklist

After rebuilding:

- [ ] No warnings in browser console about missing NEXT_PUBLIC_ variables
- [ ] Browser console shows "NEXT_PUBLIC_ vars found: 6" (or more)
- [ ] All EmailJS, reCAPTCHA variables show ✅
- [ ] Database connection test succeeds
- [ ] No "web-vitals" module error (web-vitals is in package.json)
- [ ] Application features work (contact form, product recommendations, etc.)

## Common Issues

### "No NEXT_PUBLIC_ variables found"
**Cause**: Variables not set in CapRover OR build cache not cleared
**Solution**: Verify variables are set, clear build cache, rebuild

### "Database connection failed: getaddrinfo ENOTFOUND"
**Cause**: Wrong DATABASE_URL or database service not running
**Solution**: Verify DATABASE_URL uses `flesvoedingcalculator_user` username

### "web-vitals module error"
**Cause**: Missing web-vitals package
**Solution**: Already in package.json, should resolve after rebuild

## Notes on POSTGRES_INITDB_ARGS

The empty `POSTGRES_INITDB_ARGS` is perfectly fine. This variable is only used to pass additional arguments to PostgreSQL's `initdb` command during initial database creation. Common uses include:

- Setting encoding: `--encoding=UTF8`
- Setting locale: `--locale=en_US.UTF-8`

Since you didn't specify any, PostgreSQL uses sensible defaults. Your database is working fine without it.

## Summary

1. ✅ Dockerfile updated to include all NEXT_PUBLIC_ variables
2. ✅ Corrected DATABASE_URL username
3. ✅ .env.local created for local development
4. ⏭️ Next: Set all environment variables in CapRover
5. ⏭️ Next: Clear build cache and rebuild
6. ⏭️ Next: Verify in browser console
