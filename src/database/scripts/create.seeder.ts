import fs from 'fs'
import path from 'path'

// cli input
const nameArg = process.argv[2]

if (!nameArg) {
  console.error('❌ Missing seeder name.\n\nUsage:\n  pnpm seed:make <name>')
  process.exit(1)
}

const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', 'T')
const fileName = `${timestamp}.${nameArg}.seed.ts`
const seedersDir = path.join(__dirname, '../seeders')

if (!fs.existsSync(seedersDir)) {
  fs.mkdirSync(seedersDir, { recursive: true })
}

const template = `
// Auto-generated seeder: ${fileName}
import readDatabase from '../db-connection'

export async function seed() {
  const db = readDatabase()
  if (!db) throw new Error('Database not initialized')

  console.log('→ Seeding: users')

  // Example
  // await db.insert(users).values({ ... })
}
`
const filePath = path.join(seedersDir, fileName)
fs.writeFileSync(filePath, template.trimStart())
console.log(`✅ Seeder created: ${filePath}`)
