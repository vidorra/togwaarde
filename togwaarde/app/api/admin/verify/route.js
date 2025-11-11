import { NextResponse } from 'next/server'
import * as jwt from 'jsonwebtoken'

// Force dynamic route
export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Missing or invalid token' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      
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