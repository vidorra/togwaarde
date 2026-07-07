import { Pool } from 'pg'

// Lightweight, run-once creation of the shared calculator_events table.
// Kept separate from the heavy autoMigrate() so the public tracking endpoint
// stays cheap. Idempotent across both apps (they share one database).
let ensured = false

export async function ensureCalculatorEventsTable() {
  if (ensured) return true
  const url = process.env.DATABASE_URL
  if (!url) return false

  const pool = new Pool({ connectionString: url, ssl: false })
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS calculator_events (
        id uuid PRIMARY KEY,
        website text NOT NULL DEFAULT 'flesvoedingcalculator',
        age_category text,
        data jsonb,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `)
    await client.query(
      `CREATE INDEX IF NOT EXISTS idx_calc_events_website_created ON calculator_events (website, created_at);`
    )
    ensured = true
    return true
  } finally {
    client.release()
    await pool.end()
  }
}
