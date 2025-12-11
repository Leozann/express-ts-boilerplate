import fs from 'fs'
import path from 'path'
import readDatabase from '../db-connection'
import { assertSafeEnvironment } from './db.safe'

assertSafeEnvironment('DB SEED')

// -------------------------------------------------------------
// Add this: dependency order + types
// -------------------------------------------------------------
const dependencyOrder = {
  roles: 1,
  permissions: 2,
  users: 3,
  posts: 4,
  comments: 5,
} as const

type DepKey = keyof typeof dependencyOrder
// -------------------------------------------------------------

const runSeeders = async () => {
  const db = readDatabase()
  if (!db) {
    console.error('❌ Cannot run seeders: Database not configured.')
    process.exit(1)
  }

  console.log('🔎 Loading seeders...')

  const seedDir = path.join(__dirname, '../seeders')

  // read files as usual
  let files = fs.readdirSync(seedDir).filter((file) => file.endsWith('.seed.ts') || file.endsWith('.seed.js'))

  if (files.length === 0) {
    console.log('⚠️ No seeders found.')
    process.exit(0)
  }

  // -------------------------------------------------------------
  // Add this: dependency-aware sorting (minimal patch)
  // -------------------------------------------------------------
  files.sort((a, b) => {
    const keyA = Object.keys(dependencyOrder).find((k) => a.toLowerCase().includes(k)) as DepKey | undefined

    const keyB = Object.keys(dependencyOrder).find((k) => b.toLowerCase().includes(k)) as DepKey | undefined

    if (keyA && keyB) return dependencyOrder[keyA] - dependencyOrder[keyB]
    if (keyA) return -1
    if (keyB) return 1

    // fallback = timestamp or alphabetical
    return a.localeCompare(b)
  })
  // -------------------------------------------------------------

  for (const file of files) {
    console.log(`🚀 Running: ${file}`)
    const modulePath = path.join(seedDir, file)

    const seederModule = await import(modulePath)
    const seederFn = seederModule.seed

    if (typeof seederFn !== 'function') {
      console.warn(`⚠️ Skipping ${file}: missing seed() function.`)
      continue
    }

    await seederFn(db)
    console.log(`✅ Completed: ${file}`)
  }

  console.log('[i] All seeders executed.')
}

runSeeders()
