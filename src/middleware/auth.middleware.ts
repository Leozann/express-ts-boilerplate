import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@/lib/utils/jwt.util'
import { type RoleCode } from '@/lib/types/roles'
import { HttpResponse } from '@/lib/utils/response.util'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const { payload, statusCode } = HttpResponse.error(
      req,
      'UNAUTHORIZED',
      'Authorization token missing. Provide a valid token.',
      401,
    )
    return res.status(statusCode).json(payload)
  }

  const token = authHeader.replace('Bearer ', '').trim()
  const decoded = verifyToken(token)

  if (!decoded) {
    const { payload, statusCode } = HttpResponse.error(
      req,
      'INVALID_TOKEN',
      'Token invalid, expired, or JWT authentication not enabled.',
      401,
    )
    return res.status(statusCode).json(payload)
  }

  ;(req as any).user = decoded
  next()
}

export const authorize = (requiredRole: RoleCode) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    if (!user || typeof user.roleId !== 'number') {
      const { payload, statusCode } = HttpResponse.error(
        req,
        'FORBIDDEN_ACTION',
        'Access denied. Missing or invalid authorization payload.',
        403,
      )
      return res.status(statusCode).json(payload)
    }

    if (user.roleId > requiredRole) {
      const { payload, statusCode } = HttpResponse.error(req, 'FORBIDDEN_ACTION', 'Insufficient permissions.', 403)
      return res.status(statusCode).json(payload)
    }

    next()
  }
}
