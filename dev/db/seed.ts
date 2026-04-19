import { faker } from "@faker-js/faker";
import { parse } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { readFileSync } from "node:fs";
import postgres from "postgres";

import { characters, relations } from "../../src/lib/server/db/schema/schema.ts";

const env = parse(readFileSync(".env"));
if (!("DATABASE_URL" in env)) {
  throw new Error("DATABASE_URL not found in .env!");
}

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
const PAIR_SIZE = 2;
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
    const [char1, char2] = faker.helpers.arrayElements(seededCharacters, PAIR_SIZE);

    return {
      idChar1: char1.id,
      idChar2: char2.id,
      about: faker.helpers.arrayElement(RELATION_TYPES),
    };
  })
);

await connection.end();
