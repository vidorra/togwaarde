# CapRover Environment Variables Setup

## Problem Summary

The application was showing warnings about missing `NEXT_PUBLIC_` environment variables because:
1. The Dockerfile was missing `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_ID`
2. These variables need to be passed as build arguments during the Docker build process
3. Next.js bakes environment variables into the build, so they must be available at build time

## Database Connection Issue

The database connection fails locally because:
- The DATABASE_URL points to `srv-captain--flesvoedingcalculator-db:5432`
- This is a CapRover internal hostname that only works within the CapRover network
- For local development, you need a separate local database or comment out DATABASE_URL

## Solution: Setting Up Environment Variables in CapRover

### Step 1: Add Environment Variables in CapRover

Go to your CapRover app's settings and add these environment variables:

```bash
# Public variables (must have NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SITE_URL=https://flesvoedingcalculator.nl
NEXT_PUBLIC_GA_ID=G-3NZ90KFHQ6
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=QDm5pXMjr-KdAaSbQ
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_zge4lpj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tliffxj
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcDZNErAAAAADxTRPuyx7oBmk_JziaOi1UlZFvn

# Server-side only variables (no NEXT_PUBLIC_ prefix)
EMAILJS_PRIVATE_KEY=gT7RMqb9IQ8tbN2GxDvii
RECAPTCHA_SECRET_KEY=6LcDZNErAAAAADmXA7dLx3PsIFonoRwz9JlKZ3VQ
BOL_API_CLIENT_ID=8c2d47c1-3b50-4dcb-9167-d656a785bcaf
BOL_API_CLIENT_SECRET=dA7u6Z+S+m?LgFN)cFygE6K3zMY84KdsreweAAT0DOB3bfoB2vsGE?ViDtWycQrP
BOL_PRODUCT_FEED_USERNAME=53f32149-2ddd-4974-a4da-8e26c6b98db5
BOL_PRODUCT_FEED_PASSWORD=j!Wk3Y=3XB{Rv#Nm
ADMIN_PASSWORD=your_secure_admin_password_here
DATABASE_URL=postgresql://flesvoedingcalculator-db:b3f1911f7b58306f@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
```

### Step 2: Rebuild the Application

After adding/updating environment variables in CapRover:

1. **Clear Build Cache** (important!):
   - In CapRover app settings, enable "Do not use build cache for this app"
   - Or run a force rebuild

2. **Trigger a New Deployment**:
   - Either push new code to trigger rebuild
   - Or use "Re-deploy" button in CapRover

3. **Verify Variables are Loaded**:
   - Check browser console for the debug output
   - Should see all NEXT_PUBLIC_ variables listed with ✅

## Database Setup

### Production (CapRover)

The database is already configured and running at:
- Host: `srv-captain--flesvoedingcalculator-db`
- Database: `flesvoedingcalculator`
- The DATABASE_URL is automatically available within the CapRover network

### Local Development

For local development, you have two options:

#### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL locally
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
createdb flesvoedingcalculator

# Update .env.local with local connection
DATABASE_URL=postgresql://localhost:5432/flesvoedingcalculator
```

#### Option 2: Skip Database Features Locally
```bash
# In .env.local, comment out DATABASE_URL
# DATABASE_URL=...

# The app will skip database features during development
```

## Testing Database Connection

Run the test script to verify database connectivity:

```bash
# Only works in production/CapRover environment
npm run db:test

# Or manually
node scripts/test-db-connection.js
```

## Important Notes

1. **NEXT_PUBLIC_ Prefix**: Any variable needed in the browser MUST start with `NEXT_PUBLIC_`
2. **Build Time vs Runtime**: NEXT_PUBLIC_ variables are baked into the build and cannot be changed without rebuilding
3. **Security**: Never use NEXT_PUBLIC_ for secrets - they will be visible in the browser
4. **Database**: The production database is only accessible within the CapRover network
5. **Rebuild Required**: After changing any NEXT_PUBLIC_ variable, you MUST rebuild the app

## Troubleshooting

### Issue: Variables not showing up after rebuild
**Solution**:
- Clear build cache in CapRover
- Make sure variables are set BEFORE triggering rebuild
- Check Dockerfile includes all ARG and ENV declarations

### Issue: Database connection fails in production
**Solution**:
- Verify DATABASE_URL is set in CapRover environment variables
- Check database service is running: `srv-captain--flesvoedingcalculator-db`
- Verify database connection string format

### Issue: Database connection fails locally
**Solution**:
- This is expected - the CapRover database hostname doesn't work locally
- Use local PostgreSQL or comment out DATABASE_URL for local development
- Use .env.local for local-specific configuration

## Updated Files

The following files were updated to fix the environment variable issues:

1. **Dockerfile**: Added missing NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_GA_ID as build arguments
2. **.env.local**: Created for local development with all required variables
3. **scripts/test-db-connection.js**: Created to test database connectivity

## Next Steps

1. Set all environment variables in CapRover (see Step 1)
2. Enable "Do not use build cache" temporarily
3. Trigger a rebuild
4. Verify no more warnings in browser console
5. Test that all features work (email, reCAPTCHA, database)
6. Re-enable build cache for faster future deployments
