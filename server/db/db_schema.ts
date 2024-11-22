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

const config = useRuntimeConfig()
export const mySchema = mysqlSchema('tueducas')

/**
 *
 */
export const usuarios = mySchema.table('usuarios', {
  id_usuario: int('id_usuario').autoincrement().notNull(),
  id_empresa: int('id_empresa').notNull(),
  microsoft_id: varchar('microsoft_id', { length: 255 }).notNull(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  apellido: varchar('apellido', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  fecha_nacimiento: varchar('fecha_nacimiento', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  rut: varchar('rut', { length: 255 }).notNull(),
  celular: int('celular').notNull(),
  role: int('role').notNull(),
  area: int('area').notNull(),
  gender: int('gender').notNull(),
  logged_in: int('logged_in').notNull(),
  activo: int('activo').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const empresas = mySchema.table('empresas', {
  id_empresa: int('id_empresa').autoincrement().notNull(),
  nombre_empresa: varchar('nombre_empresa', { length: 255 }).notNull(),
  project_id: varchar('project_id', { length: 255 }).notNull(),
  activo: int('activo').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const notes = mySchema.table('notes', {
  id_note: int('id_note').primaryKey().autoincrement(),
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

/**
 *
 */
export const tasks_users = mySchema.table('tasks_users', {
  id_task_user: int('id_task_user').primaryKey().autoincrement(),
  id_task: int('id_task').autoincrement(),
  id_usuario: int('id_usuario').autoincrement(),
  id_project: int('id_project').autoincrement(),
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
export const cursos = mySchema.table('cursos', {
  id_curso: int('id_curso').primaryKey().autoincrement(),
  id_empresa: int('id_empresa').primaryKey().autoincrement(),
  nombre_curso: varchar('nombre_curso', { length: 255 }).notNull(),
  nivel_curso: varchar('nivel_curso', { length: 255 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

/**
 *
 */
export const alumnos = mySchema.table('alumnos', {
  id_alumno: int('id_alumno').primaryKey().autoincrement(),
  id_empresa: int('id_empresa').primaryKey().autoincrement(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  nombre_segundo: varchar('nombre_segundo', { length: 255 }).notNull(),
  apellido_paterno: varchar('apellido_paterno', { length: 255 }).notNull(),
  apellido_materno: varchar('apellido_materno', { length: 255 }).notNull(),
  rut: varchar('rut', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
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

export type Usuarios = typeof usuarios.$inferSelect
export type PasswordsReset = typeof passwords_reset.$inferSelect
