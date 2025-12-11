import { UsersRepository } from '@/repositories/users.repository'
import { UsersInsertSchema } from '@/database/schema/users.schema'
import { hashPassword, verifyPassword } from '@/lib/utils/password.util'
import { IUserPublic, IUserTokenPayload, RegisterUserDTO } from '@/lib/types/users'
import { signToken } from '@/lib/utils/jwt.util'
import { ErrorUtil } from '@/lib/utils/error.util'

export class UsersService {
  private repo = new UsersRepository()

  private response(user: any): IUserPublic {
    return {
      fullName: user.fullName,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async getAllUsers() {
    const user = await this.repo.findAll()
    return user.map(this.response)
  }

  async getUserById(id: string) {
    const user = await this.repo.findById(id)
    if (!user) throw ErrorUtil.notFound('User not found')
    return this.response(user)
  }

  async registerUser(data: RegisterUserDTO) {
    const exists = await this.repo.findByEmail(data.email)
    if (exists) {
      throw ErrorUtil.conflict('Email already registered')
    }

    const hashedPassword = await hashPassword(data.password)
    const dataCreated = await this.repo.create({
      ...data,
      password: hashedPassword,
      isActive: true,
      roleId: 3, // default user role
    })
    return this.response(dataCreated)
  }

  async updateUser(id: string, data: Partial<UsersInsertSchema>) {
    // if password wants to be updated
    if (data.password) data.password = await hashPassword(data.password)
    const updated = await this.repo.update(id, { ...data, updatedAt: new Date() })
    if (!updated) throw ErrorUtil.notFound('User not found')
    return this.response(updated)
  }

  async deactivateUser(id: string) {
    const user = await this.repo.findById(id)
    if (!user) throw ErrorUtil.notFound('User not found')
    if (!user.isActive) throw ErrorUtil.badRequest('User is already deactivated')

    const updated = await this.repo.update(id, {
      isActive: false,
      updatedAt: new Date(),
    })
    return this.response(updated)
  }

  async forceDeleteUser(id: string) {
    const user = await this.repo.findById(id)
    if (!user) throw ErrorUtil.notFound('User not found')
    await this.repo.delete(id)
    return { deleted: true }
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email)
    if (!user) {
      throw ErrorUtil.unauthorized('Invalid email or password')
    }

    const valid = await verifyPassword(user.password, password)
    if (!valid) {
      throw ErrorUtil.unauthorized('Invalid email or password')
    }

    if (!user.isActive) {
      throw ErrorUtil.forbidden('Account is deactivated')
    }

    const payload: IUserTokenPayload = {
      id: user.id,
      email: user.email,
      roleId: user.roleId!,
      isActive: user.isActive,
    }
    const token = signToken(payload)

    return { token }
  }
}
