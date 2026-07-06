import { NextResponse } from 'next/server'
import { syncPricesForWebsite } from '../../../../lib/price-sync.js'

// Force dynamic route; sync kan minuten duren bij veel producten
export const dynamic = 'force-dynamic'
export const maxDuration = 300

/**
 * Nachtelijke prijssync + beschikbaarheidscheck (zie lib/price-sync.js).
 * Aangeroepen door de GitHub Actions workflow price-sync.yml.
 *
 * Auth: CRON_SECRET env var, meegestuurd als
 *   Authorization: Bearer <secret>  of  x-cron-secret: <secret>
 * Zonder geconfigureerde CRON_SECRET faalt de route gesloten (503).
 */
function isAuthorized(request) {
  const secret = process.env.CRON_SECRET
  if (!secret) return null // niet geconfigureerd
  const auth = request.headers.get('authorization') || ''
  const headerSecret = request.headers.get('x-cron-secret') || ''
  return auth === `Bearer ${secret}` || headerSecret === secret
}

export async function POST(request) {
  const authorized = isAuthorized(request)
  if (authorized === null) {
    return NextResponse.json(
      { success: false, message: 'CRON_SECRET niet geconfigureerd' },
      { status: 503 }
    )
  }
  if (!authorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const stats = await syncPricesForWebsite('togwaarde')
    console.log('Cron price sync klaar:', JSON.stringify(stats))
    return NextResponse.json({ success: true, stats })
  } catch (error) {
    console.error('Cron price sync mislukt:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

// GET als alias zodat een simpele curl/monitor ook werkt
export async function GET(request) {
  return POST(request)
}
