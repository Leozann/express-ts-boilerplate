import { randomUUID } from 'crypto'
import type { Request, Response, NextFunction } from 'express'

export const addRequestIdMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  res.locals.request_id = randomUUID()
  next()
}
