#!/usr/bin/env node

// Load environment variables FIRST before any other imports
import dotenv from 'dotenv'
dotenv.config()

import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, checkDatabaseConnection, closeDatabaseConnection } from '../lib/db/connection.js'

async function runMigrations() {
  console.log('🚀 Starting database migration...')
  
  try {
    // Check database connection first
    const isConnected = await checkDatabaseConnection()
    if (!isConnected) {
      process.exit(1)
    }

    // Run migrations
    await migrate(db, { migrationsFolder: './migrations' })
    console.log('✅ Database migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  } finally {
    await closeDatabaseConnection()
  }
}

runMigrations()