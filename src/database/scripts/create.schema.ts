import fs from 'fs'
import path from 'path'
import { pascalCase, snakeCase } from '@/lib/helper/name-format.helper'

// cli input
const rawName = process.argv[2]

if (!rawName) {
  console.error('❌ Missing schema name.\nExample: pnpm db:make:schema users')
  process.exit(1)
}

// convention
const tableName = snakeCase(rawName)
const schemaName = pascalCase(rawName + 'Schema')

const schemaDir = path.join(__dirname, '../schema')
const filePath = path.join(schemaDir, `${tableName}.schema.ts`)

if (!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir, { recursive: true })
}

const force = process.argv.includes('--force')
if (fs.existsSync(filePath) && !force) {
  console.error(`⚠️ Schema already exists: ${filePath}`)
  console.error('Use --force to overwrite.')
  process.exit(1)
}

const template = `import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * ${schemaName}
 * Auto-generated schema: ${tableName}
 */

export const ${tableName} = pgTable("${tableName}", {
  id: serial("id").primaryKey(),

  // TODO: Add your columns here
  // name: text("name").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
`

fs.writeFileSync(filePath, template)

console.log(`✅ Schema created: ${filePath}`)
console.log(`📌 Table name: ${tableName}`)
console.log(`📌 Schema variable: ${tableName}`)
