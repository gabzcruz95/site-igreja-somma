import { neon } from '@neondatabase/serverless'

let sql

export function getNeonClient() {
  if (sql) return sql

  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL não configurada nas variáveis de ambiente da Vercel.')
  }

  sql = neon(databaseUrl)
  return sql
}
