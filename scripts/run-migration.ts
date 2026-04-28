import { neon } from '@neondatabase/serverless'
import * as fs from 'fs'
import * as path from 'path'

async function runMigration() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set')
    process.exit(1)
  }

  const sql = neon(databaseUrl)
  
  const migrationPath = path.join(__dirname, '001_init_schema.sql')
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')
  
  console.log('Running migration...')
  
  try {
    await sql(migrationSQL)
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
