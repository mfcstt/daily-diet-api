import knex from 'knex'
import type { Knex } from 'knex'
import { env } from './env.js'

export const configDB: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  }
  }
export const db = knex(configDB)