import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  schema: './src/lib/server/db/schema/schema.ts',
  out: './dev/drizzle',

  dbCredentials: { url: process.env.DATABASE_URL },
  introspect: {
    casing: 'camel',
  },
  verbose: true,
  strict: true,
  dialect: 'postgresql',
}) satisfies Config;
