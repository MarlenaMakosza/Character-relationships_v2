import { faker } from '@faker-js/faker';
import { parse } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { readFileSync } from 'node:fs';
import postgres from 'postgres';

import type { TupleOfLength } from '../utils/tuple.ts';

import { characters, relations } from '../../src/lib/server/db/schema/schema.ts';

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
  type CharacterPair = TupleOfLength<SeededCharacter, typeof GROUP_SIZE>;

  if (seededCharacters.length < GROUP_SIZE) {
    throw new Error(
      `Not enough data to create a Pair in seededCharacters. Minimum required is ${GROUP_SIZE} but seededCharacters has ${seededCharacters.length}!`,
    );
  }
  await db.insert(relations).values(
    Array.from({ length: RELATION_COUNT }, () => {
      const charInPair: CharacterPair = faker.helpers.arrayElements(seededCharacters, GROUP_SIZE);

      return {
        idChar1: charInPair[0].id,
        idChar2: charInPair[1].id,
        about: faker.helpers.arrayElement(RELATION_TYPES),
      };
    }),
  );
} finally {
  await connection.end();
}
