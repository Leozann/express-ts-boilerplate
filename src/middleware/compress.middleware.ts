import compression from 'compression'
import type { RequestHandler } from 'express'

const compressionMiddleware: RequestHandler = compression({
  threshold: 1024, // only compress responses > 1KB
  level: 6, // balanced CPU usage & compression ratio
})

export default compressionMiddleware
