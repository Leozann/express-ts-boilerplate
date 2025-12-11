import { integer, uuid, varchar } from 'drizzle-orm/pg-core'
import { pgTable, timestamp, boolean } from 'drizzle-orm/pg-core'
import { roles } from './roles.schema'

export const users = pgTable('users', {
  // id: serial('id').primaryKey(),
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export type UsersSchema = typeof users.$inferSelect
export type UsersInsertSchema = typeof users.$inferInsert
