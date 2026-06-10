import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const requestLog = []
function checkRateLimit() {
  const now = Date.now()
  const oneMinuteAgo = now - 60000
  while (requestLog.length > 0 && requestLog[0] < oneMinuteAgo) {
    requestLog.shift()
  }
  if (requestLog.length >= 10) return false
  requestLog.push(now)
  return true
}

/**
 * POST /api/admin-auth - Authenticate admin user
 */
export async function POST(request) {
  try {
    if (!checkRateLimit()) {
      return NextResponse.json({
        success: false,
        error: 'Too many requests. Please wait a moment.'
      }, { status: 429 })
    }

    const { password } = await request.json()

    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH
    if (!adminPasswordHash) {
      return NextResponse.json({
        success: false,
        error: 'Authentication not configured'
      }, { status: 500 })
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash)

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid password'
      }, { status: 401 })
    }

  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json({
      success: false,
      error: 'Authentication failed'
    }, { status: 500 })
  }
}