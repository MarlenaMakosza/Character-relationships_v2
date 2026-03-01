import { sql } from 'drizzle-orm';
import { bigint, check, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const characters = pgTable(
	'characters',
	{
		id: serial('id').primaryKey(),
		firstName: text('first_name').notNull(),
		lastName: text('last_name').notNull(),
		age: bigint('age', { mode: 'number' }).notNull(),
	},
	table => [check('age_non_negative', sql`${table.age} >= 0`)],
);

export const relations = pgTable('relations', {
	id: serial('id').primaryKey(),
	idChar1: serial('id_char_1').references(() => characters.id),
	idChar2: serial('id_char_2').references(() => characters.id),
	about: text('about').notNull(),
});
