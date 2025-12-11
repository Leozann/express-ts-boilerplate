import { describe, expect, it, vi } from 'vitest'
import { authorize } from '@/middleware/auth.middleware'
import { Roles } from '@/lib/types/roles'

describe('Authorize Middleware', () => {
  it('should allow authorized role', () => {
    const req: any = { user: { roleId: Roles.ADMIN } }
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
    const next = vi.fn()
    authorize(Roles.ADMIN)(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('should block unauthorized role', () => {
    const req: any = { user: { role: Roles.USER } }
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    authorize(Roles.ADMIN)(req, res, vi.fn())

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalled()
  })
})
