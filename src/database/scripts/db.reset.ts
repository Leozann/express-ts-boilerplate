import { sql } from 'drizzle-orm'
import readDatabase from '../db-connection'
import { assertSafeEnvironment } from './db.safe'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

assertSafeEnvironment('DB RESET')

async function resetDatabase() {
  const db = readDatabase()
  if (!db) {
    console.error('❌ Database connection not available.')
    process.exit(1)
  }

  console.log('⚠️  Resetting database (development only)...')

  // drop and recreate schema
  await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE;`)
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS public;`)
  await db.execute(sql`GRANT ALL ON SCHEMA public TO public;`)

  // delete migrations folder
  const migrationsDir = path.join(__dirname, '../migrations')
  if (fs.existsSync(migrationsDir)) {
    fs.rmSync(migrationsDir, { recursive: true, force: true })
    console.log('🗑  Deleted migrations folder.')
  }

  // re-generate migrations
  console.log('🛠 Generating migrations...')
  execSync('pnpm db:generate', { stdio: 'inherit' })

  // re-apply migrations
  console.log('📦 Running migrations...')
  execSync('pnpm db:migrate', { stdio: 'inherit' })

  console.log('✨ Database reset complete (migrations re-applied).')
  process.exit(0)
}

resetDatabase().catch((err) => {
  console.error('❌ Reset failed:', err)
  process.exit(1)
})
