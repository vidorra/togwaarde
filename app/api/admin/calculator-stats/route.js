import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '../../../../lib/db/connection.js'
import { ensureCalculatorEventsTable } from '../../../../lib/db/ensure-events.js'
import { verifyAdminAndGetWebsite } from '../../../../lib/jwt-utils.js'

export const dynamic = 'force-dynamic'

// GET - aggregated, anonymous calculator stats for BOTH websites.
export async function GET(request) {
  try {
    verifyAdminAndGetWebsite(request)
  } catch {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ success: false, error: 'DATABASE_URL not set' }, { status: 503 })
  }

  try {
    await ensureCalculatorEventsTable()

    const [totals, byAge, daily, byWeight, combi, byRoomTemp] = await Promise.all([
      db.execute(sql`
        SELECT website,
               COUNT(*)::int AS total,
               COUNT(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS last30,
               COUNT(*) FILTER (WHERE created_at > now() - interval '7 days')::int AS last7
        FROM calculator_events GROUP BY website ORDER BY website`),
      db.execute(sql`
        SELECT website, COALESCE(age_category, 'onbekend') AS age_category, COUNT(*)::int AS count
        FROM calculator_events GROUP BY website, age_category ORDER BY website, count DESC`),
      db.execute(sql`
        SELECT website, to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
        FROM calculator_events WHERE created_at > now() - interval '30 days'
        GROUP BY website, day ORDER BY day`),
      db.execute(sql`
        SELECT COALESCE(data->>'weightBucket', 'onbekend') AS weight_bucket, COUNT(*)::int AS count
        FROM calculator_events WHERE website = 'flesvoedingcalculator'
        GROUP BY weight_bucket ORDER BY count DESC`),
      db.execute(sql`
        SELECT COALESCE(data->>'isCombi', 'false') AS is_combi, COUNT(*)::int AS count
        FROM calculator_events WHERE website = 'flesvoedingcalculator'
        GROUP BY is_combi`),
      db.execute(sql`
        SELECT COALESCE(data->>'roomTempBucket', 'onbekend') AS room_temp, COUNT(*)::int AS count
        FROM calculator_events WHERE website = 'togwaarde'
        GROUP BY room_temp ORDER BY room_temp`)
    ])

    return NextResponse.json({
      success: true,
      totals: totals.rows,
      byAge: byAge.rows,
      daily: daily.rows,
      byWeight: byWeight.rows,
      combi: combi.rows,
      byRoomTemp: byRoomTemp.rows
    })
  } catch (error) {
    console.error('calculator-stats error:', error)
    return NextResponse.json({ success: false, error: 'Failed to load stats' }, { status: 500 })
  }
}
