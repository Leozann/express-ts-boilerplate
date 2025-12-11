// Auto-generated seeder: 20251125T091033.users.seed.ts
import { hashPassword } from '@/lib/utils/password.util'
import readDatabase from '../db-connection'
import { users } from '../schema/users.schema'

export async function seed() {
  const db = readDatabase()
  if (!db) throw new Error('Database not initialized')

  console.log('→ Seeding: users')

  const now = new Date()

  const userDummy = [
    {
      fullName: 'John Doe',
      email: 'admin@gmail.com',
      rawPassword: 'superUser1!',
      roleId: 1,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      rawPassword: 'JaneSm!th#24',
      roleId: 2,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Michael Johnson',
      email: 'michael.johnson@gmail.com',
      rawPassword: 'MJohnson@88',
      roleId: 3,
      isActive: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Emily Davis',
      email: 'emily.davis@gmail.com',
      rawPassword: 'EmilyDvs#01',
      roleId: 2,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'William Brown',
      email: 'william.brown@yahoo.com',
      rawPassword: 'WillBr0wn!77',
      roleId: 3,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Olivia Wilson',
      email: 'olivia.wilson@gmail.com',
      rawPassword: 'OliviaW#2024',
      roleId: 3,
      isActive: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'James Taylor',
      email: 'james.taylor@gmail.com',
      rawPassword: 'JamesT!l0r09',
      roleId: 3,
      isActive: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Sophia Anderson',
      email: 'sophia.anderson@gmail.com',
      rawPassword: 'SophiaA@22',
      roleId: 3,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Alexander Martinez',
      email: 'alex.martinez@gmail.com',
      rawPassword: 'AlexM@rt2025',
      roleId: 3,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      fullName: 'Emma Thompson',
      email: 'emma.thompson@gmail.com',
      rawPassword: 'EmmaTh#mp50',
      roleId: 3,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ]

  const listOfUser = []
  for (const user of userDummy) {
    listOfUser.push({
      fullName: user.fullName,
      email: user.email,
      password: await hashPassword(user.rawPassword),
      isActive: user.isActive,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  await db.insert(users).values(listOfUser)
}
