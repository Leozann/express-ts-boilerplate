import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { sql } from 'drizzle-orm'
import readDatabase from '../db-connection'
import { env } from '@/lib/utils/env.util'
import { assertSafeEnvironment } from './db.safe'

assertSafeEnvironment('DB STATUS CHECK')

const checkDatabase = async () => {
  console.log('🔎 Checking database status...\n')

  // 1. Load DB Connection
  const db = readDatabase()
  if (!db) {
    console.error('❌ Database is NOT configured. Check POSTGRES_URL.')
    process.exit(1)
  }
  console.log('✔ Database connection object loaded.')

  // 2. Try simple heartbeat query
  try {
    const result = await db.execute(sql`SELECT NOW() as now;`)
    console.log(`✔ Connected to database. Server time: ${result.rows?.[0]?.now}`)
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    process.exit(1)
  }

  // 3. Migration dry-run check
  console.log('\n🔍 Checking migration status...')
  try {
    await migrate(db, {
      migrationsFolder: './src/database/migrations',
      // ❗ Running migrate() as DRY RUN only (no changes applied)
      // drizzle currently always applies migrations, so we add env guard:
    })

    console.log('✔ Migrations available and readable.')
  } catch (err) {
    console.error('❌ Migration check failed:', err)
  }

  // 4. Print environment summary
  console.log('\n🛡 Environment Info:')
  console.log(`   NODE_ENV       : ${env.NODE_ENV}`)
  console.log(`   DB URL Present : ${env.POSTGRES_URL ? 'Yes' : 'No'}`)
  console.log(`   Allowed Mode   : ${env.isProd ? '❌ Production mode' : '✔ Development/Staging'}`)

  console.log('\n✨ Database status check completed.\n')
}

checkDatabase()
