import { NextResponse } from 'next/server'

// Force dynamic route
export const dynamic = 'force-dynamic'

// Simple health check endpoint
export async function GET(request) {
  try {
    const now = new Date()
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      timestamp: now.toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      message: 'Admin system is operational'
    })

  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        status: 'unhealthy', 
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}