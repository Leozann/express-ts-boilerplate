import { defineConfig } from 'drizzle-kit'
import { env } from '@/lib/utils/env.util'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema/**/*.ts',
  out: './src/database/migrations',
  dbCredentials: {
    url: env.POSTGRES_URL || '',
  },
})
