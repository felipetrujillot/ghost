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
  text,
} from 'drizzle-orm/mysql-core'

export const mySchema = mysqlSchema('ghost')

/**
 *
 */
export const users = mySchema.table('users', {
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
export const companies = mySchema.table('companies', {
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
export const notes = mySchema.table('notes', {
  id_note: int('id_note').primaryKey().autoincrement(),
  id_group_note: int('id_group_note').notNull(),
  note_name: varchar('note_name', { length: 250 }).notNull(),
  note_text: text('note_text').notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const tasks = mySchema.table('tasks', {
  id_task: int('id_task').primaryKey().autoincrement(),
  id_project: int('id_project').notNull(),
  task_name: varchar('task_name', { length: 2000 }).notNull(),
  task_status: int('task_status').notNull(),
  task_description: text('task_description').notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

export const projects = mySchema.table('projects', {
  id_project: int('id_project').primaryKey().autoincrement(),
  project_name: varchar('project_name', { length: 250 }).notNull(),
  project_description: text('project_description').notNull(),
  progress: int('progress').notNull().default(1),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const group_notes = mySchema.table('group_notes', {
  id_group_note: int('id_group_note').primaryKey().autoincrement(),
  group_name: varchar('group_name', { length: 250 }).notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const passwords_reset = mySchema.table('passwords_reset', {
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
