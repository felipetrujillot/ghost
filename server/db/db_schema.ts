/**
 * Declaración manual de la base de datos SAP
 * de momento no se usarán migraciones hasta que pasen a la versión 1.0 en drizzle
 * @author ID
 */
import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  mysqlSchema,
} from 'drizzle-orm/mysql-core'

export const ghostSchema = mysqlSchema('worklite')

/**
 *
 */
export const users = ghostSchema.table('users', {
  id_user: int('id_user').autoincrement().notNull(),
  id_company: int('id_company').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  birthdate: varchar('birthdate', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 255 }).notNull(),
  healthcare: varchar('healthcare', { length: 255 }).notNull(),
  role: int('role').notNull(),
  area: int('area').notNull(),
  gender: int('gender').notNull(),
  logged_in: int('logged_in').notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const companies = mysqlTable('companies', {
  id_company: int('id_company').autoincrement().notNull(),
  company_name: varchar('company_name', { length: 255 }).notNull(),
  company_rut: varchar('company_rut', { length: 255 }).notNull(),
  company_giro: varchar('company_giro', { length: 255 }).notNull(),
  company_address: varchar('company_address', { length: 255 }).notNull(),
  company_razon_social: varchar('company_razon_social', {
    length: 255,
  }).notNull(),
  company_comuna: varchar('company_comuna', { length: 255 }).notNull(),
  company_region: varchar('company_region', { length: 255 }).notNull(),
  company_phone: varchar('company_phone', { length: 255 }).notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const passwords_reset = ghostSchema.table('passwords_reset', {
  id_password_reset: int('id_password_reset').primaryKey().autoincrement(),
  token: varchar('token', { length: 250 }).notNull(),
  id_user: int('id_user').notNull(),
  active: int('active').default(1).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

/**
 *
 */
/* export const stages = mysqlTable('stages', {
  id_stage: int('id_stage').primaryKey().autoincrement(),
  stage_name: varchar('stage_name', { length: 250 }).notNull(),
  start_date: varchar('start_date', { length: 250 }).notNull(),
  end_date: varchar('end_date', { length: 250 }).notNull(),
  active: int('active').default(1).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
}) */

export type Users = typeof users.$inferSelect
export type PasswordsReset = typeof passwords_reset.$inferSelect
