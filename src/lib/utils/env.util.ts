// environment variable setup
import dotenv from 'dotenv'
import { z } from 'zod'

const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenv.config({ path: envFile })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  POSTGRES_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid .env configuration:', parsed.error.format())
  throw new Error('Invalid environment variables')
}

export const env = {
  ...parsed.data,
  isDev: parsed.data.NODE_ENV === 'development',
  isTest: parsed.data.NODE_ENV === 'test',
  isStaging: parsed.data.NODE_ENV === 'staging',
  isProd: parsed.data.NODE_ENV === 'production',
}
