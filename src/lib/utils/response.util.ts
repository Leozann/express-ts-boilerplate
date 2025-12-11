// response utility to standardize API responses
import type { Request } from 'express'

export class HttpResponse {
  static success(req: Request, data: any) {
    return {
      requestId: req.id,
      data,
    }
  }

  static list(req: Request, items: any[], meta: any) {
    return {
      requestId: req.id,
      items,
      meta,
    }
  }

  static error(req: Request, code: string, message: string, statusCode: number, fields?: any) {
    const payload: any = {
      requestId: req.id,
      error: {
        message,
        code,
      },
    }

    if (fields) {
      payload.error.fields = fields
    }

    return { statusCode, payload }
  }
}
