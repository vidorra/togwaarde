import { NextResponse } from 'next/server'
import { verifyAdminAndGetWebsite } from '../../../../../lib/jwt-utils.js'
import { syncPricesForWebsite } from '../../../../../lib/price-sync.js'

// Force dynamic route; sync kan even duren
export const dynamic = 'force-dynamic'
export const maxDuration = 300

// POST - handmatige prijssync vanuit de togwaarde-admin. Deze route
// bestond niet (fork-drift: de dashboard-knop wees naar een 404);
// nu dezelfde DB-sync als de nachtelijke cron, voor de togwaarde-rijen.
export async function POST(request) {
  try {
    verifyAdminAndGetWebsite(request)
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await syncPricesForWebsite('togwaarde')
    return NextResponse.json({
      success: true,
      message: `Price sync completed: ${result.successful} successful, ${result.errors} errors`,
      stats: {
        total: result.total,
        successful: result.successful,
        errors: result.errors,
        errorDetails: result.errorDetails,
        deactivated: result.deactivated
      }
    })
  } catch (error) {
    console.error('Admin price sync failed:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to sync prices', error: error.message },
      { status: 500 }
    )
  }
}
