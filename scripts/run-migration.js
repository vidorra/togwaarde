#!/usr/bin/env node

/**
 * Standalone migration script to add new fields to snippets table
 * Run this with: node scripts/run-migration.js
 */

import pg from 'pg'
const { Pool } = pg

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('DATABASE_URL ontbreekt. Zet de env var voordat je de migratie draait.')
  process.exit(1)
}

console.log('🚀 Starting database migration...')
console.log('📍 Database:', DATABASE_URL.replace(/:[^:@]+@/, ':***@'))

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: false
})

async function runMigration() {
  let client

  try {
    // Test connection first
    console.log('🔌 Connecting to database...')
    client = await pool.connect()
    console.log('✅ Database connection successful!')

    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'snippets'
      );
    `)

    if (!tableCheck.rows[0].exists) {
      console.error('❌ Error: snippets table does not exist!')
      process.exit(1)
    }

    console.log('✅ snippets table found')

    // Start transaction
    console.log('🔄 Starting migration transaction...')
    await client.query('BEGIN')

    // Check and add image_html column
    console.log('📝 Checking for image_html column...')
    const imageHtmlCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'snippets' AND column_name = 'image_html'
      );
    `)

    if (!imageHtmlCheck.rows[0].exists) {
      console.log('➕ Adding image_html column...')
      await client.query('ALTER TABLE snippets ADD COLUMN image_html text')
      console.log('✅ image_html column added')
    } else {
      console.log('⏭️  image_html column already exists')
    }

    // Check and add bol_script column
    console.log('📝 Checking for bol_script column...')
    const bolScriptCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'snippets' AND column_name = 'bol_script'
      );
    `)

    if (!bolScriptCheck.rows[0].exists) {
      console.log('➕ Adding bol_script column...')
      await client.query('ALTER TABLE snippets ADD COLUMN bol_script text')
      console.log('✅ bol_script column added')
    } else {
      console.log('⏭️  bol_script column already exists')
    }

    // Check and add image_url column
    console.log('📝 Checking for image_url column...')
    const imageUrlCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'snippets' AND column_name = 'image_url'
      );
    `)

    if (!imageUrlCheck.rows[0].exists) {
      console.log('➕ Adding image_url column...')
      await client.query('ALTER TABLE snippets ADD COLUMN image_url text')
      console.log('✅ image_url column added')
    } else {
      console.log('⏭️  image_url column already exists')
    }

    // Make generated_html nullable
    console.log('📝 Making generated_html column nullable...')
    try {
      await client.query('ALTER TABLE snippets ALTER COLUMN generated_html DROP NOT NULL')
      console.log('✅ generated_html is now nullable')
    } catch (error) {
      if (error.message.includes('does not exist')) {
        console.log('⏭️  generated_html is already nullable')
      } else {
        throw error
      }
    }

    // Commit transaction
    await client.query('COMMIT')
    console.log('✅ Migration transaction committed!')

    // Verify columns were added
    console.log('🔍 Verifying migration...')
    const verifyQuery = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'snippets'
      ORDER BY ordinal_position
    `)

    console.log('📋 Current snippets table schema:')
    verifyQuery.rows.forEach(row => {
      console.log(`  - ${row.column_name} (${row.data_type}) ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`)
    })

    // Count existing snippets
    const countQuery = await client.query('SELECT COUNT(*) FROM snippets')
    console.log(`\n📊 Current snippets in database: ${countQuery.rows[0].count}`)

    console.log('\n🎉 Migration completed successfully!')

  } catch (error) {
    if (client) {
      await client.query('ROLLBACK')
      console.log('⏮️  Transaction rolled back')
    }
    console.error('❌ Migration failed:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  } finally {
    if (client) {
      client.release()
    }
    await pool.end()
    console.log('🔌 Database connection closed')
  }
}

runMigration()
