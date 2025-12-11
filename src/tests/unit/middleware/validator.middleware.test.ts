import { describe, it, expect, vi } from 'vitest'
import validate from '@/middleware/validator.middleware'
import { z } from 'zod'

const schema = z.object({
  body: z.object({
    name: z.string(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
})

describe('Validator Middleware', () => {
  it('should call next() when valid', () => {
    const req: any = {
      body: { name: 'John' },
      query: {},
      params: {},
    }
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    }
    const next = vi.fn()

    validate(schema)(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('should throw when invalid', () => {
    const req: any = {
      body: {},
      query: {},
      params: {},
    }
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    }
    const next = vi.fn()
    validate(schema)(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })
})
