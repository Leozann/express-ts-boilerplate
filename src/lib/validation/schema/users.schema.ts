import { z } from 'zod'

export const GetUserByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
})

export const RegisterUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
  }),
})

export const UpdateSelfSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    fullName: z.string().optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
  }),
})

export const UpdateUserSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    roleId: z.number().optional(),
    isActive: z.boolean().optional(),
  }),
})

export const LoginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
})
