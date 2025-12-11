import type { IUserPublic } from '@/lib/types/users'

export function mockUserPublic(overrides: Partial<IUserPublic> = {}): IUserPublic {
  return {
    fullName: 'John Doe',
    email: 'john@mail.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}
