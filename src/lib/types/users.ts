import { z } from 'zod'
import { RegisterUserSchema } from '@/lib/validation/schema/users.schema'

export interface IUserPublic {
  fullName: string
  email: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IUserPrivate extends IUserPublic {
  id: string
  password: string
  roleId?: number
}

export interface IUserToken {
  token: string
}

export interface IUserTokenPayload {
  id: string
  email: string
  roleId: number
  isActive: boolean
}

export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>['body']
