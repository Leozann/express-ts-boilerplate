import rateLimit from 'express-rate-limit'
import appLogger from '@/lib/utils/log.util'
import { ErrorUtil } from '@/lib/utils/error.util'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, _res, _next, options) => {
    const now = new Date().toISOString()

    appLogger.warn({
      msg: 'Rate limit exceeded',
      ip: req.ip,
      route: req.originalUrl,
      method: req.method,
      attempts: options.limit,
      timestamp: now,
    })

    throw ErrorUtil.rateLimit('Too many login attempts. Please try again later.')
  },
})
export default authLimiter
