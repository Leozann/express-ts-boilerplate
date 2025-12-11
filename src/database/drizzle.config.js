import { defineConfig } from 'drizzle-kit'
import { config } from 'dotenv'

config({ path: '.env.development' })

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema/**/*.ts',
  out: './src/database/migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
})
