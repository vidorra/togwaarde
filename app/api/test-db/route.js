import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '../../../lib/db/connection'
import { verifyAdminAndGetWebsite } from '../../../lib/jwt-utils.js'

/**
 * Database Connection Test Endpoint (Admin-only)
 *
 * GET /api/test-db
 */
export async function GET(request) {
  try {
    verifyAdminAndGetWebsite(request)
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const startTime = Date.now()
    const result = await checkDatabaseConnection()
    const responseTime = Date.now() - startTime

    if (result.success) {
      return NextResponse.json({
        status: 'success',
        database: 'connected',
        responseTime: `${responseTime}ms`
      })
    } else {
      return NextResponse.json({
        status: 'error',
        database: 'failed',
        responseTime: `${responseTime}ms`
      }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      database: 'error'
    }, { status: 500 })
  }
}
