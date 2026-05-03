import { PostgreSqlContainer } from '@testcontainers/postgresql';
import client from 'postgres';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('given a running PostgreSQL container', () => {
  let sql: ReturnType<typeof client>;

  beforeAll(async () => {
    const postgresContainer = await new PostgreSqlContainer('postgres:16-alpine').start();

    sql = client(postgresContainer.getConnectionUri());
  });

  afterAll(async () => {
    await sql.end();
  });

  it('when querying SELECT 1+1 then returns 2', async () => {
    expect.assertions(1);
    const [row] = await sql<[{ result: number }]>`SELECT 1+1 AS result`;

    expect(row.result).toBe(2);
  });
});
