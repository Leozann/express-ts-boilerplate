// handles errors thrown in the application
import { HttpResponse } from '@/lib/utils/response.util'
import { Request, Response, NextFunction } from 'express'

const errorMiddleware = (err: any, req: Request, res: Response, _next: NextFunction) => {
  // structured logging integrate with pino-http
  req.log.error(err)

  const statusCode = err.status || err.statusCode || 500
  const code = err.code || 'INTERNAL_ERROR'
  const message = err.message || 'Internal Server Error'

  const { payload } = HttpResponse.error(req, code, message, statusCode, err.fields)

  return res.status(statusCode).json(payload)
}

export default errorMiddleware
