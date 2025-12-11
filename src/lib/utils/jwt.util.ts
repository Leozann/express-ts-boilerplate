import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from './env.util'

const secretKey = env.JWT_SECRET

const getSecret = (): string | null => {
  if (!secretKey) {
    console.warn('[JWT WARNING] JWT_SECRET is not set. JWT auth features are disabled.')
    return null
  }
  return secretKey
}

export const signToken = (payload: object): string | null => {
  const key = getSecret()
  if (!key) return null

  return jwt.sign(payload, key, { expiresIn: '3h' })
}

export const verifyToken = (token: string): JwtPayload | string | null => {
  const key = getSecret()
  if (!key) return null

  try {
    return jwt.verify(token, key)
  } catch {
    return null
  }
}
