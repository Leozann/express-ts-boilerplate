import { AppError } from '../helper/app-error.helper'

export class ErrorUtil {
  // not found
  static notFound(message = 'Resource Not Found') {
    return new AppError(message, 'NOT_FOUND', 404)
  }

  // unauthorized
  static unauthorized(message = 'Unauthorized') {
    return new AppError(message, 'UNAUTHORIZED', 401)
  }

  // forbidden
  static forbidden(message = 'Forbidden Action') {
    return new AppError(message, 'FORBIDDEN_ACTION', 403)
  }

  // conflict
  static conflict(message = 'Resource Conflict') {
    return new AppError(message, 'CONFLICT', 409)
  }

  // internal server
  static internal(message = 'Internal Server Error') {
    return new AppError(message, 'INTERNAL_ERROR', 500)
  }

  // validation
  static validation(fields: Record<string, any>, message = 'Payload Validation Failed') {
    return new AppError(message, 'VALIDATION_ERROR', 422, fields)
  }

  // bad request
  static badRequest(message = 'Bad Request') {
    return new AppError(message, 'BAD_REQUEST', 400)
  }

  // rate limit
  static rateLimit(message = 'Too Many Requests') {
    return new AppError(message, 'RATE_LIMIT', 429)
  }

  // service unavailable
  static serviceUnavailable(message = 'Service Temporarily Unavailable') {
    return new AppError(message, 'SERVICE_UNAVAILABLE', 503)
  }
}
