import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './lib/db/schema.js',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})