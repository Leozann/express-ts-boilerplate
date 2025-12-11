import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UsersService } from '@/services/users.svc'
import { UsersRepository } from '@/repositories/users.repository'

vi.mock('@/repositories/users.repository')
vi.mock('@/lib/utils/password.util', () => ({
  hashPassword: vi.fn().mockResolvedValue('hashed'),
  verifyPassword: vi.fn().mockResolvedValue(true),
}))
vi.mock('@/lib/utils/jwt.util', () => ({
  signToken: vi.fn().mockReturnValue('jwt-token'),
}))

describe('Users Service', () => {
  let service: UsersService
  beforeEach(() => {
    service = new UsersService()
  })

  it('registerUser should throw if email exists', async () => {
    vi.mocked(UsersRepository.prototype.findByEmail).mockResolvedValue({ id: 1 })
    await expect(service.registerUser({ email: 'a@mail.com', password: '123', fullName: 'A' })).rejects.toThrow(
      'Email already registered',
    )
  })

  it('getUserById should throw not found', async () => {
    vi.mocked(UsersRepository.prototype.findById).mockResolvedValue(null)
    await expect(service.getUserById('abc')).rejects.toThrow('User not found')
  })

  it('login should return token', async () => {
    vi.mocked(UsersRepository.prototype.findByEmail).mockResolvedValue({
      id: '1',
      email: 'a@mail.com',
      password: 'hashed',
      roleId: 3,
      isActive: true,
    })
    const result = await service.login('a@mail.com', '123')

    expect(result.token).toBe('jwt-token')
  })
})
