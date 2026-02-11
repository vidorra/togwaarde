import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.js'

// Parse DATABASE_URL manually to ensure proper string handling
function parseDatabaseUrl(url) {
  if (!url) {
    throw new Error('DATABASE_URL is not defined')
  }

  const urlPattern = /^postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)(\?.*)?$/
  const match = url.match(urlPattern)

  if (!match) {
    // Fallback to connection string if parsing fails
    return { connectionString: url }
  }

  const [, user, password, host, port, database, query] = match

  return {
    user: String(user),
    password: String(password),
    host: String(host),
    port: parseInt(port, 10),
    database: String(database),
    ssl: false,
  }
}

// Lazy initialization - only connect when actually needed (not during build)
let pool = null
let _db = null

function getPool() {
  if (!pool) {
    // Skip database connection if DATABASE_URL is not set (e.g., during build)
    if (!process.env.DATABASE_URL) {
      console.log('⏭️  Skipping database connection - DATABASE_URL not set')
      return null
    }

    const poolConfig = parseDatabaseUrl(process.env.DATABASE_URL)
    console.log('📊 Database config:', { ...poolConfig, password: '***' })
    pool = new Pool(poolConfig)
  }
  return pool
}

export function getDb() {
  if (!_db) {
    const poolInstance = getPool()
    if (!poolInstance) return null
    _db = drizzle(poolInstance, { schema })
  }
  return _db
}

// Export db as a getter for backwards compatibility
export const db = new Proxy({}, {
  get(target, prop) {
    const dbInstance = getDb()
    if (!dbInstance) {
      throw new Error('Database not initialized - DATABASE_URL may not be set')
    }
    return dbInstance[prop]
  }
})

// Health check function
export async function checkDatabaseConnection() {
  try {
    const poolInstance = getPool()
    if (!poolInstance) {
      console.log('⏭️  Database not initialized')
      return { success: false, error: 'DATABASE_URL not set' }
    }
    await poolInstance.query('SELECT 1')
    console.log('✅ Database connection successful')
    return { success: true }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    return { success: false, error: error.message }
  }
}

// Graceful shutdown
export async function closeDatabaseConnection() {
  const poolInstance = getPool()
  if (poolInstance) {
    await poolInstance.end()
    console.log('🔌 Database connection closed')
  }
}