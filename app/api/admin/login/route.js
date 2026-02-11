import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'
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
    let ADMIN_PASSWORD, JWT_SECRET
    try {
      ADMIN_PASSWORD = getRequiredEnvVar('ADMIN_PASSWORD')
      JWT_SECRET = getRequiredEnvVar('JWT_SECRET')
    } catch (envError) {
      console.error('Configuration error:', envError.message)
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 503 }
      )
    }

    const { password } = await request.json()

    if (password !== ADMIN_PASSWORD) {
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
