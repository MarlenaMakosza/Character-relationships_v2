import { faker } from '@faker-js/faker';
import { parse } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { readFileSync } from 'node:fs';
import postgres from 'postgres';

import type { Character } from '../../src/lib/domain/Character.ts';

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

  const seededCharacters = await db
    .insert(characters)
    .values(
      Array.from({ length: CHARACTER_COUNT }, () => ({
        name: faker.person.fullName(),
      })),
    )
    .returning();
  interface TupleOfLength<T> {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- It isn't magic number, because it is defined of specific type, where 2 is one of it
    2: [T, T];
  }
  const PAIR = 2;

  type CharacterPair = TupleOfLength<Character>[typeof PAIR];
  // type CharacterPair = [typeof seededCharacters[0], typeof seededCharacters[0]];

  if (seededCharacters.length < PAIR) {
    throw new Error(
      `Not enough data to create a Pair in seededCharacters. Minimum required is ${PAIR} but seededCharacters has ${seededCharacters.length}!`,
    );
  }
  await db.insert(relations).values(
    Array.from({ length: RELATION_COUNT }, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- arrayElements normally return T[], but I have count 2, so this return T[], T[], this is what i Have in CharacterPair
      const charInPair = faker.helpers.arrayElements(seededCharacters, PAIR) as CharacterPair;

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
