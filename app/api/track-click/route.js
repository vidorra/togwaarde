import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { sql } from 'drizzle-orm'
import { db } from '../../../lib/db/connection.js'
import { clickEvents } from '../../../lib/db/schema.js'
import { ensureClickEventsTable } from '../../../lib/db/ensure-events.js'
import { verifyAdminAndGetWebsite } from '../../../lib/jwt-utils.js'

export const dynamic = 'force-dynamic'

const WEBSITE = 'togwaarde'

// Bound input so a bot can't pollute stats.
const SNIPPET_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/
const WIDGET_PATTERN = /^[A-Za-z0-9_-]{1,64}$/

// POST - record an affiliate click (anonymous: snippet + widget + timestamp,
// no IP/session). Stored in the shared click_events table so /admin/stats
// can report across both websites.
export async function POST(request) {
  try {
    const body = await request.json()
    const { snippetId, widget } = body

    if (!snippetId || typeof snippetId !== 'string' || !SNIPPET_ID_PATTERN.test(snippetId)) {
      return NextResponse.json({ success: false, error: 'Invalid snippetId' }, { status: 400 })
    }
    const safeWidget = (typeof widget === 'string' && WIDGET_PATTERN.test(widget)) ? widget : null

    await ensureClickEventsTable()
    await db.insert(clickEvents).values({
      id: randomUUID(),
      website: WEBSITE,
      snippetId,
      widget: safeWidget
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('track-click error:', error)
    return NextResponse.json({ success: false, error: 'Failed to record click' }, { status: 500 })
  }
}

// GET - click totals per snippet (admin only), same shape as the old
// JSON-file version: { stats: { [snippetId]: { count, lastClicked } } }
export async function GET(request) {
  try {
    verifyAdminAndGetWebsite(request)
  } catch {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await ensureClickEventsTable()
    const result = await db.execute(sql`
      SELECT snippet_id, COUNT(*)::int AS count, MAX(created_at) AS last_clicked
      FROM click_events GROUP BY snippet_id`)
    const stats = {}
    for (const row of result.rows) {
      stats[row.snippet_id] = { count: Number(row.count), lastClicked: row.last_clicked }
    }
    return NextResponse.json({ success: true, stats })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load stats' }, { status: 500 })
  }
}
