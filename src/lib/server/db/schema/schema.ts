import { pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const characters = pgTable('characters', {
  id: uuid('id').primaryKey(),
  name: text('name'),
});

export const relations = pgTable('relations', {
  id: serial('id').primaryKey(),
  idChar1: uuid('id_char_1').references(() => characters.id),
  idChar2: uuid('id_char_2').references(() => characters.id),
  about: text('about').notNull(),
});
