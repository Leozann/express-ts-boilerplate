import { eq } from 'drizzle-orm'
import readDatabase from '@/database/db-connection'
import { users } from '@/database/schema/users.schema'
import { UsersInsertSchema } from '@/database/schema/users.schema'

const database = readDatabase()

export class UsersRepository {
  async findAll() {
    return database.select().from(users)
  }

  async findById(id: string) {
    const rows = await database.select().from(users).where(eq(users.id, id)).limit(1)
    return rows[0] ?? null
  }

  async findByEmail(email: string) {
    const rows = await database.select().from(users).where(eq(users.email, email)).limit(1)
    return rows[0] ?? null
  }

  async create(data: UsersInsertSchema) {
    const [result] = await database.insert(users).values(data).returning()
    return result
  }

  async update(id: string, data: Partial<UsersInsertSchema>) {
    const [result] = await database.update(users).set(data).where(eq(users.id, id)).returning()
    return result
  }

  async delete(id: string) {
    const [result] = await database.delete(users).where(eq(users.id, id)).returning()
    return result
  }
}
