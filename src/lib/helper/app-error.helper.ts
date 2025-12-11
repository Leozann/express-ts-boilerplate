export class AppError extends Error {
  statusCode: number
  code: string
  fields?: Record<string, any> | undefined

  constructor(message: string, code: string, statusCode = 400, fields?: Record<string, any>) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.fields = fields

    // capture stack trace for debugging
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}
