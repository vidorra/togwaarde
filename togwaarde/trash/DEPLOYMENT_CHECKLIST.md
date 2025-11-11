# Deployment Checklist - Flesvoedingcalculator

## Issues Fixed

### 1. ✅ Missing NEXT_PUBLIC_ Environment Variables
**Problem**: Browser console showed warnings about missing NEXT_PUBLIC_ variables
**Root Cause**: Dockerfile was missing NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_GA_ID
**Solution**: Updated Dockerfile to accept and set these variables during build

### 2. ✅ Database Connection Username Mismatch
**Problem**: DATABASE_URL used wrong username
**Root Cause**: URL had `flesvoedingcalculator-db` but PostgreSQL user is `flesvoedingcalculator_user`
**Solution**: Corrected DATABASE_URL in .env file

### 3. ✅ Local Development Configuration
**Problem**: No separation between local and production environment variables
**Solution**: Created .env.local for local development

## Files Modified

1. **[Dockerfile](Dockerfile)** - Added missing NEXT_PUBLIC_ build arguments
2. **[.env](.env)** - Corrected DATABASE_URL username
3. **[.env.local](.env.local)** - Created for local development (git-ignored)
4. **[app/api/test-db/route.js](app/api/test-db/route.js)** - Created database test endpoint
5. **[scripts/test-db-connection.js](scripts/test-db-connection.js)** - Created CLI test script

## Documentation Created

1. **[CAPROVER_SETUP.md](CAPROVER_SETUP.md)** - Complete CapRover setup guide
2. **[CAPROVER_DATABASE_FIX.md](CAPROVER_DATABASE_FIX.md)** - Database configuration fix guide
3. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - This file

## Deployment Steps

### Step 1: Update CapRover Environment Variables

In your **flesvoedingcalculator** app (not the database app), set these environment variables:

```bash
# IMPORTANT: Update the DATABASE_URL username to 'flesvoedingcalculator_user'
DATABASE_URL=postgresql://flesvoedingcalculator_user:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30

# Public variables (exposed to browser - MUST have NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SITE_URL=https://flesvoedingcalculator.nl
NEXT_PUBLIC_GA_ID=G-3NZ90KFHQ6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QDm5pXMjr-KdAaSbQ
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_zge4lpj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tliffxj
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcDZNErAAAAADxTRPuyx7oBmk_JziaOi1UlZFvn

# Server-side only (NOT exposed to browser - no NEXT_PUBLIC_ prefix)
EMAILJS_PRIVATE_KEY=gT7RMqb9IQ8tbN2GxDvii
RECAPTCHA_SECRET_KEY=6LcDZNErAAAAADmXA7dLx3PsIFonoRwz9JlKZ3VQ
BOL_API_CLIENT_ID=8c2d47c1-3b50-4dcb-9167-d656a785bcaf
BOL_API_CLIENT_SECRET=dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP
BOL_PRODUCT_FEED_USERNAME=53f32149-2ddd-4974-a4da-8e26c6b98db5
BOL_PRODUCT_FEED_PASSWORD=j!Wk3Y=3XB{Rv#Nm
ADMIN_PASSWORD=your_secure_admin_password_here
```

### Step 2: Deploy Updated Code

```bash
# Commit the changes
git add .
git commit -m "Fix: Update Dockerfile and database configuration

- Add NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_GA_ID to Dockerfile
- Add DATABASE_URL to build args for migrations
- Correct DATABASE_URL username to match PostgreSQL user
- Add database connection test endpoint
- Create comprehensive deployment documentation"

# Push to CapRover (adjust remote name if different)
git push caprover main
```

### Step 3: Clear Build Cache (First Deployment Only)

**Important**: For the first deployment after setting environment variables:

1. Go to CapRover → Your App → "App Configs" tab
2. Scroll to "Build Settings"
3. Enable **"Do not use build cache for this app"**
4. Click **"Save & Update"**
5. After successful build, you can re-enable build cache

### Step 4: Verify Deployment

#### A. Check Browser Console
1. Open https://flesvoedingcalculator.nl
2. Open browser developer console (F12)
3. Look for "COMPREHENSIVE ENVIRONMENT DEBUG" output
4. Verify all variables show ✅

Expected output:
```
📧 Required EmailJS Variables Check:
  - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ...SbQ ✅
  - NEXT_PUBLIC_EMAILJS_SERVICE_ID: ...lpj ✅
  - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ...fxj ✅

🔐 reCAPTCHA Variable Check:
  - NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ...Fvn ✅

🏗️ Build Information:
  - NEXT_PUBLIC_ vars found: 6
```

#### B. Test Database Connection
Visit: https://flesvoedingcalculator.nl/api/test-db

Expected response:
```json
{
  "status": "success",
  "database": "connected",
  "responseTime": "25ms",
  "timestamp": "2025-10-26T...",
  "environment": "production",
  "message": "✅ Database connection is working"
}
```

#### C. Test Application Features
- [ ] Contact form works (EmailJS)
- [ ] reCAPTCHA loads on contact form
- [ ] Product recommendations display (Bol.com API)
- [ ] Admin panel accessible
- [ ] Database queries work (snippets, pages)

## Troubleshooting

### Issue: "NO NEXT_PUBLIC_ variables found!"
**Cause**: Variables not available during build time
**Solutions**:
1. Verify all NEXT_PUBLIC_ variables are set in CapRover
2. Clear build cache (see Step 3)
3. Trigger a fresh rebuild
4. Check Dockerfile includes all ARG and ENV declarations

### Issue: Database connection fails with "getaddrinfo ENOTFOUND"
**Cause**: Cannot resolve database hostname
**Solutions**:
1. Verify DATABASE_URL is set in CapRover app environment
2. Check database service is running: `srv-captain--flesvoedingcalculator-db`
3. Verify DATABASE_URL username is `flesvoedingcalculator_user` (not `flesvoedingcalculator-db`)
4. Test from CapRover web terminal: `node scripts/test-db-connection.js`

### Issue: Database connection fails with authentication error
**Cause**: Wrong username or password
**Solutions**:
1. Verify username is `flesvoedingcalculator_user`
2. Verify password is `b3f1911f7b58306f`
3. Match with PostgreSQL app environment variables

### Issue: "web-vitals" module error
**Cause**: Next.js trying to load web-vitals dynamically
**Solutions**:
- Already in package.json dependencies
- Should resolve after rebuild
- Not critical - doesn't affect app functionality

### Issue: Google AdSense "adsbygoogle" error
**Cause**: AdSense script trying to initialize ads multiple times
**Solutions**:
- This is a Google AdSense issue, not your app
- Usually happens during navigation
- Can be ignored or fixed by ensuring ads are only loaded once per page

## Local Development

### Setup
```bash
# Copy environment variables for local development
cp .env.local.example .env.local  # If example exists
# Or use the existing .env.local

# Note: DATABASE_URL in .env.local won't work locally
# It points to CapRover internal network
# Options:
# 1. Set up local PostgreSQL
# 2. Comment out DATABASE_URL for local development without DB
# 3. Use a development database connection string
```

### Running Locally
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build locally (to test)
npm run build

# Run production build locally
npm run start
```

### Local Database (Optional)
```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb flesvoedingcalculator

# Update .env.local
DATABASE_URL=postgresql://localhost:5432/flesvoedingcalculator

# Run migrations
npm run db:migrate
npm run db:migrate-data
```

## Database Information

### Production Database
- **Host**: srv-captain--flesvoedingcalculator-db (CapRover internal)
- **Port**: 5432
- **User**: flesvoedingcalculator_user
- **Password**: b3f1911f7b58306f
- **Database**: flesvoedingcalculator
- **Access**: Only accessible within CapRover network

### Database Management
```bash
# Generate new migration
npm run db:generate

# Run migrations
npm run db:migrate

# Run data migrations
npm run db:migrate-data

# Full setup (generate + migrate + seed)
npm run db:setup
```

## Security Notes

1. **NEXT_PUBLIC_ Variables**: Any variable with this prefix is exposed to the browser. Never use it for secrets.

2. **Secrets**: Store all API keys, passwords, and secrets as server-side environment variables (without NEXT_PUBLIC_ prefix)

3. **.env Files**:
   - `.env` - Tracked in git (template/defaults only)
   - `.env.local` - Git-ignored (local development secrets)
   - Never commit real secrets to git

4. **Database**: Production database is only accessible within CapRover network (secure by default)

## Next Steps After Deployment

1. Monitor CapRover logs for any errors
2. Test all features on production site
3. Verify Google Analytics is tracking (with GA_ID)
4. Test contact form submissions
5. Verify product recommendations are loading
6. Check admin panel functionality

## Support

For issues or questions:
- Check CapRover logs: App → "Deployment" → "App Logs"
- Review documentation: CAPROVER_SETUP.md, CAPROVER_DATABASE_FIX.md
- Test database: https://flesvoedingcalculator.nl/api/test-db
