export const Roles = {
  SUPERUSER: 1,
  ADMIN: 2,
  USER: 3,
} as const

export type RoleCode = (typeof Roles)[keyof typeof Roles]
