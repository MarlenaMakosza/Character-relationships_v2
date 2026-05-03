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
const TIMEOUT_INTERVAL = 10;
const connection = postgres(env.DATABASE_URL, {
  max: CONNECTION_LIMIT,
  idle_timeout: TIMEOUT_INTERVAL,
  connect_timeout: TIMEOUT_INTERVAL,
});

const db = drizzle(connection, { casing: 'snake_case', logger: true });

const CHARACTER_COUNT = 10;
const RELATION_COUNT = 15;
const RELATION_TYPES = ['Friend', 'Enemy', 'Married', 'Sibling', 'Subject', 'Ally'];

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
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- It isn't magic number, because it is defined of specific type, where 2 is one of option
  2: [T, T];
}
const PAIR = 2;

type CharacterPair = TupleOfLength<Character>[typeof PAIR];

await db.insert(relations).values(
  Array.from({ length: RELATION_COUNT }, () => {
    if (seededCharacters.length < PAIR) {
      throw new Error(`Not enough data to create a Pair in seededCharacters. Minimum required is ${PAIR} but seededCharacters has ${seededCharacters.length}!`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- Bullshit, because this is that type?
    const charInPair = faker.helpers.arrayElements(seededCharacters, PAIR) as CharacterPair;

    return {
      idChar1: charInPair[0].id,
      idChar2: charInPair[1].id,
      about: faker.helpers.arrayElement(RELATION_TYPES),
    };
  }),
);

await connection.end();
