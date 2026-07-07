import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { db } from '../../../lib/db/connection.js'
import { calculatorEvents } from '../../../lib/db/schema.js'
import { ensureCalculatorEventsTable } from '../../../lib/db/ensure-events.js'

export const dynamic = 'force-dynamic'

const WEBSITE = 'togwaarde'

const AGE_PATTERN = /^[A-Za-z0-9_+-]{1,32}$/

// Whitelist of coarse, non-personal data keys for the TOG calculator.
function sanitizeData(raw) {
  if (!raw || typeof raw !== 'object') return {}
  const out = {}
  if (typeof raw.roomTempBucket === 'string' && raw.roomTempBucket.length <= 16) out.roomTempBucket = raw.roomTempBucket
  if (Number.isFinite(raw.togValue)) out.togValue = Math.max(0, Math.min(10, Math.round(raw.togValue * 2) / 2))
  if (typeof raw.sleepMode === 'string' && raw.sleepMode.length <= 16) out.sleepMode = raw.sleepMode
  if (typeof raw.status === 'string' && raw.status.length <= 24) out.status = raw.status
  return out
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
    }

    const ageCategory =
      typeof body.ageCategory === 'string' && AGE_PATTERN.test(body.ageCategory)
        ? body.ageCategory
        : null

    const data = sanitizeData(body.data)

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, stored: false })
    }

    await ensureCalculatorEventsTable()
    await db.insert(calculatorEvents).values({
      id: randomUUID(),
      website: WEBSITE,
      ageCategory,
      data
    })

    return NextResponse.json({ success: true, stored: true })
  } catch (error) {
    console.error('track-calculation error:', error)
    return NextResponse.json({ success: false, error: 'Failed to record event' }, { status: 500 })
  }
}
