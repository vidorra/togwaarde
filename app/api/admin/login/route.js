import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { rateLimitMiddleware, checkRateLimit, RATE_LIMIT_CONFIGS } from '../../../../lib/rate-limiter'
import { safeEqual } from '../../../../lib/safe-compare.js'
import { readJsonCapped } from '../../../../lib/read-body.js'

// Force dynamic route
export const dynamic = 'force-dynamic'

// Validate required environment variables (no insecure defaults)
function getRequiredEnvVar(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

// Verify the supplied password. Prefers a bcrypt hash (ADMIN_PASSWORD_HASH);
// falls back to plaintext ADMIN_PASSWORD only if no hash is configured, so an
// existing deploy keeps working until the hash env var is set.
async function verifyPassword(password) {
  if (typeof password !== 'string' || password.length === 0) return false
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (hash) {
    return bcrypt.compare(password, hash)
  }
  const plain = process.env.ADMIN_PASSWORD
  if (plain) {
    return safeEqual(password, plain)
  }
  throw new Error('Missing ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD)')
}

export async function POST(request) {
  try {
    // Check rate limit - strict for login attempts
    const rateLimit = await rateLimitMiddleware(request, 'adminLogin')

    if (rateLimit.limited) {
      return NextResponse.json(
        rateLimit.response,
        {
          status: 429,
          headers: rateLimit.headers
        }
      )
    }

    // Rem over alle IP's samen, tegen raden vanaf veel adressen tegelijk
    const global = await checkRateLimit('all', 'adminLoginGlobal')
    if (!global.allowed) {
      return NextResponse.json(
        { error: 'Te veel inlogpogingen. Probeer het later opnieuw.', retryAfter: global.resetAt },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(RATE_LIMIT_CONFIGS.adminLoginGlobal.maxAttempts),
            'Retry-After': String(Math.ceil(RATE_LIMIT_CONFIGS.adminLoginGlobal.windowMs / 1000))
          }
        }
      )
    }

    // Validate environment variables are configured
    let JWT_SECRET
    try {
      JWT_SECRET = getRequiredEnvVar('JWT_SECRET')
    } catch (envError) {
      console.error('Configuration error:', envError.message)
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 503 }
      )
    }

    const { tooLarge, data } = await readJsonCapped(request, 4096)
    if (tooLarge) {
      return NextResponse.json({ message: 'Request too large' }, { status: 413 })
    }
    const password = data?.password

    let passwordValid
    try {
      passwordValid = await verifyPassword(password)
    } catch (envError) {
      console.error('Configuration error:', envError.message)
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 503 }
      )
    }

    if (!passwordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        {
          status: 401,
          headers: rateLimit.headers
        }
      )
    }

    // Create JWT token valid for 24 hours.
    // This is the TOGWaarde admin: default the website context to 'togwaarde'
    // so snippets/assignments made here are tagged correctly. (Was hardcoded
    // to 'flesvoedingcalculator' from the fork, which mis-tagged every
    // togwaarde product.) The website switcher can still cross-manage the
    // sibling site. Overridable via ADMIN_DEFAULT_WEBSITE.
    const defaultWebsite = process.env.ADMIN_DEFAULT_WEBSITE || 'togwaarde'
    const token = jwt.sign(
      { admin: true, website: defaultWebsite, iat: Math.floor(Date.now() / 1000) },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    )

    return NextResponse.json(
      {
        success: true,
        token,
        website: defaultWebsite,
        message: 'Login successful'
      },
      { headers: rateLimit.headers }
    )

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    )
  }
}
