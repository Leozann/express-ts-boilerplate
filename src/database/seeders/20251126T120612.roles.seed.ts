// Auto-generated seeder: 20251126T120612.roles.seed.ts
import readDatabase from '../db-connection'
import { roles } from '../schema/roles.schema'

export async function seed() {
  const db = readDatabase()
  if (!db) throw new Error('Database not initialized')

  console.log('→ Seeding: users')
  const now = new Date()
  const roleDummy = [
    {
      name: 'superuser',
      description:
        'Full system access: create/update/delete any resource, manage roles and permissions, view system logs, modify configurations',
      createdAt: now,
      updatedAt: now,
    },
    {
      name: 'admin',
      description:
        'High-level administrative access: manage users, update system settings, approve actions, but cannot modify superuser permissions',
      createdAt: now,
      updatedAt: now,
    },
    {
      name: 'user',
      description:
        'Standard user access: manage own profile, perform allowed application tasks, view permitted resources',
      createdAt: now,
      updatedAt: now,
    },
  ]
  await db.insert(roles).values(roleDummy)
}
