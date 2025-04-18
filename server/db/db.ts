/**
 * Drizzle es el core de esta api
 * Elegimos drizzle por la integración que tiene con typescript
 * a diferencia de prisma tiene una conexión de base como orm para funcionar con Mysql/Posgresql, en vez de mongodb
 * por lo que es mucho más fácil hacer joins, y cada llamada equivale a una query
 * @author FT
 */
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
/* import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
 */
const config = useRuntimeConfig()
/* const __dirname = path.dirname(fileURLToPath(import.meta.url))
const certPath = path.join(__dirname, '../../server/db/client-cert.pem')
const caPath = path.join(__dirname, '../../server/db/server-ca.pem')
const keyPath = path.join(__dirname, '../../server/db/client-key.pem')

const sslConfig = {
  ca: fs.readFileSync(caPath),
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
  rejectUnauthorized: false,
}
 */
const params =
  process.dev === true
    ? {
        database: config.dbName,
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
      }
    : {
        database: config.dbName,
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        //ssl: sslConfig,
      }

export const connection = mysql.createPool(params)

export const db = drizzle(connection)
