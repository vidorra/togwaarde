import { NextResponse } from 'next/server'

/**
 * POST /api/admin-auth - Authenticate admin user
 */
export async function POST(request) {
  try {
    const { password } = await request.json()
    
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set')
      return NextResponse.json({
        success: false,
        error: 'Authentication not configured'
      }, { status: 500 })
    }
    
    // Simple password comparison (in production, consider using bcrypt)
    if (password === adminPassword) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful'
      })
    } else {
      // Log failed attempts (but don't log the password)
      console.warn('Failed admin login attempt from IP:', request.headers.get('x-forwarded-for') || 'unknown')
      
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