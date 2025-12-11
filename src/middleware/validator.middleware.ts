import { z, ZodError, ZodType } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '@/lib/utils/response.util'

const validate =
  // type safe for parsed values are now inferred (no more 'unknown' assignment errors)
  <T extends ZodType<any>>(schema: T) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        }) as z.infer<T>

        req.body = parsed.body
        req.query = parsed.query
        req.params = parsed.params

        return next()
      } catch (err) {
        if (err instanceof ZodError) {
          const error = HttpResponse.error(req, 'VALIDATION_ERROR', 'Validation failed', 400, z.treeifyError(err))
          return res.status(error.statusCode).json(error.payload)
        }

        return next(err)
      }
    }

export default validate
