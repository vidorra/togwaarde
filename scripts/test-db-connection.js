import 'dotenv/config'
import { checkDatabaseConnection, closeDatabaseConnection } from '../lib/db/connection.js'

console.log('🔍 Testing database connection...')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set')

async function testConnection() {
  try {
    const isConnected = await checkDatabaseConnection()

    if (isConnected) {
      console.log('\n✅ SUCCESS: Database connection is working!')
    } else {
      console.log('\n❌ FAILED: Could not connect to database')
      process.exit(1)
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message)
    console.error(error)
    process.exit(1)
  } finally {
    await closeDatabaseConnection()
  }
}

testConnection()
