import { faker } from "@faker-js/faker";
import { parse } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { readFileSync } from "node:fs";
import postgres from "postgres";

import type { Character, CharacterPair } from "../../src/lib/domain/Character.ts";

import { toCharacter } from "../../src/lib/mappers/characterMapper.ts";
import { characters, relations } from "../../src/lib/server/db/schema/schema.ts";

const toPair = (array: Character[]): CharacterPair => [array[0], array[1]];

const env = parse(readFileSync(".env"));
if (!("DATABASE_URL" in env)) throw new Error("DATABASE_URL not found in .env!");

const CONNECTION_LIMIT = 1;
const TIMEOUT_INTERVAL = 10;
const connection = postgres(env.DATABASE_URL, {
  max: CONNECTION_LIMIT,
  idle_timeout: TIMEOUT_INTERVAL,
  connect_timeout: TIMEOUT_INTERVAL,
});

const db = drizzle(connection, { casing: "snake_case", logger: true });

const CHARACTER_COUNT = 10;
const RELATION_COUNT = 15;
// const PAIR = 2 satisfies CharacterPair['length'];
const RELATION_TYPES = ["Friend", "Enemy", "Married", "Sibling", "Subject", "Ally"];

await db.delete(relations);
await db.delete(characters);

const seededCharacters = await db
  .insert(characters)
  .values(
    Array.from({ length: CHARACTER_COUNT }, () => ({
      name: faker.person.fullName(),
    }))
  )
  .returning();

await db.insert(relations).values(
  Array.from({ length: RELATION_COUNT }, () => {
    const charInPair = toPair(
      faker.helpers
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- test
        .arrayElements(seededCharacters, 2 satisfies CharacterPair['length'])
        .map(toCharacter),
    );

    return {
      idChar1: charInPair[0].id,
      idChar2: charInPair[1].id,
      about: faker.helpers.arrayElement(RELATION_TYPES),
    };
  })
);

await connection.end();
