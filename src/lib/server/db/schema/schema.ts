import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const characters = pgTable('characters', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
});

export const relations = pgTable('relations', {
  id: uuid('id').primaryKey().defaultRandom(),
  idChar1: uuid('id_char_1').references(() => characters.id),
  idChar2: uuid('id_char_2').references(() => characters.id),
  about: text('about').notNull(),
});
