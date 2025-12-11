// tests/setup/db.setup.ts
import { newDb } from 'pg-mem'
import { drizzle } from 'drizzle-orm/node-postgres'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export async function createTestDb() {
  const pg = newDb({
    autoCreateForeignKeyIndices: true,
  })

  const adapter = pg.adapters.createPg()
  const client = new adapter.Client()
  await client.connect()

  // path to your db migrations folder
  const migrationsDir = join(process.cwd(), 'src', 'database', 'migrations')

  console.log('Running migrations from:', migrationsDir)

  // read all migration sql files
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  // execute migrations sequentially
  for (const file of files) {
    const sql = readFileSync(join(migrationsDir, file), 'utf8')
    await client.query(sql)
  }

  const db = drizzle(client)

  return { db, client }
}
