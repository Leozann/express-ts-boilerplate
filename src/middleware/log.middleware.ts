import { pinoHttp } from 'pino-http'
import logger from '../lib/utils/log.util'
import { colorMethod, colorStatus, httpPrefix } from '@/lib/utils/http-log.util'

const safe = (m?: string) => m ?? 'UNKNOWN' // type safe for req.method

const logMiddleware = pinoHttp({
  logger,
  genReqId: () => crypto.randomUUID(),

  customSuccessMessage(req, res) {
    const method = colorMethod(safe(req.method))
    const status = colorStatus(res.statusCode)
    return `${httpPrefix()} ${method} ${req.url} → ${status}`
  },

  customErrorMessage(req, res, err) {
    const method = colorMethod(safe(req.method))
    const status = colorStatus(res.statusCode)
    return `${httpPrefix()} ${method} ${req.url} → ${status} (error: ${err.message})`
  },

  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      }
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      }
    },
    err(err) {
      return {
        type: err.type,
        message: err.message,
        stack: err.stack,
      }
    },
  },
})

export default logMiddleware
