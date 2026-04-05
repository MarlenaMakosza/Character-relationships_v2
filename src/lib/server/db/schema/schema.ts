import { date, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const characters = pgTable('characters', {
  id: uuid('id').primaryKey(),
  primaryNameId: integer('primary_name_id'),
  secondaryNameId: integer('secondary_name_id'),
  primarySurnameId: integer('primary_surname_id'),
  description: text('description'),
  birthDate: date('birth_date'),
  deathDate: date('death_date'),
  age: integer('age'),
  avatar: text('avatar'),
  gallery: text('gallery').array(), // PostgreSQL text[]
  updatedAt: timestamp('updatedAt'),
  createdAt: timestamp('createdAt'),
  type: text('type'),
});

export const characterNames = pgTable('character_names', {
  id: serial('id').primaryKey(),
  characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
  value: text('value').notNull(),
});

export const characterSurnames = pgTable('character_surnames', {
  id: serial('id').primaryKey(),
  characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
  value: text('value').notNull(),
});

export const characterLabels = pgTable('character_labels', {
  characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
});

export const characterSections = pgTable('character_sections', {
  id: serial('id').primaryKey(),
  characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content'),
  // możesz dodać np. order, type, etc.
});

export const relations = pgTable('relations', {
  id: serial('id').primaryKey(),
  idChar1: serial('id_char_1').references(() => characters.id),
  idChar2: serial('id_char_2').references(() => characters.id),
  about: text('about').notNull(),
});
