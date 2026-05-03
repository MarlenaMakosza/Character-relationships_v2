import { faker } from '@faker-js/faker';
import { parse } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { readFileSync } from 'node:fs';
import postgres from 'postgres';

import { characters, relations } from '../../src/lib/server/db/schema/schema.ts';
import { assertNumberEquals } from '../utils/assertions.ts';

const env = parse(readFileSync('.env'));
if (!('DATABASE_URL' in env)) throw new Error('DATABASE_URL not found in .env!');

const CONNECTION_LIMIT = 1;
const IDLE_TIMEOUT = 10;
const CONNECT_TIMEOUT = 10;
const connection = postgres(env.DATABASE_URL, {
  max: CONNECTION_LIMIT,
  idle_timeout: IDLE_TIMEOUT,
  connect_timeout: CONNECT_TIMEOUT,
});

const db = drizzle(connection, { casing: 'snake_case', logger: true });

const CHARACTER_COUNT = 10;
const RELATION_COUNT = 15;
const RELATION_TYPES = ['Friend', 'Enemy', 'Married', 'Sibling', 'Subject', 'Ally'];

try {
  await db.delete(relations);
  await db.delete(characters);

  type SeededCharacter = typeof characters.$inferSelect;

  const seededCharacters: SeededCharacter[] = await db
    .insert(characters)
    .values(
      Array.from({ length: CHARACTER_COUNT }, () => ({
        name: faker.person.fullName(),
      })),
    )
    .returning();

  const GROUP_SIZE = 2;
  type RelationInsert = typeof relations.$inferInsert;

  assertNumberEquals(
    GROUP_SIZE,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- the code below works only for GROUP_SIZE=2.
    2,
    `CRITICAL CODE ERROR! The code assumes ONLY GROUP_SIZE=2. Current GROUP_SIZE=${GROUP_SIZE}`,
  );

  const relationValues: RelationInsert[] = Array.from({ length: RELATION_COUNT }, () => {
    const charsInGroup: SeededCharacter[] = faker.helpers.arrayElements(seededCharacters, GROUP_SIZE);

    const idFields: Record<string, number> = {};
    for (const [index, char] of charsInGroup.entries()) {
      // @ts-expect-error -- test
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- test
      idFields[`idChar${index + 1}`] = char.id;
    }

    return {
      ...idFields,
      about: faker.helpers.arrayElement(RELATION_TYPES),
    } satisfies RelationInsert;
  });

  await db.insert(relations).values(relationValues);
} finally {
  await connection.end();
}
