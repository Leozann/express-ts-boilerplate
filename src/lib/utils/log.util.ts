import pino, { TransportSingleOptions } from 'pino'
import path from 'path'
import fs from 'fs'
import { env } from '@/lib/utils/env.util'

const ROOT = process.cwd()
const LOG_DIR = path.join(ROOT, 'src', 'lib', 'logs')

// ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true })
}

// console colors init
const colors: Record<string, string> = {
  GET: '\x1b[32m',
  POST: '\x1b[34m',
  PUT: '\x1b[33m',
  DELETE: '\x1b[31m',
  PATCH: '\x1b[35m',
  HEAD: '\x1b[36m',
  OPTIONS: '\x1b[90m',
}

const reset = '\x1b[0m'

// transport builder
function createTransport(): TransportSingleOptions {
  // development env; pretty console
  if (env.isDev) {
    return {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'SYS:standard',
      },
    }
  }

  // production env; pino-roll (file rotation)
  return {
    target: 'pino-roll',
    options: {
      file: path.join(LOG_DIR, 'app'),
      frequency: 'daily',
      size: '10m',
      mkdir: true,
    },
  }
}

function createLogger() {
  const transport = pino.transport(createTransport())

  const logger = pino(
    {
      level: env.isProd ? 'info' : 'debug',
      timestamp: pino.stdTimeFunctions.isoTime,
      base: null,
    },
    transport,
  )

  // pretty color for HTTP method
  ;(logger as any).colorMethod = (method: string) => {
    if (env.isProd) return method
    const c = colors[method] ?? ''
    return `${c}${method}${reset}`
  }

  return logger as pino.Logger & {
    colorMethod(method: string): string
  }
}

const logger = createLogger()
export default logger
