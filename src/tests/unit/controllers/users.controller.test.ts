import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UsersController } from '@/controllers/v1/users.controller'
import { UsersService } from '@/services/users.svc'
import { mockUserPublic } from '../../factories/user.factory'

vi.mock('@/services/users.svc')

describe('Users Controller', () => {
  let controller: UsersController
  let req: any
  let res: any

  beforeEach(() => {
    controller = new UsersController()

    req = { params: {}, body: {}, query: {} }
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
  })

  it('getAll should return list of users', async () => {
    // mock service
    vi.mocked(UsersService.prototype.getAllUsers).mockResolvedValue([{ fullName: 'John', email: 'john@mail.com' }])
    await controller.getAll(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalled()
  })

  it('getById should return one user', async () => {
    req.params.id = '123'
    vi.mocked(UsersService.prototype.getUserById).mockResolvedValue(
      mockUserPublic({ fullName: 'John', email: 'john@mail.com' }),
    )
    await controller.getById(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
  })
})
