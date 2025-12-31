import dotenv from 'dotenv'
import { z } from 'zod'

// validate node_env early and fail fast if missing or invalid
const nodeEnvSchema = z.enum(['development', 'staging', 'production', 'test'])

const parsedNodeEnv = nodeEnvSchema.safeParse(process.env.NODE_ENV)

if (!parsedNodeEnv.success) {
  console.error('invalid or missing node_env')
  console.error('expected: development | staging | production | test')
  process.exit(1)
}

export const NODE_ENV = parsedNodeEnv.data

// load environment file explicitly based on node_env
dotenv.config({ path: `.env.${NODE_ENV}` })

// validate application environment variables (db and jwt are optional)
const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  POSTGRES_URL: z.string().optional(),
  JWT_SECRET: z.string().optional(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('invalid environment variables')
  console.error(parsedEnv.error.format())
  process.exit(1)
}

// export typed env with derived helpers
export const env = {
  ...parsedEnv.data,

  NODE_ENV,

  isDev: NODE_ENV === 'development',
  isTest: NODE_ENV === 'test',
  isStaging: NODE_ENV === 'staging',
  isProd: NODE_ENV === 'production',
}
