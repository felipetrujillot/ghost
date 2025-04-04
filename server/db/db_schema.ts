/**
 * Declaración manual de la base de datos SAP
 * de momento no se usarán migraciones hasta que pasen a la versión 1.0 en drizzle
 * @author ID
 */
import {
  varchar,
  int,
  timestamp,
  mysqlSchema,
  text,
} from 'drizzle-orm/mysql-core'

const config = useRuntimeConfig()
export const mySchema = mysqlSchema(config.dbName)

/**
 *
 */
export const usuarios = mySchema.table('usuarios', {
  id_usuario: int('id_usuario').autoincrement().notNull(),
  id_empresa: int('id_empresa').notNull(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: int('role').notNull(),
  id_model: int('id_model').notNull(),
  id_system_prompt: int('id_system_prompt').notNull(),
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
  activo: int('activo').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const notes = mySchema.table('notes', {
  id_note: int('id_note').primaryKey().autoincrement(),
  id_empresa: int('id_empresa').autoincrement().notNull(),
  id_note_group: int('id_note_group').notNull(),
  note_name: varchar('note_name', { length: 250 }).notNull(),
  note_text: text('note_text').notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const proyectos = mySchema.table('proyectos', {
  id_proyecto: int('id_proyecto').primaryKey().autoincrement(),
  id_empresa: int('id_empresa').autoincrement().notNull(),
  nombre_proyecto: varchar('nombre_proyecto', { length: 2000 }).notNull(),
  activo: int('activo').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const tareas = mySchema.table('tareas', {
  id_tarea: int('id_tarea').primaryKey().autoincrement(),
  id_proyecto: int('id_proyecto').notNull(),
  nombre_tarea: varchar('nombre_tarea', { length: 2000 }).notNull(),
  estado_tarea: varchar('estado_tarea', { length: 2000 }).notNull(),
  descripcion_tarea: text('descripcion_tarea').notNull(),
  activo: int('activo').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const notes_group = mySchema.table('notes_group', {
  id_note_group: int('id_note_group').primaryKey().autoincrement(),
  id_empresa: int('id_empresa').notNull(),
  group_name: varchar('group_name', { length: 250 }).notNull(),
  active: int('active').notNull().default(1),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})

/**
 *
 */
export const chat_sessions = mySchema.table('chat_sessions', {
  id_chat_session: int('id_chat_session').primaryKey().autoincrement(),
  id_empresa: int('id_empresa').notNull(),
  id_usuario: int('id_usuario').notNull(),
  uuid: varchar('uuid', { length: 255 }).notNull(),
  activo: int('activo').notNull().default(1),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
})
/**
 *
 */
export const chat = mySchema.table('chat', {
  id_chat: int('id_chat').primaryKey().autoincrement(),
  id_chat_session: int('id_chat_session').notNull(),
  chat: text('chat').notNull(),
  tipo: varchar('tipo', { length: 100 }).notNull(),
  origen: varchar('origen', { length: 100 }).notNull(),
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
export const models = mySchema.table('models', {
  id_model: int('id_model').primaryKey().autoincrement(),
  location: varchar('location', { length: 255 }).notNull(),
  llm_model: varchar('llm_model', { length: 255 }).notNull(),
  activo: int('activo').default(1).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

/**
 *
 */
export const system_prompts = mySchema.table('system_prompts', {
  id_system_prompt: int('id_system_prompt').primaryKey().autoincrement(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  system_prompt: text('system_prompt').notNull(),
  activo: int('activo').default(1).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

export const gastos = mySchema.table('gastos', {
  id_gasto: int('id_gasto').primaryKey().autoincrement(),
  id_usuario: int('id_usuario').notNull(),
  id_empresa: int('id_empresa').notNull(),
  cantidad: int('cantidad').notNull(),
  categoria: varchar('categoria', { length: 250 }).notNull(),
  comentario: varchar('comentario', { length: 250 }).notNull(),
  fecha: varchar('fecha', { length: 250 }).notNull(),
  activo: int('activo').default(1).notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at'),
})

export type Usuarios = typeof usuarios.$inferSelect
export type PasswordsReset = typeof passwords_reset.$inferSelect
