import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Welke commit draait er? De deploy-workflow wacht hierop.
export function GET() {
  return NextResponse.json(
    { ok: true, sha: process.env.GIT_SHA || null },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
