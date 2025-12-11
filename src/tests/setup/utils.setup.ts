import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { users, UsersInsertSchema } from '@/database/schema/users.schema'
import { roles, RolesInsertSchema } from '@/database/schema/roles.schema'

// insert a role for testing
export async function createRole(db: NodePgDatabase, data: Partial<RolesInsertSchema> = {}) {
  const [record] = await db
    .insert(roles)
    .values({
      name: data.name ?? 'admin',
      description: data.description ?? 'Administrator role',
    })
    .returning()

  return record
}

// insert a user for testing
export async function createUser(db: NodePgDatabase, data: Partial<UsersInsertSchema> = {}) {
  const [role] =
    data.roleId !== undefined
      ? [{ id: data.roleId }]
      : await db.insert(roles).values({ name: 'user', description: 'User role' }).returning()

  const [record] = await db
    .insert(users)
    .values({
      fullName: data.fullName ?? 'John Doe',
      email: data.email ?? 'john@example.com',
      password: data.password ?? 'hashed-password',
      roleId: role.id,
      isActive: data.isActive ?? true,
    })
    .returning()

  return record
}

// remove all rows in tables
export async function resetDb(db: NodePgDatabase) {
  await db.delete(users)
  await db.delete(roles)
}
