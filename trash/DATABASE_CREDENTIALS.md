# Database Credentials - WORKING CONFIGURATION

## ✅ Current Working Configuration

### Database App: flesvoedingcalculator-db

**Environment Variables:**
```
POSTGRES_USER=b3f1911f7b58306f
POSTGRES_PASSWORD=774bd02ed609a948
POSTGRES_DB=flesvoedingcalculator
```

### Main App: flesvoedingcalculator

**DATABASE_URL:**
```
DATABASE_URL=postgresql://b3f1911f7b58306f:774bd02ed609a948@srv-captain--flesvoedingcalculator-db:5432/flesvoedingcalculator?connection_limit=5&pool_timeout=30
```

## Connection Details

- **Host:** `srv-captain--flesvoedingcalculator-db` (internal CapRover network)
- **Port:** `5432`
- **Database:** `flesvoedingcalculator`
- **Username:** `b3f1911f7b58306f`
- **Password:** `774bd02ed609a948`

## Testing

To verify the connection works:

```bash
curl -s https://www.flesvoedingcalculator.nl/api/test-db/ | python3 -m json.tool
```

Expected response:
```json
{
    "status": "success",
    "database": "connected",
    "responseTime": "48ms",
    "timestamp": "2025-10-26T13:52:30.942Z",
    "environment": "production",
    "databaseUrlSet": true,
    "message": "✅ Database connection is working"
}
```

## Issue Resolution History

### Problem
The database connection was failing with `getaddrinfo ENOTFOUND` errors.

### Root Causes Found
1. **Wrong credentials** - Initially tried to use `flesvoedingcalculator_user` as username
2. **CapRover auto-generated credentials** - When creating PostgreSQL One-Click App, CapRover generates random credentials
3. **Network hostname** - Must use `srv-captain--<app-name>` format within CapRover network

### Solution
1. Recreated database app via CapRover One-Click PostgreSQL
2. Used the exact credentials shown in CapRover's deployment message
3. Updated DATABASE_URL in main app with correct username and password
4. Verified connection via `/api/test-db` endpoint

## Important Notes

- ⚠️ These credentials are **production credentials** - keep them secure
- 🔒 The database is only accessible within CapRover's internal network
- 📝 If you recreate the database app, these credentials will change again
- ✅ Database connection tested and confirmed working on 2025-10-26

## Local Development

For local development, use `.env.local` with a local PostgreSQL instance:

```
DATABASE_URL=postgresql://localhost:5432/flesvoedingcalculator
```

Or comment out DATABASE_URL if not testing database features locally.
