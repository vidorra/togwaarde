import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '../../../lib/db/connection'

/**
 * Database Connection Test Endpoint
 *
 * GET /api/test-db
 *
 * Tests the database connection and returns status
 * This endpoint can be accessed to verify database connectivity in production
 */
export async function GET() {
  try {
    const startTime = Date.now()
    const result = await checkDatabaseConnection()
    const responseTime = Date.now() - startTime

    if (result.success) {
      return NextResponse.json({
        status: 'success',
        database: 'connected',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        databaseUrlSet: !!process.env.DATABASE_URL,
        message: '✅ Database connection is working'
      })
    } else {
      return NextResponse.json({
        status: 'error',
        database: 'failed',
        error: result.error || 'Unknown error',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        databaseUrlSet: !!process.env.DATABASE_URL,
        message: '❌ Database connection failed'
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      database: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      databaseUrlSet: !!process.env.DATABASE_URL,
      message: '❌ Database connection test failed'
    }, { status: 500 })
  }
}
