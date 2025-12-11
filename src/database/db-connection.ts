// database connection setup using Drizzle ORM with PostgreSQL
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/lib/utils/env.util'

let databaseInstance: ReturnType<typeof drizzle> | null = null

const mockDb = {
  select: () => {
    throw new Error('Database not configured')
  },
  insert: () => {
    throw new Error('Database not configured')
  },
  update: () => {
    throw new Error('Database not configured')
  },
  delete: () => {
    throw new Error('Database not configured')
  },
  query: new Proxy(
    {},
    {
      get: () => () => {
        throw new Error('Database not configured')
      },
    },
  ),
}

const readDatabase = () => {
  if (databaseInstance) return databaseInstance

  if (!env.POSTGRES_URL) {
    return mockDb as any
  }

  const pool = new Pool({
    connectionString: env.POSTGRES_URL,
  })

  databaseInstance = drizzle(pool)
  return databaseInstance
}

export default readDatabase
