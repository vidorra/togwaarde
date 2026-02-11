import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'
import { rateLimitMiddleware } from '../../../../lib/rate-limiter'

// Force dynamic route
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Check rate limit for admin API
    const rateLimit = await rateLimitMiddleware(request, 'adminApi')
    if (rateLimit.limited) {
      return NextResponse.json(rateLimit.response, { status: 429, headers: rateLimit.headers })
    }
    // Validate JWT_SECRET is configured (no insecure defaults)
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      console.error('Configuration error: Missing JWT_SECRET environment variable')
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 503 }
      )
    }

    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Missing or invalid token' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] })

      if (!decoded.admin) {
        return NextResponse.json(
          { message: 'Invalid token' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        success: true,
        admin: true
      })

    } catch (jwtError) {
      return NextResponse.json(
        { message: 'Token expired or invalid' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { message: 'Verification failed' },
      { status: 500 }
    )
  }
}