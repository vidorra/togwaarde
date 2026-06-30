import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { rateLimitMiddleware } from '../../../../lib/rate-limiter'

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
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (hash) {
    return bcrypt.compare(password, hash)
  }
  const plain = process.env.ADMIN_PASSWORD
  if (plain) {
    return password === plain
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

    const { password } = await request.json()

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

    // Create JWT token valid for 24 hours
    // Default to flesvoedingcalculator website for initial login
    const token = jwt.sign(
      { admin: true, website: 'flesvoedingcalculator', iat: Math.floor(Date.now() / 1000) },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    )

    return NextResponse.json(
      {
        success: true,
        token,
        website: 'flesvoedingcalculator',
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
