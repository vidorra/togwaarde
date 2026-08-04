import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { sql } from 'drizzle-orm'
import { db } from '../../../lib/db/connection.js'
import { ensurePageviewEventsTable } from '../../../lib/db/ensure-events.js'
import { checkTrackRate, bodyTooLarge } from '../../../lib/track-guard.js'

export const dynamic = 'force-dynamic'

const WEBSITE = 'togwaarde'

// POST - registreer één anoniem bezoek (website + tijdstip). De client vuurt
// dit 1x per sessie. Geen IP/sessie/pad/persoonsgegevens.
export async function POST(request) {
  try {
    if (bodyTooLarge(request)) {
      return NextResponse.json({ success: false, error: 'Body too large' }, { status: 413 })
    }
    const rate = checkTrackRate(request)
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } }
      )
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, stored: false })
    }

    await ensurePageviewEventsTable()
    await db.execute(sql`
      INSERT INTO pageview_events (id, website) VALUES (${randomUUID()}, ${WEBSITE})`)

    return NextResponse.json({ success: true, stored: true })
  } catch (error) {
    console.error('track-view error:', error)
    return NextResponse.json({ success: false, error: 'Failed to record view' }, { status: 500 })
  }
}
