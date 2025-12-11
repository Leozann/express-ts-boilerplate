import fs from 'fs'
import path from 'path'

// cli input
const run = async () => {
  const description = process.argv[2]

  if (!description) {
    console.error('❌ Missing migration name. Example: pnpm db:make:migration create_users_table')
    process.exit(1)
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14)

  const filename = `${timestamp}_${description}.ts`
  const migrationsDir = path.join(__dirname, '../migrations')
  const filePath = path.join(migrationsDir, filename)

  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true })
  }

  const template = `import { sql } from "drizzle-orm";

export async function up(db: any) {
  // TODO: add migration here
}

export async function down(db: any) {
  // TODO: add rollback logic
}
`

  fs.writeFileSync(filePath, template)
  console.log(`✅ Created migration: ${filename}`)
}

run()
