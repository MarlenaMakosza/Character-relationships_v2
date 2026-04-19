import { parse } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { readFileSync } from "node:fs";
import path from "node:path";
import postgres from "postgres";

const env = parse(readFileSync(path.resolve(process.cwd(), ".env")));
if (!("DATABASE_URL" in env)) throw new Error("DATABASE_URL not found in .env!");

const CONNECTION_LIMIT = 1;
const connection = postgres(env.DATABASE_URL, { max: CONNECTION_LIMIT });
const db = drizzle(connection);

await migrate(db, { migrationsFolder: "./dev/drizzle" });

await connection.end();
