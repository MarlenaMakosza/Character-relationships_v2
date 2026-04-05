// eslint-disable-next-line sonarjs/no-wildcard-import
import * as schema from '$lib/server/db/schema/schema';
import env from '@src/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const CONNECTION_LIMIT = 1;
// TODO: CONNECTION LIMIT separate file with const's
export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? CONNECTION_LIMIT : undefined,

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onnotice: env.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  casing: 'snake_case',
  logger: true,
  schema,
});

// export type db = typeof db;

export default db;
