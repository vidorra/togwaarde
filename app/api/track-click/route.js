import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { sql } from 'drizzle-orm'
import { db } from '../../../lib/db/connection.js'
import { ensureClickEventsTable, ensureClickPageColumn } from '../../../lib/db/ensure-events.js'
import { verifyAdminAndGetWebsite } from '../../../lib/jwt-utils.js'
import { checkTrackRate, bodyTooLarge, readTrackBody } from '../../../lib/track-guard.js'

export const dynamic = 'force-dynamic'

const WEBSITE = 'togwaarde'

// Bound input so a bot can't pollute stats.
const SNIPPET_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/
const WIDGET_PATTERN = /^[A-Za-z0-9_-]{1,64}$/
// Alleen een pad, geen querystring of andere bezoekersdata.
const PAGE_PATTERN = /^\/[A-Za-z0-9_\-./%]{0,200}$/

function safePage(v) {
  if (typeof v !== 'string' || !PAGE_PATTERN.test(v)) return null
  return v.endsWith('/') ? v : `${v}/`
}

// POST - record an affiliate click (anonymous: snippet + widget + page path + timestamp,
// no IP/session). Stored in the shared click_events table so /admin/stats
// can report across both websites.
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

    const { tooLarge, data: body } = await readTrackBody(request)
    if (tooLarge) {
      return NextResponse.json({ success: false, error: 'Body too large' }, { status: 413 })
    }
    const { snippetId, widget } = body || {}

    if (!snippetId || typeof snippetId !== 'string' || !SNIPPET_ID_PATTERN.test(snippetId)) {
      return NextResponse.json({ success: false, error: 'Invalid snippetId' }, { status: 400 })
    }
    const safeWidget = (typeof widget === 'string' && WIDGET_PATTERN.test(widget)) ? widget : null

    const page = safePage(body.page)

    await ensureClickPageColumn()
    await db.execute(sql`
      INSERT INTO click_events (id, website, snippet_id, widget, page)
      VALUES (${randomUUID()}, ${WEBSITE}, ${snippetId}, ${safeWidget}, ${page})`)

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
